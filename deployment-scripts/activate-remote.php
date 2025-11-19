<?php
// activate-remote.php
define('WP_USE_THEMES', false);
require_once('wp-load.php');

if (!function_exists('activate_plugin')) {
    require_once(ABSPATH . 'wp-admin/includes/plugin.php');
}

$plugin = 'prilabsa-productos/prilabsa.php';
$result = activate_plugin($plugin);

if (is_wp_error($result)) {
    echo "Error activando plugin: " . $result->get_error_message();
} else {
    echo "Plugin activado correctamente: " . $plugin;
}

// Check active plugins
echo "\n\nPlugins Activos:\n";
print_r(get_option('active_plugins'));
