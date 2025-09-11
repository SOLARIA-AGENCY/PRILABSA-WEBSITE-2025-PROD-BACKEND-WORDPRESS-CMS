const fs = require('fs');
const path = require('path');

// Directorio fuente con los PDFs correctos
const sourceDir = '/Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/PRODUCTOS-PRILABSA/PRILABSA_PRODUCTOS_WEB_READY/QUIMICOS';
// Directorio destino en public
const destDir = '/Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/public/assets/pdfs/productos/quimicos';

// Mapeo de productos químicos según el directorio fuente
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

// Función para encontrar archivos recursivamente
function findFiles(dir, extension) {
  const files = [];
  
  function searchDir(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        searchDir(fullPath);
      } else if (item.endsWith(extension)) {
        files.push(fullPath);
      }
    }
  }
  
  searchDir(dir);
  return files;
}

// Función principal
function copyQuimicosPdfs() {
  console.log('🔍 Buscando PDFs de productos químicos...');
  
  // Buscar todos los PDFs en el directorio fuente
  const sourcePdfs = findFiles(sourceDir, '.pdf');
  
  console.log(`📁 Encontrados ${sourcePdfs.length} PDFs en el directorio fuente`);
  
  let copiedCount = 0;
  let errorCount = 0;
  
  // Procesar cada PDF
  for (const pdfPath of sourcePdfs) {
    const fileName = path.basename(pdfPath);
    
    // Extraer código del producto (QU001, QU002, etc.)
    const match = fileName.match(/^(QU\d{3})_/);
    
    if (match) {
      const productCode = match[1];
      const expectedName = quimicosMapping[productCode];
      
      if (expectedName) {
        const correctFileName = `${productCode}_${expectedName}_ficha.pdf`;
        const destPath = path.join(destDir, correctFileName);
        
        try {
          // Crear directorio destino si no existe
          if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
          }
          
          // Copiar archivo
          fs.copyFileSync(pdfPath, destPath);
          console.log(`✅ Copiado: ${correctFileName}`);
          copiedCount++;
        } catch (error) {
          console.error(`❌ Error copiando ${fileName}:`, error.message);
          errorCount++;
        }
      } else {
        console.log(`⚠️  No se encontró mapeo para ${productCode}`);
      }
    } else {
      console.log(`⚠️  Nombre de archivo no reconocido: ${fileName}`);
    }
  }
  
  console.log(`\n📊 Resumen:`);
  console.log(`✅ PDFs copiados: ${copiedCount}`);
  console.log(`❌ Errores: ${errorCount}`);
  
  return { copiedCount, errorCount };
}

// Ejecutar si se llama directamente
if (require.main === module) {
  copyQuimicosPdfs();
}

module.exports = { copyQuimicosPdfs };