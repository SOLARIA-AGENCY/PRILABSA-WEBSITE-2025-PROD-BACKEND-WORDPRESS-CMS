import React from 'react';

interface LoadingLogoProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Componente de carga con logo PRILABSA
 * Reemplaza spinners genéricos con branding corporativo
 */
const LoadingLogo: React.FC<LoadingLogoProps> = ({
  message = 'Cargando...',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Logo PRILABSA con animación pulse */}
      <div className={`${sizeClasses[size]} mb-6 animate-pulse`}>
        <img
          src="/assets/iniciodev/foto-isotipo-prilabsa-alimentos.png"
          alt="PRILABSA Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Mensaje de carga */}
      {message && (
        <p className="text-gray-600 text-center font-medium">
          {message}
        </p>
      )}

      {/* Barra de progreso indeterminada (opcional) */}
      <div className="w-48 h-1 bg-gray-200 rounded-full mt-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-orange-500 animate-loading-bar"
          style={{
            animation: 'loading-bar 1.5s ease-in-out infinite'
          }}
        />
      </div>

      <style>{`
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
            width: 50%;
          }
          50% {
            transform: translateX(0);
            width: 75%;
          }
          100% {
            transform: translateX(200%);
            width: 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingLogo;
