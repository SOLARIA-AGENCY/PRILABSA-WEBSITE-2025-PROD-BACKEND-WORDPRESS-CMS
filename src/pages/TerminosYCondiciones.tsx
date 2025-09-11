import Layout from "../components/Layout";
import StaticHero from "../components/StaticHero";
import Breadcrumbs from "../components/Breadcrumbs";
import { useLanguage } from "../contexts/LanguageContext";

const TerminosYCondiciones = () => {
  const { t } = useLanguage();
  
  const breadcrumbPaths = [
    { name: t('header.navigation.home'), path: '/' },
    { name: t('legal.termsAndConditions.breadcrumb'), path: '/terminos-y-condiciones' },
  ];

  return (
    <Layout>
      <StaticHero
        title={t('legal.termsAndConditions.title')}
        subtitle={t('legal.termsAndConditions.subtitle')}
        backgroundImage="/assets/iniciodev/prilabsa-hero-legal.png"
      />
      <Breadcrumbs paths={breadcrumbPaths} />
      
      {/* Contenido principal con diseño mejorado */}
      <section className="relative py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Introducción destacada */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border-l-4 border-prilabsa-blue-primary">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-prilabsa-blue-primary rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-gray-700 leading-relaxed">
                     {t('legal.termsAndConditions.introduction')}
                   </div>
                </div>
              </div>
            </div>

            {/* Secciones del contenido */}
            <div className="space-y-10">
              
              {/* Sección 1 */}
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">{t('legal.termsAndConditions.sections.section1.number')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-prilabsa-blue-primary">{t('legal.termsAndConditions.sections.section1.heading')}</h2>
                </div>
                <div className="bg-orange-50 rounded-lg p-6 border-l-3 border-prilabsa-orange-primary">
                  <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.termsAndConditions.sections.section1.content') }}>
                  </div>
                </div>
              </div>

              {/* Sección 2 */}
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">{t('legal.termsAndConditions.sections.section2.number')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-prilabsa-blue-primary">{t('legal.termsAndConditions.sections.section2.heading')}</h2>
                </div>
                <div className="bg-orange-50 rounded-lg p-6 border-l-3 border-prilabsa-orange-primary">
                  <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.termsAndConditions.sections.section2.content') }}>
                  </div>
                </div>
              </div>

              {/* Sección 3 */}
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">{t('legal.termsAndConditions.sections.section3.number')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-prilabsa-blue-primary">{t('legal.termsAndConditions.sections.section3.heading')}</h2>
                </div>
                <div className="bg-orange-50 rounded-lg p-6 border-l-3 border-prilabsa-orange-primary">
                  <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.termsAndConditions.sections.section3.content') }}>
                  </div>
                </div>
              </div>

              {/* Sección 4 */}
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">{t('legal.termsAndConditions.sections.section4.number')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-prilabsa-blue-primary">{t('legal.termsAndConditions.sections.section4.heading')}</h2>
                </div>
                <div className="bg-orange-50 rounded-lg p-6 border-l-3 border-prilabsa-orange-primary">
                  <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.termsAndConditions.sections.section4.content') }}>
                  </div>
                </div>
              </div>

              {/* Sección 5 */}
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">{t('legal.termsAndConditions.sections.section5.number')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-prilabsa-blue-primary">{t('legal.termsAndConditions.sections.section5.heading')}</h2>
                </div>
                <div className="bg-orange-50 rounded-lg p-6 border-l-3 border-prilabsa-orange-primary">
                  <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.termsAndConditions.sections.section5.content') }}>
                  </div>
                </div>
              </div>

              {/* Sección 6 */}
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">{t('legal.termsAndConditions.sections.section6.number')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-prilabsa-blue-primary">{t('legal.termsAndConditions.sections.section6.heading')}</h2>
                </div>
                <div className="bg-orange-50 rounded-lg p-6 border-l-3 border-prilabsa-orange-primary">
                  <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.termsAndConditions.sections.section6.content') }}>
                  </div>
                </div>
              </div>

              {/* Sección 7 */}
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">{t('legal.termsAndConditions.sections.section7.number')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-prilabsa-blue-primary">{t('legal.termsAndConditions.sections.section7.heading')}</h2>
                </div>
                <div className="bg-orange-50 rounded-lg p-6 border-l-3 border-prilabsa-orange-primary">
                  <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.termsAndConditions.sections.section7.content') }}>
                  </div>
                </div>
              </div>

              {/* Sección 8 */}
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">{t('legal.termsAndConditions.sections.section8.number')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-prilabsa-blue-primary">{t('legal.termsAndConditions.sections.section8.heading')}</h2>
                </div>
                <div className="bg-orange-50 rounded-lg p-6 border-l-3 border-prilabsa-orange-primary">
                  <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.termsAndConditions.sections.section8.content') }}>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer de la página */}
            <div className="mt-12 bg-gradient-to-r from-prilabsa-blue-primary to-prilabsa-orange-primary rounded-xl p-6 text-white text-center">
              <p className="text-sm">
                {t('legal.termsAndConditions.lastUpdate')}
              </p>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TerminosYCondiciones;
