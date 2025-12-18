<?php
/**
 * Domain Configuration Script
 * Configures productos.prilabsa.com to serve frontend
 */

// Bootstrap WordPress
require_once('wp-config.php');
require_once('wp-load.php');

// Security check
if (!current_user_can('manage_options')) {
    wp_die('Administrator access required');
}

echo "<h1>PRILABSA Domain Configuration</h1>";

// Current configuration
echo "<h2>Current Status</h2>";
echo "<p><strong>Site URL:</strong> " . get_site_url() . "</p>";
echo "<p><strong>Home URL:</strong> " . get_home_url() . "</p>";
echo "<p><strong>Frontend file:</strong> " . ABSPATH . 'index.html' . "</p>";

// Check if frontend exists
$frontend_file = ABSPATH . 'index.html';
if (file_exists($frontend_file)) {
    echo "<p>✅ Frontend index.html exists</p>";
} else {
    echo "<p>❌ Frontend index.html not found</p>";
}

// Check WordPress index
$wp_index = ABSPATH . 'wp-index.php';
if (file_exists($wp_index)) {
    echo "<p>✅ WordPress index.php exists (as wp-index.php)</p>";
} else {
    echo "<p>❌ WordPress index.php not found</p>";
}

// Update WordPress configuration
echo "<h2>WordPress Configuration</h2>";

// Update home URL to point to frontend
update_option('home', 'https://productos.prilabsa.com');
update_option('siteurl', 'https://productos.prilabsa.com');

echo "<p>✅ Updated WordPress URLs</p>";

// Create .htaccess for frontend
$htaccess_content = '# PRILABSA Website Configuration
# Frontend served from root, WordPress API available

RewriteEngine On

# WordPress routes - serve from WordPress
RewriteRule ^wp-admin/ - [L]
RewriteRule ^wp-login.php - [L]
RewriteRule ^wp-json/ - [L]
RewriteRule ^wp-includes/ - [L]
RewriteRule ^wp-content/ - [L]

# Allow direct access to import scripts
RewriteRule ^(simple-import|embedded-import|import-products|admin-import|ajax-import-handler)\.php$ - [L]

# If file or directory exists, serve it
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# For all other requests, serve index.html (SPA)
RewriteRule ^(.*)$ index.html [L]';

file_put_contents(ABSPATH . '.htaccess', $htaccess_content);
echo "<p>✅ Updated .htaccess configuration</p>";

// Test configuration
echo "<h2>Test Results</h2>";

// Test frontend
$frontend_content = file_get_contents(ABSPATH . 'index.html');
if (strpos($frontend_content, 'Prilabsa') !== false) {
    echo "<p>✅ Frontend contains PRILABSA content</p>";
} else {
    echo "<p>❌ Frontend does not contain PRILABSA content</p>";
}

// Test API
$api_response = wp_remote_get(home_url('/wp-json/wp/v2/productos'));
if (!is_wp_error($api_response) && wp_remote_retrieve_response_code($api_response) === 200) {
    echo "<p>✅ WordPress API is accessible</p>";
} else {
    echo "<p>❌ WordPress API is not accessible</p>";
}

echo "<h2>Next Steps</h2>";
echo "<p>1. Verify frontend is serving at <a href='" . home_url() . "' target='_blank'>" . home_url() . "</a></p>";
echo "<p>2. Verify API is accessible at <a href='" . home_url('/wp-json/wp/v2/productos') . "' target='_blank'>" . home_url('/wp-json/wp/v2/productos') . "</a></p>";
echo "<p>3. Test admin access at <a href='" . admin_url() . "' target='_blank'>" . admin_url() . "</a></p>";

echo "<h2>Manual Steps Required</h2>";
echo "<p>If frontend is not showing, you may need to:</p>";
echo "<ul>";
echo "<li>Upload the frontend files to the server root</li>";
echo "<li>Ensure .htaccess is properly configured</li>";
echo "<li>Check server configuration for DirectoryIndex</li>";
echo "</ul>";

echo "<p><strong>Configuration Complete!</strong></p>";
?>