const fs = require('fs');
const path = require('path');

// Verificar que las imágenes existen en el directorio público
const imageDir = path.resolve(__dirname, '../public/assets/images/productos');
const images = fs.readdirSync(imageDir).filter(file => !file.startsWith('.'));

console.log(`Encontradas ${images.length} imágenes en el directorio público.`);

// Verificar algunas imágenes específicas
const sampleImages = [
  'AD001_COMBACID_XL.png',
  'AD002_CAROPHYLL_PINK.png',
  'AD003_DESINFECTANTE_ARGENTYNE.png'
];

console.log('\nVerificando imágenes de muestra:');
sampleImages.forEach(img => {
  const imgPath = path.join(imageDir, img);
  if (fs.existsSync(imgPath)) {
    const stats = fs.statSync(imgPath);
    console.log(`✅ ${img} - ${stats.size} bytes`);
  } else {
    console.log(`❌ ${img} - No encontrada`);
  }
});

console.log('\n✅ Verificación completada.');