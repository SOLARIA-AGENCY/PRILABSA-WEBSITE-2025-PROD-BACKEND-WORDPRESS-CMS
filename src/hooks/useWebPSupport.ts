import { useState, useEffect } from 'react';

// Check WebP support once and cache the result
let webpSupported: boolean | null = null;

const checkWebPSupport = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (webpSupported !== null) {
      resolve(webpSupported);
      return;
    }

    const webp = document.createElement('canvas');
    webp.width = 1;
    webp.height = 1;
    
    const ctx = webp.getContext('2d');
    if (!ctx) {
      webpSupported = false;
      resolve(false);
      return;
    }
    
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fillRect(0, 0, 1, 1);
    
    try {
      const dataURL = webp.toDataURL('image/webp');
      webpSupported = dataURL.indexOf('data:image/webp') === 0;
    } catch (e) {
      webpSupported = false;
    }
    
    resolve(webpSupported);
  });
};

export const useWebPSupport = () => {
  const [isSupported, setIsSupported] = useState<boolean | null>(webpSupported);
  
  useEffect(() => {
    if (webpSupported === null) {
      checkWebPSupport().then(setIsSupported);
    }
  }, []);
  
  return isSupported;
};

// Utility to get the appropriate image source
export const getOptimizedImageSrc = (webpSrc: string, fallbackSrc: string): string => {
  // If WebP support is not determined yet, use fallback
  if (webpSupported === null) {
    return fallbackSrc;
  }
  
  return webpSupported ? webpSrc : fallbackSrc;
};