import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const brands = [
  { name: "Aero Tube", logo: "/images/logos/aero_tube.png" },
  { name: "API", logo: "/images/logos/api.png" },
  { name: "Argeitit", logo: "/images/logos/argeitit.png" },
  { name: "BASF", logo: "/images/logos/basf.png" },
  { name: "DMS", logo: "/images/logos/dms.png" },
  { name: "Gast", logo: "/images/logos/gast.png" },
  { name: "Higashimuru", logo: "/images/logos/higashimuru.png" },
  { name: "Horiba", logo: "/images/logos/horiba.png" },
  { name: "Intermas", logo: "/images/logos/intermas.png" },
  { name: "Keeton", logo: "/images/logos/keeton.png" },
  { name: "Lamotte", logo: "/images/logos/lamotte.png" },
  { name: "Mackay", logo: "/images/logos/mackay.png" },
  { name: "Ohaus", logo: "/images/logos/ohaus.png" },
  { name: "Oxyguard", logo: "/images/logos/oxyguard.png" },
  { name: "Pacer", logo: "/images/logos/pacer.png" },
  { name: "Thosco", logo: "/images/logos/thosco.png" },
  { name: "Vanguard", logo: "/images/logos/vanguard.png" },
  { name: "Vee Gee", logo: "/images/logos/vee_gee.png" },
  { name: "Zeigler", logo: "/images/logos/zeigler.png" },
  { name: "Intec", logo: "/images/logos/intec.png" },
  { name: "Oakton", logo: "/images/logos/oakton.png" },
  { name: "Wozvil", logo: "/images/logos/wozvil.png" },
  { name: "Aqualabo", logo: "/images/logos/aqualabo.png" },
  { name: "Chemetrics", logo: "/images/logos/chemetrics.png" },
  { name: "Línea de Congelados", logo: "/images/logos/linea_congelados.png" }
];

export const BrandsSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            NUESTRAS MARCAS
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trabajamos con las marcas más reconocidas y confiables de la industria acuícola
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
          {brands.map((brand, index) => (
            <div 
              key={index}
              className="group flex items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <img 
                src={brand.logo}
                alt={brand.name}
                className="max-h-16 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>

        {/* Additional Brand - PRILABSA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center justify-center p-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl">
            <img 
              src="/images/logos/prilabsa-logo.png"
              alt="PRILABSA"
              className="max-h-20 w-auto object-contain"
            />
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('brands.qualityGuaranteed.title')}</h3>
            <p className="text-gray-600">{t('brands.qualityGuaranteed.description')}</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('brands.fastDelivery.title')}</h3>
            <p className="text-gray-600">{t('brands.fastDelivery.description')}</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('brands.technicalSupport.title')}</h3>
            <p className="text-gray-600">{t('brands.technicalSupport.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};