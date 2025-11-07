<?php
/**
 * CORRECCIÓN MASIVA DE IMÁGENES INCORRECTAS
 *
 * Usa los datos exactos de julio-2025.ts para asignar imágenes correctas
 *
 * http://localhost:8000/fix-incorrect-images.php
 */

require_once __DIR__ . '/wp-load.php';

set_time_limit(600);

echo "<h1>🔧 CORRECCIÓN MASIVA DE IMÁGENES</h1>\n<pre>\n";

$ts_file = '/Users/carlosjperez/Documents/GitHub/PRILABSA-WEBSITE-2025-PROD-BACKEND-WORDPRESS-CMS/src/data/products/julio-2025.ts';
$images_dir = '/Users/carlosjperez/Documents/GitHub/PRILABSA-WEBSITE-2025-PROD-BACKEND-WORDPRESS-CMS/public/assets/images/productos/';

echo "📋 Parseando TypeScript para obtener nombres exactos de imágenes...\n\n";

// Parse TypeScript - Split by products and extract data
$ts_content = file_get_contents($ts_file);

// Split into individual product objects (each starts with "id":")
$products = preg_split('/\s+\{\s*"id":\s*"/', $ts_content);

$ts_images = [];
$ts_pdfs = [];

foreach ($products as $product_chunk) {
    // Skip if empty or doesn't have codigo
    if (empty(trim($product_chunk))) continue;

    // Extract codigo
    if (preg_match('/"codigo":\s*"([^"]+)"/', $product_chunk, $codigo_match)) {
        $codigo = $codigo_match[1];

        // Extract image filename
        if (preg_match('/"image":\s*\{[^}]*"filename":\s*"([^"]+)"/s', $product_chunk, $img_match)) {
            $ts_images[$codigo] = $img_match[1];
        }

        // Extract PDF filename
        if (preg_match('/"pdf":\s*\{[^}]*"filename":\s*"([^"]+)"/s', $product_chunk, $pdf_match)) {
            $ts_pdfs[$codigo] = $pdf_match[1];
        }
    }
}

echo "✓ Extraídos " . count($ts_images) . " mapeos código → imagen\n";
echo "✓ Extraídos " . count($ts_pdfs) . " mapeos código → PDF\n\n";

// Get all WordPress products
$wp_products = get_posts([
    'post_type' => 'productos',
    'post_status' => 'publish',
    'numberposts' => -1,
    'orderby' => 'meta_value',
    'meta_key' => 'codigo',
    'order' => 'ASC'
]);

echo "✓ Productos en WordPress: " . count($wp_products) . "\n\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

$stats = [
    'procesados' => 0,
    'corregidos' => 0,
    'sin_cambio' => 0,
    'archivo_no_existe' => 0,
    'errores' => 0,
];

foreach ($wp_products as $product) {
    $post_id = $product->ID;
    $codigo = get_field('codigo', $post_id);
    $titulo = $product->post_title;

    $stats['procesados']++;

    echo "[{$stats['procesados']}/105] {$codigo} - {$titulo}\n";

    // Get expected image from TypeScript
    if (!isset($ts_images[$codigo])) {
        echo "   ⚠️  No encontrado en TypeScript - OMITIENDO\n\n";
        continue;
    }

    $expected_filename = $ts_images[$codigo];
    $expected_path = $images_dir . $expected_filename;

    // Check if expected image exists
    if (!file_exists($expected_path)) {
        echo "   ❌ Archivo no existe: {$expected_filename}\n\n";
        $stats['archivo_no_existe']++;
        continue;
    }

    // Get current assigned image
    $current_thumbnail_id = get_post_thumbnail_id($post_id);
    $current_filename = null;
    if ($current_thumbnail_id) {
        $current_path = get_attached_file($current_thumbnail_id);
        $current_filename = basename($current_path);
    }

    // Check if already correct
    if ($current_filename === $expected_filename) {
        echo "   ✓ Imagen ya correcta: {$expected_filename}\n\n";
        $stats['sin_cambio']++;
        continue;
    }

    // Delete old incorrect attachment
    if ($current_thumbnail_id) {
        wp_delete_attachment($current_thumbnail_id, true);
        echo "   🗑️  Eliminada imagen incorrecta: {$current_filename}\n";
    }

    // Upload correct image
    $new_image_id = upload_correct_image($expected_path, $post_id);

    if ($new_image_id) {
        set_post_thumbnail($post_id, $new_image_id);
        echo "   ✅ Asignada imagen correcta: {$expected_filename} (ID: {$new_image_id})\n\n";
        $stats['corregidos']++;
    } else {
        echo "   ❌ Error al subir imagen\n\n";
        $stats['errores']++;
    }

    // Flush output
    flush();
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "RESUMEN DE CORRECCIÓN\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

echo "📊 Productos procesados:       {$stats['procesados']}\n";
echo "✅ Imágenes corregidas:        {$stats['corregidos']}\n";
echo "✓  Ya correctas (sin cambio):  {$stats['sin_cambio']}\n";
echo "❌ Archivo no existe:          {$stats['archivo_no_existe']}\n";
echo "❌ Errores al subir:           {$stats['errores']}\n\n";

$total_ok = $stats['corregidos'] + $stats['sin_cambio'];
$porcentaje = round(($total_ok / $stats['procesados']) * 100, 1);
echo "📈 Porcentaje OK final: {$porcentaje}%\n\n";

echo "🔗 Ver productos: http://localhost:8000/wp-admin/edit.php?post_type=productos\n";
echo "🔗 Re-auditar: http://localhost:8000/audit-productos-completo.php\n\n";

echo "</pre>";

/**
 * Upload correct image to WordPress media library
 */
function upload_correct_image($file_path, $post_id) {
    if (!file_exists($file_path)) {
        return false;
    }

    $file_name = basename($file_path);
    $file_type = wp_check_filetype($file_name);

    // Upload directory
    $upload_dir = wp_upload_dir();
    $dest_path = $upload_dir['path'] . '/' . $file_name;

    // Copy file to uploads directory
    if (!copy($file_path, $dest_path)) {
        return false;
    }

    // Prepare attachment data
    $attachment = [
        'guid' => $upload_dir['url'] . '/' . $file_name,
        'post_mime_type' => $file_type['type'],
        'post_title' => preg_replace('/\.[^.]+$/', '', $file_name),
        'post_content' => '',
        'post_status' => 'inherit'
    ];

    // Insert attachment
    $attach_id = wp_insert_attachment($attachment, $dest_path, $post_id);

    if (!$attach_id) {
        return false;
    }

    // Generate metadata for images
    require_once(ABSPATH . 'wp-admin/includes/image.php');
    $attach_data = wp_generate_attachment_metadata($attach_id, $dest_path);
    wp_update_attachment_metadata($attach_id, $attach_data);

    return $attach_id;
}
