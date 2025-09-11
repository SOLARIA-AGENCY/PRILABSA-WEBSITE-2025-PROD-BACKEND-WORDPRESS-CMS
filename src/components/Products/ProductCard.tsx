import React, { Suspense, lazy, useState } from 'react';
import { OptimizedProduct } from '../../data/products/types';
import { useProductTranslation } from '../../i18n/hooks/useProductTranslation';
import { useLanguage } from '../../contexts/LanguageContext';
import { useImageFallback } from '../../hooks/useImageFallback';

// Declaración global para gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const gtag = window.gtag;

// Lazy load heavy components
const ProductModal = lazy(() => import('./ProductModal'));

interface ProductCardProps {
  product: OptimizedProduct;
  onDownload?: (productId: string) => void;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onDownload,
  loading = 'lazy',
  priority = false
}) => {
  const { getProductText } = useProductTranslation();
  const { language } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  
  // Get image URLs
  const main = product.assets.image;
  const primaryImageSrc = main?.path || '/assets/images/placeholder-product.svg';
  const fallbackImageSrc = main?.filename ? `/assets/images/productos/fallback/${main.filename}` : undefined;
  
  // Use fallback hook
  const imageProps = useImageFallback(primaryImageSrc, {
    fallbackUrl: fallbackImageSrc,
    placeholderUrl: '/assets/images/placeholder-product.svg'
  });
  
  // Get product translation with safe fallback to base product
  const getTranslatedField = (field: 'name' | 'description' | 'benefits' | 'presentation' | 'specifications') => {
    switch (field) {
      case 'name': return product.name;
      case 'description': return product.description;
      case 'benefits': return product.benefits || [];
      case 'presentation': return product.presentation || [];
      case 'specifications': return product.specifications || [];
      default: return null;
    }
  };
  
  const handlePDFDownload = async () => {
    if (!product.assets.pdf) return;
    
    try {
      // Analytics tracking
      if (typeof gtag !== 'undefined') {
        gtag('event', 'download', {
          event_category: 'Product',
          event_label: product.id,
          value: 1
        });
      }
      
      // Create download link
      const link = document.createElement('a');
      link.href = product.assets.pdf.downloadUrl;
      link.download = product.assets.pdf.filename;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      onDownload?.(product.id);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };


  const renderOptimizedImage = () => {
    return (
      <img 
        src={imageProps.src}
        alt={product.name}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        loading={loading}
        onLoad={imageProps.onLoad}
        onError={imageProps.onError}
      />
    );
  };

  return (
    <>
      <div className="group product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
        {/* Optimized Image Container */}
        <div className="relative overflow-hidden">
          {renderOptimizedImage()}
          
          {/* Featured badge */}
          {product.metadata.featured && (
            <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
              {getProductText('common.featured', 'Destacado')}
            </div>
          )}
          
          {/* Quick view button */}
          <button
            onClick={() => setModalOpen(true)}
            className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
            aria-label={`Ver detalles de ${product.name}`}
          >
            <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium">
              {getProductText('common.viewDetails', 'Ver Detalles')}
            </span>
          </button>
        </div>
        
        <div className="p-6">
          {/* Product name (clean) */}
          <h3 className="text-xl font-semibold mb-1 text-gray-900 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Product code subtitle */}
          {product.codigo && (
            <p className="text-sm font-medium text-gray-600 mb-3">
              {getProductText('productDetail.productCode', 'CÓDIGO')}: {product.codigo}
            </p>
          )}
          
          {/* Category */}
          <span className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full mb-3">
            {getProductText(`categories.${product.category}`, product.category)}
          </span>
          
          {/* Description */}
          <p className="text-gray-600 mb-4 line-clamp-3">
            {String(getTranslatedField('description') || product.description)}
          </p>
          
          {/* Specifications preview */}
          {(() => {
            const translatedSpecs = getTranslatedField('specifications');
            const specs = translatedSpecs || product.specifications;
            return specs && specs.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  {getProductText('productDetail.specifications', 'Especificaciones')}
                </h4>
                <div className="text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>{typeof specs[0] === 'object' && specs[0].key ? specs[0].key : 'Especificación'}:</span>
                    <span className="font-medium">{typeof specs[0] === 'object' && specs[0].value ? String(specs[0].value) : String(specs[0])}</span>
                  </div>
                  {specs.length > 1 && (
                    <span className="text-xs text-gray-500 mt-1 block">
                      +{specs.length - 1} {getProductText('common.more', 'más')}
                    </span>
                  )}
                </div>
              </div>
            );
          })()}
          
          {/* Action buttons */}
          <div className="flex gap-2">
            {product.assets.pdf && (
              <button
                onClick={handlePDFDownload}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {getProductText('common.downloadPdf', 'Descargar')} ({product.assets.pdf.size})
              </button>
            )}
            
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              {getProductText('common.viewMore', 'Ver Más')}
            </button>
          </div>
        </div>
      </div>

      {/* Modal for product details */}
      {modalOpen && (
        <Suspense fallback={<div>Cargando detalles...</div>}>
          <ProductModal
            product={product}
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onDownload={onDownload}
          />
        </Suspense>
      )}
    </>
  );
};
