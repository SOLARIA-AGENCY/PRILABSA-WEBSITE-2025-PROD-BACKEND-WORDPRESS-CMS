import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getTranslation, validateTranslations } from '../translations';

export type Language = 'es' | 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Función para detectar idioma del navegador
const detectBrowserLanguage = (): Language => {
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('en')) return 'en';
  if (browserLang.startsWith('pt')) return 'pt';
  return 'es'; // Default fallback
};

// Función para obtener idioma guardado o detectar automáticamente
const getInitialLanguage = (): Language => {
  try {
    const saved = localStorage.getItem('prilabsa-language') as Language;
    if (saved && (saved === 'es' || saved === 'en' || saved === 'pt')) {
      return saved;
    }
  } catch (error) {
    console.warn('Error accessing localStorage:', error);
  }
  return detectBrowserLanguage();
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('prilabsa-language', lang);
    } catch (error) {
      console.warn('Error saving language to localStorage:', error);
    }
    
    // Actualizar atributo lang del HTML para SEO
    document.documentElement.lang = lang;
  };

  // Función de traducción
  const t = (key: string): string => {
    return getTranslation(key, language);
  };

  // Efecto para establecer el idioma inicial en el HTML y validar traducciones
  useEffect(() => {
    document.documentElement.lang = language;
    validateTranslations();
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};