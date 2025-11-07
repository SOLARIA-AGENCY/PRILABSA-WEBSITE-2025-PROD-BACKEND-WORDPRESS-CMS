<?php
/**
 * Debug single product to understand image assignment issue
 */

require_once __DIR__ . '/wp-load.php';

$codigo_debug = isset($_GET['codigo']) ? $_GET['codigo'] : 'AD001';

echo "<h1>Debug Producto: {$codigo_debug}</h1>\n<pre>\n";

// Get from WordPress
$wp_products = get_posts([
    'post_type' => 'productos',
    'meta_key' => 'codigo',
    'meta_value' => $codigo_debug,
    'numberposts' => 1
]);

if (empty($wp_products)) {
    die("Producto {$codigo_debug} no encontrado en WordPress\n");
}

$product = $wp_products[0];
$post_id = $product->ID;

echo "WordPress Data:\n";
echo "─────────────────\n";
echo "ID: {$post_id}\n";
echo "Título: {$product->post_title}\n";
echo "Código: " . get_field('codigo', $post_id) . "\n";

$thumbnail_id = get_post_thumbnail_id($post_id);
if ($thumbnail_id) {
    $image_path = get_attached_file($thumbnail_id);
    echo "Imagen asignada: " . basename($image_path) . "\n";
    echo "Path completo: {$image_path}\n";
} else {
    echo "Sin imagen asignada\n";
}

echo "\n";

// Parse TypeScript
$ts_file = '/Users/carlosjperez/Documents/GitHub/PRILABSA-WEBSITE-2025-PROD-BACKEND-WORDPRESS-CMS/src/data/products/julio-2025.ts';
$ts_content = file_get_contents($ts_file);

// Find this product in TS
$products = preg_split('/\s+\{\s*"id":\s*"/', $ts_content);

echo "TypeScript Data:\n";
echo "─────────────────\n";

foreach ($products as $chunk) {
    if (preg_match('/"codigo":\s*"' . preg_quote($codigo_debug) . '"/', $chunk)) {
        // Extract image filename
        if (preg_match('/"image":\s*\{[^}]*"filename":\s*"([^"]+)"/s', $chunk, $img_match)) {
            echo "Imagen esperada: {$img_match[1]}\n";

            $images_dir = '/Users/carlosjperez/Documents/GitHub/PRILABSA-WEBSITE-2025-PROD-BACKEND-WORDPRESS-CMS/public/assets/images/productos/';
            $full_path = $images_dir . $img_match[1];
            echo "Path esperado: {$full_path}\n";
            echo "Archivo existe: " . (file_exists($full_path) ? 'SÍ' : 'NO') . "\n";
        }

        // Show first 500 chars of this product's data
        echo "\nPrimeros 500 caracteres del chunk:\n";
        echo substr($chunk, 0, 500) . "...\n";
        break;
    }
}

echo "\n</pre>";
