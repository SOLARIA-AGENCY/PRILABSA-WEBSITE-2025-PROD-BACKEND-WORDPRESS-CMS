<?php
/**
 * PRILABSA - Script de Migración Masiva de Productos
 *
 * Migra 105 productos desde CSV a WordPress CMS
 * Incluye: imágenes, PDFs, todos los campos ACF
 *
 * Uso: http://localhost:8000/import-productos-batch.php
 */

// Load WordPress
require_once __DIR__ . '/wp-load.php';

// Security check
if (defined('WP_ENV') && WP_ENV === 'production') {
    die('❌ ERROR: Este script no puede ejecutarse en producción');
}

// Set execution limits
set_time_limit(600); // 10 minutes
ini_set('memory_limit', '512M');

echo "<!DOCTYPE html>\n<html><head><meta charset='UTF-8'><title>Importación Masiva PRILABSA</title></head><body>\n";
echo "<h1>🚀 PRILABSA - Importación Masiva de Productos</h1>\n";
echo "<pre style='background:#000;color:#0f0;padding:20px;font-family:monospace'>\n\n";

// Configuration
$csv_path = '/Users/carlosjperez/Documents/GitHub/PRILABSA-WEBSITE-2025-PROD-BACKEND-WORDPRESS-CMS/resources/product-assets-julio-2025/productos_inventario.csv';
$images_dir = '/Users/carlosjperez/Documents/GitHub/PRILABSA-WEBSITE-2025-PROD-BACKEND-WORDPRESS-CMS/public/assets/images/productos/';
$pdfs_dir = '/Users/carlosjperez/Documents/GitHub/PRILABSA-WEBSITE-2025-PROD-BACKEND-WORDPRESS-CMS/public/assets/pdfs/productos/';

// Validation
if (!file_exists($csv_path)) {
    die("❌ ERROR: CSV no encontrado en {$csv_path}\n");
}

echo "✅ CSV encontrado: " . basename($csv_path) . "\n";
echo "✅ Directorio imágenes: " . (is_dir($images_dir) ? 'OK' : 'NO EXISTE') . "\n";
echo "✅ Directorio PDFs: " . (is_dir($pdfs_dir) ? 'OK' : 'NO EXISTE') . "\n\n";

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "INICIANDO IMPORTACIÓN MASIVA\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

// Read CSV
$csv_handle = fopen($csv_path, 'r');
if (!$csv_handle) {
    die("❌ ERROR: No se pudo abrir el archivo CSV\n");
}

// Skip header row
$headers = fgetcsv($csv_handle);
echo "📋 Columnas CSV: " . implode(', ', array_slice($headers, 0, 10)) . "...\n\n";

// Statistics
$stats = [
    'total' => 0,
    'success' => 0,
    'errors' => 0,
    'images_uploaded' => 0,
    'pdfs_uploaded' => 0,
    'skipped' => 0
];

$start_time = time();

// Process each row
while (($row = fgetcsv($csv_handle)) !== false) {
    $stats['total']++;

    // Map CSV columns to array (adjust indices based on your CSV structure)
    $product = [
        'id' => $row[0],
        'numero' => $row[1],
        'codigo' => $row[2],
        'nombre' => $row[3],
        'categoria' => $row[4],
        'subcategoria' => $row[5],
        'slug' => $row[6],
        'imagen' => $row[7],
        'pdf' => $row[8],
        'descripcion_corta' => $row[9],
        'descripcion_larga' => $row[10],
        'marca' => $row[11],
        'disponibilidad' => $row[12],
        'destacado' => $row[13],
        'tags' => $row[14],
        'beneficios' => $row[15],
        'presentacion' => $row[16],
        'especificaciones' => $row[17],
        'palabras_clave' => $row[18],
    ];

    echo "\n[{$stats['total']}/105] Procesando: {$product['codigo']} - {$product['nombre']}\n";
    echo "   Categoría: {$product['categoria']} → {$product['subcategoria']}\n";

    // Check if product already exists by codigo
    $existing = get_posts([
        'post_type' => 'productos',
        'meta_key' => 'codigo',
        'meta_value' => $product['codigo'],
        'post_status' => 'any',
        'numberposts' => 1
    ]);

    if (!empty($existing)) {
        echo "   ⚠️  Ya existe (ID: {$existing[0]->ID}) - OMITIENDO\n";
        $stats['skipped']++;
        continue;
    }

    // Create WordPress post
    $post_data = [
        'post_title' => $product['nombre'],
        'post_content' => $product['descripcion_larga'],
        'post_excerpt' => $product['descripcion_corta'],
        'post_status' => 'publish',
        'post_type' => 'productos',
        'post_author' => 1,
    ];

    $post_id = wp_insert_post($post_data);

    if (is_wp_error($post_id)) {
        echo "   ❌ Error al crear post: " . $post_id->get_error_message() . "\n";
        $stats['errors']++;
        continue;
    }

    echo "   ✓ Post creado (ID: {$post_id})\n";

    // Upload featured image
    // Find image by product code (e.g., AD001_*.png)
    $image_pattern = $images_dir . $product['codigo'] . '_*.png';
    $matching_images = glob($image_pattern);

    // Also try .PNG extension
    if (empty($matching_images)) {
        $image_pattern = $images_dir . $product['codigo'] . '_*.PNG';
        $matching_images = glob($image_pattern);
    }

    $featured_image_id = null;
    if (!empty($matching_images)) {
        $image_path = $matching_images[0];
        $featured_image_id = upload_media_file($image_path, $post_id, 'image');
        if ($featured_image_id) {
            set_post_thumbnail($post_id, $featured_image_id);
            echo "   ✓ Imagen subida: " . basename($image_path) . " (ID: {$featured_image_id})\n";
            $stats['images_uploaded']++;
        } else {
            echo "   ⚠️  Error subiendo imagen\n";
        }
    } else {
        echo "   ⚠️  Imagen no encontrada para código: {$product['codigo']}\n";
    }

    // Upload PDF
    // Find PDF by product code (e.g., AD001_*.pdf)
    $pdf_pattern = $pdfs_dir . $product['codigo'] . '_*.pdf';
    $matching_pdfs = glob($pdf_pattern);

    // Also try without underscore variations
    if (empty($matching_pdfs)) {
        $pdf_pattern = $pdfs_dir . $product['codigo'] . '.pdf';
        if (file_exists($pdf_pattern)) {
            $matching_pdfs = [$pdf_pattern];
        }
    }

    $pdf_id = null;
    if (!empty($matching_pdfs)) {
        $pdf_path = $matching_pdfs[0];
        $pdf_id = upload_media_file($pdf_path, $post_id, 'pdf');
        if ($pdf_id) {
            echo "   ✓ PDF subido: " . basename($pdf_path) . " (ID: {$pdf_id})\n";
            $stats['pdfs_uploaded']++;
        } else {
            echo "   ⚠️  Error subiendo PDF\n";
        }
    } else {
        echo "   ⚠️  PDF no encontrado para código: {$product['codigo']}\n";
    }

    // Set ACF fields
    $acf_data = [
        'codigo' => $product['codigo'],
        'descripcion' => $product['descripcion_larga'],
        'beneficios' => $product['beneficios'],
        'presentacion' => $product['presentacion'],
        'categoria' => map_category_to_acf($product['categoria']),
        'subcategoria' => $product['subcategoria'],
    ];

    // Parse especificaciones (CSV format: "Key: Value; Key2: Value2")
    if (!empty($product['especificaciones'])) {
        $specs = [];
        $parts = explode(';', $product['especificaciones']);
        foreach ($parts as $part) {
            $kv = explode(':', trim($part), 2);
            if (count($kv) == 2) {
                $specs[] = [
                    'clave' => trim($kv[0]),
                    'valor' => trim($kv[1])
                ];
            }
        }
        if (!empty($specs)) {
            $acf_data['especificaciones'] = $specs;
        }
    }

    // Set PDF field if uploaded
    if ($pdf_id) {
        $acf_data['pdf'] = $pdf_id;
    }

    // Update all ACF fields
    foreach ($acf_data as $field_name => $field_value) {
        $result = update_field($field_name, $field_value, $post_id);
        if (!$result) {
            echo "   ⚠️  Error actualizando ACF: {$field_name}\n";
        }
    }

    echo "   ✓ Campos ACF actualizados\n";

    $stats['success']++;

    // Flush output buffer
    flush();
}

fclose($csv_handle);

$elapsed = time() - $start_time;

echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "RESUMEN DE IMPORTACIÓN\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
echo "📊 Total procesados:    {$stats['total']}\n";
echo "✅ Importados:          {$stats['success']}\n";
echo "⚠️  Omitidos (ya exist): {$stats['skipped']}\n";
echo "❌ Errores:             {$stats['errors']}\n";
echo "🖼️  Imágenes subidas:    {$stats['images_uploaded']}\n";
echo "📄 PDFs subidos:        {$stats['pdfs_uploaded']}\n";
echo "⏱️  Tiempo total:        {$elapsed} segundos\n\n";

echo "🔗 Enlaces útiles:\n";
echo "   - Ver productos: http://localhost:8000/wp-admin/edit.php?post_type=productos\n";
echo "   - REST API: http://localhost:8000/index.php?rest_route=/wp/v2/productos\n\n";

echo "</pre></body></html>";

/**
 * Upload media file to WordPress
 */
function upload_media_file($file_path, $post_id, $type = 'image') {
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

    // Generate metadata (only for images)
    if ($type === 'image') {
        require_once(ABSPATH . 'wp-admin/includes/image.php');
        $attach_data = wp_generate_attachment_metadata($attach_id, $dest_path);
        wp_update_attachment_metadata($attach_id, $attach_data);
    }

    return $attach_id;
}

/**
 * Map category names to ACF field values
 */
function map_category_to_acf($category) {
    $map = [
        'aditivos' => 'aditivos',
        'alimentos' => 'alimentos',
        'equipos' => 'equipos',
        'probioticos' => 'probioticos',
        'quimicos' => 'quimicos',
    ];

    $lower = strtolower(trim($category));
    return isset($map[$lower]) ? $map[$lower] : 'aditivos';
}
