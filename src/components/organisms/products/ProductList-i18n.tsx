import React from 'react';
import { Link } from 'react-router-dom';
import { productsJulio2025 } from '../../../data/products/julio-2025';
import { useLanguage } from '../../../contexts/LanguageContext';

interface ProductListProps {
  categorySlug: string;
  searchQuery: string;
}

const ProductList: React.FC<ProductListProps> = ({ categorySlug, searchQuery }) => {
  const { t } = useLanguage();
  
  // Use julio-2025 products as the main product source
  const allProducts = productsJulio2025;
  
  const filteredProducts = allProducts
    .filter(p => p.category === categorySlug)
    .filter(p => 
      searchQuery ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
    );

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-800">{t('products.search.noResults')}</h2>
        <p className="text-gray-500 mt-2">{t('products.search.noResultsDescription')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {filteredProducts.map(producto => (
        <Link 
          key={producto.id} 
          to={`/productos/${producto.category}/${producto.slug}`}
          className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out hover:shadow-xl group block"
        >
          <div className="h-48 overflow-hidden">
            <img 
              src={producto.assets?.image?.path || '/assets/images/placeholder-product.jpg'} 
              alt={producto.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-bold uppercase mb-2 h-16" style={{ color: '#3759C1' }}>{producto.name}</h3>
            <p className="text-gray-600 text-sm mb-4 h-24 overflow-hidden">{producto.description}</p>
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