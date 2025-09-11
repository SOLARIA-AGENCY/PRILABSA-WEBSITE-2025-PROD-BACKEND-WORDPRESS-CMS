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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Producto no encontrado</h1>
          <Link to="/productos" className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white" style={{ backgroundColor: '#3759C1' }}>
            <ChevronLeft className="mr-2" size={18} />
            Volver a Productos
          </Link>
        </div>
      </Layout>
    );
  }
  
  const breadcrumbPaths = [
    { name: 'Inicio', path: '/' },
    { name: 'Productos', path: '/productos' },
    { name: producto.category.charAt(0).toUpperCase() + producto.category.slice(1), path: `/productos/${categorySlug}` },
    { name: formatProductDisplay(producto.name, producto.id, producto.codigo), path: `/productos/${categorySlug}/${producto.slug}` }
  ];

  const TABS = [
    { id: 'descripcion', label: 'Descripción' },
    { id: 'especificaciones', label: 'Especificaciones' },
    { id: 'beneficios', label: 'Beneficios' },
    ...(producto.presentation && producto.presentation.length > 0 ? [{ id: 'presentacion', label: 'Presentación' }] : []),
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
                  CÓDIGO: {producto.codigo}
                </p>
              )}
              
              <p className="text-lg text-gray-600 mb-6">{producto.description}</p>
              
              {/* COTIZACIÓN DESACTIVADA TEMPORALMENTE - Ver COTIZACION_ELEMENTS_BACKUP.md para reactivar */}
              <div className="hidden bg-gray-50 p-6 rounded-lg mb-6 cotizacion-disabled">
                <div className="flex items-center justify-between">
                  <span className="text-gray-800 font-medium">Cantidad</span>
                  <input 
                    type="number" 
                    value={cantidad} 
                    onChange={(e) => setCantidad(parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 1)} 
                    className="w-24 p-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    min="1"
                  />
                </div>
                <button 
                  type="button"
                  onClick={() => {
                    if (producto) {
                      agregarProducto(producto, cantidad);
                      setNotificacion(`${producto.name} ha sido añadido a la cotización.`);
                      setTimeout(() => setNotificacion(''), 3000);
                    }
                  }}
                  className="mt-4 w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors uppercase text-sm shadow-md"
                >
                  Añadir a Cotización
                </button>
              </div>

              {notificacion && (
                <div className="mt-4 flex flex-col items-center gap-2">
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
              {producto.assets.pdf && (
                <div className="mt-6">
                  <a 
                    href={producto.assets.pdf.downloadUrl} 
                    download
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-lg font-bold uppercase tracking-wider transition-colors duration-300 text-white no-underline w-full justify-center text-sm shadow-md"
                    style={{ backgroundColor: '#DC143C' }}
                  >
                    <FileDown size={20} />
                    <span className="text-center">Descargar Ficha Técnica (PDF)</span>
                  </a>
                </div>
              )}

              <div className="text-sm text-gray-500 mt-4">
                Categoría: <Link to={`/productos/${producto.category}`} className="text-orange-500 hover:underline font-semibold">{producto.category.charAt(0).toUpperCase() + producto.category.slice(1)}</Link>
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
              <div>{producto.description}</div>
            )}
            {selectedTab === 'especificaciones' && (
              <table className="w-full border-collapse">
                <tbody>
                  {producto.specifications.map((spec, index) => (
                    <tr key={index} className="border-b"><td className="py-2 px-4 font-medium text-gray-700">{spec.key}</td><td className="py-2 px-4 text-gray-600">{spec.value}</td></tr>
                  ))}
                </tbody>
              </table>
            )}
            {selectedTab === 'beneficios' && (
              <ul className="list-disc list-inside space-y-2">
                {producto.benefits?.map((benefit, index) => <li key={index}>{benefit}</li>)}
              </ul>
            )}
            {selectedTab === 'presentacion' && (
              <ul className="list-disc list-inside space-y-2">
                {producto.presentation?.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            )}

          </div>
        </div>
      </section>

      {productosRelacionados.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 uppercase" style={{ color: '#3759C1' }}>Productos Relacionados</h2>
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
                {productosRelacionados.map((p) => (
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
                          Ver Producto
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
    </Layout>
  );
};

export default ProductoDetalle;
