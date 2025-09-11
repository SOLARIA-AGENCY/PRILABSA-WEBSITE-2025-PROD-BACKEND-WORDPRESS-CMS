const fs = require('fs');
const path = require('path');

// Directorio de imágenes
const imageDir = path.resolve(__dirname, '../public/assets/images/productos');

// Obtener lista de imágenes en el directorio
const imagesInDir = fs.readdirSync(imageDir)
  .filter(file => !file.startsWith('.') && (file.endsWith('.png') || file.endsWith('.PNG')))
  .map(file => file.toLowerCase());

// Leer archivo de productos
const productsFile = fs.readFileSync(path.resolve(__dirname, '../src/data/products/julio-2025.ts'), 'utf8');

// Extraer referencias a imágenes en los datos
const imageReferences = Array.from(productsFile.matchAll(/"path":\s*"\/assets\/images\/productos\/([^"]+)"/g))
  .map(match => match[1].toLowerCase());

// Encontrar imágenes no referenciadas
const unreferencedImages = imagesInDir.filter(img => !imageReferences.includes(img));

// Encontrar imágenes faltantes (referenciadas pero no existentes)
const missingImages = imageReferences.filter(ref => !imagesInDir.includes(ref));

console.log(`📊 Análisis de imágenes:`);
console.log(`📁 Imágenes en directorio: ${imagesInDir.length}`);
console.log(`🔗 Referencias en datos: ${imageReferences.length}`);
console.log(`🔄 Imágenes sin usar: ${unreferencedImages.length}`);
console.log(`🚫 Imágenes faltantes: ${missingImages.length}`);

if (unreferencedImages.length > 0) {
  console.log(`\n📦 Imágenes sin usar:`);
  unreferencedImages.slice(0, 10).forEach(img => console.log(`  • ${img}`));
  if (unreferencedImages.length > 10) {
    console.log(`  ... y ${unreferencedImages.length - 10} más`);
  }
}

if (missingImages.length > 0) {
  console.log(`\n❌ Imágenes faltantes:`);
  missingImages.forEach(img => console.log(`  • ${img}`));
} else {
  console.log(`\n✅ Todas las imágenes referenciadas existen`);
}

// Verificar si hay inconsistencias de mayúsculas/minúsculas
const exactImagesInDir = fs.readdirSync(imageDir)
  .filter(file => !file.startsWith('.') && (file.endsWith('.png') || file.endsWith('.PNG')));

const caseIssues = [];
imageReferences.forEach(ref => {
  const exactMatch = exactImagesInDir.find(img => img.toLowerCase() === ref);
  if (exactMatch && exactMatch !== ref) {
    caseIssues.push({
      referenced: ref,
      actual: exactMatch
    });
  }
});

if (caseIssues.length > 0) {
  console.log(`\n⚠️  Problemas de mayúsculas/minúsculas:`);
  caseIssues.slice(0, 10).forEach(issue => {
    console.log(`  • Referenciada: ${issue.referenced} | Real: ${issue.actual}`);
  });
  if (caseIssues.length > 10) {
    console.log(`  ... y ${caseIssues.length - 10} más`);
  }
} else {
  console.log(`\n✅ No hay problemas de mayúsculas/minúsculas`);
}