import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: React.ReactEventHandler<HTMLImageElement>;
  fallback?: string;
  style?: React.CSSProperties;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '100vw',
  width,
  height,
  loading,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const getWebPSrc = (src: string): string => {
    return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  };

  const getAvifSrc = (src: string): string => {
    return src.replace(/\.(jpg|jpeg|png)$/i, '.avif');
  };

  // Check if optimized formats should be used (skip for small icons)
  const shouldUseOptimizedFormats = () => {
    if (!width || !height) return true;
    return width > 50 || height > 50; // Only use WebP/AVIF for larger images
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const imgStyle = {
    width: width ? `${width}px` : 'auto',
    height: height ? `${height}px` : 'auto',
    ...props.style
  };

  return (
    <div 
      ref={imgRef} 
      className="relative"
      style={width && height ? { width, height } : undefined}
    >
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse rounded"
          style={imgStyle}
        />
      )}
      
      {isInView && !hasError && (
        shouldUseOptimizedFormats() ? (
          <picture>
            <source srcSet={getAvifSrc(src)} type="image/avif" />
            <source srcSet={getWebPSrc(src)} type="image/webp" />
            <img
              src={src}
              alt={alt}
              loading={loading || (priority ? 'eager' : 'lazy')}
              onLoad={handleLoad}
              onError={handleError}
              className={`transition-opacity duration-300 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              } ${className}`}
              style={imgStyle}
              width={width}
              height={height}
              sizes={sizes}
              {...props}
            />
          </picture>
        ) : (
          <img
            src={src}
            alt={alt}
            loading={loading || (priority ? 'eager' : 'lazy')}
            onLoad={handleLoad}
            onError={handleError}
            className={`transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            style={imgStyle}
            width={width}
            height={height}
            sizes={sizes}
            {...props}
          />
        )
      )}
      
      {hasError && (
        <div 
          className="flex items-center justify-center bg-gray-100 text-gray-400 text-sm"
          style={imgStyle}
        >
          Image failed to load
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;