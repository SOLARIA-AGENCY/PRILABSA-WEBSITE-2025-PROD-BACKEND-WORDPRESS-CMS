<?php
/**
 * Script de importación de productos PRILABSA
 */

// Cargar WordPress
require_once('wp-config.php');

// Leer el catálogo de productos
$catalog_file = __DIR__ . '/../../catalogo-productos.json';
if (!file_exists($catalog_file)) {
    echo "Error: No se encuentra el archivo catalogo-productos.json\n";
    exit(1);
}

$catalog = json_decode(file_get_contents($catalog_file), true);
if (!$catalog) {
    echo "Error: No se puede leer el catálogo de productos\n";
    exit(1);
}

echo "Iniciando importación de " . count($catalog) . " productos...\n";

$imported = 0;
$errors = 0;

foreach ($catalog as $product_data) {
    try {
        // Crear el post del producto
        $post_data = array(
            'post_title' => $product_data['nombre'] ?? 'Producto sin nombre',
            'post_content' => $product_data['descripcion'] ?? '',
            'post_status' => 'publish',
            'post_type' => 'producto',
            'post_author' => 1
        );
        
        $post_id = wp_insert_post($post_data);
        
        if ($post_id && !is_wp_error($post_id)) {
            // Guardar campos personalizados
            if (!empty($product_data['codigo'])) {
                update_post_meta($post_id, '_codigo_producto', sanitize_text_field($product_data['codigo']));
            }
            
            if (!empty($product_data['precio'])) {
                update_post_meta($post_id, '_precio_producto', floatval($product_data['precio']));
            }
            
            if (!empty($product_data['imagen'])) {
                update_post_meta($post_id, '_imagen_producto', esc_url_raw($product_data['imagen']));
            }
            
            if (!empty($product_data['categoria'])) {
                // Asignar categoría
                $term = term_exists($product_data['categoria'], 'categoria_producto');
                if (!$term) {
                    $term = wp_insert_term($product_data['categoria'], 'categoria_producto');
                }
                if (!is_wp_error($term)) {
                    wp_set_post_terms($post_id, array($term['term_id']), 'categoria_producto');
                }
            }
            
            if (!empty($product_data['tipo'])) {
                // Asignar tipo
                $term = term_exists($product_data['tipo'], 'tipo_producto');
                if (!$term) {
                    $term = wp_insert_term($product_data['tipo'], 'tipo_producto');
                }
                if (!is_wp_error($term)) {
                    wp_set_post_terms($post_id, array($term['term_id']), 'tipo_producto');
                }
            }
            
            $imported++;
            echo "✅ Importado: " . $product_data['nombre'] . " (ID: $post_id)\n";
        } else {
            $errors++;
            echo "❌ Error importando: " . $product_data['nombre'] . "\n";
        }
    } catch (Exception $e) {
        $errors++;
        echo "❌ Excepción importando: " . $product_data['nombre'] . " - " . $e->getMessage() . "\n";
    }
}

echo "\n=== Resumen de Importación ===\n";
echo "✅ Importados: $imported\n";
echo "❌ Errores: $errors\n";
echo "📊 Total procesados: " . ($imported + $errors) . "\n";

// Limpiar caché
if (function_exists('wp_cache_flush')) {
    wp_cache_flush();
}

echo "🎉 Importación completada!\n";
?>