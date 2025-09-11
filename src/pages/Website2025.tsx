import React from 'react';

const Website2025: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h1 className="text-6xl font-montserrat font-bold text-gray-900 mb-6 tracking-wider">
            Website 2025
          </h1>
          <p className="text-2xl font-montserrat text-gray-600 mb-8">
            Recreación fiel de la web original de PRILABSA
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-2xl font-montserrat font-bold text-blue-800 mb-4">
              En Construcción
            </h2>
            <p className="text-lg font-montserrat text-blue-700 mb-4">
              Aquí se recreará la web original de PRILABSA con total fidelidad visual y funcional.
            </p>
            <div className="text-left max-w-2xl mx-auto">
              <h3 className="text-lg font-montserrat font-semibold text-blue-800 mb-3">
                Próximas fases del proyecto:
              </h3>
              <ul className="space-y-2 text-blue-700 font-montserrat">
                <li>✅ <strong>Fase 1:</strong> Arquitectura base y configuración de seguridad</li>
                <li>🔄 <strong>Fase 2:</strong> Scraping y análisis del sitio actual</li>
                <li>⏳ <strong>Fase 3:</strong> Recreación de componentes con Atomic Design</li>
                <li>⏳ <strong>Fase 4:</strong> Implementación de contenido y funcionalidades</li>
                <li>⏳ <strong>Fase 5:</strong> Testing y optimización final</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center space-x-6">
            <a 
              href="/" 
              className="px-8 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-montserrat font-semibold shadow-lg text-lg"
            >
              🏠 Volver al Inicio
            </a>
            <a 
              href="/dashboard" 
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-montserrat font-semibold shadow-lg text-lg"
            >
              📊 Ver Auditoría
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

export default Website2025; 