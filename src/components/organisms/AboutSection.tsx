import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="quienes-somos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            SOMOS
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Prilabsa es una empresa multinacional fundada en el año 1992, dedicándose a la 
              comercialización de alimentos, probióticos, aditivos, equipos y químicos con altos 
              estándares de calidad.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Prilabsa ha podido cubrir todas las necesidades de los laboratorios de camarón, 
              peces y camaroneras, gracias al pleno conocimiento del medio ambiente y la sólida 
              experiencia con nuestro personal capacitado en varios mercados de la industria acuícola.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Prilabsa ha expandido sus actividades en países establecidos como puntos estratégicos 
              del continente americano, contando con oficinas comerciales y bodegas climatizadas en 
              Ecuador (Guayaquil, Manta, Pedernales, San Vicente, Hualtaco, Machala, 
              Esmeraldas, Libertad), USA (Miami), México (Mazatlán), Brasil (Natal, Aracati y Acaraú), 
              Honduras (Choluteca), Panamá (Ciudad de Panamá), Nicaragua (Chinandega), Venezuela 
              (Maracaibo) y Perú (Tumbes).
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Contamos con mas de 32 años de experiencia y servicio dentro del sector, lo que 
              evidencia que la excelencia no se improvisa, se consolida a través de la eficiencia 
              de cada uno de nuestro equipo de trabajo. Llegando así a convertirnos en la solución 
              integral del sector acuícola en las Américas.
            </p>

            <div className="pt-6">
              <a 
                href="#quienes-somos"
                className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
              >
                CONOCE MÁS
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 text-white">
              <div className="text-center">
                <div className="text-6xl font-bold mb-4">32+</div>
                <div className="text-xl font-semibold mb-2">Años de Experiencia</div>
                <div className="text-blue-100">Sirviendo a las Américas</div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">15+</div>
                  <div className="text-sm text-blue-100">Países</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">1992</div>
                  <div className="text-sm text-blue-100">Fundada</div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-300 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};