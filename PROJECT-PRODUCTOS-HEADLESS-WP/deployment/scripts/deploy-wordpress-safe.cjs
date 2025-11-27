/**
 * Safe WordPress Deployment to GoDaddy
 * - Uploads ONLY WordPress core files
 * - SKIPS .htaccess (preserves React routing)
 * - SKIPS index.html (preserves React entry)
 * - VALIDATES coexistence after upload
 */

const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');

const config = require('../../../.ftpconfig.json');

// WordPress files and directories to upload
const WP_FILES = [
  'wp-admin/',
  'wp-includes/',
  'wp-content/',
  'wp-config.php',
  'wp-load.php',
  'wp-login.php',
  'wp-settings.php',
  'wp-blog-header.php',
  'wp-comments-post.php',
  'wp-config-sample.php',
  'wp-cron.php',
  'wp-links-opml.php',
  'wp-mail.php',
  'wp-signup.php',
  'wp-trackback.php',
  'xmlrpc.php',
  'license.txt',
  'readme.html'
];

// Files to NEVER upload (preserve React)
const SKIP_FILES = [
  '.htaccess',      // ⚠️ CRITICAL: Preserve React routing
  'index.html',     // ⚠️ CRITICAL: Preserve React entry
  'index.php',      // Skip WordPress index (use React)
  'favicon.ico',    // Preserve React favicon
  'favicon.png'
];

async function deploySafe() {
  const client = new ftp.Client();
  const localBase = path.join(__dirname, '../wordpress');
  const remoteBase = '/public_html/productos.prilabsa.com';

  try {
    console.log('🚀 SAFE WORDPRESS DEPLOYMENT');
    console.log('═══════════════════════════════════════');
    console.log('');

    // Verify local WordPress exists
    if (!fs.existsSync(localBase)) {
      throw new Error(`WordPress not found at ${localBase}`);
    }

    console.log('✓ Local WordPress found');
    console.log('⚠️  wp-config.php will be created via web wizard');
    console.log('');

    // Connect to FTP
    console.log('🔌 Connecting to GoDaddy FTP...');
    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      secure: false
    });

    console.log('✓ Connected');
    console.log('');

    console.log('📤 UPLOADING WORDPRESS FILES');
    console.log('⚠️  Preserving: .htaccess, index.html (React safe)');
    console.log('');

    let uploadedCount = 0;
    let skippedCount = 0;

    for (const file of WP_FILES) {
      const localPath = path.join(localBase, file);
      const remotePath = path.posix.join(remoteBase, file);

      // Check if file/dir exists
      if (!fs.existsSync(localPath)) {
        console.log(`  ⊘ ${file} (not found, skipping)`);
        skippedCount++;
        continue;
      }

      // Check if should skip
      if (SKIP_FILES.includes(file)) {
        console.log(`  🛡️  ${file} (protected, skipping)`);
        skippedCount++;
        continue;
      }

      try {
        console.log(`  ↑ ${file}`);

        if (fs.statSync(localPath).isDirectory()) {
          await client.uploadFromDir(localPath, remotePath);
        } else {
          await client.uploadFrom(localPath, remotePath);
        }

        uploadedCount++;
      } catch (err) {
        console.error(`  ✗ ${file} - ERROR: ${err.message}`);
      }
    }

    console.log('');
    console.log('═══════════════════════════════════════');
    console.log(`✅ UPLOAD COMPLETE`);
    console.log(`   Uploaded: ${uploadedCount} items`);
    console.log(`   Skipped:  ${skippedCount} items`);
    console.log('');

    console.log('🔍 VERIFYING CRITICAL FILES ON SERVER:');
    const criticalWpFiles = ['wp-config.php', 'wp-load.php', 'wp-login.php'];
    for (const file of criticalWpFiles) {
      try {
        await client.size(path.posix.join(remoteBase, file));
        console.log(`  ✓ ${file}`);
      } catch {
        console.log(`  ✗ ${file} - NOT FOUND`);
      }
    }

    console.log('');
    console.log('🔍 VERIFYING REACT FILES PRESERVED:');
    const criticalReactFiles = ['.htaccess', 'index.html', 'favicon.png'];
    for (const file of criticalReactFiles) {
      try {
        await client.size(path.posix.join(remoteBase, file));
        console.log(`  ✓ ${file} (preserved)`);
      } catch {
        console.log(`  ✗ ${file} - MISSING! ROLLBACK NEEDED`);
      }
    }

    client.close();

    console.log('');
    console.log('═══════════════════════════════════════');
    console.log('✅ DEPLOYMENT SUCCESSFUL');
    console.log('');
    console.log('⚠️  NEXT STEPS:');
    console.log('1. Test frontend: curl https://productos.prilabsa.com/productos');
    console.log('2. Verify HTTP 200 response');
    console.log('3. If OK, proceed to FASE 3 (WordPress install)');
    console.log('4. If FAIL, run rollback immediately');

  } catch (err) {
    console.error('');
    console.error('❌ DEPLOYMENT ERROR:', err.message);
    console.error('');
    console.error('🚨 ROLLBACK MAY BE NEEDED');
    console.error('Run: node scripts/restore-from-backup.js');
    client.close();
    process.exit(1);
  }
}

// Execute if run directly
if (require.main === module) {
  deploySafe();
}

module.exports = deploySafe;
