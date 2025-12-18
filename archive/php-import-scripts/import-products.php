<?php
// Product import script for PRILABSA
require_once('wp-load.php');

if (!is_user_logged_in()) {
    wp_set_current_user(1); // Admin user
}

$json_file = 'wp-content/uploads/prilabsa-productos/PRILABSA_CATALOGO_WEB_2025.json';

if (!file_exists($json_file)) {
    echo 'ERROR: Catalog file not found
';
    exit(1);
}

$json_content = file_get_contents($json_file);
$data = json_decode($json_content, true);

if (!$data || !isset($data['productos'])) {
    echo 'ERROR: Invalid JSON structure
';
    exit(1);
}

$imported = 0;
$errors = array();
$categories_created = array();

foreach ($data['productos'] as $producto_data) {
    try {
        // Create/update product
        $post_data = array(
            'post_type' => 'producto',
            'post_title' => $producto_data['nombre'],
            'post_content' => $producto_data['descripcion'],
            'post_status' => 'publish',
            'post_name' => sanitize_title($producto_data['codigo'])
        );
        
        // Check if product already exists
        $existing = get_posts(array(
            'post_type' => 'producto',
            'meta_key' => '_codigo_producto',
            'meta_value' => $producto_data['codigo'],
            'posts_per_page' => 1
        ));
        
        if ($existing) {
            $post_id = $existing[0]->ID;
            $post_data['ID'] = $post_id;
            wp_update_post($post_data);
        } else {
            $post_id = wp_insert_post($post_data);
        }
        
        if ($post_id) {
            // Save custom fields
            update_post_meta($post_id, '_codigo_producto', $producto_data['codigo']);
            update_post_meta($post_id, '_descripcion_detallada', $producto_data['descripcion']);
            update_post_meta($post_id, '_especificaciones', $producto_data['especificaciones'] ?? '');
            update_post_meta($post_id, '_beneficios', $producto_data['beneficios'] ?? '');
            update_post_meta($post_id, '_presentacion', $producto_data['presentacion'] ?? '');
            update_post_meta($post_id, '_imagen_producto', $producto_data['imagen'] ?? '');
            update_post_meta($post_id, '_pdf_ficha_tecnica', $producto_data['pdf'] ?? '');
            
            // Set categories
            if (isset($producto_data['categoria'])) {
                $categoria_slug = $producto_data['categoria'];
                $categoria_name = ucfirst($categoria_slug);
                
                // Create category if it doesn't exist
                if (!term_exists($categoria_slug, 'categoria_producto')) {
                    wp_insert_term($categoria_name, 'categoria_producto', array('slug' => $categoria_slug));
                    $categories_created[] = $categoria_name;
                }
                
                wp_set_post_terms($post_id, array($categoria_slug), 'categoria_producto');
            }
            
            $imported++;
        } else {
            $errors[] = 'Failed to create/update product: ' . $producto_data['codigo'];
        }
        
    } catch (Exception $e) {
        $errors[] = 'Exception for ' . $producto_data['codigo'] . ': ' . $e->getMessage();
    }
}

echo "IMPORT COMPLETE
";
echo "Products imported: $imported
";
echo "Errors: " . count($errors) . "
";

if ($categories_created) {
    echo "Categories created: " . implode(', ', $categories_created) . "
";
}

if ($errors) {
    echo "
ERRORS:
";
    foreach ($errors as $error) {
        echo "- $error
";
    }
}

echo "
Import finished at " . date('Y-m-d H:i:s') . "
";
?>