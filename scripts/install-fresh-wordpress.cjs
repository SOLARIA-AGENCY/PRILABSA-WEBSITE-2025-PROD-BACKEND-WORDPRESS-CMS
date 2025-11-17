const ftp = require('basic-ftp');

async function installFreshWordPress() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    console.log('🚀 Installing fresh WordPress...');
    
    await client.access({
      host: 'productos.prilabsa.com',
      user: 'solaria.charlie@blog.prilabsa.com',
      password: 'SoCh2025$%',
      port: 21,
      secure: false
    });

    await client.cd('public_html');
    
    // Create WordPress installation script with default credentials
    const installScript = `<?php
// WordPress Installation with Default Admin

echo "<h1>🚀 Installing WordPress...</h1>";

// Database configuration - you'll need to update these
$db_name = 'productos_wp';
$db_user = 'productos_user';
$db_password = 'Productos2025!';
$db_host = 'localhost';

// Create wp-config.php
$wp_config = "<?php\\n";
$wp_config .= "define('DB_NAME', '$db_name');\\n";
$wp_config .= "define('DB_USER', '$db_user');\\n";
$wp_config .= "define('DB_PASSWORD', '$db_password');\\n";
$wp_config .= "define('DB_HOST', '$db_host');\\n";
$wp_config .= "define('DB_CHARSET', 'utf8mb4');\\n";
$wp_config .= "define('DB_COLLATE', '');\\n";
$wp_config .= "\\n";
$wp_config .= "\$table_prefix = 'wp_';\\n";
$wp_config .= "\\n";
$wp_config .= "if (!defined('ABSPATH'))\\n";
$wp_config .= "    define('ABSPATH', __DIR__ . '/');\\n";
$wp_config .= "require_once(ABSPATH . 'wp-settings.php');\\n";
$wp_config .= "?>";

if (file_put_contents('wp-config.php', $wp_config)) {
    echo "✅ wp-config.php created<br>";
    echo "<h2>🔑 Default WordPress Admin Credentials:</h2>";
    echo "<p><strong>Username:</strong> admin</p>";
    echo "<p><strong>Password:</strong> admin123</p>";
    echo "<p><strong>Email:</strong> admin@prilabsa.com</p>";
    echo "<br>";
    echo "<h3>📋 Next Steps:</h3>";
    echo "<p>1. <a href='/wp-admin/install.php'>Complete WordPress Installation</a></p>";
    echo "<p>2. Use credentials above during setup</p>";
    echo "<p>3. Change password after first login</p>";
    echo "<p>4. <a href='/wp-admin/'>Go to Admin Dashboard</a></p>";
} else {
    echo "❌ Failed to create wp-config.php";
}
?>`;

    const fs = require('fs');
    const path = require('path');
    const tempPath = path.join(__dirname, 'temp-wp-install.php');
    fs.writeFileSync(tempPath, installScript);
    
    await client.uploadFrom(tempPath, 'wp-install.php');
    fs.unlinkSync(tempPath);
    
    console.log('✅ WordPress installation script created!');
    console.log('🌐 Visit: https://productos.prilabsa.com/wp-install.php');
    console.log('');
    console.log('🔑 Default WordPress Admin Credentials:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    console.log('   Email: admin@prilabsa.com');
    
  } catch (err) {
    console.error('❌ Script creation failed:', err.message);
  } finally {
    client.close();
  }
}

installFreshWordPress();