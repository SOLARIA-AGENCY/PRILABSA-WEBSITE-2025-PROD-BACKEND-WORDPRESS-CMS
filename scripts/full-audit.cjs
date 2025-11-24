#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ftp = require('basic-ftp');

async function fullAudit() {
  const configPath = path.join(__dirname, '..', '.ftpconfig.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  console.log('\n🔍 AUDITORÍA COMPLETA PRODUCTOS.PRILABSA.COM');
  console.log('=============================================\n');

  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      port: config.port || 21,
      secure: config.secure || false
    });

    console.log(`✓ Conectado a: ${config.host}`);
    console.log(`✓ Directorio remoto: ${config.remoteRoot}\n`);

    // Navigate to subdomain directory
    await client.cd(config.remoteRoot);

    // List all files in root
    const files = await client.list();

    console.log('📁 ARCHIVOS EN /public_html/productos.prilabsa.com/');
    console.log('─────────────────────────────────────────────────\n');

    const critical = ['index.html', '.htaccess', 'favicon.png'];
    const found = {};

    for (const name of critical) {
      const file = files.find(f => f.name === name);
      if (file) {
        console.log(`✓ ${name.padEnd(20)} ${Math.round(file.size / 1024)}KB`);
        found[name] = true;
      } else {
        console.log(`✗ ${name.padEnd(20)} FALTA!`);
        found[name] = false;
      }
    }

    // Check assets directory
    const assetsDir = files.find(f => f.name === 'assets' && f.isDirectory);
    if (assetsDir) {
      console.log(`✓ assets/              (directorio existe)`);

      await client.cd('assets');
      const assets = await client.list();
      console.log(`  → Contiene ${assets.length} archivos\n`);

      // Check critical bundles
      const bundles = [
        'index-DrX4ar27.js',
        'index-C2tgQzUA.css',
        'react-Dc2ZO6mo.js'
      ];

      console.log('📦 BUNDLES CRÍTICOS EN assets/');
      console.log('─────────────────────────────────────────────────\n');

      for (const bundle of bundles) {
        const file = assets.find(f => f.name === bundle);
        if (file) {
          console.log(`✓ ${bundle.padEnd(30)} ${Math.round(file.size / 1024)}KB`);
        } else {
          console.log(`✗ ${bundle.padEnd(30)} FALTA!`);
        }
      }

      await client.cd('..');
    } else {
      console.log(`✗ assets/              FALTA!\n`);
    }

    // Download and check .htaccess content
    if (found['.htaccess']) {
      console.log('\n📄 CONTENIDO DE .htaccess');
      console.log('─────────────────────────────────────────────────\n');

      const htaccessContent = await new Promise((resolve, reject) => {
        let data = '';
        client.downloadTo(
          { write: chunk => data += chunk.toString() },
          '.htaccess'
        ).then(() => resolve(data)).catch(reject);
      });

      console.log(htaccessContent);
    }

    // Download and check index.html first 1000 chars
    if (found['index.html']) {
      console.log('\n📄 INICIO DE index.html (primeros 1000 chars)');
      console.log('─────────────────────────────────────────────────\n');

      const indexContent = await new Promise((resolve, reject) => {
        let data = '';
        client.downloadTo(
          { write: chunk => data += chunk.toString() },
          'index.html'
        ).then(() => resolve(data)).catch(reject);
      });

      console.log(indexContent.substring(0, 1000));

      // Check for critical script tag
      if (indexContent.includes('index-DrX4ar27.js')) {
        console.log('\n✓ HTML contiene referencia correcta al bundle JS');
      } else {
        console.log('\n✗ HTML NO contiene referencia al bundle JS');
      }
    }

    console.log('\n\n✅ Auditoría completa\n');
    client.close();
    process.exit(0);

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    client.close();
    process.exit(1);
  }
}

fullAudit();
