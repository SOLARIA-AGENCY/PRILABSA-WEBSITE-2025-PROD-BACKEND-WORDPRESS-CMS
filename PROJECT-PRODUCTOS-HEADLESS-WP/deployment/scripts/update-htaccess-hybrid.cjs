/**
 * Update .htaccess for WordPress + React Hybrid Routing
 * CRITICAL: This enables WordPress admin while preserving React routing
 */

const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');

const config = require('../../../.ftpconfig.json');

// Hybrid .htaccess configuration
const HYBRID_HTACCESS = `Options -MultiViews
RewriteEngine On
RewriteBase /

# ============================================
# WORDPRESS ROUTES (Priority)
# ============================================
# Allow WordPress admin, login, and API
RewriteCond %{REQUEST_URI} ^/wp-admin [OR]
RewriteCond %{REQUEST_URI} ^/wp-login\\.php [OR]
RewriteCond %{REQUEST_URI} ^/wp-json [OR]
RewriteCond %{REQUEST_URI} ^/wp-includes [OR]
RewriteCond %{REQUEST_URI} ^/wp-content
RewriteRule ^ - [L]

# ============================================
# SECURITY HEADERS
# ============================================
<IfModule mod_headers.c>
    Header set X-Content-Type-Options nosniff
    Header set X-Frame-Options DENY
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"

    # CORS for WordPress API (if needed)
    Header set Access-Control-Allow-Origin "https://productos.prilabsa.com"
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
</IfModule>

# ============================================
# COMPRESSION
# ============================================
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json
</IfModule>

# ============================================
# REACT SPA ROUTING (Fallback)
# ============================================
# Skip rewrite for static assets
RewriteCond %{REQUEST_URI} \\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|pdf|mp4|webm)$ [OR]
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Everything else goes to React
RewriteRule ^ index.html [L]
`;

async function updateHtaccess() {
  const client = new ftp.Client();
  const remoteBase = '/public_html/productos.prilabsa.com';
  const htaccessPath = path.posix.join(remoteBase, '.htaccess');
  const backupPath = path.posix.join(remoteBase, `.htaccess.backup.${new Date().toISOString().slice(0, 10)}`);

  try {
    console.log('🔧 UPDATING .HTACCESS FOR HYBRID ROUTING');
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

    // 1. Backup current .htaccess
    console.log('📥 Backing up current .htaccess...');
    try {
      await client.downloadTo('/tmp/.htaccess.current', htaccessPath);
      await client.uploadFrom('/tmp/.htaccess.current', backupPath);
      console.log(`✓ Backup created: ${backupPath}`);
    } catch (err) {
      console.log('⚠️  No existing .htaccess to backup (or error)');
    }

    console.log('');

    // 2. Upload new hybrid .htaccess
    console.log('📤 Uploading hybrid .htaccess...');
    const tempFile = '/tmp/.htaccess.hybrid';
    fs.writeFileSync(tempFile, HYBRID_HTACCESS);
    await client.uploadFrom(tempFile, htaccessPath);

    console.log('✓ Hybrid .htaccess uploaded');
    console.log('');

    client.close();

    console.log('═══════════════════════════════════════');
    console.log('✅ .HTACCESS UPDATED');
    console.log('');
    console.log('⚠️  CRITICAL: TEST IMMEDIATELY');
    console.log('');
    console.log('Test 1 - React Frontend:');
    console.log('  curl -I https://productos.prilabsa.com/productos');
    console.log('  Expected: HTTP 200');
    console.log('');
    console.log('Test 2 - WordPress Admin:');
    console.log('  curl -I https://productos.prilabsa.com/wp-admin/');
    console.log('  Expected: HTTP 200 or 302');
    console.log('');
    console.log('Test 3 - WordPress API:');
    console.log('  curl https://productos.prilabsa.com/wp-json/');
    console.log('  Expected: JSON response');
    console.log('');
    console.log('🚨 IF ANY TEST FAILS:');
    console.log('   node scripts/restore-htaccess-backup.js');

  } catch (err) {
    console.error('');
    console.error('❌ ERROR:', err.message);
    console.error('');
    console.error('🚨 ROLLBACK NEEDED');
    console.error('Run: node scripts/restore-htaccess-backup.js');
    client.close();
    process.exit(1);
  }
}

// Execute if run directly
if (require.main === module) {
  updateHtaccess();
}

module.exports = updateHtaccess;
