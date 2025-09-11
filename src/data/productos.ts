// Archivo de productos base - Preparado para nueva ingesta
// Este archivo será reemplazado por el sistema de ingesta automática

import { OptimizedProduct } from './products/types';

// Array de productos - será poblado por el sistema de ingesta
export const productos: OptimizedProduct[] = [];

// Exportación por defecto para compatibilidad
export default productos;

// Función temporal para obtener productos (será reemplazada)
export function getProductos(): OptimizedProduct[] {
  return productos;
}

// Función temporal para obtener productos por categoría
export function getProductosByCategory(category: string): OptimizedProduct[] {
  return productos.filter(producto => producto.category === category);
}