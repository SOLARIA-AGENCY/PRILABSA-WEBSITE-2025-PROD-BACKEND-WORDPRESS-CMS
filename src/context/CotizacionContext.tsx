import React, { useState, ReactNode } from 'react';
import { OptimizedProduct } from '../data/products/types';
import { CotizacionContext, ItemCotizacion } from './cotizacionDefinition';

// Creamos el proveedor del contexto
export const CotizacionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ItemCotizacion[]>([]);

  const agregarProducto = (producto: OptimizedProduct, cantidad: number) => {
    setItems(prevItems => {
      const itemExistente = prevItems.find(item => item.producto.id === producto.id);
      if (itemExistente) {
        // Si el item ya existe, actualizamos su cantidad
        return prevItems.map(item =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        // Si es un nuevo item, lo agregamos al array
        return [...prevItems, { producto, cantidad }];
      }
    });
  };

  const eliminarProducto = (idProducto: string) => {
    setItems(prevItems => prevItems.filter(item => item.producto.id !== idProducto));
  };

  const actualizarCantidad = (idProducto: string, cantidad: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.producto.id === idProducto
          ? { ...item, cantidad: cantidad > 0 ? cantidad : 1 } // Aseguramos que la cantidad no sea menor a 1
          : item
      )
    );
  };

  const limpiarCotizacion = () => {
    setItems([]);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.cantidad, 0);
  };

  return (
    <CotizacionContext.Provider
      value={{
        items,
        agregarProducto,
        eliminarProducto,
        actualizarCantidad,
        limpiarCotizacion,
        getItemCount
      }}
    >
      {children}
    </CotizacionContext.Provider>
  );
};

// Hook personalizado para usar el contexto de cotización

