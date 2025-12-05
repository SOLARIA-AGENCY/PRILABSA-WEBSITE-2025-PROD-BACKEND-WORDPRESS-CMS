import { SupportedLanguage, OptimizedProduct, ProductTranslationContent, TranslationStatus } from '../data/products/types';
import { productTranslations } from '../data/products/product-translations';

/**
 * Enhanced Product Translation Service
 * Handles multilingual product content with fallback mechanisms
 */
export class ProductTranslationService {
  private static instance: ProductTranslationService;
  private translationCache: Map<string, ProductTranslationContent> = new Map();
  
  public static getInstance(): ProductTranslationService {
    if (!this.instance) {
      this.instance = new ProductTranslationService();
    }
    return this.instance;
  }

  /**
   * Get translated product content with intelligent fallbacks
   */
  public getProductTranslation(
    productId: string, 
    language: SupportedLanguage
  ): ProductTranslationContent | null {
    const cacheKey = `${productId}-${language}`;
    
    // Check cache first
    if (this.translationCache.has(cacheKey)) {
      return this.translationCache.get(cacheKey)!;
    }

    // Check existing translations
    const productTranslation = productTranslations[productId];
    if (productTranslation && productTranslation[language]) {
      const translation = productTranslation[language];
      this.translationCache.set(cacheKey, translation);
      return translation;
    }

    // Log missing translation for future implementation
    console.info(`Translation needed for product ${productId} in ${language}`);
    return null;
  }

  /**
   * Get translated field with fallback to Spanish
   * Uses product.codigo (e.g., "QU017") for static translation lookup, not WordPress post ID
   */
  public getTranslatedField(
    product: OptimizedProduct,
    field: keyof ProductTranslationContent,
    language: SupportedLanguage
  ): any {
    // Use product code (QU017, AD001, etc.) for static translation lookup
    const productCode = (product as any).codigo || (product as any).productCode || product.id;

    // Helper: get static translation for any language
    const getStaticField = (lang: SupportedLanguage): any => {
      const staticTranslation = this.getProductTranslation(productCode, lang);
      return staticTranslation?.[field] ?? null;
    };

    // Helper: check if array/value is empty
    const isEmpty = (val: any): boolean => {
      if (val === null || val === undefined) return true;
      if (Array.isArray(val)) return val.length === 0;
      if (typeof val === 'string') return val.trim() === '';
      return false;
    };

    // For Spanish, try WordPress first, then fallback to static
    if (language === 'es') {
      switch (field) {
        case 'name':
          return product.name;
        case 'description':
          return product.description;
        case 'shortDescription':
          return product.translations?.es?.shortDescription || product.description?.substring(0, 150) || '';
        case 'benefits': {
          const wpBenefits = product.benefits;
          return !isEmpty(wpBenefits) ? wpBenefits : (getStaticField('es') || []);
        }
        case 'presentation': {
          const wpPresentation = product.presentation;
          return !isEmpty(wpPresentation) ? wpPresentation : (getStaticField('es') || []);
        }
        case 'specifications': {
          // WordPress ACF specifications may be empty - fallback to static
          const wpSpecs = product.specifications;
          return !isEmpty(wpSpecs) ? wpSpecs : (getStaticField('es') || []);
        }
        default:
          return null;
      }
    }

    // For other languages, check static translations first
    const translation = this.getProductTranslation(productCode, language);
    if (translation && translation[field]) {
      return translation[field];
    }

    // Fallback to Spanish static, then WordPress data
    const spanishStatic = getStaticField('es');

    switch (field) {
      case 'name':
        return product.name;
      case 'description':
        return product.description;
      case 'shortDescription':
        return product.translations?.es?.shortDescription || product.description?.substring(0, 150) || '';
      case 'benefits': {
        const wpBenefits = product.benefits;
        return !isEmpty(wpBenefits) ? wpBenefits : (spanishStatic || []);
      }
      case 'presentation': {
        const wpPresentation = product.presentation;
        return !isEmpty(wpPresentation) ? wpPresentation : (spanishStatic || []);
      }
      case 'specifications': {
        const wpSpecs = product.specifications;
        return !isEmpty(wpSpecs) ? wpSpecs : (spanishStatic || []);
      }
      default:
        return null;
    }
  }

  /**
   * Check if product has translation for specific language
   */
  public hasTranslation(productId: string, language: SupportedLanguage): boolean {
    return productId in productTranslations && 
           !!productTranslations[productId][language];
  }

  /**
   * Get translation completeness for a product
   */
  public getTranslationStatus(productId: string): TranslationStatus[] {
    const languages: SupportedLanguage[] = ['es', 'en', 'pt'];
    return languages.map(lang => ({
      language: lang,
      completed: lang === 'es' || this.hasTranslation(productId, lang),
      quality: lang === 'es' ? 'human' : (this.hasTranslation(productId, lang) ? 'human' : 'auto'),
      lastUpdated: new Date()
    }));
  }

  /**
   * Batch translation status for multiple products
   */
  public getBatchTranslationStatus(productIds: string[]): Record<string, TranslationStatus[]> {
    return productIds.reduce((acc, id) => {
      acc[id] = this.getTranslationStatus(id);
      return acc;
    }, {} as Record<string, TranslationStatus[]>);
  }

  /**
   * Get products missing translations
   */
  public getProductsMissingTranslations(
    products: OptimizedProduct[], 
    language: SupportedLanguage
  ): OptimizedProduct[] {
    if (language === 'es') return []; // Spanish is always available
    
    return products.filter(product => !this.hasTranslation(product.id, language));
  }

  /**
   * Clear translation cache
   */
  public clearCache(): void {
    this.translationCache.clear();
  }

  /**
   * Preload translations for products
   */
  public preloadTranslations(productIds: string[], language: SupportedLanguage): void {
    productIds.forEach(id => {
      this.getProductTranslation(id, language);
    });
  }
}

export default ProductTranslationService.getInstance();
