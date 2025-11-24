#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ftp = require('basic-ftp');

async function uploadAssets() {
  const configPath = path.join(__dirname, '..', '.ftpconfig.json');
  const distPath = path.join(__dirname, '..', 'dist');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  console.log('\n📦 UPLOADING ASSETS DIRECTORY');
  console.log('==============================\n');

  const client = new ftp.Client();
  client.ftp.verbose = false;
  client.ftp.timeout = 60000;

  try {
    console.log(`🔌 Connecting to ${config.host}...`);
    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      port: config.port || 21,
      secure: config.secure || false
    });

    await client.cd(config.remoteRoot || '/public_html/productos.prilabsa.com');

    // Remove old empty assets directory if exists
    try {
      await client.removeDir('assets');
      console.log('🗑️  Removed old assets directory');
    } catch (err) {
      // Ignore if doesn't exist
    }

    // Upload assets directory
    const assetsPath = path.join(distPath, 'assets');
    console.log(`📤 Uploading assets from ${assetsPath}...\n`);

    await client.uploadFromDir(assetsPath, 'assets');

    console.log('\n✅ Assets upload complete\n');
    client.close();
    process.exit(0);

  } catch (error) {
    console.error(`\n❌ Upload failed: ${error.message}`);
    client.close();
    process.exit(1);
  }
}

uploadAssets();
