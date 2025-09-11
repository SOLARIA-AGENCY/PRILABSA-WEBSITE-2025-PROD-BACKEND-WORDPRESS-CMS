import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = <T extends Element = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    root = null,
    freezeOnceVisible = false
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    
    if (!element) return;

    // If freezeOnceVisible is true and element is already visible, don't observe
    if (freezeOnceVisible && isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin, root }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, root, freezeOnceVisible, isVisible]);

  return { elementRef, isVisible, entry };
};

// Hook for lazy loading images
export const useLazyImage = (src: string, fallbackSrc?: string) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [imageError, setImageError] = useState(false);
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
    freezeOnceVisible: true
  });

  useEffect(() => {
    if (isVisible && !imageSrc) {
      setImageSrc(src);
    }
  }, [isVisible, src, imageSrc]);

  const handleImageError = () => {
    if (fallbackSrc && !imageError) {
      setImageSrc(fallbackSrc);
      setImageError(true);
    }
  };

  return {
    elementRef,
    imageSrc,
    isVisible,
    imageError,
    handleImageError
  };
};

// Hook for infinite scrolling
export const useInfiniteScroll = (
  callback: () => void,
  hasMore: boolean = true
) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 1.0,
    rootMargin: '100px'
  });

  useEffect(() => {
    if (isVisible && hasMore) {
      callback();
    }
  }, [isVisible, hasMore, callback]);

  return elementRef;
};