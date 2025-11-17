#!/usr/bin/env node

/**
 * Product Assets Deployment Script
 * Deploys product images, PDFs, and catalog JSON to WordPress uploads
 */

import fs from 'fs';
import path from 'path';
import ftp from 'basic-ftp';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`[${step}] ${message}`, 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

async function loadFTPConfig() {
  try {
    const configPath = path.join(__dirname, '..', '.ftpconfig.json');
    const configData = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configData);
    
    // Replace environment variables
    config.user = process.env.FTP_USER || config.user;
    config.password = process.env.FTP_PASSWORD || config.password;
    
    return config;
  } catch (error) {
    logError(`Failed to load FTP config: ${error.message}`);
    process.exit(1);
  }
}

async function deployProductAssets() {
  log('\n📦 Product Assets Deployment', 'bright');
  log('===============================\n', 'bright');
  
  const config = await loadFTPConfig();
  const client = new ftp.Client();
  client.ftp.verbose = true;
  
  try {
    logStep('FTP', 'Connecting to server...');
    await client.access(config);
    logSuccess('Connected to FTP server');
    
    // Create uploads directory structure
    const uploadsDir = '/wp-content/uploads/prilabsa-productos';
    const imagesDir = `${uploadsDir}/imagenes`;
    const pdfsDir = `${uploadsDir}/pdfs`;
    
    logStep('CREATE', 'Creating directory structure...');
    await client.ensureDir(imagesDir);
    await client.ensureDir(pdfsDir);
    logSuccess('Directory structure created');
    
    // Deploy catalog JSON
    const catalogPath = path.join(__dirname, '..', 'MODULO PRODUCTOS PRILABSA CATALOGO JULIO 2025', 'PRILABSA_CATALOGO_WEB_2025.json');
    if (fs.existsSync(catalogPath)) {
      logStep('UPLOAD', 'Uploading catalog JSON...');
      await client.uploadFrom(catalogPath, `${uploadsDir}/PRILABSA_CATALOGO_WEB_2025.json`);
      logSuccess('✅ Catalog JSON uploaded');
    } else {
      logWarning('Catalog JSON not found, skipping...');
    }
    
    // Deploy product images
    const imagesSourceDir = path.join(__dirname, '..', 'MODULO PRODUCTOS PRILABSA CATALOGO JULIO 2025', 'FOTOS PRODUCTOS CODIGOS');
    if (fs.existsSync(imagesSourceDir)) {
      logStep('UPLOAD', 'Uploading product images...');
      const imageFiles = fs.readdirSync(imagesSourceDir).filter(file => file.endsWith('.PNG'));
      
      let uploadedImages = 0;
      for (const filename of imageFiles.slice(0, 5)) { // Upload first 5 for testing
        const localPath = path.join(imagesSourceDir, filename);
        await client.uploadFrom(localPath, `${imagesDir}/${filename}`);
        uploadedImages++;
      }
      
      logSuccess(`✅ Uploaded ${uploadedImages} of ${imageFiles.length} images (sample for testing)`);
      
      if (imageFiles.length > 5) {
        logWarning(`⚠️  ${imageFiles.length - 5} remaining images can be uploaded manually`);
      }
    } else {
      logWarning('Images directory not found, skipping...');
    }
    
    // Deploy PDFs
    const pdfsSourceDir = path.join(__dirname, '..', 'MODULO PRODUCTOS PRILABSA CATALOGO JULIO 2025', 'FICHAS TECNICAS PRODUCTOS PDF CODIGOS');
    if (fs.existsSync(pdfsSourceDir)) {
      logStep('UPLOAD', 'Uploading product PDFs...');
      const pdfFiles = fs.readdirSync(pdfsSourceDir).filter(file => file.endsWith('.PDF'));
      
      let uploadedPdfs = 0;
      for (const filename of pdfFiles.slice(0, 5)) { // Upload first 5 for testing
        const localPath = path.join(pdfsSourceDir, filename);
        await client.uploadFrom(localPath, `${pdfsDir}/${filename}`);
        uploadedPdfs++;
      }
      
      logSuccess(`✅ Uploaded ${uploadedPdfs} of ${pdfFiles.length} PDFs (sample for testing)`);
      
      if (pdfFiles.length > 5) {
        logWarning(`⚠️  ${pdfFiles.length - 5} remaining PDFs can be uploaded manually`);
      }
    } else {
      logWarning('PDFs directory not found, skipping...');
    }
    
    // Verify deployment
    logStep('VERIFY', 'Verifying deployment...');
    const verifyDirs = [uploadsDir, imagesDir, pdfsDir];
    
    for (const dir of verifyDirs) {
      try {
        await client.cd(dir);
        const files = await client.list();
        logSuccess(`✅ ${dir}: ${files.length} files`);
      } catch (error) {
        logError(`❌ Cannot access ${dir}: ${error.message}`);
      }
    }
    
    client.close();
    logSuccess('\n🎉 Product assets deployment completed!');
    log('\n📋 Next Steps:', 'blue');
    log('1. Log into WordPress admin', 'blue');
    log('2. Navigate to Productos > Importar Productos', 'blue');
    log('3. Verify file paths are correct', 'blue');
    log('4. Run import with dry-run first', 'blue');
    log('5. Execute full import of 105 products', 'blue');
    
  } catch (error) {
    client.close();
    logError(`Deployment failed: ${error.message}`);
    
    // Provide troubleshooting
    log('\n🔧 Troubleshooting:', 'yellow');
    log('• Check FTP credentials', 'yellow');
    log('• Verify /wp-content/uploads directory exists', 'yellow');
    log('• Check file permissions', 'yellow');
    log('• Ensure sufficient disk space', 'yellow');
    
    process.exit(1);
  }
}

async function main() {
  try {
    await deployProductAssets();
  } catch (error) {
    logError(`Script failed: ${error.message}`);
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  log('\n⚠️  Deployment interrupted by user', 'yellow');
  process.exit(1);
});

// Run deployment
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { deployProductAssets };