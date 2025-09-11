import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Lista de productos de EQUIPOS faltantes (los 39 que faltan)
const missingEquipos = [
  'EQ002', 'EQ003', 'EQ004', 'EQ005', 'EQ006', 'EQ007', 'EQ008', 'EQ009', 'EQ010',
  'EQ011', 'EQ012', 'EQ014', 'EQ015', 'EQ016', 'EQ017', 'EQ018', 'EQ019', 'EQ021',
  'EQ022', 'EQ023', 'EQ024', 'EQ025', 'EQ026', 'EQ027', 'EQ028', 'EQ029', 'EQ030',
  'EQ031', 'EQ032', 'EQ033', 'EQ034', 'EQ035', 'EQ036', 'EQ037', 'EQ039', 'EQ040',
  'EQ041', 'EQ042', 'EQ043'
];

// Mapeo de subcategorías
const subcategoryMap = {
  'EQ002': 'General', 'EQ003': 'Oxigenometros', 'EQ004': 'Oxigenometros', 'EQ005': 'General',
  'EQ006': 'Oxigenometros', 'EQ007': 'Oxigenometros', 'EQ008': 'Oxigenometros', 'EQ009': 'Oxigenometros',
  'EQ010': 'General', 'EQ011': 'General', 'EQ012': 'General', 'EQ014': 'Kits_Analisis',
  'EQ015': 'General', 'EQ016': 'Kits_Analisis', 'EQ017': 'Kits_Analisis', 'EQ018': 'Kits_Analisis',
  'EQ019': 'Kits_Analisis', 'EQ021': 'Kits_Analisis', 'EQ022': 'Kits_Analisis', 'EQ023': 'Kits_Analisis',
  'EQ024': 'Kits_Analisis', 'EQ025': 'Kits_Analisis', 'EQ026': 'Kits_Analisis', 'EQ027': 'Kits_Analisis',
  'EQ028': 'Kits_Analisis', 'EQ029': 'Kits_Analisis', 'EQ030': 'Kits_Analisis', 'EQ031': 'Balanzas',
  'EQ032': 'Opticos', 'EQ033': 'Medidores', 'EQ034': 'Opticos', 'EQ035': 'Aireacion',
  'EQ036': 'Aireacion', 'EQ037': 'Aireacion', 'EQ039': 'Filtros', 'EQ040': 'Cintas',
  'EQ041': 'Mallas', 'EQ042': 'Mallas', 'EQ043': 'Mallas'
};

const sourceDir = '/Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/PRODUCTOS-PRILABSA/PRILABSA_PRODUCTOS_WEB_READY/EQUIPOS';
const productosFile = '/Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/src/data/productos.ts';

function parseMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  let frontMatterEnd = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      frontMatterEnd = i;
      break;
    }
  }
  
  if (frontMatterEnd === -1) {
    throw new Error(`No se encontró frontmatter válido en ${filePath}`);
  }
  
  const frontMatter = {};
  for (let i = 1; i < frontMatterEnd; i++) {
    const line = lines[i].trim();
    if (line && line.includes(':')) {
      const [key, ...valueParts] = line.split(':');
      let value = valueParts.join(':').trim();
      
      // Limpiar comillas
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      frontMatter[key.trim()] = value;
    }
  }
  
  return { frontMatter };
}

function generateProductEntry(productCode, data) {
  const id = `prod-${Math.floor(Math.random() * 900) + 100}`;
  const title = data.frontMatter.title || data.frontMatter.product_code || productCode;
  const description = (data.frontMatter.description || '').replace(/"/g, '\\"');
  const keywords = data.frontMatter.keywords || `${subcategoryMap[productCode].toLowerCase()}, camarones, acuicultura, equipos, prilabsa`;
  const slug = data.frontMatter.seo_slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  
  return `  {
    id: "${id}",
    name: "${title}",
    productCode: "${productCode}",
    category: "equipos",
    subcategory: "${subcategoryMap[productCode] || 'General'}",
    description: "${description}",
    image: "/assets/images/productos/equipos/${productCode}.png",
    ficha: "/assets/pdfs/productos/equipos/${productCode}_ficha.pdf",
    keywords: "${keywords}",
    slug: "${slug}",
    featured: false,
    active: true
  }`;
}

async function main() {
  console.log('🚀 Iniciando corrección FINAL de productos EQUIPOS...');
  
  const newProducts = [];
  
  for (const productCode of missingEquipos) {
    const subcategory = subcategoryMap[productCode];
    console.log(`📦 Procesando ${productCode} (${subcategory})...`);
    
    // Buscar archivo markdown
    const productDir = path.join(sourceDir, subcategory, `${productCode}_*`);
    const dirs = glob.sync(productDir);
    
    if (dirs.length === 0) {
      console.log(`❌ No se encontró directorio para ${productCode}`);
      continue;
    }
    
    const sourceProductDir = dirs[0];
    const productName = path.basename(sourceProductDir);
    const markdownFile = path.join(sourceProductDir, `${productName}.md`);
    
    if (!fs.existsSync(markdownFile)) {
      console.log(`❌ No se encontró archivo markdown para ${productCode}`);
      continue;
    }
    
    try {
      // Parsear datos del producto
      const data = parseMarkdownFile(markdownFile);
      
      // Generar entrada del producto
      const productEntry = generateProductEntry(productCode, data);
      newProducts.push(productEntry);
      
      console.log(`✅ ${productCode} procesado correctamente`);
      
    } catch (error) {
      console.log(`❌ Error procesando ${productCode}: ${error.message}`);
    }
  }
  
  // Leer productos.ts actual
  let productosContent = fs.readFileSync(productosFile, 'utf8');
  
  // MÉTODO SIMPLE Y DIRECTO: Reemplazar el cierre del array
  const closingPattern = '];\n\nexport default productos;';
  
  if (!productosContent.includes(closingPattern)) {
    console.log('❌ No se encontró el patrón de cierre esperado');
    console.log('Buscando patrones alternativos...');
    
    // Intentar con variaciones
    const alternatives = [
      '];\nexport default productos;',
      '];\n\nexport default productos;',
      '];\n\n\nexport default productos;'
    ];
    
    let found = false;
    for (const alt of alternatives) {
      if (productosContent.includes(alt)) {
        console.log(`✅ Encontrado patrón alternativo: ${JSON.stringify(alt)}`);
        const newProductsString = ',\n' + newProducts.join(',\n') + '\n';
        const updatedContent = productosContent.replace(alt, newProductsString + alt);
        fs.writeFileSync(productosFile, updatedContent);
        found = true;
        break;
      }
    }
    
    if (!found) {
      console.log('❌ No se pudo encontrar ningún patrón de cierre válido');
      return;
    }
  } else {
    // Insertar nuevos productos
    const newProductsString = ',\n' + newProducts.join(',\n') + '\n';
    const updatedContent = productosContent.replace(closingPattern, newProductsString + closingPattern);
    fs.writeFileSync(productosFile, updatedContent);
  }
  
  console.log(`\n🎉 ¡Corrección FINAL completada!`);
  console.log(`📊 Productos agregados: ${newProducts.length}`);
  
  // Verificar el resultado
  const finalContent = fs.readFileSync(productosFile, 'utf8');
  const finalCount = (finalContent.match(/"productCode":/g) || []).length;
  console.log(`📊 Verificación final: ${finalCount} productos en el archivo`);
  
  if (finalCount === 101) {
    console.log('🎯 ¡ÉXITO! Se alcanzaron los 101 productos esperados');
  } else {
    console.log(`⚠️  Advertencia: Se esperaban 101 productos, se encontraron ${finalCount}`);
  }
}

main().catch(console.error);