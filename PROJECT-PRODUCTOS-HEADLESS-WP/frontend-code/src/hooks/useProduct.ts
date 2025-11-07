/**
 * useProduct Hook - SWR Data Fetching for Single Product
 * PRILABSA Headless WordPress Integration
 * @author SOLARIA AGENCY
 */

import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { wordpressApi } from '../services/wordpressApi';
import type { WordPressProduct, APIError } from '../types/wordpress';

/**
 * SWR Configuration for Single Product
 */
const defaultConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 10000, // 10 seconds
  focusThrottleInterval: 120000, // 2 minutes
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  shouldRetryOnError: true,
  keepPreviousData: true,
};

/**
 * useProduct Hook Return Type
 */
export interface UseProductReturn {
  product: WordPressProduct | null;
  isLoading: boolean;
  isError: boolean;
  error: APIError | undefined;
  isValidating: boolean;
  mutate: SWRResponse<WordPressProduct, APIError>['mutate'];
  refresh: () => Promise<void>;
}

/**
 * useProduct Hook (by ID)
 * Fetch single product by ID with SWR caching
 *
 * @param id - Product ID (null to skip fetching)
 * @param embed - Whether to embed related resources
 * @param config - SWR configuration overrides
 * @returns Product data, loading states, and mutation functions
 *
 * @example
 * ```tsx
 * const { product, isLoading, error } = useProduct(123);
 * ```
 */
export function useProduct(
  id: number | null,
  embed = true,
  config: SWRConfiguration = {}
): UseProductReturn {
  // Generate unique SWR key
  const swrKey = id ? ['product', id, embed] : null;

  // Fetcher function
  const fetcher = async (key: string, productId: number, embedResources: boolean) => {
    return wordpressApi.getProductById(productId, embedResources);
  };

  // SWR hook
  const { data, error, isLoading, isValidating, mutate } = useSWR<WordPressProduct, APIError>(
    swrKey,
    fetcher,
    {
      ...defaultConfig,
      ...config,
    }
  );

  // Refresh function (force revalidation)
  const refresh = async () => {
    await mutate();
  };

  return {
    product: data || null,
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
    refresh,
  };
}

/**
 * useProductBySlug Hook
 * Fetch single product by slug with SWR caching
 *
 * @param slug - Product slug (null to skip fetching)
 * @param embed - Whether to embed related resources
 * @param config - SWR configuration overrides
 * @returns Product data, loading states, and mutation functions
 *
 * @example
 * ```tsx
 * const { product, isLoading, error } = useProductBySlug('microscopio-optico-profesional');
 * ```
 */
export function useProductBySlug(
  slug: string | null,
  embed = true,
  config: SWRConfiguration = {}
): UseProductReturn {
  // Generate unique SWR key
  const swrKey = slug ? ['product-slug', slug, embed] : null;

  // Fetcher function
  const fetcher = async (key: string, productSlug: string, embedResources: boolean) => {
    return wordpressApi.getProductBySlug(productSlug, embedResources);
  };

  // SWR hook
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    WordPressProduct | null,
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
    product: data || null,
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
    refresh,
  };
}

/**
 * Export default
 */
export default useProduct;
