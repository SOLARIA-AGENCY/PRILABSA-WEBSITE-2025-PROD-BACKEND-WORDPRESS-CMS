/**
 * Safe Deployment Script
 * - Preserves existing .htaccess (hybrid WordPress/React config)
 * - Creates versioned backup of remote index.html before overwrite
 * - Uploads only React SPA files (index.html, assets/, images/)
 * - Does NOT touch WordPress files
 */

const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');

const config = {
  host: 'productos.prilabsa.com',
  user: 'solaria.charlie@blog.prilabsa.com',
  password: 'SoCh2025$%',
  port: 21,
  secure: false,
  remoteRoot: '/public_html/productos.prilabsa.com',
  localRoot: './dist'
};

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 16);

async function safeDeploy() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  const report = {
    timestamp: new Date().toISOString(),
    uploaded: [],
    backed_up: [],
    skipped: [],
    errors: []
  };

  try {
    console.log('🔗 Connecting to GoDaddy FTP...');
    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      secure: config.secure
    });

    console.log('📂 Navigating to remote root...');
    await client.cd(config.remoteRoot);

    // 1. Backup current index.html
    console.log('\n📋 Step 1: Backup current index.html...');
    try {
      const backupName = `index.html.backup-${timestamp}`;
      await client.rename('index.html', backupName);
      report.backed_up.push({ from: 'index.html', to: backupName });
      console.log(`  ✓ Backed up to: ${backupName}`);
    } catch (e) {
      console.log('  ⚠ Could not backup index.html:', e.message);
      report.errors.push({ file: 'index.html backup', error: e.message });
    }

    // 2. Upload new index.html
    console.log('\n📤 Step 2: Upload new index.html...');
    try {
      await client.uploadFrom(path.join(config.localRoot, 'index.html'), 'index.html');
      const stats = fs.statSync(path.join(config.localRoot, 'index.html'));
      report.uploaded.push({ file: 'index.html', size: stats.size });
      console.log(`  ✓ Uploaded index.html (${stats.size} bytes)`);
    } catch (e) {
      console.error('  ❌ Failed to upload index.html:', e.message);
      report.errors.push({ file: 'index.html', error: e.message });
      throw new Error('Critical: Could not upload index.html');
    }

    // 3. Upload favicon.png (if exists)
    console.log('\n🎨 Step 3: Upload favicon...');
    try {
      const faviconPath = path.join(config.localRoot, 'favicon.png');
      if (fs.existsSync(faviconPath)) {
        await client.uploadFrom(faviconPath, 'favicon.png');
        report.uploaded.push({ file: 'favicon.png', size: fs.statSync(faviconPath).size });
        console.log('  ✓ Uploaded favicon.png');
      }
    } catch (e) {
      console.log('  ⚠ favicon.png:', e.message);
    }

    // 4. Upload assets/ directory
    console.log('\n📦 Step 4: Upload assets/ directory...');
    console.log('  (This may take 1-2 minutes...)');
    try {
      await client.uploadFromDir(path.join(config.localRoot, 'assets'), 'assets');
      const assetsCount = fs.readdirSync(path.join(config.localRoot, 'assets')).length;
      report.uploaded.push({ file: 'assets/', count: assetsCount });
      console.log(`  ✓ Uploaded assets/ (${assetsCount} items)`);
    } catch (e) {
      console.error('  ❌ Failed to upload assets/:', e.message);
      report.errors.push({ file: 'assets/', error: e.message });
    }

    // 5. Upload images/ directory (if has changes)
    console.log('\n🖼️  Step 5: Upload images/ directory...');
    try {
      const imagesPath = path.join(config.localRoot, 'images');
      if (fs.existsSync(imagesPath)) {
        await client.uploadFromDir(imagesPath, 'images');
        const imagesCount = fs.readdirSync(imagesPath, { recursive: true }).length;
        report.uploaded.push({ file: 'images/', count: imagesCount });
        console.log(`  ✓ Uploaded images/ (${imagesCount} items)`);
      } else {
        console.log('  ⊘ images/ not found in dist, skipping');
      }
    } catch (e) {
      console.log('  ⚠ images/ error:', e.message);
    }

    // 6. Skip .htaccess (preserve server config)
    console.log('\n🚫 Step 6: .htaccess...');
    report.skipped.push('.htaccess (preserving hybrid WordPress/React config)');
    console.log('  ⊘ SKIPPED - Preserving existing hybrid config');

    // 7. Upload support files
    console.log('\n📄 Step 7: Upload support files...');
    const supportFiles = ['_headers', '_redirects', '_routes', 'health.txt'];
    for (const file of supportFiles) {
      try {
        const filePath = path.join(config.localRoot, file);
        if (fs.existsSync(filePath)) {
          await client.uploadFrom(filePath, file);
          report.uploaded.push({ file });
          console.log(`  ✓ ${file}`);
        }
      } catch (e) {
        console.log(`  ⚠ ${file}: ${e.message}`);
      }
    }

    // Save deployment report
    const reportPath = `./backups/deploy-report-${timestamp}.json`;
    fs.mkdirSync('./backups', { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('✅ DEPLOYMENT COMPLETE');
    console.log('='.repeat(60));
    console.log(`Uploaded: ${report.uploaded.length} items`);
    console.log(`Backed up: ${report.backed_up.length} items`);
    console.log(`Skipped: ${report.skipped.length} items`);
    console.log(`Errors: ${report.errors.length}`);
    console.log(`Report: ${reportPath}`);
    console.log('='.repeat(60));

    if (report.errors.length > 0) {
      console.log('\n⚠️  ERRORS:');
      report.errors.forEach(e => console.log(`  - ${e.file}: ${e.error}`));
    }

    console.log('\n🔍 Verify deployment at:');
    console.log('  https://productos.prilabsa.com/');
    console.log('  https://productos.prilabsa.com/productos');
    console.log('  https://productos.prilabsa.com/admin');

    return report;

  } catch (error) {
    console.error('\n❌ DEPLOYMENT FAILED:', error.message);
    report.errors.push({ critical: error.message });
    throw error;
  } finally {
    client.close();
  }
}

// Run
safeDeploy().then(report => {
  console.log('\n📋 Deployment completed successfully!');
}).catch(err => {
  console.error('Deployment failed:', err.message);
  process.exit(1);
});
