/**
 * useTags Hook - SWR Data Fetching for Product Tags
 * PRILABSA Headless WordPress Integration
 * @author SOLARIA AGENCY
 */

import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { wordpressApi } from '../services/wordpressApi';
import type { WordPressTag, TagsQueryParams, APIError } from '../types/wordpress';

/**
 * SWR Configuration for Tags
 */
const defaultConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 30000, // 30 seconds
  focusThrottleInterval: 300000, // 5 minutes
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  shouldRetryOnError: true,
  revalidateIfStale: false,
};

/**
 * useTags Hook Return Type
 */
export interface UseTagsReturn {
  tags: WordPressTag[];
  isLoading: boolean;
  isError: boolean;
  error: APIError | undefined;
  isValidating: boolean;
  mutate: SWRResponse<WordPressTag[], APIError>['mutate'];
  refresh: () => Promise<void>;
  getTagById: (id: number) => WordPressTag | undefined;
  getTagBySlug: (slug: string) => WordPressTag | undefined;
}

/**
 * useTags Hook
 * Fetch product tags with SWR caching
 *
 * @param params - Query parameters for filtering tags
 * @param config - SWR configuration overrides
 * @returns Tags data, loading states, and utility functions
 *
 * @example
 * ```tsx
 * const { tags, isLoading, getTagById } = useTags({
 *   hide_empty: true,
 *   orderby: 'name',
 *   order: 'asc'
 * });
 * ```
 */
export function useTags(
  params: TagsQueryParams = {},
  config: SWRConfiguration = {}
): UseTagsReturn {
  // Generate unique SWR key based on params
  const swrKey = params ? ['tags', JSON.stringify(params)] : 'tags';

  // Fetcher function
  const fetcher = async (key: string, paramsString?: string) => {
    const parsedParams = paramsString ? (JSON.parse(paramsString) as TagsQueryParams) : {};
    return wordpressApi.getTags(parsedParams);
  };

  // SWR hook
  const { data, error, isLoading, isValidating, mutate } = useSWR<WordPressTag[], APIError>(
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

  // Helper: Get tag by ID
  const getTagById = (id: number): WordPressTag | undefined => {
    return data?.find((tag) => tag.id === id);
  };

  // Helper: Get tag by slug
  const getTagBySlug = (slug: string): WordPressTag | undefined => {
    return data?.find((tag) => tag.slug === slug);
  };

  return {
    tags: data || [],
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
    refresh,
    getTagById,
    getTagBySlug,
  };
}

/**
 * useTag Hook
 * Fetch single tag by ID with SWR caching
 *
 * @param id - Tag ID (null to skip fetching)
 * @param config - SWR configuration overrides
 * @returns Tag data and loading states
 *
 * @example
 * ```tsx
 * const { tag, isLoading } = useTag(3);
 * ```
 */
export function useTag(
  id: number | null,
  config: SWRConfiguration = {}
): {
  tag: WordPressTag | null;
  isLoading: boolean;
  isError: boolean;
  error: APIError | undefined;
} {
  // Generate unique SWR key
  const swrKey = id ? ['tag', id] : null;

  // Fetcher function
  const fetcher = async (key: string, tagId: number) => {
    return wordpressApi.getTagById(tagId);
  };

  // SWR hook
  const { data, error, isLoading } = useSWR<WordPressTag, APIError>(swrKey, fetcher, {
    ...defaultConfig,
    ...config,
  });

  return {
    tag: data || null,
    isLoading,
    isError: !!error,
    error,
  };
}

/**
 * Export default
 */
export default useTags;
