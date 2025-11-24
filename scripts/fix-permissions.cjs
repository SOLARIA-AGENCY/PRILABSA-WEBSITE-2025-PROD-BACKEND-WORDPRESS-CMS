#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ftp = require('basic-ftp');

async function fixPermissions() {
  const configPath = path.join(__dirname, '..', '.ftpconfig.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  console.log('\n🔧 FIXING FILE PERMISSIONS');
  console.log('==========================\n');

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

    async function chmodRecursive(dir = '.') {
      const files = await client.list(dir);

      for (const file of files) {
        const filePath = dir === '.' ? file.name : `${dir}/${file.name}`;

        if (file.isDirectory) {
          // Set directory permissions to 755
          await client.send('SITE CHMOD 755 ' + filePath);
          console.log(`📁 755 ${filePath}/`);

          // Recurse into directory
          await chmodRecursive(filePath);
        } else {
          // Set file permissions to 644
          await client.send('SITE CHMOD 644 ' + filePath);
          if (filePath === 'index.html' || filePath === '.htaccess') {
            console.log(`📄 644 ${filePath} ✓`);
          }
        }
      }
    }

    await chmodRecursive();

    console.log('\n✅ Permissions fixed\n');
    client.close();
    process.exit(0);

  } catch (error) {
    console.error(`\n❌ Failed: ${error.message}`);
    client.close();
    process.exit(1);
  }
}

fixPermissions();
