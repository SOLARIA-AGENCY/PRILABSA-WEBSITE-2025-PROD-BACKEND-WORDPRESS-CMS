import React from 'react';
import { FEATURES } from '../config/features';

interface SolariaBadgeProps {
  className?: string;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  theme?: 'light' | 'dark';
}

const SolariaBadge: React.FC<SolariaBadgeProps> = ({ 
  className = '', 
  position = 'bottom-left',
  theme = 'dark'
}) => {
  // Debug: verificar variables de entorno
  console.log('🔍 SolariaBadge - FEATURES.SHOW_SOLARIA_BADGE:', FEATURES.SHOW_SOLARIA_BADGE);
  console.log('🔍 SolariaBadge - import.meta.env.VITE_SHOW_SOLARIA_BADGE:', import.meta.env.VITE_SHOW_SOLARIA_BADGE);
  
  // Feature flag: ocultar completamente si está desactivado
  if (!FEATURES.SHOW_SOLARIA_BADGE) {
    console.log('❌ SolariaBadge - Badge desactivado por feature flag');
    return null;
  }
  
  console.log('✅ SolariaBadge - Badge activado, renderizando componente');

  const positionClasses = {
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4', 
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4'
  };

  const themeClasses = {
    light: 'bg-white text-gray-800 border border-gray-200 shadow-lg hover:shadow-xl',
    dark: 'bg-gray-900 text-white border border-gray-700 shadow-lg hover:shadow-xl'
  };

  return (
    <a 
      href="https://solaria.agency" 
      target="_blank" 
      rel="noopener noreferrer"
      className={`
        fixed z-50 px-3 py-2 rounded-lg text-xs font-medium
        hover:scale-105 transition-all duration-200
        ${positionClasses[position]}
        ${themeClasses[theme]}
        ${className}
      `}
      title="Powered by Solaria Agency"
    >
      <div className="flex items-center space-x-1">
        <span className="opacity-70">powered by</span>
        <span className="font-bold">solaria.agency</span>
      </div>
    </a>
  );
};

export default SolariaBadge;