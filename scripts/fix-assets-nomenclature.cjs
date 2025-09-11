const fs = require('fs');
const path = require('path');

const PRODUCTOS_FILE = path.join(__dirname, '../src/data/productos.ts');

function normalizeProductName(name) {
  return name
    .toUpperCase()
    .replace(/[ÁÉÍÓÚÑ]/g, match => {
      const map = {'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U', 'Ñ': 'N'};
      return map[match] || match;
    })
    .replace(/[^A-Z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

function fixAssetsNomenclature() {
  console.log('🔧 Corrigiendo nomenclatura de assets...');
  
  let content = fs.readFileSync(PRODUCTOS_FILE, 'utf8');
  
  // Crear backup
  const backupFile = PRODUCTOS_FILE + '.backup-assets';
  fs.writeFileSync(backupFile, content);
  console.log(`💾 Backup creado`);
  
  // Mapeo de productos químicos que necesitan corrección
  const quimicosCorrections = {
    'QU001': 'PROBIOTICO_LIQUIDO',
    'QU002': 'PROBIOTICO_POLVO', 
    'QU003': 'ZEOLITA',
    'QU004': 'PEROXIDO_DE_HIDROGENO',
    'QU005': 'CARBONATO_DE_CALCIO',
    'QU006': 'ACIDO_HUMICO',
    'QU007': 'SULFATO_DE_COBRE',
    'QU008': 'CLORURO_DE_SODIO',
    'QU009': 'BICARBONATO_DE_SODIO',
    'QU010': 'YODO_POVIDONA',
    'QU011': 'FORMALDEHIDO',
    'QU012': 'EDTA',
    'QU013': 'VITAMINA_C',
    'QU014': 'MELAZA',
    'QU015': 'CLORO_GRANULADO',
    'QU016': 'SULFATO_DE_ALUMINIO',
    'QU017': 'TIOSULFATO_DE_SODIO',
    'QU018': 'KIT_AMONIO'
  };
  
  let correctedCount = 0;
  
  // Corregir cada producto químico
  Object.entries(quimicosCorrections).forEach(([code, name]) => {
    const oldImagePattern = `/assets/images/productos/quimicos/${code}.png`;
    const newImagePattern = `/assets/images/productos/quimicos/${code}_${name}.png`;
    
    const oldPdfPattern = `/assets/pdfs/productos/quimicos/${code}_ficha.pdf`;
    const newPdfPattern = `/assets/pdfs/productos/quimicos/${code}_${name}_ficha.pdf`;
    
    // Corregir imágenes
    const imageRegex = new RegExp(oldImagePattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const imageMatches = content.match(imageRegex);
    if (imageMatches) {
      content = content.replace(imageRegex, newImagePattern);
      correctedCount += imageMatches.length;
      console.log(`✅ Imagen ${code}: ${oldImagePattern} -> ${newImagePattern} (${imageMatches.length} ocurrencias)`);
    }
    
    // Corregir PDFs
    const pdfRegex = new RegExp(oldPdfPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const pdfMatches = content.match(pdfRegex);
    if (pdfMatches) {
      content = content.replace(pdfRegex, newPdfPattern);
      correctedCount += pdfMatches.length;
      console.log(`📄 PDF ${code}: ${oldPdfPattern} -> ${newPdfPattern} (${pdfMatches.length} ocurrencias)`);
    }
  });
  
  // Escribir archivo corregido
  fs.writeFileSync(PRODUCTOS_FILE, content);
  console.log(`\n🎉 Corrección completada: ${correctedCount} cambios realizados`);
  
  // Verificar duplicados
  console.log('\n🔍 Verificando duplicados...');
  const imageMatches = content.match(/"image":\s*"[^"]+"/g) || [];
  const imagePaths = imageMatches.map(match => {
    const pathMatch = match.match(/"image":\s*"([^"]+)"/);
    return pathMatch ? pathMatch[1] : null;
  }).filter(Boolean);
  const uniqueImages = new Set(imagePaths);
  
  console.log(`📊 Total imágenes: ${imagePaths.length}`);
  console.log(`📊 Imágenes únicas: ${uniqueImages.size}`);
  
  if (imagePaths.length !== uniqueImages.size) {
    console.log('🚨 Rutas duplicadas encontradas:');
    const duplicates = imagePaths.filter((item, index) => imagePaths.indexOf(item) !== index);
    [...new Set(duplicates)].forEach(dup => {
      console.log(`   - ${dup}`);
    });
  } else {
    console.log('✅ No hay rutas duplicadas');
  }
}

// Ejecutar
fixAssetsNomenclature();