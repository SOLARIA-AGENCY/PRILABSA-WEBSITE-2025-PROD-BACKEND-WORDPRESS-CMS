const fs = require('fs');
const path = require('path');

const PRODUCTOS_FILE = path.join(__dirname, '..', 'src', 'data', 'productos.ts');
const BACKUP_FILE = PRODUCTOS_FILE + '.backup-final';

console.log('🔧 Reparando archivo productos.ts...');

// Crear backup
fs.copyFileSync(PRODUCTOS_FILE, BACKUP_FILE);
console.log('💾 Backup creado:', BACKUP_FILE);

// Leer el archivo
let content = fs.readFileSync(PRODUCTOS_FILE, 'utf8');

// Extraer todos los objetos que parecen productos
const productObjects = [];
const lines = content.split('\n');
let currentObject = '';
let braceCount = 0;
let inObject = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Detectar inicio de objeto producto
  if (line.trim() === '{' && !inObject) {
    inObject = true;
    braceCount = 1;
    currentObject = line + '\n';
  } else if (inObject) {
    currentObject += line + '\n';
    
    // Contar llaves
    const openBraces = (line.match(/{/g) || []).length;
    const closeBraces = (line.match(/}/g) || []).length;
    braceCount += openBraces - closeBraces;
    
    // Si terminó el objeto
    if (braceCount === 0) {
      // Verificar si es un objeto producto válido
      if (currentObject.includes('productCode:') && currentObject.includes('id:')) {
        try {
          // Limpiar el objeto y evaluarlo
          let cleanObject = currentObject.trim();
          if (cleanObject.endsWith(',')) {
            cleanObject = cleanObject.slice(0, -1);
          }
          
          const producto = eval('(' + cleanObject + ')');
          if (producto.productCode && producto.id) {
            productObjects.push(producto);
            console.log(`✅ Producto extraído: ${producto.productCode} - ${producto.name}`);
          }
        } catch (error) {
          console.log(`⚠️ Error al parsear objeto en línea ${i}: ${error.message}`);
        }
      }
      
      inObject = false;
      currentObject = '';
    }
  }
}

console.log(`\n📊 Total de productos extraídos: ${productObjects.length}`);

// Filtrar duplicados por productCode
const seenCodes = new Set();
const productosUnicos = [];
let duplicatesRemoved = 0;

for (const producto of productObjects) {
  if (seenCodes.has(producto.productCode)) {
    console.log(`❌ Eliminando duplicado: ${producto.productCode}`);
    duplicatesRemoved++;
  } else {
    seenCodes.add(producto.productCode);
    productosUnicos.push(producto);
  }
}

console.log(`🗑️ Duplicados eliminados: ${duplicatesRemoved}`);
console.log(`✅ Productos únicos: ${productosUnicos.length}`);

// Verificar categorías
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

// Reconstruir el archivo con la estructura correcta
const newContent = `import { Product } from '../types/Product';

export type Producto = Product;

export const productos: Producto[] = ${
  JSON.stringify(productosUnicos, null, 2)
};

export default productos;
`;

// Escribir el archivo reparado
fs.writeFileSync(PRODUCTOS_FILE, newContent, 'utf8');

console.log('\n💾 Archivo reparado exitosamente');
console.log(`📁 Backup disponible en: ${BACKUP_FILE}`);

// Verificación final
const finalContent = fs.readFileSync(PRODUCTOS_FILE, 'utf8');
const finalMatches = finalContent.match(/productCode: '[A-Z]{2}[0-9]{3}'/g) || [];
console.log(`\n🔍 Verificación final: ${finalMatches.length} productos en el archivo`);

if (finalMatches.length === productosUnicos.length) {
  console.log('✅ Archivo verificado correctamente');
} else {
  console.log('❌ Error en la verificación del archivo');
}