#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ftp = require('basic-ftp');

async function checkPermissions() {
  const configPath = path.join(__dirname, '..', '.ftpconfig.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  console.log('\n🔍 CHECKING SERVER PERMISSIONS');
  console.log('==============================\n');

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

    // List files with details
    const files = await client.list();

    console.log('Files in /public_html:');
    console.log('─────────────────────────────────\n');

    for (const file of files) {
      const type = file.isDirectory ? '📁' : '📄';
      const perms = file.permissions ? file.permissions.toString() : 'unknown';
      const size = file.isDirectory ? '' : `${Math.round(file.size / 1024)}KB`;

      console.log(`${type} ${perms} ${file.name.padEnd(30)} ${size}`);

      // Check critical files specifically
      if (file.name === 'index.html' || file.name === '.htaccess') {
        console.log(`   → User: ${file.user || 'unknown'}, Group: ${file.group || 'unknown'}`);
      }
    }

    console.log('\n✅ Check complete\n');
    client.close();
    process.exit(0);

  } catch (error) {
    console.error(`\n❌ Check failed: ${error.message}`);
    client.close();
    process.exit(1);
  }
}

checkPermissions();
