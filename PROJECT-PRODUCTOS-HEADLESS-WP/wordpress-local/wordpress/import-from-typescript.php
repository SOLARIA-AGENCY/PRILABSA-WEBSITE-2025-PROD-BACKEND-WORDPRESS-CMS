<?php
/**
 * IMPORTACIÓN CORRECTA - Directo desde julio-2025.ts
 *
 * Lee el archivo TypeScript y extrae datos JSON
 * Importa 105 productos con datos correctos
 *
 * http://localhost:8000/import-from-typescript.php
 */

require_once __DIR__ . '/wp-load.php';

set_time_limit(900);
ini_set('memory_limit', '512M');

echo "<!DOCTYPE html>\n<html><head><meta charset='UTF-8'></head><body>\n";
echo "<h1>🚀 IMPORTACIÓN DESDE TYPESCRIPT</h1>\n";
echo "<pre style='background:#000;color:#0f0;padding:20px;font-family:monospace'>\n\n";

$ts_file = '/Users/carlosjperez/Documents/GitHub/PRILABSA-WEBSITE-2025-PROD-BACKEND-WORDPRESS-CMS/src/data/products/julio-2025.ts';
$images_dir = '/Users/carlosjperez/Documents/GitHub/PRILABSA-WEBSITE-2025-PROD-BACKEND-WORDPRESS-CMS/public/assets/images/productos/';
$pdfs_dir = '/Users/carlosjperez/Documents/GitHub/PRILABSA-WEBSITE-2025-PROD-BACKEND-WORDPRESS-CMS/public/assets/pdfs/productos/';

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "FASE 1: PARSEAR TYPESCRIPT\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

$ts_content = file_get_contents($ts_file);

// Split by products (each product starts with "id": )
$products = [];
$pattern = '/\{\s*"id":\s*"([^"]+)".*?"codigo":\s*"([^"]+)".*?"name":\s*"([^"]+)".*?"description":\s*"([^"]*)".*?"category":\s*"([^"]+)".*?"subcategory":\s*"([^"]*)".*?"image":\s*\{[^}]*"filename":\s*"([^"]*)"/s';

preg_match_all($pattern, $ts_content, $matches, PREG_SET_ORDER);

foreach ($matches as $match) {
    $id = $match[1];
    $codigo = $match[2];
    $nombre = $match[3];
    $descripcion = $match[4];
    $categoria = $match[5];
    $subcategoria = $match[6];
    $imagen = $match[7];

    // Find benefits
    $beneficios = [];
    if (preg_match('/"id":\s*"' . preg_quote($id) . '".*?"benefits":\s*\[(.*?)\]/s', $ts_content, $benefits_match)) {
        preg_match_all('/"([^"]+)"/', $benefits_match[1], $benefit_strings);
        $beneficios = $benefit_strings[1];
    }

    // Find presentation
    $presentacion = [];
    if (preg_match('/"id":\s*"' . preg_quote($id) . '".*?"presentation":\s*\[(.*?)\]/s', $ts_content, $pres_match)) {
        preg_match_all('/"([^"]+)"/', $pres_match[1], $pres_strings);
        $presentacion = $pres_strings[1];
    }

    // Find specifications
    $especificaciones = [];
    if (preg_match('/"id":\s*"' . preg_quote($id) . '".*?"specifications":\s*\[(.*?)\]/s', $ts_content, $specs_match)) {
        preg_match_all('/\{\s*"key":\s*"([^"]*)",\s*"value":\s*"([^"]*)"/s', $specs_match[1], $spec_items, PREG_SET_ORDER);
        foreach ($spec_items as $spec) {
            $especificaciones[] = ['key' => $spec[1], 'value' => $spec[2]];
        }
    }

    // Find PDF filename
    $pdf = '';
    if (preg_match('/"id":\s*"' . preg_quote($id) . '".*?"pdf":\s*\{[^}]*"filename":\s*"([^"]*)"/s', $ts_content, $pdf_match)) {
        $pdf = $pdf_match[1];
    }

    $products[] = [
        'id' => $id,
        'codigo' => $codigo,
        'name' => $nombre,
        'description' => $descripcion,
        'category' => $categoria,
        'subcategory' => $subcategoria,
        'benefits' => $beneficios,
        'presentation' => $presentacion,
        'specifications' => $especificaciones,
        'assets' => [
            'image' => ['filename' => $imagen],
            'pdf' => ['filename' => $pdf]
        ]
    ];
}

echo "✓ Productos parseados: " . count($products) . "\n\n";

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "FASE 2: IMPORTAR PRODUCTOS\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

$stats = [
    'total' => count($products),
    'success' => 0,
    'errors' => 0,
    'images' => 0,
    'pdfs' => 0,
    'sin_imagen' => 0,
    'sin_pdf' => 0,
];

$start_time = time();

foreach ($products as $idx => $product) {
    $num = $idx + 1;
    $codigo = $product['codigo'];
    $nombre = $product['name'];
    $categoria = $product['category'];

    echo "\n[{$num}/{$stats['total']}] {$codigo} - {$nombre}\n";
    echo "   Categoría: {$categoria}\n";

    // Create WordPress post
    $post_data = [
        'post_title' => $nombre,
        'post_content' => $product['description'] ?? '',
        'post_excerpt' => mb_substr($product['description'] ?? '', 0, 150),
        'post_status' => 'publish',
        'post_type' => 'productos',
        'post_author' => 1,
    ];

    $post_id = wp_insert_post($post_data);

    if (is_wp_error($post_id)) {
        echo "   ❌ Error: " . $post_id->get_error_message() . "\n";
        $stats['errors']++;
        continue;
    }

    echo "   ✓ Post creado (ID: {$post_id})\n";

    // Upload image
    $image_filename = $product['assets']['image']['filename'] ?? null;
    if ($image_filename) {
        $image_path = $images_dir . $image_filename;
        if (file_exists($image_path)) {
            $image_id = upload_media_file($image_path, $post_id, 'image');
            if ($image_id) {
                set_post_thumbnail($post_id, $image_id);
                echo "   ✓ Imagen: {$image_filename}\n";
                $stats['images']++;
            }
        } else {
            echo "   ⚠️  Imagen no existe: {$image_filename}\n";
            $stats['sin_imagen']++;
        }
    } else {
        echo "   ⚠️  Sin imagen definida en TS\n";
        $stats['sin_imagen']++;
    }

    // Upload PDF
    $pdf_filename = $product['assets']['pdf']['filename'] ?? null;
    if ($pdf_filename) {
        $pdf_path = $pdfs_dir . $pdf_filename;
        if (file_exists($pdf_path)) {
            $pdf_id = upload_media_file($pdf_path, $post_id, 'pdf');
            if ($pdf_id) {
                echo "   ✓ PDF: {$pdf_filename}\n";
                $stats['pdfs']++;
            }
        } else {
            echo "   ⚠️  PDF no existe: {$pdf_filename}\n";
            $stats['sin_pdf']++;
        }
    } else {
        $stats['sin_pdf']++;
    }

    // Set ACF fields
    $acf_data = [
        'codigo' => $codigo,
        'descripcion' => $product['description'] ?? '',
        'categoria' => map_category($categoria),
        'subcategoria' => $product['subcategory'] ?? '',
    ];

    // Benefits
    if (!empty($product['benefits']) && is_array($product['benefits'])) {
        $acf_data['beneficios'] = implode("\n", $product['benefits']);
    }

    // Presentation
    if (!empty($product['presentation']) && is_array($product['presentation'])) {
        $acf_data['presentacion'] = implode("\n", $product['presentation']);
    }

    // Specifications (repeater field)
    if (!empty($product['specifications']) && is_array($product['specifications'])) {
        $specs = [];
        foreach ($product['specifications'] as $spec) {
            $specs[] = [
                'clave' => $spec['key'] ?? '',
                'valor' => $spec['value'] ?? ''
            ];
        }
        $acf_data['especificaciones'] = $specs;
    }

    // Set PDF field if uploaded
    if (isset($pdf_id)) {
        $acf_data['pdf'] = $pdf_id;
    }

    // Update all ACF fields
    foreach ($acf_data as $field_name => $field_value) {
        update_field($field_name, $field_value, $post_id);
    }

    echo "   ✓ Campos ACF guardados\n";

    $stats['success']++;

    // Flush every 10 products
    if ($num % 10 == 0) {
        flush();
    }
}

$elapsed = time() - $start_time;

echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "RESUMEN FINAL\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

echo "📊 Total en TypeScript:    {$stats['total']}\n";
echo "✅ Importados exitosos:    {$stats['success']}\n";
echo "❌ Errores:                {$stats['errors']}\n";
echo "🖼️  Imágenes subidas:       {$stats['images']}\n";
echo "📄 PDFs subidos:           {$stats['pdfs']}\n";
echo "⚠️  Sin imagen:            {$stats['sin_imagen']}\n";
echo "⚠️  Sin PDF:               {$stats['sin_pdf']}\n";
echo "⏱️  Tiempo total:           {$elapsed} segundos\n\n";

$success_rate = round(($stats['success'] / $stats['total']) * 100, 1);
$images_rate = round(($stats['images'] / $stats['total']) * 100, 1);

echo "📈 Tasa de éxito: {$success_rate}%\n";
echo "📈 Cobertura imágenes: {$images_rate}%\n\n";

echo "🔗 Ver productos: http://localhost:8000/wp-admin/edit.php?post_type=productos\n";
echo "🔗 Auditar: http://localhost:8000/audit-productos-completo.php\n";
echo "🔗 REST API: http://localhost:8000/index.php?rest_route=/wp/v2/productos\n\n";

echo "</pre></body></html>";

/**
 * Upload media file to WordPress
 */
function upload_media_file($file_path, $post_id, $type = 'image') {
    if (!file_exists($file_path)) return false;

    $file_name = basename($file_path);
    $file_type = wp_check_filetype($file_name);
    $upload_dir = wp_upload_dir();
    $dest_path = $upload_dir['path'] . '/' . $file_name;

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
function map_category($category) {
    $map = [
        'aditivos' => 'aditivos',
        'alimentos' => 'alimentos',
        'equipos' => 'equipos',
        'probioticos' => 'probioticos',
        'quimicos' => 'quimicos',
    ];

    $lower = strtolower(trim($category));
    return $map[$lower] ?? 'aditivos';
}
