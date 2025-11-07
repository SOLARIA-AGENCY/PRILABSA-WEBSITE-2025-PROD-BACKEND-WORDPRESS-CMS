/**
 * WordPress REST API Client
 * PRILABSA Headless WordPress Integration
 * @author SOLARIA AGENCY
 */

import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
  WordPressProduct,
  WordPressCategory,
  WordPressTag,
  WordPressMedia,
  ProductsQueryParams,
  CategoriesQueryParams,
  TagsQueryParams,
  SearchResponse,
  PaginatedResponse,
  APIError,
  PaginationMeta,
  isWordPressAPIError,
} from '../types/wordpress';

/**
 * WordPress API Configuration
 */
interface WordPressAPIConfig {
  baseUrl: string;
  timeout?: number;
  enableCache?: boolean;
  headers?: Record<string, string>;
}

/**
 * WordPress REST API Client Class
 */
class WordPressAPI {
  private client: AxiosInstance;
  private config: WordPressAPIConfig;

  constructor(config: WordPressAPIConfig) {
    this.config = {
      timeout: 10000,
      enableCache: true,
      ...config,
    };

    // Create Axios instance
    this.client = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...this.config.headers,
      },
    });

    // Setup interceptors
    this.setupInterceptors();
  }

  /**
   * Setup Request and Response Interceptors
   */
  private setupInterceptors(): void {
    // Request Interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add cache headers if enabled
        if (this.config.enableCache) {
          config.headers['Cache-Control'] = 'public, max-age=300'; // 5 minutes
        } else {
          config.headers['Cache-Control'] = 'no-cache';
        }

        // Add JWT token if available (for future authenticated endpoints)
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Log request in development
        if (import.meta.env.DEV) {
          console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
            params: config.params,
            data: config.data,
          });
        }

        return config;
      },
      (error) => {
        return Promise.reject(this.handleError(error));
      }
    );

    // Response Interceptor
    this.client.interceptors.response.use(
      (response) => {
        // Log response in development
        if (import.meta.env.DEV) {
          console.log(`[API Response] ${response.config.url}`, {
            status: response.status,
            data: response.data,
            headers: {
              'x-wp-total': response.headers['x-wp-total'],
              'x-wp-totalpages': response.headers['x-wp-totalpages'],
            },
          });
        }

        return response;
      },
      (error) => {
        return Promise.reject(this.handleError(error));
      }
    );
  }

  /**
   * Get authentication token from localStorage
   */
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('wp_auth_token');
  }

  /**
   * Handle API Errors
   */
  private handleError(error: AxiosError): APIError {
    // Network error
    if (error.code === 'ECONNABORTED') {
      return {
        message: 'La solicitud ha excedido el tiempo de espera',
        code: 'TIMEOUT',
        status: 408,
        originalError: error,
      };
    }

    if (!error.response) {
      return {
        message: 'Error de conexión. Verifica tu conexión a internet.',
        code: 'NETWORK_ERROR',
        status: 0,
        originalError: error,
      };
    }

    // WordPress API Error
    const responseData = error.response.data;
    if (isWordPressAPIError(responseData)) {
      return {
        message: responseData.message,
        code: responseData.code,
        status: responseData.data.status,
        originalError: error,
      };
    }

    // Generic HTTP Error
    return {
      message: error.message || 'Ha ocurrido un error inesperado',
      code: 'UNKNOWN_ERROR',
      status: error.response.status,
      originalError: error,
    };
  }

  /**
   * Extract pagination metadata from response headers
   */
  private extractPaginationMeta(
    response: AxiosResponse,
    params: { page?: number; per_page?: number }
  ): PaginationMeta {
    const total = parseInt(response.headers['x-wp-total'] || '0', 10);
    const totalPages = parseInt(response.headers['x-wp-totalpages'] || '1', 10);
    const currentPage = params.page || 1;
    const perPage = params.per_page || 10;

    return {
      total,
      totalPages,
      currentPage,
      perPage,
    };
  }

  /**
   * GET /wp/v2/productos
   * Fetch all products with optional filters and pagination
   */
  async getProducts(
    params: ProductsQueryParams = {}
  ): Promise<PaginatedResponse<WordPressProduct>> {
    const defaultParams: ProductsQueryParams = {
      per_page: 100,
      _embed: true,
      status: 'publish',
      ...params,
    };

    const response = await this.client.get<WordPressProduct[]>('/wp/v2/productos', {
      params: defaultParams,
    });

    return {
      data: response.data,
      pagination: this.extractPaginationMeta(response, defaultParams),
    };
  }

  /**
   * GET /wp/v2/productos/{id}
   * Fetch single product by ID
   */
  async getProductById(id: number, embed = true): Promise<WordPressProduct> {
    const response = await this.client.get<WordPressProduct>(`/wp/v2/productos/${id}`, {
      params: { _embed: embed },
    });

    return response.data;
  }

  /**
   * GET /wp/v2/productos (by slug)
   * Fetch single product by slug
   */
  async getProductBySlug(slug: string, embed = true): Promise<WordPressProduct | null> {
    const response = await this.client.get<WordPressProduct[]>('/wp/v2/productos', {
      params: {
        slug,
        _embed: embed,
        per_page: 1,
      },
    });

    return response.data.length > 0 ? response.data[0] : null;
  }

  /**
   * GET /wp/v2/categorias-productos
   * Fetch all product categories
   */
  async getCategories(params: CategoriesQueryParams = {}): Promise<WordPressCategory[]> {
    const defaultParams: CategoriesQueryParams = {
      per_page: 100,
      orderby: 'name',
      order: 'asc',
      hide_empty: true,
      ...params,
    };

    const response = await this.client.get<WordPressCategory[]>(
      '/wp/v2/categorias-productos',
      {
        params: defaultParams,
      }
    );

    return response.data;
  }

  /**
   * GET /wp/v2/categorias-productos/{id}
   * Fetch single category by ID
   */
  async getCategoryById(id: number): Promise<WordPressCategory> {
    const response = await this.client.get<WordPressCategory>(
      `/wp/v2/categorias-productos/${id}`
    );

    return response.data;
  }

  /**
   * GET /wp/v2/tags-productos
   * Fetch all product tags
   */
  async getTags(params: TagsQueryParams = {}): Promise<WordPressTag[]> {
    const defaultParams: TagsQueryParams = {
      per_page: 100,
      orderby: 'name',
      order: 'asc',
      hide_empty: true,
      ...params,
    };

    const response = await this.client.get<WordPressTag[]>('/wp/v2/tags-productos', {
      params: defaultParams,
    });

    return response.data;
  }

  /**
   * GET /wp/v2/tags-productos/{id}
   * Fetch single tag by ID
   */
  async getTagById(id: number): Promise<WordPressTag> {
    const response = await this.client.get<WordPressTag>(`/wp/v2/tags-productos/${id}`);

    return response.data;
  }

  /**
   * GET /wp/v2/media/{id}
   * Fetch media file by ID
   */
  async getMediaById(id: number): Promise<WordPressMedia> {
    const response = await this.client.get<WordPressMedia>(`/wp/v2/media/${id}`);

    return response.data;
  }

  /**
   * GET /wp/v2/media (bulk)
   * Fetch multiple media files by IDs
   */
  async getMediaByIds(ids: number[]): Promise<WordPressMedia[]> {
    if (ids.length === 0) return [];

    const response = await this.client.get<WordPressMedia[]>('/wp/v2/media', {
      params: {
        include: ids.join(','),
        per_page: 100,
      },
    });

    return response.data;
  }

  /**
   * GET /prilabsa/v1/productos/search
   * Custom search endpoint (if implemented in WordPress)
   */
  async searchProducts(query: string, limit = 20): Promise<SearchResponse> {
    try {
      const response = await this.client.get<SearchResponse>('/prilabsa/v1/productos/search', {
        params: {
          s: query,
          limit,
        },
      });

      return response.data;
    } catch (error) {
      // Fallback to standard WordPress search if custom endpoint not available
      console.warn('Custom search endpoint not available, falling back to standard search');
      const products = await this.getProducts({
        search: query,
        per_page: limit,
      });

      return {
        success: true,
        data: products.data,
        total: products.pagination.total,
        pages: products.pagination.totalPages,
      };
    }
  }

  /**
   * GET Products by Category ID
   * Helper method for category filtering
   */
  async getProductsByCategory(
    categoryId: number,
    params: Omit<ProductsQueryParams, 'categorias-productos'> = {}
  ): Promise<PaginatedResponse<WordPressProduct>> {
    return this.getProducts({
      ...params,
      'categorias-productos': categoryId,
    });
  }

  /**
   * GET Products by Tag ID
   * Helper method for tag filtering
   */
  async getProductsByTag(
    tagId: number,
    params: Omit<ProductsQueryParams, 'tags-productos'> = {}
  ): Promise<PaginatedResponse<WordPressProduct>> {
    return this.getProducts({
      ...params,
      'tags-productos': tagId,
    });
  }

  /**
   * GET Products by Multiple Categories
   * Helper method for multiple category filtering
   */
  async getProductsByCategories(
    categoryIds: number[],
    params: Omit<ProductsQueryParams, 'categorias-productos'> = {}
  ): Promise<PaginatedResponse<WordPressProduct>> {
    return this.getProducts({
      ...params,
      'categorias-productos': categoryIds,
    });
  }

  /**
   * Health Check
   * Verify API connection
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.client.get('/wp/v2');
      return response.status === 200;
    } catch (error) {
      console.error('[API Health Check Failed]', error);
      return false;
    }
  }

  /**
   * Get API Base URL
   */
  getBaseUrl(): string {
    return this.config.baseUrl;
  }

  /**
   * Update API Configuration
   */
  updateConfig(config: Partial<WordPressAPIConfig>): void {
    this.config = { ...this.config, ...config };

    // Update Axios instance
    if (config.baseUrl) {
      this.client.defaults.baseURL = config.baseUrl;
    }
    if (config.timeout !== undefined) {
      this.client.defaults.timeout = config.timeout;
    }
    if (config.headers) {
      this.client.defaults.headers = {
        ...this.client.defaults.headers,
        ...config.headers,
      };
    }
  }
}

/**
 * API Client Instance Factory
 */
function createWordPressAPIClient(): WordPressAPI {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost/prilabsa-local/wp-json';
  const timeout = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10);
  const enableCache = import.meta.env.VITE_ENABLE_CACHE !== 'false';

  return new WordPressAPI({
    baseUrl,
    timeout,
    enableCache,
  });
}

/**
 * Singleton API Client Instance
 */
export const wordpressApi = createWordPressAPIClient();

/**
 * Export class for custom instances
 */
export { WordPressAPI };

/**
 * Export types
 */
export type { WordPressAPIConfig };
