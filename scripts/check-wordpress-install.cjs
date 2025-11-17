const ftp = require('basic-ftp');

async function checkWordPressInstallStatus() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    console.log('🔍 Checking WordPress installation status...');
    
    await client.access({
      host: 'productos.prilabsa.com',
      user: 'solaria.charlie@blog.prilabsa.com',
      password: 'SoCh2025$%',
      port: 21,
      secure: false
    });

    await client.cd('public_html');
    
    // Check for WordPress installation files
    const files = await client.list('/');
    console.log('📁 Files in public_html:');
    files.forEach(file => {
      if (file.name.includes('wp') || file.name.includes('index') || file.name.includes('config')) {
        console.log(`  ${file.name} (${file.type === 1 ? 'dir' : 'file'})`);
      }
    });
    
    // Check if WordPress is installed by looking for wp-config.php
    try {
      const configExists = await client.size('wp-config.php');
      console.log('✅ wp-config.php exists - WordPress is installed');
      
      // Try to read wp-config to get database info
      console.log('🔍 Attempting to read wp-config.php...');
      
    } catch (err) {
      console.log('❌ wp-config.php not found - WordPress needs installation');
      console.log('🚀 Starting fresh WordPress installation...');
      
      // Create WordPress installation script
      const installScript = `<?php
// WordPress Fresh Installation Script

echo "<h1>🚀 WordPress Installation</h1>";

// Check if wp-config.php exists
if (!file_exists('wp-config.php')) {
    echo "<p>❌ WordPress not found. Please download WordPress from wordpress.org and upload to this directory.</p>";
    echo "<p>📥 <a href='https://wordpress.org/latest.zip'>Download WordPress</a></p>";
    exit;
}

require_once('wp-config.php');

// Check if WordPress is already installed
try {
    $wpdb->get_var("SELECT option_value FROM $wpdb->options WHERE option_name = 'siteurl'");
    echo "<p>✅ WordPress is already installed.</p>";
    echo "<p>🔑 Try default admin credentials:</p>";
    echo "<ul>";
    echo "<li>Username: admin</li>";
    echo "<li>Password: (check your email for installation email)</li>";
    echo "</ul>";
    echo "<p>🌐 <a href='/wp-admin/'>Go to Admin Login</a></p>";
} catch (Exception $e) {
    echo "<p>✅ WordPress is ready for installation.</p>";
    echo "<p>🌐 <a href='/wp-admin/install.php'>Start WordPress Installation</a></p>";
}
?>`;

      const fs = require('fs');
      const path = require('path');
      const tempPath = path.join(__dirname, 'temp-install.php');
      fs.writeFileSync(tempPath, installScript);
      
      await client.uploadFrom(tempPath, 'install-check.php');
      fs.unlinkSync(tempPath);
      
      console.log('✅ Installation check script created');
      console.log('🌐 Visit: https://productos.prilabsa.com/install-check.php');
    }
    
  } catch (err) {
    console.error('❌ Check failed:', err.message);
  } finally {
    client.close();
  }
}

checkWordPressInstallStatus();