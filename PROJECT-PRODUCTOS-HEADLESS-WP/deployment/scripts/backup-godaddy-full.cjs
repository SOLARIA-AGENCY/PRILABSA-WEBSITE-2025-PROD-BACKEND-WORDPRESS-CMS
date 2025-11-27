/**
 * Full GoDaddy Server Backup
 * Downloads ALL files from productos.prilabsa.com
 * PRIORIDAD: Seguridad antes de cualquier cambio
 */

const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');

const config = require('../../../.ftpconfig.json');

async function backupFull() {
  const client = new ftp.Client();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const backupDir = path.join(__dirname, '../backups', `godaddy-${timestamp}`);

  try {
    // Create backup directory
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    console.log('🔌 Connecting to GoDaddy FTP...');
    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      secure: false
    });

    console.log('✓ Connected');
    console.log(`📥 Downloading to: ${backupDir}`);
    console.log('');

    const remoteRoot = '/public_html/productos.prilabsa.com';

    // Download complete directory
    console.log('⏳ Downloading all files (this may take 2-3 minutes)...');
    await client.downloadToDir(backupDir, remoteRoot);

    console.log('');
    console.log('✅ BACKUP COMPLETO');
    console.log(`📁 Location: ${backupDir}`);

    // Count files
    const countFiles = (dir) => {
      let count = 0;
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
          count += countFiles(filePath);
        } else {
          count++;
        }
      });
      return count;
    };

    const totalFiles = countFiles(backupDir);
    console.log(`📊 Total files backed up: ${totalFiles}`);

    // Critical files check
    const criticalFiles = ['.htaccess', 'index.html', 'favicon.png'];
    console.log('');
    console.log('🔍 Verifying critical files:');
    criticalFiles.forEach(file => {
      const exists = fs.existsSync(path.join(backupDir, file));
      console.log(`  ${exists ? '✓' : '✗'} ${file}`);
    });

    client.close();

    console.log('');
    console.log('✅ Backup ready for deployment');
    console.log(`⚠️  Keep this backup until deployment is validated`);

    return backupDir;
  } catch (err) {
    console.error('❌ Backup Error:', err.message);
    client.close();
    process.exit(1);
  }
}

// Execute if run directly
if (require.main === module) {
  backupFull().then(dir => {
    console.log('');
    console.log('Next steps:');
    console.log('1. Review backup contents');
    console.log('2. Proceed with FASE 1 (prepare WordPress)');
  });
}

module.exports = backupFull;
