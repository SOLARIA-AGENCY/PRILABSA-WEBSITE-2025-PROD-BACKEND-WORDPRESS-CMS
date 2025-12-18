<?php
/**
 * Must-Use Plugin: PRILABSA Auto Import
 * Auto-executes product import on every admin page load
 * Place in wp-content/mu-plugins/
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Only run import once
if (!get_option('prilabsa_import_completed', false)) {
    add_action('admin_init', 'prilabsa_auto_import_products');
}

function prilabsa_auto_import_products() {
    // Only allow administrators
    if (!current_user_can('manage_options')) {
        return;
    }
    
    try {
        // Load catalog
        $catalog_file = ABSPATH . 'catalogo-productos.json';
        if (!file_exists($catalog_file)) {
            error_log('PRILABSA Import: Catalog file not found');
            return;
        }
        
        $catalog = json_decode(file_get_contents($catalog_file), true);
        if (!$catalog || !isset($catalog['productos'])) {
            error_log('PRILABSA Import: Failed to parse catalog');
            return;
        }
        
        $imported = 0;
        $updated = 0;
        $failed = 0;
        $current_user = wp_get_current_user();
        
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
                    'post_author' => $current_user->ID
                );
                
                if (!empty($existing)) {
                    $post_data['ID'] = $existing[0]->ID;
                    $post_id = wp_update_post($post_data);
                    $updated++;
                } else {
                    $post_id = wp_insert_post($post_data);
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
                
            } catch (Exception $e) {
                error_log("PRILABSA Import Error: {$product_data['nombre']} - {$e->getMessage()}");
                $failed++;
            }
        }
        
        // Mark as completed
        update_option('prilabsa_import_completed', true);
        update_option('prilabsa_import_results', array(
            'imported' => $imported,
            'updated' => $updated,
            'failed' => $failed,
            'timestamp' => current_time('mysql')
        ));
        
        // Log completion
        $final_count = wp_count_posts('producto');
        error_log("PRILABSA Import Complete: New=$imported, Updated=$updated, Failed=$failed, Total={$final_count->publish}");
        
    } catch (Exception $e) {
        error_log("PRILABSA Import Fatal Error: " . $e->getMessage());
    }
}

// Show admin notice
add_action('admin_notices', 'prilabsa_auto_import_notice');

function prilabsa_auto_import_notice() {
    $results = get_option('prilabsa_import_results');
    if ($results) {
        ?>
        <div class="notice notice-success is-dismissible">
            <h3>🎉 PRILABSA Auto Import Complete!</h3>
            <p>
                <strong>Results:</strong> 
                New: <?php echo $results['imported']; ?> | 
                Updated: <?php echo $results['updated']; ?> | 
                Failed: <?php echo $results['failed']; ?>
            </p>
            <p><strong>Time:</strong> <?php echo $results['timestamp']; ?></p>
            <p>
                <a href="<?php echo rest_url('wp/v2/productos'); ?>" target="_blank" class="button">
                    📡 View API
                </a>
                <a href="<?php echo admin_url('edit.php?post_type=producto'); ?>" class="button">
                    📦 View Products
                </a>
            </p>
        </div>
        <?php
    }
}
?>