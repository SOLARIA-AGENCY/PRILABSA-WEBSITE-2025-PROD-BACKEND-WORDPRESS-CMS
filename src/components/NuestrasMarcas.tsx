import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { useLanguage } from '../contexts/LanguageContext';

const logos = [
  'aero_tube.png',
  'api.png',
  'aqualabo_logo.png',
  'argeitit.png',
  'chemetrics_logo.png',
  'dms.png',
  'higashimuro.png',
  'intec_logo.png',
  'intermas.png',
  'keeton.png',
  'lamotte.png',
  'mackay.png',
  'oaklon.png',
  'ohaus.png',
  'oxyguard.png',
  'pacer.png',
  'thosco.png',
  'vanguard.png',
  'vee_gee.png',
  'wozvil_logo.png',
  'zeigler.png'
];

const NuestrasMarcas = () => {
  const { t } = useLanguage();
  
  // Calculate optimal configuration based on logos count
  const hasEnoughSlides = logos.length >= 8;
  const slidesPerView = Math.min(6, logos.length);
  
  // Swiper configuration optimized to prevent warnings
  const swiperConfig = {
    modules: [Autoplay],
    spaceBetween: 15,
    slidesPerView: 2,
    loop: hasEnoughSlides,
    autoplay: hasEnoughSlides ? {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    } : false,
    breakpoints: {
      640: { slidesPerView: 3, spaceBetween: 20 },
      768: { slidesPerView: 4, spaceBetween: 25 },
      1024: { slidesPerView: slidesPerView, spaceBetween: 30 },
    },
    className: "w-full"
  };

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold uppercase" style={{ color: '#3759C1' }}>
            {t('home.brands.title')}
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            {t('home.brands.subtitle')}
          </p>
        </div>
      </div>
      <div className="w-full">
        <Swiper {...swiperConfig}>
          {logos.map((logo, index) => {
            // Keeton logo should remain black (grayscale)
            const isKeetonLogo = logo === 'keeton.png';
            const logoClasses = isKeetonLogo 
              ? "max-h-80 w-auto object-contain transition-all duration-300"
              : "max-h-80 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300";
            
            return (
              <SwiperSlide key={`logo-${index}-${logo}`} className="flex items-center justify-center">
                <img 
                  src={`/assets/iniciodev/brands/${logo}`}
                  alt={`Logo de ${logo.split('.')[0]}`}
                  className={logoClasses}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    console.warn(`Logo no encontrado: ${logo}`);
                  }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default NuestrasMarcas;
