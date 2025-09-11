const fs = require('fs');
const path = require('path');

// Leer el archivo de productos
const productsPath = path.resolve(__dirname, '../src/data/products/julio-2025.ts');
let productsContent = fs.readFileSync(productsPath, 'utf8');

// Extraer las rutas de las imágenes
const imagePaths = Array.from(productsContent.matchAll(/"path": "(\/assets\/images\/productos\/[^"]+)"/g))
  .map(match => match[1]);

console.log(`Encontradas ${imagePaths.length} imágenes en el catálogo`);

// Verificar que las imágenes existen en el directorio público
const publicImagesDir = path.resolve(__dirname, '../public/assets/images/productos');
const publicImages = fs.readdirSync(publicImagesDir);

let missingImages = 0;
let foundImages = 0;

for (const imagePath of imagePaths) {
  const filename = path.basename(imagePath);
  if (publicImages.includes(filename)) {
    foundImages++;
  } else {
    console.log(`❌ Imagen faltante: ${filename}`);
    missingImages++;
  }
}

console.log(`\n✅ Imágenes encontradas: ${foundImages}`);
console.log(`❌ Imágenes faltantes: ${missingImages}`);

if (missingImages === 0) {
  console.log('\n🎉 Todas las imágenes están presentes!');
} else {
  console.log('\n⚠️  Algunas imágenes están faltantes');
}