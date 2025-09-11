import { createContext } from 'react';
import { OptimizedProduct } from '../data/products/types';

// Definimos la interfaz para un item de la cotización
export interface ItemCotizacion {
  producto: OptimizedProduct;
  cantidad: number;
}

// Definimos la interfaz para el contexto
export interface CotizacionContextType {
  items: ItemCotizacion[];
  agregarProducto: (producto: OptimizedProduct, cantidad: number) => void;
  eliminarProducto: (idProducto: string) => void;
  actualizarCantidad: (idProducto: string, cantidad: number) => void;
  limpiarCotizacion: () => void;
  getItemCount: () => number;
}

// Creamos el contexto con un valor por defecto
export const CotizacionContext = createContext<CotizacionContextType | null>(null);
