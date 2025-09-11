import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export const AgenciesSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="oficinas" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            {t('agencies.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('agencies.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map/Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 text-center">{t('agencies.continentalPresence')}</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-blue-100">Ecuador</h4>
                    <p className="text-sm">{t('agencies.locations.ecuador')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-100">USA</h4>
                    <p className="text-sm">{t('agencies.locations.usa')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-100">México</h4>
                    <p className="text-sm">{t('agencies.locations.mexico')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-100">Brasil</h4>
                    <p className="text-sm">{t('agencies.locations.brazil')}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-blue-100">Honduras</h4>
                    <p className="text-sm">{t('agencies.locations.honduras')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-100">Panamá</h4>
                    <p className="text-sm">{t('agencies.locations.panama')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-100">Nicaragua</h4>
                    <p className="text-sm">{t('agencies.locations.nicaragua')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-100">Venezuela</h4>
                    <p className="text-sm">{t('agencies.locations.venezuela')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-100">Perú</h4>
                    <p className="text-sm">{t('agencies.locations.peru')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-gray-600">{t('agencies.countries')}</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-blue-600 mb-2">25+</div>
                <div className="text-gray-600">{t('agencies.offices')}</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cobertura Estratégica</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Oficinas comerciales modernas
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Bodegas climatizadas
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Distribución continental
                </li>
              </ul>
            </div>

            <div className="text-center">
              <a 
                href="#contactanos"
                className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
              >
                CONOCE MÁS
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};