import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CotizacionProvider } from './CotizacionContext';
import { useCotizacion } from '../hooks/useCotizacion';
import { Producto } from '../data/productos';
import React, { ReactNode } from 'react';

// Producto de prueba
const producto1: Producto = {
  id: '1', slug: 'p1', name: 'Producto 1', description: 'Desc 1', longDescription: 'Long Desc 1', image: '', category: 'cat1',
  features: [], specifications: {}
};
const producto2: Producto = {
  id: '2', slug: 'p2', name: 'Producto 2', description: 'Desc 2', longDescription: 'Long Desc 2', image: '', category: 'cat2',
  features: [], specifications: {}
};

// Wrapper para el provider
const wrapper = ({ children }: { children: ReactNode }) => (
  <CotizacionProvider>{children}</CotizacionProvider>
);

describe('useCotizacion Hook', () => {
  it('debería agregar un nuevo producto a la cotización', () => {
    const { result } = renderHook(() => useCotizacion(), { wrapper });

    act(() => {
      result.current.agregarProducto(producto1, 1);
    });

    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].producto.id).toBe('1');
    expect(result.current.items[0].cantidad).toBe(1);
  });

  it('debería incrementar la cantidad si el producto ya existe', () => {
    const { result } = renderHook(() => useCotizacion(), { wrapper });

    act(() => {
      result.current.agregarProducto(producto1, 1);
    });
    act(() => {
      result.current.agregarProducto(producto1, 2);
    });

    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].cantidad).toBe(3);
  });

  it('debería eliminar un producto de la cotización', () => {
    const { result } = renderHook(() => useCotizacion(), { wrapper });

    act(() => {
      result.current.agregarProducto(producto1, 1);
      result.current.agregarProducto(producto2, 1);
    });

    act(() => {
      result.current.eliminarProducto('1');
    });

    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].producto.id).toBe('2');
  });

  it('debería actualizar la cantidad de un producto', () => {
    const { result } = renderHook(() => useCotizacion(), { wrapper });

    act(() => {
      result.current.agregarProducto(producto1, 1);
    });

    act(() => {
      result.current.actualizarCantidad('1', 5);
    });

    expect(result.current.items[0].cantidad).toBe(5);
  });

  it('debería limpiar la cotización', () => {
    const { result } = renderHook(() => useCotizacion(), { wrapper });

    act(() => {
      result.current.agregarProducto(producto1, 1);
      result.current.agregarProducto(producto2, 1);
    });

    act(() => {
      result.current.limpiarCotizacion();
    });

    expect(result.current.items.length).toBe(0);
  });

  it('debería calcular el recuento total de items correctamente', () => {
    const { result } = renderHook(() => useCotizacion(), { wrapper });

    act(() => {
      result.current.agregarProducto(producto1, 3);
      result.current.agregarProducto(producto2, 2);
    });

    expect(result.current.getItemCount()).toBe(5);
  });
});
