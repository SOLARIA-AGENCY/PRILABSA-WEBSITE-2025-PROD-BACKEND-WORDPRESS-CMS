import React, { useEffect, useState } from 'react';
import { OptimizedProduct } from '../../data/products/types';
import { useProductTranslation } from '../../i18n/hooks/useProductTranslation';
import { useImageFallback } from '../../hooks/useImageFallback';

interface ProductModalProps {
  product: OptimizedProduct;
  isOpen: boolean;
  onClose: () => void;
  onDownload?: (productId: string) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onDownload
}) => {
  const { getProductText } = useProductTranslation();
  
  
  // Image fallback setup
  const main = product.assets.image;
  const primaryImageSrc = main?.path || '/assets/images/placeholder-product.svg';
  const fallbackImageSrc = main?.filename ? `/assets/images/productos/fallback/${main.filename}` : undefined;
  
  const imageProps = useImageFallback(primaryImageSrc, {
    fallbackUrl: fallbackImageSrc,
    placeholderUrl: '/assets/images/placeholder-product.svg'
  });

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    if (!product.assets.pdf) return;
    
    try {
      const link = document.createElement('a');
      link.href = product.assets.pdf.downloadUrl;
      link.download = product.assets.pdf.filename;
      link.target = '_blank';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      onDownload?.(product.id);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Cerrar modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Image section */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src={imageProps.src}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onLoad={imageProps.onLoad}
                  onError={imageProps.onError}
                />
              </div>
              
              {/* Gallery thumbnails if available */}
            </div>

            {/* Content section */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-1">
                  {product.name}
                </h2>
                
                {/* Product code subtitle */}
                {product.codigo && (
                  <p className="text-lg font-medium text-gray-600 mb-3">
                    {getProductText('productDetail.productCode', 'CÓDIGO')}: {product.codigo}
                  </p>
                )}
                
                <div className="flex gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {getProductText(`categories.${product.category}`, product.category)}
                  </span>
                  {product.metadata.featured && (
                    <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
                      {getProductText('common.featured', 'Destacado')}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {getProductText('productDetail.description', 'Descripción')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Specifications */}
              {product.specifications && product.specifications.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {getProductText('productDetail.specifications', 'Especificaciones')}
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between items-start">
                        <span className="text-gray-700 font-medium flex-1">
                          {spec.key}:
                        </span>
                        <span className="text-gray-900 flex-1 text-right">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}


              {/* Actions */}
              <div className="flex gap-3 pt-4">
                
                {product.assets.pdf && (
                  <button
                    onClick={handleDownload}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {getProductText('productDetail.downloadDatasheet', 'Descargar Ficha Técnica')}
                  </button>
                )}
                
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  {getProductText('common.close', 'Cerrar')}
                </button>
              </div>

              {/* Metadata */}
              <div className="text-xs text-gray-500 pt-4 border-t">
                <p>ID: {product.id}</p>
                <p>Actualizado: {product.metadata.lastModified?.toLocaleDateString() || 'No disponible'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;