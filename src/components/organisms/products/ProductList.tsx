import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../../services/wordpressApi';
import { useLanguage } from '../../../contexts/LanguageContext';
import productTranslationService from '../../../services/ProductTranslationService';

interface ProductListProps {
  categorySlug: string;
  searchQuery: string;
}

const ProductList: React.FC<ProductListProps> = ({ categorySlug, searchQuery }) => {
  const { t, language } = useLanguage();

  // ⭐ Consumir API de WordPress en lugar de datos estáticos
  const { products: allProducts, isLoading, error } = useProducts();

  // Helper function to get translated product fields using ProductTranslationService
  const getTranslatedField = (producto: any, field: 'name' | 'description' | 'benefits' | 'presentation' | 'specifications') => {
    if (!producto) return null;
    return productTranslationService.getTranslatedField(producto, field, language);
  };

  const filteredProducts = useMemo(() => {
    console.log('🔍 ProductList - Filtrar por categoría:', categorySlug)
    console.log('📦 Total productos recibidos:', allProducts.length)

    const filtered = allProducts
      .filter(p => {
        const match = p.category === categorySlug
        if (!match && allProducts.length > 0 && allProducts.length < 10) {
          console.log(`  ❌ ${p.codigo}: category="${p.category}" !== categorySlug="${categorySlug}"`)
        }
        return match
      })
      .filter(p =>
        searchQuery ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
      );

    console.log('✅ Productos filtrados:', filtered.length)
    return filtered
  }, [allProducts, categorySlug, searchQuery]);

  // ⭐ Estado de carga
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">{t('products.messages.loading') || 'Cargando productos...'}</p>
        </div>
      </div>
    );
  }

  // ⭐ Estado de error
  if (error) {
    return (
      <div className="text-center py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-red-600 mb-2">{t('products.messages.error') || 'Error al cargar productos'}</h2>
          <p className="text-red-700 mb-4">{error.message}</p>
          <p className="text-sm text-red-600">{t('products.messages.checkWordPress') || 'Verifica que WordPress esté corriendo en localhost:8000'}</p>
        </div>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-800">{t('products.search.noResults')}</h2>
        <p className="text-gray-500 mt-2">{t('products.search.noResultsDescription')}</p>
      </div>
    );
  }

  return (
    <div role="grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {filteredProducts.map(producto => (
        <Link 
          key={producto.id} 
          to={`/productos/${producto.category}/${producto.slug}`}
          className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out hover:shadow-xl group block"
        >
          <div className="h-48 overflow-hidden bg-gray-50 flex items-center justify-center">
            <img 
              src={producto.assets?.image?.path || '/assets/images/placeholder-product.jpg'} 
              alt={producto.name} 
              className="max-w-full max-h-full object-contain p-2" 
            />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-bold uppercase mb-2 h-16" style={{ color: '#3759C1' }}>{getTranslatedField(producto, 'name') || producto.name}</h3>
            <p className="text-gray-600 text-sm mb-4 h-24 overflow-hidden">{getTranslatedField(producto, 'description') || producto.description}</p>
            <span 
              className="inline-block w-full text-center px-6 py-3 rounded-md font-semibold uppercase tracking-wider text-sm text-white transition-colors duration-300"
              style={{ backgroundColor: '#f6921d' }}
            >
              {t('products.actions.viewProduct')}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
