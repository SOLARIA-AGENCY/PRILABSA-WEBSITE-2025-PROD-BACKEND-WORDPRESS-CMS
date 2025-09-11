import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

const Newsletter = () => {
  const { t } = useLanguage();
  
  return (
    <section className="bg-blue-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold uppercase mb-2" style={{ color: '#3759C1' }}>
          {t('newsletter.blogTitle')}
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          {t('newsletter.blogDescription')}
        </p>
        <form className="max-w-lg mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input 
              type="email" 
              placeholder={t('newsletter.placeholder')} 
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-orange-500 transition-colors duration-300" 
              required 
            />
            <button 
              type="submit" 
              className="w-full sm:w-auto px-8 py-3 rounded-lg text-white font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              style={{ backgroundColor: '#f6921d' }}
            >
              {t('newsletter.button')}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
