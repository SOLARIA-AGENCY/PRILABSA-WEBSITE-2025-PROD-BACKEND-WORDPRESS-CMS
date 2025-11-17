const ftp = require('basic-ftp');

async function createWordPressAdmin() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    console.log('🔧 Creating WordPress admin access...');
    
    await client.access({
      host: 'productos.prilabsa.com',
      user: 'solaria.charlie@blog.prilabsa.com',
      password: 'SoCh2025$%',
      port: 21,
      secure: false
    });

    await client.cd('public_html');
    
    // Create admin user creation script
    const adminScript = `<?php
// WordPress Admin User Creation
// DELETE AFTER USE!

// Create wp-config.php if it doesn't exist
if (!file_exists('wp-config.php')) {
    echo "❌ WordPress not installed. Please install WordPress first.<br>";
    exit;
}

require_once('wp-config.php');
require_once('wp-blog-header.php');

// Admin user details
$username = 'webmaster_solaria';
$password = 'SolariaAdmin2025!';
$email = 'webmaster@solaria.agency';

// Check if user exists
$user = get_user_by('login', $username);

if (!$user) {
    // Create new admin user
    $user_id = wp_create_user($username, $password, $email);
    $user = new WP_User($user_id);
    $user->set_role('administrator');
    echo "✅ Admin user created successfully!<br>";
} else {
    // Update existing user password
    wp_set_password($password, $user->ID);
    echo "✅ Password updated for existing user!<br>";
}

echo "<h3>🔑 Login Details:</h3>";
echo "🌐 URL: <a href='https://productos.prilabsa.com/wp-admin/'>https://productos.prilabsa.com/wp-admin/</a><br>";
echo "👤 Username: <strong>$username</strong><br>";
echo "🔒 Password: <strong>$password</strong><br>";
echo "<br><strong>⚠️ DELETE THIS FILE IMMEDIATELY AFTER USE!</strong>";
?>`;

    // Write to temp file and upload
    const fs = require('fs');
    const path = require('path');
    const tempPath = path.join(__dirname, 'temp-admin.php');
    fs.writeFileSync(tempPath, adminScript);
    
    await client.uploadFrom(tempPath, 'create-admin.php');
    fs.unlinkSync(tempPath);
    
    console.log('✅ Admin creation script ready!');
    console.log('🌐 Visit: https://productos.prilabsa.com/create-admin.php');
    console.log('⚠️ DELETE the file immediately after use!');
    
  } catch (err) {
    console.error('❌ Script creation failed:', err.message);
  } finally {
    client.close();
  }
}

createWordPressAdmin();