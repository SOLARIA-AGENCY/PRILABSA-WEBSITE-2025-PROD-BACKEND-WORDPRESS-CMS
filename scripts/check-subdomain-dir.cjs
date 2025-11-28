#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ftp = require('basic-ftp');

async function checkSubdomainDir() {
  const configPath = path.join(__dirname, '..', '.ftpconfig.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  console.log('\n🔍 CHECKING SUBDOMAIN DIRECTORY');
  console.log('================================\n');

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

    // Check /public_html/productos.prilabsa.com
    console.log('📁 Checking /public_html/productos.prilabsa.com/...\n');

    await client.cd('/public_html/productos.prilabsa.com');
    const files = await client.list();

    console.log(`Found ${files.length} items:\n`);

    const critical = ['index.html', '.htaccess', 'favicon.png', 'assets'];
    for (const name of critical) {
      const file = files.find(f => f.name === name);
      if (file) {
        const type = file.isDirectory ? '📁' : '📄';
        const size = file.isDirectory ? '' : `${Math.round(file.size / 1024)}KB`;
        console.log(`✓ ${type} ${name} ${size}`);
      } else {
        console.log(`✗ ${name} - MISSING`);
      }
    }

    console.log('\n✅ Check complete\n');
    client.close();
    process.exit(0);

  } catch (error) {
    console.error(`\n❌ Failed: ${error.message}`);
    client.close();
    process.exit(1);
  }
}

checkSubdomainDir();
