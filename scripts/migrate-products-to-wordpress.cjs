#!/usr/bin/env node

/**
 * PRILABSA Products Migration to WordPress v2.0
 * Uses prepared migration-data.json for accurate multilingual content
 *
 * Usage: node scripts/migrate-products-to-wordpress.cjs [--batch-size=10] [--start-from=0]
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const CONFIG = {
  wpApiUrl: 'https://productos.prilabsa.com/wp-json',
  jwtUser: 'facipp',
  jwtPassword: 'SolariaAdmin2025!',
  batchSize: parseInt(process.argv.find(a => a.startsWith('--batch-size='))?.split('=')[1] || '10'),
  startFrom: parseInt(process.argv.find(a => a.startsWith('--start-from='))?.split('=')[1] || '0'),
};

// Paths
const BASE_PATH = path.join(__dirname, '..');
const MIGRATION_DATA = path.join(__dirname, 'migration-data.json');
const IMAGES_PATH = path.join(BASE_PATH, 'MODULO PRODUCTOS PRILABSA CATALOGO JULIO 2025', 'FOTOS PRODUCTOS CODIGOS');
const PDFS_PATH = path.join(BASE_PATH, 'MODULO PRODUCTOS PRILABSA CATALOGO JULIO 2025', 'FICHAS TECNICAS PRODUCTOS PDF CODIGOS');
const ENTREGA_IMAGES = path.join(BASE_PATH, 'PRILABSA-ENTREGA-CLIENTE', 'assets', 'images', 'productos');

// HTTP request helper
function httpRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (res.statusCode >= 400) {
            reject({ status: res.statusCode, ...json });
          } else {
            resolve(json);
          }
        } catch (e) {
          resolve(data);
        }
      });
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

// Get JWT token
async function getJwtToken() {
  const url = new URL(`${CONFIG.wpApiUrl}/jwt-auth/v1/token`);
  const options = {
    hostname: url.hostname,
    port: 443,
    path: url.pathname,
    method: 'POST',
    protocol: 'https:',
    headers: { 'Content-Type': 'application/json' }
  };

  const body = JSON.stringify({
    username: CONFIG.jwtUser,
    password: CONFIG.jwtPassword
  });

  const response = await httpRequest(options, body);
  if (!response.token) {
    throw new Error('Failed to get JWT token: ' + JSON.stringify(response));
  }
  return response.token;
}

// Upload media to WordPress
async function uploadMedia(token, filePath, filename, mimeType) {
  const fileContent = fs.readFileSync(filePath);
  const url = new URL(`${CONFIG.wpApiUrl}/wp/v2/media`);

  const options = {
    hostname: url.hostname,
    port: 443,
    path: url.pathname,
    method: 'POST',
    protocol: 'https:',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
      'Content-Type': mimeType,
      'Content-Length': fileContent.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (res.statusCode >= 400) {
            console.error(`  ⚠️ Media upload failed: ${filename}`, json.message || json.code);
            resolve(null);
          } else {
            resolve(json);
          }
        } catch (e) {
          console.error(`  ⚠️ Media parse error: ${filename}`);
          resolve(null);
        }
      });
    });
    req.on('error', reject);
    req.write(fileContent);
    req.end();
  });
}

// Find image file for a product
function findImagePath(codigo) {
  // Check catalog directory first
  if (fs.existsSync(IMAGES_PATH)) {
    const files = fs.readdirSync(IMAGES_PATH);
    for (const file of files) {
      if (file.toUpperCase().startsWith(codigo.toUpperCase())) {
        return path.join(IMAGES_PATH, file);
      }
    }
  }

  // Check entrega directory by category
  const categoryDirs = {
    'AD': 'aditivos',
    'AL': 'alimentos',
    'EQ': 'equipos',
    'PB': 'probioticos',
    'QU': 'quimicos'
  };

  const prefix = codigo.substring(0, 2);
  const categoryDir = categoryDirs[prefix];

  if (categoryDir) {
    const catPath = path.join(ENTREGA_IMAGES, categoryDir);
    if (fs.existsSync(catPath)) {
      // Check direct files
      const files = fs.readdirSync(catPath);
      for (const file of files) {
        if (file.toUpperCase().includes(codigo.toUpperCase())) {
          return path.join(catPath, file);
        }
      }

      // Check subdirectories
      const subdirs = fs.readdirSync(catPath, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name);

      for (const subdir of subdirs) {
        const subPath = path.join(catPath, subdir);
        const subFiles = fs.readdirSync(subPath);
        for (const file of subFiles) {
          if (file.toUpperCase().includes(codigo.toUpperCase())) {
            return path.join(subPath, file);
          }
        }
      }
    }
  }

  return null;
}

// Find PDF file for a product
function findPdfPath(codigo) {
  if (fs.existsSync(PDFS_PATH)) {
    const files = fs.readdirSync(PDFS_PATH);
    for (const file of files) {
      if (file.toUpperCase().startsWith(codigo.toUpperCase())) {
        return path.join(PDFS_PATH, file);
      }
    }
  }
  return null;
}

// Create product in WordPress
async function createProduct(token, product, imageId) {
  const url = new URL(`${CONFIG.wpApiUrl}/wp/v2/productos`);

  // Build POST data with all ACF fields + taxonomy
  const postData = {
    title: product.nombre_producto_es,
    status: 'publish',
    slug: product.codigo.toLowerCase(),

    // WordPress taxonomy assignment
    'categorias-productos': product.categoria_wp_id ? [product.categoria_wp_id] : [],

    // ACF fields (passed directly, not wrapped in "acf")
    codigo: product.codigo,
    categoria: product.categoria || '',

    // Spanish
    nombre_producto_es: product.nombre_producto_es || '',
    descripcion_es: product.descripcion_es || '',
    descripcion_corta_es: product.descripcion_corta_es || '',
    beneficio_1_es: product.beneficio_1_es || '',
    beneficio_2_es: product.beneficio_2_es || '',
    beneficio_3_es: product.beneficio_3_es || '',
    presentacion_es: product.presentacion_es || '',

    // English
    nombre_producto_en: product.nombre_producto_en || '',
    descripcion_en: product.descripcion_en || '',
    descripcion_corta_en: product.descripcion_corta_en || '',
    beneficio_1_en: product.beneficio_1_en || '',
    beneficio_2_en: product.beneficio_2_en || '',
    beneficio_3_en: product.beneficio_3_en || '',
    presentacion_en: product.presentacion_en || '',

    // Portuguese
    nombre_producto_pt: product.nombre_producto_pt || '',
    descripcion_pt: product.descripcion_pt || '',
    descripcion_corta_pt: product.descripcion_corta_pt || '',
    beneficio_1_pt: product.beneficio_1_pt || '',
    beneficio_2_pt: product.beneficio_2_pt || '',
    beneficio_3_pt: product.beneficio_3_pt || '',
    presentacion_pt: product.presentacion_pt || ''
  };

  // Set featured image
  if (imageId) {
    postData.featured_media = imageId;
  }

  const options = {
    hostname: url.hostname,
    port: 443,
    path: url.pathname,
    method: 'POST',
    protocol: 'https:',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(postData);
  return httpRequest(options, body);
}

// Main migration function
async function migrate() {
  console.log('🚀 PRILABSA Products Migration to WordPress v2.0');
  console.log('='.repeat(50));
  console.log(`Config: Batch size=${CONFIG.batchSize}, Start from=${CONFIG.startFrom}`);
  console.log('');

  // Check for migration data
  if (!fs.existsSync(MIGRATION_DATA)) {
    console.error('❌ migration-data.json not found!');
    console.error('   Run: node scripts/prepare-migration-data.cjs');
    process.exit(1);
  }

  // Load migration data
  console.log('📦 Loading migration data...');
  const products = JSON.parse(fs.readFileSync(MIGRATION_DATA, 'utf8'));
  console.log(`   Found ${products.length} products`);

  // Count translations
  const withTrans = products.filter(p => p.has_translation).length;
  console.log(`   With EN/PT translations: ${withTrans}`);

  // Get JWT token
  console.log('🔐 Authenticating...');
  const token = await getJwtToken();
  console.log('   ✅ Authenticated successfully');
  console.log('');

  // Process products
  const startIndex = CONFIG.startFrom;
  const endIndex = Math.min(startIndex + CONFIG.batchSize, products.length);

  console.log(`📤 Migrating products ${startIndex + 1} to ${endIndex} of ${products.length}`);
  console.log('-'.repeat(50));

  const results = {
    success: 0,
    failed: 0,
    errors: []
  };

  for (let i = startIndex; i < endIndex; i++) {
    const product = products[i];
    console.log(`\n[${i + 1}/${products.length}] ${product.codigo}: ${product.nombre_producto_es}`);

    try {
      // Find and upload image
      let imageId = null;
      const imagePath = findImagePath(product.codigo);
      if (imagePath) {
        console.log(`   📷 Uploading image...`);
        const imageResult = await uploadMedia(
          token,
          imagePath,
          path.basename(imagePath),
          'image/png'
        );
        if (imageResult && imageResult.id) {
          imageId = imageResult.id;
          console.log(`   ✅ Image uploaded (ID: ${imageId})`);
        }
      } else {
        console.log(`   ⚠️ No image found`);
      }

      // Create product
      console.log(`   📝 Creating product...`);
      const result = await createProduct(token, product, imageId);

      if (result && result.id) {
        // Verify taxonomy was assigned
        const taxAssigned = result['categorias-productos']?.length > 0;
        console.log(`   ✅ Product created (ID: ${result.id}) [Tax: ${taxAssigned ? '✓' : '✗'}]`);
        results.success++;
      } else {
        console.log(`   ❌ Failed to create product`);
        results.failed++;
        results.errors.push({ codigo: product.codigo, error: result });
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.log(`   ❌ Error: ${error.message || JSON.stringify(error)}`);
      results.failed++;
      results.errors.push({ codigo: product.codigo, error: error.message });
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 MIGRATION SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Successful: ${results.success}`);
  console.log(`❌ Failed: ${results.failed}`);

  if (results.errors.length > 0) {
    console.log('\nErrors:');
    results.errors.forEach(e => console.log(`  - ${e.codigo}: ${e.error}`));
  }

  if (endIndex < products.length) {
    console.log(`\n📌 Next batch: node scripts/migrate-products-to-wordpress.cjs --start-from=${endIndex}`);
  } else {
    console.log('\n🎉 All products migrated!');
  }
}

// Run migration
migrate().catch(console.error);
