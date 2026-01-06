/**
 * WordPress REST API Write Service
 * Handles Create, Update, Delete operations with JWT authentication
 *
 * @see https://developer.wordpress.org/rest-api/reference/posts/
 */

import type { WordPressProduct, WordPressProductACF } from '../types/wordpress';

// Configuration from environment
const CONFIG = {
  API_URL: import.meta.env.VITE_WP_API_URL || 'https://productos.prilabsa.com',
  JWT_USER: import.meta.env.VITE_WP_JWT_USER || '',
  JWT_PASSWORD: import.meta.env.VITE_WP_JWT_PASSWORD || '',
  TIMEOUT: 30000,
};

// JWT Token cache
let jwtToken: string | null = null;
let tokenExpiry: number = 0;

// Get JWT token (cached)
const getJwtToken = async (): Promise<string | null> => {
  // Return cached token if still valid (with 5 min buffer)
  if (jwtToken && Date.now() < tokenExpiry - 300000) {
    return jwtToken;
  }

  // Fetch new token
  try {
    const response = await fetch(`${CONFIG.API_URL}/wp-json/jwt-auth/v1/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=${encodeURIComponent(CONFIG.JWT_USER)}&password=${encodeURIComponent(CONFIG.JWT_PASSWORD)}`,
    });

    if (!response.ok) {
      console.error('JWT auth failed:', response.status);
      return null;
    }

    const data = await response.json();
    if (data.token) {
      jwtToken = data.token;
      // Token expires in 7 days, set expiry
      tokenExpiry = Date.now() + 7 * 24 * 60 * 60 * 1000;
      return jwtToken;
    }
  } catch (error) {
    console.error('JWT token fetch error:', error);
  }

  return null;
};

// Build Authorization header with JWT
const getAuthHeader = async (): Promise<string | null> => {
  const token = await getJwtToken();
  return token ? `Bearer ${token}` : null;
};

// Check if credentials are configured
export const isAuthenticated = (): boolean => {
  return Boolean(CONFIG.JWT_USER && CONFIG.JWT_PASSWORD);
};

// API Error type
export interface APIError {
  code: string;
  message: string;
  status: number;
  data?: unknown;
}

// Product form data for create/update
export interface ProductFormData {
  // Core WordPress fields
  title: string;
  status?: 'publish' | 'draft' | 'pending' | 'private';

  // ACF fields
  codigo: string;
  categoria: string;

  // Multilingual names
  nombre_producto_es: string;
  nombre_producto_en?: string;
  nombre_producto_pt?: string;

  // Descriptions
  descripcion_es?: string;
  descripcion_en?: string;
  descripcion_pt?: string;

  // Short descriptions
  descripcion_corta_es?: string;
  descripcion_corta_en?: string;
  descripcion_corta_pt?: string;

  // Benefits (3 per language)
  beneficio_1_es?: string;
  beneficio_2_es?: string;
  beneficio_3_es?: string;
  beneficio_1_en?: string;
  beneficio_2_en?: string;
  beneficio_3_en?: string;
  beneficio_1_pt?: string;
  beneficio_2_pt?: string;
  beneficio_3_pt?: string;

  // Presentation
  presentacion_es?: string;
  presentacion_en?: string;
  presentacion_pt?: string;

  // Specifications
  especificaciones_es?: string;
  especificaciones_en?: string;
  especificaciones_pt?: string;

  // Media (attachment IDs or URLs)
  imagen_producto?: number | null;
  ficha_tecnica_pdf?: string | null;
  pdf?: string | null;

  // Extra fallback fields
  beneficios?: string | null;
  descripcion?: string | null;
  especificaciones?: string | null;
  presentacion?: string | null;
  subcategoria?: string | null;

  // Categories (taxonomy term IDs)
  'categorias-productos'?: number[];
}

// Response wrapper
export interface WriteResponse<T> {
  success: boolean;
  data?: T;
  error?: APIError;
}

/**
 * Make authenticated request to WordPress REST API
 */
async function authenticatedFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<WriteResponse<T>> {
  if (!isAuthenticated()) {
    return {
      success: false,
      error: {
        code: 'not_authenticated',
        message: 'WordPress credentials not configured',
        status: 401,
      },
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CONFIG.TIMEOUT);

  try {
    const authHeader = await getAuthHeader();
    if (!authHeader) {
      return {
        success: false,
        error: {
          code: 'jwt_failed',
          message: 'Failed to obtain JWT token',
          status: 401,
        },
      };
    }

    const response = await fetch(`${CONFIG.API_URL}/wp-json/wp/v2${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
        ...options.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: {
          code: errorData.code || 'request_failed',
          message: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          data: errorData,
        },
      };
    }

    const data = await response.json();
    return { success: true, data };

  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === 'AbortError') {
      return {
        success: false,
        error: {
          code: 'timeout',
          message: 'Request timed out',
          status: 408,
        },
      };
    }

    return {
      success: false,
      error: {
        code: 'network_error',
        message: error instanceof Error ? error.message : 'Unknown error',
        status: 0,
      },
    };
  }
}

/**
 * WordPress Write API
 */
export const WordPressWriteAPI = {
  /**
   * Create a new product
   */
  async createProduct(formData: ProductFormData): Promise<WriteResponse<WordPressProduct>> {
    // Build WordPress post data with ACF fields
    const postData = {
      title: formData.title || formData.nombre_producto_es,
      status: formData.status || 'draft',
      // ACF fields are sent in 'acf' object or as meta
      acf: {
        codigo: formData.codigo,
        categoria: formData.categoria,
        nombre_producto_es: formData.nombre_producto_es,
        nombre_producto_en: formData.nombre_producto_en || '',
        nombre_producto_pt: formData.nombre_producto_pt || '',
        descripcion_es: formData.descripcion_es || '',
        descripcion_en: formData.descripcion_en || '',
        descripcion_pt: formData.descripcion_pt || '',
        descripcion_corta_es: formData.descripcion_corta_es || '',
        descripcion_corta_en: formData.descripcion_corta_en || '',
        descripcion_corta_pt: formData.descripcion_corta_pt || '',
        beneficio_1_es: formData.beneficio_1_es || '',
        beneficio_2_es: formData.beneficio_2_es || '',
        beneficio_3_es: formData.beneficio_3_es || '',
        beneficio_1_en: formData.beneficio_1_en || '',
        beneficio_2_en: formData.beneficio_2_en || '',
        beneficio_3_en: formData.beneficio_3_en || '',
        beneficio_1_pt: formData.beneficio_1_pt || '',
        beneficio_2_pt: formData.beneficio_2_pt || '',
        beneficio_3_pt: formData.beneficio_3_pt || '',
        presentacion_es: formData.presentacion_es || '',
        presentacion_en: formData.presentacion_en || '',
        presentacion_pt: formData.presentacion_pt || '',
        especificaciones_es: formData.especificaciones_es || '',
        especificaciones_en: formData.especificaciones_en || '',
        especificaciones_pt: formData.especificaciones_pt || '',
        imagen_producto: formData.imagen_producto || null,
        ficha_tecnica_pdf: formData.ficha_tecnica_pdf || '',
        beneficios: formData.beneficios || '',
        descripcion: formData.descripcion || '',
        especificaciones: formData.especificaciones || '',
        presentacion: formData.presentacion || '',
        subcategoria: formData.subcategoria || '',
      },
      'categorias-productos': formData['categorias-productos'] || [],
    };

    return authenticatedFetch<WordPressProduct>('/productos', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  },

  /**
   * Update an existing product
   */
  async updateProduct(
    productId: number,
    formData: Partial<ProductFormData>
  ): Promise<WriteResponse<WordPressProduct>> {
    // Build update data (only include provided fields)
    const updateData: Record<string, unknown> = {};

    if (formData.title) updateData.title = formData.title;
    if (formData.status) updateData.status = formData.status;
    if (formData['categorias-productos']) {
      updateData['categorias-productos'] = formData['categorias-productos'];
    }

    // Build ACF updates
    const acfUpdates: Partial<WordPressProductACF> = {};
    const acfFields = [
      'codigo', 'categoria',
      'nombre_producto_es', 'nombre_producto_en', 'nombre_producto_pt',
      'descripcion_es', 'descripcion_en', 'descripcion_pt',
      'descripcion_corta_es', 'descripcion_corta_en', 'descripcion_corta_pt',
      'beneficio_1_es', 'beneficio_2_es', 'beneficio_3_es',
      'beneficio_1_en', 'beneficio_2_en', 'beneficio_3_en',
      'beneficio_1_pt', 'beneficio_2_pt', 'beneficio_3_pt',
      'presentacion_es', 'presentacion_en', 'presentacion_pt',
      'especificaciones_es', 'especificaciones_en', 'especificaciones_pt',
      'imagen_producto', 'ficha_tecnica_pdf',
      'beneficios', 'descripcion', 'especificaciones', 'presentacion', 'subcategoria', 'pdf'
    ] as const;

    for (const field of acfFields) {
      if (field in formData) {
        (acfUpdates as Record<string, unknown>)[field] = formData[field as keyof ProductFormData];
      }
    }

    if (Object.keys(acfUpdates).length > 0) {
      updateData.acf = acfUpdates;
    }

    return authenticatedFetch<WordPressProduct>(`/productos/${productId}`, {
      method: 'POST',
      body: JSON.stringify(updateData),
    });
  },

  /**
   * Delete a product
   */
  async deleteProduct(
    productId: number,
    force: boolean = false
  ): Promise<WriteResponse<{ deleted: boolean; previous: WordPressProduct }>> {
    const endpoint = `/productos/${productId}${force ? '?force=true' : ''}`;
    return authenticatedFetch(endpoint, { method: 'DELETE' });
  },

  /**
   * Trash a product (soft delete) - uses DELETE without force parameter
   * WordPress moves products to trash by default when DELETE is called
   */
  async trashProduct(productId: number): Promise<WriteResponse<WordPressProduct>> {
    return authenticatedFetch<WordPressProduct>(`/productos/${productId}`, {
      method: 'DELETE',
    });
  },

  /**
   * Publish a draft product (or restore from trash)
   */
  async publishProduct(productId: number): Promise<WriteResponse<WordPressProduct>> {
    return authenticatedFetch<WordPressProduct>(`/productos/${productId}`, {
      method: 'POST',
      body: JSON.stringify({ status: 'publish' }),
    });
  },

  /**
   * Upload media file to WordPress
   */
  async uploadMedia(file: File): Promise<WriteResponse<{ id: number; url: string }>> {
    if (!isAuthenticated()) {
      return {
        success: false,
        error: {
          code: 'not_authenticated',
          message: 'WordPress credentials not configured',
          status: 401,
        },
      };
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const authHeader = await getAuthHeader();
      if (!authHeader) {
        return {
          success: false,
          error: {
            code: 'jwt_failed',
            message: 'Failed to obtain JWT token for upload',
            status: 401,
          },
        };
      }

      const response = await fetch(`${CONFIG.API_URL}/wp-json/wp/v2/media`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: {
            code: errorData.code || 'upload_failed',
            message: errorData.message || 'Failed to upload media',
            status: response.status,
          },
        };
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          id: data.id,
          url: data.source_url,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'upload_error',
          message: error instanceof Error ? error.message : 'Upload failed',
          status: 0,
        },
      };
    }
  },

  /**
   * Test authentication
   */
  async testConnection(): Promise<WriteResponse<{ user: string; capabilities: string[] }>> {
    return authenticatedFetch('/users/me?context=edit', { method: 'GET' });
  },
};

export default WordPressWriteAPI;
