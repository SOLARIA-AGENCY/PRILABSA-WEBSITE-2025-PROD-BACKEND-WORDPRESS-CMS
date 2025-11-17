<?php
/**
 * Import PRILABSA Products with Admin Access
 * Using correct WordPress credentials
 */

// Bootstrap WordPress
require_once('wp-config.php');
require_once('wp-load.php');

echo "=== PRILABSA Product Import ===\n";

// Verify admin user
$user = get_user_by('login', 'facipp');
if (!$user) {
    echo "✗ Admin user 'facipp' not found\n";
    exit;
}

echo "✓ Admin user found: facipp (ID: {$user->ID})\n";

// Load catalog
$catalog_file = ABSPATH . 'catalogo-productos.json';
if (!file_exists($catalog_file)) {
    echo "✗ Catalog file not found: $catalog_file\n";
    exit;
}

$catalog = json_decode(file_get_contents($catalog_file), true);
if (!$catalog || !isset($catalog['productos'])) {
    echo "✗ Failed to parse catalog\n";
    exit;
}

echo "✓ Catalog loaded with " . count($catalog['productos']) . " products\n";

// Import products
$imported = 0;
$updated = 0;
$failed = 0;

foreach ($catalog['productos'] as $product_data) {
    try {
        // Check if product exists by codigo
        $existing = get_posts(array(
            'post_type' => 'producto',
            'meta_key' => 'codigo',
            'meta_value' => $product_data['codigo'],
            'posts_per_page' => 1
        ));
        
        $post_data = array(
            'post_title' => $product_data['nombre'],
            'post_content' => $product_data['descripcion'] ?? '',
            'post_excerpt' => $product_data['descripcion_corta'] ?? '',
            'post_status' => 'publish',
            'post_type' => 'producto',
            'post_author' => $user->ID
        );
        
        if (!empty($existing)) {
            $post_data['ID'] = $existing[0]->ID;
            $post_id = wp_update_post($post_data);
            $action = 'Updated';
            $updated++;
        } else {
            $post_id = wp_insert_post($post_data);
            $action = 'Created';
            $imported++;
        }
        
        if (is_wp_error($post_id)) {
            throw new Exception($post_id->get_error_message());
        }
        
        // Update meta fields
        update_post_meta($post_id, 'codigo', $product_data['codigo']);
        update_post_meta($post_id, 'precio', $product_data['precio'] ?? 0);
        update_post_meta($post_id, 'moneda', $product_data['moneda'] ?? 'USD');
        update_post_meta($post_id, 'stock', $product_data['stock'] ?? 0);
        update_post_meta($post_id, 'marca', $product_data['marca'] ?? '');
        update_post_meta($post_id, 'modelo', $product_data['modelo'] ?? '');
        update_post_meta($post_id, 'ficha_tecnica', $product_data['ficha_tecnica'] ?? '');
        update_post_meta($post_id, 'imagen_url', $product_data['imagen_url'] ?? '');
        
        // Set categories
        if (!empty($product_data['categoria'])) {
            $term = get_term_by('slug', $product_data['categoria'], 'categoria_producto');
            if ($term) {
                wp_set_post_terms($post_id, array($term->term_id), 'categoria_producto');
            }
        }
        
        // Set product type
        if (!empty($product_data['tipo'])) {
            $type_term = get_term_by('slug', $product_data['tipo'], 'tipo_producto');
            if ($type_term) {
                wp_set_post_terms($post_id, array($type_term->term_id), 'tipo_producto');
            }
        }
        
        echo "✓ $action: {$product_data['nombre']} (ID: $post_id)\n";
        
    } catch (Exception $e) {
        echo "✗ Failed to import {$product_data['nombre']}: {$e->getMessage()}\n";
        $failed++;
    }
}

echo "\n=== Import Summary ===\n";
echo "✓ New products created: $imported\n";
echo "✓ Products updated: $updated\n";
echo "✗ Failed: $failed\n";

// Verify final count
$product_count = wp_count_posts('producto');
echo "Total products in database: {$product_count->publish}\n";

// Test API endpoint
echo "\n=== API Test ===\n";
$api_url = rest_url('wp/v2/productos');
echo "API Endpoint: $api_url\n";

$products = get_posts(array(
    'post_type' => 'producto',
    'post_status' => 'publish',
    'posts_per_page' => 5
));

echo "Sample products:\n";
foreach ($products as $product) {
    $codigo = get_post_meta($product->ID, 'codigo', true);
    $precio = get_post_meta($product->ID, 'precio', true);
    echo "- {$product->post_title} ({$codigo}) - \${$precio}\n";
}

echo "\n=== Import Complete ===\n";
?>