<?php
/**
 * Script to delete a product by ID
 * Run from browser: http://localhost:8000/delete-product.php?id=9
 */

require_once __DIR__ . '/wp-load.php';

echo "<h1>PRILABSA - Eliminar Producto</h1>\n";
echo "<pre>\n";

// Get product ID from query string
$product_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($product_id <= 0) {
    echo "❌ ERROR: Debes proporcionar un ID válido\n";
    echo "   Uso: delete-product.php?id=9\n";
    exit;
}

// Check if product exists
$product = get_post($product_id);

if (!$product) {
    echo "❌ ERROR: No se encontró producto con ID {$product_id}\n";
    exit;
}

if ($product->post_type !== 'productos') {
    echo "❌ ERROR: El post con ID {$product_id} no es un producto (tipo: {$product->post_type})\n";
    exit;
}

echo "📦 Producto encontrado:\n";
echo "   ID: {$product->ID}\n";
echo "   Título: {$product->post_title}\n";
echo "   Estado: {$product->post_status}\n\n";

// Delete the product (moves to trash)
echo "🗑️  Moviendo producto a la papelera...\n";

$result = wp_trash_post($product_id);

if ($result) {
    echo "✅ Producto movido a la papelera exitosamente!\n\n";

    echo "🔄 Si deseas eliminarlo permanentemente, puedes usar:\n";
    echo "   wp_delete_post({$product_id}, true);\n\n";

    // Verify deletion
    $updated_product = get_post($product_id);
    echo "📊 Estado actual:\n";
    echo "   Estado: {$updated_product->post_status}\n";
    echo "   (trash = papelera, puede restaurarse)\n\n";

    // Show remaining products
    $products = get_posts([
        'post_type' => 'productos',
        'post_status' => 'publish',
        'numberposts' => -1,
    ]);

    echo "📋 Productos activos restantes: " . count($products) . "\n";
    foreach ($products as $p) {
        echo "   - ID {$p->ID}: {$p->post_title}\n";
    }

} else {
    echo "❌ ERROR: No se pudo eliminar el producto\n";
}

echo "\n</pre>\n";
echo "<p><a href='http://localhost:8000/wp-admin/edit.php?post_type=productos'>← Ver todos los productos en wp-admin</a></p>\n";
echo "<p><a href='http://localhost:8000/wp-admin/edit.php?post_status=trash&post_type=productos'>← Ver productos en la papelera</a></p>\n";
