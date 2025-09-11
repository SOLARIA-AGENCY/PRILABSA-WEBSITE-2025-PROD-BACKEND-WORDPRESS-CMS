import { Product } from '../types/Product';
import { ProductLoader } from '../utils/ProductLoader';

// Legacy interface for backward compatibility
export interface Producto {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  features: string[];
  specifications: { [key: string]: string };
  price?: string;
  pdf?: string;
}

/**
 * Load dynamic products from ProductLoader
 */
export const loadDynamicProducts = (): Product[] => {
  return ProductLoader.loadAllProducts();
};

/**
 * Convert new Product interface to legacy Producto interface for backward compatibility
 */
export const convertToLegacyProduct = (product: Product): Producto => {
  // Convert specifications array to object
  const specificationsObj: { [key: string]: string } = {};
  product.specifications.forEach(spec => {
    specificationsObj[spec.key] = spec.value;
  });

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    longDescription: product.longDescription || product.description,
    image: product.image,
    category: product.category.toLowerCase(),
    features: product.benefits || [],
    specifications: specificationsObj,
    pdf: product.datasheetUrl
  };
};

/**
 * Get all products in legacy format for backward compatibility
 */
export const productosDinamicos: Producto[] = loadDynamicProducts().map(convertToLegacyProduct);

/**
 * Get all products in new format
 */
export const productosNuevos: Product[] = loadDynamicProducts();

// Export both for flexibility
export { productosNuevos as productos };