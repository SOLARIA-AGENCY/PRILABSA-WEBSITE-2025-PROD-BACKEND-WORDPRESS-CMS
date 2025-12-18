<?php
/**
 * Plugin Name: PRILABSA Product Importer
 * Description: Import all products from catalog
 * Version: 1.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Add admin menu
add_action('admin_menu', 'prilabsa_importer_menu');

function prilabsa_importer_menu() {
    add_menu_page(
        'PRILABSA Importer',
        'Product Import',
        'manage_options',
        'prilabsa-importer',
        'prilabsa_importer_page',
        'dashicons-upload',
        6
    );
}

function prilabsa_importer_page() {
    ?>
    <div class="wrap">
        <h1>🚀 PRILABSA Product Importer</h1>
        
        <?php
        if (isset($_POST['run_import'])) {
            prilabsa_run_import();
        }
        ?>
        
        <div class="card">
            <h2>Import Status</h2>
            <?php
            $product_count = wp_count_posts('producto');
            echo "<p><strong>Current products:</strong> {$product_count->publish}</p>";
            ?>
        </div>
        
        <form method="post" class="card">
            <h2>Run Import</h2>
            <p>
                <label>
                    <input type="checkbox" name="confirm_import" value="1" required>
                    I confirm I want to import all products from catalog
                </label>
            </p>
            <p>
                <input type="submit" name="run_import" class="button button-primary" value="🚀 Import All Products">
            </p>
        </form>
    </div>
    <?php
}

function prilabsa_run_import() {
    if (!isset($_POST['confirm_import'])) {
        echo '<div class="notice notice-error"><p>Please confirm the import first.</p></div>';
        return;
    }
    
    echo '<div class="notice notice-info"><h3>🚀 Starting Import...</h3>';
    
    try {
        // Load catalog
        $catalog_file = ABSPATH . 'catalogo-productos.json';
        if (!file_exists($catalog_file)) {
            echo '<p>❌ Catalog file not found: ' . $catalog_file . '</p></div>';
            return;
        }
        
        $catalog = json_decode(file_get_contents($catalog_file), true);
        if (!$catalog || !isset($catalog['productos'])) {
            echo '<p>❌ Failed to parse catalog</p></div>';
            return;
        }
        
        echo '<p>✅ Catalog loaded with ' . count($catalog['productos']) . ' products</p>';
        
        $imported = 0;
        $updated = 0;
        $failed = 0;
        $current_user = wp_get_current_user();
        
        echo '<div style="background: #f9f9f9; padding: 10px; margin: 10px 0; max-height: 400px; overflow-y: auto;">';
        
        foreach ($catalog['productos'] as $index => $product_data) {
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
                
                echo "<p>✅ [$index] $action: " . esc_html($product_data['nombre']) . " (ID: $post_id)</p>";
                
            } catch (Exception $e) {
                echo "<p>❌ [$index] Failed: " . esc_html($product_data['nombre']) . " - " . esc_html($e->getMessage()) . "</p>";
                $failed++;
            }
        }
        
        echo '</div>';
        
        echo '<div class="notice notice-success">';
        echo '<h3>🎉 Import Complete!</h3>';
        echo "<p>✅ New products: $imported</p>";
        echo "<p>🔄 Updated products: $updated</p>";
        echo "<p>❌ Failed: $failed</p>";
        echo "<p><strong>Total processed: " . ($imported + $updated + $failed) . "</strong></p>";
        echo '</div>';
        
        // Verify final count
        $final_count = wp_count_posts('producto');
        echo "<div class='notice notice-info'><p><strong>Final product count: {$final_count->publish}</strong></p></div>";
        
        // Test API
        echo '<div class="notice notice-info">';
        echo '<h4>API Test:</h4>';
        $api_url = rest_url('wp/v2/productos');
        echo "<p>API Endpoint: <code>$api_url</code></p>";
        echo '</div>';
        
    } catch (Exception $e) {
        echo '<div class="notice notice-error">';
        echo '<p>❌ Import failed: ' . esc_html($e->getMessage()) . '</p>';
        echo '</div>';
    }
    
    echo '</div>';
}
?>