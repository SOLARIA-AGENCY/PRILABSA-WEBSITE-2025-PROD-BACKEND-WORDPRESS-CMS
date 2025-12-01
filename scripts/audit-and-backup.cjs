/**
 * Audit and Backup Script for GoDaddy Deployment
 * Creates a complete backup before new deployment
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
  remoteRoot: '/public_html/productos.prilabsa.com'
};

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const backupDir = `./backups/godaddy-${timestamp}`;

async function audit() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  const report = {
    timestamp: new Date().toISOString(),
    server: config.host,
    remoteRoot: config.remoteRoot,
    files: [],
    directories: [],
    criticalFiles: {},
    totalSize: 0,
    fileCount: 0
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

    console.log('📋 Listing remote files...');
    const fileList = await client.list();

    // Process file list
    for (const item of fileList) {
      if (item.isDirectory) {
        report.directories.push({
          name: item.name,
          modifiedAt: item.modifiedAt,
          size: item.size
        });
      } else {
        report.files.push({
          name: item.name,
          size: item.size,
          modifiedAt: item.modifiedAt
        });
        report.totalSize += item.size;
        report.fileCount++;
      }
    }

    // Get critical files content/info
    console.log('📄 Checking critical files...');

    // Check .htaccess
    try {
      const htaccessPath = path.join(backupDir, '.htaccess');
      fs.mkdirSync(backupDir, { recursive: true });
      await client.downloadTo(htaccessPath, '.htaccess');
      report.criticalFiles['.htaccess'] = {
        exists: true,
        size: fs.statSync(htaccessPath).size,
        content: fs.readFileSync(htaccessPath, 'utf8')
      };
      console.log('  ✓ .htaccess downloaded');
    } catch (e) {
      report.criticalFiles['.htaccess'] = { exists: false, error: e.message };
      console.log('  ⚠ .htaccess not found or error');
    }

    // Check index.html
    try {
      const indexPath = path.join(backupDir, 'index.html');
      await client.downloadTo(indexPath, 'index.html');
      report.criticalFiles['index.html'] = {
        exists: true,
        size: fs.statSync(indexPath).size
      };
      console.log('  ✓ index.html downloaded');
    } catch (e) {
      report.criticalFiles['index.html'] = { exists: false, error: e.message };
      console.log('  ⚠ index.html not found or error');
    }

    // Check favicon
    try {
      const faviconPath = path.join(backupDir, 'favicon.png');
      await client.downloadTo(faviconPath, 'favicon.png');
      report.criticalFiles['favicon.png'] = {
        exists: true,
        size: fs.statSync(faviconPath).size
      };
      console.log('  ✓ favicon.png downloaded');
    } catch (e) {
      report.criticalFiles['favicon.png'] = { exists: false, error: e.message };
    }

    // List assets directory
    console.log('📦 Scanning assets directory...');
    try {
      await client.cd('assets');
      const assetFiles = await client.list();
      report.assetsCount = assetFiles.length;
      report.assetsSize = assetFiles.reduce((sum, f) => sum + (f.size || 0), 0);

      // Get first 20 asset files for reference
      report.assetsSample = assetFiles.slice(0, 20).map(f => ({
        name: f.name,
        size: f.size
      }));

      await client.cd('..');
      console.log(`  ✓ Assets: ${assetFiles.length} files`);
    } catch (e) {
      report.assetsCount = 0;
      report.assetsError = e.message;
      console.log('  ⚠ Assets directory error:', e.message);
    }

    // List images directory
    console.log('🖼️  Scanning images directory...');
    try {
      await client.cd('images');
      const imageFiles = await client.list();
      report.imagesCount = imageFiles.length;

      // List subdirectories
      const imageDirs = imageFiles.filter(f => f.isDirectory).map(f => f.name);
      report.imageSubdirs = imageDirs;

      await client.cd('..');
      console.log(`  ✓ Images: ${imageFiles.length} items`);
    } catch (e) {
      report.imagesCount = 0;
      console.log('  ⚠ Images directory error');
    }

    // Save report
    const reportPath = path.join(backupDir, 'audit-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📝 Report saved to: ${reportPath}`);

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 AUDIT SUMMARY');
    console.log('='.repeat(60));
    console.log(`Server: ${config.host}`);
    console.log(`Remote Path: ${config.remoteRoot}`);
    console.log(`Root Files: ${report.files.length}`);
    console.log(`Root Directories: ${report.directories.length}`);
    console.log(`Assets Count: ${report.assetsCount || 'N/A'}`);
    console.log(`Images Count: ${report.imagesCount || 'N/A'}`);
    console.log('');
    console.log('Critical Files:');
    Object.entries(report.criticalFiles).forEach(([name, info]) => {
      if (info.exists) {
        console.log(`  ✓ ${name} (${info.size} bytes)`);
      } else {
        console.log(`  ✗ ${name} - MISSING`);
      }
    });
    console.log('');
    console.log('Root Directories:');
    report.directories.forEach(d => {
      console.log(`  📁 ${d.name}`);
    });
    console.log('');
    console.log('Root Files:');
    report.files.forEach(f => {
      console.log(`  📄 ${f.name} (${f.size} bytes)`);
    });
    console.log('='.repeat(60));

    return report;

  } catch (error) {
    console.error('❌ Audit failed:', error.message);
    throw error;
  } finally {
    client.close();
  }
}

// Run if called directly
audit().then(report => {
  console.log('\n✅ Audit complete!');
  console.log(`Backup location: ${backupDir}`);
}).catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
