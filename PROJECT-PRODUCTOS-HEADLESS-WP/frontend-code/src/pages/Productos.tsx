/**
 * Productos Page - Modified for WordPress API Integration
 * PRILABSA Headless WordPress Integration
 * @author SOLARIA AGENCY
 *
 * IMPORTANT: This file maintains 100% of existing Tailwind design.
 * Only data fetching logic has been updated to use WordPress API.
 */

import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { transformProducts } from '../utils/productAdapter';
import ProductCard from '../components/ProductCard';
import ProductCategories from '../components/ProductCategories';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorBoundary from '../components/ErrorBoundary';

/**
 * Productos Page Component
 */
export default function Productos() {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch products from WordPress API
  const {
    products: wpProducts,
    isLoading: productsLoading,
    isError: productsError,
    error: productsErrorData,
  } = useProducts({
    per_page: 100,
    orderby: 'title',
    order: 'asc',
    'categorias-productos': selectedCategory || undefined,
    search: searchQuery || undefined,
  });

  // Fetch categories from WordPress API
  const {
    categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategories({
    hide_empty: true,
    orderby: 'name',
    order: 'asc',
  });

  // Transform WordPress products to app format
  const products = useMemo(() => {
    return transformProducts(wpProducts, i18n.language as 'es' | 'en' | 'pt');
  }, [wpProducts, i18n.language]);

  // Handle category filter
  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  // Handle search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Clear filters
  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
  };

  // Count active filters
  const activeFiltersCount = (selectedCategory ? 1 : 0) + (searchQuery ? 1 : 0);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-montserrat">
              {t('productos.title', 'Catálogo de Productos')}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-montserrat">
              {t('productos.subtitle', 'Descubre nuestra amplia gama de productos científicos y educativos')}
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder={t('productos.search', 'Buscar productos...')}
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/80 backdrop-blur-sm font-montserrat"
              />
              <svg
                className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Categories Filter */}
          {categoriesLoading ? (
            <div className="mb-8 flex justify-center">
              <div className="animate-pulse bg-white/60 h-12 w-full max-w-4xl rounded-2xl"></div>
            </div>
          ) : categoriesError ? (
            <div className="mb-8 text-center text-red-600 font-montserrat">
              {t('productos.categoriesError', 'Error al cargar categorías')}
            </div>
          ) : (
            <ProductCategories
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          )}

          {/* Active Filters Badge */}
          {activeFiltersCount > 0 && (
            <div className="mb-6 flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600 font-montserrat">
                  {t('productos.activeFilters', 'Filtros activos:')} {activeFiltersCount}
                </span>
                {selectedCategory && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-montserrat">
                    {categories.find(cat => cat.id === selectedCategory)?.name}
                  </span>
                )}
                {searchQuery && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-montserrat">
                    "{searchQuery}"
                  </span>
                )}
              </div>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-montserrat"
              >
                {t('productos.clearFilters', 'Limpiar filtros')}
              </button>
            </div>
          )}

          {/* Loading State */}
          {productsLoading && <LoadingSkeleton count={12} />}

          {/* Error State */}
          {productsError && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-montserrat">
                {t('productos.errorTitle', 'Error al cargar productos')}
              </h3>
              <p className="text-slate-600 mb-4 font-montserrat">
                {productsErrorData?.message || t('productos.errorMessage', 'Ha ocurrido un error. Por favor, intenta nuevamente.')}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-montserrat"
              >
                {t('productos.retry', 'Reintentar')}
              </button>
            </div>
          )}

          {/* Empty State */}
          {!productsLoading && !productsError && products.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-montserrat">
                {t('productos.noResults', 'No se encontraron productos')}
              </h3>
              <p className="text-slate-600 mb-4 font-montserrat">
                {t('productos.noResultsMessage', 'Intenta ajustar los filtros o realizar otra búsqueda')}
              </p>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-montserrat"
                >
                  {t('productos.clearFilters', 'Limpiar filtros')}
                </button>
              )}
            </div>
          )}

          {/* Products Grid */}
          {!productsLoading && !productsError && products.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Results Count */}
          {!productsLoading && !productsError && products.length > 0 && (
            <div className="mt-8 text-center text-slate-600 font-montserrat">
              {t('productos.resultsCount', {
                count: products.length,
                defaultValue: `Mostrando ${products.length} producto${products.length === 1 ? '' : 's'}`,
              })}
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
