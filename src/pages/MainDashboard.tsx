import React from 'react';

const MainDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl w-full mx-4">
        {/* Logo y Título Principal */}
        <div className="text-center mb-12">
          <h1 
            className="text-6xl md:text-7xl font-black mb-6" 
            style={{color: '#3759C1', fontFamily: 'Gotham, sans-serif'}}
          >
            PRILABSA
          </h1>
          <p 
            className="text-xl md:text-2xl font-medium"
            style={{color: '#e17e01', fontFamily: 'Gotham, sans-serif'}}
          >
            Website Management Dashboard
          </p>
          <div className="mt-4 w-24 h-1 mx-auto" style={{backgroundColor: '#e17e01'}}></div>
        </div>

        {/* Botones de Navegación */}
        <div className="space-y-6">
          <a 
            href="/"
            className="block w-full py-6 px-8 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center"
            style={{
              backgroundColor: '#3759C1',
              color: 'white',
              fontFamily: 'Gotham, sans-serif'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = '#2a4599';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = '#3759C1';
            }}
          >
            🌐 WEBSITE 2025
            <div className="text-sm font-normal mt-2 opacity-90">
              Nueva versión del sitio web PRILABSA
            </div>
          </a>

          <a 
            href="/dashboard"
            className="block w-full py-6 px-8 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center"
            style={{
              backgroundColor: '#e17e01',
              color: 'white',
              fontFamily: 'Gotham, sans-serif'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = '#c96b01';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = '#e17e01';
            }}
          >
            📊 MÉTRICAS DESPLIEGUE
            <div className="text-sm font-normal mt-2 opacity-90">
              Auditoría de seguridad y métricas técnicas
            </div>
          </a>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm font-montserrat">
            Sistema de gestión web PRILABSA
          </p>
          <p className="text-gray-500 text-xs font-montserrat mt-1">
            Versión 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard; 