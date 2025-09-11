/**
 * Script simple para eliminar todos los productos de la categoría "equipos" del archivo productos.ts
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

  // Buscar todos los productos con categoría "equipos"
  const equiposRegex = /\{[^\{\}]*"category"\s*:\s*"equipos"[^\{\}]*\}/g;
  
  // Contar cuántos productos de equipos hay
  const matches = data.match(equiposRegex) || [];
  console.log(`Se encontraron ${matches.length} productos con categoría "equipos"`);
  
  // Reemplazar los productos de equipos con una cadena vacía
  const newData = data.replace(equiposRegex, '');
  
  // Limpiar múltiples comas consecutivas que pueden quedar después del reemplazo
  const cleanedData = newData
    .replace(/,\s*,/g, ',') // Reemplazar comas consecutivas
    .replace(/\[\s*,/g, '[') // Limpiar coma después de corchete de apertura
    .replace(/,\s*\]/g, ']'); // Limpiar coma antes de corchete de cierre
  
  // Escribir el nuevo contenido al archivo
  fs.writeFileSync(productosFilePath, cleanedData, 'utf8');
  
  console.log(`Se eliminaron ${matches.length} productos de la categoría "equipos"`);
  console.log('Archivo actualizado correctamente');
} catch (error) {
  console.error('Error al procesar el archivo:', error);
}