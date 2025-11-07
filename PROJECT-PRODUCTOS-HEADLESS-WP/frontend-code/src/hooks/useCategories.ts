/**
 * useCategories Hook - SWR Data Fetching for Product Categories
 * PRILABSA Headless WordPress Integration
 * @author SOLARIA AGENCY
 */

import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { wordpressApi } from '../services/wordpressApi';
import type {
  WordPressCategory,
  CategoriesQueryParams,
  APIError,
} from '../types/wordpress';

/**
 * SWR Configuration for Categories
 */
const defaultConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 30000, // 30 seconds
  focusThrottleInterval: 300000, // 5 minutes
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  shouldRetryOnError: true,
  // Categories change less frequently, so we can cache longer
  revalidateIfStale: false,
};

/**
 * useCategories Hook Return Type
 */
export interface UseCategoriesReturn {
  categories: WordPressCategory[];
  isLoading: boolean;
  isError: boolean;
  error: APIError | undefined;
  isValidating: boolean;
  mutate: SWRResponse<WordPressCategory[], APIError>['mutate'];
  refresh: () => Promise<void>;
  getCategoryById: (id: number) => WordPressCategory | undefined;
  getCategoryBySlug: (slug: string) => WordPressCategory | undefined;
}

/**
 * useCategories Hook
 * Fetch product categories with SWR caching
 *
 * @param params - Query parameters for filtering categories
 * @param config - SWR configuration overrides
 * @returns Categories data, loading states, and utility functions
 *
 * @example
 * ```tsx
 * const { categories, isLoading, getCategoryById } = useCategories({
 *   hide_empty: true,
 *   orderby: 'name',
 *   order: 'asc'
 * });
 * ```
 */
export function useCategories(
  params: CategoriesQueryParams = {},
  config: SWRConfiguration = {}
): UseCategoriesReturn {
  // Generate unique SWR key based on params
  const swrKey = params ? ['categories', JSON.stringify(params)] : 'categories';

  // Fetcher function
  const fetcher = async (key: string, paramsString?: string) => {
    const parsedParams = paramsString
      ? (JSON.parse(paramsString) as CategoriesQueryParams)
      : {};
    return wordpressApi.getCategories(parsedParams);
  };

  // SWR hook
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    WordPressCategory[],
    APIError
  >(swrKey, fetcher, {
    ...defaultConfig,
    ...config,
  });

  // Refresh function (force revalidation)
  const refresh = async () => {
    await mutate();
  };

  // Helper: Get category by ID
  const getCategoryById = (id: number): WordPressCategory | undefined => {
    return data?.find((cat) => cat.id === id);
  };

  // Helper: Get category by slug
  const getCategoryBySlug = (slug: string): WordPressCategory | undefined => {
    return data?.find((cat) => cat.slug === slug);
  };

  return {
    categories: data || [],
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
    refresh,
    getCategoryById,
    getCategoryBySlug,
  };
}

/**
 * useCategory Hook
 * Fetch single category by ID with SWR caching
 *
 * @param id - Category ID (null to skip fetching)
 * @param config - SWR configuration overrides
 * @returns Category data and loading states
 *
 * @example
 * ```tsx
 * const { category, isLoading } = useCategory(5);
 * ```
 */
export function useCategory(
  id: number | null,
  config: SWRConfiguration = {}
): {
  category: WordPressCategory | null;
  isLoading: boolean;
  isError: boolean;
  error: APIError | undefined;
} {
  // Generate unique SWR key
  const swrKey = id ? ['category', id] : null;

  // Fetcher function
  const fetcher = async (key: string, categoryId: number) => {
    return wordpressApi.getCategoryById(categoryId);
  };

  // SWR hook
  const { data, error, isLoading } = useSWR<WordPressCategory, APIError>(swrKey, fetcher, {
    ...defaultConfig,
    ...config,
  });

  return {
    category: data || null,
    isLoading,
    isError: !!error,
    error,
  };
}

/**
 * Export default
 */
export default useCategories;
