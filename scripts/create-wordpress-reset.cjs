const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');

async function createWordPressResetScript() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    console.log('🔧 Creating WordPress admin reset script...');
    
    await client.access({
      host: 'productos.prilabsa.com',
      user: 'solaria.charlie@blog.prilabsa.com',
      password: 'SoCh2025$%',
      port: 21,
      secure: false
    });

    await client.cd('public_html');
    
    // Create a PHP script to reset admin password
    const resetScript = `<?php
// WordPress Admin Password Reset Script
// DELETE THIS FILE AFTER USE!

require_once('wp-config.php');
require_once('wp-blog-header.php');

// Create or update admin user
$username = 'prilabsa_admin';
$password = 'Prilabsa2025!';
$email = 'admin@prilabsa.com';

// Check if user exists
$user = get_user_by('login', $username);

if (!$user) {
    // Create new admin user
    $user_id = wp_create_user($username, $password, $email);
    $user = new WP_User($user_id);
    $user->set_role('administrator');
    echo "✅ Admin user created: $username<br>";
} else {
    // Update existing user password
    wp_set_password($password, $user->ID);
    echo "✅ Password updated for user: $username<br>";
}

echo "🔑 Login: https://productos.prilabsa.com/wp-admin/<br>";
echo "👤 Username: $username<br>";
echo "🔒 Password: $password<br>";
echo "⚠️ DELETE THIS FILE IMMEDIATELY AFTER USE!";
?>`;

    // Write script to temporary file first
    const tempPath = path.join(__dirname, 'temp-reset.php');
    fs.writeFileSync(tempPath, resetScript);
    
    // Upload to server
    await client.uploadFrom(tempPath, 'reset-admin.php');
    
    // Clean up temp file
    fs.unlinkSync(tempPath);
    
    console.log('✅ Reset script created: https://productos.prilabsa.com/reset-admin.php');
    console.log('⚠️ Visit the URL to create/reset admin credentials');
    console.log('⚠️ DELETE the file immediately after use!');
    
  } catch (err) {
    console.error('❌ Script creation failed:', err.message);
  } finally {
    client.close();
  }
}

createWordPressResetScript();