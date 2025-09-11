#!/usr/bin/env node

// Normalize/rename tracked public images to the exact expected uppercase filenames
// from src/data/products/julio-2025.ts. This avoids case/diacritic mismatches.

const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const TS_PRODUCTS = path.resolve(ROOT, 'src/data/products/julio-2025.ts');
const PUBLIC_DIR = path.resolve(ROOT, 'public/assets/images/productos');

function sh(cmd) {
  return cp.execSync(cmd, { stdio: 'pipe', cwd: ROOT }).toString().trim();
}

function isTracked(filePath) {
  try {
    const rel = path.relative(ROOT, filePath);
    sh(`git ls-files --error-unmatch "${rel}"`);
    return true;
  } catch {
    return false;
  }
}

function normalizeName(s) {
  return s
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/\\/g, '/')
    .replace(/\s+/g, '_')
    .replace(/[^A-Z0-9_\.\/]/g, '_')
    .replace(/_+/g, '_');
}

function main() {
  const ts = fs.readFileSync(TS_PRODUCTS, 'utf8');
  const expected = Array.from(ts.matchAll(/\/assets\/images\/productos\/([^\"]+)/g)).map(m => m[1]);
  const expectedSet = new Set(expected);
  const files = fs.readdirSync(PUBLIC_DIR, { withFileTypes: true })
                  .filter(d => d.isFile())
                  .map(d => d.name);

  // Build normalized lookup for current tracked files only (top-level)
  const normMap = new Map();
  for (const f of files) {
    const full = path.join(PUBLIC_DIR, f);
    if (!isTracked(full)) continue; // operate only on tracked files
    normMap.set(normalizeName(f), f);
  }

  let renamed = 0;
  let skipped = 0;
  let collisions = 0;

  for (const destName of expected) {
    const destPath = path.join(PUBLIC_DIR, destName);
    const normKey = normalizeName(destName);
    const current = normMap.get(normKey);
    if (!current) { skipped++; continue; }
    const srcPath = path.join(PUBLIC_DIR, current);
    if (srcPath === destPath) { skipped++; continue; }

    // If an untracked dest file exists (from previous builds), remove it to allow git mv
    if (fs.existsSync(destPath) && !isTracked(destPath)) {
      fs.rmSync(destPath, { force: true });
    }

    // Ensure parent dir exists
    fs.mkdirSync(path.dirname(destPath), { recursive: true });

    // Case-only rename on macOS requires intermediate name
    const tempPath = destPath + '.tmp_casefix';
    try {
      // Move to temp (if same directory)
      const relSrc = path.relative(ROOT, srcPath);
      const relTmp = path.relative(ROOT, tempPath);
      const relDest = path.relative(ROOT, destPath);
      sh(`git mv -f "${relSrc}" "${relTmp}"`);
      // Then to final destination
      sh(`git mv -f "${relTmp}" "${relDest}"`);
      renamed++;
      console.log(`mv: ${current} -> ${destName}`);
    } catch (e) {
      console.error(`Failed to rename ${current} -> ${destName}:`, e.message);
      collisions++;
      // Try to revert temp if exists
      if (fs.existsSync(tempPath) && !isTracked(tempPath)) {
        try { fs.rmSync(tempPath, { force: true }); } catch {}
      }
    }
  }

  console.log(`normalize-public-images-to-expected: renamed=${renamed}, skipped=${skipped}, collisions=${collisions}`);
}

try { main(); } catch (e) {
  console.error('normalize-public-images-to-expected failed:', e);
  process.exit(1);
}
