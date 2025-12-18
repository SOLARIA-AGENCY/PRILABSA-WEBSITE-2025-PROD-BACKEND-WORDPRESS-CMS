/**
 * WordPress to OptimizedProduct Adapter
 * Transforms WordPress REST API product data to frontend OptimizedProduct format
 */

import type { WordPressProduct, WordPressLanguage } from '../types/wordpress';
import type { OptimizedProduct, ProductAssets, CLASIFICACIONES } from '../data/products/types';

// Category classification mapping
const CATEGORY_CLASIFICACIONES: Record<string, number> = {
  aditivos: 1,
  alimentos: 2,
  probioticos: 3,
  quimicos: 4,
  equipos: 5,
};

/**
 * Strip HTML tags from a string
 */
const stripHtml = (html: string | null): string => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
};

/**
 * Parse HTML list to string array
 */
const parseHtmlList = (html: string | null): string[] => {
  if (!html) return [];

  // Extract list items from HTML
  const liMatches = html.match(/<li[^>]*>(.*?)<\/li>/gi);
  if (liMatches) {
    return liMatches.map(li => stripHtml(li)).filter(Boolean);
  }

  // Fallback: split by newlines if no list items
  return html.split(/\n/).map(stripHtml).filter(Boolean);
};

/**
 * Parse specifications HTML to key-value pairs
 * Expects format: <li><strong>Key:</strong> Value</li>
 */
const parseSpecifications = (html: string | null): Array<{ key: string; value: string }> => {
  if (!html) return [];

  const specs: Array<{ key: string; value: string }> = [];
  const liMatches = html.match(/<li[^>]*>(.*?)<\/li>/gi);

  if (liMatches) {
    for (const li of liMatches) {
      // Try to extract <strong>Key:</strong> Value pattern
      const strongMatch = li.match(/<strong>([^<]+)<\/strong>\s*(.*)/i);
      if (strongMatch) {
        const key = strongMatch[1].replace(/:$/, '').trim();
        const value = stripHtml(strongMatch[2]).trim();
        if (key && value) {
          specs.push({ key, value });
        }
      } else {
        // Fallback: try to split by colon
        const text = stripHtml(li);
        const colonIndex = text.indexOf(':');
        if (colonIndex > 0) {
          specs.push({
            key: text.substring(0, colonIndex).trim(),
            value: text.substring(colonIndex + 1).trim(),
          });
        }
      }
    }
  }

  return specs;
};

/**
 * Generate a URL-friendly slug from text
 */
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

/**
 * Get benefits array from WordPress product
 */
const getBenefits = (product: WordPressProduct, lang: WordPressLanguage = 'es'): string[] => {
  const acf = product.acf || product;
  const suffix = lang === 'es' ? '_es' : lang === 'en' ? '_en' : '_pt';

  const benefits: string[] = [];
  for (let i = 1; i <= 3; i++) {
    const key = `beneficio_${i}${suffix}` as keyof typeof acf;
    const value = acf[key];
    if (value && typeof value === 'string' && value.trim()) {
      benefits.push(value.trim());
    }
  }
  return benefits;
};

/**
 * Get localized text from product
 */
const getLocalizedText = (
  product: WordPressProduct,
  field: 'nombre_producto' | 'descripcion' | 'presentacion' | 'descripcion_corta' | 'especificaciones',
  lang: WordPressLanguage = 'es'
): string => {
  const acf = product.acf || product;
  const key = `${field}_${lang}` as keyof typeof acf;
  const fallbackKey = `${field}_es` as keyof typeof acf;

  const value = acf[key] || acf[fallbackKey];
  return typeof value === 'string' ? value : '';
};

/**
 * Sanitize product name for filename generation
 */
const sanitizeForFilename = (name: string): string => {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[\/]/g, '_') // Replace slashes with underscores
    .replace(/[^a-zA-Z0-9\s_]/g, '') // Remove other special chars (keep underscores)
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/_+/g, '_') // Collapse multiple underscores
    .trim();
};

/**
 * Generate PDF filename from product code and name
 * Pattern: {CODE}_{NAME_SANITIZED}.pdf
 */
const generatePdfFilename = (code: string, name: string): string => {
  return `${code}_${sanitizeForFilename(name)}.pdf`;
};

/**
 * Generate Image filename from product code and name
 * Pattern: {CODE}_{NAME_SANITIZED}.png
 */
const generateImageFilename = (code: string, name: string): string => {
  return `${code}_${sanitizeForFilename(name)}.png`;
};

/**
 * Build product assets from WordPress data
 */
const buildAssets = (product: WordPressProduct, productName: string): ProductAssets => {
  const acf = product.acf || product;
  const imagen = acf.imagen_producto || product.imagen_producto;
  const codigo = acf.codigo || product.codigo || '';

  const assets: ProductAssets = {};

  if (imagen) {
    // Use WordPress media library image (ACF field object)
    assets.images = {
      main: {
        filename: imagen.filename,
        path: imagen.url,
        extension: imagen.subtype || 'png',
        size: imagen.filesize || 0,
        exists: true,
        alt: imagen.alt || imagen.title || '',
        width: imagen.width,
        height: imagen.height,
        thumbnail: imagen.sizes?.thumbnail,
        webp: undefined,
      },
      gallery: [],
    };
    assets.image = assets.images.main;
  } else if (product.featured_image_url) {
    // Use WordPress featured image URL (from featured_media)
    assets.images = {
      main: {
        filename: product.featured_image_url.split('/').pop() || 'product-image.png',
        path: product.featured_image_url,
        extension: 'png',
        size: 0,
        exists: true,
        alt: productName,
        width: product.featured_image_sizes?.large?.width,
        height: product.featured_image_sizes?.large?.height,
        thumbnail: product.featured_image_sizes?.thumbnail?.url,
        webp: undefined,
      },
      gallery: [],
    };
    assets.image = assets.images.main;
  } else if (codigo && productName) {
    // Fallback to static image based on product code
    const imageFilename = generateImageFilename(codigo, productName);
    const imagePath = `/assets/images/productos/${imageFilename}`;
    assets.images = {
      main: {
        filename: imageFilename,
        path: imagePath,
        extension: 'png',
        size: 0,
        exists: true,
        alt: productName,
        width: undefined,
        height: undefined,
        thumbnail: undefined,
        webp: undefined,
      },
      gallery: [],
    };
    assets.image = assets.images.main;
  }

  // PDF datasheet - try WordPress field first, then generate fallback from code
  const pdfUrl = acf.ficha_tecnica_pdf || product.ficha_tecnica_pdf;
  if (pdfUrl && typeof pdfUrl === 'string') {
    assets.pdf = {
      filename: pdfUrl.split('/').pop() || 'ficha-tecnica.pdf',
      path: pdfUrl,
      size: 'Unknown',
      downloadUrl: pdfUrl,
      exists: true,
      url: pdfUrl,
    };
  } else if (codigo && productName) {
    // Generate PDF path based on product code (fallback to static PDFs)
    const pdfFilename = generatePdfFilename(codigo, productName);
    const pdfPath = `/assets/pdfs/productos/${pdfFilename}`;
    assets.pdf = {
      filename: pdfFilename,
      path: pdfPath,
      size: 'Unknown',
      downloadUrl: pdfPath,
      exists: true, // Assume exists - will fallback gracefully if not
      url: pdfPath,
    };
  }

  return assets;
};

/**
 * Generate a short description from full description (first sentence, max 150 chars)
 */
const generateShortDescription = (fullDescription: string | undefined): string => {
  if (!fullDescription) return '';

  const clean = stripHtml(fullDescription);
  if (!clean) return '';

  // Try to get first sentence
  const sentenceMatch = clean.match(/^[^.!?]+[.!?]/);
  if (sentenceMatch && sentenceMatch[0].length <= 200) {
    return sentenceMatch[0].trim();
  }

  // Fallback: first 150 chars + ellipsis
  if (clean.length <= 150) return clean;
  return clean.substring(0, 147).trim() + '...';
};

/**
 * Get short description - from WordPress field or generate from description
 */
const getShortDescription = (product: WordPressProduct, lang: WordPressLanguage): string => {
  // Try to get from WordPress ACF field first
  const wpShort = getLocalizedText(product, 'descripcion_corta', lang);
  if (wpShort && wpShort.trim()) {
    return stripHtml(wpShort);
  }

  // Generate from full description
  const fullDesc = getLocalizedText(product, 'descripcion', lang);
  return generateShortDescription(fullDesc);
};

/**
 * Convert a single WordPress product to OptimizedProduct
 */
export const wordpressToOptimizedProduct = (
  product: WordPressProduct,
  lang: WordPressLanguage = 'es'
): OptimizedProduct => {
  const acf = product.acf || product;
  const codigo = acf.codigo || product.codigo || `WP${product.id}`;
  const categoria = (acf.categoria || product.categoria || 'otros').toLowerCase();

  // Get localized content
  const name = getLocalizedText(product, 'nombre_producto', lang) || product.title.rendered;
  const description = getLocalizedText(product, 'descripcion', lang);
  const shortDescription = getShortDescription(product, lang);
  const presentationHtml = getLocalizedText(product, 'presentacion', lang);

  // Parse presentation HTML to array
  const presentation = parseHtmlList(presentationHtml);

  // Get specifications from WordPress (parsed as key-value pairs)
  const specificationsHtml = getLocalizedText(product, 'especificaciones', lang);
  const specifications = parseSpecifications(specificationsHtml);

  // Get benefits
  const benefits = getBenefits(product, lang);

  // Build assets (pass name for image/PDF fallback generation)
  const assets = buildAssets(product, name);

  // Build image URL - use WordPress image or fallback from assets
  const imagen = acf.imagen_producto || product.imagen_producto;
  const imageUrl = imagen?.url ||
    product.featured_image_url ||
    (product.featured_image_sizes?.large?.url) ||
    assets.image?.path || // Use generated fallback path
    undefined;

  return {
    id: codigo,
    slug: product.slug || generateSlug(name),
    codigo: codigo,
    productCode: codigo,
    name: name,
    description: stripHtml(description) || shortDescription || '',
    specifications: specifications, // Parsed from especificaciones_{lang} ACF field
    category: categoria,
    subcategory: undefined, // Could be derived from tags
    clasificacion: CATEGORY_CLASIFICACIONES[categoria] || 0,
    image: imageUrl,
    assets: assets,
    metadata: {
      lastModified: new Date(product.modified),
      autoGenerated: false,
      needsReview: false,
      completenessScore: calculateCompleteness(product),
      featured: false, // Could be determined by a custom field
      priority: 0,
      lastUpdated: product.modified,
      searchTags: [categoria, codigo],
      category: categoria,
    },
    seo: {
      title: `${name} | PRILABSA`,
      description: (shortDescription || description).substring(0, 160),
      keywords: [categoria, 'prilabsa', 'acuicultura'],
    },
    benefits: benefits,
    presentation: presentation,
    tags: [categoria],
    translations: {
      es: {
        name: getLocalizedText(product, 'nombre_producto', 'es') || name,
        description: stripHtml(getLocalizedText(product, 'descripcion', 'es')),
        shortDescription: getShortDescription(product, 'es'),
        benefits: getBenefits(product, 'es'),
        presentation: parseHtmlList(getLocalizedText(product, 'presentacion', 'es')),
        specifications: parseSpecifications(getLocalizedText(product, 'especificaciones', 'es')),
      },
      en: {
        name: getLocalizedText(product, 'nombre_producto', 'en') || name,
        description: stripHtml(getLocalizedText(product, 'descripcion', 'en')),
        shortDescription: getShortDescription(product, 'en'),
        benefits: getBenefits(product, 'en'),
        presentation: parseHtmlList(getLocalizedText(product, 'presentacion', 'en')),
        specifications: parseSpecifications(getLocalizedText(product, 'especificaciones', 'en')),
      },
      pt: {
        name: getLocalizedText(product, 'nombre_producto', 'pt') || name,
        description: stripHtml(getLocalizedText(product, 'descripcion', 'pt')),
        shortDescription: getShortDescription(product, 'pt'),
        benefits: getBenefits(product, 'pt'),
        presentation: parseHtmlList(getLocalizedText(product, 'presentacion', 'pt')),
        specifications: parseSpecifications(getLocalizedText(product, 'especificaciones', 'pt')),
      },
    },
  };
};

/**
 * Convert multiple WordPress products to OptimizedProduct array
 */
export const wordpressToOptimizedProducts = (
  products: WordPressProduct[],
  lang: WordPressLanguage = 'es'
): OptimizedProduct[] => {
  return products
    .filter(p => p.acf?.codigo || p.codigo) // Only include products with codes
    .map(p => wordpressToOptimizedProduct(p, lang))
    .sort((a, b) => a.codigo.localeCompare(b.codigo));
};

/**
 * Calculate product data completeness score (0-100)
 */
const calculateCompleteness = (product: WordPressProduct): number => {
  const acf = product.acf || product;
  let score = 0;
  const total = 12;

  // Required fields
  if (acf.codigo) score++;
  if (acf.categoria) score++;
  if (acf.nombre_producto_es) score++;
  if (acf.descripcion_es) score++;

  // Optional but valuable fields
  if (acf.imagen_producto || product.imagen_producto) score++;
  if (acf.beneficio_1_es) score++;
  if (acf.presentacion_es) score++;
  if (acf.ficha_tecnica_pdf) score++;
  if (acf.descripcion_corta_es) score++;
  if (acf.especificaciones_es) score++;

  // Translations (bonus)
  if (acf.nombre_producto_en) score++;
  if (acf.nombre_producto_pt) score++;

  return Math.round((score / total) * 100);
};

/**
 * Group products by category
 */
export const groupProductsByCategory = (
  products: OptimizedProduct[]
): Record<string, OptimizedProduct[]> => {
  return products.reduce((acc, product) => {
    const category = product.category || 'otros';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, OptimizedProduct[]>);
};

export default {
  wordpressToOptimizedProduct,
  wordpressToOptimizedProducts,
  groupProductsByCategory,
};
