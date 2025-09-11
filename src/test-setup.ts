import { expect, afterEach, vi } from 'vitest';

// Mock de datos de productos para todos los tests
vi.mock('@/data/productos', async (importOriginal) => {
  const originalModule = await importOriginal();
  const mockData = await import('./tests/mocks/products');
  return {
    ...(originalModule as any),
    productos: mockData.mockProducts,
    getProductos: () => mockData.mockProducts,
    getProductosByCategory: (category: string) => 
      mockData.mockProducts.filter((p: any) => p.category === category),
  };
});

import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with Testing Library matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllTimers();
});

// Create a root element for react-modal
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

// Mock global objects
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
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

// Mock window.scrollTo to prevent JSDOM errors
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});

// Mock window.scroll
Object.defineProperty(window, 'scroll', {
  writable: true,
  value: vi.fn(),
});

// Mock URL constructor properly for tests
Object.defineProperty(global, 'URL', {
  writable: true,
  value: function URL(url: string, base?: string) {
    if (base) {
      const baseUrl = new globalThis.URL(base);
      this.href = new globalThis.URL(url, baseUrl).href;
    } else {
      this.href = url;
    }
    const parsed = new globalThis.URL(this.href);
    this.origin = parsed.origin;
    this.protocol = parsed.protocol;
    this.hostname = parsed.hostname;
    this.port = parsed.port;
    this.pathname = parsed.pathname;
    this.search = parsed.search;
    this.hash = parsed.hash;
    this.host = parsed.host;
  },
});

// Add static methods to URL constructor
Object.assign(global.URL, {
  createObjectURL: vi.fn(() => 'mocked-url'),
  revokeObjectURL: vi.fn(),
});

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })),
});

Object.defineProperty(global, 'ResizeObserver', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })),
});

// Mock requestAnimationFrame and cancelAnimationFrame for both global and window
const mockRAF = (callback: FrameRequestCallback) => {
  const id = setTimeout(callback, 16);
  return id as unknown as number;
};

const mockCAF = (id: number) => {
  clearTimeout(id);
};

Object.defineProperty(global, 'requestAnimationFrame', {
  writable: true,
  value: mockRAF,
});

Object.defineProperty(global, 'cancelAnimationFrame', {
  writable: true,
  value: mockCAF,
});

Object.defineProperty(window, 'requestAnimationFrame', {
  writable: true,
  value: mockRAF,
});

Object.defineProperty(window, 'cancelAnimationFrame', {
  writable: true,
  value: mockCAF,
});

Object.defineProperty(global, 'requestIdleCallback', {
  writable: true,
  value: (callback: IdleRequestCallback) => setTimeout(callback, 0),
});

Object.defineProperty(global, 'cancelIdleCallback', {
  writable: true,
  value: (id: number) => clearTimeout(id),
});

// Mock performance
Object.defineProperty(global, 'performance', {
  writable: true,
  value: {
    now: () => Date.now(),
    mark: vi.fn(),
    measure: vi.fn(),
    getEntriesByName: vi.fn(() => []),
    getEntriesByType: vi.fn(() => []),
  },
});


// Mock fetch
Object.defineProperty(global, 'fetch', {
  writable: true,
  value: vi.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
  })),
});

// Mock localStorage and sessionStorage
const createStorageMock = () => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: vi.fn((index: number) => Object.keys(store)[index] || null),
  };
};

Object.defineProperty(global, 'localStorage', {
  writable: true,
  value: createStorageMock(),
});

Object.defineProperty(global, 'sessionStorage', {
  writable: true,
  value: createStorageMock(),
});

// Mock HTMLElement methods that might be used by components
if (typeof HTMLElement !== 'undefined') {
  HTMLElement.prototype.scrollIntoView = vi.fn();
  HTMLElement.prototype.focus = vi.fn();
  HTMLElement.prototype.blur = vi.fn();
}

// Mock getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
  value: vi.fn(() => ({
    getPropertyValue: vi.fn(() => ''),
    display: 'block',
    visibility: 'visible',
    opacity: '1',
  })),
  writable: true,
});

// Mock console to reduce noise in tests
const originalConsole = console;
Object.defineProperty(global, 'console', {
  writable: true,
  value: {
    ...console,
    warn: vi.fn(),
    error: vi.fn(),
    log: vi.fn(),
    info: vi.fn(),
  },
});

// Global mock for react-type-animation to prevent requestAnimationFrame issues
vi.mock('react-type-animation', async () => {
  const React = await import('react');
  return {
    TypeAnimation: ({ sequence, children, ...props }: any) => {
      // Use React.createElement to avoid JSX issues in test setup
      return React.createElement('div', 
        { 'data-testid': 'type-animation', ...props }, 
        typeof sequence === 'string' ? sequence : children || 'Mocked TypeAnimation'
      );
    }
  };
});

// Mock React Router DOM hooks for tests
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({
      pathname: '/',
      search: '',
      hash: '',
      state: null,
      key: 'test'
    }),
    useParams: () => ({}),
  };
});

// Mock swiper modules to prevent component loading issues
vi.mock('swiper/react', async () => {
  const React = await import('react');
  return {
    Swiper: ({ children, ...props }: any) => {
      return React.createElement('div', { 'data-testid': 'swiper', ...props }, children);
    },
    SwiperSlide: ({ children, ...props }: any) => {
      return React.createElement('div', { 'data-testid': 'swiper-slide', ...props }, children);
    },
  };
});

vi.mock('swiper/modules', () => ({
  Navigation: vi.fn(),
  Pagination: vi.fn(),
  Autoplay: vi.fn(),
  EffectFade: vi.fn(),
  A11y: vi.fn(),
}));

vi.mock('swiper/css', () => ({}));
vi.mock('swiper/css/navigation', () => ({}));
vi.mock('swiper/css/pagination', () => ({}));
vi.mock('swiper/css/autoplay', () => ({}));

// Mock LanguageContext to prevent context errors
vi.mock('@/contexts/LanguageContext', () => ({
  useLanguage: () => ({
    language: 'es',
    setLanguage: vi.fn(),
    t: (key: string) => {
      const translations: Record<string, string> = {
        'products.search.noResults': 'No se encontraron productos',
        'products.search.noResultsDescription': 'No hay productos que coincidan con la categoría o búsqueda actual.',
        'products.actions.viewProduct': 'Ver Producto',
        'footer.legal.privacy': 'Política de Privacidad',
        'footer.legal.terms': 'Términos y Condiciones',
        'footer.legal.legalNotice': 'Aviso Legal',
        'footer.legal.cookiePolicy': 'Política de Cookies',
        'footer.contact.title': 'Contacto',
        'footer.contact.email': 'Email',
        'footer.location.title': 'Ubicación',
        'footer.location.address': 'Dirección',
        'footer.social.title': 'Síguenos',
        'footer.copyright.text': '© 2024 Prilabsa. Todos los derechos reservados.',
        'home.hero.title': 'Somos proveedores de las mejores soluciones integrales en acuicultura',
        'home.weAre.title': 'Quiénes Somos',
        'home.weAre.watchVideo': 'Ver Video',
        'home.hero.cta.catalog': 'Learn More',
        'home.weAre.sections.excellence.title': 'Excelencia',
        'home.weAre.sections.excellence.description': 'Descripción de excelencia',
        'home.weAre.sections.coverage.title': 'Cobertura',
        'home.weAre.sections.coverage.description': 'Descripción de cobertura',
        'home.weAre.sections.presence.title': 'Presencia',
        'home.weAre.sections.presence.description': 'Descripción de presencia',
        'home.weAre.sections.leadership.title': 'Liderazgo',
        'home.weAre.sections.leadership.description': 'Descripción de liderazgo',
        // Headers and navigation
        'header.navigation.home': 'INICIO',
        'header.navigation.about': 'QUIENES SOMOS',
        'header.navigation.offices': 'OFICINAS',
        'header.navigation.products': 'PRODUCTOS',
        'header.navigation.contact': 'CONTÁCTANOS',
        'header.navigation.blog': 'Blog',
        'header.navigation.news': 'Noticias',
        // Products and categories
        'products.categories.alimentos': 'Alimentos',
        'products.categories.aditivos': 'Aditivos',
        'products.categories.equipos': 'Equipos',
        'products.categories.quimicos': 'Químicos',
        'products.productDetail.downloadTechnicalSheet': 'Descargar Ficha Técnica (PDF)',
        'products.productDetail.specifications': 'Especificaciones',
        'products.productDetail.benefits': 'Beneficios',
        'products.productDetail.presentation': 'Presentación',
        'products.productDetail.description': 'Descripción',
        'products.productDetail.relatedProducts': 'Productos Relacionados',
        'products.productDetail.category': 'Categoría',
        'products.title': 'Productos',
        'products.filterAll': 'Todos',
        'products.notFound': 'Producto no encontrado',
        'products.notFoundDescription': 'El producto que buscas no está disponible.',
        'products.backToProducts': 'Volver a Productos'
      };
      return translations[key] || key;
    },
  }),
  LanguageProvider: ({ children }: any) => {
    // Use sync createElement instead of async import
    return { type: 'div', props: { 'data-testid': 'language-provider', children } };
  },
}));

// Mock product translations
vi.mock('@/data/products/product-translations', () => ({
  getProductTranslation: (id: string, lang: string, field: string) => {
    if (field === 'description') return 'Translated description';
    if (field === 'name') return 'Translated name';
    return null;
  }
}));

// Mock product translation hook
vi.mock('@/i18n/hooks/useProductTranslation', () => ({
  useProductTranslation: () => ({
    getProductText: (key: string, fallback?: string) => fallback || key
  })
}));

// Mock ProductModal component
vi.mock('@/components/Products/ProductModal', async () => {
  const React = await import('react');
  return {
    default: ({ isOpen, onClose, product }: any) => {
      return isOpen ? React.createElement('div', 
        { role: 'dialog', 'aria-labelledby': 'modal-title', 'data-testid': 'product-modal' },
        React.createElement('h2', { id: 'modal-title' }, product?.name || 'Product Modal'),
        React.createElement('button', { onClick: onClose }, 'Close')
      ) : null;
    }
  };
});