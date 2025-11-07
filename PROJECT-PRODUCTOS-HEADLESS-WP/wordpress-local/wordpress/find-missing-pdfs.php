<?php
/**
 * Encuentra productos sin PDF asignado
 *
 * http://localhost:8000/find-missing-pdfs.php
 */

require_once __DIR__ . '/wp-load.php';

echo "<!DOCTYPE html>\n<html><head><meta charset='UTF-8'></head><body>\n";
echo "<h1>🔍 PRODUCTOS SIN PDF</h1>\n";
echo "<pre style='background:#000;color:#0f0;padding:20px;font-family:monospace'>\n\n";

$ts_file = '/Users/carlosjperez/Documents/GitHub/PRILABSA-WEBSITE-2025-PROD-BACKEND-WORDPRESS-CMS/src/data/products/julio-2025.ts';
$pdfs_dir = '/Users/carlosjperez/Documents/GitHub/PRILABSA-WEBSITE-2025-PROD-BACKEND-WORDPRESS-CMS/public/assets/pdfs/productos/';

// Parse TypeScript to get expected PDFs
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "FASE 1: PARSEAR TYPESCRIPT PARA PDFs\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

$ts_content = file_get_contents($ts_file);

// Extract products with their PDF info
$products = [];
$pattern = '/\{\s*"id":\s*"([^"]+)".*?"codigo":\s*"([^"]+)".*?"name":\s*"([^"]+)"/s';
preg_match_all($pattern, $ts_content, $matches, PREG_SET_ORDER);

foreach ($matches as $match) {
    $id = $match[1];
    $codigo = $match[2];
    $nombre = $match[3];

    // Find PDF filename for this product
    $pdf = '';
    if (preg_match('/"id":\s*"' . preg_quote($id) . '".*?"pdf":\s*\{[^}]*"filename":\s*"([^"]*)"/s', $ts_content, $pdf_match)) {
        $pdf = $pdf_match[1];
    }

    $products[$codigo] = [
        'id' => $id,
        'codigo' => $codigo,
        'nombre' => $nombre,
        'pdf_esperado' => $pdf
    ];
}

echo "✓ Productos parseados: " . count($products) . "\n\n";

// Get WordPress products
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "FASE 2: VERIFICAR PDFs EN WORDPRESS\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

$wp_products = get_posts([
    'post_type' => 'productos',
    'post_status' => 'publish',
    'numberposts' => -1,
    'orderby' => 'meta_value',
    'meta_key' => 'codigo',
    'order' => 'ASC'
]);

$missing_pdfs = [];
$pdfs_ok = 0;
$pdf_field_empty = 0;
$pdf_file_missing = 0;

foreach ($wp_products as $product) {
    $post_id = $product->ID;
    $codigo = get_field('codigo', $post_id);
    $nombre = $product->post_title;

    // Get PDF field from ACF
    $pdf_id = get_field('pdf', $post_id);

    $expected_pdf = isset($products[$codigo]) ? $products[$codigo]['pdf_esperado'] : null;

    if (!$pdf_id) {
        // No PDF assigned in WordPress
        $pdf_field_empty++;

        // Check if PDF file exists in filesystem
        if ($expected_pdf) {
            $pdf_path = $pdfs_dir . $expected_pdf;
            $exists = file_exists($pdf_path);

            $missing_pdfs[] = [
                'codigo' => $codigo,
                'nombre' => $nombre,
                'pdf_esperado' => $expected_pdf,
                'archivo_existe' => $exists,
                'path' => $pdf_path,
                'post_id' => $post_id
            ];

            if (!$exists) {
                $pdf_file_missing++;
            }
        } else {
            $missing_pdfs[] = [
                'codigo' => $codigo,
                'nombre' => $nombre,
                'pdf_esperado' => 'No definido en TS',
                'archivo_existe' => false,
                'path' => null,
                'post_id' => $post_id
            ];
        }
    } else {
        $pdfs_ok++;
    }
}

echo "📊 ESTADÍSTICAS:\n";
echo "─────────────────\n";
echo "Total productos:           " . count($wp_products) . "\n";
echo "✅ Con PDF asignado:       $pdfs_ok\n";
echo "❌ Sin PDF asignado:       $pdf_field_empty\n";
echo "⚠️  Archivo no existe:     $pdf_file_missing\n\n";

if (!empty($missing_pdfs)) {
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    echo "PRODUCTOS SIN PDF (" . count($missing_pdfs) . ")\n";
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

    foreach ($missing_pdfs as $idx => $item) {
        $num = $idx + 1;
        echo "{$num}. [{$item['codigo']}] {$item['nombre']}\n";
        echo "   PDF esperado: {$item['pdf_esperado']}\n";

        if ($item['archivo_existe']) {
            echo "   ✓ Archivo SÍ existe en: {$item['path']}\n";
        } else {
            if ($item['path']) {
                echo "   ✗ Archivo NO existe en: {$item['path']}\n";
            } else {
                echo "   ⚠️  Sin ruta (no definido en TS)\n";
            }
        }
        echo "\n";
    }
}

// Search for PDFs in filesystem that might match
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "FASE 3: BUSCAR PDFs EN FILESYSTEM\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

$all_pdfs = glob($pdfs_dir . '*.pdf');
echo "Total PDFs en directorio: " . count($all_pdfs) . "\n\n";

if (!empty($missing_pdfs)) {
    echo "Buscando coincidencias...\n\n";

    foreach ($missing_pdfs as $item) {
        if (!$item['archivo_existe'] && $item['codigo'] !== 'No definido en TS') {
            $codigo = $item['codigo'];

            // Search for files that contain the codigo
            $found = array_filter($all_pdfs, function($file) use ($codigo) {
                return stripos(basename($file), $codigo) !== false;
            });

            if (!empty($found)) {
                echo "🔍 Posibles coincidencias para {$codigo}:\n";
                foreach ($found as $f) {
                    echo "   - " . basename($f) . "\n";
                }
                echo "\n";
            }
        }
    }
}

echo "</pre></body></html>";
