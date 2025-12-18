/**
 * React Hook for WordPress Products
 * Provides dynamic product loading from WordPress REST API
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { WordPressAPI, clearCache } from '../services/wordpressApi';
import { wordpressToOptimizedProducts, wordpressToOptimizedProduct } from '../utils/wordpressAdapter';
import type { WordPressProduct, WordPressLanguage } from '../types/wordpress';
import type { OptimizedProduct } from '../data/products/types';

// Hook state interface
interface UseWordPressProductsState {
  products: OptimizedProduct[];
  loading: boolean;
  error: Error | null;
  totalCount: number;
  categories: string[];
}

// Hook options
interface UseWordPressProductsOptions {
  category?: string;
  searchQuery?: string;
  language?: WordPressLanguage;
  autoFetch?: boolean;
}

/**
 * Hook for fetching all products from WordPress
 */
export function useWordPressProducts(options: UseWordPressProductsOptions = {}) {
  const { category, searchQuery, language = 'es', autoFetch = true } = options;

  const [state, setState] = useState<UseWordPressProductsState>({
    products: [],
    loading: autoFetch,
    error: null,
    totalCount: 0,
    categories: [],
  });

  const fetchProducts = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      let wpProducts: WordPressProduct[];

      if (category) {
        wpProducts = await WordPressAPI.getProductsByCategory(category);
      } else if (searchQuery) {
        wpProducts = await WordPressAPI.searchProducts(searchQuery);
      } else {
        wpProducts = await WordPressAPI.getProducts();
      }

      const optimizedProducts = wordpressToOptimizedProducts(wpProducts, language);
      const uniqueCategories = [...new Set(optimizedProducts.map(p => p.category))].sort();

      setState({
        products: optimizedProducts,
        loading: false,
        error: null,
        totalCount: optimizedProducts.length,
        categories: uniqueCategories,
      });

      return optimizedProducts;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({
        ...prev,
        loading: false,
        error: err,
      }));
      throw err;
    }
  }, [category, searchQuery, language]);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch) {
      fetchProducts();
    }
  }, [autoFetch, fetchProducts]);

  // Refresh function (clears cache and re-fetches)
  const refresh = useCallback(async () => {
    clearCache();
    return fetchProducts();
  }, [fetchProducts]);

  // Get products by category
  const getByCategory = useCallback((cat: string): OptimizedProduct[] => {
    return state.products.filter(p => p.category === cat);
  }, [state.products]);

  // Search within loaded products
  const search = useCallback((query: string): OptimizedProduct[] => {
    const term = query.toLowerCase();
    return state.products.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.codigo.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );
  }, [state.products]);

  // Get product by code
  const getByCode = useCallback((code: string): OptimizedProduct | undefined => {
    return state.products.find(p => p.codigo === code || p.productCode === code);
  }, [state.products]);

  return {
    ...state,
    fetchProducts,
    refresh,
    getByCategory,
    search,
    getByCode,
  };
}

/**
 * Hook for fetching a single product
 */
export function useWordPressProduct(
  identifier: string | number,
  type: 'id' | 'slug' | 'code' = 'code',
  language: WordPressLanguage = 'es'
) {
  const [product, setProduct] = useState<OptimizedProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        let wpProduct: WordPressProduct | null = null;

        switch (type) {
          case 'id':
            wpProduct = await WordPressAPI.getProductById(Number(identifier));
            break;
          case 'slug':
            wpProduct = await WordPressAPI.getProductBySlug(String(identifier));
            break;
          case 'code':
          default:
            wpProduct = await WordPressAPI.getProductByCode(String(identifier));
            break;
        }

        if (wpProduct) {
          setProduct(wordpressToOptimizedProduct(wpProduct, language));
        } else {
          setProduct(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    if (identifier) {
      fetchProduct();
    }
  }, [identifier, type, language]);

  return { product, loading, error };
}

/**
 * Hook for WordPress categories
 */
export function useWordPressCategories() {
  const [categories, setCategories] = useState<Array<{ id: number; name: string; slug: string; count: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const wpCategories = await WordPressAPI.getCategories();
        setCategories(wpCategories.map(c => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          count: c.count,
        })));
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

/**
 * Hook for checking WordPress API health
 */
export function useWordPressHealth() {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const healthy = await WordPressAPI.healthCheck();
        setIsHealthy(healthy);
      } catch {
        setIsHealthy(false);
      } finally {
        setChecking(false);
      }
    };

    check();
  }, []);

  return { isHealthy, checking };
}

/**
 * Hook for fetching raw WordPress products (for admin CRUD)
 * Returns WordPressProduct[] instead of OptimizedProduct[]
 */
export function useWordPressRawProducts(options: { autoFetch?: boolean } = {}) {
  const { autoFetch = true } = options;

  const [products, setProducts] = useState<WordPressProduct[]>([]);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<Error | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const wpProducts = await WordPressAPI.getProducts();
      setProducts(wpProducts);
      setTotalCount(wpProducts.length);
      return wpProducts;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch) {
      fetchProducts();
    }
  }, [autoFetch, fetchProducts]);

  // Refresh function
  const refresh = useCallback(async () => {
    clearCache();
    return fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    totalCount,
    refresh,
    fetchProducts,
  };
}

export default useWordPressProducts;
