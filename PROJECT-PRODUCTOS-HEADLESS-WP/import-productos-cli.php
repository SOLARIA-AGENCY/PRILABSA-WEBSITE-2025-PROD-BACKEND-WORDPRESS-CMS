<?php
/**
 * Script de importación de productos PRILABSA usando WordPress REST API
 * Este script se ejecuta como CLI para evitar restricciones web
 */

// Cargar WordPress
define('WP_CLI', true);
require_once('wp-config.php');

// Leer el catálogo de productos
$catalog_file = __DIR__ . '/catalogo-productos.json';
if (!file_exists($catalog_file)) {
    echo "Error: No se encuentra el archivo catalogo-productos.json\n";
    echo "Buscando en directorio actual: " . __DIR__ . "\n";
    $files = scandir(__DIR__);
    echo "Archivos encontrados:\n";
    foreach ($files as $file) {
        if (strpos($file, 'catalogo') !== false || strpos($file, 'producto') !== false) {
            echo "  - $file\n";
        }
    }
    exit(1);
}

$catalog = json_decode(file_get_contents($catalog_file), true);
if (!$catalog) {
    echo "Error: No se puede leer el catálogo de productos\n";
    echo "JSON error: " . json_last_error_msg() . "\n";
    exit(1);
}

echo "📦 Iniciando importación de " . count($catalog) . " productos...\n";
echo "📅 Fecha: " . date('Y-m-d H:i:s') . "\n\n";

$imported = 0;
$errors = 0;
$categories_created = array();
$types_created = array();

// Procesar cada producto
foreach ($catalog as $index => $product_data) {
    try {
        echo "📝 [" . ($index + 1) . "/" . count($catalog) . "] Procesando: " . ($product_data['nombre'] ?? 'Sin nombre') . "\n";
        
        // Preparar datos del post
        $post_data = array(
            'post_title' => $product_data['nombre'] ?? 'Producto sin nombre',
            'post_content' => $product_data['descripcion'] ?? '',
            'post_excerpt' => substr($product_data['descripcion'] ?? '', 0, 150) . '...',
            'post_status' => 'publish',
            'post_type' => 'producto',
            'post_author' => 1,
            'post_name' => sanitize_title($product_data['nombre'] ?? 'producto-' . $index)
        );
        
        // Insertar el post
        $post_id = wp_insert_post($post_data, true);
        
        if (is_wp_error($post_id)) {
            echo "  ❌ Error creando post: " . $post_id->get_error_message() . "\n";
            $errors++;
            continue;
        }
        
        echo "  ✅ Post creado con ID: $post_id\n";
        
        // Guardar campos personalizados (meta)
        if (!empty($product_data['codigo'])) {
            update_post_meta($post_id, '_codigo_producto', sanitize_text_field($product_data['codigo']));
            echo "  📋 Código: " . $product_data['codigo'] . "\n";
        }
        
        if (!empty($product_data['precio'])) {
            update_post_meta($post_id, '_precio_producto', floatval($product_data['precio']));
            echo "  💰 Precio: $" . $product_data['precio'] . "\n";
        }
        
        if (!empty($product_data['imagen'])) {
            update_post_meta($post_id, '_imagen_producto', esc_url_raw($product_data['imagen']));
            echo "  🖼️ Imagen: " . substr($product_data['imagen'], 0, 50) . "...\n";
        }
        
        // Procesar categoría
        if (!empty($product_data['categoria'])) {
            $category_name = sanitize_text_field($product_data['categoria']);
            $term = term_exists($category_name, 'categoria_producto');
            
            if (!$term) {
                $term = wp_insert_term($category_name, 'categoria_producto');
                if (!is_wp_error($term)) {
                    $categories_created[] = $category_name;
                    echo "  📁 Categoría creada: $category_name\n";
                }
            }
            
            if (!is_wp_error($term) && isset($term['term_id'])) {
                wp_set_post_terms($post_id, array($term['term_id']), 'categoria_producto');
                echo "  📂 Categoría asignada: $category_name\n";
            }
        }
        
        // Procesar tipo
        if (!empty($product_data['tipo'])) {
            $type_name = sanitize_text_field($product_data['tipo']);
            $term = term_exists($type_name, 'tipo_producto');
            
            if (!$term) {
                $term = wp_insert_term($type_name, 'tipo_producto');
                if (!is_wp_error($term)) {
                    $types_created[] = $type_name;
                    echo "  🏷️ Tipo creado: $type_name\n";
                }
            }
            
            if (!is_wp_error($term) && isset($term['term_id'])) {
                wp_set_post_terms($post_id, array($term['term_id']), 'tipo_producto');
                echo "  🏷️ Tipo asignado: $type_name\n";
            }
        }
        
        $imported++;
        echo "  ✅ Producto importado exitosamente\n\n";
        
    } catch (Exception $e) {
        echo "  ❌ Excepción: " . $e->getMessage() . "\n\n";
        $errors++;
    }
}

// Limpiar caché
if (function_exists('wp_cache_flush')) {
    wp_cache_flush();
    echo "🧹 Caché de WordPress limpiada\n";
}

// Estadísticas finales
echo "\n" . str_repeat("=", 50) . "\n";
echo "📊 RESUMEN DE IMPORTACIÓN\n";
echo str_repeat("=", 50) . "\n";
echo "✅ Productos importados: $imported\n";
echo "❌ Errores: $errors\n";
echo "📁 Categorías creadas: " . count($categories_created) . "\n";
echo "🏷️ Tipos creados: " . count($types_created) . "\n";
echo "📈 Total procesados: " . ($imported + $errors) . "\n";

if (!empty($categories_created)) {
    echo "\n📁 Nuevas categorías:\n";
    foreach ($categories_created as $cat) {
        echo "  - $cat\n";
    }
}

if (!empty($types_created)) {
    echo "\n🏷️ Nuevos tipos:\n";
    foreach ($types_created as $type) {
        echo "  - $type\n";
    }
}

echo "\n🎉 Importación completada el " . date('Y-m-d H:i:s') . "\n";

// Verificar productos importados
$total_products = wp_count_posts('producto');
echo "📦 Total de productos en base de datos: " . $total_products->publish . "\n";

?>