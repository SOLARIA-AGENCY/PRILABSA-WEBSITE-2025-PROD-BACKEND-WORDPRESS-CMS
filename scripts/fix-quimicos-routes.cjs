const fs = require('fs');
const path = require('path');

// Mapeo correcto de productos químicos
const quimicosMapping = {
  'QU001': 'CLORURO_DE_MAGNESIO',
  'QU002': 'CLORURO_DE_POTASIO', 
  'QU003': 'PERCARBONATO_DE_SODIO',
  'QU004': 'PEROXIDO_DE_HIDROGENO',
  'QU005': 'METASILICATO_DE_SODIO',
  'QU006': 'NITRATO_DE_SODIO',
  'QU007': 'NITRATO_SODICO_POTASICO',
  'QU008': 'ACIDO_HUMICO',
  'QU009': 'ACIDO_FORMICO',
  'QU010': 'ACIDO_NITRICO',
  'QU011': 'FORMALDEHIDO_FORMOL',
  'QU012': 'TRILON_B_-_EDTA',
  'QU014': 'SULFATO_DE_ALUMINIO_SO43_Al2',
  'QU015': 'CLORO_GRANULADO',
  'QU016': 'ORTHOTOLIDINE_OTO',
  'QU017': 'THIOSULFATO_DE_SODIO',
  'QU018': 'REFRIGERANTE_ECOLOGICO_R507'
};

// Función para corregir rutas de productos químicos
function fixQuimicosRoutes() {
  const productosPath = '/Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/src/data/productos.ts';
  
  console.log('📖 Leyendo productos.ts...');
  let content = fs.readFileSync(productosPath, 'utf8');
  
  let changesCount = 0;
  
  // Procesar cada producto químico
  for (const [code, correctName] of Object.entries(quimicosMapping)) {
    // Buscar y reemplazar rutas de imágenes incorrectas
    const incorrectImagePattern = new RegExp(`"/assets/images/productos/quimicos/${code}_[^"]+\.png"`, 'g');
    const correctImagePath = `"/assets/images/productos/quimicos/${code}_${correctName}.png"`;
    
    const imageMatches = content.match(incorrectImagePattern);
    if (imageMatches) {
      content = content.replace(incorrectImagePattern, correctImagePath);
      console.log(`✅ Corregida imagen ${code}: ${imageMatches.length} ocurrencias`);
      changesCount += imageMatches.length;
    }
    
    // Buscar y reemplazar rutas de PDFs incorrectas
    const incorrectPdfPattern = new RegExp(`"/assets/pdfs/productos/quimicos/${code}_[^"]+_ficha\.pdf"`, 'g');
    const correctPdfPath = `"/assets/pdfs/productos/quimicos/${code}_${correctName}_ficha.pdf"`;
    
    const pdfMatches = content.match(incorrectPdfPattern);
    if (pdfMatches) {
      content = content.replace(incorrectPdfPattern, correctPdfPath);
      console.log(`✅ Corregido PDF ${code}: ${pdfMatches.length} ocurrencias`);
      changesCount += pdfMatches.length;
    }
  }
  
  if (changesCount > 0) {
    // Crear backup
    const backupPath = productosPath + '.backup-quimicos-fix';
    fs.copyFileSync(productosPath, backupPath);
    console.log(`💾 Backup creado: ${backupPath}`);
    
    // Escribir archivo corregido
    fs.writeFileSync(productosPath, content);
    console.log(`✅ Archivo productos.ts actualizado`);
  }
  
  console.log(`\n📊 Resumen:`);
  console.log(`🔧 Total de correcciones: ${changesCount}`);
  
  return changesCount;
}

// Ejecutar si se llama directamente
if (require.main === module) {
  fixQuimicosRoutes();
}

module.exports = { fixQuimicosRoutes };