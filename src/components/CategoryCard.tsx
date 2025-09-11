import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface CategoryCardProps {
  imagen: string;
  titulo: string;
  enlace: string;
  descripcion?: string;
  className?: string;
  size?: 'small' | 'large';
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  imagen, 
  titulo, 
  enlace, 
  className = '', 
  size = 'small' 
}) => {
  const { t } = useLanguage();
  const sizeStyles = {
    small: {
      maxWidth: '180px',
      iconSize: 'w-20 h-20',
      titleSize: 'text-base',
      buttonPadding: 'px-4 py-1',
      buttonText: 'text-xs',
    },
    large: {
      maxWidth: '270px',
      iconSize: 'w-32 h-32', // Icono más grande
      titleSize: 'text-xl',   // Título más grande
      buttonPadding: 'px-6 py-2', // Botón más grande
      buttonText: 'text-sm',
    }
  };

  const styles = sizeStyles[size];

  return (
    <div 
      className={`rounded-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out group flex flex-col h-full w-full ${className}`}
      style={{ 
        minWidth: 0, 
        maxWidth: styles.maxWidth,
        height: '280px' // Altura fija para mantener proporciones
      }}
    >
      {/* Mitad superior - Fondo azul con ícono */}
      <div 
        className="flex-1 flex items-center justify-center p-4"
        style={{ backgroundColor: '#3759C1' }}
      >
        <img
          src={imagen}
          alt={`Ícono de ${titulo}`}
          className={`${styles.iconSize} object-contain`}
        />
      </div>
      
      {/* Mitad inferior - Fondo blanco con título azul */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 bg-white">
        <h3 
          className={`${styles.titleSize} font-bold uppercase mb-4 text-center`}
          style={{ color: '#3759C1' }}
        >
          {titulo}
        </h3>
        <div className="w-full px-2">
          <a
            href={enlace}
            className={`block w-full text-center ${styles.buttonPadding} rounded font-semibold uppercase tracking-wider ${styles.buttonText} transition-colors duration-300 bg-[#f6921d] text-white focus:outline-none focus:ring-2 focus:ring-[#3759C1] focus:ring-offset-2 focus:ring-offset-white hover:bg-[#e8831a]`}
          >
{t('home.catalog.viewProducts')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;