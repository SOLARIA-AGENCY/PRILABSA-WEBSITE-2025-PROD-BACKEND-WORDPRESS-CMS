<?php
/**
 * Plugin Name: PRILABSA WordPress Headless
 * Description: Custom Post Type, ACF Config, REST API for PRILABSA Products
 * Version: 1.0.0
 * Author: SOLARIA Agency
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Load all modules
require_once __DIR__ . "/prilabsa-productos-cpt.php";
require_once __DIR__ . "/prilabsa-acf-config.php";
require_once __DIR__ . "/prilabsa-rest-api-custom.php";
// Note: import script loaded separately
