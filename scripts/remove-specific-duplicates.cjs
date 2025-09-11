const fs = require('fs');
const path = require('path');

const PRODUCTOS_FILE = path.join(__dirname, '..', 'src', 'data', 'productos.ts');

console.log('🔍 Eliminando duplicados específicos EQ001 y EQ020...');

// Leer el archivo
let content = fs.readFileSync(PRODUCTOS_FILE, 'utf8');

// Extraer solo el array de productos
const arrayMatch = content.match(/const productos = (\[[\s\S]*?\]);/);
if (!arrayMatch) {
  console.error('❌ No se pudo encontrar el array de productos');
  process.exit(1);
}

const arrayContent = arrayMatch[1];

// Evaluar el array de forma segura
let productos;
try {
  productos = eval(arrayContent);
} catch (error) {
  console.error('❌ Error al parsear el array de productos:', error.message);
  process.exit(1);
}

console.log(`📊 Productos encontrados: ${productos.length}`);

// Filtrar duplicados manteniendo solo la primera aparición
const seenProductCodes = new Set();
const productosUnicos = [];
let duplicatesRemoved = 0;

for (const producto of productos) {
  if (seenProductCodes.has(producto.productCode)) {
    console.log(`❌ Eliminando duplicado: ${producto.productCode} - ${producto.title}`);
    duplicatesRemoved++;
  } else {
    seenProductCodes.add(producto.productCode);
    productosUnicos.push(producto);
  }
}

console.log(`🗑️ Duplicados eliminados: ${duplicatesRemoved}`);
console.log(`✅ Productos únicos: ${productosUnicos.length}`);

// Verificar que tenemos exactamente los códigos esperados
const expectedCodes = {
  'AD': 13, // AD001-AD013
  'AL': 23, // AL001-AL023  
  'EQ': 43, // EQ001-EQ043
  'PB': 4,  // PB001-PB004
  'QU': 18  // QU001-QU018
};

const actualCodes = {};
for (const producto of productosUnicos) {
  const prefix = producto.productCode.substring(0, 2);
  actualCodes[prefix] = (actualCodes[prefix] || 0) + 1;
}

console.log('\n📋 Verificación por categoría:');
let allCorrect = true;
for (const [prefix, expected] of Object.entries(expectedCodes)) {
  const actual = actualCodes[prefix] || 0;
  const status = actual === expected ? '✅' : '❌';
  console.log(`${status} ${prefix}: ${actual}/${expected}`);
  if (actual !== expected) allCorrect = false;
}

if (allCorrect && productosUnicos.length === 101) {
  console.log('\n🎯 ¡Perfecto! 101 productos únicos con las categorías correctas');
} else {
  console.log(`\n⚠️ Total: ${productosUnicos.length}/101 productos`);
}

// Reconstruir el archivo
const newArrayContent = JSON.stringify(productosUnicos, null, 2);
const newContent = content.replace(
  /const productos = \[[\s\S]*?\];/,
  `const productos = ${newArrayContent};`
);

// Escribir el archivo actualizado
fs.writeFileSync(PRODUCTOS_FILE, newContent, 'utf8');

console.log('\n💾 Archivo actualizado exitosamente');