<?php
/**
 * Populate PRILABSA Taxonomies
 * Creates 5 categories and optionally assigns them to products
 *
 * Usage: Upload to WordPress root and access via browser
 * https://productos.prilabsa.com/populate-taxonomies.php
 */

// Load WordPress
require_once __DIR__ . '/wp-load.php';

header('Content-Type: text/plain; charset=utf-8');

echo "═══════════════════════════════════════════════════════\n";
echo "  PRILABSA Taxonomy Population Script\n";
echo "  Date: " . date('Y-m-d H:i:s') . "\n";
echo "═══════════════════════════════════════════════════════\n\n";

// Category definitions (matching ACF categoria select values)
$categories = [
    [
        'name' => 'Aditivos',
        'slug' => 'aditivos',
        'description' => 'Aditivos para la industria alimentaria'
    ],
    [
        'name' => 'Alimentos',
        'slug' => 'alimentos',
        'description' => 'Productos alimenticios especializados'
    ],
    [
        'name' => 'Equipos',
        'slug' => 'equipos',
        'description' => 'Equipamiento para laboratorio'
    ],
    [
        'name' => 'Probióticos',
        'slug' => 'probioticos',
        'description' => 'Cultivos probióticos y microbiológicos'
    ],
    [
        'name' => 'Químicos',
        'slug' => 'quimicos',
        'description' => 'Productos químicos industriales'
    ]
];

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "STEP 1: Create Taxonomy Terms\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

$created_terms = [];

foreach ($categories as $category) {
    // Check if term already exists
    $term_exists = term_exists($category['slug'], 'categorias_productos');

    if ($term_exists) {
        echo "⚠ '{$category['name']}' already exists (ID: {$term_exists['term_id']})\n";
        $created_terms[$category['slug']] = $term_exists['term_id'];
    } else {
        // Create new term
        $result = wp_insert_term(
            $category['name'],
            'categorias_productos',
            [
                'slug' => $category['slug'],
                'description' => $category['description']
            ]
        );

        if (is_wp_error($result)) {
            echo "✗ ERROR creating '{$category['name']}': {$result->get_error_message()}\n";
        } else {
            echo "✓ Created '{$category['name']}' (ID: {$result['term_id']})\n";
            $created_terms[$category['slug']] = $result['term_id'];
        }
    }
}

echo "\nCategories Created: " . count($created_terms) . "/5\n\n";

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "STEP 2: Assign Categories to Existing Products\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

// Get all published productos
$args = [
    'post_type' => 'productos',
    'post_status' => ['publish', 'draft'],
    'posts_per_page' => -1
];

$productos = get_posts($args);
echo "Found " . count($productos) . " products to process\n\n";

$updated_count = 0;
$skipped_count = 0;

foreach ($productos as $producto) {
    $post_id = $producto->ID;
    $post_title = $producto->post_title;

    // Get ACF categoria field value
    $acf_categoria = get_field('categoria', $post_id);

    if (empty($acf_categoria)) {
        echo "⊘ Skipped '$post_title' (ID: $post_id) - no ACF categoria field\n";
        $skipped_count++;
        continue;
    }

    // Map ACF categoria value to term ID
    if (isset($created_terms[$acf_categoria])) {
        $term_id = $created_terms[$acf_categoria];

        // Assign taxonomy term to post
        $result = wp_set_object_terms($post_id, $term_id, 'categorias_productos', false);

        if (is_wp_error($result)) {
            echo "✗ ERROR updating '$post_title': {$result->get_error_message()}\n";
        } else {
            echo "✓ Assigned '$acf_categoria' to '$post_title' (ID: $post_id)\n";
            $updated_count++;
        }
    } else {
        echo "⚠ '$post_title' has unknown categoria: '$acf_categoria'\n";
        $skipped_count++;
    }
}

echo "\n";
echo "Products Updated: $updated_count\n";
echo "Products Skipped: $skipped_count\n\n";

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "STEP 3: Validation\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

// Count terms in taxonomy
$terms = get_terms([
    'taxonomy' => 'categorias_productos',
    'hide_empty' => false
]);

echo "Total Terms in categorias_productos: " . count($terms) . "\n\n";

foreach ($terms as $term) {
    $count = $term->count;
    echo "  - {$term->name} ({$term->slug}): $count products\n";
}

echo "\n";
echo "═══════════════════════════════════════════════════════\n";
echo "  SCRIPT COMPLETE\n";
echo "═══════════════════════════════════════════════════════\n\n";

echo "Next Steps:\n";
echo "1. Verify taxonomy terms in admin:\n";
echo "   https://productos.prilabsa.com/wp-admin/edit-tags.php?taxonomy=categorias_productos&post_type=productos\n\n";
echo "2. Test REST API:\n";
echo "   GET /wp-json/wp/v2/productos (check 'categorias-productos' field)\n";
echo "   GET /wp-json/wp/v2/categorias_productos\n\n";
echo "3. Delete this script:\n";
echo "   rm populate-taxonomies.php\n\n";
