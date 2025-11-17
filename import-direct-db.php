<?php
/**
 * Simple Product Import for PRILABSA
 * Direct database insertion approach
 */

// Database configuration
$db_host = 'localhost';
$db_name = 'prilabsa_wp';
$db_user = 'prilabsa_wp';
$db_pass = 'PRILABSAsol2025!';

// Connect to database
try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✓ Database connected\n";
} catch (PDOException $e) {
    echo "✗ Database connection failed: " . $e->getMessage() . "\n";
    exit;
}

// Load catalog
$catalog_file = __DIR__ . '/catalogo-productos.json';
if (!file_exists($catalog_file)) {
    echo "✗ Catalog file not found\n";
    exit;
}

$catalog = json_decode(file_get_contents($catalog_file), true);
if (!$catalog) {
    echo "✗ Failed to parse catalog\n";
    exit;
}

echo "✓ Loaded catalog with {$catalog['metadata']['total_productos']} products\n";

// Get author ID (use admin user)
$stmt = $pdo->prepare("SELECT ID FROM wp_users WHERE user_login = 'admin' LIMIT 1");
$stmt->execute();
$author = $stmt->fetch(PDO::FETCH_ASSOC);
$author_id = $author ? $author['ID'] : 1;

// Import products
$imported = 0;
$failed = 0;

foreach ($catalog['productos'] as $product) {
    try {
        $pdo->beginTransaction();
        
        // Insert post
        $stmt = $pdo->prepare("
            INSERT INTO wp_posts (
                post_author, post_date, post_date_gmt, post_content, 
                post_title, post_excerpt, post_status, comment_status, 
                ping_status, post_name, post_modified, post_modified_gmt, 
                post_parent, guid, menu_order, post_type, post_mime_type, 
                comment_count
            ) VALUES (
                ?, NOW(), NOW(), ?, ?, ?, 'publish', 'closed', 
                'closed', ?, NOW(), NOW(), 0, '', 0, 'producto', '', 0
            )
        ");
        
        $post_name = sanitize_title($product['nombre']);
        $stmt->execute([
            $author_id,
            $product['descripcion'] ?? '',
            $product['nombre'],
            $product['descripcion_corta'] ?? '',
            $post_name
        ]);
        
        $post_id = $pdo->lastInsertId();
        
        // Insert post meta
        $meta_fields = array(
            'codigo' => $product['codigo'],
            'precio' => $product['precio'] ?? 0,
            'moneda' => $product['moneda'] ?? 'USD',
            'stock' => $product['stock'] ?? 0,
            'marca' => $product['marca'] ?? '',
            'modelo' => $product['modelo'] ?? '',
            'ficha_tecnica' => $product['ficha_tecnica'] ?? '',
            'imagen_url' => $product['imagen_url'] ?? ''
        );
        
        foreach ($meta_fields as $key => $value) {
            $stmt = $pdo->prepare("
                INSERT INTO wp_postmeta (post_id, meta_key, meta_value) 
                VALUES (?, ?, ?)
            ");
            $stmt->execute([$post_id, $key, $value]);
        }
        
        // Handle categories if they exist
        if (!empty($product['categoria'])) {
            $stmt = $pdo->prepare("
                SELECT t.term_id 
                FROM wp_terms t 
                JOIN wp_term_taxonomy tt ON t.term_id = tt.term_id 
                WHERE t.slug = ? AND tt.taxonomy = 'categoria_producto'
            ");
            $stmt->execute([$product['categoria']]);
            $term = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($term) {
                $stmt = $pdo->prepare("
                    INSERT INTO wp_term_relationships (object_id, term_taxonomy_id, term_order) 
                    VALUES (?, ?, 0)
                ");
                $stmt->execute([$post_id, $term['term_id']]);
            }
        }
        
        $pdo->commit();
        echo "✓ Imported: {$product['nombre']} (ID: $post_id)\n";
        $imported++;
        
    } catch (Exception $e) {
        $pdo->rollBack();
        echo "✗ Failed to import {$product['nombre']}: {$e->getMessage()}\n";
        $failed++;
    }
}

echo "\n=== Import Summary ===\n";
echo "✓ Successfully imported: $imported products\n";
echo "✗ Failed to import: $failed products\n";

// Verify count
$stmt = $pdo->prepare("SELECT COUNT(*) as count FROM wp_posts WHERE post_type = 'producto' AND post_status = 'publish'");
$stmt->execute();
$result = $stmt->fetch(PDO::FETCH_ASSOC);
echo "Total products in database: {$result['count']}\n";

function sanitize_title($title) {
    $title = strtolower($title);
    $title = preg_replace('/[^a-z0-9\s-]/', '', $title);
    $title = preg_replace('/\s+/', '-', $title);
    $title = trim($title, '-');
    return $title;
}
?>