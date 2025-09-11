import React from 'react';
import { CategoriaProducto } from '../../../data/categoriasProductos';
import CategoryCard from '../../CategoryCard';
import { useLanguage } from '../../../contexts/LanguageContext';

interface CategoryGridProps {
  categories: CategoriaProducto[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex justify-center py-10">
      <div className="flex flex-wrap justify-center gap-8 lg:w-4/5">
        {categories.length > 0 ? (
          categories.map(cat => (
            <div key={cat.id} className="shadow-2xl rounded-lg">
              <CategoryCard
                imagen={cat.imagen}
                titulo={t(`products.categories.${cat.id}`)}
                enlace={cat.enlace}
                size="large"
              />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-xl py-8">
            {t('products.search.noResults')}
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryGrid;
