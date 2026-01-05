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
import type { BlogArticle, MultiLanguageContent } from '../types/blog';

// WordPress Post interface for blog/news
interface WordPressPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  slug: string;
  featured_media: number;
  categories: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'author'?: Array<{ name: string }>;
  };
}

// Helper: Strip HTML tags from WordPress content
function stripHtmlTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .trim();
}

// Helper: Create MultiLanguageContent from single string
function toMultiLang(content: string): MultiLanguageContent {
  const cleaned = stripHtmlTags(content);
  return { es: cleaned, en: cleaned, pt: cleaned };
}

// Transform WordPress post to BlogArticle format
function transformWordPressPost(post: WordPressPost): BlogArticle {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    '/assets/iniciodev/blue-texture-background.jpg';
  const authorName = post._embedded?.author?.[0]?.name || 'Prilabsa';

  return {
    id: post.id.toString(),
    title: toMultiLang(post.title.rendered),
    summary: toMultiLang(post.excerpt.rendered),
    content: toMultiLang(post.content.rendered),
    date: post.date.split('T')[0],
    author: toMultiLang(authorName),
    heroImage: featuredImage,
    tags: { es: [], en: [], pt: [] }
  };
}

// Configuration
const CONFIG = {
  // WordPress API base URL - Production domain
  WORDPRESS_URL: 'https://productos.prilabsa.com',

  // API base path
  API_PATH: '/wp-json/wp/v2',

  // Default pagination
  DEFAULT_PER_PAGE: 100,

  // Memory cache duration (5 minutes)
  CACHE_DURATION: 5 * 60 * 1000,

  // LocalStorage cache duration (30 minutes) - for stale-while-revalidate
  STORAGE_CACHE_DURATION: 30 * 60 * 1000,

  // Request timeout
  TIMEOUT: 30000,

  // LocalStorage keys
  STORAGE_KEY_PRODUCTS: 'prilabsa_products_cache',
  STORAGE_KEY_TIMESTAMP: 'prilabsa_products_timestamp',
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
  // Also clear localStorage cache
  try {
    localStorage.removeItem(CONFIG.STORAGE_KEY_PRODUCTS);
    localStorage.removeItem(CONFIG.STORAGE_KEY_TIMESTAMP);
  } catch {
    // Ignore localStorage errors (SSR, quota exceeded, etc.)
  }
};

// ============================================
// LocalStorage Persistent Cache (Stale-While-Revalidate)
// ============================================

interface StoredProductsCache {
  data: WordPressProduct[];
  timestamp: number;
}

/**
 * Get products from localStorage cache
 * Returns null if cache is expired or doesn't exist
 */
const getStoredProducts = (): WordPressProduct[] | null => {
  try {
    const stored = localStorage.getItem(CONFIG.STORAGE_KEY_PRODUCTS);
    const timestamp = localStorage.getItem(CONFIG.STORAGE_KEY_TIMESTAMP);

    if (!stored || !timestamp) return null;

    const cacheAge = Date.now() - parseInt(timestamp, 10);
    if (cacheAge > CONFIG.STORAGE_CACHE_DURATION) {
      // Cache expired, but return stale data for immediate display
      console.log('[WordPressAPI] localStorage cache stale, will revalidate');
      return JSON.parse(stored);
    }

    console.log('[WordPressAPI] Using localStorage cached products');
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

/**
 * Check if stored cache is still fresh
 */
const isStoredCacheFresh = (): boolean => {
  try {
    const timestamp = localStorage.getItem(CONFIG.STORAGE_KEY_TIMESTAMP);
    if (!timestamp) return false;

    const cacheAge = Date.now() - parseInt(timestamp, 10);
    return cacheAge < CONFIG.STORAGE_CACHE_DURATION;
  } catch {
    return false;
  }
};

/**
 * Save products to localStorage
 */
const storeProducts = (products: WordPressProduct[]): void => {
  try {
    localStorage.setItem(CONFIG.STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    localStorage.setItem(CONFIG.STORAGE_KEY_TIMESTAMP, String(Date.now()));
    console.log(`[WordPressAPI] Cached ${products.length} products to localStorage`);
  } catch (e) {
    console.warn('[WordPressAPI] Failed to cache to localStorage:', e);
  }
};

/**
 * WordPress API Service
 */
export const WordPressAPI = {
  /**
   * Fetch all products from WordPress
   * Uses stale-while-revalidate pattern:
   * 1. Return localStorage cache immediately (if exists)
   * 2. Revalidate in background if cache is stale
   * 3. Fresh network fetch if no cache
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
    const isDefaultQuery = params.toString() === `per_page=${CONFIG.DEFAULT_PER_PAGE}&page=1`;

    // 1. Check memory cache first (fastest)
    const memoryCached = getCached<WordPressProduct[]>(cacheKey);
    if (memoryCached) {
      console.log('[WordPressAPI] Using memory cached products');
      return memoryCached;
    }

    // 2. For default query, check localStorage (stale-while-revalidate)
    if (isDefaultQuery) {
      const storedProducts = getStoredProducts();
      if (storedProducts && storedProducts.length > 0) {
        // Set memory cache
        setCache(cacheKey, storedProducts);

        // If cache is stale, revalidate in background
        if (!isStoredCacheFresh()) {
          console.log('[WordPressAPI] Revalidating stale cache in background...');
          this._fetchAndCacheProducts(cacheKey).catch(console.error);
        }

        return storedProducts;
      }
    }

    // 3. No cache available, fetch from network
    return this._fetchAndCacheProducts(cacheKey, params.toString());
  },

  /**
   * Internal: Fetch products from network and update all caches
   */
  /**
   * Internal: Fetch products from network and update all caches
   * Supports recursive fetching if multiple pages exist
   */
  async _fetchAndCacheProducts(cacheKey: string, queryString?: string): Promise<WordPressProduct[]> {
    try {
      let allProducts: WordPressProduct[] = [];
      let page = 1;
      let totalPages = 1;
      
      // Base URL construction
      const baseEndpoint = queryString ? `/productos?${queryString}` : `/productos?per_page=${CONFIG.DEFAULT_PER_PAGE}`;
      
      // If we are doing a default fetch (all items), we potentially need to loop pages
      // If query has specific page param, just fetch that one.
      const isSpecificPageRequest = queryString?.includes('page=');

      do {
        // Construct URL for current page
        let endpoint = baseEndpoint;
        if (!isSpecificPageRequest) {
           endpoint = `${baseEndpoint}&page=${page}`;
        }

        const url = getApiUrl(endpoint);
        console.log(`[WordPressAPI] Fetching from network (Page ${page}):`, url);

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          signal: AbortSignal.timeout(CONFIG.TIMEOUT),
        });

        if (!response.ok) {
           // If page > 1 and 400/404, it might just mean end of pagination if headers were wrong, but usually we trust x-wp-totalpages
           if (page > 1 && (response.status === 400 || response.status === 404)) {
             break;
           }
           throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
        }

        const products: WordPressProduct[] = await response.json();
        allProducts = [...allProducts, ...products];

        // Check pagination headers
        const totalPagesHeader = response.headers.get('x-wp-totalpages');
        if (totalPagesHeader) {
          totalPages = parseInt(totalPagesHeader, 10);
        }

        // If specific page requested, we are done
        if (isSpecificPageRequest) break;

        page++;
      } while (page <= totalPages);

      // Update memory cache
      setCache(cacheKey, allProducts);

      // Update localStorage for default query
      const isDefaultQuery = !queryString || queryString === `per_page=${CONFIG.DEFAULT_PER_PAGE}&page=1`;
      if (isDefaultQuery) {
        storeProducts(allProducts);
      }

      console.log(`[WordPressAPI] Fetched and cached ${allProducts.length} total products`);
      return allProducts;
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

/**
 * Prefetch products on app initialization
 * Call this in main.tsx or App.tsx to warm up the cache
 */
export const prefetchProducts = async (): Promise<void> => {
  try {
    // Check if we already have fresh cache
    if (isStoredCacheFresh()) {
      console.log('[WordPressAPI] Products already cached, skipping prefetch');
      return;
    }

    console.log('[WordPressAPI] Prefetching products...');
    await WordPressAPI.getProducts();
    console.log('[WordPressAPI] Prefetch complete');
  } catch (error) {
    console.warn('[WordPressAPI] Prefetch failed:', error);
  }
};

/**
 * Check if products are cached (for showing loading state)
 */
export const hasProductsCache = (): boolean => {
  try {
    const stored = localStorage.getItem(CONFIG.STORAGE_KEY_PRODUCTS);
    return stored !== null && stored.length > 2; // Not empty array "[]"
  } catch {
    return false;
  }
};

export default WordPressAPI;

// ==========================================
// WordPress Hooks for Blog/Noticias CPT
// Uses ACF multiidioma fields
// ==========================================

import { useState, useEffect } from 'react';

// WordPress Blog/Noticias CPT response structure (with ACF fields)
interface WordPressCPTPost {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  acf: {
    titulo_es?: string;
    titulo_en?: string;
    titulo_pt?: string;
    resumen_es?: string;
    resumen_en?: string;
    resumen_pt?: string;
    contenido_es?: string;
    contenido_en?: string;
    contenido_pt?: string;
    autor_es?: string;
    autor_en?: string;
    autor_pt?: string;
    fecha_publicacion?: string;
    tags_es?: string;
    tags_en?: string;
    tags_pt?: string;
    imagen_destacada?: string | { url: string } | number;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
  };
}

/**
 * Extract image URL from ACF field (can be string, object with url, or media ID)
 */
function getCPTImageUrl(imageField: string | { url: string } | number | undefined, embedded?: WordPressCPTPost['_embedded']): string {
  if (typeof imageField === 'string' && imageField.startsWith('http')) {
    return imageField;
  }
  if (typeof imageField === 'object' && imageField && 'url' in imageField) {
    return imageField.url;
  }
  if (embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    return embedded['wp:featuredmedia'][0].source_url;
  }
  return '/assets/iniciodev/blue-texture-background.jpg';
}

/**
 * Parse tags string (CSV format) to array
 */
function parseCPTTags(tagsString: string | undefined): string[] {
  if (!tagsString) return [];
  return tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
}

/**
 * Transforms WordPress Blog/Noticias CPT post to BlogArticle format
 * Uses ACF multiidioma fields
 */
function transformCPTPost(post: WordPressCPTPost): BlogArticle {
  const acf = post.acf || {};

  const title: MultiLanguageContent = {
    es: stripHtmlTags(acf.titulo_es || post.title?.rendered || ''),
    en: stripHtmlTags(acf.titulo_en || acf.titulo_es || post.title?.rendered || ''),
    pt: stripHtmlTags(acf.titulo_pt || acf.titulo_es || post.title?.rendered || '')
  };

  const summary: MultiLanguageContent = {
    es: stripHtmlTags(acf.resumen_es || ''),
    en: stripHtmlTags(acf.resumen_en || acf.resumen_es || ''),
    pt: stripHtmlTags(acf.resumen_pt || acf.resumen_es || '')
  };

  // Keep HTML in content for rendering
  const content: MultiLanguageContent = {
    es: acf.contenido_es || '',
    en: acf.contenido_en || acf.contenido_es || '',
    pt: acf.contenido_pt || acf.contenido_es || ''
  };

  const author: MultiLanguageContent = {
    es: acf.autor_es || 'Prilabsa',
    en: acf.autor_en || acf.autor_es || 'Prilabsa',
    pt: acf.autor_pt || acf.autor_es || 'Prilabsa'
  };

  // Parse date - ACF fecha_publicacion is in Ymd format (20251203)
  let dateStr = post.date.split('T')[0];
  if (acf.fecha_publicacion) {
    const fp = acf.fecha_publicacion;
    if (fp.length === 8) {
      dateStr = `${fp.slice(0, 4)}-${fp.slice(4, 6)}-${fp.slice(6, 8)}`;
    } else {
      dateStr = fp;
    }
  }

  return {
    id: post.id.toString(),
    title,
    summary,
    content,
    date: dateStr,
    author,
    heroImage: getCPTImageUrl(acf.imagen_destacada, post._embedded),
    tags: {
      es: parseCPTTags(acf.tags_es),
      en: parseCPTTags(acf.tags_en),
      pt: parseCPTTags(acf.tags_pt)
    }
  };
}

// Blog Post Hook - Fetches single blog post from CPT 'blog'
export function useBlogPost(id: string) {
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    // Use CPT 'blog' endpoint
    fetch(`https://productos.prilabsa.com/wp-json/wp/v2/blog/${id}?_embed`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: WordPressCPTPost) => {
        const transformed = transformCPTPost(data);
        setArticle(transformed);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, [id]);

  return { article, isLoading, error };
}

// Noticias Hook - Fetches news from CPT 'noticias'
export function useNoticias() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Use CPT 'noticias' endpoint
    fetch('https://productos.prilabsa.com/wp-json/wp/v2/noticias?_embed&per_page=10')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: WordPressCPTPost[]) => {
        const transformed = data.map(transformCPTPost);
        setArticles(transformed);
        setLoading(false);
      })
      .catch(err => { setError(err); setLoading(false); });
  }, []);

  return {
    posts: articles,
    articles,
    loading,
    isLoading: loading,
    error
  };
}

// Single Noticia Hook - Fetches single news from CPT 'noticias'
export function useNoticia(id: string) {
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    // Use CPT 'noticias' endpoint
    fetch(`https://productos.prilabsa.com/wp-json/wp/v2/noticias/${id}?_embed`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: WordPressCPTPost) => {
        const transformed = transformCPTPost(data);
        setArticle(transformed);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, [id]);

  return {
    noticia: article,  // Legacy alias
    article,
    isLoading,
    error
  };
}

// Helper: Extract image URL from WordPress embedded data or media ID
export const getImageUrl = (wp: any): string => {
  if (!wp) return '/assets/images/placeholder-product.jpg';
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

// Helper: Extract benefits from ACF fields
export const getBenefits = (acf: any): string[] => {
  const benefits: string[] = [];
  if (acf?.beneficio_1_es) benefits.push(acf.beneficio_1_es);
  if (acf?.beneficio_2_es) benefits.push(acf.beneficio_2_es);
  if (acf?.beneficio_3_es) benefits.push(acf.beneficio_3_es);
  return benefits;
};

// Helper: Parse presentation HTML to array
export const parsePresentation = (html: string): string[] => {
  if (!html) return [];
  // Extract text from <li> tags
  const matches = html.match(/<li[^>]*>([^<]+)<\/li>/gi);
  if (!matches) return [html.replace(/<[^>]+>/g, '')]; // Fallback: strip all HTML
  return matches.map(li => li.replace(/<\/?li[^>]*>/gi, '').trim()).filter(Boolean);
};

// Helper: Generate short description from full description
const generateShortDescription = (fullDescription: string | undefined): string => {
  if (!fullDescription) return '';
  const clean = fullDescription.replace(/<[^>]*>/g, '').trim();
  if (!clean) return '';
  // Try to get first sentence
  const sentenceMatch = clean.match(/^[^.!?]+[.!?]/);
  if (sentenceMatch && sentenceMatch[0].length <= 200) {
    return sentenceMatch[0].trim();
  }
  // Fallback: first 150 chars + ellipsis
  if (clean.length <= 150) return clean;
  return clean.substring(0, 147).trim() + '...';
};

// Helper: Parse specifications HTML to key-value pairs
// Expects format: <li><strong>Key:</strong> Value</li> OR <li>Key: Value</li>
const parseSpecifications = (html: string | undefined): Array<{ key: string; value: string }> => {
  if (!html) return [];

  const specs: Array<{ key: string; value: string }> = [];
  const liMatches = html.match(/<li[^>]*>(.*?)<\/li>/gi);

  if (liMatches) {
    for (const li of liMatches) {
      // Try to extract <strong>Key:</strong> Value pattern
      const strongMatch = li.match(/<strong>([^<]+)<\/strong>\s*(.*)/i);
      if (strongMatch) {
        const key = strongMatch[1].replace(/:$/, '').trim();
        const value = strongMatch[2].replace(/<[^>]*>/g, '').trim();
        if (key && value) {
          specs.push({ key, value });
        }
      } else {
        // Fallback: try to split by colon
        const text = li.replace(/<[^>]*>/g, '').trim();
        const colonIndex = text.indexOf(':');
        if (colonIndex > 0) {
          specs.push({
            key: text.substring(0, colonIndex).trim(),
            value: text.substring(colonIndex + 1).trim(),
          });
        }
      }
    }
  }

  return specs;
};

// Single Product Hook - Searches by SLUG (not ID)
export function useProduct(slug: string) {
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        // Fetch product by slug with embedded media
        const res = await fetch(`https://productos.prilabsa.com/wp-json/wp/v2/productos?slug=${slug.toLowerCase()}&_embed`);
        const data = await res.json();

        if (data.length > 0) {
          const wp = data[0];
          const acf = wp.acf || {};

          // Fetch PDF URL if ficha_tecnica_pdf exists, otherwise use fallback path
          let pdfData: { exists: boolean; downloadUrl: string } = { exists: false, downloadUrl: '' };
          const productCode = acf.codigo || '';
          const productName = acf.nombre_producto_es || wp.title?.rendered || '';

          if (acf.ficha_tecnica_pdf) {
            // WordPress has PDF media ID - fetch the actual URL
            try {
              const pdfRes = await fetch(`https://productos.prilabsa.com/wp-json/wp/v2/media/${acf.ficha_tecnica_pdf}`);
              const pdfMedia = await pdfRes.json();
              if (pdfMedia.source_url) {
                pdfData = { exists: true, downloadUrl: pdfMedia.source_url };
              }
            } catch (e) {
              console.warn('Could not fetch PDF:', e);
            }
          }

          // Fallback: generate PDF path from product code if no WordPress PDF
          if (!pdfData.exists && productCode && productName) {
            // Sanitize name for filename: remove diacritics, special chars, replace spaces
            const sanitizedName = productName
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
              .replace(/[\/]/g, '_')           // Replace slashes with underscores
              .replace(/[^a-zA-Z0-9\s_]/g, '') // Remove other special chars
              .replace(/\s+/g, '_')            // Replace spaces with underscores
              .replace(/_+/g, '_')             // Collapse multiple underscores
              .trim();
            const pdfFilename = `${productCode}_${sanitizedName}.pdf`;
            const pdfPath = `/assets/pdfs/productos/${pdfFilename}`;
            pdfData = { exists: true, downloadUrl: pdfPath };
          }

          // Generate short description for each language
          const descEs = acf.descripcion_es || '';
          const descEn = acf.descripcion_en || '';
          const descPt = acf.descripcion_pt || '';

          // Transform to frontend format
          const transformed = {
            ...wp,
            id: wp.id,
            slug: wp.slug,
            codigo: acf.codigo || '',
            productCode: acf.codigo || '',
            category: acf.categoria || '',
            name: acf.nombre_producto_es || wp.title?.rendered || '',
            description: descEs,
            // ⭐ New fields for tabs
            benefits: getBenefits(acf),
            specifications: parseSpecifications(acf.especificaciones_es || ''),
            presentation: parsePresentation(acf.presentacion_es || ''),
            assets: {
              image: {
                path: getImageUrl(wp)
              },
              pdf: pdfData
            },
            // ⭐ Translations with shortDescription for multilingual support
            translations: {
              es: {
                name: acf.nombre_producto_es || wp.title?.rendered || '',
                description: descEs,
                shortDescription: acf.descripcion_corta_es || generateShortDescription(descEs),
                benefits: getBenefits(acf),
                presentation: parsePresentation(acf.presentacion_es || ''),
                specifications: parseSpecifications(acf.especificaciones_es || ''),
              },
              en: {
                name: acf.nombre_producto_en || acf.nombre_producto_es || '',
                description: descEn,
                shortDescription: acf.descripcion_corta_en || generateShortDescription(descEn || descEs),
                benefits: [acf.beneficio_1_en, acf.beneficio_2_en, acf.beneficio_3_en].filter(Boolean),
                presentation: parsePresentation(acf.presentacion_en || ''),
                specifications: parseSpecifications(acf.especificaciones_en || acf.especificaciones_es || ''),
              },
              pt: {
                name: acf.nombre_producto_pt || acf.nombre_producto_es || '',
                description: descPt,
                shortDescription: acf.descripcion_corta_pt || generateShortDescription(descPt || descEs),
                benefits: [acf.beneficio_1_pt, acf.beneficio_2_pt, acf.beneficio_3_pt].filter(Boolean),
                presentation: parsePresentation(acf.presentacion_pt || ''),
                specifications: parseSpecifications(acf.especificaciones_pt || acf.especificaciones_es || ''),
              }
            }
          };
          setProduct(transformed);
        } else {
          setProduct(null);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  return { product, isLoading, error };
}

// Blog Hook (re-export)
export { useBlog } from '../hooks/useBlog';
