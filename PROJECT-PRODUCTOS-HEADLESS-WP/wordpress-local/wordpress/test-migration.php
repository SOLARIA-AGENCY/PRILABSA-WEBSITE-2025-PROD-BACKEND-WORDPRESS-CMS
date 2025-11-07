<?php
/**
 * TESTS DE VALIDACIÓN - MIGRACIÓN COMPLETA
 *
 * Suite de tests automatizados para verificar la integridad
 * de la migración de 105 productos a WordPress
 *
 * http://localhost:8000/test-migration.php
 */

require_once __DIR__ . '/wp-load.php';

set_time_limit(300);

echo "<!DOCTYPE html>\n<html><head><meta charset='UTF-8'></head><body>\n";
echo "<h1>🧪 TESTS DE VALIDACIÓN - MIGRACIÓN COMPLETA</h1>\n";
echo "<pre style='background:#000;color:#0f0;padding:20px;font-family:monospace'>\n\n";

$ts_file = '/Users/carlosjperez/Documents/GitHub/PRILABSA-WEBSITE-2025-PROD-BACKEND-WORDPRESS-CMS/src/data/products/julio-2025.ts';

$tests_passed = 0;
$tests_failed = 0;
$test_results = [];

/**
 * Helper function to run a test
 */
function run_test($name, $condition, $error_msg = '') {
    global $tests_passed, $tests_failed, $test_results;

    if ($condition) {
        $tests_passed++;
        $test_results[] = ['name' => $name, 'status' => 'PASS', 'error' => null];
        echo "✅ PASS: {$name}\n";
        return true;
    } else {
        $tests_failed++;
        $test_results[] = ['name' => $name, 'status' => 'FAIL', 'error' => $error_msg];
        echo "❌ FAIL: {$name}\n";
        if ($error_msg) {
            echo "   Error: {$error_msg}\n";
        }
        return false;
    }
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "SUITE 1: TESTS DE CONTEO Y EXISTENCIA\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

// Test 1: Total de productos debe ser 105
$total_products = wp_count_posts('productos')->publish;
run_test(
    "Total de productos = 105",
    $total_products === 105,
    "Expected 105, got {$total_products}"
);

// Test 2: Archivo TypeScript existe y es legible
run_test(
    "Archivo TypeScript julio-2025.ts existe",
    file_exists($ts_file),
    "File not found: {$ts_file}"
);

// Test 3: Post type 'productos' está registrado
run_test(
    "Custom Post Type 'productos' está registrado",
    post_type_exists('productos'),
    "Post type not registered"
);

echo "\n";

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "SUITE 2: TESTS DE CAMPOS ACF\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

$products = get_posts([
    'post_type' => 'productos',
    'post_status' => 'publish',
    'numberposts' => -1
]);

// Test 4: Todos los productos tienen campo 'codigo'
$missing_codigo = [];
foreach ($products as $p) {
    $codigo = get_field('codigo', $p->ID);
    if (empty($codigo)) {
        $missing_codigo[] = $p->ID;
    }
}
run_test(
    "Todos los productos tienen campo 'codigo'",
    count($missing_codigo) === 0,
    "Products without codigo: " . implode(', ', $missing_codigo)
);

// Test 5: Todos los productos tienen campo 'descripcion'
$missing_description = [];
foreach ($products as $p) {
    $desc = get_field('descripcion', $p->ID);
    if (empty($desc)) {
        $missing_description[] = get_field('codigo', $p->ID) ?: $p->ID;
    }
}
run_test(
    "Todos los productos tienen campo 'descripcion'",
    count($missing_description) === 0,
    "Products without description: " . implode(', ', array_slice($missing_description, 0, 5))
);

// Test 6: Todos los productos tienen campo 'categoria'
$missing_category = [];
foreach ($products as $p) {
    $cat = get_field('categoria', $p->ID);
    if (empty($cat)) {
        $missing_category[] = get_field('codigo', $p->ID) ?: $p->ID;
    }
}
run_test(
    "Todos los productos tienen campo 'categoria'",
    count($missing_category) === 0,
    "Products without category: " . implode(', ', array_slice($missing_category, 0, 5))
);

echo "\n";

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "SUITE 3: TESTS DE IMÁGENES\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

// Test 7: Todos los productos tienen imagen destacada
$missing_images = [];
foreach ($products as $p) {
    $img_id = get_post_thumbnail_id($p->ID);
    if (!$img_id) {
        $missing_images[] = get_field('codigo', $p->ID) ?: $p->ID;
    }
}
run_test(
    "Todos los productos tienen imagen destacada",
    count($missing_images) === 0,
    "Products without image: " . implode(', ', array_slice($missing_images, 0, 5))
);

// Test 8: Todas las imágenes tienen archivo físico
$broken_images = [];
foreach ($products as $p) {
    $img_id = get_post_thumbnail_id($p->ID);
    if ($img_id) {
        $img_path = get_attached_file($img_id);
        if (!file_exists($img_path)) {
            $broken_images[] = get_field('codigo', $p->ID) ?: $p->ID;
        }
    }
}
run_test(
    "Todas las imágenes tienen archivo físico",
    count($broken_images) === 0,
    "Broken images: " . implode(', ', array_slice($broken_images, 0, 5))
);

// Test 9: Cobertura de imágenes >= 95%
$image_coverage = (($total_products - count($missing_images)) / $total_products) * 100;
run_test(
    "Cobertura de imágenes >= 95%",
    $image_coverage >= 95,
    "Coverage: " . round($image_coverage, 1) . "%"
);

echo "\n";

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "SUITE 4: TESTS DE PDFs\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

// Test 10: Todos los productos tienen campo PDF
$missing_pdfs = [];
foreach ($products as $p) {
    $pdf_id = get_field('pdf', $p->ID);
    if (!$pdf_id) {
        $missing_pdfs[] = get_field('codigo', $p->ID) ?: $p->ID;
    }
}
run_test(
    "Todos los productos tienen campo 'pdf'",
    count($missing_pdfs) === 0,
    "Products without PDF: " . implode(', ', array_slice($missing_pdfs, 0, 5))
);

// Test 11: Cobertura de PDFs >= 90%
$pdf_coverage = (($total_products - count($missing_pdfs)) / $total_products) * 100;
run_test(
    "Cobertura de PDFs >= 90%",
    $pdf_coverage >= 90,
    "Coverage: " . round($pdf_coverage, 1) . "%"
);

// Test 12: PDFs tienen MIME type correcto
$invalid_pdf_types = [];
foreach ($products as $p) {
    $pdf_id = get_field('pdf', $p->ID);
    if ($pdf_id) {
        $mime = get_post_mime_type($pdf_id);
        if ($mime !== 'application/pdf') {
            $invalid_pdf_types[] = get_field('codigo', $p->ID) . " ($mime)";
        }
    }
}
run_test(
    "Todos los PDFs tienen MIME type 'application/pdf'",
    count($invalid_pdf_types) === 0,
    "Invalid types: " . implode(', ', array_slice($invalid_pdf_types, 0, 5))
);

echo "\n";

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "SUITE 5: TESTS DE INTEGRIDAD DE DATOS\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

// Test 13: No hay códigos duplicados
$codigos = [];
$duplicates = [];
foreach ($products as $p) {
    $codigo = get_field('codigo', $p->ID);
    if (in_array($codigo, $codigos)) {
        $duplicates[] = $codigo;
    } else {
        $codigos[] = $codigo;
    }
}
run_test(
    "No hay códigos duplicados",
    count($duplicates) === 0,
    "Duplicates: " . implode(', ', $duplicates)
);

// Test 14: Códigos siguen formato correcto (2 letras + 3 dígitos)
$invalid_codes = [];
foreach ($products as $p) {
    $codigo = get_field('codigo', $p->ID);
    if (!preg_match('/^[A-Z]{2}\d{3}$/', $codigo)) {
        $invalid_codes[] = $codigo;
    }
}
run_test(
    "Códigos siguen formato XX000",
    count($invalid_codes) === 0,
    "Invalid codes: " . implode(', ', array_slice($invalid_codes, 0, 5))
);

// Test 15: Distribución de categorías es correcta
$category_counts = [
    'aditivos' => 0,
    'alimentos' => 0,
    'equipos' => 0,
    'probioticos' => 0,
    'quimicos' => 0
];
foreach ($products as $p) {
    $cat = get_field('categoria', $p->ID);
    if (isset($category_counts[$cat])) {
        $category_counts[$cat]++;
    }
}
$expected_counts = [
    'aditivos' => 12,
    'alimentos' => 23,
    'equipos' => 48,
    'probioticos' => 4,
    'quimicos' => 18
];
$categories_ok = true;
$category_errors = [];
foreach ($expected_counts as $cat => $expected) {
    if ($category_counts[$cat] !== $expected) {
        $categories_ok = false;
        $category_errors[] = "$cat: expected $expected, got {$category_counts[$cat]}";
    }
}
run_test(
    "Distribución de categorías correcta",
    $categories_ok,
    implode(', ', $category_errors)
);

echo "\n";

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "SUITE 6: TESTS DE API REST\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

// Test 16: Endpoint /wp/v2/productos responde
$api_url = 'http://localhost:8000/index.php?rest_route=/wp/v2/productos';
$response = @file_get_contents($api_url);
run_test(
    "API endpoint /wp/v2/productos responde",
    $response !== false,
    "Failed to fetch API"
);

// Test 17: API retorna JSON válido
if ($response) {
    $json = json_decode($response);
    run_test(
        "API retorna JSON válido",
        json_last_error() === JSON_ERROR_NONE,
        json_last_error_msg()
    );

    // Test 18: API incluye campos ACF
    if ($json && is_array($json) && count($json) > 0) {
        $first_product = $json[0];
        run_test(
            "API incluye campos ACF",
            isset($first_product->acf),
            "ACF fields not present"
        );

        // Test 19: Campos ACF incluyen 'codigo'
        if (isset($first_product->acf)) {
            run_test(
                "API ACF incluye campo 'codigo'",
                isset($first_product->acf->codigo),
                "codigo field missing"
            );
        }
    }
}

echo "\n";

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "SUITE 7: TESTS DE SAMPLE PRODUCTS\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

// Test 20: Producto AD001 existe y tiene datos correctos
$ad001 = get_posts([
    'post_type' => 'productos',
    'meta_key' => 'codigo',
    'meta_value' => 'AD001',
    'numberposts' => 1
]);
$ad001_ok = false;
if (!empty($ad001)) {
    $p = $ad001[0];
    $ad001_ok = (
        $p->post_title === 'Combacid XL' &&
        get_field('categoria', $p->ID) === 'aditivos' &&
        get_post_thumbnail_id($p->ID) > 0
    );
}
run_test(
    "Producto AD001 (Combacid XL) existe con datos correctos",
    $ad001_ok,
    "Product not found or data incorrect"
);

// Test 21: Producto AL007 existe (uno de los PDFs corregidos)
$al007 = get_posts([
    'post_type' => 'productos',
    'meta_key' => 'codigo',
    'meta_value' => 'AL007',
    'numberposts' => 1
]);
$al007_ok = false;
if (!empty($al007)) {
    $p = $al007[0];
    $pdf = get_field('pdf', $p->ID);
    $al007_ok = ($pdf > 0);
}
run_test(
    "Producto AL007 tiene PDF asignado (corrección aplicada)",
    $al007_ok,
    "PDF missing"
);

// Test 22: Producto EQ043 existe (el que tenía imagen 'mallas' incorrecta)
$eq043 = get_posts([
    'post_type' => 'productos',
    'meta_key' => 'codigo',
    'meta_value' => 'EQ043',
    'numberposts' => 1
]);
$eq043_ok = false;
if (!empty($eq043)) {
    $p = $eq043[0];
    $img_id = get_post_thumbnail_id($p->ID);
    if ($img_id) {
        $img_file = basename(get_attached_file($img_id));
        // Debería ser EQ043_SALINOMETRO_VEE_GEE_STX_3.png
        $eq043_ok = stripos($img_file, 'EQ043') !== false;
    }
}
run_test(
    "Producto EQ043 tiene imagen correcta (corrección de 'mallas')",
    $eq043_ok,
    "Image incorrect or missing"
);

echo "\n";

// RESUMEN FINAL
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "📊 RESUMEN DE TESTS\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

$total_tests = $tests_passed + $tests_failed;
$success_rate = round(($tests_passed / $total_tests) * 100, 1);

echo "Total tests ejecutados:  {$total_tests}\n";
echo "✅ Tests pasados:        {$tests_passed}\n";
echo "❌ Tests fallados:       {$tests_failed}\n\n";

echo "📈 Tasa de éxito: {$success_rate}%\n\n";

if ($tests_failed === 0) {
    echo "🎉 ¡TODOS LOS TESTS PASARON!\n";
    echo "✅ La migración está completa y verificada.\n\n";
} else {
    echo "⚠️  ALGUNOS TESTS FALLARON\n";
    echo "Revisa los errores arriba y corrige antes de integrar con frontend.\n\n";

    echo "Tests fallados:\n";
    foreach ($test_results as $result) {
        if ($result['status'] === 'FAIL') {
            echo "  - {$result['name']}\n";
            if ($result['error']) {
                echo "    Error: {$result['error']}\n";
            }
        }
    }
    echo "\n";
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "🔗 RECURSOS\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

echo "WordPress Admin:  http://localhost:8000/wp-admin/\n";
echo "API Productos:    http://localhost:8000/index.php?rest_route=/wp/v2/productos\n";
echo "Auditoría:        http://localhost:8000/audit-productos-completo.php\n";
echo "Documentación:    PROJECT-PRODUCTOS-HEADLESS-WP/MIGRATION-COMPLETE.md\n\n";

echo "</pre></body></html>";
