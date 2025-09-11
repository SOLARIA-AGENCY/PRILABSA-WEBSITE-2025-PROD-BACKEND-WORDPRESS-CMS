#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Lista de productos de EQUIPOS faltantes
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
const targetImagesDir = '/Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/public/assets/images/productos/equipos';
const targetPdfsDir = '/Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/public/assets/pdfs/productos/equipos';
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
  
  const bodyContent = lines.slice(frontMatterEnd + 1).join('\n');
  
  return { frontMatter, bodyContent };
}

function generateProductEntry(productCode, data) {
  const id = `prod-${Math.floor(Math.random() * 900) + 100}`;
  
  return `  {
    id: "${id}",
    name: "${data.frontMatter.title || data.frontMatter.product_code}",
    productCode: "${productCode}",
    category: "equipos",
    subcategory: "${subcategoryMap[productCode] || 'General'}",
    description: "${(data.frontMatter.description || '').replace(/"/g, '\\"')}",
    image: "/assets/images/productos/equipos/${productCode}.png",
    ficha: "/assets/pdfs/productos/equipos/${productCode}_ficha.pdf",
    keywords: "${data.frontMatter.keywords || 'equipos, acuicultura, prilabsa'}",
    slug: "${data.frontMatter.seo_slug || productCode.toLowerCase()}",
    featured: false,
    active: true
  }`;
}

async function copyAssets(productCode, subcategory) {
  const productDir = path.join(sourceDir, subcategory, `${productCode}_*`);
  const dirs = glob.sync(productDir);
  
  if (dirs.length === 0) {
    console.log(`⚠️  No se encontró directorio para ${productCode}`);
    return false;
  }
  
  const sourceProductDir = dirs[0];
  const productName = path.basename(sourceProductDir);
  
  // Copiar imagen
  const sourceImage = path.join(sourceProductDir, `${productName}.png`);
  const targetImage = path.join(targetImagesDir, `${productCode}.png`);
  
  if (fs.existsSync(sourceImage)) {
    fs.copyFileSync(sourceImage, targetImage);
    console.log(`✅ Imagen copiada: ${productCode}.png`);
  } else {
    console.log(`⚠️  Imagen no encontrada: ${sourceImage}`);
  }
  
  // Copiar PDF
  const sourcePdf = path.join(sourceProductDir, `${productName}_ficha.pdf`);
  const targetPdf = path.join(targetPdfsDir, `${productCode}_ficha.pdf`);
  
  if (fs.existsSync(sourcePdf)) {
    fs.copyFileSync(sourcePdf, targetPdf);
    console.log(`✅ PDF copiado: ${productCode}_ficha.pdf`);
  } else {
    console.log(`⚠️  PDF no encontrado: ${sourcePdf}`);
  }
  
  return true;
}

async function main() {
  console.log('🚀 Iniciando implementación de productos EQUIPOS faltantes...');
  
  // Crear directorios si no existen
  if (!fs.existsSync(targetImagesDir)) {
    fs.mkdirSync(targetImagesDir, { recursive: true });
  }
  if (!fs.existsSync(targetPdfsDir)) {
    fs.mkdirSync(targetPdfsDir, { recursive: true });
  }
  
  const newProducts = [];
  
  for (const productCode of missingEquipos) {
    const subcategory = subcategoryMap[productCode];
    console.log(`\n📦 Procesando ${productCode} (${subcategory})...`);
    
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
      
      // Copiar assets
      await copyAssets(productCode, subcategory);
      
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
  
  // Encontrar el final del array de productos
  const lastProductIndex = productosContent.lastIndexOf('  }');
  const insertPosition = productosContent.indexOf('];', lastProductIndex);
  
  if (insertPosition === -1) {
    console.log('❌ No se pudo encontrar la posición de inserción en productos.ts');
    return;
  }
  
  // Insertar nuevos productos
  const newProductsString = ',\n' + newProducts.join(',\n');
  const updatedContent = productosContent.slice(0, insertPosition) + newProductsString + '\n' + productosContent.slice(insertPosition);
  
  // Escribir archivo actualizado
  fs.writeFileSync(productosFile, updatedContent);
  
  console.log(`\n🎉 ¡Implementación completada!`);
  console.log(`📊 Productos agregados: ${newProducts.length}`);
  console.log(`📊 Total esperado en sistema: ${58 + newProducts.length}/101`);
}

main().catch(console.error);