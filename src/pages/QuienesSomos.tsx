import React from 'react';
import Layout from '../components/Layout';
import Historia from '../components/Historia';
import HeroVideo from '../components/HeroVideo';
import Catalogo from '../components/Catalogo';
import OptimizedImage from '../components/OptimizedImage';
import { TypeAnimation } from 'react-type-animation';
import { useLanguage } from '../contexts/LanguageContext';
import quienesSomosHeroVideo from '/assets/videos/quienes-somos-hero.mp4';

const QuienesSomos = () => {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <HeroVideo videoSrc={quienesSomosHeroVideo}>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight text-left text-white">
          {t('aboutUs.hero.title')}<br/>
          <TypeAnimation
             sequence={[
               t('aboutUs.hero.animation.productosAcuicolas'), 2000,
               '', 500,
               t('aboutUs.hero.animation.solucionesIntegrales'), 2000,
               '', 500,
             ]}
             wrapper="span"
             speed={50}
             style={{ color: '#f6921d' }}
             repeat={Infinity}
           />
        </h1>
      </HeroVideo>

      <section 
        id="quienes-somos-contenido"
        className="relative py-16 lg:py-24 pb-32 lg:pb-48 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url('/assets/iniciodev/backgrounds_light/background_light_2.png')`,
        }}
      >
        <div className="relative">
          {/* Overlay isotipo Prilabsa Alimentos en la capa más baja */}
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-end">
            <img
              src="/assets/iniciodev/foto-isotipo-prilabsa-alimentos.png" 
              alt="Isotipo Prilabsa Alimentos overlay"
              className="h-1/2 w-auto object-contain opacity-50 md:opacity-60 lg:opacity-70"
              width={800}
              height={600}
              loading="eager"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl text-left space-y-6">
              <h2 className="text-4xl font-bold mb-8 text-left" style={{color: '#3759C1'}}>
                {t('aboutUs.content.title')}
              </h2>
              <p style={{color: '#3759C1', textAlign: 'justify'}}>
                {t('aboutUs.content.description')}
              </p>

              <h3 className="text-xl font-bold uppercase" style={{color: '#f6921d'}}>{t('aboutUs.content.mission.title')}</h3>
              <p style={{color: '#3759C1', textAlign: 'justify'}}>
                {t('aboutUs.content.mission.description')}
              </p>

              <h3 className="text-xl font-bold uppercase" style={{color: '#f6921d'}}>{t('aboutUs.content.vision.title')}</h3>
              <p style={{color: '#3759C1', textAlign: 'justify'}}>
                {t('aboutUs.content.vision.description')}
              </p>
            </div>
          </div>
        </div>
         </section>
         
         <Historia />
      
      <Catalogo />
    </Layout>
  );
};

export default QuienesSomos;
