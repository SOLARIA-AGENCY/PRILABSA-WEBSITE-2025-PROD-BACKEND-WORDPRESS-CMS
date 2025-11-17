<?php
/**
 * Direct Import Script - Execute via WordPress Admin
 * Place this in wp-content/mu-plugins/ and access via admin
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Add admin bar menu item
add_action('admin_bar_menu', 'prilabsa_import_admin_bar', 100);

function prilabsa_import_admin_bar($wp_admin_bar) {
    if (!current_user_can('manage_options')) {
        return;
    }
    
    $args = array(
        'id' => 'prilabsa-import',
        'title' => '🚀 Import Products',
        'href' => admin_url('admin.php?page=prilabsa-import'),
        'meta' => array(
            'class' => 'prilabsa-import'
        )
    );
    $wp_admin_bar->add_node($args);
}

// Add admin page
add_action('admin_menu', 'prilabsa_import_admin_menu');

function prilabsa_import_admin_menu() {
    add_submenu_page(
        null,
        'PRILABSA Import',
        'PRILABSA Import',
        'manage_options',
        'prilabsa-import',
        'prilabsa_import_admin_page'
    );
}

function prilabsa_import_admin_page() {
    if (!current_user_can('manage_options')) {
        wp_die('Access denied');
    }
    
    ?>
    <div class="wrap">
        <h1>🚀 PRILABSA Product Import</h1>
        
        <?php
        if (isset($_POST['execute_import'])) {
            prilabsa_execute_import();
        }
        ?>
        
        <div class="card">
            <h2>Current Status</h2>
            <?php
            $product_count = wp_count_posts('producto');
            echo "<p><strong>Total products:</strong> {$product_count->publish}</p>";
            
            // Check if catalog exists
            $catalog_file = ABSPATH . 'catalogo-productos.json';
            if (file_exists($catalog_file)) {
                $catalog = json_decode(file_get_contents($catalog_file), true);
                $catalog_count = isset($catalog['productos']) ? count($catalog['productos']) : 0;
                echo "<p><strong>Catalog products:</strong> $catalog_count</p>";
            } else {
                echo "<p><strong>Catalog file:</strong> ❌ Not found</p>";
            }
            ?>
        </div>
        
        <form method="post" class="card">
            <h2>Execute Import</h2>
            <p class="notice notice-warning">
                <strong>⚠️ Warning:</strong> This will import/update all products from the catalog.
            </p>
            <p>
                <label>
                    <input type="checkbox" name="confirm" value="1" required>
                    I understand this action will modify the database
                </label>
            </p>
            <p>
                <input type="submit" name="execute_import" class="button button-primary" value="🚀 Execute Import">
            </p>
        </form>
    </div>
    <?php
}

function prilabsa_execute_import() {
    if (!isset($_POST['confirm'])) {
        echo '<div class="notice notice-error"><p>Please confirm the action.</p></div>';
        return;
    }
    
    echo '<div class="notice notice-info"><h3>🚀 Starting Import...</h3>';
    
    try {
        $catalog_file = ABSPATH . 'catalogo-productos.json';
        if (!file_exists($catalog_file)) {
            throw new Exception("Catalog file not found: $catalog_file");
        }
        
        $catalog = json_decode(file_get_contents($catalog_file), true);
        if (!$catalog || !isset($catalog['productos'])) {
            throw new Exception("Failed to parse catalog file");
        }
        
        echo '<p>✅ Catalog loaded with ' . count($catalog['productos']) . ' products</p>';
        
        $imported = 0;
        $updated = 0;
        $failed = 0;
        $current_user = wp_get_current_user();
        
        echo '<div style="background: #f9f9f9; padding: 10px; margin: 10px 0; max-height: 500px; overflow-y: auto; font-family: monospace; font-size: 12px;">';
        
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
                    substr($product_data['nombre'], 0, 40), 
                    $post_id,
                    $product_data['codigo']
                );
                
            } catch (Exception $e) {
                printf("[%03d] ERROR: %s - %s\n", 
                    $index + 1, 
                    substr($product_data['nombre'], 0, 40), 
                    $e->getMessage()
                );
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
        
        // Final verification
        $final_count = wp_count_posts('producto');
        echo "<div class='notice notice-info'><p><strong>Final product count: {$final_count->publish}</strong></p></div>";
        
        // API endpoint info
        echo '<div class="notice notice-info">';
        echo '<h4>API Information:</h4>';
        $api_url = rest_url('wp/v2/productos');
        echo "<p>REST API Endpoint: <code>$api_url</code></p>";
        echo '</div>';
        
    } catch (Exception $e) {
        echo '<div class="notice notice-error">';
        echo '<p>❌ Import failed: ' . esc_html($e->getMessage()) . '</p>';
        echo '</div>';
    }
    
    echo '</div>';
}
?>