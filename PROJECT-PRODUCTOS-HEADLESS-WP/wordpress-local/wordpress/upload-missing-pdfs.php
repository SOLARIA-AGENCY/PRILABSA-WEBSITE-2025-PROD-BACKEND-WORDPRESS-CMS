<?php
/**
 * SUBIR 10 PDFs FALTANTES
 *
 * Sube los PDFs que existen en el filesystem pero con nombres diferentes
 *
 * http://localhost:8000/upload-missing-pdfs.php
 */

require_once __DIR__ . '/wp-load.php';

set_time_limit(300);
ini_set('memory_limit', '512M');

echo "<!DOCTYPE html>\n<html><head><meta charset='UTF-8'></head><body>\n";
echo "<h1>📄 SUBIR PDFs FALTANTES</h1>\n";
echo "<pre style='background:#000;color:#0f0;padding:20px;font-family:monospace'>\n\n";

$pdfs_dir = '/Users/carlosjperez/Documents/GitHub/PRILABSA-WEBSITE-2025-PROD-BACKEND-WORDPRESS-CMS/public/assets/pdfs/productos/';

// Mapeo de código => archivo PDF real
$pdf_map = [
    'AD009' => 'AD009_Saponina.pdf',
    'AL007' => 'AL007_EZ_Artemia.pdf',
    'AL008' => 'AL008_EZ_Artemia_Ultra.pdf',
    'AL009' => 'AL009_EZ_Larva.pdf',
    'AL012' => 'AL012_Gold_Feed.pdf',
    'AL014' => 'AL014_Larva_AP_100.pdf',
    'AL015' => 'AL015_Larva_Z_Plus.pdf',
    'AL017' => 'AL017_MPs.pdf',
    'AL022' => 'AL022_Z_Pro.pdf',
    'QU016' => 'QU016_Sulfato_de_Aluminio.pdf',
];

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "SUBIENDO 10 PDFs FALTANTES\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

$stats = [
    'total' => count($pdf_map),
    'success' => 0,
    'errors' => 0,
    'not_found' => 0
];

foreach ($pdf_map as $codigo => $pdf_filename) {
    echo "[{$codigo}] Procesando...\n";

    // Find product by codigo
    $wp_products = get_posts([
        'post_type' => 'productos',
        'meta_key' => 'codigo',
        'meta_value' => $codigo,
        'numberposts' => 1
    ]);

    if (empty($wp_products)) {
        echo "   ❌ Producto no encontrado en WordPress\n\n";
        $stats['errors']++;
        continue;
    }

    $product = $wp_products[0];
    $post_id = $product->ID;
    $nombre = $product->post_title;

    echo "   Producto: {$nombre} (ID: {$post_id})\n";

    // Check if PDF already assigned
    $existing_pdf = get_field('pdf', $post_id);
    if ($existing_pdf) {
        echo "   ⚠️  Ya tiene PDF asignado (ID: {$existing_pdf})\n";
        echo "   Eliminando PDF anterior...\n";
        wp_delete_attachment($existing_pdf, true);
    }

    // Upload PDF
    $pdf_path = $pdfs_dir . $pdf_filename;
    if (!file_exists($pdf_path)) {
        echo "   ❌ Archivo no existe: {$pdf_path}\n\n";
        $stats['not_found']++;
        continue;
    }

    $pdf_id = upload_media_file($pdf_path, $post_id, 'pdf');
    if ($pdf_id) {
        // Update ACF field
        update_field('pdf', $pdf_id, $post_id);
        echo "   ✓ PDF subido: {$pdf_filename} (ID: {$pdf_id})\n";
        echo "   ✓ Campo ACF actualizado\n";
        $stats['success']++;
    } else {
        echo "   ❌ Error al subir PDF\n";
        $stats['errors']++;
    }

    echo "\n";
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "RESUMEN\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

echo "📊 Total PDFs a subir:     {$stats['total']}\n";
echo "✅ Subidos exitosos:       {$stats['success']}\n";
echo "❌ Errores:                {$stats['errors']}\n";
echo "⚠️  Archivos no encontrados: {$stats['not_found']}\n\n";

$success_rate = round(($stats['success'] / $stats['total']) * 100, 1);
echo "📈 Tasa de éxito: {$success_rate}%\n\n";

if ($stats['success'] > 0) {
    echo "✓ Verificar en: http://localhost:8000/wp-admin/edit.php?post_type=productos\n";
    echo "✓ API: http://localhost:8000/index.php?rest_route=/wp/v2/productos\n";
}

echo "\n</pre></body></html>";

/**
 * Upload media file to WordPress
 */
function upload_media_file($file_path, $post_id, $type = 'pdf') {
    if (!file_exists($file_path)) return false;

    $file_name = basename($file_path);
    $file_type = wp_check_filetype($file_name);
    $upload_dir = wp_upload_dir();
    $dest_path = $upload_dir['path'] . '/' . $file_name;

    // Copy file to uploads directory
    if (!copy($file_path, $dest_path)) return false;

    $attachment = [
        'guid' => $upload_dir['url'] . '/' . $file_name,
        'post_mime_type' => $file_type['type'],
        'post_title' => preg_replace('/\.[^.]+$/', '', $file_name),
        'post_content' => '',
        'post_status' => 'inherit'
    ];

    $attach_id = wp_insert_attachment($attachment, $dest_path, $post_id);
    if (!$attach_id) return false;

    // Generate attachment metadata (for images)
    if ($type === 'image') {
        require_once(ABSPATH . 'wp-admin/includes/image.php');
        $attach_data = wp_generate_attachment_metadata($attach_id, $dest_path);
        wp_update_attachment_metadata($attach_id, $attach_data);
    }

    return $attach_id;
}
