/**
 * ProductCard Component - Modified for WordPress API Data
 * PRILABSA Headless WordPress Integration
 * @author SOLARIA AGENCY
 *
 * IMPORTANT: This file maintains 100% of existing Tailwind design.
 * Only props interface updated to handle API data structure.
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TransformedProduct } from '../types/wordpress';
import { getImageUrlWithFallback } from '../utils/productAdapter';

/**
 * ProductCard Props
 */
interface ProductCardProps {
  product: TransformedProduct;
  onView?: (product: TransformedProduct) => void;
}

/**
 * ProductCard Component
 */
export default function ProductCard({ product, onView }: ProductCardProps) {
  const { t } = useTranslation();
  const [imageError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Get primary image with fallback
  const primaryImage = product.imagenes.length > 0 ? product.imagenes[0] : null;
  const imageUrl = getImageUrlWithFallback(primaryImage || undefined);

  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
    setIsImageLoading(false);
  };

  // Handle image load success
  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  // Handle card click
  const handleClick = () => {
    if (onView) {
      onView(product);
    }
  };

  // Get primary category name
  const primaryCategory = product.categorias.length > 0 ? product.categorias[0].name : null;

  return (
    <div
      className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
      onClick={handleClick}
    >
      {/* Image Container */}
      <div className="relative h-64 bg-gradient-to-br from-slate-100 to-blue-50 overflow-hidden">
        {/* Loading Skeleton */}
        {isImageLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 animate-pulse"></div>
        )}

        {/* Product Image */}
        <img
          src={imageError ? getImageUrlWithFallback(undefined) : imageUrl}
          alt={product.nombre}
          onError={handleImageError}
          onLoad={handleImageLoad}
          className={`w-full h-full object-contain p-4 transition-all duration-300 group-hover:scale-110 ${
            isImageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />

        {/* Category Badge */}
        {primaryCategory && (
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full font-montserrat">
              {primaryCategory}
            </span>
          </div>
        )}

        {/* PDF Badge */}
        {product.pdfUrl && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full font-montserrat">
              <svg
                className="w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                  clipRule="evenodd"
                />
              </svg>
              PDF
            </span>
          </div>
        )}

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content Container */}
      <div className="p-6">
        {/* Product Code */}
        {product.codigo && (
          <div className="mb-2">
            <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs font-mono rounded font-montserrat">
              {product.codigo}
            </span>
          </div>
        )}

        {/* Product Name */}
        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors font-montserrat">
          {product.nombre}
        </h3>

        {/* Product Description - Truncated */}
        {product.descripcion && (
          <p className="text-sm text-slate-600 line-clamp-3 mb-4 font-montserrat">
            {product.descripcion.replace(/<[^>]*>/g, '')}
          </p>
        )}

        {/* Brand Badge */}
        {product.marca && (
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 text-xs font-semibold rounded-lg font-montserrat">
              {product.marca}
            </span>
          </div>
        )}

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded font-montserrat"
              >
                {tag.name}
              </span>
            ))}
            {product.tags.length > 3 && (
              <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded font-montserrat">
                +{product.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg font-montserrat"
          >
            {t('productos.viewDetails', 'Ver Detalles')}
          </button>

          {product.pdfUrl && (
            <a
              href={product.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-4 py-2 bg-white border-2 border-blue-600 text-blue-600 text-sm font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg font-montserrat"
              aria-label={t('productos.downloadPdf', 'Descargar PDF')}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Glassmorphism Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-2xl"></div>
    </div>
  );
}
