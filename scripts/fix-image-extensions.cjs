const fs = require('fs');
const path = require('path');

// Ruta al archivo de productos
const productsFilePath = path.resolve(__dirname, '../src/data/products/julio-2025.ts');

// Leer el contenido del archivo
let content = fs.readFileSync(productsFilePath, 'utf8');

// Reemplazar todas las extensiones .PNG por .png en las rutas de imágenes
content = content.replace(/\.PNG/g, '.png');

// Guardar el archivo corregido
fs.writeFileSync(productsFilePath, content);

console.log('✅ Extensiones de imágenes corregidas de .PNG a .png en el archivo de productos.');