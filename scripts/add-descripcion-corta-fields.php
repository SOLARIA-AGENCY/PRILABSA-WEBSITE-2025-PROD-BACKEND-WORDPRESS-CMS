<?php
/**
 * Add descripcion_corta ACF fields to WordPress
 * Run via: wp eval-file scripts/add-descripcion-corta-fields.php
 * Or upload to WordPress and access via browser
 */

// If running standalone, load WordPress
if (!defined('ABSPATH')) {
    // Try to find wp-load.php
    $wp_load_paths = [
        dirname(__FILE__) . '/../../../../wp-load.php',
        '/var/www/html/wp-load.php',
        '/home/customer/www/productos.prilabsa.com/public_html/wp-load.php'
    ];

    foreach ($wp_load_paths as $path) {
        if (file_exists($path)) {
            require_once($path);
            break;
        }
    }
}

// Check if ACF is active
if (!function_exists('acf_add_local_field')) {
    die('ACF Pro is not active');
}

// Get existing field group for productos
$field_groups = acf_get_field_groups(['post_type' => 'productos']);

if (empty($field_groups)) {
    die('No ACF field group found for productos');
}

$group_key = $field_groups[0]['key'];
echo "Found field group: " . $group_key . "\n";

// Define new fields
$new_fields = [
    [
        'key' => 'field_descripcion_corta_es',
        'label' => 'Descripción Corta (ES)',
        'name' => 'descripcion_corta_es',
        'type' => 'textarea',
        'rows' => 2,
        'parent' => $group_key,
    ],
    [
        'key' => 'field_descripcion_corta_en',
        'label' => 'Descripción Corta (EN)',
        'name' => 'descripcion_corta_en',
        'type' => 'textarea',
        'rows' => 2,
        'parent' => $group_key,
    ],
    [
        'key' => 'field_descripcion_corta_pt',
        'label' => 'Descripción Corta (PT)',
        'name' => 'descripcion_corta_pt',
        'type' => 'textarea',
        'rows' => 2,
        'parent' => $group_key,
    ],
];

foreach ($new_fields as $field) {
    // Check if field already exists
    $existing = acf_get_field($field['name']);
    if ($existing) {
        echo "Field {$field['name']} already exists\n";
        continue;
    }

    // Add field
    $result = acf_update_field($field);
    if ($result) {
        echo "Created field: {$field['name']}\n";
    } else {
        echo "Failed to create field: {$field['name']}\n";
    }
}

echo "\nDone!\n";
