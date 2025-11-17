<?php
/**
 * Plugin Name: PRILABSA Product Import
 * Description: Import products from catalog JSON
 * Version: 1.0
 * Author: PRILABSA
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Add import page to admin menu
add_action('admin_menu', 'prilabsa_import_menu');

function prilabsa_import_menu() {
    add_management_page(
        'PRILABSA Import',
        'PRILABSA Import',
        'manage_options',
        'prilabsa-import',
        'prilabsa_import_page'
    );
}

function prilabsa_import_page() {
    ?>
    <div class="wrap">
        <h1>PRILABSA Product Import</h1>
        
        <?php
        if (isset($_POST['import_products'])) {
            prilabsa_do_import();
        }
        ?>
        
        <form method="post">
            <p>Click the button below to import all products from the catalog file.</p>
            <p><strong>Warning:</strong> This will create/update all 105 products in the database.</p>
            
            <input type="submit" name="import_products" class="button button-primary" value="Import Products">
        </form>
        
        <hr>
        
        <h3>Current Status</h3>
        <?php
        $product_count = wp_count_posts('producto');
        echo "<p>Total products published: {$product_count->publish}</p>";
        ?>
    </div>
    <?php
}

function prilabsa_do_import() {
    echo '<div class="notice notice-info"><h3>Starting Import...</h3>';
    
    // Load catalog file
    $catalog_file = ABSPATH . 'catalogo-productos.json';
    if (!file_exists($catalog_file)) {
        echo '<p>❌ Catalog file not found: ' . $catalog_file . '</p></div>';
        return;
    }
    
    $catalog_json = file_get_contents($catalog_file);
    $catalog = json_decode($catalog_json, true);
    
    if (!$catalog || !isset($catalog['productos'])) {
        echo '<p>❌ Failed to parse catalog file</p></div>';
        return;
    }
    
    echo '<p>✅ Catalog loaded with ' . count($catalog['productos']) . ' products</p>';
    
    $imported = 0;
    $updated = 0;
    $failed = 0;
    
    foreach ($catalog['productos'] as $product_data) {
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
            
            echo "<p>✅ " . esc_html($product_data['nombre']) . " (ID: $post_id)</p>";
            
        } catch (Exception $e) {
            echo '<p>❌ Failed to import ' . esc_html($product_data['nombre']) . ': ' . $e->getMessage() . '</p>';
            $failed++;
        }
    }
    
    echo '<h3>Import Summary</h3>';
    echo "<p>✅ New products: $imported</p>";
    echo "<p>🔄 Updated products: $updated</p>";
    echo "<p>❌ Failed: $failed</p>";
    
    echo '</div>';
}
?>