import React, { useState, useRef, useCallback } from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { SupportedLanguages } from '../i18n';

// Banderas SVG inline para evitar dependencias externas
const EcuadorFlag = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
    <rect width="20" height="15" fill="#FFD100"/>
    <rect y="7.5" width="20" height="3.75" fill="#0072CE"/>
    <rect y="11.25" width="20" height="3.75" fill="#CE1126"/>
  </svg>
);

const USAFlag = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
    <rect width="20" height="15" fill="#B22234"/>
    <rect y="0" width="20" height="1.15" fill="white"/>
    <rect y="2.31" width="20" height="1.15" fill="white"/>
    <rect y="4.62" width="20" height="1.15" fill="white"/>
    <rect y="6.92" width="20" height="1.15" fill="white"/>
    <rect y="9.23" width="20" height="1.15" fill="white"/>
    <rect y="11.54" width="20" height="1.15" fill="white"/>
    <rect y="13.85" width="20" height="1.15" fill="white"/>
    <rect x="0" y="0" width="8" height="8" fill="#3C3B6E"/>
  </svg>
);

const BrazilFlag = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
    <rect width="20" height="15" fill="#009739"/>
    <polygon points="10,2 18,7.5 10,13 2,7.5" fill="#FEDD00"/>
    <circle cx="10" cy="7.5" r="3" fill="#012169"/>
  </svg>
);

interface LanguageOption {
  code: Language;
  name: string;
  flag: React.ReactNode;
}

const languages: LanguageOption[] = [
  {
    code: 'es',
    name: 'Español',
    flag: <EcuadorFlag />
  },
  {
    code: 'en',
    name: 'English',
    flag: <USAFlag />
  },
  {
    code: 'pt',
    name: 'Português',
    flag: <BrazilFlag />
  }
];

interface LanguageSelectorProps {
  className?: string;
  showText?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  className = '',
  showText: _showText = false 
}) => {
  const { language, setLanguage } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentLanguage = languages.find(lang => lang.code === language);
  const otherLanguages = languages.filter(lang => lang.code !== language);

  const { i18n } = useTranslation();
  
  const handleLanguageChange = async (newLanguage: Language) => {
    try {
      // Update i18next language
      await i18n.changeLanguage(newLanguage as SupportedLanguages);
      
      // Update context language
      setLanguage(newLanguage);
      
      setIsHovered(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Delay closing to allow user to move to dropdown options
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150); // 150ms delay
  }, []);

  return (
    <div 
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Current language flag */}
      <div
        className="p-2 transition-opacity duration-200 hover:opacity-80 cursor-pointer flex items-center justify-center w-8 h-8"
        aria-label={`Current language: ${currentLanguage?.name}. Hover to change language`}
      >
        {currentLanguage?.flag}
      </div>

      {/* Hover menu with other flags - aligned vertically */}
      {isHovered && (
        <div 
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-[60] bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[40px]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {otherLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="w-full p-2 transition-all duration-200 hover:bg-gray-100 flex items-center justify-center group"
              aria-label={`Switch to ${lang.name}`}
            >
              <div className="w-5 h-5 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                {lang.flag}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;