<?php
/**
 * Script to create a test product programmatically
 * Run from browser: http://localhost:8000/create-test-product.php
 */

// Load WordPress environment
require_once __DIR__ . '/wp-load.php';

// Prevent running in production
if (defined('WP_ENV') && WP_ENV === 'production') {
    die('This script cannot run in production');
}

echo "<h1>PRILABSA - Crear Producto de Prueba</h1>\n";
echo "<pre>\n";

// Test product data
$product_data = [
    'post_title'   => 'Producto de Prueba - Reactivo Analítico Premium',
    'post_content' => 'Este es un producto de prueba creado automáticamente para verificar el funcionamiento del sistema PRILABSA con todos los campos ACF correctamente configurados.',
    'post_status'  => 'publish',
    'post_type'    => 'productos',
    'post_author'  => 1,
];

echo "📦 Creando producto de prueba...\n\n";

// Create the product
$product_id = wp_insert_post($product_data);

if (is_wp_error($product_id)) {
    echo "❌ ERROR: " . $product_id->get_error_message() . "\n";
    exit;
}

echo "✓ Producto creado con ID: {$product_id}\n\n";

// Update ACF fields with CORRECT field names from prilabsa-acf-config.php
$acf_fields = [
    'codigo'              => 'TEST-002',
    'descripcion'         => '<h2>Descripción del Producto</h2><p>Reactivo químico de alta pureza para uso en laboratorio. Cumple con estándares internacionales de calidad ISO 9001.</p><p><strong>Características principales:</strong></p><ul><li>Alta pureza (99.9%)</li><li>Certificado de análisis incluido</li><li>Almacenamiento a temperatura ambiente</li></ul>',
    'beneficios'          => "- Mejora la precisión de los análisis\n- Reduce el tiempo de procesamiento\n- Compatible con equipos estándar\n- Excelente relación costo-beneficio",
    'presentacion'        => 'Envase de vidrio ámbar de 500ml\nCaja con 12 unidades disponible',
    'categoria'           => 'quimicos',
    'subcategoria'        => 'Reactivos Analíticos',
    'especificaciones'    => [
        ['clave' => 'Pureza', 'valor' => '99.9%'],
        ['clave' => 'Peso Molecular', 'valor' => '180.16 g/mol'],
        ['clave' => 'Punto de Fusión', 'valor' => '156-158°C'],
        ['clave' => 'Densidad', 'valor' => '1.54 g/cm³'],
    ],
];

echo "📝 Actualizando campos ACF...\n\n";

foreach ($acf_fields as $field_name => $field_value) {
    $result = update_field($field_name, $field_value, $product_id);

    if ($result) {
        echo "  ✓ {$field_name}: {$field_value}\n";
    } else {
        echo "  ⚠ {$field_name}: Error al actualizar\n";
    }
}

echo "\n✅ PRODUCTO CREADO EXITOSAMENTE\n\n";

// Verification
echo "🔍 VERIFICACIÓN:\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

$product = get_post($product_id);
echo "Título: " . $product->post_title . "\n";
echo "Estado: " . $product->post_status . "\n";
echo "Tipo: " . $product->post_type . "\n";
echo "URL wp-admin: http://localhost:8000/wp-admin/post.php?post={$product_id}&action=edit\n\n";

echo "Campos ACF verificados:\n";
foreach ($acf_fields as $field_name => $expected_value) {
    $actual_value = get_field($field_name, $product_id);
    $match = ($actual_value == $expected_value) ? '✓' : '✗';
    echo "  {$match} {$field_name}: {$actual_value}\n";
}

echo "\n🌐 REST API Endpoints:\n";
echo "  - Todos los productos: http://localhost:8000/wp-json/wp/v2/productos\n";
echo "  - Este producto: http://localhost:8000/wp-json/wp/v2/productos/{$product_id}\n";
echo "  - Custom endpoint: http://localhost:8000/wp-json/prilabsa/v1/productos\n";

echo "\n</pre>\n";
echo "<p><a href='http://localhost:8000/wp-admin/edit.php?post_type=productos'>← Ver todos los productos en wp-admin</a></p>\n";
