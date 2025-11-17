const ftp = require('basic-ftp');

async function installWordPress() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    console.log('🚀 Installing WordPress...');
    
    await client.access({
      host: 'productos.prilabsa.com',
      user: 'solaria.charlie@blog.prilabsa.com',
      password: 'SoCh2025$%',
      port: 21,
      secure: false
    });

    // Go to correct public_html directory
    await client.cd('public_html');
    
    // Create WordPress admin reset script that works without existing WordPress
    const installScript = `<?php
// WordPress Installation and Admin Setup Script

// Database configuration (update with actual credentials)
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

file_put_contents('wp-config.php', $wp_config);

echo "✅ wp-config.php created<br>";
echo "🔑 Next steps:<br>";
echo "1. Download WordPress from wordpress.org<br>";
echo "2. Extract files to this directory<br>";
echo "3. Visit https://productos.prilabsa.com/wp-admin/install.php<br>";
echo "4. Complete installation<br>";
echo "5. Use admin credentials: prilabsa_admin / Prilabsa2025!<br>";
?>`;

    // Upload the script
    await client.uploadFrom(Buffer.from(installScript), 'install-wordpress.php');
    
    console.log('✅ Installation script created: https://productos.prilabsa.com/install-wordpress.php');
    console.log('⚠️ You need to:');
    console.log('1. Set up database credentials in cPanel');
    console.log('2. Download and upload WordPress files');
    console.log('3. Run the installation');
    
  } catch (err) {
    console.error('❌ Script creation failed:', err.message);
  } finally {
    client.close();
  }
}

installWordPress();