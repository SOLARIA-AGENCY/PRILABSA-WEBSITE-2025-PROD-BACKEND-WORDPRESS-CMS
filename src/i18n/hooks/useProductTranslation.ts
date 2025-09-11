import { useTranslation } from 'react-i18next';
import { useCallback, useEffect } from 'react';
import { loadNamespaceOnDemand, SupportedLanguages } from '../config';

export interface ProductTranslationResult {
  t: (key: string, options?: any) => string;
  ready: boolean;
  getProductText: (key: string, fallback?: string) => string;
  formatProductDescription: (productId: string) => {
    title: string;
    description: string;
    features: string[];
    downloadText: string;
  };
  currentLanguage: SupportedLanguages;
  changeLanguage: (lng: SupportedLanguages) => Promise<void>;
}

export const useProductTranslation = (): ProductTranslationResult => {
  const { t, i18n, ready } = useTranslation(['products', 'common']);
  
  // Preload products namespace if not loaded
  useEffect(() => {
    const currentLang = i18n.language as SupportedLanguages;
    
    if (!i18n.hasResourceBundle(currentLang, 'products')) {
      loadNamespaceOnDemand('products', currentLang);
    }
  }, [i18n, i18n.language]);
  
  const getProductText = useCallback((key: string, fallback?: string) => {
    // Try products namespace first, fallback to common
    let result = t(`products:${key}`, { defaultValue: null });
    
    if (!result || result === key) {
      result = t(`common:${key}`, { defaultValue: fallback || key });
    }
    
    return result;
  }, [t]);
  
  const formatProductDescription = useCallback((productId: string) => {
    return {
      title: getProductText(`${productId}.title`),
      description: getProductText(`${productId}.description`),
      features: getProductText(`${productId}.features`, '').split(';').filter(f => f.trim()),
      downloadText: getProductText('common.download', t('common:buttons.download', 'Descargar'))
    };
  }, [getProductText, t]);
  
  const changeLanguage = useCallback(async (lng: SupportedLanguages): Promise<void> => {
    // Load products namespace for the new language
    await loadNamespaceOnDemand('products', lng);
    await i18n.changeLanguage(lng);
  }, [i18n]);
  
  return {
    t,
    ready,
    getProductText,
    formatProductDescription,
    currentLanguage: i18n.language as SupportedLanguages,
    changeLanguage
  };
};