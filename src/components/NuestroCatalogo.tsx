import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// import required modules
import { Autoplay, A11y } from 'swiper/modules';

// Import local data and components
import { categoriasProductos } from '../data/categoriasProductos';
import CategoryCard from './CategoryCard';
import { useLanguage } from '../contexts/LanguageContext';

const NuestroCatalogo = () => {
  const { t } = useLanguage();
  // Calculate if we have enough slides for loop mode
  const hasEnoughSlides = categoriasProductos.length >= 4;
  
  // Swiper configuration optimized for carousel
  const swiperConfig = {
    modules: [Autoplay, A11y],
    spaceBetween: 8,
    slidesPerView: 1.5,
    loop: hasEnoughSlides,
    autoplay: hasEnoughSlides ? {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    } : false,
    breakpoints: {
      320: {
        slidesPerView: 1.2,
        spaceBetween: 4,
      },
      480: {
        slidesPerView: 1.5,
        spaceBetween: 6,
      },
      640: {
        slidesPerView: 2.5,
        spaceBetween: 12,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 5,
        spaceBetween: 24,
      },
    },
    className: "overflow-hidden py-4"
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold uppercase" style={{ color: '#3759C1' }}>
            {t('home.catalog.title')}
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            {t('home.catalog.subtitle')}
          </p>
        </div>
      </div>

      <div className="mx-auto px-2 overflow-hidden">
        {/* Carrusel de categorías */}
        <div className="relative">
          <Swiper {...swiperConfig}>
            {categoriasProductos.map((categoria) => (
              <SwiperSlide key={categoria.id} className="flex justify-center">
                <CategoryCard 
                  imagen={categoria.imagen}
                  titulo={t(`home.catalog.categories.${categoria.id}`)}
                  enlace={categoria.enlace}
                  size="small"
                  className="shadow-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          

        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mt-8">
          <a 
            href="/productos"
            className="inline-block px-10 py-4 rounded-lg text-lg font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            style={{ backgroundColor: '#f6921d', color: 'white' }}
          >
            {t('home.catalog.viewAll')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default NuestroCatalogo;
