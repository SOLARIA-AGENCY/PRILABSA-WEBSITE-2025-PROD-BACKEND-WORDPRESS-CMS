import { Product } from '../types/Product';
import { OptimizedProduct, ProductImage, ProductPDF, ProductAssets, ProductMetadata } from '../data/products/types';

/**
 * Convierte un Product a OptimizedProduct para compatibilidad con componentes optimizados
 */
export function productToOptimized(product: Product): OptimizedProduct {
  // Crear imagen principal
  const mainImage: ProductImage = {
    filename: product.image.split('/').pop() || 'image.jpg',
    path: product.image,
    extension: product.image.split('.').pop() || 'jpg',
    size: 0,
    exists: true,
    webp: product.image.replace('.png', '.webp').replace('.jpg', '.webp'),
    fallback: product.image,
    thumbnail: product.image.replace('.png', '_thumb.png').replace('.jpg', '_thumb.jpg'),
    alt: `${product.name} - ${product.category}`,
    width: 400,
    height: 300
  };

  // Crear galería de imágenes
  const gallery: ProductImage[] = product.gallery.map(img => ({
    filename: img.split('/').pop() || 'image.jpg',
    path: img,
    extension: img.split('.').pop() || 'jpg',
    size: 0,
    exists: true,
    webp: img.replace('.png', '.webp').replace('.jpg', '.webp'),
    fallback: img,
    thumbnail: img.replace('.png', '_thumb.png').replace('.jpg', '_thumb.jpg'),
    alt: `${product.name} - Vista adicional`,
    width: 400,
    height: 300
  }));

  // Crear PDF si existe
  const pdf: ProductPDF | undefined = product.hasDatasheet && product.datasheetUrl ? {
    filename: `${product.productCode}_${product.name.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
    path: product.datasheetUrl,
    size: '2.5MB', // Estimado
    downloadUrl: product.datasheetUrl,
    exists: true,
    url: product.datasheetUrl,
    lastModified: product.lastUpdated
  } : undefined;

  // Crear assets
  const assets: ProductAssets = {
    id: product.id,
    images: {
      main: mainImage,
      gallery: gallery.length > 1 ? gallery.slice(1) : undefined
    },
    pdf,
    markdown: undefined // Se puede agregar después si es necesario
  };

  // Crear metadata
  const metadata: ProductMetadata = {
    priority: product.featured ? 1 : 5,
    featured: product.featured,
    lastUpdated: product.lastUpdated,
    searchTags: [...product.tags, ...product.keywords],
    category: product.category,
    subcategory: product.subcategory
  };

  // Retornar OptimizedProduct
  return {
    id: product.id,
    slug: product.slug,
    codigo: product.productCode,
    productCode: product.productCode,
    name: product.name,
    description: product.description,
    specifications: product.specifications,
    category: product.category,
    subcategory: product.subcategory,
    image: product.image,
    assets,
    metadata,
    benefits: product.benefits,
    presentation: product.presentation,
    tags: product.tags
  };
}

/**
 * Convierte un array de Products a OptimizedProducts
 */
export function productsToOptimized(products: Product[]): OptimizedProduct[] {
  return products.map(productToOptimized);
}

/**
 * Filtra productos optimizados por categoría
 */
export function filterOptimizedByCategory(products: OptimizedProduct[], category: string): OptimizedProduct[] {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
}

/**
 * Busca productos optimizados por término
 */
export function searchOptimizedProducts(products: OptimizedProduct[], query: string): OptimizedProduct[] {
  const searchTerm = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(searchTerm) ||
    p.description.toLowerCase().includes(searchTerm) ||
    (p.metadata.searchTags && p.metadata.searchTags.some(tag => tag.toLowerCase().includes(searchTerm)))
  );
}