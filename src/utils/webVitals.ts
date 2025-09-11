// Web Vitals monitoring utilities

export interface WebVitalMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  entries: any[];
}

export type WebVitalHandler = (metric: WebVitalMetric) => void;

// Enhanced Web Vitals measurement with fallbacks
export const measureWebVitals = (onPerfEntry?: WebVitalHandler) => {
  if (!onPerfEntry || typeof onPerfEntry !== 'function') {
    return;
  }

  // Dynamic import to avoid bundling if not needed
  import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
    onCLS(onPerfEntry);
    onINP(onPerfEntry); // FID was replaced by INP in web-vitals v5
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }).catch(() => {
    // Fallback implementations if web-vitals is not available
    console.warn('Web Vitals library not available, using fallback measurements');
    measureFallbackVitals(onPerfEntry);
  });
};

// Fallback measurements using Performance API
const measureFallbackVitals = (onPerfEntry: WebVitalHandler) => {
  if (!('performance' in window)) {
    return;
  }

  // Measure FCP (First Contentful Paint)
  const paintEntries = performance.getEntriesByType('paint');
  const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
  
  if (fcpEntry) {
    onPerfEntry({
      name: 'FCP',
      value: fcpEntry.startTime,
      delta: fcpEntry.startTime,
      id: 'fcp-fallback',
      entries: [fcpEntry]
    });
  }

  // Measure LCP (Largest Contentful Paint) - approximation
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    
    onPerfEntry({
      name: 'LCP',
      value: lastEntry.startTime,
      delta: lastEntry.startTime,
      id: 'lcp-fallback',
      entries: [lastEntry]
    });
  });

  try {
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    console.warn('LCP measurement not supported');
  }

  // Measure TTFB (Time to First Byte)
  const navEntries = performance.getEntriesByType('navigation');
  if (navEntries.length > 0) {
    const navEntry = navEntries[0] as PerformanceNavigationTiming;
    const ttfb = navEntry.responseStart - navEntry.requestStart;
    
    onPerfEntry({
      name: 'TTFB',
      value: ttfb,
      delta: ttfb,
      id: 'ttfb-fallback',
      entries: [navEntry]
    });
  }
};

// Performance monitoring with thresholds
export const monitorPerformance = () => {
  const thresholds = {
    FCP: 1800, // 1.8s
    LCP: 2500, // 2.5s
    FID: 100,  // 100ms
    CLS: 0.1,  // 0.1
    TTFB: 600  // 600ms
  };

  measureWebVitals((metric) => {
    const threshold = thresholds[metric.name as keyof typeof thresholds];
    const status = metric.value <= threshold ? 'good' : 'needs-improvement';
    
    console.log(`${metric.name}: ${metric.value}ms (${status})`);
    
    // Send to analytics if available
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.value),
        non_interaction: true,
      });
    }
  });
};

// Resource loading performance
export const measureResourceLoading = () => {
  if (!('performance' in window)) {
    return;
  }

  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'resource') {
        const resource = entry as PerformanceResourceTiming;
        
        // Check for slow resources
        if (resource.duration > 1000) { // 1 second
          console.warn(`Slow resource: ${resource.name} took ${resource.duration}ms`);
        }
      }
    });
  });

  try {
    observer.observe({ entryTypes: ['resource'] });
  } catch (e) {
    console.warn('Resource timing not supported');
  }
};

// Memory usage monitoring
export const monitorMemoryUsage = () => {
  if (!('performance' in window) || !('memory' in (performance as any))) {
    return;
  }

  const memory = (performance as any).memory;
  
  console.log('Memory usage:', {
    used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
    total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
    limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
  });
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  // Monitor Web Vitals
  monitorPerformance();
  
  // Monitor resource loading
  measureResourceLoading();
  
  // Monitor memory usage periodically
  if (typeof window !== 'undefined') {
    setInterval(monitorMemoryUsage, 30000); // Every 30 seconds
  }
};