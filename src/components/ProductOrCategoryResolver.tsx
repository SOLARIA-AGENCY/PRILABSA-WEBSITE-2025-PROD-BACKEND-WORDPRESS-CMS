/**
 * ProductOrCategoryResolver
 *
 * Smart router component that handles /productos/:slug URLs.
 * Determines if the slug is a product or a category and renders accordingly.
 *
 * This solves the WordPress permalink issue where products are created with
 * URLs like /productos/product-name instead of /productos/category/product-name
 */

import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useProduct } from '../services/wordpressApi';

// Known valid categories
const VALID_CATEGORIES = [
  'probioticos',
  'alimentos',
  'quimicos',
  'aditivos',
  'equipos'
];

interface ResolverState {
  type: 'loading' | 'product' | 'category' | 'not-found';
  productCategory?: string;
}

const ProductOrCategoryResolver: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [state, setState] = useState<ResolverState>({ type: 'loading' });

  // Try to load as product
  const { product, isLoading, error } = useProduct(slug || '');

  useEffect(() => {
    if (!slug) {
      setState({ type: 'not-found' });
      return;
    }

    // Check if it's a known category first
    if (VALID_CATEGORIES.includes(slug.toLowerCase())) {
      setState({ type: 'category' });
      return;
    }

    // If product hook finished loading
    if (!isLoading) {
      if (product && product.category) {
        // Found product - redirect to canonical URL with category
        setState({
          type: 'product',
          productCategory: product.category
        });
      } else if (error || !product) {
        // Not a product, treat as category (will show "not found" on category page)
        setState({ type: 'category' });
      }
    }
  }, [slug, product, isLoading, error]);

  // Loading state
  if (state.type === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Product found - redirect to canonical URL
  if (state.type === 'product' && state.productCategory) {
    return <Navigate to={`/productos/${state.productCategory}/${slug}`} replace />;
  }

  // Category or not found - let CategoryPage handle it
  if (state.type === 'category' || state.type === 'not-found') {
    // Import CategoryPage dynamically to avoid circular deps
    const CategoryPage = React.lazy(() => import('../pages/CategoryPage'));
    return (
      <React.Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      }>
        <CategoryPage />
      </React.Suspense>
    );
  }

  return null;
};

export default ProductOrCategoryResolver;
