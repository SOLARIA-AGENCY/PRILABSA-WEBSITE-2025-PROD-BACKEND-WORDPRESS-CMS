#!/usr/bin/env node
/**
 * Clean Deploy Script
 *
 * 1. Connects to GoDaddy FTP
 * 2. DELETES entire assets/ directory (removes corrupted phantom chunks)
 * 3. Uploads fresh dist/ contents
 * 4. Verifies deployment
 */

const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');

const CONFIG = {
  host: 'productos.prilabsa.com',
  user: 'solaria.charlie@blog.prilabsa.com',
  password: 'SoCh2025$%',
  port: 21,
  remoteRoot: '/public_html/productos.prilabsa.com'
};

const DIST_DIR = path.join(__dirname, '..', 'dist');

async function cleanDeploy() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  console.log('\n🚀 CLEAN DEPLOY - Prilabsa Website');
  console.log('═'.repeat(50));
  console.log(`📅 ${new Date().toISOString()}\n`);

  try {
    // Step 1: Connect
    console.log('📡 Connecting to GoDaddy FTP...');
    await client.access({
      host: CONFIG.host,
      user: CONFIG.user,
      password: CONFIG.password,
      port: CONFIG.port,
      secure: false
    });
    console.log('✅ Connected\n');

    await client.cd(CONFIG.remoteRoot);
    console.log(`📂 Remote root: ${CONFIG.remoteRoot}\n`);

    // Step 2: Clean assets directory
    console.log('🧹 CLEANING: Removing old assets/ directory...');
    try {
      await client.removeDir('assets');
      console.log('✅ Old assets/ removed\n');
    } catch (err) {
      console.log('ℹ️  assets/ does not exist or already clean\n');
    }

    // Step 3: Upload critical files first
    console.log('📤 UPLOADING CRITICAL FILES:');

    // Upload .htaccess
    console.log('   → .htaccess');
    await client.uploadFrom(path.join(DIST_DIR, '.htaccess'), '.htaccess');

    // Upload index.html
    console.log('   → index.html');
    await client.uploadFrom(path.join(DIST_DIR, 'index.html'), 'index.html');

    // Upload favicon.png
    console.log('   → favicon.png');
    await client.uploadFrom(path.join(DIST_DIR, 'favicon.png'), 'favicon.png');

    console.log('✅ Critical files uploaded\n');

    // Step 4: Upload assets directory
    console.log('📦 UPLOADING: assets/ directory...');
    console.log('   (This takes 2-4 minutes, please wait...)\n');

    const assetsStart = Date.now();
    await client.uploadFromDir(path.join(DIST_DIR, 'assets'), 'assets');
    const assetsTime = Math.round((Date.now() - assetsStart) / 1000);
    console.log(`✅ assets/ uploaded in ${assetsTime}s\n`);

    // Step 5: Upload images directory
    console.log('🖼️  UPLOADING: images/ directory...');
    await client.uploadFromDir(path.join(DIST_DIR, 'images'), 'images');
    console.log('✅ images/ uploaded\n');

    // Step 6: Upload locales directory if exists
    const localesPath = path.join(DIST_DIR, 'locales');
    if (fs.existsSync(localesPath)) {
      console.log('🌐 UPLOADING: locales/ directory...');
      await client.uploadFromDir(localesPath, 'locales');
      console.log('✅ locales/ uploaded\n');
    }

    // Step 7: Upload api directory if exists
    const apiPath = path.join(DIST_DIR, 'api');
    if (fs.existsSync(apiPath)) {
      console.log('🔌 UPLOADING: api/ directory...');
      await client.uploadFromDir(apiPath, 'api');
      console.log('✅ api/ uploaded\n');
    }

    // Step 8: Verify deployment
    console.log('🔍 VERIFYING DEPLOYMENT...');
    const files = await client.list();

    const criticalFiles = ['index.html', '.htaccess', 'favicon.png'];
    const criticalDirs = ['assets', 'images'];

    let allGood = true;
    for (const file of criticalFiles) {
      const exists = files.some(f => f.name === file);
      console.log(`   ${exists ? '✓' : '✗'} ${file}`);
      if (!exists) allGood = false;
    }
    for (const dir of criticalDirs) {
      const exists = files.some(f => f.name === dir && f.isDirectory);
      console.log(`   ${exists ? '✓' : '✗'} ${dir}/`);
      if (!exists) allGood = false;
    }

    // Check assets count
    await client.cd('assets');
    const assetsFiles = await client.list();
    const jsCount = assetsFiles.filter(f => f.name.endsWith('.js')).length;
    const cssCount = assetsFiles.filter(f => f.name.endsWith('.css')).length;
    console.log(`   → ${jsCount} JS files, ${cssCount} CSS files in assets/`);
    await client.cd('..');

    console.log('');
    console.log('═'.repeat(50));
    if (allGood) {
      console.log('✅ DEPLOYMENT SUCCESSFUL!');
      console.log('');
      console.log('🌐 Website: https://productos.prilabsa.com');
      console.log('🔗 Products: https://productos.prilabsa.com/productos');
      console.log('📝 Blog: https://productos.prilabsa.com/blog');
    } else {
      console.log('⚠️  DEPLOYMENT INCOMPLETE - Some files missing');
    }
    console.log('═'.repeat(50));

  } catch (error) {
    console.error('\n❌ DEPLOYMENT FAILED:', error.message);
    process.exit(1);
  } finally {
    client.close();
  }
}

cleanDeploy();
