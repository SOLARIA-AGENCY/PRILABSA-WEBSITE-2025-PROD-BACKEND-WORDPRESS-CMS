#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ftp = require('basic-ftp');

async function auditServer() {
  const configPath = path.join(__dirname, '..', '.ftpconfig.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  console.log('\n🔍 PRILABSA SERVER AUDIT');
  console.log('========================\n');

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

    await client.cd(config.remoteRoot || '/public_html');

    // List all files
    const files = await client.list();

    console.log(`📁 Files in ${config.remoteRoot}:`);
    console.log('─────────────────────────────────\n');

    const critical = ['index.html', '.htaccess', 'favicon.png'];
    const assetDir = files.find(f => f.name === 'assets' && f.isDirectory);

    for (const fileName of critical) {
      const file = files.find(f => f.name === fileName);
      if (file) {
        console.log(`✓ ${fileName} - ${Math.round(file.size / 1024)}KB`);
      } else {
        console.log(`✗ ${fileName} - MISSING!`);
      }
    }

    if (assetDir) {
      await client.cd('assets');
      const assets = await client.list();
      const reactBundle = assets.find(f => f.name.startsWith('react-'));

      if (reactBundle) {
        console.log(`✓ assets/${reactBundle.name} - ${Math.round(reactBundle.size / 1024)}KB`);
      } else {
        console.log(`✗ React bundle - MISSING!`);
      }

      await client.cd('..');
    } else {
      console.log(`✗ assets/ - DIRECTORY MISSING!`);
    }

    // Download and check .htaccess
    console.log('\n📄 .htaccess Content:');
    console.log('─────────────────────────────────\n');

    const htaccessContent = await new Promise((resolve, reject) => {
      let data = '';
      client.downloadTo(
        { write: chunk => data += chunk.toString() },
        '.htaccess'
      ).then(() => resolve(data)).catch(reject);
    });

    console.log(htaccessContent);

    // Download and check index.html (first 500 chars)
    console.log('\n📄 index.html (first 500 chars):');
    console.log('─────────────────────────────────\n');

    const indexContent = await new Promise((resolve, reject) => {
      let data = '';
      client.downloadTo(
        { write: chunk => data += chunk.toString() },
        'index.html'
      ).then(() => resolve(data)).catch(reject);
    });

    console.log(indexContent.substring(0, 500));

    console.log('\n\n✅ Audit Complete');
    client.close();

  } catch (error) {
    console.error(`\n❌ Audit failed: ${error.message}`);
    client.close();
    process.exit(1);
  }
}

auditServer();
