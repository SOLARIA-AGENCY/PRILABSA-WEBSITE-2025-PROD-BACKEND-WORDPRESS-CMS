import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCotizacion } from '../hooks/useCotizacion';
import { ChevronLeft, FileDown } from 'lucide-react';
import { getAllProducts } from '../data/products';
import { OptimizedProduct } from '../data/products/types';
import Layout from '../components/Layout';
import NuestrasMarcas from '../components/NuestrasMarcas';
import Breadcrumbs from '../components/Breadcrumbs';
import { formatProductDisplay } from '../utils/ProductCodeMapper';
import { useLanguage } from '../contexts/LanguageContext';
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
  const { agregarProducto } = useCotizacion();
  const { t } = useLanguage();
  const [cantidad, setCantidad] = useState(1);
  const [notificacion, setNotificacion] = useState('');
  const [selectedTab, setSelectedTab] = useState('descripcion');

  const productos = getAllProducts();
  const producto = productos.find(p => p.slug === slug);

  const productosRelacionados = producto
    ? productos.filter(p => p.category === producto.category && p.id !== producto.id)
    : [];

  if (!producto) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('products.productDetail.productNotFound')}</h1>
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
        { name: producto.category, path: `/productos/${categorySlug}` },
    { name: formatProductDisplay(producto.name, producto.id, producto.codigo), path: `/productos/${categorySlug}/${producto.slug}` }
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
              <img src={producto.assets.image?.path || '/assets/images/placeholder-product.jpg'} alt={producto.name} className="w-full h-auto object-contain rounded-lg shadow-md aspect-square" />
            </div>

            {/* Columna de detalles del producto */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{producto.name}</h1>
              
              {/* Product code subtitle */}
              {producto.codigo && (
                <p className="text-xl font-medium text-gray-600 mb-4">
                  {t('products.productDetail.productCode')}: {producto.codigo}
                </p>
              )}
              
              <p className="text-lg text-gray-600 mb-6">{producto.description}</p>
              
              {/* COTIZACIÓN DESACTIVADA TEMPORALMENTE - Ver COTIZACION_ELEMENTS_BACKUP.md para reactivar */}
              <div className="hidden bg-gray-50 p-6 rounded-lg mb-6 cotizacion-disabled">
                <div className="flex items-center justify-between">
                  <span className="text-gray-800 font-medium">{t('products.quotation.quantity')}</span>
                  <input 
                    type="number" 
                    value={cantidad} 
                    onChange={(e) => setCantidad(parseInt(e.target.value))}
                    min="1"
                    className="w-24 px-3 py-2 border border-gray-300 rounded-md text-center"
                  />
                </div>
                <button className="w-full mt-4 px-6 py-3 text-white rounded-md flex items-center justify-center hover:opacity-90 transition duration-300" style={{ backgroundColor: '#f6921d' }}>
                  <span className="font-medium">{t('products.actions.addToQuote')}</span>
                </button>
                {notificacion && (
                  <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
                    {notificacion}
                  </div>
                )}
              </div>

              {/* PDF Download Button */}
              {producto.assets.pdf && (
                <div className="mb-8">
                  <a
                    href={producto.assets.pdf.downloadUrl}
                    download
                    className="inline-flex items-center px-6 py-3 text-white rounded-md hover:opacity-90 transition duration-300"
                    style={{ backgroundColor: '#3759C1' }}
                  >
                    <FileDown className="mr-2" size={20} />
                    {t('products.productDetail.downloadTechnicalSheet')}
                  </a>
                </div>
              )}

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex space-x-8">
                  {TABS.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        selectedTab === tab.id
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="prose prose-gray max-w-none">
                {selectedTab === 'descripcion' && (
                  <div>
                    <p className="text-gray-600">{producto.description}</p>
                  </div>
                )}
                {selectedTab === 'especificaciones' && (
                  <div>
                    {producto.specifications && producto.specifications.length > 0 ? (
                      <ul className="space-y-2">
                        {producto.specifications.map((spec, index) => (
                          <li key={index} className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-600">{spec.key}</span>
                            <span className="text-gray-900 font-medium">{spec.value}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 italic">{t('products.common.loading')}</p>
                    )}
                  </div>
                )}
                {selectedTab === 'beneficios' && (
                  <div>
                    {producto.benefits && producto.benefits.length > 0 ? (
                      <ul className="list-disc list-inside space-y-2">
                        {producto.benefits.map((benefit, index) => (
                          <li key={index} className="text-gray-600">{benefit}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 italic">{t('products.common.loading')}</p>
                    )}
                  </div>
                )}
                {selectedTab === 'presentacion' && producto.presentation && (
                  <div>
                    <ul className="list-disc list-inside space-y-2">
                      {producto.presentation.map((item, index) => (
                        <li key={index} className="text-gray-600">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {productosRelacionados.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('products.productDetail.relatedProducts')}</h2>
              <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={24}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                }}
                className="related-products-swiper"
              >
                {productosRelacionados.slice(0, 8).map(prod => (
                  <SwiperSlide key={prod.id}>
                    <Link 
                      to={`/productos/${prod.category}/${prod.slug}`}
                      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={prod.assets.image?.path || '/assets/images/placeholder-product.jpg'} 
                          alt={prod.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{prod.name}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{prod.description}</p>
                        <span className="inline-block mt-3 text-blue-600 font-medium text-sm">
                          {t('products.productDetail.viewMore')} →
                        </span>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </section>

      <NuestrasMarcas />
    </Layout>
  );
};

export default ProductoDetalle;