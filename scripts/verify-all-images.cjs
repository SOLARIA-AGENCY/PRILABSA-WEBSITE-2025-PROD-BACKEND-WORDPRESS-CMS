const fs = require('fs');
const path = require('path');

// Leer archivo de productos
const productsFile = fs.readFileSync(path.resolve(__dirname, '../src/data/products/julio-2025.ts'), 'utf8');

// Extraer todas las referencias a imágenes
const imageReferences = Array.from(productsFile.matchAll(/"path":\s*"\/assets\/images\/productos\/([^"]+)"/g))
  .map(match => match[1]);

console.log(`Verificando ${imageReferences.length} imágenes...`);

let successCount = 0;
let errorCount = 0;

// Verificar cada imagen
imageReferences.forEach((imagePath, index) => {
  const fullPath = path.join(__dirname, '../public/assets/images/productos', imagePath);
  
  try {
    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      if (stats.size > 0) {
        successCount++;
        if (index < 10) {
          console.log(`✅ ${imagePath} - ${stats.size} bytes`);
        }
      } else {
        errorCount++;
        console.log(`❌ ${imagePath} - Archivo vacío`);
      }
    } else {
      errorCount++;
      console.log(`❌ ${imagePath} - No encontrado`);
    }
  } catch (error) {
    errorCount++;
    console.log(`❌ ${imagePath} - Error: ${error.message}`);
  }
});

console.log(`\n📊 Resultado final:`);
console.log(`✅ Imágenes correctas: ${successCount}`);
console.log(`❌ Imágenes con error: ${errorCount}`);

if (errorCount === 0) {
  console.log(`\n🎉 ¡Todas las imágenes se cargan correctamente!`);
} else {
  console.log(`\n⚠️  Hay ${errorCount} imágenes con problemas`);
}