const fs = require('fs');
const path = require('path');

// Rutas de archivos
const equiposConvertedPath = path.join(__dirname, 'equipos-converted.ts');
const productosPath = path.join(__dirname, '..', 'src', 'data', 'productos.ts');

console.log('🔄 Iniciando integración de productos EQUIPOS...');

try {
  // Leer el archivo de equipos convertidos
  const equiposContent = fs.readFileSync(equiposConvertedPath, 'utf8');
  
  // Extraer solo los objetos de productos (sin el header de comentarios)
  const equiposStart = equiposContent.indexOf('  {');
  const equiposData = equiposContent.substring(equiposStart).trim();
  
  // Leer el archivo productos.ts actual
  const productosContent = fs.readFileSync(productosPath, 'utf8');
  
  // Encontrar la posición donde insertar los nuevos productos
  // Buscar el último producto de químicos (prod-518) y agregar después
  const lastChemicalIndex = productosContent.lastIndexOf('schemaType: \'Product\'\n  },');
  
  if (lastChemicalIndex === -1) {
    throw new Error('No se pudo encontrar el último producto químico');
  }
  
  // Encontrar el final de ese producto
  const insertPosition = productosContent.indexOf('\n  },', lastChemicalIndex) + 5;
  
  // Construir el nuevo contenido
  const beforeInsert = productosContent.substring(0, insertPosition);
  const afterInsert = productosContent.substring(insertPosition);
  
  // Agregar los productos de equipos
  const newContent = beforeInsert + 
    '\n  // EQUIPOS - 43 productos\n' +
    equiposData.replace(/\n$/, '') + // Remover salto de línea final
    ',' + afterInsert;
  
  // Escribir el archivo actualizado
  fs.writeFileSync(productosPath, newContent, 'utf8');
  
  console.log('✅ Integración completada: 43 productos de equipos agregados');
  console.log('📁 Archivo actualizado:', productosPath);
  
} catch (error) {
  console.error('❌ Error durante la integración:', error.message);
  process.exit(1);
}