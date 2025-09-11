const fs = require('fs');
const path = require('path');

// Este script ahora solo verifica que las imágenes existen, ya que ya fueron copiadas
// durante el proceso de desarrollo y están en el directorio correcto.

const tsProductsPath = path.resolve(__dirname, '../src/data/products/julio-2025.ts');
const imageDestDir = path.resolve(__dirname, '../public/assets/images/productos');

// Extrae nombres de archivos esperados desde el TS
const tsContent = fs.readFileSync(tsProductsPath, 'utf8');
const expectedImages = Array.from(tsContent.matchAll(/\/assets\/images\/productos\/([^\"]+)/g)).map(m => m[1]);

// Verificar que todas las imágenes esperadas existen
const currentDestImages = fs.readdirSync(imageDestDir).filter(f => !f.startsWith('.'));

let imagesFound = 0;
let imagesMissing = [];

for (const expectedImage of expectedImages) {
  if (currentDestImages.includes(expectedImage)) {
    imagesFound++;
  } else {
    imagesMissing.push(expectedImage);
  }
}

console.log(`Verificación de imágenes:`);
console.log(`• Imágenes esperadas: ${expectedImages.length}`);
console.log(`• Imágenes encontradas: ${imagesFound}`);
console.log(`• Imágenes faltantes: ${imagesMissing.length}`);

if (imagesMissing.length > 0) {
  console.log(`\nImágenes faltantes:`);
  imagesMissing.forEach(img => console.log(`  • ${img}`));
}

if (imagesFound === expectedImages.length) {
  console.log(`\n✅ Todas las imágenes están en su lugar`);
} else {
  console.log(`\n⚠️  Algunas imágenes faltan, pero el build continuará`);
  // No romper el build, solo advertir
  process.exitCode = 0;
}
