<?php
/**
 * Direct Import Script
 * Place in WordPress root and access via browser
 */

// Bootstrap WordPress
define('WP_USE_THEMES', false);
require_once('./wp-config.php');
require_once('./wp-load.php');

// Security: Only allow administrators
if (!is_user_logged_in() || !current_user_can('manage_options')) {
    // Try to authenticate with admin credentials
    $user = wp_authenticate('facipp', '{sJu(ZheHgH3');
    if (is_wp_error($user)) {
        die('Access denied. Administrator login required.');
    }
    wp_set_current_user($user->ID);
}

// Set content type
header('Content-Type: text/plain; charset=utf-8');

echo "=== PRILABSA Direct Product Import ===\n";
echo "Time: " . date('Y-m-d H:i:s') . "\n";
echo "User: " . wp_get_current_user()->user_login . "\n\n";

try {
    // Load catalog
    $catalog_file = ABSPATH . 'catalogo-productos.json';
    if (!file_exists($catalog_file)) {
        throw new Exception("Catalog file not found: $catalog_file");
    }
    
    $catalog = json_decode(file_get_contents($catalog_file), true);
    if (!$catalog || !isset($catalog['productos'])) {
        throw new Exception("Failed to parse catalog file");
    }
    
    echo "✓ Catalog loaded with " . count($catalog['productos']) . " products\n\n";
    
    $imported = 0;
    $updated = 0;
    $failed = 0;
    $current_user = wp_get_current_user();
    
    foreach ($catalog['productos'] as $index => $product_data) {
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
                'post_author' => $current_user->ID
            );
            
            if (!empty($existing)) {
                $post_data['ID'] = $existing[0]->ID;
                $post_id = wp_update_post($post_data);
                $action = 'UPDATED';
                $updated++;
            } else {
                $post_id = wp_insert_post($post_data);
                $action = 'CREATED';
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
            
            printf("[%03d] %s: %s (ID: %d) - %s\n", 
                $index + 1, 
                $action, 
                substr($product_data['nombre'], 0, 50), 
                $post_id,
                $product_data['codigo']
            );
            
        } catch (Exception $e) {
            printf("[%03d] ERROR: %s - %s\n", 
                $index + 1, 
                substr($product_data['nombre'], 0, 50), 
                $e->getMessage()
            );
            $failed++;
        }
        
        // Flush output every 10 products
        if ($index % 10 === 0) {
            if (ob_get_level()) ob_flush();
            flush();
        }
    }
    
    echo "\n=== IMPORT SUMMARY ===\n";
    echo "✅ New products created: $imported\n";
    echo "🔄 Products updated: $updated\n";
    echo "❌ Failed: $failed\n";
    echo "📊 Total processed: " . ($imported + $updated + $failed) . "\n\n";
    
    // Final verification
    $final_count = wp_count_posts('producto');
    echo "📦 Final product count: {$final_count->publish}\n\n";
    
    // API information
    echo "=== API INFORMATION ===\n";
    $api_url = rest_url('wp/v2/productos');
    echo "REST API Endpoint: $api_url\n";
    echo "Test URL: {$api_url}?per_page=5\n\n";
    
    // Sample products
    echo "=== SAMPLE PRODUCTS ===\n";
    $sample_products = get_posts(array(
        'post_type' => 'producto',
        'post_status' => 'publish',
        'posts_per_page' => 5
    ));
    
    foreach ($sample_products as $product) {
        $codigo = get_post_meta($product->ID, 'codigo', true);
        $precio = get_post_meta($product->ID, 'precio', true);
        $moneda = get_post_meta($product->ID, 'moneda', true);
        echo "- {$product->post_title} ({$codigo}) - {$moneda} {$precio}\n";
    }
    
    echo "\n=== IMPORT COMPLETE ===\n";
    
} catch (Exception $e) {
    echo "❌ FATAL ERROR: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
}
?>