import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, FileDown, ShoppingCart, X } from 'lucide-react';
import { useProduct, useProducts } from '../services/wordpressApi';
import { OptimizedProduct } from '../data/products/types';
import Layout from '../components/Layout';
import NuestrasMarcas from '../components/NuestrasMarcas';
import Breadcrumbs from '../components/Breadcrumbs';
import { formatProductDisplay } from '../utils/ProductCodeMapper';
import { useLanguage } from '../contexts/LanguageContext';
import { useCotizacion } from '../hooks/useCotizacion';
import { FEATURES } from '../config/features';
import productTranslationService from '../services/ProductTranslationService';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// Import required modules
import { Navigation, Pagination, A11y } from 'swiper/modules';

const ProductoDetalle = () => {
  const { categorySlug, slug } = useParams<{ categorySlug: string; slug: string }>();
  const { t, language } = useLanguage();
  const [selectedTab, setSelectedTab] = useState('descripcion');
  // Always call the hook; select no-op when feature disabled to satisfy hooks rules
  const _cotizacion = useCotizacion();
  const agregarProducto = FEATURES.COTIZADOR ? _cotizacion.agregarProducto : (() => {});
  const [cantidad, setCantidad] = useState(1);
  const [isAddingToQuote, setIsAddingToQuote] = useState(false);
  const [notificacion, setNotificacion] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // ⭐ Obtener producto desde WordPress API por código
  const { product: producto, isLoading, error } = useProduct(slug?.toUpperCase() || '');

  // Obtener todos los productos para relacionados
  const { products: productos } = useProducts();

  // Helper: get translated field using ProductTranslationService
  const getTranslatedField = (
    productId: string,
    field: 'name' | 'description' | 'benefits' | 'presentation' | 'specifications'
  ) => {
    if (!producto) return null;
    return productTranslationService.getTranslatedField(producto, field, language);
  };

  const productosRelacionados = producto
    ? productos.filter(p => p.category === producto.category && p.id !== producto.id)
    : [];

  // ⭐ Estado de carga
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">{t('products.messages.loading') || 'Cargando producto...'}</p>
        </div>
      </Layout>
    );
  }

  // ⭐ Estado de error o producto no encontrado
  if (error || !producto) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('products.productDetail.productNotFound')}</h1>
          {error && <p className="text-red-600 mb-4">{error.message}</p>}
          <Link to="/productos" className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white" style={{ backgroundColor: '#3759C1' }}>
            <ChevronLeft className="mr-2" size={18} />
            {t('products.actions.backToProducts')}
          </Link>
        </div>
      </Layout>
    );
  }
  
  const breadcrumbPaths = [
    { name: t('breadcrumbs.home'), path: '/' },
    { name: t('breadcrumbs.products'), path: '/productos' },
    { name: t(`breadcrumbs.category.${producto.category}`), path: `/productos/${categorySlug}` },
    { name: formatProductDisplay(producto.name, producto.id, producto.codigo || producto.productCode || ''), path: `/productos/${categorySlug}/${producto.slug}` }
  ];

  const TABS = [
    { id: 'descripcion', label: t('products.productDetail.description') },
    { id: 'especificaciones', label: t('products.productDetail.specifications') },
    { id: 'beneficios', label: t('products.productDetail.benefits') },
    ...(producto.presentation && producto.presentation.length > 0 ? [{ id: 'presentacion', label: t('products.productDetail.presentation') }] : []),
  ];


  return (
    <Layout>
      {/* Hero azul del mismo tamaño que el header */}
      <div 
        className="w-full" 
        style={{ backgroundColor: '#3759C1', height: '120px' }}
      ></div>
      
      <Breadcrumbs paths={breadcrumbPaths} />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Columna de la imagen */}
            <div className="w-full">
              <div 
                className="relative group cursor-pointer"
                onClick={() => setIsImageModalOpen(true)}
              >
                <img 
                  src={producto.assets.image?.path || '/assets/images/placeholder-product.jpg'} 
                  alt={producto.name} 
                  className="w-full h-auto object-contain rounded-lg shadow-md aspect-square transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute top-4 right-4 transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <div className="bg-white bg-opacity-90 rounded-full p-2 shadow-lg border-2" style={{ borderColor: '#3759C1' }}>
                    <svg className="w-5 h-5" style={{ color: '#3759C1' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna de detalles del producto */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{producto.name}</h1>
              
              {/* Product code subtitle */}
              {(producto.codigo || producto.productCode) && (
                <p className="text-xl font-medium text-gray-600 mb-4">
                  {t('products.productDetail.productCode')}: {producto.codigo || producto.productCode}
                </p>
              )}
              
              <p className="text-lg text-gray-600 mb-6">{getTranslatedField(producto.id, 'description') || producto.description || ''}</p>
              
              {/* Selector de cantidad y botón de agregar a cotización - Condicional por feature flag */}
              {FEATURES.COTIZADOR && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Agregar a Cotización
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                        Cantidad:
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          type="button"
                          onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <span className="text-lg font-bold">−</span>
                        </button>
                        <input
                          id="quantity"
                          type="number"
                          min="1"
                          value={cantidad}
                          onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-16 text-center border-0 focus:ring-0 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setCantidad(cantidad + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <span className="text-lg font-bold">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={async () => {
                      if (!producto) return;
                      setIsAddingToQuote(true);
                      try {
                        agregarProducto(producto, cantidad);
                        setNotificacion(`${producto.name} ha sido añadido a la cotización.`);
                        setTimeout(() => {
                          setIsAddingToQuote(false);
                          setNotificacion('');
                        }, 3000);
                      } catch (error) {
                        console.error('Error adding to quote:', error);
                        setIsAddingToQuote(false);
                      }
                    }}
                    disabled={isAddingToQuote}
                    className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-green-400 transition-colors flex items-center justify-center gap-2 font-medium text-center"
                  >
                    {isAddingToQuote ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Agregando...
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={20} />
                        Agregar a Cotización
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Notificación de producto agregado */}
              {notificacion && (
                <div className="mb-6 flex flex-col items-center gap-2">
                  <div className="p-3 bg-green-100 text-green-800 rounded-lg text-center transition-opacity duration-300">
                    {notificacion}
                  </div>
                  <Link
                    to="/cotizacion"
                    className="inline-block bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors uppercase text-sm shadow-md"
                  >
                    Ver mi cotización
                  </Link>
                </div>
              )}

              {/* Botón de descarga de ficha técnica */}
              {producto.assets.pdf && producto.assets.pdf.exists && (
                <div className="mt-6">
                  <a 
                    href={producto.assets.pdf.downloadUrl} 
                    download
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-lg font-bold uppercase tracking-wider transition-colors duration-300 text-white no-underline w-full justify-center text-sm shadow-md"
                    style={{ backgroundColor: '#DC143C' }}
                  >
                    <FileDown size={20} />
                    <span className="text-center">{t('products.productDetail.downloadTechnicalSheet')}</span>
                  </a>
                </div>
              )}

              <div className="text-sm text-gray-500 mt-4">
                {t('products.productDetail.category')}: <Link to={`/productos/${producto.category}`} className="text-orange-500 hover:underline font-semibold">{t(`products.categories.${producto.category}`)}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto" aria-label="Tabs">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`whitespace-nowrap py-4 px-3 sm:px-1 border-b-2 font-medium text-base sm:text-lg ${
                    selectedTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="prose max-w-none py-6">
            {selectedTab === 'descripcion' && (
              <div>{getTranslatedField(producto.id, 'description') || producto.description || 'No hay descripción disponible.'}</div>
            )}
            {selectedTab === 'especificaciones' && (
              <table className="w-full border-collapse">
                <tbody>
                  {(() => {
                    const translatedSpecs = getTranslatedField(producto.id, 'specifications');
                    const specs = translatedSpecs || producto.specifications;
                    return specs && specs.length > 0 ? (
                      specs.map((spec: { key: string; value: string }, index: number) => (
                        <tr key={index} className="border-b"><td className="py-2 px-4 font-medium text-gray-700">{spec.key}</td><td className="py-2 px-4 text-gray-600">{spec.value}</td></tr>
                      ))
                    ) : (
                      <tr><td colSpan={2} className="py-4 px-4 text-center text-gray-500">No hay especificaciones disponibles.</td></tr>
                    );
                  })()} 
                </tbody>
              </table>
            )}
            {selectedTab === 'beneficios' && (
              <ul className="list-disc list-inside space-y-2">
                {(getTranslatedField(producto.id, 'benefits') || producto.benefits)?.length > 0 ? (
                  (getTranslatedField(producto.id, 'benefits') || producto.benefits)?.map((benefit: string, index: number) => <li key={index}>{benefit}</li>)
                ) : (
                  <li className="text-gray-500">No hay beneficios especificados.</li>
                )}
              </ul>
            )}
            {selectedTab === 'presentacion' && (
              <ul className="list-disc list-inside space-y-2">
                {(getTranslatedField(producto.id, 'presentation') || producto.presentation)?.length > 0 ? (
                  (getTranslatedField(producto.id, 'presentation') || producto.presentation)?.map((item: string, index: number) => <li key={index}>{item}</li>)
                ) : (
                  <li className="text-gray-500">No hay información de presentación disponible.</li>
                )}
              </ul>
            )}

          </div>
        </div>
      </section>

      {productosRelacionados.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 uppercase" style={{ color: '#3759C1' }}>{t('products.productDetail.relatedProducts')}</h2>
            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={20}
                slidesPerView={2}
                navigation={true}
                pagination={{ clickable: true }}
                breakpoints={{
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 24,
                  },
                  1280: {
                    slidesPerView: 6,
                    spaceBetween: 28,
                  },
                }}
                className="productos-relacionados-swiper"
              >
                {productosRelacionados.map((p: OptimizedProduct) => (
                  <SwiperSlide key={p.id}>
                    <Link to={`/productos/${p.category}/${p.slug}`} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out hover:shadow-xl group block h-full">
                      <div className="h-40 bg-gray-200 flex items-center justify-center">
                        <img src={p.assets.image?.path || '/assets/images/placeholder-product.jpg'} alt={p.name} className="max-h-full max-w-full object-contain p-3" />
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-bold uppercase mb-4 min-h-[3rem] flex items-center justify-center text-center leading-tight" style={{ color: '#3759C1' }}>{p.name}</h3>
                        <span 
                          className="inline-block w-full text-center px-3 py-2 rounded-md font-semibold uppercase tracking-wider text-xs text-white transition-colors duration-300"
                          style={{ backgroundColor: '#f6921d' }}
                        >
                          {t('products.actions.viewProduct')}
                        </span>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>
      )}

      <NuestrasMarcas />

      {/* Modal de imagen ampliada */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex items-center justify-center p-4" onClick={() => setIsImageModalOpen(false)}>
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute -top-12 right-0 bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 transition-colors shadow-lg"
            >
              <X size={24} />
            </button>
            <div className="bg-white rounded-lg shadow-2xl p-4">
              <img
                src={producto.assets.image?.path || '/assets/images/placeholder-product.jpg'}
                alt={producto.name}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductoDetalle;
