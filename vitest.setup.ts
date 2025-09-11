// Simplified test setup without external testing libraries
import { vi, beforeEach } from 'vitest';
import React from 'react';
import '@testing-library/jest-dom';

// Mock LanguageContext with absolute path
vi.mock('/Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/src/contexts/LanguageContext', () => ({
  LanguageProvider: vi.fn().mockImplementation(({ children }: any) => 
    React.createElement('div', { 'data-testid': 'language-provider' }, children)
  ),
  useLanguage: vi.fn().mockReturnValue({
    language: 'es',
    setLanguage: vi.fn(),
    t: vi.fn().mockImplementation((key: string) => {
      // Return mock translations for common keys
      const mockTranslations: Record<string, string> = {
         // Breadcrumbs
         'breadcrumbs.home': 'Inicio',
         'breadcrumbs.products': 'Productos',
         'breadcrumbs.aditivos': 'Aditivos',
         'breadcrumbs.category.aditivos': 'Aditivos',
         'breadcrumbs.category.alimentos': 'Alimentos',
         'breadcrumbs.category.probioticos': 'Probióticos',
         'breadcrumbs.category.quimicos': 'Químicos',
         'breadcrumbs.category.equipos': 'Equipos',
         
         // Test products (critical for test stability)
         'product.test-product-1.name': 'Test Product 1',
         'product.test-product-1.description': 'Test description 1',
         'product.test-product-1.category': 'Alimentos',
         'test-product-1': 'Test Product 1',
         
         // Consent
         'consent.text': 'He leído y acepto la ',
         'consent.privacyPolicy': 'política de privacidad',
         'consent.error': 'Debe aceptar la política de privacidad para continuar.',
         
         // Blog
         'blog.search.placeholder': 'Buscar en el blog...',
         'blog.noArticles': 'No hay artículos disponibles',
         
         // News
         'news.noNews': 'No hay noticias disponibles',
         
         // Home hero section
        'home.hero.title': 'Somos proveedores de las mejores soluciones integrales en',
        'home.hero.subtitle': 'Equipos, reactivos y servicios especializados para el sector salud',
        'home.hero.cta.catalog': 'Learn More',
        'home.hero.cta.contact': 'Contactar',
         
         // Home weAre section
         'home.weAre.title': 'SOMOS',
         'home.weAre.subtitle': 'Tu socio estratégico en soluciones para laboratorios',
         'home.weAre.description': 'Prilabsa es una empresa multinacional fundada en 1992, dedicada a la comercialización de alimentos, probióticos, aditivos, equipos y químicos con altos estándares de calidad.',
         'home.weAre.watchVideo': 'Ver Video',
         'home.weAre.sections.excellence.title': 'Excelencia',
         'home.weAre.sections.excellence.description': 'Comprometidos con la calidad y la innovación en cada producto.',
         'home.weAre.sections.innovation.title': 'Innovación',
         'home.weAre.sections.innovation.description': 'Desarrollamos soluciones tecnológicas avanzadas para el sector.',
         'home.weAre.sections.trust.title': 'Confianza',
         'home.weAre.sections.trust.description': 'Más de 30 años respaldando a nuestros clientes.',
         
         // Products
         'products.title': 'Productos',
         'products.search.placeholder': 'Buscar categorías de productos...',
         'products.search.noResults': 'No se encontraron productos',
         'products.categories.alimentos': 'Alimentos',
         'products.categories.equipos': 'Equipos',
         'products.productDetail.productNotFound': 'Producto no encontrado',
         'products.actions.backToProducts': 'Volver a Productos',
         'products.productDetail.description': 'Descripción',
         'products.productDetail.specifications': 'Especificaciones',
         'products.productDetail.benefits': 'Beneficios',
         'products.productDetail.presentation': 'Presentación',
         'products.productDetail.relatedProducts': 'Productos Relacionados',
         'products.actions.downloadPDF': 'Descargar Ficha Técnica (PDF)',
         'products.productDetail.downloadTechnicalSheet': 'Descargar Ficha Técnica (PDF)',
         
         // Footer
         'footer.company': 'Empresa',
         'footer.products': 'Productos',
         'footer.contact.title': 'CONTÁCTANOS',
         'footer.contact.email': 'Para más información escríbenos a',
         'footer.location.title': 'UBICACIÓN',
         'footer.location.address': 'Dirección',
         'footer.social.title': '¡SÍGUENOS!',
         'footer.copyright.text': '© 2025 Prilabsa. Todos los derechos reservados.',
         'footer.legal.privacy': 'Política de Privacidad',
         'footer.legal.terms': 'Términos y Condiciones',
         'footer.legal.legalNotice': 'Aviso Legal',
         'footer.legal.cookiePolicy': 'Política de Cookies',
         
         // Header navigation
         'header.navigation.home': 'INICIO',
         'header.navigation.about': 'QUIENES SOMOS',
         'header.navigation.offices': 'OFICINAS',
         'header.navigation.products': 'PRODUCTOS',
         'header.navigation.contact': 'CONTÁCTANOS',
         'header.navigation.careers': 'TRABAJA CON NOSOTROS',
         'header.navigation.search': 'Buscar...',
         'header.navigation.news': 'Noticias'
       };
      return mockTranslations[key] || key;
    })
  })
}));

beforeEach(() => {
  vi.clearAllMocks();
  // Reset any global state if needed
  if (typeof window !== 'undefined') {
    window.scrollTo = vi.fn();
  }
  
  // Create root element for react-modal if it doesn't exist
  if (!document.getElementById('root')) {
    const rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);
  }
});

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn().mockImplementation((callback: FrameRequestCallback) => {
  return setTimeout(callback, 16);
});

global.cancelAnimationFrame = vi.fn().mockImplementation((id: number) => {
  clearTimeout(id);
});

// Mock global timers to prevent jsdom clearInterval errors
Object.defineProperty(global, 'setTimeout', {
  writable: true,
  value: vi.fn().mockImplementation((callback: Function, delay?: number) => {
    return 1; // Return mock timer ID
  }),
});

Object.defineProperty(global, 'clearTimeout', {
  writable: true,
  value: vi.fn(),
});

Object.defineProperty(global, 'setInterval', {
  writable: true,
  value: vi.fn().mockImplementation((callback: Function, delay?: number) => {
    return 1; // Return mock timer ID
  }),
});

Object.defineProperty(global, 'clearInterval', {
  writable: true,
  value: vi.fn(),
});

// Mock fetch to prevent invalid URL errors in tests
global.fetch = vi.fn().mockImplementation((url: string, options?: RequestInit) => {
  // Mock successful response for video files
  if (url.includes('.mp4') || url.includes('/assets/')) {
    return Promise.resolve({
      ok: true,
      status: 200,
      headers: new Headers(),
      json: () => Promise.resolve({}),
      text: () => Promise.resolve(''),
    } as Response);
  }
  
  // Default mock response
  return Promise.resolve({
    ok: true,
    status: 200,
    headers: new Headers(),
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
  } as Response);
});

// Add to window object as well
Object.defineProperty(window, 'requestAnimationFrame', {
  writable: true,
  value: global.requestAnimationFrame,
});

Object.defineProperty(window, 'cancelAnimationFrame', {
  writable: true,
  value: global.cancelAnimationFrame,
});

// Mock react-type-animation
vi.mock('react-type-animation', () => ({
  TypeAnimation: vi.fn().mockImplementation(({ sequence, wrapper = 'span', ...props }) => {
    return React.createElement(wrapper, props, Array.isArray(sequence) ? sequence[0] : sequence);
  }),
}));

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', { 
  value: vi.fn(), 
  writable: true 
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock window.addEventListener and removeEventListener globally
Object.defineProperty(window, 'addEventListener', {
  writable: true,
  value: vi.fn(),
});

Object.defineProperty(window, 'removeEventListener', {
  writable: true,
  value: vi.fn(),
});

Object.defineProperty(window, 'location', {
  writable: true,
  value: {
    hostname: 'localhost',
    port: '3000',
    protocol: 'http:',
    href: 'http://localhost:3000',
    search: '',
    pathname: '/',
    hash: '',
  },
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn(),
}));

// Mock requestIdleCallback
Object.defineProperty(global, 'requestIdleCallback', {
  writable: true,
  value: vi.fn().mockImplementation((callback: IdleRequestCallback) => {
    return setTimeout(() => callback({ didTimeout: false, timeRemaining: () => 50 }), 1);
  }),
});

Object.defineProperty(window, 'requestIdleCallback', {
  writable: true,
  value: vi.fn().mockImplementation((callback: IdleRequestCallback) => {
    return setTimeout(() => callback({ didTimeout: false, timeRemaining: () => 50 }), 1);
  }),
});

// Mock HTMLMediaElement methods
Object.defineProperty(HTMLMediaElement.prototype, 'play', {
  writable: true,
  value: vi.fn().mockImplementation(() => Promise.resolve()),
});

Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
  writable: true,
  value: vi.fn(),
});

// Mock Swiper components
vi.mock('swiper/react', () => ({
  Swiper: vi.fn().mockImplementation(({ children, className, ...props }) => {
    return React.createElement(
      'div',
      {
        'data-testid': 'swiper-mock',
        className,
        ...props,
      },
      children
    );
  }),
  SwiperSlide: vi.fn().mockImplementation(({ children, className, ...props }) => {
    return React.createElement(
      'div',
      {
        'data-testid': 'swiper-slide-mock',
        className,
        ...props,
      },
      children
    );
  }),
}));

// Mock Swiper modules
vi.mock('swiper/modules', () => ({
  Autoplay: {},
  A11y: {},
  Navigation: {},
  Pagination: {},
  Thumbs: {},
  FreeMode: {},
  Scrollbar: {},
  Mousewheel: {},
  Keyboard: {},
  Zoom: {},
  EffectFade: {},
  EffectCube: {},
  EffectFlip: {},
  EffectCoverflow: {},
  EffectCards: {},
}));

// Mock Swiper CSS imports
vi.mock('swiper/css', () => ({}));
vi.mock('swiper/css/navigation', () => ({}));
vi.mock('swiper/css/pagination', () => ({}));
vi.mock('swiper/css/autoplay', () => ({}));
vi.mock('swiper/css/scrollbar', () => ({}));
vi.mock('swiper/css/thumbs', () => ({}));
vi.mock('swiper/css/free-mode', () => ({}));

// Mock react-modal
const MockModal = ({ children, isOpen }: any) => 
  isOpen ? React.createElement('div', { 'data-testid': 'modal' }, children) : null;

(MockModal as any).setAppElement = vi.fn();

vi.mock('react-modal', () => ({
  default: MockModal,
}));

// Mock FlipbookViewer
vi.mock('./src/components/FlipbookViewer', () => ({
  __esModule: true,
  default: vi.fn().mockImplementation(() => 
    React.createElement('div', { 'data-testid': 'flipbook-mock' }, 'FlipbookViewer Mock')
  ),
}));

// Mock @react-pdf/renderer
vi.mock('@react-pdf/renderer', () => ({
  Document: vi.fn().mockImplementation(({ children }: any) => 
    React.createElement('div', { 'data-testid': 'pdf-document' }, children)
  ),
  Page: vi.fn().mockImplementation(({ children }: any) => 
    React.createElement('div', { 'data-testid': 'pdf-page' }, children)
  ),
  Text: vi.fn().mockImplementation(({ children }: any) => 
    React.createElement('span', { 'data-testid': 'pdf-text' }, children)
  ),
  View: vi.fn().mockImplementation(({ children }: any) => 
    React.createElement('div', { 'data-testid': 'pdf-view' }, children)
  ),
  StyleSheet: {
    create: vi.fn().mockImplementation((styles: any) => styles),
  },
  pdf: vi.fn().mockImplementation(() => ({
    toBlob: () => Promise.resolve(new Blob()),
  })),
}));

// Mock Leaflet
vi.mock('leaflet', () => ({
  map: vi.fn().mockImplementation(() => ({
    setView: vi.fn(),
    addLayer: vi.fn(),
    removeLayer: vi.fn(),
  })),
  tileLayer: vi.fn().mockImplementation(() => ({})),
  marker: vi.fn().mockImplementation(() => ({
    addTo: vi.fn(),
    bindPopup: vi.fn(),
  })),
  icon: vi.fn().mockImplementation(() => ({})),
}));

vi.mock('react-leaflet', () => ({
  MapContainer: vi.fn().mockImplementation(({ children }: any) => 
    React.createElement('div', { 'data-testid': 'map-container' }, children)
  ),
  TileLayer: vi.fn().mockImplementation(() => 
    React.createElement('div', { 'data-testid': 'tile-layer' })
  ),
  Marker: vi.fn().mockImplementation(({ children }: any) => 
    React.createElement('div', { 'data-testid': 'marker' }, children)
  ),
  Popup: vi.fn().mockImplementation(({ children }: any) => 
    React.createElement('div', { 'data-testid': 'popup' }, children)
  ),
}));

// Mock web-vitals to prevent timeout issues - handle both static and dynamic imports
const mockWebVitals = {
  onCLS: vi.fn().mockImplementation((callback) => {
    if (callback) {
      setTimeout(() => callback({ name: 'CLS', value: 0.1, delta: 0.1, id: 'mock-cls', entries: [] }), 0);
    }
  }),
  onINP: vi.fn().mockImplementation((callback) => {
    if (callback) {
      setTimeout(() => callback({ name: 'INP', value: 50, delta: 50, id: 'mock-inp', entries: [] }), 0);
    }
  }),
  onFCP: vi.fn().mockImplementation((callback) => {
    if (callback) {
      setTimeout(() => callback({ name: 'FCP', value: 1500, delta: 1500, id: 'mock-fcp', entries: [] }), 0);
    }
  }),
  onLCP: vi.fn().mockImplementation((callback) => {
    if (callback) {
      setTimeout(() => callback({ name: 'LCP', value: 2000, delta: 2000, id: 'mock-lcp', entries: [] }), 0);
    }
  }),
  onTTFB: vi.fn().mockImplementation((callback) => {
    if (callback) {
      setTimeout(() => callback({ name: 'TTFB', value: 500, delta: 500, id: 'mock-ttfb', entries: [] }), 0);
    }
  })
};

vi.mock('web-vitals', () => mockWebVitals);

// Remove global react-router-dom mock - let individual tests handle it
// This prevents conflicts with test-utils.tsx Router setup

// Suppress console warnings and errors during tests
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

console.warn = (...args: any[]) => {
  const message = args.join(' ');
  if (
    message.includes('React Router Future Flag Warning') ||
    message.includes('validateDOMNesting') ||
    message.includes('Warning: ReactDOM.render') ||
    message.includes('Warning: componentWillReceiveProps') ||
    message.includes('act()') ||
    message.includes('No translation found for product') ||
    message.includes('React does not recognize the `') ||
    message.includes('Invalid DOM property')
  ) {
    return;
  }
  originalConsoleWarn.apply(console, args);
};

console.error = (...args: any[]) => {
  const message = args.join(' ');
  if (
    message.includes('Warning: ReactDOM.render') ||
    message.includes('Warning: componentWillReceiveProps') ||
    message.includes('act()') ||
    message.includes('Not implemented: HTMLCanvasElement.prototype.getContext') ||
    message.includes('No translation found for product') ||
    message.includes('No routes matched location')
  ) {
    return;
  }
  originalConsoleError.apply(console, args);
};