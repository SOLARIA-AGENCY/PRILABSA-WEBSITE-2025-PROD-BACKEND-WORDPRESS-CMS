import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CotizacionProvider } from './context/CotizacionContext';
import { FEATURES } from './config/features';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { ExternalRedirect } from './components/ExternalRedirect';

// Import critical pages directly for instant loading
import Blog from './pages/Blog';
import Noticias from './pages/Noticias';
import Login from './pages/Login';

// Lazy load secondary pages for better performance
// DESARROLLO: Rutas solo para desarrollo/testing
const HomePage = React.lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const DeployDashboard = React.lazy(() => import('./pages/DeployDashboard'));
const PrilabsaWebsite = React.lazy(() => import('./pages/PrilabsaWebsite'));
const Website2025 = React.lazy(() => import('./pages/Website2025'));
const DesignSystemPage = React.lazy(() => import('./pages/DesignSystemPage'));
const InventarioProductos = React.lazy(() => import('./pages/InventarioProductos'));

// PRODUCTOS: Rutas para catálogo de productos (PERMANECEN en productos.prilabsa.com)
const Productos = React.lazy(() => import('./pages/Productos'));
const CategoryPage = React.lazy(() => import('./pages/CategoryPage'));
const ProductoDetalle = React.lazy(() => import('./pages/ProductoDetalle'));
const Cotizacion = React.lazy(() => import('./pages/Cotizacion'));

// BLOG/NOTICIAS: Rutas de contenido (PERMANECEN en productos.prilabsa.com)
const ArticlePage = React.lazy(() => import('./pages/ArticlePage'));
const NoticiaPage = React.lazy(() => import('./pages/NoticiaPage'));

// LEGAL: Rutas legales (PERMANECEN en productos.prilabsa.com)
const PoliticaDePrivacidad = React.lazy(() => import('./pages/PoliticaDePrivacidad'));
const TerminosYCondiciones = React.lazy(() => import('./pages/TerminosYCondiciones'));
const AvisoLegal = React.lazy(() => import('./pages/AvisoLegal'));
const PoliticaDeCookies = React.lazy(() => import('./pages/PoliticaDeCookies'));

// Optimized loading component with faster animation
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p className="mt-2 text-sm text-gray-600">Cargando...</p>
    </div>
  </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error de carga de página:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Error al cargar la página
            </h2>
            <p className="text-gray-600 mb-4">
              Ha ocurrido un error inesperado. Por favor, recarga la página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Recargar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {

  // Detect if we're on blog subdomain
  const isBlogSubdomain = window.location.hostname === 'blog.prilabsa.com';

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <LanguageProvider>
          <AuthProvider>
            <CotizacionProvider>
              <Router>
              <ScrollToTop />
              <Routes>

          {/* ═══════════════════════════════════════════════════════════════════
              🔄 REDIRECCIONES EXTERNAS → www.prilabsa.com (Sitio Institucional)
              ═══════════════════════════════════════════════════════════════════ */}

          <Route path="/" element={<ExternalRedirect to="https://www.prilabsa.com/" />} />
          <Route path="/quienes-somos" element={<ExternalRedirect to="https://www.prilabsa.com/quienes-somos" />} />
          <Route path="/oficinas" element={<ExternalRedirect to="https://www.prilabsa.com/oficinas" />} />
          <Route path="/contactanos" element={<ExternalRedirect to="https://www.prilabsa.com/contactanos" />} />
          <Route path="/trabaja-con-nosotros" element={<ExternalRedirect to="https://www.prilabsa.com/trabaja-con-nosotros" />} />

          {/* ═══════════════════════════════════════════════════════════════════
              ✅ PRODUCTOS (PERMANECEN en productos.prilabsa.com)
              ═══════════════════════════════════════════════════════════════════ */}

          <Route path="/productos" element={
            <Suspense fallback={<PageLoader />}>
              <Productos />
            </Suspense>
          } />
          <Route path="/productos/:categorySlug" element={
            <Suspense fallback={<PageLoader />}>
              <CategoryPage />
            </Suspense>
          } />
          <Route path="/productos/:categorySlug/:slug" element={
            <Suspense fallback={<PageLoader />}>
              <ProductoDetalle />
            </Suspense>
          } />

          {/* Cotizador - Condicional basado en FEATURES.COTIZADOR */}
          {FEATURES.COTIZADOR && (
            <Route path="/cotizacion" element={
              <Suspense fallback={<PageLoader />}>
                <Cotizacion />
              </Suspense>
            } />
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              ✅ BLOG Y NOTICIAS (PERMANECEN en productos.prilabsa.com)
              ═══════════════════════════════════════════════════════════════════ */}

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={
            <Suspense fallback={<PageLoader />}>
              <ArticlePage />
            </Suspense>
          } />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/noticias/:id" element={
            <Suspense fallback={<PageLoader />}>
              <NoticiaPage />
            </Suspense>
          } />

          {/* ═══════════════════════════════════════════════════════════════════
              ⚖️ RUTAS LEGALES (PERMANECEN - GDPR requerido)
              ═══════════════════════════════════════════════════════════════════ */}

          <Route path="/politica-de-privacidad" element={
            <Suspense fallback={<PageLoader />}>
              <PoliticaDePrivacidad />
            </Suspense>
          } />
          <Route path="/terminos-y-condiciones" element={
            <Suspense fallback={<PageLoader />}>
              <TerminosYCondiciones />
            </Suspense>
          } />
          <Route path="/aviso-legal" element={
            <Suspense fallback={<PageLoader />}>
              <AvisoLegal />
            </Suspense>
          } />
          <Route path="/politica-de-cookies" element={
            <Suspense fallback={<PageLoader />}>
              <PoliticaDeCookies />
            </Suspense>
          } />

          {/* ═══════════════════════════════════════════════════════════════════
              🛠️ RUTAS DE DESARROLLO (Solo en modo desarrollo)
              ═══════════════════════════════════════════════════════════════════ */}

          {import.meta.env.MODE !== 'production' && (
            <>
              <Route path="/dashboard" element={
                <Suspense fallback={<PageLoader />}>
                  <DeployDashboard />
                </Suspense>
              } />
              <Route path="/home" element={
                <Suspense fallback={<PageLoader />}>
                  <HomePage />
                </Suspense>
              } />
              <Route path="/deploy" element={
                <Suspense fallback={<PageLoader />}>
                  <DeployDashboard />
                </Suspense>
              } />
              <Route path="/prilabsa" element={
                <Suspense fallback={<PageLoader />}>
                  <PrilabsaWebsite />
                </Suspense>
              } />
              <Route path="/website2025" element={
                <Suspense fallback={<PageLoader />}>
                  <Website2025 />
                </Suspense>
              } />
              <Route path="/design-system" element={
                <Suspense fallback={<PageLoader />}>
                  <DesignSystemPage />
                </Suspense>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/inventario-productos" element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <InventarioProductos />
                  </ProtectedRoute>
                </Suspense>
              } />
            </>
          )}

          </Routes>
          </Router>
            </CotizacionProvider>
          </AuthProvider>
        </LanguageProvider>
      </HelmetProvider>
    </ErrorBoundary>
  )
}

export default App