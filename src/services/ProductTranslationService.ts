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
   */
  public getTranslatedField(
    product: OptimizedProduct,
    field: keyof ProductTranslationContent,
    language: SupportedLanguage
  ): any {
    // Optimize: avoid loading large translations chunk for Spanish (base data)
    if (language === 'es') {
      switch (field) {
        case 'name':
          return product.name;
        case 'description':
          return product.description;
        case 'benefits':
          return product.benefits || [];
        case 'presentation':
          return product.presentation || [];
        case 'specifications':
          return product.specifications || [];
        default:
          return null;
      }
    }

    const translation = this.getProductTranslation(product.id, language);
    if (translation && translation[field]) {
      return translation[field];
    }

    // Fallback to original product data (base)
    switch (field) {
      case 'name':
        return product.name;
      case 'description':
        return product.description;
      case 'benefits':
        return product.benefits || [];
      case 'presentation':
        return product.presentation || [];
      case 'specifications':
        return product.specifications || [];
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
