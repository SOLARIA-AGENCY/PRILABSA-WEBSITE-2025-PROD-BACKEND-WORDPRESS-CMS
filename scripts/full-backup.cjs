/**
 * Full Backup Script - Downloads all critical files from GoDaddy
 * For rollback capability
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
const backupDir = `./backups/full-backup-${timestamp}`;

async function fullBackup() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    console.log('🔗 Connecting to GoDaddy FTP...');
    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      secure: config.secure
    });

    await client.cd(config.remoteRoot);

    // Create backup directory
    fs.mkdirSync(backupDir, { recursive: true });
    fs.mkdirSync(path.join(backupDir, 'assets'), { recursive: true });

    // 1. Download critical root files
    console.log('\n📥 Downloading root files...');
    const rootFiles = ['.htaccess', 'index.html', 'favicon.png', '_headers', '_redirects', '_routes'];

    for (const file of rootFiles) {
      try {
        const localPath = path.join(backupDir, file);
        await client.downloadTo(localPath, file);
        console.log(`  ✓ ${file}`);
      } catch (e) {
        console.log(`  ⚠ ${file} - not found`);
      }
    }

    // 2. Download assets directory
    console.log('\n📦 Downloading assets/ directory...');
    try {
      await client.downloadToDir(path.join(backupDir, 'assets'), 'assets');
      console.log('  ✓ assets/ downloaded');
    } catch (e) {
      console.log('  ⚠ assets/ error:', e.message);
    }

    // 3. Download images directory
    console.log('\n🖼️  Downloading images/ directory...');
    fs.mkdirSync(path.join(backupDir, 'images'), { recursive: true });
    try {
      await client.downloadToDir(path.join(backupDir, 'images'), 'images');
      console.log('  ✓ images/ downloaded');
    } catch (e) {
      console.log('  ⚠ images/ error:', e.message);
    }

    // 4. Create manifest
    const manifest = {
      timestamp: new Date().toISOString(),
      backupDir: backupDir,
      server: config.host,
      remoteRoot: config.remoteRoot,
      files: [],
      totalSize: 0
    };

    // List all backed up files
    function listFiles(dir, base = '') {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      for (const item of items) {
        const relativePath = path.join(base, item.name);
        if (item.isDirectory()) {
          listFiles(path.join(dir, item.name), relativePath);
        } else {
          const stats = fs.statSync(path.join(dir, item.name));
          manifest.files.push({ path: relativePath, size: stats.size });
          manifest.totalSize += stats.size;
        }
      }
    }
    listFiles(backupDir);

    fs.writeFileSync(
      path.join(backupDir, 'backup-manifest.json'),
      JSON.stringify(manifest, null, 2)
    );

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('✅ BACKUP COMPLETE');
    console.log('='.repeat(60));
    console.log(`Location: ${backupDir}`);
    console.log(`Files: ${manifest.files.length}`);
    console.log(`Total Size: ${(manifest.totalSize / 1024).toFixed(2)} KB`);
    console.log('='.repeat(60));

    return { backupDir, manifest };

  } catch (error) {
    console.error('❌ Backup failed:', error.message);
    throw error;
  } finally {
    client.close();
  }
}

fullBackup().then(result => {
  console.log(`\n📁 Backup saved to: ${result.backupDir}`);
}).catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
