import Layout from "../components/Layout";
import StaticHero from "../components/StaticHero";
import Breadcrumbs from "../components/Breadcrumbs";
import { useLanguage } from "../contexts/LanguageContext";

const PoliticaDeCookies = () => {
  const { t } = useLanguage();
  
  const breadcrumbPaths = [
    { name: t('header.navigation.home'), path: '/' },
    { name: t('legal.cookiePolicy.breadcrumb'), path: '/politica-de-cookies' },
  ];

  return (
    <Layout>
      <StaticHero 
        title={t('legal.cookiePolicy.title')}
        subtitle={t('legal.cookiePolicy.subtitle')}
        backgroundImage="/assets/iniciodev/prilabsa-hero-legal.png"
      />
      <Breadcrumbs paths={breadcrumbPaths} />
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="max-w-5xl mx-auto">
          
          {/* Sección 1: ¿Qué son las cookies? */}
          <section className="mb-12 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl p-8 lg:p-10 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">{t('legal.cookiePolicy.sections.section1.number')}. {t('legal.cookiePolicy.sections.section1.heading')}</h2>
                <div className="text-gray-700 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: t('legal.cookiePolicy.sections.section1.content') }}>
                </div>
              </div>
            </div>
          </section>

          {/* Sección 2: ¿Qué cookies utilizamos? */}
          <section className="mb-12 bg-white rounded-xl p-8 lg:p-10 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">{t('legal.cookiePolicy.sections.section2.number')}. {t('legal.cookiePolicy.sections.section2.heading')}</h2>
                <div className="text-gray-700 leading-relaxed text-lg mb-6" dangerouslySetInnerHTML={{ __html: t('legal.cookiePolicy.sections.section2.content') }}>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                    <thead>
                      <tr className="bg-gradient-to-r from-orange-500 to-blue-600 text-white">
                        <th className="px-6 py-4 text-left font-semibold">Nombre</th>
                        <th className="px-6 py-4 text-left font-semibold">Tipo</th>
                        <th className="px-6 py-4 text-left font-semibold">Finalidad</th>
                        <th className="px-6 py-4 text-left font-semibold">Duración</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 hover:bg-white transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-800">prilabsa_cookie_consent</td>
                        <td className="px-6 py-4 text-gray-700">Técnica / Preferencia</td>
                        <td className="px-6 py-4 text-gray-700">Almacena la preferencia del usuario sobre la aceptación o rechazo de cookies.</td>
                        <td className="px-6 py-4 text-gray-700">Permanente (localStorage)</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-white transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-800">prilabsa-language</td>
                        <td className="px-6 py-4 text-gray-700">Técnica / Preferencia</td>
                        <td className="px-6 py-4 text-gray-700">Guarda la preferencia de idioma del usuario (español/inglés).</td>
                        <td className="px-6 py-4 text-gray-700">Permanente (localStorage)</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-white transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-800">prilabsa_auth</td>
                        <td className="px-6 py-4 text-gray-700">Técnica / Funcional</td>
                        <td className="px-6 py-4 text-gray-700">Mantiene el estado de autenticación del usuario en el sistema.</td>
                        <td className="px-6 py-4 text-gray-700">Sesión (localStorage)</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-white transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-800">i18nextLng</td>
                        <td className="px-6 py-4 text-gray-700">Técnica / Preferencia</td>
                        <td className="px-6 py-4 text-gray-700">Cookie técnica del sistema de internacionalización para detectar y mantener el idioma preferido.</td>
                        <td className="px-6 py-4 text-gray-700">Permanente (localStorage)</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-white transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-800">producto_[ID]</td>
                        <td className="px-6 py-4 text-gray-700">Técnica / Funcional</td>
                        <td className="px-6 py-4 text-gray-700">Almacena temporalmente datos de productos en el inventario para mejorar la experiencia del usuario.</td>
                        <td className="px-6 py-4 text-gray-700">Sesión (localStorage)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Sección 3: ¿Cómo gestionar las cookies? */}
          <section className="mb-12 bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl p-8 lg:p-10 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">{t('legal.cookiePolicy.sections.section3.number')}. {t('legal.cookiePolicy.sections.section3.heading')}</h2>
                <div className="text-gray-700 leading-relaxed text-lg mb-6" dangerouslySetInnerHTML={{ __html: t('legal.cookiePolicy.sections.section3.content') }}>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <a href="https://support.google.com/chrome/answer/95647?hl=es" target="_blank" rel="noopener noreferrer" 
                     className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <span className="font-medium text-gray-800">Google Chrome</span>
                  </a>
                  <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <span className="font-medium text-gray-800">Mozilla Firefox</span>
                  </a>
                  <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <span className="font-medium text-gray-800">Apple Safari</span>
                  </a>
                  <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <span className="font-medium text-gray-800">Microsoft Edge</span>
                  </a>
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                  <p className="text-yellow-800 font-medium">
                    {t('legal.cookiePolicy.cookieWarningWorking')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sección 4: Consentimiento */}
          <section className="mb-12 bg-white rounded-xl p-8 lg:p-10 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">{t('legal.cookiePolicy.sections.section4.number')}. {t('legal.cookiePolicy.sections.section4.heading')}</h2>
                <div className="text-gray-700 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: t('legal.cookiePolicy.sections.section4.content') }}>
                </div>
              </div>
            </div>
          </section>

          {/* Sección 5: Datos de contacto */}
          <section className="mb-12 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl p-8 lg:p-10 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">{t('legal.cookiePolicy.sections.section5.number')}. {t('legal.cookiePolicy.sections.section5.heading')}</h2>
                <div className="text-gray-700 leading-relaxed text-lg mb-6" dangerouslySetInnerHTML={{ __html: t('legal.cookiePolicy.sections.section5.content') }}>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700"><strong>Empresa:</strong> PRIME LABORATORIO PRILAB SA</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700"><strong>Dirección:</strong> AV. CARLOS JULIO AROSEMENA KM 2.5 VIA DAULE C.C. ALBAN BORJA PLANTA BAJA LOCAL 055 TARQUI, GUAYAQUIL, GUAYAS - ECUADOR</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <span className="text-gray-700"><strong>RUC:</strong> 0992398840001</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <span className="text-gray-700"><strong>Email:</strong> info@prilabsa.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Fecha de actualización */}
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-600 font-medium">
                {t('legal.cookiePolicy.lastUpdate')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PoliticaDeCookies;
