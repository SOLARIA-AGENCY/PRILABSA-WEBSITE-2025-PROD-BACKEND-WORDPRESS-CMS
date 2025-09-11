import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const NuestrasAgencias = () => {
  const { t } = useLanguage();
  return (
    <section 
      className="relative bg-cover bg-top py-20 text-white"
      style={{ backgroundImage: "url('/assets/iniciodev/agencia-honduras-optimized.jpg')" }}
    >

      <div className="relative container mx-auto px-4 flex justify-end items-center">
        <div className="bg-white/30 backdrop-blur-xl rounded-xl p-5 md:p-6 text-center shadow-lg border border-white/20 max-w-md w-full md:max-w-lg">
        <h2 className="text-3xl font-bold uppercase mb-3" style={{ color: '#3759C1' }}>
          {t('home.agencies.title')}
        </h2>
        <p className="text-base md:text-lg max-w-3xl mx-auto mb-6" style={{ color: '#002060' }}>
          {t('home.agencies.description')}
        </p>
        <a 
          href="/nuestras-agencias" // Placeholder link
          className="inline-block px-8 py-3 rounded-lg text-base font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
          style={{ backgroundColor: '#f6921d', color: 'white' }}
        >
          {t('home.agencies.cta')}
        </a>
        </div>
      </div>
    </section>
  );
};

export default NuestrasAgencias;
