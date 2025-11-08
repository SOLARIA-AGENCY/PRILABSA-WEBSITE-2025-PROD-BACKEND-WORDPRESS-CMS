<?php
/**
 * Plugin Name: PRILABSA WordPress Headless
 * Plugin URI: https://www.solaria.agency
 * Description: Custom Post Types, ACF Config, REST API for PRILABSA (Products, Blog, Noticias)
 * Version: 2.2.0
 * Author: SOLARIA Agency
 * Author URI: https://www.solaria.agency
 * License: GPL v2 or later
 * Text Domain: prilabsa
 * Requires at least: 6.0
 * Requires PHP: 8.0
 * Requires Plugins: advanced-custom-fields
 */

// Security: Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('PRILABSA_VERSION', '2.2.0');
define('PRILABSA_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('PRILABSA_PLUGIN_URL', plugin_dir_url(__FILE__));

// Load all modules
require_once PRILABSA_PLUGIN_DIR . 'prilabsa-productos-cpt.php';
require_once PRILABSA_PLUGIN_DIR . 'prilabsa-blog-cpt.php';
require_once PRILABSA_PLUGIN_DIR . 'prilabsa-noticias-cpt.php';
require_once PRILABSA_PLUGIN_DIR . 'prilabsa-acf-config.php';
require_once PRILABSA_PLUGIN_DIR . 'prilabsa-productos-acf.php';
require_once PRILABSA_PLUGIN_DIR . 'prilabsa-blog-acf.php';
require_once PRILABSA_PLUGIN_DIR . 'prilabsa-noticias-acf.php';
require_once PRILABSA_PLUGIN_DIR . 'prilabsa-acf-extras.php';  // Campos adicionales
require_once PRILABSA_PLUGIN_DIR . 'prilabsa-rest-api-custom.php';
require_once PRILABSA_PLUGIN_DIR . 'prilabsa-roles.php';
require_once PRILABSA_PLUGIN_DIR . 'prilabsa-admin-ui.php';
require_once PRILABSA_PLUGIN_DIR . 'prilabsa-auto-hooks.php';  // Automatizaciones (slug, imagen)

// Note: prilabsa-import-products.php is loaded separately via WP-CLI or manual execution
