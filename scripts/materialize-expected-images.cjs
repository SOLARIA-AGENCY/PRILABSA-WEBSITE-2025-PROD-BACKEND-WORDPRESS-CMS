#!/usr/bin/env node

// Ensure that all images referenced in src/data/products/julio-2025.ts
// exist under public/assets/images/productos with the exact filename
// (case-sensitive) expected by the app. This duplicates existing files
// to the expected casing when needed, avoiding 404s on case-sensitive hosts.

const fs = require('fs');
const path = require('path');

const TS_PRODUCTS = path.resolve(__dirname, '../src/data/products/julio-2025.ts');
const PUBLIC_DIR = path.resolve(__dirname, '../public/assets/images/productos');

function normalizeName(s) {
  return s
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/\\/g, '/')
    .replace(/\s+/g, '_')
    .replace(/[^A-Z0-9_\.\/]/g, '_')
    .replace(/_+/g, '_');
}

function run() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.error('Public images directory not found:', PUBLIC_DIR);
    process.exit(0);
  }

  const ts = fs.readFileSync(TS_PRODUCTS, 'utf8');
  const expected = Array.from(ts.matchAll(/\/assets\/images\/productos\/([^\"]+)/g)).map(m => m[1]);
  const files = fs.readdirSync(PUBLIC_DIR).filter(f => !f.startsWith('.'));

  const normMap = new Map();
  for (const f of files) {
    normMap.set(normalizeName(f), f);
  }

  let created = 0;
  let already = 0;
  let missing = 0;

  for (const destName of expected) {
    const destPath = path.join(PUBLIC_DIR, destName);
    if (fs.existsSync(destPath)) {
      already++;
      continue;
    }
    const candidate = normMap.get(normalizeName(destName));
    if (candidate) {
      const srcPath = path.join(PUBLIC_DIR, candidate);
      fs.copyFileSync(srcPath, destPath);
      created++;
    } else {
      // Not found in public; leave to other copy scripts (if any)
      missing++;
    }
  }

  console.log(`materialize-expected-images: created ${created}, existing ${already}, missing ${missing}`);
}

try { run(); } catch (e) {
  console.error('materialize-expected-images failed:', e);
  process.exit(0);
}

