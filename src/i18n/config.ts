import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Types for language resources
export type SupportedLanguages = 'es' | 'en' | 'pt';
export type Namespaces = 'common' | 'navigation' | 'products' | 'pages';

// Lazy loading function for locale messages
const loadLocaleMessages = async (locale: SupportedLanguages, namespace: Namespaces) => {
  try {
    const messages = await import(`./locales/${locale}/${namespace}.json`);
    return messages.default;
  } catch (error) {
    console.warn(`Failed to load ${locale}/${namespace}.json`, error);
    return {};
  }
};

// Language detector configuration
const detectionOptions = {
  order: ['localStorage', 'navigator', 'htmlTag'],
  lookupLocalStorage: 'i18nextLng',
  caches: ['localStorage'],
  excludeCacheFor: ['cimode'],
  checkWhitelist: true
};

// i18n configuration
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    lng: 'es',
    
    // Supported languages
    supportedLngs: ['es', 'en', 'pt'],
    
    // Namespace configuration
    defaultNS: 'common',
    ns: ['common', 'navigation', 'products', 'pages'],
    
    // Detection options
    detection: detectionOptions,
    
    // Performance optimizations
    load: 'languageOnly', // Only load 'en' not 'en-US'
    preload: ['es'], // Only preload default language
    
    // Resource configuration - empty initial resources for lazy loading
    resources: {},
    
    interpolation: {
      escapeValue: false // React already escapes
    },
    
    react: {
      useSuspense: true, // Enable suspense mode
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p']
    },
    
    // Debug mode in development
    debug: process.env.NODE_ENV === 'development'
  });

// Enhanced resource loader with caching
const resourceCache = new Map<string, any>();

export const loadNamespaceResources = async (
  language: SupportedLanguages, 
  namespace: Namespaces
): Promise<void> => {
  const cacheKey = `${language}-${namespace}`;
  
  // Check cache first
  if (resourceCache.has(cacheKey)) {
    return;
  }
  
  // Check if already loaded in i18n
  if (i18n.hasResourceBundle(language, namespace)) {
    resourceCache.set(cacheKey, true);
    return;
  }
  
  try {
    const resources = await loadLocaleMessages(language, namespace);
    
    // Add resources to i18n
    i18n.addResourceBundle(language, namespace, resources, true, true);
    
    // Cache the fact that we've loaded this resource
    resourceCache.set(cacheKey, true);
    
    console.log(`✅ Loaded ${language}/${namespace} resources`);
  } catch (error) {
    console.error(`❌ Failed to load ${language}/${namespace}:`, error);
  }
};

// Preload essential namespaces for current language
export const preloadEssentialNamespaces = async (language: SupportedLanguages = 'es') => {
  const essentialNamespaces: Namespaces[] = ['common', 'navigation'];
  
  await Promise.all(
    essentialNamespaces.map(namespace => loadNamespaceResources(language, namespace))
  );
};

// Load namespace on demand
export const loadNamespaceOnDemand = async (namespace: Namespaces, language?: SupportedLanguages) => {
  const currentLang = language || i18n.language as SupportedLanguages;
  await loadNamespaceResources(currentLang, namespace);
};

// Initialize essential resources
preloadEssentialNamespaces();

export default i18n;