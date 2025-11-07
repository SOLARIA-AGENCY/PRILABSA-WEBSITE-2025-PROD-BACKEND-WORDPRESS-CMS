/**
 * useProducts Hook - SWR Data Fetching for Products List
 * PRILABSA Headless WordPress Integration
 * @author SOLARIA AGENCY
 */

import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { wordpressApi } from '../services/wordpressApi';
import type {
  WordPressProduct,
  ProductsQueryParams,
  PaginatedResponse,
  APIError,
} from '../types/wordpress';

/**
 * SWR Configuration for Products
 */
const defaultConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 5000, // 5 seconds
  focusThrottleInterval: 60000, // 1 minute
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  shouldRetryOnError: true,
  keepPreviousData: true,
};

/**
 * useProducts Hook Return Type
 */
export interface UseProductsReturn {
  products: WordPressProduct[];
  pagination: PaginatedResponse<WordPressProduct>['pagination'] | null;
  isLoading: boolean;
  isError: boolean;
  error: APIError | undefined;
  isValidating: boolean;
  mutate: SWRResponse<PaginatedResponse<WordPressProduct>, APIError>['mutate'];
  refresh: () => Promise<void>;
}

/**
 * useProducts Hook
 * Fetch products list with SWR caching and revalidation
 *
 * @param params - Query parameters for filtering products
 * @param config - SWR configuration overrides
 * @returns Products data, loading states, and mutation functions
 *
 * @example
 * ```tsx
 * const { products, isLoading, error } = useProducts({
 *   per_page: 20,
 *   'categorias-productos': 5,
 *   orderby: 'title',
 *   order: 'asc'
 * });
 * ```
 */
export function useProducts(
  params: ProductsQueryParams = {},
  config: SWRConfiguration = {}
): UseProductsReturn {
  // Generate unique SWR key based on params
  const swrKey = params ? ['products', JSON.stringify(params)] : null;

  // Fetcher function
  const fetcher = async (key: string, paramsString: string) => {
    const parsedParams = JSON.parse(paramsString) as ProductsQueryParams;
    return wordpressApi.getProducts(parsedParams);
  };

  // SWR hook
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    PaginatedResponse<WordPressProduct>,
    APIError
  >(swrKey, fetcher, {
    ...defaultConfig,
    ...config,
  });

  // Refresh function (force revalidation)
  const refresh = async () => {
    await mutate();
  };

  return {
    products: data?.data || [],
    pagination: data?.pagination || null,
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
    refresh,
  };
}

/**
 * useProductsByCategory Hook
 * Specialized hook for fetching products by category
 *
 * @param categoryId - Category ID to filter by
 * @param params - Additional query parameters
 * @param config - SWR configuration overrides
 *
 * @example
 * ```tsx
 * const { products, isLoading } = useProductsByCategory(5, { per_page: 10 });
 * ```
 */
export function useProductsByCategory(
  categoryId: number | null,
  params: Omit<ProductsQueryParams, 'categorias-productos'> = {},
  config: SWRConfiguration = {}
): UseProductsReturn {
  const queryParams: ProductsQueryParams = categoryId
    ? { ...params, 'categorias-productos': categoryId }
    : params;

  return useProducts(queryParams, config);
}

/**
 * useProductsByTag Hook
 * Specialized hook for fetching products by tag
 *
 * @param tagId - Tag ID to filter by
 * @param params - Additional query parameters
 * @param config - SWR configuration overrides
 *
 * @example
 * ```tsx
 * const { products, isLoading } = useProductsByTag(3, { per_page: 10 });
 * ```
 */
export function useProductsByTag(
  tagId: number | null,
  params: Omit<ProductsQueryParams, 'tags-productos'> = {},
  config: SWRConfiguration = {}
): UseProductsReturn {
  const queryParams: ProductsQueryParams = tagId
    ? { ...params, 'tags-productos': tagId }
    : params;

  return useProducts(queryParams, config);
}

/**
 * useSearchProducts Hook
 * Specialized hook for searching products
 *
 * @param searchQuery - Search query string
 * @param params - Additional query parameters
 * @param config - SWR configuration overrides
 *
 * @example
 * ```tsx
 * const { products, isLoading } = useSearchProducts('microscopio', { per_page: 20 });
 * ```
 */
export function useSearchProducts(
  searchQuery: string | null,
  params: Omit<ProductsQueryParams, 'search'> = {},
  config: SWRConfiguration = {}
): UseProductsReturn {
  const queryParams: ProductsQueryParams = searchQuery
    ? { ...params, search: searchQuery }
    : params;

  // Don't fetch if search query is empty
  const shouldFetch = searchQuery && searchQuery.trim().length > 0;

  return useProducts(shouldFetch ? queryParams : {}, {
    ...config,
    revalidateOnMount: shouldFetch,
  });
}

/**
 * useProductsPaginated Hook
 * Specialized hook with pagination controls
 *
 * @param page - Current page number (1-indexed)
 * @param perPage - Items per page
 * @param params - Additional query parameters
 * @param config - SWR configuration overrides
 *
 * @example
 * ```tsx
 * const { products, pagination, isLoading, goToPage } = useProductsPaginated(1, 20);
 * ```
 */
export function useProductsPaginated(
  page = 1,
  perPage = 20,
  params: Omit<ProductsQueryParams, 'page' | 'per_page'> = {},
  config: SWRConfiguration = {}
) {
  const queryParams: ProductsQueryParams = {
    ...params,
    page,
    per_page: perPage,
  };

  const result = useProducts(queryParams, config);

  return {
    ...result,
    currentPage: page,
    perPage,
    hasNextPage: result.pagination
      ? result.pagination.currentPage < result.pagination.totalPages
      : false,
    hasPrevPage: result.pagination ? result.pagination.currentPage > 1 : false,
  };
}

/**
 * Export default
 */
export default useProducts;
