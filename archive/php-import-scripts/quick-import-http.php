<?php
/**
 * PRILABSA Product Import Script
 * This script imports products from catalogo-productos.json
 */

// WordPress environment
require_once('wp-config.php');

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set content type
header('Content-Type: text/plain; charset=utf-8');

echo "=== PRILABSA PRODUCT IMPORT ===\n";
echo "Starting import at: " . date('Y-m-d H:i:s') . "\n\n";

try {
    // Load product catalog
    $catalog_file = __DIR__ . '/catalogo-productos.json';
    
    if (!file_exists($catalog_file)) {
        throw new Exception("Catalog file not found: $catalog_file");
    }
    
    $catalog_content = file_get_contents($catalog_file);
    $products = json_decode($catalog_content, true);
    
    if (!$products) {
        throw new Exception("Failed to parse catalog JSON");
    }
    
    echo "Found " . count($products) . " products in catalog\n\n";
    
    // Initialize WordPress
    require_once(ABSPATH . 'wp-admin/includes/admin.php');
    
    $imported = 0;
    $updated = 0;
    $errors = 0;
    
    foreach ($products as $product) {
        try {
            $post_id = wp_insert_post([
                'post_title' => $product['nombre'],
                'post_content' => $product['descripcion'] ?? '',
                'post_status' => 'publish',
                'post_type' => 'producto',
                'meta_input' => [
                    'codigo' => $product['codigo'],
                    'categoria' => $product['categoria'],
                    'tipo' => $product['tipo'] ?? '',
                    'precio' => $product['precio'] ?? 0,
                    'ficha_tecnica' => $product['ficha_tecnica'] ?? '',
                    'imagen' => $product['imagen'] ?? ''
                ]
            ]);
            
            if ($post_id && !is_wp_error($post_id)) {
                // Set categories
                if (!empty($product['categoria'])) {
                    wp_set_object_terms($post_id, [$product['categoria']], 'categoria_producto');
                }
                
                if (!empty($product['tipo'])) {
                    wp_set_object_terms($post_id, [$product['tipo']], 'tipo_producto');
                }
                
                $imported++;
                echo "✅ Imported: {$product['codigo']} - {$product['nombre']}\n";
            } else {
                $errors++;
                echo "❌ Failed to import: {$product['codigo']}\n";
            }
            
        } catch (Exception $e) {
            $errors++;
            echo "❌ Error with {$product['codigo']}: " . $e->getMessage() . "\n";
        }
    }
    
    echo "\n=== IMPORT SUMMARY ===\n";
    echo "Imported: $imported\n";
    echo "Updated: $updated\n";
    echo "Errors: $errors\n";
    echo "Total processed: " . count($products) . "\n";
    echo "Completed at: " . date('Y-m-d H:i:s') . "\n";
    
} catch (Exception $e) {
    echo "FATAL ERROR: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
}

?>