// Archivo principal para la gestión de productos
// Preparado para nueva ingesta de datos

import { OptimizedProduct, ProductFilter, ProductSearchResult, ProductRegistry } from './types';

// Importación del nuevo catálogo de productos
import { productsJulio2025 } from './julio-2025';

// Registro de productos - poblado con el catálogo de Julio 2025
export const PRODUCTS_REGISTRY: OptimizedProduct[] = productsJulio2025 || [];

// Estadísticas del registro - será actualizado automáticamente
export const REGISTRY_STATS = {
  totalProducts: 0,
  totalAssets: 0,
  completenessRate: 0,
  categoryBreakdown: {
    aditivos: { total: 0, complete: 0 },
    alimentos: { total: 0, complete: 0 },
    probioticos: { total: 0, complete: 0 },
    quimicos: { total: 0, complete: 0 },
    equipos: { total: 0, complete: 0 }
  }
};

// Función para obtener todos los productos
export function getAllProducts(): OptimizedProduct[] {
  return PRODUCTS_REGISTRY;
}

// Función para obtener productos por categoría
export function getProductsByCategory(categoria: string): OptimizedProduct[] {
  return PRODUCTS_REGISTRY.filter(product => product.category === categoria);
}

// Función para buscar productos
export function searchProducts(query: string): OptimizedProduct[] {
  if (!query.trim()) return PRODUCTS_REGISTRY;
  
  const searchTerm = query.toLowerCase();
  return PRODUCTS_REGISTRY.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    (product.codigo && product.codigo.toLowerCase().includes(searchTerm)) ||
    (product.productCode && product.productCode.toLowerCase().includes(searchTerm)) ||
    product.category.toLowerCase().includes(searchTerm)
  );
}

// Función para obtener producto por ID
export function getProductById(id: string): OptimizedProduct | undefined {
  return PRODUCTS_REGISTRY.find(product => product.id === id);
}

// Función para obtener producto por código
export function getProductByCode(codigo: string): OptimizedProduct | undefined {
  return PRODUCTS_REGISTRY.find(product => product.codigo === codigo || product.productCode === codigo);
}

// Función para validar producto
export function validateProduct(product: OptimizedProduct): boolean {
  return !!(product.id && product.name && product.category && product.codigo);
}

// Función para obtener categorías disponibles
export function getAvailableCategories(): string[] {
  const categories = new Set(PRODUCTS_REGISTRY.map(product => product.category));
  return Array.from(categories).sort();
}

// Función para filtrar productos
export function filterProducts(filter: ProductFilter): ProductSearchResult {
  let filteredProducts = PRODUCTS_REGISTRY;

  if (filter.category) {
    filteredProducts = filteredProducts.filter(product => product.category === filter.category);
  }

  if (filter.subcategory) {
    filteredProducts = filteredProducts.filter(product => product.subcategory === filter.subcategory);
  }

  if (filter.searchQuery) {
    filteredProducts = searchProducts(filter.searchQuery);
  }

  if (filter.featured !== undefined) {
    filteredProducts = filteredProducts.filter(product => product.metadata.featured === filter.featured);
  }

  if (filter.tags && filter.tags.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.tags?.some(tag => filter.tags!.includes(tag))
    );
  }

  return {
    products: filteredProducts,
    totalCount: filteredProducts.length,
    hasMore: false,
    filters: filter
  };
}

// Función para obtener estadísticas del registro
export function getRegistryStats() {
  return REGISTRY_STATS;
}