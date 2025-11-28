/**
 * Upload ONLY critical WordPress files (fast)
 * For completing incomplete upload
 */

const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');
const config = require('../../../.ftpconfig.json');

// Archivos críticos que faltan
const criticalFiles = [
  'wp-content/',
  'wp-login.php',
  'wp-load.php',
  'wp-config-sample.php',
  'wp-settings.php',
  'wp-blog-header.php',
  'wp-cron.php',
  'wp-signup.php',
  'wp-trackback.php',
  'xmlrpc.php',
  'license.txt',
  'readme.html'
];

async function uploadCritical() {
  const client = new ftp.Client();
  const localBase = path.join(__dirname, '../wordpress');
  const remoteBase = '/public_html/productos.prilabsa.com';

  try {
    console.log('🚀 UPLOADING CRITICAL WORDPRESS FILES');
    console.log('═══════════════════════════════════════');
    console.log('');

    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      secure: false
    });

    console.log('✓ Connected to FTP');
    console.log('');
    console.log('Uploading missing files...');
    console.log('');

    for (const file of criticalFiles) {
      const localPath = path.join(localBase, file);
      const remotePath = path.posix.join(remoteBase, file);

      if (!fs.existsSync(localPath)) {
        console.log(`  ⊘ ${file} (not found locally)`);
        continue;
      }

      console.log(`  ↑ ${file}`);

      try {
        if (fs.statSync(localPath).isDirectory()) {
          await client.uploadFromDir(localPath, remotePath);
        } else {
          await client.uploadFrom(localPath, remotePath);
        }
      } catch (err) {
        console.log(`  ✗ ${file} - Error: ${err.message}`);
      }
    }

    console.log('');
    console.log('✅ UPLOAD COMPLETO');

    client.close();

  } catch (err) {
    console.error('');
    console.error('❌ Error:', err.message);
    client.close();
    process.exit(1);
  }
}

if (require.main === module) {
  uploadCritical();
}

module.exports = uploadCritical;
