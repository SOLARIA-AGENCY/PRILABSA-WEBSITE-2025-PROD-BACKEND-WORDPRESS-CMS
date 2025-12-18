<?php
// AJAX handler for product import
add_action('wp_ajax_prilabsa_import_products', 'prilabsa_import_products_ajax');

function prilabsa_import_products_ajax() {
    // Check permissions
    if (!current_user_can('manage_options')) {
        wp_die('Insufficient permissions');
    }
    
    $catalog_path = WP_CONTENT_DIR . '/uploads/PRILABSA_CATALOGO_WEB_2025.json';
    if (!file_exists($catalog_path)) {
        wp_die('Catalog file not found');
    }
    
    $catalog_content = file_get_contents($catalog_path);
    $catalog = json_decode($catalog_content, true);
    
    if (!$catalog || !isset($catalog['productos'])) {
        wp_die('Invalid catalog format');
    }
    
    $imported = 0;
    $errors = array();
    
    foreach ($catalog['productos'] as $product) {
        $post_id = wp_insert_post(array(
            'post_type' => 'producto',
            'post_title' => $product['nombre'],
            'post_content' => $product['descripcion'],
            'post_status' => 'publish'
        ));
        
        if ($post_id) {
            update_post_meta($post_id, '_codigo_producto', $product['codigo']);
            update_post_meta($post_id, '_imagen_producto', $product['imagen']);
            update_post_meta($post_id, '_pdf_ficha_tecnica', $product['pdf']);
            
            if (isset($product['categoria'])) {
                wp_set_post_terms($post_id, array($product['categoria']), 'categoria_producto');
            }
            
            $imported++;
        } else {
            $errors[] = $product['codigo'];
        }
    }
    
    wp_send_json(array(
        'success' => true,
        'imported' => $imported,
        'errors' => $errors
    ));
}
?>