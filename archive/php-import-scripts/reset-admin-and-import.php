<?php
/**
 * Reset Admin Password & Import Products
 */

// Bootstrap WordPress
require_once('wp-config.php');
require_once('wp-load.php');

echo "=== PRILABSA Admin Reset & Import ===\n";

// Reset admin password
$user = get_user_by('login', 'admin');
if ($user) {
    $new_password = 'Prilabsa2025!';
    wp_set_password($new_password, $user->ID);
    echo "✓ Reset admin password\n";
    echo "  Username: admin\n";
    echo "  Password: $new_password\n";
    echo "  Login: https://productos.prilabsa.com/wp-admin/\n";
} else {
    echo "✗ Admin user not found\n";
    exit;
}

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
        // Check if product exists
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

// Verify count
$product_count = wp_count_posts('producto');
echo "Total products in database: {$product_count->publish}\n";

echo "\n=== Admin Access ===\n";
echo "URL: https://productos.prilabsa.com/wp-admin/\n";
echo "Username: admin\n";
echo "Password: Prilabsa2025!\n";
?>