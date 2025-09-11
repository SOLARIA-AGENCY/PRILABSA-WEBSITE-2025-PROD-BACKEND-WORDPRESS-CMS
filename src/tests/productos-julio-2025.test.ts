import { describe, it, expect } from 'vitest';
import { getAllProducts, getProductById, getProductsByCategory, searchProducts } from '../data/products';
import { productsJulio2025 } from '../data/products/julio-2025';
import { OptimizedProduct } from '../data/products/types';

describe('Validación del Catálogo de Productos - Julio 2025', () => {

  it('debería cargar todos los productos del catálogo', () => {
    const allProducts = productsJulio2025;
    expect(allProducts).toBeInstanceOf(Array);
    expect(allProducts.length).toBeGreaterThan(0);
    console.log(`Total de productos cargados: ${allProducts.length}`);
  });

  it('cada producto debe tener una estructura válida', () => {
    const allProducts = productsJulio2025;
    const sampleProduct = allProducts[0];

    expect(sampleProduct).toHaveProperty('id');
    expect(sampleProduct).toHaveProperty('slug');
    expect(sampleProduct).toHaveProperty('codigo');
    expect(sampleProduct).toHaveProperty('name');
    expect(sampleProduct).toHaveProperty('description');
    expect(sampleProduct).toHaveProperty('category');
    expect(sampleProduct).toHaveProperty('assets');
    expect(sampleProduct.assets).toHaveProperty('image');
    expect(sampleProduct.assets).toHaveProperty('pdf');
  });

  it('debería encontrar un producto por su ID', () => {
    const allProducts = productsJulio2025;
    const firstProductId = allProducts[0].id;
    const foundProduct = getProductById(firstProductId);
    expect(foundProduct).toBeDefined();
    expect(foundProduct?.id).toBe(firstProductId);
  });

  it('debería devolver undefined para un ID de producto inexistente', () => {
    const nonExistentProduct = getProductById('id-no-existe');
    expect(nonExistentProduct).toBeUndefined();
  });

  it('debería filtrar productos por categoría', () => {
    const categoria = 'alimentos'; // Usar una categoría que se sabe que existe
    const productsByCategory = getProductsByCategory(categoria);
    expect(productsByCategory.length).toBeGreaterThan(0);
    productsByCategory.forEach(product => {
      expect(product.category).toBe(categoria);
    });
  });

  it('debería devolver un array vacío para una categoría inexistente', () => {
    const productsByCategory = getProductsByCategory('categoria-inexistente');
    expect(productsByCategory).toEqual([]);
  });

  it('debería encontrar productos mediante una búsqueda por nombre', () => {
    const allProducts = productsJulio2025;
    const query = allProducts[0].name.substring(0, 5); // Buscar por una parte del nombre
    const searchResult = searchProducts(query);
    expect(searchResult.length).toBeGreaterThan(0);
    expect(searchResult[0].name.toLowerCase()).toContain(query.toLowerCase());
  });

  it('debería encontrar productos mediante una búsqueda por código', () => {
    const allProducts = getAllProducts();
    const query = allProducts[0].codigo;
    const searchResult = searchProducts(query);
    expect(searchResult.length).toBeGreaterThan(0);
    expect(searchResult[0].codigo).toBe(query);
  });

  it('debería devolver un array vacío si la búsqueda no encuentra coincidencias', () => {
    const searchResult = searchProducts('texto_que_no_existe_en_ningun_producto');
    expect(searchResult).toEqual([]);
  });

});