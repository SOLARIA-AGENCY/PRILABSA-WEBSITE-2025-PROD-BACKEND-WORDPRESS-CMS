import React, { useState } from 'react';
import { useLazyImage, useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useWebPSupport } from '../hooks/useWebPSupport';

interface OptimizedImageV2Props {
  src: string;
  webpSrc?: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  placeholder?: string;
  sizes?: string;
  srcSet?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const ImagePlaceholder: React.FC<{ className?: string; alt: string }> = ({ 
  className, 
  alt 
}) => (
  <div 
    className={`bg-gray-200 animate-pulse flex items-center justify-center ${className || ''}`}
    aria-label={`Loading ${alt}`}
  >
    <svg 
      className="w-8 h-8 text-gray-400" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
      />
    </svg>
  </div>
);

export const OptimizedImageV2: React.FC<OptimizedImageV2Props> = ({
  src,
  webpSrc,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  priority = false,
  placeholder,
  sizes,
  srcSet,
  onLoad,
  onError
}) => {
  const webpSupported = useWebPSupport();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Use lazy loading only if not priority and loading is 'lazy'
  const shouldLazyLoad = loading === 'lazy' && !priority;
  
  const {
    elementRef: lazyRef,
    imageSrc,
    isVisible,
    handleImageError: handleLazyError
  } = useLazyImage(
    shouldLazyLoad ? src : src,
    shouldLazyLoad ? src : undefined
  );

  // For eager loading, use intersection observer to detect when image enters viewport
  const { elementRef: eagerRef, isVisible: eagerVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
    freezeOnceVisible: true
  });

  // Determine which ref to use
  const ref = shouldLazyLoad ? lazyRef : eagerRef;
  const shouldShowImage = shouldLazyLoad ? isVisible && imageSrc : eagerVisible || priority;

  // Determine the optimal source
  const getOptimalSrc = () => {
    if (webpSupported === null) return src; // WebP support not determined yet
    
    if (webpSupported && webpSrc) {
      return webpSrc;
    }
    
    return shouldLazyLoad ? imageSrc || src : src;
  };

  const handleLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setImageError(true);
    if (shouldLazyLoad) {
      handleLazyError();
    }
    onError?.();
  };

  const finalSrc = getOptimalSrc();

  return (
    <div ref={ref} className="relative">
      {/* Placeholder */}
      {(!shouldShowImage || (!imageLoaded && !imageError)) && (
        <ImagePlaceholder 
          className={className} 
          alt={alt}
        />
      )}
      
      {/* Main image */}
      {shouldShowImage && (
        <>
          {webpSrc && webpSupported !== false ? (
            <picture>
              <source srcSet={webpSrc} type="image/webp" sizes={sizes} />
              <img
                src={finalSrc}
                alt={alt}
                className={`transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                } ${className || ''}`}
                width={width}
                height={height}
                loading={priority ? 'eager' : loading}
                srcSet={srcSet}
                sizes={sizes}
                onLoad={handleLoad}
                onError={handleError}
                style={{
                  position: imageLoaded ? 'static' : 'absolute',
                  top: imageLoaded ? 'auto' : 0,
                  left: imageLoaded ? 'auto' : 0,
                  width: imageLoaded ? 'auto' : '100%',
                  height: imageLoaded ? 'auto' : '100%'
                }}
              />
            </picture>
          ) : (
            <img
              src={finalSrc}
              alt={alt}
              className={`transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } ${className || ''}`}
              width={width}
              height={height}
              loading={priority ? 'eager' : loading}
              srcSet={srcSet}
              sizes={sizes}
              onLoad={handleLoad}
              onError={handleError}
              style={{
                position: imageLoaded ? 'static' : 'absolute',
                top: imageLoaded ? 'auto' : 0,
                left: imageLoaded ? 'auto' : 0,
                width: imageLoaded ? 'auto' : '100%',
                height: imageLoaded ? 'auto' : '100%'
              }}
            />
          )}
        </>
      )}
      
      {/* Error state */}
      {imageError && (
        <div className={`bg-gray-100 flex items-center justify-center ${className || ''}`}>
          <div className="text-center p-4">
            <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-gray-500">Error al cargar imagen</p>
          </div>
        </div>
      )}
    </div>
  );
};