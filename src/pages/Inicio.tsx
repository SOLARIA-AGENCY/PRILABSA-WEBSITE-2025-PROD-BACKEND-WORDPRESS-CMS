import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { TypeAnimation } from 'react-type-animation';
import NuestroCatalogo from '../components/NuestroCatalogo';
import NuestrasAgencias from '../components/NuestrasAgencias';
import OptimizedImage from '../components/OptimizedImage';
import { useLanguage } from '../contexts/LanguageContext';
import backgroundVideo from '/assets/iniciodev/background_video_optimized.mp4';
import modalVideo from '/assets/iniciodev/modal_video.mp4';


// Dynamic import for react-modal to reduce initial bundle size
const Modal = lazy(() => import('react-modal'));

// Set app element for accessibility when Modal is loaded
const setModalAppElement = async () => {
  if (typeof window !== 'undefined') {
    const { default: ModalComponent } = await import('react-modal');
    ModalComponent.setAppElement('#root');
  }
};

const Inicio = () => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    setModalAppElement();
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <Layout isHeroPage={true}>
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Fallback background image, always present */}
        <div 
          className={`absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            !videoError ? 'opacity-50' : 'opacity-100'
          }`}
          style={{
            backgroundImage: `url('/assets/iniciodev/hero-fallback-real.webp')`,
          }}
        />
        
        {/* Video element with simplified logic */}
        {!videoError && (
          <video 
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={backgroundVideo}
            autoPlay 
            loop 
            muted 
            playsInline
            poster="/assets/iniciodev/hero-fallback-real.webp" // Fallback poster
            onError={() => {
              console.warn('Video failed to load, displaying fallback image.');
              setVideoError(true);
            }}
          />
        )}
        
        {/* Blue overlay for brand consistency */}
        <div className="absolute top-0 left-0 w-full h-full bg-blue-900 opacity-60 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 flex items-center justify-start h-full w-full">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight text-left">
              {t('home.hero.title')}<br/>
              <TypeAnimation
                sequence={[
                  t('home.catalog.categories.alimentos'), 2000,
                  t('home.catalog.categories.probioticos'), 2000,
                  t('home.catalog.categories.aditivos'), 2000,
                  t('home.catalog.categories.quimicos'), 2000,
                  t('home.catalog.categories.equipos'), 2000,
                ]}
                wrapper="span"
                speed={50}
                style={{ color: '#f6921d', fontWeight: 900 }}
                repeat={Infinity}
              />
            </h1>
          </div>
        </div>
        
        {/* Call to action button */}
        <div className="absolute bottom-20 left-0 w-full flex justify-center z-20">
          <button 
            onClick={openModal}
            className="px-8 py-3 rounded text-lg font-bold uppercase tracking-wider transition-colors hover:bg-orange-600"
            style={{ backgroundColor: '#f6921d', color: 'white' }}
          >
{t('home.weAre.watchVideo')}
          </button>
        </div>
      </section>
      <Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"><div className="text-white">Cargando...</div></div>}>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Video Player Modal"
          className="relative bg-transparent p-0 border-0 max-w-4xl w-11/12 focus:outline-none"
          overlayClassName="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
        >
          <div className="relative">
            <button onClick={closeModal} className="absolute -top-8 -right-0 text-white text-3xl font-bold">&times;</button>
            <div className="aspect-video bg-black">
              <video controls autoPlay className="w-full h-full" src={modalVideo}>
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </Modal>
      </Suspense>

      <section 
        id="somos"
        className="py-12 lg:py-16 bg-white relative overflow-hidden min-h-[80vh]"
      >
        {/* Imagen de fondo prilabsa pedernales al 15% de opacidad - ocupa todo el espacio con overflow lateral */}
        <img
          src="/images/prilabsa pedernales.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center opacity-15 z-0"
        />
        <div className="relative">
          
          {/* Overlay isotipo Prilabsa Alimentos encima de la imagen de fondo */}
          <div className="absolute inset-0 z-5 pointer-events-none flex items-center justify-end">
            <img
              src="/assets/iniciodev/foto-isotipo-prilabsa-alimentos.png" 
              alt="Isotipo Prilabsa Alimentos overlay"
              className="h-1/2 w-auto object-contain opacity-50 md:opacity-60 lg:opacity-70"
              width={800}
              height={600}
              loading="eager"
            />
          </div>
          <div className="container mx-auto px-6 md:px-10 lg:px-16 relative z-10">
            <div className="max-w-3xl text-left space-y-6">
              <h2 className="text-4xl font-bold mb-8 text-left" style={{color: '#3759C1'}}>
{t('home.weAre.title')}
              </h2>
              
              <h3 className="text-xl font-bold uppercase" style={{color: '#f6921d'}}>{t('home.weAre.sections.excellence.title')}</h3>
              <p style={{color: '#3759C1', textAlign: 'justify'}}>
                {t('home.weAre.sections.excellence.description')}
              </p>

              <h3 className="text-xl font-bold uppercase" style={{color: '#f6921d'}}>{t('home.weAre.sections.coverage.title')}</h3>
              <p style={{color: '#3759C1', textAlign: 'justify'}}>
                {t('home.weAre.sections.coverage.description')}
              </p>

              <h3 className="text-xl font-bold uppercase" style={{color: '#f6921d'}}>{t('home.weAre.sections.presence.title')}</h3>
              <p style={{color: '#3759C1', textAlign: 'justify'}}>
                {t('home.weAre.sections.presence.description')}
              </p>

              <h3 className="text-xl font-bold uppercase" style={{color: '#f6921d'}}>{t('home.weAre.sections.leadership.title')}</h3>
              <p style={{color: '#3759C1', textAlign: 'justify'}}>
                {t('home.weAre.sections.leadership.description')}
              </p>

              <div className="mt-8">
                <Link 
                  to="/quienes-somos"
                  className="inline-block px-8 py-3 rounded text-lg font-bold uppercase tracking-wider transition-colors hover:bg-orange-600" 
                  style={{backgroundColor: '#f6921d', color: 'white'}}
                >
  {t('home.hero.cta.catalog')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NuestroCatalogo />
      
      <NuestrasAgencias />
    </Layout>
  );
};

export default Inicio;
