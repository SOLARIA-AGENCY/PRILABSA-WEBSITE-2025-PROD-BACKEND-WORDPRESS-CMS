/**
 * Script para eliminar todos los productos de la categoría "equipos" del archivo productos.ts
 */

const fs = require('fs');
const path = require('path');

// Ruta al archivo de productos
const productosFilePath = path.join(__dirname, '../src/data/productos.ts');

console.log('Procesando archivo:', productosFilePath);

try {
  // Leer el archivo
  const data = fs.readFileSync(productosFilePath, 'utf8');
  console.log('Archivo leído correctamente');

  // Extraer las importaciones y la declaración de tipo
  const importSection = data.substring(0, data.indexOf('export const productos'));
  
  // Extraer el array de productos como objeto JavaScript
  const productsArrayString = data.substring(
    data.indexOf('export const productos: Producto[] = [') + 'export const productos: Producto[] = '.length,
    data.lastIndexOf('];') + 1
  );
  
  // Evaluar el string para convertirlo en un array real
  // Nota: Esto es seguro porque estamos ejecutando código que nosotros controlamos
  const productsArray = eval(productsArrayString);
  
  console.log(`Total de productos antes del filtrado: ${productsArray.length}`);
  
  // Filtrar los productos para eliminar los de categoría "equipos"
  const filteredProducts = productsArray.filter(product => product.category !== 'equipos');
  
  console.log(`Total de productos después del filtrado: ${filteredProducts.length}`);
  console.log(`Se eliminaron ${productsArray.length - filteredProducts.length} productos de la categoría "equipos"`);
  
  // Reconstruir el archivo
  const newFileContent = `${importSection}export const productos: Producto[] = ${JSON.stringify(filteredProducts, null, 2)};
`;
  
  // Escribir el nuevo contenido al archivo
  fs.writeFileSync(productosFilePath, newFileContent, 'utf8');
  
  console.log('Archivo actualizado correctamente');
} catch (error) {
  console.error('Error al procesar el archivo:', error);
}