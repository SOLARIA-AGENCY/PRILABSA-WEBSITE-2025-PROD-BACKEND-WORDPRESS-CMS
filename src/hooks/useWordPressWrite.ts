/**
 * WordPress Write Hook
 * React hook for CRUD operations on WordPress products
 */

import { useState, useCallback } from 'react';
import {
  WordPressWriteAPI,
  isAuthenticated,
  type ProductFormData,
  type WriteResponse,
  type APIError,
} from '../services/WordPressWriteAPI';
import type { WordPressProduct } from '../types/wordpress';

export interface UseWordPressWriteState {
  loading: boolean;
  error: APIError | null;
  lastOperation: 'create' | 'update' | 'delete' | 'upload' | null;
  lastProductId: number | null;
}

export interface UseWordPressWriteReturn extends UseWordPressWriteState {
  // Auth status
  isConfigured: boolean;

  // CRUD operations
  createProduct: (data: ProductFormData) => Promise<WriteResponse<WordPressProduct>>;
  updateProduct: (id: number, data: Partial<ProductFormData>) => Promise<WriteResponse<WordPressProduct>>;
  deleteProduct: (id: number, force?: boolean) => Promise<WriteResponse<{ deleted: boolean }>>;
  publishProduct: (id: number) => Promise<WriteResponse<WordPressProduct>>;
  trashProduct: (id: number) => Promise<WriteResponse<WordPressProduct>>;

  // Media
  uploadMedia: (file: File) => Promise<WriteResponse<{ id: number; url: string }>>;

  // Utils
  testConnection: () => Promise<WriteResponse<{ user: string }>>;
  clearError: () => void;
}

/**
 * Hook for WordPress write operations
 */
export function useWordPressWrite(): UseWordPressWriteReturn {
  const [state, setState] = useState<UseWordPressWriteState>({
    loading: false,
    error: null,
    lastOperation: null,
    lastProductId: null,
  });

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading, error: loading ? null : prev.error }));
  }, []);

  const setError = useCallback((error: APIError | null) => {
    setState(prev => ({ ...prev, error, loading: false }));
  }, []);

  const setSuccess = useCallback((operation: UseWordPressWriteState['lastOperation'], productId?: number) => {
    setState({
      loading: false,
      error: null,
      lastOperation: operation,
      lastProductId: productId ?? null,
    });
  }, []);

  // Create product
  const createProduct = useCallback(async (data: ProductFormData): Promise<WriteResponse<WordPressProduct>> => {
    setLoading(true);
    const result = await WordPressWriteAPI.createProduct(data);

    if (result.success && result.data) {
      setSuccess('create', result.data.id);
    } else if (result.error) {
      setError(result.error);
    }

    return result;
  }, [setLoading, setSuccess, setError]);

  // Update product
  const updateProduct = useCallback(async (
    id: number,
    data: Partial<ProductFormData>
  ): Promise<WriteResponse<WordPressProduct>> => {
    setLoading(true);
    const result = await WordPressWriteAPI.updateProduct(id, data);

    if (result.success) {
      setSuccess('update', id);
    } else if (result.error) {
      setError(result.error);
    }

    return result;
  }, [setLoading, setSuccess, setError]);

  // Delete product
  const deleteProduct = useCallback(async (
    id: number,
    force: boolean = false
  ): Promise<WriteResponse<{ deleted: boolean }>> => {
    setLoading(true);
    const result = await WordPressWriteAPI.deleteProduct(id, force);

    if (result.success) {
      setSuccess('delete', id);
    } else if (result.error) {
      setError(result.error);
    }

    return result as WriteResponse<{ deleted: boolean }>;
  }, [setLoading, setSuccess, setError]);

  // Publish product
  const publishProduct = useCallback(async (id: number): Promise<WriteResponse<WordPressProduct>> => {
    setLoading(true);
    const result = await WordPressWriteAPI.publishProduct(id);

    if (result.success) {
      setSuccess('update', id);
    } else if (result.error) {
      setError(result.error);
    }

    return result;
  }, [setLoading, setSuccess, setError]);

  // Trash product
  const trashProduct = useCallback(async (id: number): Promise<WriteResponse<WordPressProduct>> => {
    setLoading(true);
    const result = await WordPressWriteAPI.trashProduct(id);

    if (result.success) {
      setSuccess('delete', id);
    } else if (result.error) {
      setError(result.error);
    }

    return result;
  }, [setLoading, setSuccess, setError]);

  // Upload media
  const uploadMedia = useCallback(async (file: File): Promise<WriteResponse<{ id: number; url: string }>> => {
    setLoading(true);
    const result = await WordPressWriteAPI.uploadMedia(file);

    if (result.success) {
      setSuccess('upload');
    } else if (result.error) {
      setError(result.error);
    }

    return result;
  }, [setLoading, setSuccess, setError]);

  // Test connection
  const testConnection = useCallback(async (): Promise<WriteResponse<{ user: string }>> => {
    setLoading(true);
    const result = await WordPressWriteAPI.testConnection();
    setLoading(false);

    if (result.error) {
      setError(result.error);
    }

    return result as WriteResponse<{ user: string }>;
  }, [setLoading, setError]);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    isConfigured: isAuthenticated(),
    createProduct,
    updateProduct,
    deleteProduct,
    publishProduct,
    trashProduct,
    uploadMedia,
    testConnection,
    clearError,
  };
}

export default useWordPressWrite;
