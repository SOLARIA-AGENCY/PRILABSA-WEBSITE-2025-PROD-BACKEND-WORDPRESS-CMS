<?php
/**
 * Script simple para crear un producto de prueba
 */

// Configuración de la base de datos
$host = 'localhost';
$dbname = 'productos_prilabsa_com';
$username = 'root'; // Ajustar según configuración real
$password = ''; // Ajustar según configuración real

try {
    // Conectar a MySQL
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "✅ Conectado a la base de datos\n";
    
    // Verificar si existe la tabla wp_posts
    $stmt = $pdo->query("SHOW TABLES LIKE 'wp_posts'");
    if ($stmt->rowCount() == 0) {
        echo "❌ No se encuentra la tabla wp_posts\n";
        exit(1);
    }
    
    echo "✅ Tabla wp_posts encontrada\n";
    
    // Verificar tipos de post personalizados
    $stmt = $pdo->query("SELECT DISTINCT post_type FROM wp_posts WHERE post_type = 'producto'");
    if ($stmt->rowCount() > 0) {
        echo "✅ Existen productos en la base de datos\n";
        $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($productos as $producto) {
            echo "  - ID: {$producto['ID']}, Tipo: {$producto['post_type']}\n";
        }
    } else {
        echo "ℹ️  No hay productos, vamos a crear uno de prueba\n";
        
        // Insertar un producto de prueba
        $sql = "INSERT INTO wp_posts (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count) 
                VALUES (1, NOW(), NOW(), 'Producto de prueba creado manualmente', 'Producto de Prueba', '', 'publish', 'closed', 'closed', '', 'producto-de-prueba', '', '', NOW(), NOW(), '', 0, '', 0, 'producto', '', 0)";
        
        $pdo->exec($sql);
        $product_id = $pdo->lastInsertId();
        
        echo "✅ Producto de prueba creado con ID: $product_id\n";
        
        // Agregar metadatos
        $sql = "INSERT INTO wp_postmeta (post_id, meta_key, meta_value) VALUES (?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        
        $stmt->execute([$product_id, '_codigo_producto', 'TEST001']);
        $stmt->execute([$product_id, '_precio_producto', '99.99']);
        
        echo "✅ Metadatos agregados\n";
    }
    
    // Verificar taxonomías
    $stmt = $pdo->query("SELECT * FROM wp_term_taxonomy WHERE taxonomy IN ('categoria_producto', 'tipo_producto')");
    $taxonomies = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "ℹ️  Taxonomías encontradas:\n";
    foreach ($taxonomies as $tax) {
        echo "  - {$tax['taxonomy']} (ID: {$tax['term_id']})\n";
    }
    
    echo "\n🎉 Verificación completada\n";
    
} catch (PDOException $e) {
    echo "❌ Error de base de datos: " . $e->getMessage() . "\n";
}
?>