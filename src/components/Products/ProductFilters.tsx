import React from 'react';
import { ProductFilter } from '../../data/products/types';
import { useLanguage } from '../../contexts/LanguageContext';

interface ProductFiltersProps {
  filter: ProductFilter;
  onFilterChange: (filter: ProductFilter) => void;
  categories: Array<{ id: string; name: string }>;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filter,
  onFilterChange,
  categories
}) => {
  const { t } = useLanguage();
  const handleCategoryChange = (category: string) => {
    onFilterChange({
      ...filter,
      category: category === 'all' ? undefined : category
    });
  };

  const handleSearchChange = (searchQuery: string) => {
    onFilterChange({
      ...filter,
      searchQuery: searchQuery || undefined
    });
  };

  const handleFeaturedChange = (featured: boolean | undefined) => {
    onFilterChange({
      ...filter,
      featured
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
      
      {/* Búsqueda */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('products.search.label')}
        </label>
        <input
          type="text"
          placeholder={t('products.search.placeholder')}
          value={filter.searchQuery || ''}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Categorías */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categoría
        </label>
        <div className="space-y-2">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              !filter.category
                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            Todas las categorías
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                filter.category === category.id
                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Productos destacados */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Productos destacados
        </label>
        <div className="space-y-2">
          <button
            onClick={() => handleFeaturedChange(undefined)}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              filter.featured === undefined
                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            Todos los productos
          </button>
          <button
            onClick={() => handleFeaturedChange(true)}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              filter.featured === true
                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            Solo destacados
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;