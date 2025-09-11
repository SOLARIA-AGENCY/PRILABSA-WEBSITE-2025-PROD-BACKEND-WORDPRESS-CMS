import React from 'react';
import Layout from '../components/Layout';
import HeroVideo from '../components/HeroVideo';
import agenciasHeroVideo from '/assets/videos/agencias-hero.mp4';
import OficinasTabs from '../components/OficinasTabs';
import OficinasMap from '../components/OficinasMap';
import { TypeAnimation } from 'react-type-animation';
import { useLanguage } from '../contexts/LanguageContext';

const Oficinas = () => {
  const { t } = useLanguage();
  
  return (
    <Layout isHeroPage={true}>
      <HeroVideo videoSrc={agenciasHeroVideo}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight text-left text-white">
              {t('offices.hero.title')}<br/>
              <TypeAnimation
                  sequence={[
                      t('offices.hero.countries.ecuador'),
                      2000,
                      t('offices.hero.countries.brasil'),
                      2000,
                      t('offices.hero.countries.usa'),
                      2000,
                      t('offices.hero.countries.mexico'),
                      2000,
                      t('offices.hero.countries.honduras'),
                      2000,
                      t('offices.hero.countries.panama'),
                      2000,
                      t('offices.hero.countries.nicaragua'),
                      2000,
                      t('offices.hero.countries.venezuela'),
                      2000,
                      t('offices.hero.countries.peru'),
                      2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  style={{ color: '#f6921d', fontWeight: 900 }}
                  repeat={Infinity}
              />
          </h1>
      </HeroVideo>
      <div className="bg-white">
        <OficinasTabs />
        <OficinasMap />

      </div>
    </Layout>
  );
};

export default Oficinas;
