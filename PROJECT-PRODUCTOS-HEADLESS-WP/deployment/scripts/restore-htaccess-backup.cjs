/**
 * Restore .htaccess from latest backup
 * Emergency rollback for .htaccess changes
 */

const ftp = require('basic-ftp');
const config = require('../../../.ftpconfig.json');

async function restoreHtaccess() {
  const client = new ftp.Client();
  const remoteBase = '/public_html/productos.prilabsa.com';

  try {
    console.log('🔄 RESTORING .HTACCESS FROM BACKUP');
    console.log('═══════════════════════════════════════');
    console.log('');

    console.log('🔌 Connecting to GoDaddy FTP...');
    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      secure: false
    });

    console.log('✓ Connected');
    console.log('');

    // List backups
    console.log('📋 Finding latest backup...');
    const files = await client.list(remoteBase);
    const backups = files.filter(f => f.name.startsWith('.htaccess.backup.'));

    if (backups.length === 0) {
      throw new Error('No .htaccess backups found!');
    }

    // Get latest backup
    backups.sort((a, b) => b.modifiedAt - a.modifiedAt);
    const latestBackup = backups[0].name;

    console.log(`✓ Latest backup: ${latestBackup}`);
    console.log('');

    // Restore
    console.log('🔄 Restoring backup...');
    const backupPath = `${remoteBase}/${latestBackup}`;
    const htaccessPath = `${remoteBase}/.htaccess`;

    await client.downloadTo('/tmp/.htaccess.restore', backupPath);
    await client.uploadFrom('/tmp/.htaccess.restore', htaccessPath);

    console.log('✓ .htaccess restored');
    console.log('');

    client.close();

    console.log('═══════════════════════════════════════');
    console.log('✅ RESTORATION COMPLETE');
    console.log('');
    console.log('🔍 Verify frontend is working:');
    console.log('  curl -I https://productos.prilabsa.com/productos');

  } catch (err) {
    console.error('');
    console.error('❌ RESTORATION ERROR:', err.message);
    console.error('');
    console.error('🚨 Manual intervention may be needed');
    client.close();
    process.exit(1);
  }
}

// Execute if run directly
if (require.main === module) {
  restoreHtaccess();
}

module.exports = restoreHtaccess;
