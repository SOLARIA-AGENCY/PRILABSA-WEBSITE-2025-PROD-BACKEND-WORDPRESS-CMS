#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ftp = require('basic-ftp');

async function uploadHtaccess() {
  const configPath = path.join(__dirname, '..', '.ftpconfig.json');
  const htaccessPath = path.join(__dirname, '..', 'dist', '.htaccess');

  console.log('📤 Uploading .htaccess to GoDaddy...');

  // Load FTP config
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  // Check .htaccess exists
  if (!fs.existsSync(htaccessPath)) {
    console.error('❌ .htaccess not found in dist/');
    process.exit(1);
  }

  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    // Connect
    console.log(`🔌 Connecting to ${config.host}...`);
    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      port: config.port || 21,
      secure: config.secure || false
    });

    // Navigate to public_html
    await client.cd(config.remoteRoot || '/public_html');

    // Upload .htaccess
    await client.uploadFrom(htaccessPath, '.htaccess');
    console.log('✅ .htaccess uploaded successfully');

    client.close();
    process.exit(0);

  } catch (error) {
    console.error(`❌ Upload failed: ${error.message}`);
    client.close();
    process.exit(1);
  }
}

uploadHtaccess();
