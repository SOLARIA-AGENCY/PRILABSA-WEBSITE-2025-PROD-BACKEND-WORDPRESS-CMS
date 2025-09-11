const fs = require('fs');
const path = require('path');

// Directorio de imágenes
const imageDir = path.resolve(__dirname, '../public/assets/images/productos');

// Obtener lista de imágenes reales en el directorio
const actualImages = fs.readdirSync(imageDir)
  .filter(file => !file.startsWith('.') && (file.endsWith('.png') || file.endsWith('.PNG')));

// Crear mapa de nombres normalizados a nombres reales
const imageMap = new Map();
actualImages.forEach(img => {
  imageMap.set(img.toLowerCase(), img);
});

// Leer archivo de productos
const productsFilePath = path.resolve(__dirname, '../src/data/products/julio-2025.ts');
let productsContent = fs.readFileSync(productsFilePath, 'utf8');

// Encontrar todas las referencias a imágenes
const imageReferences = Array.from(productsContent.matchAll(/("path":\s*"\/assets\/images\/productos\/)([^"]+)"/g));

console.log(`Encontradas ${imageReferences.length} referencias a imágenes`);

// Reemplazar cada referencia con el nombre real del archivo
let fixedCount = 0;
for (const match of imageReferences) {
  const fullPath = match[0]; // La coincidencia completa
  const prefix = match[1];   // "path": "/assets/images/productos/
  const referencedName = match[2]; // El nombre referenciado
  
  const normalized = referencedName.toLowerCase();
  const actualName = imageMap.get(normalized);
  
  if (actualName && actualName !== referencedName) {
    const newReference = `${prefix}${actualName}"`;
    productsContent = productsContent.replace(fullPath, newReference);
    console.log(`Corregido: ${referencedName} → ${actualName}`);
    fixedCount++;
  }
}

// Guardar el archivo corregido
fs.writeFileSync(productsFilePath, productsContent);
console.log(`\n✅ Corregidas ${fixedCount} referencias de imágenes`);