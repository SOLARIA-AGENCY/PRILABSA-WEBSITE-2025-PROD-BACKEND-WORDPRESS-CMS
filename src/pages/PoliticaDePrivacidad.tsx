import Layout from "../components/Layout";
import StaticHero from "../components/StaticHero";
import Breadcrumbs from "../components/Breadcrumbs";
import { useLanguage } from "../contexts/LanguageContext";

const PoliticaDePrivacidad = () => {
  const { t } = useLanguage();
  
  const breadcrumbPaths = [
    { name: t('header.navigation.home'), path: '/' },
    { name: t('legal.privacyPolicy.breadcrumb'), path: '/politica-de-privacidad' },
  ];

  return (
    <Layout>
      <StaticHero 
        title={t('legal.privacyPolicy.title')}
        subtitle={t('legal.privacyPolicy.subtitle')}
        backgroundImage="/assets/iniciodev/prilabsa-hero-legal.png"
      />
      <Breadcrumbs paths={breadcrumbPaths} />
      
      {/* Contenido principal con diseño mejorado */}
      <section className="relative py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Introducción destacada */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border-l-4 border-prilabsa-orange-primary">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-prilabsa-orange-primary rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-prilabsa-blue-primary mb-2">{t('legal.privacyPolicy.commitment.title')}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t('legal.privacyPolicy.commitment.content')}
                  </p>
                </div>
              </div>
            </div>

            {/* Secciones del contenido */}
            <div className="space-y-10">
              
              {/* Sección 1 */}
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-prilabsa-blue-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">{t('legal.privacyPolicy.sections.section1.number')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-prilabsa-blue-primary">{t('legal.privacyPolicy.sections.section1.heading')}</h2>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.privacyPolicy.sections.section1.content') }}>
                  </p>
                </div>
              </div>

              {/* Sección 2 */}
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-prilabsa-blue-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">{t('legal.privacyPolicy.sections.section2.number')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-prilabsa-blue-primary">{t('legal.privacyPolicy.sections.section2.heading')}</h2>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.privacyPolicy.sections.section2.content') }}>
                  </p>
                </div>
              </div>

              {/* Sección 3 */}
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-prilabsa-blue-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">{t('legal.privacyPolicy.sections.section3.number')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-prilabsa-blue-primary">{t('legal.privacyPolicy.sections.section3.heading')}</h2>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.privacyPolicy.sections.section3.content') }}>
                  </p>
                </div>
              </div>

              {/* Sección 4 */}
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-prilabsa-blue-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">{t('legal.privacyPolicy.sections.section4.number')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-prilabsa-blue-primary">{t('legal.privacyPolicy.sections.section4.heading')}</h2>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.privacyPolicy.sections.section4.content') }}>
                  </p>
                </div>
              </div>

              {/* Sección 5 */}
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-prilabsa-blue-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">{t('legal.privacyPolicy.sections.section5.number')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-prilabsa-blue-primary">{t('legal.privacyPolicy.sections.section5.heading')}</h2>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.privacyPolicy.sections.section5.content') }}>
                  </p>
                </div>
              </div>

              {/* Sección 6 */}
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-prilabsa-blue-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">{t('legal.privacyPolicy.sections.section6.number')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-prilabsa-blue-primary">{t('legal.privacyPolicy.sections.section6.heading')}</h2>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.privacyPolicy.sections.section6.content') }}>
                  </p>
                </div>
              </div>

              {/* Sección 7 */}
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-prilabsa-blue-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">{t('legal.privacyPolicy.sections.section7.number')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-prilabsa-blue-primary">{t('legal.privacyPolicy.sections.section7.heading')}</h2>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.privacyPolicy.sections.section7.content') }}>
                  </p>
                </div>
              </div>

            </div>

            {/* Footer de la página */}
            <div className="mt-12 bg-gradient-to-r from-prilabsa-blue-primary to-prilabsa-orange-primary rounded-xl p-6 text-white text-center">
              <p className="text-sm">
                <strong>{t('legal.privacyPolicy.lastUpdate')}</strong>
              </p>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PoliticaDePrivacidad;
