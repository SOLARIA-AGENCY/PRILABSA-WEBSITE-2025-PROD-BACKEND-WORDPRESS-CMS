/**
 * ProductCategories Component - Category Filter
 * PRILABSA Headless WordPress Integration
 * @author SOLARIA AGENCY
 */

import { useTranslation } from 'react-i18next';
import type { WordPressCategory } from '../types/wordpress';

/**
 * ProductCategories Props
 */
interface ProductCategoriesProps {
  categories: WordPressCategory[];
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
}

/**
 * ProductCategories Component
 */
export default function ProductCategories({
  categories,
  selectedCategory,
  onCategoryChange,
}: ProductCategoriesProps) {
  const { t } = useTranslation();

  // Handle category click
  const handleCategoryClick = (categoryId: number | null) => {
    // Toggle category: if already selected, deselect it
    if (categoryId === selectedCategory) {
      onCategoryChange(null);
    } else {
      onCategoryChange(categoryId);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-3 justify-center items-center">
        {/* All Categories Button */}
        <button
          onClick={() => handleCategoryClick(null)}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 font-montserrat ${
            selectedCategory === null
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
              : 'bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-white hover:shadow-md'
          }`}
        >
          {t('productos.allCategories', 'Todas las Categorías')}
        </button>

        {/* Category Buttons */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 font-montserrat ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                : 'bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-white hover:shadow-md'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {category.name}
              {category.count > 0 && (
                <span
                  className={`inline-flex items-center justify-center px-2 py-0.5 text-xs rounded-full ${
                    selectedCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700'
                  }`}
                >
                  {category.count}
                </span>
              )}
            </span>

            {/* Glassmorphism Effect */}
            {selectedCategory !== category.id && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-xl"></div>
            )}
          </button>
        ))}
      </div>

      {/* Category Description (if selected) */}
      {selectedCategory && categories.find(cat => cat.id === selectedCategory)?.description && (
        <div className="mt-4 max-w-2xl mx-auto">
          <p className="text-sm text-slate-600 text-center italic font-montserrat">
            {categories.find(cat => cat.id === selectedCategory)?.description}
          </p>
        </div>
      )}
    </div>
  );
}
