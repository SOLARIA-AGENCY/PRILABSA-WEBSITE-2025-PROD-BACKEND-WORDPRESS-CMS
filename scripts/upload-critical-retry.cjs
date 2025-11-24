#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ftp = require('basic-ftp');

async function uploadWithRetry() {
  const configPath = path.join(__dirname, '..', '.ftpconfig.json');
  const distPath = path.join(__dirname, '..', 'dist');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  console.log('\n🚀 CRITICAL FILES UPLOAD (Active Mode + Retry)');
  console.log('==============================================\n');

  const client = new ftp.Client();
  client.ftp.verbose = false;
  client.ftp.timeout = 30000; // 30s timeout per operation

  try {
    console.log(`🔌 Connecting to ${config.host}...`);
    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      port: config.port || 21,
      secure: config.secure || false,
      // TRY ACTIVE MODE instead of passive
      // Remove passive: true to use active mode
    });

    await client.cd(config.remoteRoot || '/public_html');

    // Critical files to upload first
    const criticalFiles = [
      'index.html',
      'favicon.png',
      '.htaccess'
    ];

    console.log('📤 Uploading critical files...\n');

    for (const file of criticalFiles) {
      const localPath = path.join(distPath, file);
      if (fs.existsSync(localPath)) {
        let attempts = 0;
        const maxAttempts = 3;

        while (attempts < maxAttempts) {
          try {
            await client.uploadFrom(localPath, file);
            console.log(`✓ ${file}`);
            break;
          } catch (err) {
            attempts++;
            if (attempts >= maxAttempts) {
              console.log(`✗ ${file} - Failed after ${maxAttempts} attempts`);
              throw err;
            }
            console.log(`⚠ ${file} - Retry ${attempts}/${maxAttempts}...`);
            await new Promise(r => setTimeout(r, 2000)); // Wait 2s before retry
          }
        }
      } else {
        console.log(`⊘ ${file} - Not found locally`);
      }
    }

    // Upload assets directory
    console.log('\n📦 Uploading assets directory...\n');
    const assetsPath = path.join(distPath, 'assets');

    if (fs.existsSync(assetsPath)) {
      try {
        await client.ensureDir('assets');
        await client.cd('assets');

        const files = fs.readdirSync(assetsPath);
        console.log(`Found ${files.length} files in assets/`);

        let uploaded = 0;
        for (const file of files) {
          try {
            await client.uploadFrom(path.join(assetsPath, file), file);
            uploaded++;
            if (uploaded % 10 === 0) {
              console.log(`   [${uploaded}/${files.length}] ${file}`);
            }
          } catch (err) {
            console.log(`✗ ${file} - ${err.message}`);
          }
        }

        console.log(`\n✅ Uploaded ${uploaded}/${files.length} asset files`);
        await client.cd('..');
      } catch (err) {
        console.error(`❌ Assets upload failed: ${err.message}`);
      }
    }

    console.log('\n✅ Upload complete\n');
    client.close();
    process.exit(0);

  } catch (error) {
    console.error(`\n❌ Upload failed: ${error.message}`);
    client.close();
    process.exit(1);
  }
}

uploadWithRetry();
