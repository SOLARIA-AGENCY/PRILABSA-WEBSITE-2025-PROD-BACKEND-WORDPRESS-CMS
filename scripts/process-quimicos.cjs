const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Directorio base de productos químicos
const QUIMICOS_DIR = '/Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/PRODUCTOS-PRILABSA/PRILABSA_PRODUCTOS_WEB_READY/QUIMICOS';
const OUTPUT_DIR = '/Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/public/assets/images/productos/quimicos';
const PDF_OUTPUT_DIR = '/Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/public/assets/pdfs/productos/quimicos';

// Función para crear slug desde nombre
function createSlug(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Función para procesar especificaciones desde markdown
function parseSpecifications(content) {
  const specs = [];
  const lines = content.split('\n');
  let inSpecsSection = false;
  
  for (const line of lines) {
    if (line.includes('## Especificaciones Técnicas')) {
      inSpecsSection = true;
      continue;
    }
    if (line.startsWith('## ') && inSpecsSection) {
      break;
    }
    if (inSpecsSection && line.includes(':')) {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim();
      if (key.trim() && value) {
        specs.push({ key: key.trim(), value });
      }
    }
  }
  
  return specs;
}

// Función para procesar beneficios desde markdown
function parseBenefits(content) {
  const benefits = [];
  const lines = content.split('\n');
  let inBenefitsSection = false;
  
  for (const line of lines) {
    if (line.includes('## Beneficios Principales')) {
      inBenefitsSection = true;
      continue;
    }
    if (line.startsWith('## ') && inBenefitsSection) {
      break;
    }
    if (inBenefitsSection && line.trim() && !line.startsWith('#')) {
      const benefit = line.trim();
      if (benefit && !benefit.includes('##')) {
        benefits.push(benefit);
      }
    }
  }
  
  return benefits;
}

// Función para procesar presentación desde markdown
function parsePresentation(content) {
  const presentation = [];
  const lines = content.split('\n');
  let inPresentationSection = false;
  
  for (const line of lines) {
    if (line.includes('## Presentación y Empaque')) {
      inPresentationSection = true;
      continue;
    }
    if (line.startsWith('## ') && inPresentationSection) {
      break;
    }
    if (inPresentationSection && line.trim() && !line.startsWith('#')) {
      const item = line.trim();
      if (item && !item.includes('##') && !item.includes('Presentación:') && !item.includes('Condiciones de almacenamiento:')) {
        presentation.push(item);
      }
    }
  }
  
  return presentation;
}

// Función principal para procesar todos los productos químicos
function processQuimicos() {
  const productos = [];
  let productNumber = 501; // Empezar desde 501 para químicos
  
  // Crear directorios de salida si no existen
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  if (!fs.existsSync(PDF_OUTPUT_DIR)) {
    fs.mkdirSync(PDF_OUTPUT_DIR, { recursive: true });
  }
  
  // Recorrer todas las subcategorías
  const subcategories = fs.readdirSync(QUIMICOS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  for (const subcategory of subcategories) {
    const subcategoryPath = path.join(QUIMICOS_DIR, subcategory);
    const products = fs.readdirSync(subcategoryPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    for (const productDir of products) {
      const productPath = path.join(subcategoryPath, productDir);
      const mdFile = path.join(productPath, `${productDir}.md`);
      const pngFile = path.join(productPath, `${productDir}.png`);
      const pdfFile = path.join(productPath, `${productDir}_ficha.pdf`);
      
      if (fs.existsSync(mdFile)) {
        try {
          // Leer y procesar archivo markdown
          const fileContent = fs.readFileSync(mdFile, 'utf8');
          const { data: frontmatter, content } = matter(fileContent);
          
          // Copiar archivos a directorios públicos
          if (fs.existsSync(pngFile)) {
            const destPng = path.join(OUTPUT_DIR, `${frontmatter.product_code}.png`);
            fs.copyFileSync(pngFile, destPng);
          }
          
          if (fs.existsSync(pdfFile)) {
            const destPdf = path.join(PDF_OUTPUT_DIR, `${frontmatter.product_code}_ficha.pdf`);
            fs.copyFileSync(pdfFile, destPdf);
          }
          
          // Crear objeto producto
          const producto = {
            id: `prod-${productNumber}`,
            number: productNumber,
            slug: frontmatter.seo_slug || createSlug(frontmatter.title),
            name: frontmatter.title,
            category: 'quimicos',
            subcategory: frontmatter.subcategory,
            image: `/assets/images/productos/quimicos/${frontmatter.product_code}.png`,
            gallery: [`/assets/images/productos/quimicos/${frontmatter.product_code}.png`],
            description: frontmatter.description,
            shortDescription: frontmatter.description.substring(0, 100) + '...',
            longDescription: frontmatter.description,
            specifications: parseSpecifications(content),
            hasDatasheet: fs.existsSync(pdfFile),
            datasheetUrl: `/assets/pdfs/productos/quimicos/${frontmatter.product_code}_ficha.pdf`,
            featured: false,
            tags: frontmatter.tags || [],
            seoTitle: `${frontmatter.title} para Acuicultura - PRILABSA`,
            metaDescription: frontmatter.description,
            productCode: frontmatter.product_code,
            brand: frontmatter.brand || 'PRILABSA',
            availability: frontmatter.availability || 'InStock',
            priceCurrency: frontmatter.price_currency || 'USD',
            lastUpdated: frontmatter.last_updated,
            keywords: frontmatter.keywords ? frontmatter.keywords.split(', ') : [],
            benefits: parseBenefits(content),
            presentation: parsePresentation(content),
            schemaType: 'Product'
          };
          
          productos.push(producto);
          productNumber++;
          
          console.log(`✅ Procesado: ${frontmatter.title} (${frontmatter.product_code})`);
          
        } catch (error) {
          console.error(`❌ Error procesando ${productDir}:`, error.message);
        }
      }
    }
  }
  
  // Generar código TypeScript para productos.ts
  const tsCode = productos.map(producto => {
    return `  {
    id: '${producto.id}',
    number: ${producto.number},
    slug: '${producto.slug}',
    name: '${producto.name}',
    category: '${producto.category}',
    subcategory: '${producto.subcategory}',
    image: '${producto.image}',
    gallery: ${JSON.stringify(producto.gallery)},
    description: '${producto.description.replace(/'/g, "\\'").replace(/\n/g, ' ')}',
    shortDescription: '${producto.shortDescription.replace(/'/g, "\\'").replace(/\n/g, ' ')}',
    longDescription: '${producto.longDescription.replace(/'/g, "\\'").replace(/\n/g, ' ')}',
    specifications: ${JSON.stringify(producto.specifications, null, 6).replace(/^/gm, '    ')},
    hasDatasheet: ${producto.hasDatasheet},
    datasheetUrl: '${producto.datasheetUrl}',
    featured: ${producto.featured},
    tags: ${JSON.stringify(producto.tags)},
    seoTitle: '${producto.seoTitle}',
    metaDescription: '${producto.metaDescription.replace(/'/g, "\\'").replace(/\n/g, ' ')}',
    productCode: '${producto.productCode}',
    brand: '${producto.brand}',
    availability: '${producto.availability}',
    priceCurrency: '${producto.priceCurrency}',
    lastUpdated: '${producto.lastUpdated}',
    keywords: ${JSON.stringify(producto.keywords)},
    benefits: ${JSON.stringify(producto.benefits, null, 6).replace(/^/gm, '    ')},
    presentation: ${JSON.stringify(producto.presentation, null, 6).replace(/^/gm, '    ')},
    schemaType: '${producto.schemaType}'
  }`;
  }).join(',\n');
  
  // Escribir archivo de salida
  const outputFile = '/Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/scripts/quimicos-output.ts';
  fs.writeFileSync(outputFile, `// === PRODUCTOS QUÍMICOS ===\n${tsCode}`);
  
  console.log(`\n🎉 Procesamiento completado:`);
  console.log(`📦 ${productos.length} productos químicos procesados`);
  console.log(`📁 Archivos copiados a public/assets/`);
  console.log(`📄 Código TypeScript generado en: ${outputFile}`);
  
  return productos;
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  processQuimicos();
}

module.exports = { processQuimicos };