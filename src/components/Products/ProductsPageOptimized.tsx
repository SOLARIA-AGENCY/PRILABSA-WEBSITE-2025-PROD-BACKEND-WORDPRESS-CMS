import React, { Suspense, lazy, useMemo, useState, useEffect } from 'react';
import { usePageTranslation } from '../../i18n/hooks/usePageTranslation';
import { getAllProducts } from '../../data/products/index';
import { productsToOptimized, searchOptimizedProducts, filterOptimizedByCategory } from '../../utils/productAdapter';
import { OptimizedProduct, ProductFilter } from '../../data/products/types';
import { LazyLoadWrapper } from '../LazyLoadWrapper';

// Declaración global para gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const gtag = window.gtag;

// Lazy load components for better code splitting
const ProductGrid = lazy(() => import('./ProductGrid').then(module => ({ default: module.ProductGrid })));
const ProductFilters = lazy(() => import('./ProductFilters'));

interface ProductsPageOptimizedProps {
  initialCategory?: string;
  initialSearch?: string;
}

const ProductsPageSkeleton: React.FC = () => (
  <div className="space-y-8">
    <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
      <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          <div className="w-full h-48 bg-gray-200"></div>
          <div className="p-6">
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const ProductsPageOptimized: React.FC<ProductsPageOptimizedProps> = ({
  initialCategory,
  initialSearch
}) => {
  const { t, getPageText } = usePageTranslation(['pages', 'products', 'common']);
  
  // State management
  const [products, setProducts] = useState<OptimizedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ProductFilter>({
    category: initialCategory,
    searchQuery: initialSearch
  });

  // Available categories
  const categories = useMemo(() => [
    { id: 'aditivos', name: t('products:categories.aditivos', 'Aditivos') },
    { id: 'alimentos', name: t('products:categories.alimentos', 'Alimentos') },
    { id: 'equipos', name: t('products:categories.equipos', 'Equipos') },
    { id: 'probioticos', name: t('products:categories.probioticos', 'Probióticos') },
    { id: 'quimicos', name: t('products:categories.quimicos', 'Químicos') }
  ], [t]);

  // Load products based on current filter
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        // Get products from new registry
        const allProducts = getAllProducts();
        
        let filteredProducts = allProducts;
        
        // Apply category filter
        if (filter.category) {
          filteredProducts = filteredProducts.filter(product => product.category === filter.category);
        }
        
        // Apply search filter
        if (filter.searchQuery) {
          const searchTerm = filter.searchQuery.toLowerCase();
          filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.codigo.toLowerCase().includes(searchTerm)
          );
        }
        
        // Apply featured filter
        if (filter.featured !== undefined) {
          filteredProducts = filteredProducts.filter(p => p.metadata.featured === filter.featured);
        }
        
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [filter]);

  // Handle filter changes
  const handleFilterChange = (newFilter: ProductFilter) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      ...newFilter
    }));
  };

  // Handle product download analytics
  const handleProductDownload = (productId: string) => {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'download', {
        event_category: 'Product',
        event_label: productId,
        value: 1
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {getPageText('products', 'title', 'Nuestros Productos')}
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              {getPageText('products', 'subtitle', 'Soluciones integrales para acuicultura de alta calidad')}
            </p>
            
            {/* Quick search */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder={getPageText('products', 'search.placeholder', 'Buscar productos...')}
                  value={filter.searchQuery || ''}
                  onChange={(e) => handleFilterChange({ searchQuery: e.target.value })}
                  className="w-full px-4 py-3 pr-12 text-gray-900 bg-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <LazyLoadWrapper fallback={() => <ProductsPageSkeleton />}>
          <div className="space-y-8">
            {/* Filters */}
            <Suspense fallback={<div className="h-20 bg-white rounded-lg animate-pulse"></div>}>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('products:filters.title', 'Filtrar productos')}
                </h2>
                
                {/* Category buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleFilterChange({ category: undefined })}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      !filter.category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t('products:categories.all', 'Todos')}
                  </button>
                  
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleFilterChange({ category: category.id })}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        filter.category === category.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                {/* Additional filters */}
                <div className="mt-4 flex flex-wrap gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filter.featured || false}
                      onChange={(e) => handleFilterChange({ 
                        featured: e.target.checked ? true : undefined 
                      })}
                      className="mr-2 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      {t('products:filters.featured', 'Solo destacados')}
                    </span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filter.hasDatasheet || false}
                      onChange={(e) => handleFilterChange({ 
                        hasDatasheet: e.target.checked ? true : undefined 
                      })}
                      className="mr-2 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      {t('products:filters.withDatasheet', 'Con ficha técnica')}
                    </span>
                  </label>
                </div>
              </div>
            </Suspense>

            {/* Results summary */}
            {!loading && (
              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  {products.length === 0 
                    ? t('products:results.empty')
                    : t('products:results.found', { count: products.length })
                  }
                  {filter.category && (
                    <span className="ml-2 text-blue-600">
                      en {categories.find(c => c.id === filter.category)?.name}
                    </span>
                  )}
                </p>
              </div>
            )}

            {/* Product Grid */}
            <Suspense fallback={<ProductsPageSkeleton />}>
              <ProductGrid
                products={products}
                loading={loading}
                onProductDownload={handleProductDownload}
                itemsPerPage={16}
                showPagination={true}
              />
            </Suspense>
          </div>
        </LazyLoadWrapper>
      </div>
    </div>
  );
};