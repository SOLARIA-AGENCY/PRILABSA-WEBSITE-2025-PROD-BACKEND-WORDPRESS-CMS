import React from 'react';
import { render, screen, within, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { LanguageProvider } from '../contexts/LanguageContext'
import { CotizacionProvider } from '../context/CotizacionContext'
import App from '../App';

// Mock del FlipbookViewer para evitar errores de 'DOMMatrix is not defined' en el entorno de test
vi.mock('../components/FlipbookViewer', () => ({
  __esModule: true,
  default: () => <div>FlipbookViewer Mock</div>,
}));

// Mock TypeAnimation to avoid requestAnimationFrame issues
vi.mock('react-type-animation', () => ({
  TypeAnimation: ({ sequence }: any) => (
    <span data-testid="type-animation">
      {Array.isArray(sequence) ? sequence[0] : 'ALIMENTOS'}
    </span>
  ),
}));

// Mock react-modal completely
vi.mock('react-modal', () => {
  const MockModal = ({ children, isOpen }: any) => 
    isOpen ? <div data-testid="modal">{children}</div> : null;
  
  MockModal.setAppElement = vi.fn();
  
  return {
    default: MockModal,
    setAppElement: vi.fn(),
  };
});

// Mock Swiper to avoid loop warnings in tests
vi.mock('swiper/react', () => ({
  Swiper: ({ children, className, ...props }: any) => {
    // Filter out Swiper-specific props to avoid React warnings
    const { 
      modules, spaceBetween, slidesPerView, loop, autoplay, breakpoints, 
      ...validDOMProps 
    } = props;
    
    return (
      <div data-testid="swiper-mock" className={className} {...validDOMProps}>
        {children}
      </div>
    );
  },
  SwiperSlide: ({ children, className, ...props }: any) => (
    <div data-testid="swiper-slide-mock" className={className}>
      {children}
    </div>
  ),
}));

vi.mock('swiper/modules', () => ({
  Autoplay: {},
  A11y: {},
}));

vi.mock('swiper/css', () => ({}));
vi.mock('swiper/css/navigation', () => ({}));
vi.mock('swiper/css/pagination', () => ({}));
vi.mock('swiper/css/autoplay', () => ({}));

// Custom wrapper for App component (simplified to avoid provider conflicts)
const AppTestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <CotizacionProvider>
        {children}
      </CotizacionProvider>
    </QueryClientProvider>
  );
};

/**
 * APP INTEGRATION TESTS
 * Valida que la aplicación se renderice correctamente con lazy loading.
 */

describe('App Integration Tests', () => {
  // Mock window.scrollTo para el entorno de JSDOM
  Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });
  
  // Mock window.location para resolver el problema de React Router
  Object.defineProperty(window, 'location', {
    value: {
      href: 'http://localhost:3000/',
      origin: 'http://localhost:3000',
      pathname: '/',
      search: '',
      hash: '',
      assign: vi.fn(),
      replace: vi.fn(),
      reload: vi.fn(),
    },
    writable: true,
  });
  
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  it('renders the main App component without crashing', () => {
    // Simple smoke test - just verify the App renders without throwing
    const { container } = render(
      <AppTestWrapper>
        <App />
      </AppTestWrapper>
    );
    
    // Basic assertion that something was rendered
    expect(container.firstChild).toBeTruthy();
  });

  it('App component structure is valid', () => {
    const { container } = render(
      <AppTestWrapper>
        <App />
      </AppTestWrapper>
    );
    
    // Verify the app has some basic structure
    expect(container.querySelector('div')).toBeTruthy();
  });
})