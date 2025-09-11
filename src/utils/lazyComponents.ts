import { lazy } from 'react';

// Lazy load non-critical page components only
// Note: Inicio, Blog, and Noticias are loaded statically to avoid conflicts
export const LazyProductos = lazy(() => import('../pages/Productos'));
export const LazyProductoDetalle = lazy(() => import('../pages/ProductoDetalle'));
export const LazyNoticiaPage = lazy(() => import('../pages/NoticiaPage'));
export const LazyArticlePage = lazy(() => import('../pages/ArticlePage'));
export const LazyQuienesSomos = lazy(() => import('../pages/QuienesSomos'));
export const LazyTrabajaConNosotros = lazy(() => import('../pages/TrabajaConNosotros'));
export const LazyContactanos = lazy(() => import('../pages/Contactanos'));
export const LazyCotizacion = lazy(() => import('../pages/Cotizacion'));
export const LazyOficinas = lazy(() => import('../pages/Oficinas'));
export const LazyCategoryPage = lazy(() => import('../pages/CategoryPage'));

// Lazy load heavy, non-critical components only
// Note: Header and Footer are loaded statically as they're critical for layout
export const LazyFlipbookViewer = lazy(() => import('../components/FlipbookViewer'));
export const LazyOficinasMap = lazy(() => import('../components/OficinasMap'));
export const LazyCategoryGrid = lazy(() => import('../components/organisms/products/CategoryGrid'));

// Optimized preload with usage tracking to prevent warnings
export const preloadCritical = () => {
  if (typeof window === 'undefined') return;
  
  // Only preload images that are guaranteed to be used immediately
  const criticalImages = [
    '/images/logos/logo-prilabsa-blanco.png'
  ];
  
  // Images for lazy prefetch (when actually needed)
  const lazyImages = [
    '/assets/iniciodev/foto-isotipo-prilabsa-alimentos.png',
    '/assets/iniciodev/agencia-honduras-optimized.jpg'
  ];
  
  // Preload only truly critical images
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
  
  // Prefetch other images only when needed
  const prefetchLazy = () => {
    lazyImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = src;
      document.head.appendChild(link);
    });
  };
  
  // Delay prefetch to avoid blocking critical resources
  setTimeout(prefetchLazy, 2000);
};

// Preload on demand for lazy-loaded components
export const preloadOnHover = (componentName: string) => {
  switch (componentName) {
    case 'productos':
      import('../pages/Productos');
      break;
    case 'quienes-somos':
      import('../pages/QuienesSomos');
      break;
    case 'contactanos':
      import('../pages/Contactanos');
      break;
    case 'oficinas':
      import('../pages/Oficinas');
      break;
    default:
      break;
  }
};

// Lazy loading with error boundary
export const withLazyLoading = (Component: any, fallback?: React.ReactNode) => {
  return lazy(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Component);
      }, 0);
    });
  });
};