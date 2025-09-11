import { useTranslation } from 'react-i18next';
import { useCallback, useEffect } from 'react';
import { loadNamespaceOnDemand, SupportedLanguages } from '../config';

export interface PageTranslationResult {
  t: (key: string, options?: any) => string;
  ready: boolean;
  getPageText: (pageKey: string, textKey: string, fallback?: string) => string;
  currentLanguage: SupportedLanguages;
  changeLanguage: (lng: SupportedLanguages) => Promise<void>;
}

export const usePageTranslation = (requiredNamespaces: string[] = ['pages', 'common']): PageTranslationResult => {
  const { t, i18n, ready } = useTranslation(requiredNamespaces);
  
  // Preload required namespaces if not loaded
  useEffect(() => {
    const currentLang = i18n.language as SupportedLanguages;
    
    requiredNamespaces.forEach(namespace => {
      if (!i18n.hasResourceBundle(currentLang, namespace)) {
        loadNamespaceOnDemand(namespace as any, currentLang);
      }
    });
  }, [i18n, i18n.language, requiredNamespaces]);
  
  const getPageText = useCallback((pageKey: string, textKey: string, fallback?: string) => {
    // Try pages namespace first
    let result = t(`pages:${pageKey}.${textKey}`, { defaultValue: null });
    
    // Fallback to common namespace
    if (!result || result === `${pageKey}.${textKey}`) {
      result = t(`common:${textKey}`, { defaultValue: fallback || textKey });
    }
    
    return result;
  }, [t]);
  
  const changeLanguage = useCallback(async (lng: SupportedLanguages): Promise<void> => {
    // Load required namespaces for the new language
    await Promise.all(
      requiredNamespaces.map(namespace => loadNamespaceOnDemand(namespace as any, lng))
    );
    await i18n.changeLanguage(lng);
  }, [i18n, requiredNamespaces]);
  
  return {
    t,
    ready,
    getPageText,
    currentLanguage: i18n.language as SupportedLanguages,
    changeLanguage
  };
};