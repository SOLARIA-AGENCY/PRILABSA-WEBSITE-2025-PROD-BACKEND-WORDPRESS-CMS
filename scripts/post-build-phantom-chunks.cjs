#!/usr/bin/env node
/**
 * Post-Build Script: Create Phantom Chunks
 *
 * Vite creates references to non-existent chunks in the bundle manifest.
 * This script creates dummy files to prevent 404 errors.
 *
 * Runs automatically after: npm run build
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'dist', 'assets');
const PHANTOM_CHUNKS = ['index2.js', 'warning.js', 'common2.js', 'navigation2.js', 'web-vitals.js'];

console.log('\n🔧 Creating phantom chunk files...\n');

// Ensure dist/assets exists
if (!fs.existsSync(DIST_DIR)) {
  console.error(`❌ ERROR: ${DIST_DIR} does not exist`);
  process.exit(1);
}

// Find main index.js file
const indexPath = path.join(DIST_DIR, 'index.js');
if (!fs.existsSync(indexPath)) {
  console.error('❌ ERROR: index.js not found');
  process.exit(1);
}

// Create phantom chunks by copying index.js
let created = 0;
let skipped = 0;

for (const chunk of PHANTOM_CHUNKS) {
  const chunkPath = path.join(DIST_DIR, chunk);

  if (fs.existsSync(chunkPath)) {
    console.log(`⏭️  Skipped ${chunk} (already exists)`);
    skipped++;
  } else {
    fs.copyFileSync(indexPath, chunkPath);
    console.log(`✅ Created ${chunk}`);
    created++;
  }
}

// Also create vendor.js and react.js if hashed versions exist
const vendorPattern = /vendor-[a-zA-Z0-9]+\.js$/;
const reactPattern = /react-[a-zA-Z0-9]+\.js$/;

const files = fs.readdirSync(DIST_DIR);

const vendorFile = files.find(f => vendorPattern.test(f));
const reactFile = files.find(f => reactPattern.test(f));

if (vendorFile && !fs.existsSync(path.join(DIST_DIR, 'vendor.js'))) {
  fs.copyFileSync(
    path.join(DIST_DIR, vendorFile),
    path.join(DIST_DIR, 'vendor.js')
  );
  console.log(`✅ Created vendor.js (from ${vendorFile})`);
  created++;
}

if (reactFile && !fs.existsSync(path.join(DIST_DIR, 'react.js'))) {
  fs.copyFileSync(
    path.join(DIST_DIR, reactFile),
    path.join(DIST_DIR, 'react.js')
  );
  console.log(`✅ Created react.js (from ${reactFile})`);
  created++;
}

// Create SVG copies with tildes
const svgDir = path.join(__dirname, '..', 'dist', 'assets', 'iniciodev', 'nuestro catalogo');

if (fs.existsSync(svgDir)) {
  const probioticos = path.join(svgDir, 'PROBIOTICOS.svg');
  const probioticosWithTilde = path.join(svgDir, 'PROBIÓTICOS.svg');

  if (fs.existsSync(probioticos) && !fs.existsSync(probioticosWithTilde)) {
    fs.copyFileSync(probioticos, probioticosWithTilde);
    console.log(`✅ Created PROBIÓTICOS.svg`);
    created++;
  }

  const quimicos = path.join(svgDir, 'QUIMICOS.svg');
  const quimicosWithTilde = path.join(svgDir, 'QUÍMICOS.svg');

  if (fs.existsSync(quimicos) && !fs.existsSync(quimicosWithTilde)) {
    fs.copyFileSync(quimicos, quimicosWithTilde);
    console.log(`✅ Created QUÍMICOS.svg`);
    created++;
  }
}

console.log(`\n📊 Summary: ${created} files created, ${skipped} skipped\n`);
console.log('✅ Post-build phantom chunks creation complete!\n');
