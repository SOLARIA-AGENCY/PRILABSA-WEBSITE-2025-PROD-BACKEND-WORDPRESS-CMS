import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/PRILABSA_INICIO_VIDEO_BG_v3.mp4" type="video/mp4" />
          {/* Fallback image */}
          <img 
            src="/images/backgrounds/hero-fallback.jpg" 
            alt="PRILABSA Hero Background" 
            className="w-full h-full object-cover"
          />
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Somos proveedores de<br />
            las mejores soluciones<br />
            integrales en<br />
            <span className="text-blue-400 font-extrabold">{t('products.categories.alimentos')}</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl md:text-3xl mb-8 font-light">
            Sirviendo a las Américas<br />
            por más de 32 años.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <a 
              href="#productos"
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              VER
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Decorative triangles element */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-white opacity-60"></div>
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-white opacity-80"></div>
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-white"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};