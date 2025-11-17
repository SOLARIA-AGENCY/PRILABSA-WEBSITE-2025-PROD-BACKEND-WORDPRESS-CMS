<?php
/**
 * PRILABSA Import Shortcode
 * Usage: [prilabsa_import]
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Register shortcode
add_shortcode('prilabsa_import', 'prilabsa_import_shortcode_handler');

function prilabsa_import_shortcode_handler($atts) {
    // Only allow administrators
    if (!current_user_can('manage_options')) {
        return '<p>You need administrator privileges to run this import.</p>';
    }
    
    // Check if import should run
    if (isset($_GET['run_import']) && $_GET['run_import'] === 'yes') {
        return prilabsa_run_import();
    }
    
    // Show import form
    $current_url = remove_query_arg('run_import');
    $import_url = add_query_arg('run_import', 'yes', $current_url);
    
    $product_count = wp_count_posts('producto');
    
    ob_start();
    ?>
    <div class="wrap" style="max-width: 800px; margin: 20px 0;">
        <h2>PRILABSA Product Import</h2>
        
        <div class="notice notice-info">
            <p><strong>Current Status:</strong></p>
            <p>Total products published: <?php echo $product_count->publish; ?></p>
        </div>
        
        <div class="notice notice-warning">
            <p><strong>⚠️ Warning:</strong> This will import/update all 105 products from the catalog.</p>
            <p>Make sure you have a backup before proceeding.</p>
        </div>
        
        <p>
            <a href="<?php echo esc_url($import_url); ?>" class="button button-primary">
                🚀 Start Import
            </a>
        </p>
    </div>
    <?php
    return ob_get_clean();
}

function prilabsa_run_import() {
    ob_start();
    ?>
    <div class="wrap" style="max-width: 800px; margin: 20px 0;">
        <h2>🚀 Running PRILABSA Product Import</h2>
    <?php
    
    try {
        // Load catalog file
        $catalog_file = ABSPATH . 'catalogo-productos.json';
        
        if (!file_exists($catalog_file)) {
            echo '<div class="notice notice-error"><p>❌ Catalog file not found: ' . esc_html($catalog_file) . '</p></div>';
            return ob_get_clean();
        }
        
        $catalog_json = file_get_contents($catalog_file);
        $catalog = json_decode($catalog_json, true);
        
        if (!$catalog || !isset($catalog['productos'])) {
            echo '<div class="notice notice-error"><p>❌ Failed to parse catalog file</p></div>';
            return ob_get_clean();
        }
        
        echo '<div class="notice notice-success"><p>✅ Catalog loaded with ' . count($catalog['productos']) . ' products</p></div>';
        
        $imported = 0;
        $updated = 0;
        $failed = 0;
        $results = array();
        
        echo '<div style="background: #f9f9f9; padding: 10px; margin: 10px 0; border-left: 4px solid #0073aa;">';
        echo '<h3>Import Progress:</h3>';
        
        foreach ($catalog['productos'] as $index => $product_data) {
            try {
                // Check if product already exists by code
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
                    'post_type' => 'producto'
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
                
                echo "<p>✅ [$index] " . esc_html($product_data['nombre']) . " - $action (ID: $post_id)</p>";
                
                // Flush output every 10 products
                if ($index % 10 === 0) {
                    echo '</div><div style="background: #f9f9f9; padding: 10px; margin: 10px 0; border-left: 4px solid #0073aa;">';
                    echo '<h3>Import Progress (continued):</h3>';
                }
                
            } catch (Exception $e) {
                echo "<p>❌ [$index] " . esc_html($product_data['nombre']) . " - Error: " . esc_html($e->getMessage()) . "</p>";
                $failed++;
            }
        }
        
        echo '</div>';
        
        // Summary
        echo '<div class="notice notice-success">';
        echo '<h3>🎉 Import Summary</h3>';
        echo "<p>✅ New products created: $imported</p>";
        echo "<p>🔄 Existing products updated: $updated</p>";
        echo "<p>❌ Failed: $failed</p>";
        echo "<p><strong>Total processed: " . ($imported + $updated + $failed) . "</strong></p>";
        echo '</div>';
        
        // Verify final count
        $final_count = wp_count_posts('producto');
        echo '<div class="notice notice-info">';
        echo "<p><strong>Final product count: {$final_count->publish}</strong></p>";
        echo '</div>';
        
    } catch (Exception $e) {
        echo '<div class="notice notice-error">';
        echo '<p>❌ Import failed with error: ' . esc_html($e->getMessage()) . '</p>';
        echo '</div>';
    }
    
    echo '<p><a href="' . remove_query_arg('run_import') . '" class="button">← Back to Import Page</a></p>';
    echo '</div>';
    
    return ob_get_clean();
}

// Add admin notice
add_action('admin_notices', 'prilabsa_import_admin_notice');

function prilabsa_import_admin_notice() {
    if (isset($_GET['import_complete'])) {
        ?>
        <div class="notice notice-success is-dismissible">
            <p>✅ Product import completed successfully!</p>
        </div>
        <?php
    }
}
?>