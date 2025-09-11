import React, { useState, useEffect, useMemo } from 'react';
import { OptimizedProduct } from '../../data/products/types';
import { ProductCard } from './ProductCard';
import { LazyLoadWrapper } from '../LazyLoadWrapper';

interface ProductGridProps {
  products?: OptimizedProduct[];
  category?: string;
  loading?: boolean;
  onProductDownload?: (productId: string) => void;
  itemsPerPage?: number;
  showPagination?: boolean;
}

const ProductGridSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="w-full h-48 bg-gray-200"></div>
        <div className="p-6">
          <div className="h-6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
          <div className="space-y-2 mb-4">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-4/5"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);

export const ProductGrid: React.FC<ProductGridProps> = ({
  products = [],
  loading = false,
  onProductDownload,
  itemsPerPage = 12,
  showPagination = true
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleProducts, setVisibleProducts] = useState<OptimizedProduct[]>([]);

  // Pagination logic
  const paginatedProducts = useMemo(() => {
    if (!showPagination) return products;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex);
  }, [products, currentPage, itemsPerPage, showPagination]);

  // Progressive loading effect
  useEffect(() => {
    if (loading) {
      setVisibleProducts([]);
      return;
    }

    // Simulate progressive loading for better UX
    const loadProducts = async () => {
      for (let i = 0; i < paginatedProducts.length; i += 4) {
        const batch = paginatedProducts.slice(i, i + 4);
        setVisibleProducts(prev => [...prev, ...batch]);
        
        // Small delay between batches for smooth loading
        if (i + 4 < paginatedProducts.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    };

    setVisibleProducts([]);
    loadProducts();
  }, [paginatedProducts, loading]);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  if (loading) {
    return <ProductGridSkeleton />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Catálogo en Preparación</h3>
          <p className="text-gray-500 mb-4">
            Estamos preparando nuestro catálogo de productos. Pronto estará disponible con toda la información actualizada.
          </p>
          <p className="text-sm text-gray-400">
            Para consultas inmediatas, contáctanos directamente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <LazyLoadWrapper>
      <div className="space-y-8">
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onDownload={onProductDownload}
              loading={index < 4 ? 'eager' : 'lazy'} // Load first 4 eagerly
              priority={index < 2} // High priority for first 2
            />
          ))}
        </div>

        {/* Pagination */}
        {showPagination && totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            
            {/* Page numbers */}
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === currentPage;
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>
        )}

        {/* Results summary */}
        <div className="text-center text-sm text-gray-500">
          Mostrando {visibleProducts.length} de {products.length} productos
          {showPagination && totalPages > 1 && (
            <span> (Página {currentPage} de {totalPages})</span>
          )}
        </div>
      </div>
    </LazyLoadWrapper>
  );
};