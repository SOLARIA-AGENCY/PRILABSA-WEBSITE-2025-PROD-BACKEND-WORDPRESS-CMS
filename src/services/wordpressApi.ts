/**
 * WordPress REST API Service
 * Connects to WordPress on GoDaddy to fetch dynamic product data
 *
 * Usage:
 * - Development: Uses Vite proxy (/api/wp-json/...)
 * - Production: Direct fetch from WordPress domain
 */

import type {
  WordPressProduct,
  WordPressCategory,
  WordPressProductQuery,
  WordPressLanguage
} from '../types/wordpress';

// Configuration
const CONFIG = {
  // WordPress API base URL - Production domain
  WORDPRESS_URL: 'https://productos.prilabsa.com',

  // API base path
  API_PATH: '/wp-json/wp/v2',

  // Default pagination
  DEFAULT_PER_PAGE: 100,

  // Cache duration in milliseconds (5 minutes)
  CACHE_DURATION: 5 * 60 * 1000,

  // Request timeout
  TIMEOUT: 30000,
};

// Determine if we're in development mode
const isDevelopment = typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// Build API URL based on environment
const getApiUrl = (endpoint: string): string => {
  if (isDevelopment) {
    // In development, use Vite proxy to avoid CORS
    return `/api/wp-json/wp/v2${endpoint}`;
  }
  // In production, fetch directly from WordPress
  return `${CONFIG.WORDPRESS_URL}${CONFIG.API_PATH}${endpoint}`;
};

// Simple in-memory cache
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

const getCached = <T>(key: string): T | null => {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CONFIG.CACHE_DURATION) {
    return entry.data as T;
  }
  cache.delete(key);
  return null;
};

const setCache = <T>(key: string, data: T): void => {
  cache.set(key, { data, timestamp: Date.now() });
};

// Clear cache (useful for forced refresh)
export const clearCache = (): void => {
  cache.clear();
};

/**
 * WordPress API Service
 */
export const WordPressAPI = {
  /**
   * Fetch all products from WordPress
   */
  async getProducts(query: WordPressProductQuery = {}): Promise<WordPressProduct[]> {
    const params = new URLSearchParams({
      per_page: String(query.per_page || CONFIG.DEFAULT_PER_PAGE),
      page: String(query.page || 1),
      ...(query.search && { search: query.search }),
      ...(query['categorias-productos'] && { 'categorias-productos': String(query['categorias-productos']) }),
      ...(query.orderby && { orderby: query.orderby }),
      ...(query.order && { order: query.order }),
    });

    const cacheKey = `products:${params.toString()}`;
    const cached = getCached<WordPressProduct[]>(cacheKey);
    if (cached) {
      console.log('[WordPressAPI] Using cached products');
      return cached;
    }

    try {
      const url = getApiUrl(`/productos?${params.toString()}`);
      console.log('[WordPressAPI] Fetching:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(CONFIG.TIMEOUT),
      });

      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
      }

      const products: WordPressProduct[] = await response.json();
      setCache(cacheKey, products);

      console.log(`[WordPressAPI] Fetched ${products.length} products`);
      return products;
    } catch (error) {
      console.error('[WordPressAPI] Error fetching products:', error);
      throw error;
    }
  },

  /**
   * Fetch a single product by ID
   */
  async getProductById(id: number): Promise<WordPressProduct | null> {
    const cacheKey = `product:${id}`;
    const cached = getCached<WordPressProduct>(cacheKey);
    if (cached) return cached;

    try {
      const url = getApiUrl(`/productos/${id}`);
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(CONFIG.TIMEOUT),
      });

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`WordPress API error: ${response.status}`);
      }

      const product: WordPressProduct = await response.json();
      setCache(cacheKey, product);
      return product;
    } catch (error) {
      console.error('[WordPressAPI] Error fetching product:', error);
      throw error;
    }
  },

  /**
   * Fetch a single product by slug
   */
  async getProductBySlug(slug: string): Promise<WordPressProduct | null> {
    const cacheKey = `product:slug:${slug}`;
    const cached = getCached<WordPressProduct>(cacheKey);
    if (cached) return cached;

    try {
      const url = getApiUrl(`/productos?slug=${encodeURIComponent(slug)}`);
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(CONFIG.TIMEOUT),
      });

      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status}`);
      }

      const products: WordPressProduct[] = await response.json();
      if (products.length === 0) return null;

      const product = products[0];
      setCache(cacheKey, product);
      return product;
    } catch (error) {
      console.error('[WordPressAPI] Error fetching product by slug:', error);
      throw error;
    }
  },

  /**
   * Fetch a single product by code (e.g., AD001, EQ015)
   */
  async getProductByCode(code: string): Promise<WordPressProduct | null> {
    // Search all products and filter by code
    const products = await this.getProducts();
    return products.find(p =>
      p.codigo === code ||
      p.acf?.codigo === code
    ) || null;
  },

  /**
   * Fetch all product categories
   */
  async getCategories(): Promise<WordPressCategory[]> {
    const cacheKey = 'categories';
    const cached = getCached<WordPressCategory[]>(cacheKey);
    if (cached) return cached;

    try {
      const url = getApiUrl('/categorias-productos');
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(CONFIG.TIMEOUT),
      });

      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status}`);
      }

      const categories: WordPressCategory[] = await response.json();
      setCache(cacheKey, categories);

      console.log(`[WordPressAPI] Fetched ${categories.length} categories`);
      return categories;
    } catch (error) {
      console.error('[WordPressAPI] Error fetching categories:', error);
      throw error;
    }
  },

  /**
   * Fetch products by category slug
   */
  async getProductsByCategory(categorySlug: string): Promise<WordPressProduct[]> {
    const categories = await this.getCategories();
    const category = categories.find(c => c.slug === categorySlug);

    if (!category) {
      console.warn(`[WordPressAPI] Category not found: ${categorySlug}`);
      return [];
    }

    return this.getProducts({ 'categorias-productos': category.id });
  },

  /**
   * Search products by term
   */
  async searchProducts(term: string): Promise<WordPressProduct[]> {
    return this.getProducts({ search: term });
  },

  /**
   * Get product count by category
   */
  async getCategoryStats(): Promise<Record<string, number>> {
    const categories = await this.getCategories();
    return categories.reduce((acc, cat) => {
      acc[cat.slug] = cat.count;
      return acc;
    }, {} as Record<string, number>);
  },

  /**
   * Get localized product name
   */
  getLocalizedName(product: WordPressProduct, lang: WordPressLanguage = 'es'): string {
    const acf = product.acf || product;
    switch (lang) {
      case 'en':
        return acf.nombre_producto_en || acf.nombre_producto_es || product.title.rendered;
      case 'pt':
        return acf.nombre_producto_pt || acf.nombre_producto_es || product.title.rendered;
      default:
        return acf.nombre_producto_es || product.title.rendered;
    }
  },

  /**
   * Get localized product description
   */
  getLocalizedDescription(product: WordPressProduct, lang: WordPressLanguage = 'es'): string {
    const acf = product.acf || product;
    switch (lang) {
      case 'en':
        return acf.descripcion_en || acf.descripcion_es || '';
      case 'pt':
        return acf.descripcion_pt || acf.descripcion_es || '';
      default:
        return acf.descripcion_es || '';
    }
  },

  /**
   * Get localized benefits array
   */
  getLocalizedBenefits(product: WordPressProduct, lang: WordPressLanguage = 'es'): string[] {
    const acf = product.acf || product;
    const suffix = lang === 'es' ? '_es' : lang === 'en' ? '_en' : '_pt';
    const fallback = '_es';

    const benefits: string[] = [];
    for (let i = 1; i <= 3; i++) {
      const key = `beneficio_${i}${suffix}` as keyof typeof acf;
      const fallbackKey = `beneficio_${i}${fallback}` as keyof typeof acf;
      const value = acf[key] || acf[fallbackKey];
      if (value && typeof value === 'string') {
        benefits.push(value);
      }
    }
    return benefits;
  },

  /**
   * Get localized presentation (HTML string from WordPress)
   */
  getLocalizedPresentation(product: WordPressProduct, lang: WordPressLanguage = 'es'): string {
    const acf = product.acf || product;
    switch (lang) {
      case 'en':
        return acf.presentacion_en || acf.presentacion_es || '';
      case 'pt':
        return acf.presentacion_pt || acf.presentacion_es || '';
      default:
        return acf.presentacion_es || '';
    }
  },

  /**
   * Health check - verify WordPress API is accessible
   */
  async healthCheck(): Promise<boolean> {
    try {
      const url = isDevelopment
        ? '/api/wp-json/wp/v2/productos?per_page=1'
        : `${CONFIG.WORDPRESS_URL}${CONFIG.API_PATH}/productos?per_page=1`;

      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(5000),
      });

      return response.ok;
    } catch {
      return false;
    }
  },
};

export default WordPressAPI;

// ==========================================
// WordPress Hooks Stubs - TODO: Implement
// ==========================================

import { useState, useEffect } from 'react';

// Blog Post Hook
export function useBlogPost(id: string) {
  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`https://productos.prilabsa.com/wp-json/wp/v2/posts/${id}?_embed`)
      .then(res => res.json())
      .then(data => { setArticle(data); setIsLoading(false); })
      .catch(err => { setError(err); setIsLoading(false); });
  }, [id]);

  return { article, isLoading, error };
}

// Noticias Hook
export function useNoticias() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('https://productos.prilabsa.com/wp-json/wp/v2/posts?_embed&per_page=10')
      .then(res => res.json())
      .then(data => { setPosts(data); setLoading(false); })
      .catch(err => { setError(err); setLoading(false); });
  }, []);

  return { posts, loading, error };
}

// Single Noticia Hook
export function useNoticia(id: string) {
  const [noticia, setNoticia] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`https://productos.prilabsa.com/wp-json/wp/v2/posts/${id}?_embed`)
      .then(res => res.json())
      .then(data => { setNoticia(data); setIsLoading(false); })
      .catch(err => { setError(err); setIsLoading(false); });
  }, [id]);

  return { noticia, isLoading, error };
}

// Helper: Extract image URL from WordPress embedded data or media ID
const getImageUrl = (wp: any): string => {
  // Try embedded featured media first
  const embedded = wp._embedded?.['wp:featuredmedia']?.[0];
  if (embedded?.source_url) {
    return embedded.source_url;
  }
  // Fallback to acf image if it's an object with url
  if (wp.acf?.imagen_producto?.url) {
    return wp.acf.imagen_producto.url;
  }
  return '/assets/images/placeholder-product.jpg';
};

// Products Hook - Transforms WordPress data for frontend consumption
export function useProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Use _embed to get featured images in same request
    fetch('https://productos.prilabsa.com/wp-json/wp/v2/productos?per_page=100&_embed')
      .then(res => res.json())
      .then(data => {
        // Transform WordPress products to frontend format
        const transformed = data.map((wp: any) => ({
          ...wp,
          // Map critical fields for filtering/display
          id: wp.id,
          slug: wp.slug,
          codigo: wp.acf?.codigo || '',
          category: wp.acf?.categoria || '', // ⭐ Critical: map acf.categoria → category
          name: wp.acf?.nombre_producto_es || wp.title?.rendered || '',
          description: wp.acf?.descripcion_es || '',
          assets: {
            image: {
              path: getImageUrl(wp)
            }
          }
        }));
        setProducts(transformed);
        setLoading(false);
        setIsLoading(false);
      })
      .catch(err => { setError(err); setLoading(false); setIsLoading(false); });
  }, []);

  return { products, loading, isLoading, error };
}

// Single Product Hook - Searches by SLUG (not ID)
export function useProduct(slug: string) {
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) return;
    // Use slug parameter and _embed for images
    fetch(`https://productos.prilabsa.com/wp-json/wp/v2/productos?slug=${slug.toLowerCase()}&_embed`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          const wp = data[0];
          // Transform to frontend format
          const transformed = {
            ...wp,
            id: wp.id,
            slug: wp.slug,
            codigo: wp.acf?.codigo || '',
            category: wp.acf?.categoria || '',
            name: wp.acf?.nombre_producto_es || wp.title?.rendered || '',
            description: wp.acf?.descripcion_es || '',
            assets: {
              image: {
                path: getImageUrl(wp)
              }
            }
          };
          setProduct(transformed);
        } else {
          setProduct(null);
        }
        setIsLoading(false);
      })
      .catch(err => { setError(err); setIsLoading(false); });
  }, [slug]);

  return { product, isLoading, error };
}

// Blog Hook (re-export)
export { useBlog } from '../hooks/useBlog';
