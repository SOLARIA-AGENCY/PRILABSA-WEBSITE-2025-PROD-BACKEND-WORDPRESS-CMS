import React from 'react';

// Force deployment update - cache bust
export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content - PRILABSA Centered */}
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-8xl font-montserrat font-bold text-gray-900 mb-4 tracking-wider">
            PRILABSA
          </h1>
          <p className="text-xl font-montserrat text-gray-600 mb-8">
            Proveedores de soluciones integrales en alimentos - Versión 2025
          </p>
          <div className="flex justify-center space-x-6">
            <a 
              href="/website" 
              className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-montserrat font-semibold shadow-lg text-lg"
            >
              🌐 Website 2025
            </a>
            <a 
              href="/dashboard" 
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-montserrat font-semibold shadow-lg text-lg"
            >
              📊 Métricas Despliegue y Auditoría
            </a>
            <a 
              href="/" 
              className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-montserrat font-semibold shadow-lg text-lg"
            >
              🚀 Nueva Home (Dev)
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="text-center text-sm text-gray-500 font-montserrat">
            <p>PRILABSA Website 2025 - Migración fiel y fidedigna</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 