<?php
/**
 * Plugin Name: PRILABSA WordPress Headless
 * Plugin URI: https://www.solaria.agency
 * Description: Custom Post Type, ACF Config, REST API for PRILABSA Products Catalog (105 productos)
 * Version: 1.0.0
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
define('PRILABSA_VERSION', '1.0.0');
define('PRILABSA_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('PRILABSA_PLUGIN_URL', plugin_dir_url(__FILE__));

// Load all modules
require_once PRILABSA_PLUGIN_DIR . 'prilabsa-productos-cpt.php';
require_once PRILABSA_PLUGIN_DIR . 'prilabsa-acf-config.php';
require_once PRILABSA_PLUGIN_DIR . 'prilabsa-rest-api-custom.php';

// Note: prilabsa-import-products.php is loaded separately via WP-CLI or manual execution
