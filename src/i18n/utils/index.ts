import { loadNamespaceOnDemand, SupportedLanguages, Namespaces } from '../config';

// Utility to preload multiple namespaces for better UX
export const preloadNamespaces = async (
  namespaces: Namespaces[], 
  language?: SupportedLanguages
) => {
  try {
    await Promise.all(
      namespaces.map(namespace => loadNamespaceOnDemand(namespace, language))
    );
  } catch (error) {
    console.error('Failed to preload namespaces:', error);
  }
};

// Utility to get available languages
export const getAvailableLanguages = (): SupportedLanguages[] => {
  return ['es', 'en', 'pt'];
};

// Utility to get language display names
export const getLanguageDisplayName = (
  language: SupportedLanguages, 
  inLanguage?: SupportedLanguages
): string => {
  const names = {
    es: { es: 'Español', en: 'Spanish', pt: 'Espanhol' },
    en: { es: 'Inglés', en: 'English', pt: 'Inglês' },
    pt: { es: 'Portugués', en: 'Portuguese', pt: 'Português' }
  };
  
  return names[language][inLanguage || language];
};

// Utility to validate language code
export const isValidLanguage = (lang: string): lang is SupportedLanguages => {
  return ['es', 'en', 'pt'].includes(lang);
};

// Utility to get namespace priority for loading
export const getNamespacePriority = (namespace: Namespaces): number => {
  const priorities = {
    common: 1,      // Load first - most used
    navigation: 2,  // Load second - needed for navigation
    products: 3,    // Load third - product pages
    pages: 4        // Load last - specific pages
  };
  
  return priorities[namespace] || 999;
};

// Export types
export type { SupportedLanguages, Namespaces } from '../config';