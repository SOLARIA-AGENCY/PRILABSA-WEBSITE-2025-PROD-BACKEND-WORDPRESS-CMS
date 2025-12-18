#!/usr/bin/env node

/**
 * Upload MU-Plugin to WordPress via FTP
 */

import fs from 'fs';
import path from 'path';
import * as ftp from 'basic-ftp';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CONFIG_FILE = path.join(__dirname, '..', '.ftpconfig.json');
const MU_PLUGIN_FILE = path.join(__dirname, 'mu-plugins', 'prilabsa-descripcion-corta.php');

async function main() {
  console.log('📤 Uploading MU-Plugin to WordPress...\n');

  // Load FTP config
  if (!fs.existsSync(CONFIG_FILE)) {
    console.error('❌ .ftpconfig.json not found');
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    // Connect
    console.log('🔗 Connecting to FTP...');
    await client.access({
      host: config.host,
      port: config.port || 21,
      user: config.user,
      password: config.password,
      secure: config.secure || false
    });
    console.log('✅ Connected');

    // Navigate to mu-plugins directory
    const muPluginsPath = (config.remoteRoot || config.remotePath || '/').replace(/\/$/, '') + '/wp-content/mu-plugins';

    console.log(`📁 Navigating to ${muPluginsPath}...`);

    // Try to create mu-plugins directory if it doesn't exist
    try {
      await client.ensureDir(muPluginsPath);
    } catch (e) {
      console.log('   Directory already exists or cannot create');
    }

    await client.cd(muPluginsPath);
    console.log('✅ In mu-plugins directory');

    // Upload the file
    console.log('📤 Uploading prilabsa-descripcion-corta.php...');
    await client.uploadFrom(MU_PLUGIN_FILE, 'prilabsa-descripcion-corta.php');
    console.log('✅ File uploaded successfully!');

    // List files to verify
    const list = await client.list();
    console.log('\n📋 Files in mu-plugins:');
    list.forEach(f => console.log(`   - ${f.name}`));

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    client.close();
  }

  console.log('\n✅ MU-Plugin deployed successfully!');
  console.log('   The descripcion_corta fields should now be available in WordPress.');
}

main();
