const fs = require('fs');
const path = require('path');

const productosPath = path.join(__dirname, '..', 'src', 'data', 'productos.ts');
const backupPath = productosPath + '.backup3';

console.log('🔧 Reparando estructura de productos.ts...');

// Crear backup
fs.copyFileSync(productosPath, backupPath);
console.log('✅ Backup creado:', backupPath);

// Leer archivo
const content = fs.readFileSync(productosPath, 'utf8');

// Extraer solo los objetos de productos válidos
const productRegex = /\{\s*id:\s*['"]prod-\d+['"][\s\S]*?\}/g;
const products = [];
let match;

while ((match = productRegex.exec(content)) !== null) {
  const productText = match[0];
  
  // Verificar que el producto tenga estructura completa
  if (productText.includes('schemaType') && 
      productText.includes('id:') && 
      productText.includes('name:')) {
    products.push(productText);
  }
}

console.log(`📦 Productos extraídos: ${products.length}`);

// Crear nuevo archivo con estructura correcta
const newContent = `import { Product } from '../types/product';

const productos: Product[] = [
${products.join(',\n')}
];

export default productos;
`;

// Escribir archivo reparado
fs.writeFileSync(productosPath, newContent, 'utf8');

console.log('✅ Archivo productos.ts reparado exitosamente');
console.log(`📊 Total de productos: ${products.length}`);

// Verificar sintaxis básica
const lines = newContent.split('\n');
console.log(`📄 Total de líneas: ${lines.length}`);

// Contar productos únicos
const uniqueIds = new Set();
products.forEach(product => {
  const idMatch = product.match(/id:\s*['"]([^'"]+)['"]/); 
  if (idMatch) {
    uniqueIds.add(idMatch[1]);
  }
});

console.log(`🔢 IDs únicos: ${uniqueIds.size}`);

if (uniqueIds.size !== products.length) {
  console.warn('⚠️  Advertencia: Hay productos duplicados');
} else {
  console.log('✅ Todos los productos tienen IDs únicos');
}