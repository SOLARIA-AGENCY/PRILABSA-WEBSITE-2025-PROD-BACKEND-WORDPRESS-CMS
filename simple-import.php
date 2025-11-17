<?php
require_once('wordpress/wp-load.php');
if (!is_user_logged_in()) wp_set_current_user(1);

$catalog = json_decode(file_get_contents('wp-content/uploads/PRILABSA_CATALOGO_WEB_2025.json'), true);
$imported = 0;
$errors = 0;

foreach ($catalog['productos'] as $p) {
    $post_id = wp_insert_post(array(
        'post_type' => 'producto',
        'post_title' => $p['nombre'],
        'post_content' => $p['descripcion'],
        'post_status' => 'publish'
    ));
    
    if ($post_id) {
        update_post_meta($post_id, '_codigo_producto', $p['codigo']);
        update_post_meta($post_id, '_imagen_producto', $p['imagen']);
        update_post_meta($post_id, '_pdf_ficha_tecnica', $p['pdf']);
        
        if (isset($p['categoria'])) {
            wp_set_post_terms($post_id, array($p['categoria']), 'categoria_producto');
        }
        
        $imported++;
        echo "Imported: {$p['codigo']} - {$p['nombre']}
";
    } else {
        $errors++;
    }
}

echo "
COMPLETE: $imported imported, $errors errors
";
?>