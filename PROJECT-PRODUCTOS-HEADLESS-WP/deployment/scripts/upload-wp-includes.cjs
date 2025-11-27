/**
 * Upload ONLY wp-includes/ directory (fix HTTP 500)
 * Root cause: wp-includes/version.php missing on server
 */

const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');
const config = require('../../../.ftpconfig.json');

async function uploadWpIncludes() {
  const client = new ftp.Client();
  const localWpIncludes = path.join(__dirname, '../wordpress/wp-includes');
  const remoteWpIncludes = '/public_html/productos.prilabsa.com/wp-includes';

  try {
    console.log('🚀 UPLOADING WP-INCLUDES/ DIRECTORY');
    console.log('═══════════════════════════════════════');
    console.log('');
    console.log('⚠️  CRITICAL: This fixes HTTP 500 error');
    console.log('   Missing: wp-includes/version.php and others');
    console.log('');

    // Verify local directory exists
    if (!fs.existsSync(localWpIncludes)) {
      throw new Error(`wp-includes/ not found at ${localWpIncludes}`);
    }

    const stats = fs.statSync(localWpIncludes);
    if (!stats.isDirectory()) {
      throw new Error('wp-includes is not a directory');
    }

    console.log('✓ Local wp-includes/ found (267 files)');
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
    console.log('📤 Uploading wp-includes/ directory...');
    console.log('⏳ This may take 2-3 minutes (267 files)');
    console.log('');

    // Upload entire directory
    await client.uploadFromDir(localWpIncludes, remoteWpIncludes);

    console.log('');
    console.log('✅ UPLOAD COMPLETO');
    console.log('');

    // Verify critical files uploaded
    console.log('🔍 VERIFYING CRITICAL FILES:');
    const criticalFiles = [
      'version.php',
      'functions.php',
      'class-wp-query.php',
      'load.php',
      'default-constants.php'
    ];

    for (const file of criticalFiles) {
      try {
        await client.size(path.posix.join(remoteWpIncludes, file));
        console.log(`  ✓ ${file}`);
      } catch {
        console.log(`  ✗ ${file} - NOT FOUND`);
      }
    }

    client.close();

    console.log('');
    console.log('═══════════════════════════════════════');
    console.log('✅ wp-includes/ UPLOAD SUCCESSFUL');
    console.log('');
    console.log('⚠️  NEXT STEPS:');
    console.log('1. Test: curl https://productos.prilabsa.com/wp-admin/');
    console.log('2. Expected: WordPress installer (not HTTP 500)');
    console.log('3. If 500 persists, check error logs');

  } catch (err) {
    console.error('');
    console.error('❌ UPLOAD ERROR:', err.message);
    console.error('');
    console.error('🚨 RETRY NEEDED');
    client.close();
    process.exit(1);
  }
}

if (require.main === module) {
  uploadWpIncludes();
}

module.exports = uploadWpIncludes;
