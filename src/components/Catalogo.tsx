import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Catalogo: React.FC = () => {
  const { t } = useLanguage();
  const _remoteCatalogoUrl = 'https://prilabsa.com/wp-content/uploads/2024/02/catalogo-2024-FEBERO.pdf';

  return (
    <section 
      className="relative py-20 lg:py-32 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/iniciodev/backgrounds_dark/background_dark_2.png')" }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-white/50 backdrop-blur-xl rounded-lg p-8 md:p-12 shadow-2xl max-w-4xl mx-auto">
          <div className="md:flex md:items-center">
            <div className="md:w-1/4 flex justify-center md:justify-start mb-6 md:mb-0">
              <div className="text-center">
                <img src="/assets/iniciodev/catalogo prilabsa 2025.png" alt="Catálogo Prilabsa 2025" className="w-32 h-auto object-cover rounded-lg shadow-lg mx-auto" />
                <p className="text-sm font-semibold mt-2" style={{ color: '#3759C1' }}>JULIO 2025</p>
              </div>
            </div>
            <div className="md:w-3/4 md:pl-8 text-center md:text-left">
              <h2 className="text-3xl font-bold uppercase tracking-wider" style={{ color: '#3759C1' }}>{t('catalog.title')}</h2>
              <p className="text-lg text-gray-700 mb-8">
                {t('catalog.description')}
              </p>
              <a
                href="/assets/pdfs/CATALOGO PRODUCTOS JULIO PRILABSA.pdf"
                download="CATALOGO PRODUCTOS JULIO PRILABSA.pdf"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                {t('catalog.downloadButton')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalogo;
