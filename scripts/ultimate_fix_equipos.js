import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Lista completa de productos EQUIPOS faltantes
const missingEquipos = [
  'EQ002', 'EQ003', 'EQ004', 'EQ005', 'EQ006', 'EQ007', 'EQ008', 'EQ009', 'EQ010',
  'EQ011', 'EQ012', 'EQ014', 'EQ015', 'EQ016', 'EQ017', 'EQ018', 'EQ019', 'EQ021',
  'EQ022', 'EQ023', 'EQ024', 'EQ025', 'EQ026', 'EQ027', 'EQ028', 'EQ029', 'EQ030',
  'EQ031', 'EQ032', 'EQ033', 'EQ034', 'EQ035', 'EQ036', 'EQ037', 'EQ039', 'EQ040',
  'EQ041', 'EQ042', 'EQ043'
];

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
  console.log('🚀 SOLUCIÓN DEFINITIVA: Agregando productos EQUIPOS...');
  
  // Hacer backup
  const backupFile = productosFile + '.backup-ultimate-fix';
  fs.copyFileSync(productosFile, backupFile);
  console.log(`💾 Backup creado: ${backupFile}`);
  
  // Generar todos los productos nuevos
  const newProducts = [];
  
  for (const productCode of missingEquipos) {
    const subcategory = subcategoryMap[productCode];
    console.log(`📦 Procesando ${productCode} (${subcategory})...`);
    
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
      const data = parseMarkdownFile(markdownFile);
      const productEntry = generateProductEntry(productCode, data);
      newProducts.push(productEntry);
      console.log(`✅ ${productCode} procesado correctamente`);
    } catch (error) {
      console.log(`❌ Error procesando ${productCode}: ${error.message}`);
    }
  }
  
  console.log(`\n📊 Productos generados: ${newProducts.length}`);
  
  // Leer archivo actual línea por línea
  const content = fs.readFileSync(productosFile, 'utf8');
  const lines = content.split('\n');
  
  // Encontrar la línea del último producto (antes del cierre del array)
  let lastProductIndex = -1;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].trim() === '}' && i > 0 && lines[i-1].includes('active: true')) {
      lastProductIndex = i;
      break;
    }
  }
  
  if (lastProductIndex === -1) {
    console.log('❌ No se pudo encontrar el último producto');
    return;
  }
  
  console.log(`🎯 Último producto encontrado en línea: ${lastProductIndex + 1}`);
  
  // Insertar nuevos productos después del último producto
  const newLines = [
    ...lines.slice(0, lastProductIndex + 1),
    ',',
    ...newProducts.join(',\n').split('\n'),
    ...lines.slice(lastProductIndex + 1)
  ];
  
  // Escribir archivo actualizado
  const updatedContent = newLines.join('\n');
  fs.writeFileSync(productosFile, updatedContent);
  
  console.log(`\n🎉 ¡SOLUCIÓN DEFINITIVA COMPLETADA!`);
  
  // Verificación final
  const finalContent = fs.readFileSync(productosFile, 'utf8');
  const finalCount = (finalContent.match(/"productCode":/g) || []).length;
  
  console.log(`📊 Verificación final: ${finalCount} productos en el archivo`);
  
  if (finalCount === 101) {
    console.log('🎯 ¡ÉXITO TOTAL! Se alcanzaron los 101 productos esperados');
  } else {
    console.log(`⚠️  Total actual: ${finalCount}/101`);
  }
  
  // Conteo por categorías
  const equiposCount = (finalContent.match(/"category": "equipos"/g) || []).length;
  console.log(`🔧 Productos EQUIPOS: ${equiposCount}/43`);
}

main().catch(console.error);