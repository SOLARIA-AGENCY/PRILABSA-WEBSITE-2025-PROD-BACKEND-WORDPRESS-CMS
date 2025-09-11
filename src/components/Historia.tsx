import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Historia: React.FC = () => {
  const { t } = useLanguage();
  
  const historiaData = [
    { year: '1992', description: t('history.timeline.1992') },
    { year: '1998', description: t('history.timeline.1998') },
    { year: '2000', description: t('history.timeline.2000') },
    { year: '2001', description: t('history.timeline.2001') },
    { year: '2002', description: t('history.timeline.2002') },
    { year: '2003', description: t('history.timeline.2003') },
    { year: '2008', description: t('history.timeline.2008') },
    { year: '2010', description: t('history.timeline.2010') },
    { year: '2013', description: t('history.timeline.2013') },
    { year: '2014', description: t('history.timeline.2014') },
    { year: '2018', description: t('history.timeline.2018') },
    { year: '2023', description: t('history.timeline.2023') },
    { year: '2024', description: t('history.timeline.2024') }
  ];
  
  return (
    <section 
      className="relative py-16 lg:py-24 bg-cover bg-center"
      style={{
        backgroundImage: `url('/assets/iniciodev/backgrounds_light/background_light_2.png')`,
      }}
    >
      {/* Eliminado backgroundImage y overlay blanco */}
      <div className="container mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold uppercase" style={{ color: '#3759C1' }}>
            {t('history.title')}
          </h2>
          <p className="text-lg mt-2 font-bold uppercase" style={{ color: '#3759C1' }}>
            {t('history.subtitle')}
          </p>
        </div>
        <div className="wrap overflow-hidden p-4 h-full">
          <div className="relative">
            {/* Línea naranja central para mobile */}
            <div 
              className="md:hidden absolute border-l-2 left-4" 
              style={{ 
                borderColor: '#f6921d',
                left: 'calc(1rem + 12px)', // Mobile: left-4 (1rem) + half circle width (12px) para centrar
                top: '6rem', // Comienza desde el primer punto (1992)
                height: 'calc(100% - 8rem)', // Altura ajustada desde el primer círculo hasta el final
                zIndex: 1 // Detrás de los círculos
              }}
            ></div>
            
            {/* Línea naranja central para desktop - perfectamente centrada */}
            <div 
              className="hidden md:block absolute border-l-2 left-1/2 -translate-x-1/2" 
              style={{ 
                borderColor: '#f6921d',
                top: '6rem', // Comienza desde el primer punto (1992)
                height: 'calc(100% - 8rem)', // Altura ajustada desde el primer círculo hasta el final
                zIndex: 1 // Detrás de los círculos
              }}
            ></div>

            {historiaData.map((item, index) => {
              const isFirst = index === 0;
              const isLeftAligned = index % 2 !== 0; // Invert logic for alignment after first item

              if (isFirst) {
                return (
                  <div key={index} className="flex md:justify-center md:items-center items-start mb-8 relative">
                    {/* --- DESKTOP --- */}
                    <div className="hidden md:block w-5/12">
                      <div className="flex justify-end items-center">
                        <p className="text-right mr-4 uppercase" style={{ color: '#3759C1' }}>{item.description}</p>
                        <p className="font-bold text-2xl" style={{ color: '#f6921d' }}>{item.year}</p>
                      </div>
                    </div>

                    <div className="hidden md:flex items-center justify-center flex-shrink-0 w-6 h-6 rounded-full ring-4 ring-white z-10 mx-4 bg-white">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#f6921d' }}></div>
                    </div>

                    <div className="hidden md:block w-5/12">
                      {/* Empty space for right side */}
                    </div>

                    {/* --- MOBILE --- */}
                    <div className="md:hidden flex items-start w-full">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full ring-4 ring-white z-10 mt-1 flex items-center justify-center bg-white">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#f6921d' }}></div>
                      </div>
                      <div className="ml-4">
                        <p className="font-bold text-2xl" style={{ color: '#f6921d' }}>{item.year}</p>
                        <p className="mt-1 text-left uppercase" style={{ color: '#3759C1' }}>{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              }
              
              return (
                <div key={index} className="flex md:justify-center md:items-center items-start mb-8 relative">
                  {/* --- DESKTOP --- */}
                  <div className="hidden md:block w-5/12">
                    {!isLeftAligned && (
                      <div className="flex justify-end items-center">
                        <p className="text-right mr-4 uppercase" style={{ color: '#3759C1' }}>{item.description}</p>
                        <p className="font-bold text-2xl" style={{ color: '#f6921d' }}>{item.year}</p>
                      </div>
                    )}
                  </div>

                  <div className="hidden md:flex items-center justify-center flex-shrink-0 w-6 h-6 rounded-full ring-4 ring-white z-10 mx-4 bg-white">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#f6921d' }}></div>
                  </div>

                  <div className="hidden md:block w-5/12">
                    {isLeftAligned && (
                      <div className="flex justify-start items-center">
                        <p className="font-bold text-2xl mr-4" style={{ color: '#f6921d' }}>{item.year}</p>
                        <p className="text-left uppercase" style={{ color: '#3759C1' }}>{item.description}</p>
                      </div>
                    )}
                  </div>

                  {/* --- MOBILE --- */}
                  <div className="md:hidden flex items-start w-full">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full ring-4 ring-white z-10 mt-1 flex items-center justify-center bg-white">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#f6921d' }}></div>
                    </div>
                    <div className="ml-4">
                      <p className="font-bold text-2xl" style={{ color: '#f6921d' }}>{item.year}</p>
                      <p className="mt-1 text-left uppercase" style={{ color: '#3759C1' }}>{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Historia;
