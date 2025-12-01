#!/usr/bin/env node
const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');

const CONFIG = {
  host: 'productos.prilabsa.com',
  user: 'solaria.charlie@blog.prilabsa.com',
  password: 'SoCh2025$%',
  remoteRoot: '/public_html/productos.prilabsa.com'
};

async function syncMissing() {
  const client = new ftp.Client();

  try {
    await client.access({
      host: CONFIG.host,
      user: CONFIG.user,
      password: CONFIG.password,
      secure: false
    });

    await client.cd(CONFIG.remoteRoot);

    // Sync assets
    console.log('📦 Syncing assets/...');
    await client.cd('assets');
    const serverAssets = (await client.list()).map(f => f.name);
    const localAssets = fs.readdirSync('dist/assets').filter(f =>
      f.endsWith('.js') || f.endsWith('.css')
    );

    const missingAssets = localAssets.filter(f => !serverAssets.includes(f));
    console.log(`   ${missingAssets.length} missing files`);

    for (const file of missingAssets) {
      console.log(`   → ${file}`);
      await client.uploadFrom(path.join('dist/assets', file), file);
    }
    await client.cd('..');

    // Sync images
    console.log('\n🖼️  Syncing images/...');
    await client.uploadFromDir('dist/images', 'images');

    // Verify
    console.log('\n🔍 Verifying...');
    await client.cd('assets');
    const finalAssets = await client.list();
    const jsCount = finalAssets.filter(f => f.name.endsWith('.js')).length;
    const cssCount = finalAssets.filter(f => f.name.endsWith('.css')).length;
    console.log(`   ${jsCount} JS files, ${cssCount} CSS files`);

    console.log('\n✅ SYNC COMPLETE');

  } catch(err) {
    console.error('Error:', err.message);
  } finally {
    client.close();
  }
}

syncMissing();
