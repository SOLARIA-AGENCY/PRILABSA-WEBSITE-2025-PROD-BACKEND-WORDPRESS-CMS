const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Configuración de rutas
const EQUIPOS_SOURCE_DIR = '/Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/PRODUCTOS-PRILABSA/PRILABSA_PRODUCTOS_WEB_READY/EQUIPOS';
const PUBLIC_IMAGES_DIR = '/Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/public/assets/images/productos/equipos';
const PUBLIC_PDFS_DIR = '/Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/public/assets/pdfs/productos/equipos';
const OUTPUT_FILE = '/Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/scripts/equipos-output.ts';

// Mapeo de subcategorías
const SUBCATEGORY_MAP = {
  'Accesorios': 'accesorios',
  'Aireacion': 'aireacion',
  'Balanzas': 'balanzas',
  'Cintas': 'cintas',
  'Filtros': 'filtros',
  'General': 'general',
  'Kits_Analisis': 'kits_analisis',
  'Mallas': 'mallas',
  'Medidores': 'medidores',
  'Opticos': 'opticos',
  'Oxigenometros': 'oxigenometros'
};

// Función para crear directorios si no existen
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Directorio creado: ${dirPath}`);
  }
}

// Función para limpiar texto
function cleanText(text) {
  if (!text) return '';
  return text.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
}

// Función para generar slug
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Función para extraer secciones del contenido
function extractSections(content) {
  const sections = {
    specifications: '',
    benefits: '',
    presentation: ''
  };

  // Extraer especificaciones técnicas
  const specsMatch = content.match(/## Especificaciones Técnicas([\s\S]*?)(?=##|$)/i);
  if (specsMatch) {
    sections.specifications = cleanText(specsMatch[1]);
  }

  // Extraer beneficios
  const benefitsMatch = content.match(/## Beneficios Principales([\s\S]*?)(?=##|$)/i);
  if (benefitsMatch) {
    sections.benefits = cleanText(benefitsMatch[1]);
  }

  // Extraer presentación
  const presentationMatch = content.match(/## Presentación y Empaque([\s\S]*?)(?=##|$)/i);
  if (presentationMatch) {
    sections.presentation = cleanText(presentationMatch[1]);
  }

  return sections;
}

// Función principal de procesamiento
function processEquipos() {
  console.log('🚀 Iniciando procesamiento de productos EQUIPOS...');
  
  // Crear directorios de destino
  ensureDirectoryExists(PUBLIC_IMAGES_DIR);
  ensureDirectoryExists(PUBLIC_PDFS_DIR);
  
  const productos = [];
  let productCounter = 519; // Continuar después de químicos (prod-518)
  
  // Leer subcategorías
  const subcategories = fs.readdirSync(EQUIPOS_SOURCE_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  console.log(`📁 Subcategorías encontradas: ${subcategories.join(', ')}`);
  
  subcategories.forEach(subcategoryFolder => {
    const subcategoryPath = path.join(EQUIPOS_SOURCE_DIR, subcategoryFolder);
    const subcategoryKey = SUBCATEGORY_MAP[subcategoryFolder] || subcategoryFolder.toLowerCase();
    
    console.log(`\n📂 Procesando subcategoría: ${subcategoryFolder} -> ${subcategoryKey}`);
    
    // Leer productos en la subcategoría
    const products = fs.readdirSync(subcategoryPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    products.forEach(productFolder => {
      const productPath = path.join(subcategoryPath, productFolder);
      const mdFile = path.join(productPath, `${productFolder}.md`);
      const pngFile = path.join(productPath, `${productFolder}.png`);
      const pdfFile = path.join(productPath, `${productFolder}_ficha.pdf`);
      
      if (fs.existsSync(mdFile)) {
        try {
          // Leer y procesar archivo Markdown
          const fileContent = fs.readFileSync(mdFile, 'utf8');
          const { data: frontMatter, content } = matter(fileContent);
          
          // Extraer código del producto (ej: EQ001)
          const productCode = frontMatter.product_code || productFolder.split('_')[0];
          
          // Extraer secciones del contenido
          const sections = extractSections(content);
          
          // Copiar imagen si existe
          let imagePath = '';
          if (fs.existsSync(pngFile)) {
            const imageDestination = path.join(PUBLIC_IMAGES_DIR, `${productCode}.png`);
            fs.copyFileSync(pngFile, imageDestination);
            imagePath = `/assets/images/productos/equipos/${productCode}.png`;
            console.log(`  📷 Imagen copiada: ${productCode}.png`);
          }
          
          // Copiar PDF si existe
          let pdfPath = '';
          if (fs.existsSync(pdfFile)) {
            const pdfDestination = path.join(PUBLIC_PDFS_DIR, `${productCode}_ficha.pdf`);
            fs.copyFileSync(pdfFile, pdfDestination);
            pdfPath = `/assets/pdfs/productos/equipos/${productCode}_ficha.pdf`;
            console.log(`  📄 PDF copiado: ${productCode}_ficha.pdf`);
          }
          
          // Crear objeto producto
          const producto = {
            id: `prod-${productCounter}`,
            number: productCounter,
            slug: generateSlug(frontMatter.title || productFolder.replace(/_/g, ' ')),
            name: frontMatter.title || productFolder.replace(/_/g, ' '),
            category: 'equipos',
            subcategory: subcategoryKey,
            image: imagePath,
            gallery: imagePath ? [imagePath] : [],
            description: cleanText(frontMatter.description || ''),
            specifications: sections.specifications,
            datasheetUrl: pdfPath,
            productCode: productCode,
            benefits: sections.benefits,
            presentation: sections.presentation
          };
          
          productos.push(producto);
          console.log(`  ✅ Procesado: ${frontMatter.title} (${productCode})`);
          productCounter++;
          
        } catch (error) {
          console.error(`  ❌ Error procesando ${productFolder}:`, error.message);
        }
      } else {
        console.warn(`  ⚠️  Archivo MD no encontrado: ${mdFile}`);
      }
    });
  });
  
  // Generar archivo TypeScript
  const tsContent = `// Productos EQUIPOS generados automáticamente
// Total de productos: ${productos.length}
// Generado: ${new Date().toISOString()}

export const equiposProducts = [
${productos.map(producto => {
    return `  {
    id: "${producto.id}",
    number: ${producto.number},
    slug: "${producto.slug}",
    name: "${producto.name}",
    category: "${producto.category}",
    subcategory: "${producto.subcategory}",
    image: "${producto.image}",
    gallery: [${producto.gallery.map(img => `"${img}"`).join(', ')}],
    description: "${producto.description.replace(/"/g, '\\"')}",
    specifications: "${producto.specifications.replace(/"/g, '\\"')}",
    datasheetUrl: "${producto.datasheetUrl}",
    productCode: "${producto.productCode}",
    benefits: "${producto.benefits.replace(/"/g, '\\"')}",
    presentation: "${producto.presentation.replace(/"/g, '\\"')}"
  }`;
  }).join(',\n')}
];
`;
  
  // Escribir archivo de salida
  fs.writeFileSync(OUTPUT_FILE, tsContent, 'utf8');
  
  console.log(`\n🎉 Procesamiento completado!`);
  console.log(`📊 Total de productos procesados: ${productos.length}`);
  console.log(`📁 Archivo generado: ${OUTPUT_FILE}`);
  console.log(`🖼️  Imágenes copiadas a: ${PUBLIC_IMAGES_DIR}`);
  console.log(`📄 PDFs copiados a: ${PUBLIC_PDFS_DIR}`);
  
  return productos;
}

// Ejecutar si se llama directamente
if (require.main === module) {
  processEquipos();
}

module.exports = { processEquipos };