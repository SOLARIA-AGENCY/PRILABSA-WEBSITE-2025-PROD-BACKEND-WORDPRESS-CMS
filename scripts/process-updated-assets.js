#!/usr/bin/env node

/**
 * PRILABSA Asset Processing Script
 * Procesa las carpetas actualizadas de productos y copia assets a la estructura web
 * Comandante: ECO-NAZCAMEDIA procesando nueva clasificación de assets
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de rutas
const CONFIG = {
  sourceImages: 'MODULO PRODUCTOS PRILABSA CATALOGO JULIO 2025/FOTOS PRODUCTOS CODIGOS',
  sourcePDFs: 'MODULO PRODUCTOS PRILABSA CATALOGO JULIO 2025/FICHAS TECNICAS PRODUCTOS PDF CODIGOS',
  targetImages: 'public/assets/images/productos',
  targetPDFs: 'public/assets/pdfs/productos',
  catalogJSON: 'MODULO PRODUCTOS PRILABSA CATALOGO JULIO 2025/PRILABSA_CATALOGO_WEB_2025.json'
};

// Estadísticas de procesamiento
let stats = {
  imagesProcessed: 0,
  pdfsProcessed: 0,
  errors: /** @type {string[]} */ ([]),
  missingAssets: /** @type {string[]} */ ([]),
  duplicates: /** @type {string[]} */ ([])
};

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = {
    info: '🔄',
    success: '✅',
    error: '❌',
    warning: '⚠️'
  }[type];
  console.log(`${prefix} [${timestamp}] ${message}`);
}

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    log(`Directorio creado: ${dirPath}`, 'success');
  }
}

function copyFile(source, target) {
  try {
    fs.copyFileSync(source, target);
    return true;
  } catch (error) {
    stats.errors.push(`Error copiando ${source} -> ${target}: ${error.message}`);
    return false;
  }
}

function processImages() {
  log('Procesando imágenes de productos...');
  
  const sourceDir = CONFIG.sourceImages;
  const targetDir = CONFIG.targetImages;
  
  ensureDirectoryExists(targetDir);
  
  if (!fs.existsSync(sourceDir)) {
    log(`Directorio fuente no encontrado: ${sourceDir}`, 'error');
    return;
  }
  
  const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.png'));
  
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    
    if (copyFile(sourcePath, targetPath)) {
      stats.imagesProcessed++;
      log(`Imagen copiada: ${file}`);
    }
  });
  
  log(`Total imágenes procesadas: ${stats.imagesProcessed}`, 'success');
}

function processPDFs() {
  log('Procesando PDFs de productos...');
  
  const sourceDir = CONFIG.sourcePDFs;
  const targetDir = CONFIG.targetPDFs;
  
  ensureDirectoryExists(targetDir);
  
  if (!fs.existsSync(sourceDir)) {
    log(`Directorio fuente no encontrado: ${sourceDir}`, 'error');
    return;
  }
  
  const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.pdf'));
  
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    
    if (copyFile(sourcePath, targetPath)) {
      stats.pdfsProcessed++;
      log(`PDF copiado: ${file}`);
    }
  });
  
  log(`Total PDFs procesados: ${stats.pdfsProcessed}`, 'success');
}

function validateAssets() {
  log('Validando assets contra catálogo JSON...');
  
  if (!fs.existsSync(CONFIG.catalogJSON)) {
    log(`Catálogo JSON no encontrado: ${CONFIG.catalogJSON}`, 'error');
    return;
  }
  
  const catalog = JSON.parse(fs.readFileSync(CONFIG.catalogJSON, 'utf8'));
  const products = catalog.productos || [];
  
  products.forEach(product => {
    const codigo = product.codigo;
    const expectedImage = `${codigo}_${product.nombre.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
    const expectedPDF = `${codigo}_${product.nombre.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    
    // Verificar imagen
    const imagePath = path.join(CONFIG.targetImages, expectedImage);
    if (!fs.existsSync(imagePath)) {
      // Buscar variaciones del nombre
      const imageFiles = fs.readdirSync(CONFIG.targetImages)
        .filter(file => file.startsWith(codigo) && file.endsWith('.png'));
      
      if (imageFiles.length === 0) {
        stats.missingAssets.push(`Imagen faltante: ${expectedImage}`);
      } else if (imageFiles.length > 1) {
        stats.duplicates.push(`Múltiples imágenes para ${codigo}: ${imageFiles.join(', ')}`);
      }
    }
    
    // Verificar PDF
    const pdfPath = path.join(CONFIG.targetPDFs, expectedPDF);
    if (!fs.existsSync(pdfPath)) {
      // Buscar variaciones del nombre
      const pdfFiles = fs.readdirSync(CONFIG.targetPDFs)
        .filter(file => file.startsWith(codigo) && file.endsWith('.pdf'));
      
      if (pdfFiles.length === 0) {
        stats.missingAssets.push(`PDF faltante: ${expectedPDF}`);
      } else if (pdfFiles.length > 1) {
        stats.duplicates.push(`Múltiples PDFs para ${codigo}: ${pdfFiles.join(', ')}`);
      }
    }
  });
}

function generateReport() {
  log('Generando reporte de procesamiento...');
  
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      imagesProcessed: stats.imagesProcessed,
      pdfsProcessed: stats.pdfsProcessed,
      totalErrors: stats.errors.length,
      missingAssets: stats.missingAssets.length,
      duplicates: stats.duplicates.length
    },
    details: {
      errors: stats.errors,
      missingAssets: stats.missingAssets,
      duplicates: stats.duplicates
    }
  };
  
  const reportPath = 'asset-processing-report.json';
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  log(`Reporte generado: ${reportPath}`, 'success');
  
  // Mostrar resumen en consola
  console.log('\n📊 RESUMEN DE PROCESAMIENTO:');
  console.log(`✅ Imágenes procesadas: ${stats.imagesProcessed}`);
  console.log(`✅ PDFs procesados: ${stats.pdfsProcessed}`);
  console.log(`❌ Errores: ${stats.errors.length}`);
  console.log(`⚠️  Assets faltantes: ${stats.missingAssets.length}`);
  console.log(`🔄 Duplicados: ${stats.duplicates.length}`);
  
  if (stats.errors.length > 0) {
    console.log('\n❌ ERRORES:');
    stats.errors.forEach(error => console.log(`  - ${error}`));
  }
  
  if (stats.missingAssets.length > 0) {
    console.log('\n⚠️  ASSETS FALTANTES:');
    stats.missingAssets.forEach(missing => console.log(`  - ${missing}`));
  }
  
  if (stats.duplicates.length > 0) {
    console.log('\n🔄 DUPLICADOS:');
    stats.duplicates.forEach(duplicate => console.log(`  - ${duplicate}`));
  }
}

function main() {
  log('🚀 Iniciando procesamiento de assets actualizados...', 'info');
  log('ECO-NAZCAMEDIA: Procesando nueva clasificación de productos', 'info');
  
  try {
    // Procesar assets
    processImages();
    processPDFs();
    
    // Validar contra catálogo
    validateAssets();
    
    // Generar reporte
    generateReport();
    
    log('🎉 Procesamiento completado exitosamente!', 'success');
    
  } catch (error) {
    log(`Error crítico: ${error.message}`, 'error');
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main, CONFIG, stats };