import { useState, useRef, useEffect } from 'react';

interface UseImageFallbackOptions {
  fallbackUrl?: string;
  placeholderUrl?: string;
}

interface UseImageFallbackReturn {
  src: string;
  isError: boolean;
  isLoading: boolean;
  onLoad: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onError: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}

export const useImageFallback = (
  originalSrc: string,
  options: UseImageFallbackOptions = {}
): UseImageFallbackReturn => {
  const {
    fallbackUrl,
    placeholderUrl = '/assets/images/placeholder-product.svg'
  } = options;
  
  const [currentSrc, setCurrentSrc] = useState(originalSrc);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hasTriedFallback = useRef(false);

  useEffect(() => {
    setCurrentSrc(originalSrc);
    setIsError(false);
    setIsLoading(true);
    hasTriedFallback.current = false;
  }, [originalSrc]);

  const checkImageValidity = async (img: HTMLImageElement) => {
    // Check if image loaded but has no dimensions (HTML served as PNG)
    if (img.complete && img.naturalWidth === 0 && img.naturalHeight === 0) {
      console.warn(`Image loaded but has no dimensions (likely HTML served as PNG): ${img.src}`);
      return false;
    }
    
    // Additional check for suspiciously small images that could be HTML
    if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
      try {
        const response = await fetch(img.src, { method: 'HEAD' });
        const contentLength = parseInt(response.headers.get('content-length') || '0');
        
        // Suspicious: Very small file size for what should be a product image
        if (contentLength < 10000) { // Less than 10KB is suspicious for product images
          console.warn(`Suspicious file size: ${contentLength} bytes for ${img.src}`);
          return false;
        }
      } catch (error) {
        console.warn(`Failed to check image headers for ${img.src}:`, error);
      }
    }
    
    return true;
  };

  const handleLoad = async (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    
    // Immediate check for obvious corruption (HTML served as PNG)
    if (img.complete && (img.naturalWidth === 0 || img.naturalHeight === 0)) {
      console.warn(`Image loaded but has invalid dimensions: ${img.src} (${img.naturalWidth}x${img.naturalHeight})`);
      handleError(event);
      return;
    }
    
    // Additional async validation
    const isValid = await checkImageValidity(img);
    
    if (!isValid) {
      console.warn(`Image failed additional validation: ${img.src}`);
      handleError(event);
      return;
    }
    
    setIsLoading(false);
    setIsError(false);
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    console.warn(`Image error/fallback triggered for: ${img.src}`);
    
    if (!hasTriedFallback.current && fallbackUrl && currentSrc !== fallbackUrl) {
      // Try fallback URL first
      console.log(`Trying fallback URL: ${fallbackUrl}`);
      hasTriedFallback.current = true;
      setCurrentSrc(fallbackUrl);
      setIsLoading(true);
      return;
    }
    
    // Use placeholder as final fallback
    if (currentSrc !== placeholderUrl) {
      console.log(`Using final placeholder: ${placeholderUrl}`);
      setCurrentSrc(placeholderUrl);
      setIsLoading(true);
    } else {
      // Even placeholder failed
      console.error(`Even placeholder failed: ${placeholderUrl}`);
      setIsLoading(false);
      setIsError(true);
    }
  };

  return {
    src: currentSrc,
    isError,
    isLoading,
    onLoad: handleLoad,
    onError: handleError
  };
};