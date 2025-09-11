import Layout from "../components/Layout";
import StaticHero from "../components/StaticHero";
import Breadcrumbs from "../components/Breadcrumbs";
import { useLanguage } from "../contexts/LanguageContext";

const AvisoLegal = () => {
  const { t } = useLanguage();
  
  const breadcrumbPaths = [
    { name: t('header.navigation.home'), path: '/' },
    { name: t('legal.legalNotice.breadcrumb'), path: '/aviso-legal' },
  ];

  return (
    <Layout>
      <StaticHero 
        title={t('legal.legalNotice.title')}
        subtitle={t('legal.legalNotice.subtitle')}
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l-3-9m3 9l3-9" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-prilabsa-blue-primary mb-2">{t('footer.legal.legalNotice.commitment.title')}</h3>
                  <p className="text-gray-700 leading-relaxed">{t('footer.legal.legalNotice.commitment.content')}</p>
                </div>
              </div>
            </div>

            {/* Secciones del contenido */}
            <div className="space-y-10">
              
              {/* Sección 1 - Datos Identificativos */}
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">{t('legal.legalNotice.sections.section1.number')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-prilabsa-blue-primary">{t('legal.legalNotice.sections.section1.heading')}</h2>
                </div>
                <div className="bg-blue-50 rounded-lg p-6 border-l-3 border-prilabsa-blue-primary">
                  <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.legalNotice.sections.section1.content') }}>
                  </div>
                </div>
              </div>

              {/* Sección 2 - Usuarios */}
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">{t('legal.legalNotice.sections.section2.number')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-prilabsa-blue-primary">{t('legal.legalNotice.sections.section2.heading')}</h2>
                </div>
                <div className="bg-orange-50 rounded-lg p-6 border-l-3 border-prilabsa-orange-primary">
                  <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.legalNotice.sections.section2.content') }}>
                  </div>
                </div>
              </div>

              {/* Sección 3 - Uso del Portal */}
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">{t('legal.legalNotice.sections.section3.number')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-prilabsa-blue-primary">{t('legal.legalNotice.sections.section3.heading')}</h2>
                </div>
                <div className="bg-blue-50 rounded-lg p-6 border-l-3 border-prilabsa-blue-primary">
                  <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.legalNotice.sections.section3.content') }}>
                  </div>
                </div>
              </div>

              {/* Sección 4 - Propiedad Intelectual */}
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">{t('legal.legalNotice.sections.section4.number')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-prilabsa-blue-primary">{t('legal.legalNotice.sections.section4.heading')}</h2>
                </div>
                <div className="bg-orange-50 rounded-lg p-6 border-l-3 border-prilabsa-orange-primary">
                  <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.legalNotice.sections.section4.content') }}>
                  </div>
                </div>
              </div>

              {/* Sección 5 - Exclusión de Garantías */}
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">{t('legal.legalNotice.sections.section5.number')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-prilabsa-blue-primary">{t('legal.legalNotice.sections.section5.heading')}</h2>
                </div>
                <div className="bg-blue-50 rounded-lg p-6 border-l-3 border-prilabsa-blue-primary">
                  <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.legalNotice.sections.section5.content') }}>
                  </div>
                </div>
              </div>

              {/* Sección 6 - Modificaciones */}
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">{t('legal.legalNotice.sections.section6.number')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-prilabsa-blue-primary">{t('legal.legalNotice.sections.section6.heading')}</h2>
                </div>
                <div className="bg-orange-50 rounded-lg p-6 border-l-3 border-prilabsa-orange-primary">
                  <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.legalNotice.sections.section6.content') }}>
                  </div>
                </div>
              </div>

              {/* Sección 7 - Legislación */}
              <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-prilabsa-orange-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">{t('legal.legalNotice.sections.section7.number')}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-prilabsa-blue-primary">{t('legal.legalNotice.sections.section7.heading')}</h2>
                </div>
                <div className="bg-blue-50 rounded-lg p-6 border-l-3 border-prilabsa-blue-primary">
                  <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.legalNotice.sections.section7.content') }}>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer con fecha de actualización */}
            <div className="mt-12 bg-gradient-to-r from-prilabsa-blue-primary to-prilabsa-orange-primary rounded-xl shadow-lg p-8 text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-white font-semibold text-lg">{t('legal.legalNotice.lastUpdate')}</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AvisoLegal;
