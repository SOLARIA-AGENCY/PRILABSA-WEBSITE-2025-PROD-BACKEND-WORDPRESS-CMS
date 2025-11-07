/**
 * Product Adapter - Transform WordPress API responses to app types
 * PRILABSA Headless WordPress Integration
 * @author SOLARIA AGENCY
 */

import type {
  WordPressProduct,
  WordPressCategory,
  WordPressTag,
  WordPressMedia,
  TransformedProduct,
} from '../types/wordpress';

/**
 * Language codes supported by the app
 */
export type SupportedLanguage = 'es' | 'en' | 'pt';

/**
 * Get current app language (integration with i18next)
 */
export function getCurrentLanguage(): SupportedLanguage {
  // Check if i18next is available
  if (typeof window !== 'undefined' && (window as any).i18n) {
    const lang = (window as any).i18n.language;
    if (lang === 'en' || lang === 'pt') return lang;
  }

  // Check localStorage
  if (typeof window !== 'undefined') {
    const storedLang = localStorage.getItem('i18nextLng');
    if (storedLang === 'en' || storedLang === 'pt') return storedLang;
  }

  // Default to Spanish
  return 'es';
}

/**
 * Extract localized product name based on current language
 */
export function getLocalizedProductName(
  acf: WordPressProduct['acf'],
  language: SupportedLanguage = getCurrentLanguage()
): string {
  switch (language) {
    case 'en':
      return acf.nombre_producto_en || acf.nombre_producto_es;
    case 'pt':
      return acf.nombre_producto_pt || acf.nombre_producto_es;
    case 'es':
    default:
      return acf.nombre_producto_es;
  }
}

/**
 * Extract localized product description based on current language
 */
export function getLocalizedProductDescription(
  acf: WordPressProduct['acf'],
  language: SupportedLanguage = getCurrentLanguage()
): string {
  switch (language) {
    case 'en':
      return acf.descripcion_en || acf.descripcion_es;
    case 'pt':
      return acf.descripcion_pt || acf.descripcion_es;
    case 'es':
    default:
      return acf.descripcion_es;
  }
}

/**
 * Extract image URLs from WordPress Media IDs
 * Handles both embedded media and returns placeholder if not available
 */
export function extractImageUrls(
  product: WordPressProduct,
  size: 'thumbnail' | 'medium' | 'large' | 'full' = 'large'
): string[] {
  const imageUrls: string[] = [];

  // Get media IDs from ACF field
  const mediaIds = product.acf?.fotos || [];

  if (mediaIds.length === 0) {
    // Fallback to featured media if no ACF photos
    if (product._embedded && product._embedded['wp:featuredmedia']) {
      const featuredMedia = product._embedded['wp:featuredmedia'][0];
      if (featuredMedia?.source_url) {
        imageUrls.push(getMediaUrl(featuredMedia, size));
      }
    }
    return imageUrls;
  }

  // If media is embedded, extract URLs
  if (product._embedded && product._embedded['wp:featuredmedia']) {
    const embeddedMedia = product._embedded['wp:featuredmedia'];
    embeddedMedia.forEach((media) => {
      if (media.source_url) {
        imageUrls.push(getMediaUrl(media, size));
      }
    });
  }

  return imageUrls;
}

/**
 * Get media URL for specific size
 */
export function getMediaUrl(
  media: WordPressMedia,
  size: 'thumbnail' | 'medium' | 'large' | 'full' = 'large'
): string {
  // Check if specific size exists
  if (media.media_details?.sizes?.[size]?.source_url) {
    return media.media_details.sizes[size].source_url;
  }

  // Fallback to source URL
  return media.source_url;
}

/**
 * Extract PDF URL from WordPress Media ID
 */
export function extractPdfUrl(product: WordPressProduct): string | null {
  const pdfId = product.acf?.pdf;

  if (!pdfId) return null;

  // If media is embedded, extract PDF URL
  if (product._embedded && product._embedded['wp:featuredmedia']) {
    const pdfMedia = product._embedded['wp:featuredmedia'].find(
      (media) => media.id === pdfId && media.mime_type === 'application/pdf'
    );

    if (pdfMedia?.source_url) {
      return pdfMedia.source_url;
    }
  }

  // If not embedded, we'll need to construct URL or fetch separately
  // For now, return null (client will need to fetch if needed)
  return null;
}

/**
 * Extract categories from embedded data
 */
export function extractCategories(
  product: WordPressProduct
): Array<{ id: number; name: string; slug: string }> {
  if (!product._embedded || !product._embedded['wp:term']) {
    return [];
  }

  // WordPress embeds terms as nested arrays [categories, tags]
  const termsArrays = product._embedded['wp:term'];
  const categoriesArray = termsArrays.find((termArray) =>
    termArray.some((term) => term.taxonomy === 'categorias-productos')
  );

  if (!categoriesArray) return [];

  return (categoriesArray as WordPressCategory[]).map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
  }));
}

/**
 * Extract tags from embedded data
 */
export function extractTags(
  product: WordPressProduct
): Array<{ id: number; name: string; slug: string }> {
  if (!product._embedded || !product._embedded['wp:term']) {
    return [];
  }

  // WordPress embeds terms as nested arrays [categories, tags]
  const termsArrays = product._embedded['wp:term'];
  const tagsArray = termsArrays.find((termArray) =>
    termArray.some((term) => term.taxonomy === 'tags-productos')
  );

  if (!tagsArray) return [];

  return (tagsArray as WordPressTag[]).map((tag) => ({
    id: tag.id,
    name: tag.name,
    slug: tag.slug,
  }));
}

/**
 * Transform WordPress Product to App Product Type
 * Main adapter function
 */
export function transformProduct(
  product: WordPressProduct,
  language: SupportedLanguage = getCurrentLanguage()
): TransformedProduct {
  return {
    id: product.id,
    codigo: product.acf?.codigo || '',
    nombre: getLocalizedProductName(product.acf, language),
    descripcion: getLocalizedProductDescription(product.acf, language),
    imagenes: extractImageUrls(product, 'large'),
    pdfUrl: extractPdfUrl(product),
    slug: product.slug,
    marca: product.acf?.marca,
    categorias: extractCategories(product),
    tags: extractTags(product),
    fechaCreacion: product.date,
    fechaModificacion: product.modified,
  };
}

/**
 * Transform array of WordPress Products
 */
export function transformProducts(
  products: WordPressProduct[],
  language: SupportedLanguage = getCurrentLanguage()
): TransformedProduct[] {
  return products.map((product) => transformProduct(product, language));
}

/**
 * Get placeholder image URL when product has no images
 */
export function getPlaceholderImageUrl(): string {
  return '/images/placeholder-product.jpg';
}

/**
 * Format image URL with fallback
 */
export function getImageUrlWithFallback(imageUrl: string | undefined): string {
  if (!imageUrl || imageUrl === '') {
    return getPlaceholderImageUrl();
  }
  return imageUrl;
}

/**
 * Sanitize HTML description (basic sanitization)
 * For production, consider using DOMPurify or similar library
 */
export function sanitizeHtmlDescription(html: string): string {
  if (typeof window === 'undefined') return html;

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Remove script tags
  const scripts = tempDiv.querySelectorAll('script');
  scripts.forEach((script) => script.remove());

  // Remove inline event handlers
  const allElements = tempDiv.querySelectorAll('*');
  allElements.forEach((element) => {
    Array.from(element.attributes).forEach((attr) => {
      if (attr.name.startsWith('on')) {
        element.removeAttribute(attr.name);
      }
    });
  });

  return tempDiv.innerHTML;
}

/**
 * Strip HTML tags from description (for plain text excerpts)
 */
export function stripHtmlTags(html: string): string {
  if (typeof window === 'undefined') return html;

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Get product excerpt (plain text, truncated)
 */
export function getProductExcerpt(
  product: WordPressProduct,
  maxLength = 150,
  language: SupportedLanguage = getCurrentLanguage()
): string {
  const description = getLocalizedProductDescription(product.acf, language);
  const plainText = stripHtmlTags(description);
  return truncateText(plainText, maxLength);
}

/**
 * Check if product has images
 */
export function hasProductImages(product: WordPressProduct): boolean {
  const imageUrls = extractImageUrls(product);
  return imageUrls.length > 0;
}

/**
 * Check if product has PDF
 */
export function hasProductPdf(product: WordPressProduct): boolean {
  return !!product.acf?.pdf;
}

/**
 * Get category names as comma-separated string
 */
export function getCategoryNamesString(product: WordPressProduct): string {
  const categories = extractCategories(product);
  return categories.map((cat) => cat.name).join(', ');
}

/**
 * Get tag names as comma-separated string
 */
export function getTagNamesString(product: WordPressProduct): string {
  const tags = extractTags(product);
  return tags.map((tag) => tag.name).join(', ');
}

/**
 * Format date to locale string
 */
export function formatProductDate(
  dateString: string,
  locale: string = 'es-ES'
): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Export all utilities
 */
export const productAdapter = {
  getCurrentLanguage,
  getLocalizedProductName,
  getLocalizedProductDescription,
  extractImageUrls,
  extractPdfUrl,
  extractCategories,
  extractTags,
  transformProduct,
  transformProducts,
  getPlaceholderImageUrl,
  getImageUrlWithFallback,
  sanitizeHtmlDescription,
  stripHtmlTags,
  truncateText,
  getProductExcerpt,
  hasProductImages,
  hasProductPdf,
  getCategoryNamesString,
  getTagNamesString,
  formatProductDate,
};

export default productAdapter;
