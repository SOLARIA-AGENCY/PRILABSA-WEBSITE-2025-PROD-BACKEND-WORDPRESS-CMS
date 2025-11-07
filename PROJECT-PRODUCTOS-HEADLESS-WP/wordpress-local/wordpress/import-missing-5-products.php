<?php
/**
 * Importar 5 productos faltantes (EQ044-EQ048)
 * http://localhost:8000/import-missing-5-products.php
 */

require_once __DIR__ . '/wp-load.php';

echo "<h1>Importar 5 Productos Faltantes</h1>\n<pre>\n";

$images_dir = '/Users/carlosjperez/Documents/GitHub/PRILABSA-WEBSITE-2025-PROD-BACKEND-WORDPRESS-CMS/public/assets/images/productos/';
$pdfs_dir = '/Users/carlosjperez/Documents/GitHub/PRILABSA-WEBSITE-2025-PROD-BACKEND-WORDPRESS-CMS/public/assets/pdfs/productos/';

$products = [
    [
        'codigo' => 'EQ044',
        'nombre' => 'Smart Spectro',
        'descripcion' => 'Un espectrofotómetro fácil de usar y preciso. Con selección automática de longitudes de onda, pruebas preprogramadas y un rendimiento superior.',
        'categoria' => 'equipos',
        'subcategoria' => 'Espectrofotómetros',
        'beneficios' => "Fácil de usar\nPreciso y confiable\nPruebas preprogramadas\nRendimiento superior",
        'presentacion' => 'Unidad completa con accesorios',
        'imagen' => 'EQ044_Smart_Spectro.png',
        'pdf' => 'EQ044_Smart_Spectro.pdf',
    ],
    [
        'codigo' => 'EQ045',
        'nombre' => 'Termómetro',
        'descripcion' => 'Termómetro digital de alta precisión para medición de temperatura en acuicultura.',
        'categoria' => 'equipos',
        'subcategoria' => 'Instrumentos de medición',
        'beneficios' => "Alta precisión\nLectura digital clara\nRápida respuesta\nResistente al agua",
        'presentacion' => 'Unidad individual',
        'imagen' => 'EQ045_TERMOMETRO.PNG',
        'pdf' => 'EQ045_Termometro.pdf',
    ],
    [
        'codigo' => 'EQ046',
        'nombre' => 'Tirillas pH',
        'descripcion' => 'Tirillas para medición rápida de pH en agua. Ideales para monitoreo continuo de parámetros de agua en acuicultura.',
        'categoria' => 'equipos',
        'subcategoria' => 'Kits de análisis',
        'beneficios' => "Medición rápida\nFácil de usar\nEconómicas\nResultados instantáneos",
        'presentacion' => 'Caja con 100 tirillas',
        'imagen' => 'EQ046_Tirillas_pH.png',
        'pdf' => 'EQ046_Tirillas_pH.pdf',
    ],
    [
        'codigo' => 'EQ047',
        'nombre' => 'Tubos API',
        'descripcion' => 'Tubos de ensayo para análisis de parámetros de agua mediante método API. Sistema completo para análisis de calidad de agua.',
        'categoria' => 'equipos',
        'subcategoria' => 'Kits de análisis',
        'beneficios' => "Sistema completo de análisis\nMétodo API reconocido\nResultados confiables\nFácil interpretación",
        'presentacion' => 'Kit completo con reactivos',
        'imagen' => 'EQ047_Tubos_API.png',
        'pdf' => 'EQ047_Tubos_API.pdf',
    ],
    [
        'codigo' => 'EQ048',
        'nombre' => 'Waterlink Spin Touch',
        'descripcion' => 'Analizador digital de agua de última generación con pantalla táctil. Proporciona resultados precisos en segundos para múltiples parámetros de calidad de agua.',
        'categoria' => 'equipos',
        'subcategoria' => 'Analizadores digitales',
        'beneficios' => "Pantalla táctil intuitiva\nResultados en segundos\nMulti-parámetro\nAlta precisión\nMemoria de resultados",
        'presentacion' => 'Equipo completo con discos de análisis',
        'imagen' => 'EQ048_Waterlink_Spin_Touch.png',
        'pdf' => 'EQ048_Waterlink_Spin_Touch.pdf',
    ],
];

$stats = ['success' => 0, 'errors' => 0, 'images' => 0, 'pdfs' => 0];

foreach ($products as $product) {
    echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    echo "Importando: {$product['codigo']} - {$product['nombre']}\n";

    // Check if exists
    $existing = get_posts([
        'post_type' => 'productos',
        'meta_key' => 'codigo',
        'meta_value' => $product['codigo'],
        'post_status' => 'any',
        'numberposts' => 1
    ]);

    if (!empty($existing)) {
        echo "⚠️  Ya existe (ID: {$existing[0]->ID})\n";
        continue;
    }

    // Create post
    $post_data = [
        'post_title' => $product['nombre'],
        'post_content' => $product['descripcion'],
        'post_status' => 'publish',
        'post_type' => 'productos',
        'post_author' => 1,
    ];

    $post_id = wp_insert_post($post_data);

    if (is_wp_error($post_id)) {
        echo "❌ Error: " . $post_id->get_error_message() . "\n";
        $stats['errors']++;
        continue;
    }

    echo "✓ Post creado (ID: {$post_id})\n";

    // Upload image
    $image_path = $images_dir . $product['imagen'];
    if (file_exists($image_path)) {
        $image_id = upload_media_file($image_path, $post_id, 'image');
        if ($image_id) {
            set_post_thumbnail($post_id, $image_id);
            echo "✓ Imagen: {$product['imagen']} (ID: {$image_id})\n";
            $stats['images']++;
        }
    } else {
        echo "⚠️  Imagen no encontrada: {$product['imagen']}\n";
    }

    // Upload PDF
    $pdf_path = $pdfs_dir . $product['pdf'];
    if (file_exists($pdf_path)) {
        $pdf_id = upload_media_file($pdf_path, $post_id, 'pdf');
        if ($pdf_id) {
            echo "✓ PDF: {$product['pdf']} (ID: {$pdf_id})\n";
            $stats['pdfs']++;
        }
    } else {
        echo "⚠️  PDF no encontrado: {$product['pdf']}\n";
    }

    // Set ACF fields
    $acf_data = [
        'codigo' => $product['codigo'],
        'descripcion' => $product['descripcion'],
        'beneficios' => $product['beneficios'],
        'presentacion' => $product['presentacion'],
        'categoria' => $product['categoria'],
        'subcategoria' => $product['subcategoria'],
    ];

    if (isset($pdf_id)) {
        $acf_data['pdf'] = $pdf_id;
    }

    foreach ($acf_data as $field_name => $field_value) {
        update_field($field_name, $field_value, $post_id);
    }

    echo "✓ Campos ACF actualizados\n";
    $stats['success']++;
}

echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "RESUMEN:\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "✅ Importados: {$stats['success']}/5\n";
echo "❌ Errores: {$stats['errors']}\n";
echo "🖼️  Imágenes: {$stats['images']}/5\n";
echo "📄 PDFs: {$stats['pdfs']}/5\n\n";

echo "🔗 Ver productos: http://localhost:8000/wp-admin/edit.php?post_type=productos\n";
echo "🔗 REST API: http://localhost:8000/index.php?rest_route=/wp/v2/productos\n";

echo "</pre>";

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
