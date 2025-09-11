const fs = require('fs');
const path = require('path');

const productosPath = path.join(__dirname, '../src/data/productos.ts');

console.log('🔧 Eliminando productos duplicados...');

// Leer el archivo
let content = fs.readFileSync(productosPath, 'utf8');

// Encontrar todas las ocurrencias de prod-519 y prod-520
const lines = content.split('\n');
const seenProducts = new Set();
const filteredLines = [];
let insideProduct = false;
let currentProductId = null;
let productLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Detectar inicio de producto
  if (line.includes("id: 'prod-")) {
    // Si ya estábamos procesando un producto, guardarlo si no es duplicado
    if (insideProduct && currentProductId && !seenProducts.has(currentProductId)) {
      seenProducts.add(currentProductId);
      filteredLines.push(...productLines);
    }
    
    // Extraer el ID del producto
    const match = line.match(/id: '(prod-\d+)'/); 
    if (match) {
      currentProductId = match[1];
      productLines = [line];
      insideProduct = true;
    }
  } else if (insideProduct) {
    productLines.push(line);
    
    // Detectar final de producto (línea que contiene schemaType: 'Product')
    if (line.includes("schemaType: 'Product'")) {
      // Verificar si es la línea de cierre del producto
      if (i + 1 < lines.length && (lines[i + 1].trim() === '},' || lines[i + 1].trim() === '}')) {
        productLines.push(lines[i + 1]); // Agregar la línea de cierre
        i++; // Saltar la línea de cierre en la próxima iteración
        
        // Guardar producto si no es duplicado
        if (!seenProducts.has(currentProductId)) {
          seenProducts.add(currentProductId);
          filteredLines.push(...productLines);
        } else {
          console.log(`❌ Eliminando duplicado: ${currentProductId}`);
        }
        
        insideProduct = false;
        currentProductId = null;
        productLines = [];
      }
    }
  } else {
    // Líneas que no son parte de productos
    filteredLines.push(line);
  }
}

// Manejar el último producto si existe
if (insideProduct && currentProductId && !seenProducts.has(currentProductId)) {
  seenProducts.add(currentProductId);
  filteredLines.push(...productLines);
}

// Escribir el archivo limpio
const cleanContent = filteredLines.join('\n');
fs.writeFileSync(productosPath, cleanContent);

console.log(`✅ Productos únicos: ${seenProducts.size}`);
console.log('✅ Duplicados eliminados exitosamente');