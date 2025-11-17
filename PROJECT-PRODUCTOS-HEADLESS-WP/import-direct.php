<?php
/**
 * Importador de productos PRILABSA - Versión Web
 * Este script omite el routing de WordPress para ejecutarse directamente
 */

// Establecer headers para evitar caché
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
header('Content-Type: text/plain; charset=utf-8');

echo "🚀 Iniciando importación de productos PRILABSA...\n";
echo "⏰ Hora de inicio: " . date('Y-m-d H:i:s') . "\n\n";

// Función para importar productos
function importar_productos() {
    // Cargar WordPress manualmente
    $wp_config_path = __DIR__ . '/wp-config.php';
    if (!file_exists($wp_config_path)) {
        echo "❌ Error: No se encuentra wp-config.php\n";
        return false;
    }
    
    // Extraer constantes de wp-config.php
    $config_content = file_get_contents($wp_config_path);
    preg_match("/define\(\s*['\"]DB_NAME['\"],\s*['\"]([^'\"]+)['\"]\s*\);/", $config_content, $matches);
    $db_name = $matches[1] ?? '';
    
    preg_match("/define\(\s*['\"]DB_USER['\"],\s*['\"]([^'\"]+)['\"]\s*\);/", $config_content, $matches);
    $db_user = $matches[1] ?? '';
    
    preg_match("/define\(\s*['\"]DB_PASSWORD['\"],\s*['\"]([^'\"]*)['\"]\s*\);/", $config_content, $matches);
    $db_password = $matches[1] ?? '';
    
    preg_match("/define\(\s*['\"]DB_HOST['\"],\s*['\"]([^'\"]+)['\"]\s*\);/", $config_content, $matches);
    $db_host = $matches[1] ?? 'localhost';
    
    if (empty($db_name) || empty($db_user)) {
        echo "❌ Error: No se pueden extraer las credenciales de la base de datos\n";
        return false;
    }
    
    echo "🔗 Conectando a la base de datos...\n";
    
    try {
        // Conectar a MySQL
        $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "✅ Conexión exitosa a la base de datos\n\n";
        
        // Leer catálogo
        $catalog_file = __DIR__ . '/catalogo-productos.json';
        if (!file_exists($catalog_file)) {
            echo "❌ Error: No se encuentra catalogo-productos.json\n";
            return false;
        }
        
        $catalog_content = file_get_contents($catalog_file);
        $catalog = json_decode($catalog_content, true);
        
        if (!$catalog) {
            echo "❌ Error: JSON inválido en catálogo\n";
            return false;
        }
        
        echo "📦 Se encontraron " . count($catalog) . " productos en el catálogo\n\n";
        
        $imported = 0;
        $errors = 0;
        
        // Obtener prefijo de tablas
        $prefix = '';
        $result = $pdo->query("SHOW TABLES LIKE 'wp_posts'");
        if ($result->rowCount() > 0) {
            $prefix = 'wp_';
        } else {
            $result = $pdo->query("SHOW TABLES LIKE '%_posts'");
            if ($result->rowCount() > 0) {
                $table_name = $result->fetch(PDO::FETCH_NUM)[0];
                $prefix = str_replace('_posts', '', $table_name) . '_';
            }
        }
        
        echo "📋 Usando prefijo de tablas: $prefix\n\n";
        
        foreach ($catalog as $index => $product) {
            try {
                echo "📝 [" . ($index + 1) . "/" . count($catalog) . "] " . ($product['nombre'] ?? 'Sin nombre') . "\n";
                
                // Insertar producto en wp_posts
                $sql = "INSERT INTO {$prefix}posts 
                    (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, 
                     post_status, comment_status, ping_status, post_password, post_name, to_ping, 
                     pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, 
                     guid, menu_order, post_type, post_mime_type, comment_count) 
                    VALUES (?, NOW(), NOW(), ?, ?, ?, 'publish', 'closed', 'closed', '', ?, '', '', NOW(), NOW(), '', 0, ?, 0, 'producto', '', 0)";
                
                $stmt = $pdo->prepare($sql);
                $post_name = sanitize_title($product['nombre'] ?? 'producto-' . $index);
                $guid = "https://productos.prilabsa.com/?post_type=producto&p=";
                
                $stmt->execute([
                    1, // author
                    $product['descripcion'] ?? '',
                    $product['nombre'] ?? 'Producto sin nombre',
                    substr($product['descripcion'] ?? '', 0, 150),
                    $post_name,
                    $guid
                ]);
                
                $post_id = $pdo->lastInsertId();
                echo "  ✅ Producto creado con ID: $post_id\n";
                
                // Insertar metadatos
                if (!empty($product['codigo'])) {
                    $stmt = $pdo->prepare("INSERT INTO {$prefix}postmeta (post_id, meta_key, meta_value) VALUES (?, '_codigo_producto', ?)");
                    $stmt->execute([$post_id, $product['codigo']]);
                    echo "  📋 Código: " . $product['codigo'] . "\n";
                }
                
                if (!empty($product['precio'])) {
                    $stmt = $pdo->prepare("INSERT INTO {$prefix}postmeta (post_id, meta_key, meta_value) VALUES (?, '_precio_producto', ?)");
                    $stmt->execute([$post_id, $product['precio']]);
                    echo "  💰 Precio: $" . $product['precio'] . "\n";
                }
                
                if (!empty($product['imagen'])) {
                    $stmt = $pdo->prepare("INSERT INTO {$prefix}postmeta (post_id, meta_key, meta_value) VALUES (?, '_imagen_producto', ?)");
                    $stmt->execute([$post_id, $product['imagen']]);
                    echo "  🖼️ Imagen agregada\n";
                }
                
                $imported++;
                echo "  ✅ Importado exitosamente\n\n";
                
            } catch (Exception $e) {
                echo "  ❌ Error: " . $e->getMessage() . "\n\n";
                $errors++;
            }
        }
        
        echo str_repeat("=", 50) . "\n";
        echo "📊 RESUMEN FINAL\n";
        echo str_repeat("=", 50) . "\n";
        echo "✅ Importados: $imported\n";
        echo "❌ Errores: $errors\n";
        echo "📈 Total procesados: " . ($imported + $errors) . "\n";
        echo "🎉 Importación completada: " . date('Y-m-d H:i:s') . "\n";
        
        return true;
        
    } catch (PDOException $e) {
        echo "❌ Error de base de datos: " . $e->getMessage() . "\n";
        return false;
    }
}

// Ejecutar importación
importar_productos();
?>