#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ftp = require('basic-ftp');

async function uploadAll() {
  const configPath = path.join(__dirname, '..', '.ftpconfig.json');
  const distPath = path.join(__dirname, '..', 'dist');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  console.log('\n🚀 FAST UPLOAD - All dist/ files');
  console.log('================================\n');

  const client = new ftp.Client();
  client.ftp.verbose = false;
  client.ftp.timeout = 120000;

  try {
    console.log(`🔌 Connecting to ${config.host}...`);
    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      port: config.port || 21,
      secure: config.secure || false
    });

    await client.cd(config.remoteRoot || '/public_html');

    console.log('📤 Uploading all files from dist/...\n');

    let uploadedCount = 0;
    client.trackProgress(info => {
      if (info.type === 'upload') {
        uploadedCount++;
        if (uploadedCount % 10 === 0 || uploadedCount < 10) {
          console.log(`   [${uploadedCount}] ${info.name}`);
        }
      }
    });

    await client.uploadFromDir(distPath);
    client.trackProgress(); // Stop tracking

    console.log(`\n✅ Upload complete: ${uploadedCount} files\n`);
    client.close();
    process.exit(0);

  } catch (error) {
    console.error(`\n❌ Upload failed: ${error.message}`);
    client.close();
    process.exit(1);
  }
}

uploadAll();
