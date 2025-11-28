#!/usr/bin/env node
/**
 * Upload populate-taxonomies.php to WordPress root
 * Quick FTP upload script for single file
 */

const ftp = require('basic-ftp');
const path = require('path');
const fs = require('fs');

async function uploadTaxonomyScript() {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    console.log('═══════════════════════════════════════════════════════');
    console.log('  Upload Taxonomy Population Script');
    console.log('═══════════════════════════════════════════════════════\n');

    // FTP Config
    const ftpConfig = {
      host: 'productos.prilabsa.com',
      user: 'solaria.charlie@blog.prilabsa.com',
      password: 'SoCh2025$%',
      secure: false
    };

    console.log('📡 Connecting to FTP server...');
    await client.access(ftpConfig);
    console.log('✓ Connected\n');

    // Navigate to WordPress root
    const remoteDir = '/public_html/productos.prilabsa.com';
    console.log(`📂 Changing to directory: ${remoteDir}`);
    await client.cd(remoteDir);
    console.log('✓ Directory changed\n');

    // Upload file
    const localFile = '/Users/carlosjperez/Documents/GitHub/PRILABSA-WEBSITE-2025-PROD-BACKEND-WORDPRESS-CMS/populate-taxonomies.php';
    const remoteFile = 'populate-taxonomies.php';

    if (!fs.existsSync(localFile)) {
      throw new Error(`Local file not found: ${localFile}`);
    }

    const fileSize = (fs.statSync(localFile).size / 1024).toFixed(2);
    console.log(`📤 Uploading: ${remoteFile} (${fileSize} KB)`);

    await client.uploadFrom(localFile, remoteFile);
    console.log('✓ Uploaded\n');

    // Verify upload
    console.log('🔍 Verifying upload...');
    const list = await client.list();
    const uploaded = list.find(f => f.name === remoteFile);

    if (uploaded) {
      const remoteSize = (uploaded.size / 1024).toFixed(2);
      console.log(`✓ Verified: ${remoteFile} (${remoteSize} KB)`);

      if (Math.abs(parseFloat(remoteSize) - parseFloat(fileSize)) > 0.1) {
        console.log('⚠ WARNING: File sizes differ!');
      }
    } else {
      console.log('✗ File not found on server after upload');
    }

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('  UPLOAD COMPLETE');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log('Next Steps:');
    console.log('1. Access script via browser:');
    console.log('   https://productos.prilabsa.com/populate-taxonomies.php\n');
    console.log('2. Review output in browser\n');
    console.log('3. Validate results in WordPress admin\n');
    console.log('4. Test REST API:\n');
    console.log('   curl -s https://productos.prilabsa.com/wp-json/wp/v2/categorias_productos | jq\n');

  } catch (error) {
    console.error('\n✗ ERROR:', error.message);
    process.exit(1);
  } finally {
    client.close();
  }
}

uploadTaxonomyScript();
