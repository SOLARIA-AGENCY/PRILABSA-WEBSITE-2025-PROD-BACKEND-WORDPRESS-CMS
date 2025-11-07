<?php
/**
 * AUDITORÍA COMPLETA - Productos, Imágenes y Datos
 *
 * Compara WordPress vs TypeScript original
 * Identifica imágenes incorrectas, faltantes o mal asignadas
 *
 * http://localhost:8000/audit-productos-completo.php
 */

require_once __DIR__ . '/wp-load.php';

set_time_limit(300);

echo "<!DOCTYPE html>\n<html><head><meta charset='UTF-8'><style>
body { font-family: monospace; background: #000; color: #0f0; padding: 20px; }
h1 { color: #0ff; }
h2 { color: #ff0; border-top: 2px solid #ff0; margin-top: 30px; padding-top: 10px; }
.error { color: #f00; font-weight: bold; }
.warning { color: #fa0; }
.success { color: #0f0; }
table { border-collapse: collapse; width: 100%; margin: 20px 0; }
th, td { border: 1px solid #0f0; padding: 8px; text-align: left; }
th { background: #030; color: #0ff; }
tr:nth-child(even) { background: #010; }
</style></head><body>\n";

echo "<h1>🔍 AUDITORÍA COMPLETA - PRILABSA PRODUCTOS</h1>\n";
echo "<pre>\n";

$ts_file = '/Users/carlosjperez/Documents/GitHub/PRILABSA-WEBSITE-2025-PROD-BACKEND-WORDPRESS-CMS/src/data/products/julio-2025.ts';
$images_dir = '/Users/carlosjperez/Documents/GitHub/PRILABSA-WEBSITE-2025-PROD-BACKEND-WORDPRESS-CMS/public/assets/images/productos/';

// Parse TypeScript file to extract product data
echo "📋 Parseando datos originales de TypeScript...\n\n";
$ts_content = file_get_contents($ts_file);

// Use same parsing logic as import script
$pattern = '/\{\s*"id":\s*"([^"]+)".*?"codigo":\s*"([^"]+)".*?"name":\s*"([^"]+)".*?"image":\s*\{[^}]*"filename":\s*"([^"]*)"/s';
preg_match_all($pattern, $ts_content, $matches, PREG_SET_ORDER);

$ts_products = [];
foreach ($matches as $match) {
    $id = $match[1];
    $codigo = $match[2];
    $name = $match[3];
    $image_filename = $match[4];

    $ts_products[$codigo] = [
        'id' => $id,
        'name' => $name,
        'expected_image' => $image_filename ?: null,
    ];
}

echo "✓ Productos en TypeScript: " . count($ts_products) . "\n\n";

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

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

// Statistics
$stats = [
    'total' => count($wp_products),
    'sin_imagen' => 0,
    'imagen_incorrecta' => 0,
    'imagen_correcta' => 0,
    'no_en_ts' => 0,
    'imagen_no_existe' => 0,
];

$issues = [];

echo "</pre>\n";
echo "<h2>📊 ANÁLISIS DETALLADO POR PRODUCTO</h2>\n";
echo "<table>\n";
echo "<tr><th>#</th><th>Código</th><th>Nombre WP</th><th>Imagen Asignada</th><th>Imagen Esperada (TS)</th><th>Estado</th></tr>\n";

$counter = 1;
foreach ($wp_products as $product) {
    $post_id = $product->ID;
    $codigo = get_field('codigo', $post_id);
    $titulo_wp = $product->post_title;

    // Get assigned image
    $thumbnail_id = get_post_thumbnail_id($post_id);
    $imagen_asignada = null;
    if ($thumbnail_id) {
        $imagen_path = get_attached_file($thumbnail_id);
        $imagen_asignada = basename($imagen_path);
    }

    // Get expected image from TypeScript
    $imagen_esperada = null;
    $nombre_ts = null;
    if (isset($ts_products[$codigo])) {
        $imagen_esperada = $ts_products[$codigo]['expected_image'];
        $nombre_ts = $ts_products[$codigo]['name'];
    } else {
        $stats['no_en_ts']++;
    }

    // Determine status
    $status = '';
    $status_class = 'success';

    if (!$imagen_asignada) {
        $status = '❌ SIN IMAGEN';
        $status_class = 'error';
        $stats['sin_imagen']++;
        $issues[] = [
            'codigo' => $codigo,
            'titulo' => $titulo_wp,
            'issue' => 'Sin imagen asignada',
            'expected' => $imagen_esperada
        ];
    } elseif ($imagen_esperada && $imagen_asignada !== $imagen_esperada) {
        // Check if it's a case-sensitivity issue or extension difference
        $base_asignada = strtolower(pathinfo($imagen_asignada, PATHINFO_FILENAME));
        $base_esperada = strtolower(pathinfo($imagen_esperada, PATHINFO_FILENAME));

        if ($base_asignada === $base_esperada) {
            $status = '⚠️  DIFERENCIA MENOR (ext/case)';
            $status_class = 'warning';
        } else {
            $status = '🔴 IMAGEN INCORRECTA';
            $status_class = 'error';
            $stats['imagen_incorrecta']++;
            $issues[] = [
                'codigo' => $codigo,
                'titulo' => $titulo_wp,
                'issue' => "Imagen incorrecta: tiene '{$imagen_asignada}', esperada '{$imagen_esperada}'",
                'expected' => $imagen_esperada,
                'current' => $imagen_asignada
            ];
        }
    } else {
        $status = '✅ OK';
        $stats['imagen_correcta']++;
    }

    // Check if image file exists
    if ($imagen_esperada) {
        $expected_path = $images_dir . $imagen_esperada;
        if (!file_exists($expected_path)) {
            $status .= ' (⚠️  archivo no existe)';
            $stats['imagen_no_existe']++;
        }
    }

    echo "<tr>";
    echo "<td>{$counter}</td>";
    echo "<td><strong>{$codigo}</strong></td>";
    echo "<td>{$titulo_wp}</td>";
    echo "<td>" . ($imagen_asignada ?: '<em>ninguna</em>') . "</td>";
    echo "<td>" . ($imagen_esperada ?: '<em>no en TS</em>') . "</td>";
    echo "<td class='{$status_class}'>{$status}</td>";
    echo "</tr>\n";

    $counter++;
}

echo "</table>\n";

echo "<pre>\n";
echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "📊 RESUMEN ESTADÍSTICO\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

echo "Total productos WordPress:    {$stats['total']}\n";
echo "Total productos TypeScript:   " . count($ts_products) . "\n\n";

echo "✅ Imágenes correctas:         {$stats['imagen_correcta']}\n";
echo "🔴 Imágenes INCORRECTAS:       {$stats['imagen_incorrecta']}\n";
echo "❌ Sin imagen asignada:        {$stats['sin_imagen']}\n";
echo "⚠️  Archivo imagen no existe:  {$stats['imagen_no_existe']}\n";
echo "⚠️  Producto no en TypeScript: {$stats['no_en_ts']}\n\n";

$porcentaje_ok = round(($stats['imagen_correcta'] / $stats['total']) * 100, 1);
echo "📈 Porcentaje correcto: {$porcentaje_ok}%\n\n";

if (!empty($issues)) {
    echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    echo "🔴 PROBLEMAS CRÍTICOS DETECTADOS ({count($issues)})\n";
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

    foreach ($issues as $idx => $issue) {
        $num = $idx + 1;
        echo "{$num}. [{$issue['codigo']}] {$issue['titulo']}\n";
        echo "   Issue: {$issue['issue']}\n";
        if (isset($issue['current'])) {
            echo "   Actual: {$issue['current']}\n";
        }
        if (isset($issue['expected'])) {
            echo "   Esperado: {$issue['expected']}\n";
        }
        echo "\n";
    }
}

echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "🔧 RECOMENDACIONES\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

if ($stats['imagen_incorrecta'] > 0) {
    echo "1. Ejecutar script de corrección de imágenes\n";
    echo "   → fix-incorrect-images.php\n\n";
}

if ($stats['sin_imagen'] > 0) {
    echo "2. Asignar imágenes faltantes\n";
    echo "   → upload-missing-images.php\n\n";
}

if ($stats['imagen_no_existe'] > 0) {
    echo "3. Verificar archivos de imágenes en el directorio\n";
    echo "   → {$images_dir}\n\n";
}

echo "</pre>\n";
echo "</body></html>";
