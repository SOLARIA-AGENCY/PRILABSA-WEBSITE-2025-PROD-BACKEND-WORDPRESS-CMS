<?php
/**
 * Crear Categorías de Productos en WordPress
 *
 * Crea las 5 categorías principales y las asocia a productos
 * basándose en el campo ACF 'categoria'
 */

// Cargar WordPress
require_once(__DIR__ . '/wp-load.php');

echo "🏷️  CREACIÓN DE CATEGORÍAS DE PRODUCTOS\n";
echo str_repeat("━", 60) . "\n\n";

// Categorías a crear (basadas en campo ACF 'categoria')
$categorias = [
    'aditivos' => [
        'name' => 'Aditivos',
        'slug' => 'aditivos',
        'description' => 'Aditivos y suplementos para acuicultura'
    ],
    'alimentos' => [
        'name' => 'Alimentos',
        'slug' => 'alimentos',
        'description' => 'Alimentos balanceados y especializados para acuicultura'
    ],
    'equipos' => [
        'name' => 'Equipos',
        'slug' => 'equipos',
        'description' => 'Equipos y herramientas para acuicultura'
    ],
    'probioticos' => [
        'name' => 'Probióticos',
        'slug' => 'probioticos',
        'description' => 'Probióticos y bioremediadores para acuicultura'
    ],
    'quimicos' => [
        'name' => 'Químicos',
        'slug' => 'quimicos',
        'description' => 'Productos químicos para tratamiento de agua y acuicultura'
    ]
];

echo "📝 PASO 1: Crear categorías en WordPress\n";
echo str_repeat("-", 60) . "\n";

$created_categories = [];

foreach ($categorias as $slug => $data) {
    // Verificar si ya existe
    $existing_term = term_exists($data['name'], 'categorias_productos');

    if ($existing_term) {
        $term_id = $existing_term['term_id'];
        echo "⚠️  Categoría '{$data['name']}' ya existe (ID: {$term_id})\n";
        $created_categories[$slug] = $term_id;
    } else {
        // Crear categoría
        $result = wp_insert_term(
            $data['name'],
            'categorias_productos',
            [
                'slug' => $data['slug'],
                'description' => $data['description']
            ]
        );

        if (is_wp_error($result)) {
            echo "❌ Error creando '{$data['name']}': " . $result->get_error_message() . "\n";
        } else {
            $term_id = $result['term_id'];
            echo "✅ Categoría '{$data['name']}' creada (ID: {$term_id})\n";
            $created_categories[$slug] = $term_id;
        }
    }
}

echo "\n📊 Categorías creadas: " . count($created_categories) . "/5\n\n";

// PASO 2: Asociar productos a categorías
echo "🔗 PASO 2: Asociar productos a categorías\n";
echo str_repeat("-", 60) . "\n";

$args = [
    'post_type' => 'productos',
    'posts_per_page' => 500,
    'post_status' => 'publish'
];

$productos = get_posts($args);
$stats = [
    'total' => count($productos),
    'asociados' => 0,
    'sin_categoria' => 0,
    'errores' => 0,
    'por_categoria' => []
];

foreach ($productos as $producto) {
    $categoria_acf = get_field('categoria', $producto->ID);

    if (!$categoria_acf) {
        $stats['sin_categoria']++;
        echo "⚠️  Producto {$producto->ID} sin categoría ACF\n";
        continue;
    }

    // Verificar que la categoría existe en nuestro mapeo
    if (!isset($created_categories[$categoria_acf])) {
        $stats['errores']++;
        echo "❌ Categoría ACF '{$categoria_acf}' no reconocida para producto {$producto->ID}\n";
        continue;
    }

    $term_id = $created_categories[$categoria_acf];

    // Asociar producto a categoría
    $result = wp_set_object_terms($producto->ID, $term_id, 'categorias_productos');

    if (is_wp_error($result)) {
        $stats['errores']++;
        echo "❌ Error asociando producto {$producto->ID}: " . $result->get_error_message() . "\n";
    } else {
        $stats['asociados']++;

        // Incrementar contador por categoría
        if (!isset($stats['por_categoria'][$categoria_acf])) {
            $stats['por_categoria'][$categoria_acf] = 0;
        }
        $stats['por_categoria'][$categoria_acf]++;
    }
}

echo "\n" . str_repeat("━", 60) . "\n";
echo "📊 RESUMEN DE ASOCIACIÓN\n";
echo str_repeat("━", 60) . "\n\n";

echo "Total productos procesados: {$stats['total']}\n";
echo "✅ Productos asociados:     {$stats['asociados']}\n";
echo "⚠️  Sin categoría ACF:      {$stats['sin_categoria']}\n";
echo "❌ Errores:                 {$stats['errores']}\n\n";

echo "Distribución por categoría:\n";
foreach ($stats['por_categoria'] as $cat => $count) {
    echo "  - " . str_pad($cat, 15) . ": $count productos\n";
}

// PASO 3: Verificar en API
echo "\n" . str_repeat("━", 60) . "\n";
echo "🔍 PASO 3: Verificar categorías en REST API\n";
echo str_repeat("━", 60) . "\n\n";

foreach ($created_categories as $slug => $term_id) {
    $term = get_term($term_id, 'categorias_productos');
    $count = $term->count;

    echo "✅ {$term->name} ({$term->slug}): {$count} productos\n";
    echo "   API: /wp-json/wp/v2/categorias-productos?slug={$term->slug}\n\n";
}

echo str_repeat("━", 60) . "\n";
echo "✨ CATEGORÍAS CREADAS Y ASOCIADAS EXITOSAMENTE\n";
echo str_repeat("━", 60) . "\n";
