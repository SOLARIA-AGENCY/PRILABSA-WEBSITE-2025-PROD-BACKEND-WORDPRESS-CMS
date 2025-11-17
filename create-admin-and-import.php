<?php
/**
 * Create Admin User and Import Products
 */

// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'prilabsa_wp');
define('DB_USER', 'prilabsa_wp');
define('DB_PASSWORD', 'PRILABSAsol2025!');

echo "=== PRILABSA Admin User Creation & Import ===\n";

try {
    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    
    if ($mysqli->connect_error) {
        throw new Exception("Database connection failed: " . $mysqli->connect_error);
    }
    
    echo "✓ Database connected\n";
    
    // Create admin user if not exists
    $username = 'prilabsa_admin';
    $email = 'admin@prilabsa.com';
    $password = 'AdminTemp2025!';
    
    $result = $mysqli->query("SELECT ID FROM wp_users WHERE user_login = '$username'");
    if ($result->num_rows === 0) {
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        $mysqli->query("INSERT INTO wp_users (user_login, user_pass, user_nicename, user_email, user_registered, user_status, display_name) VALUES ('$username', '$password_hash', '$username', '$email', NOW(), 0, 'PRILABSA Admin')");
        
        $user_id = $mysqli->insert_id;
        
        // Assign admin capabilities
        $mysqli->query("INSERT INTO wp_usermeta (user_id, meta_key, meta_value) VALUES ($user_id, 'wp_capabilities', 'a:1:{s:13:\"administrator\";b:1;}')");
        $mysqli->query("INSERT INTO wp_usermeta (user_id, meta_key, meta_value) VALUES ($user_id, 'wp_user_level', '10')");
        
        echo "✓ Created admin user: $username\n";
        echo "  Password: $password\n";
        echo "  Login: https://productos.prilabsa.com/wp-admin/\n";
    } else {
        echo "✓ Admin user already exists: $username\n";
    }
    
    // Load and import catalog
    $catalog_file = __DIR__ . '/catalogo-productos.json';
    if (!file_exists($catalog_file)) {
        throw new Exception("Catalog file not found: $catalog_file");
    }
    
    $catalog_json = file_get_contents($catalog_file);
    $catalog = json_decode($catalog_json, true);
    
    if (!$catalog || !isset($catalog['productos'])) {
        throw new Exception("Failed to parse catalog file");
    }
    
    echo "✓ Catalog loaded with " . count($catalog['productos']) . " products\n";
    
    // Get admin user ID
    $result = $mysqli->query("SELECT ID FROM wp_users WHERE user_login = '$username' LIMIT 1");
    $user = $result->fetch_assoc();
    $author_id = $user['ID'];
    
    $imported = 0;
    $failed = 0;
    
    foreach ($catalog['productos'] as $product) {
        try {
            $mysqli->begin_transaction();
            
            // Check if product exists
            $stmt = $mysqli->prepare("
                SELECT p.ID FROM wp_posts p 
                JOIN wp_postmeta pm ON p.ID = pm.post_id 
                WHERE p.post_type = 'producto' AND pm.meta_key = 'codigo' AND pm.meta_value = ?
            ");
            $stmt->bind_param("s", $product['codigo']);
            $stmt->execute();
            $existing = $stmt->get_result()->fetch_assoc();
            
            // Create post name
            $post_name = strtolower($product['nombre']);
            $post_name = preg_replace('/[^a-z0-9\s-]/', '', $post_name);
            $post_name = preg_replace('/\s+/', '-', $post_name);
            $post_name = trim($post_name, '-');
            
            if ($existing) {
                // Update existing
                $stmt = $mysqli->prepare("
                    UPDATE wp_posts SET 
                        post_title = ?, post_content = ?, post_excerpt = ?,
                        post_name = ?, post_modified = NOW(), post_modified_gmt = NOW()
                    WHERE ID = ?
                ");
                $stmt->bind_param("ssssi", 
                    $product['nombre'],
                    $product['descripcion'] ?? '',
                    $product['descripcion_corta'] ?? '',
                    $post_name,
                    $existing['ID']
                );
                $stmt->execute();
                $post_id = $existing['ID'];
                $action = "Updated";
            } else {
                // Insert new
                $stmt = $mysqli->prepare("
                    INSERT INTO wp_posts (
                        post_author, post_date, post_date_gmt, post_content,
                        post_title, post_excerpt, post_status, comment_status,
                        ping_status, post_name, post_modified, post_modified_gmt,
                        post_parent, guid, menu_order, post_type, post_mime_type,
                        comment_count
                    ) VALUES (?, NOW(), NOW(), ?, ?, ?, 'publish', 'closed',
                        'closed', ?, NOW(), NOW(), 0, '', 0, 'producto', '', 0)
                ");
                $stmt->bind_param("issss", 
                    $author_id,
                    $product['descripcion'] ?? '',
                    $product['nombre'],
                    $product['descripcion_corta'] ?? '',
                    $post_name
                );
                $stmt->execute();
                $post_id = $mysqli->insert_id;
                $action = "Created";
            }
            
            // Update meta fields
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
                // Remove existing
                $stmt = $mysqli->prepare("DELETE FROM wp_postmeta WHERE post_id = ? AND meta_key = ?");
                $stmt->bind_param("is", $post_id, $key);
                $stmt->execute();
                
                // Insert new
                $stmt = $mysqli->prepare("INSERT INTO wp_postmeta (post_id, meta_key, meta_value) VALUES (?, ?, ?)");
                $stmt->bind_param("iss", $post_id, $key, $value);
                $stmt->execute();
            }
            
            // Handle categories
            if (!empty($product['categoria'])) {
                $stmt = $mysqli->prepare("
                    SELECT t.term_id FROM wp_terms t 
                    JOIN wp_term_taxonomy tt ON t.term_id = tt.term_id 
                    WHERE t.slug = ? AND tt.taxonomy = 'categoria_producto'
                ");
                $stmt->bind_param("s", $product['categoria']);
                $stmt->execute();
                $term = $stmt->get_result()->fetch_assoc();
                
                if ($term) {
                    // Remove existing relationships
                    $stmt = $mysqli->prepare("DELETE FROM wp_term_relationships WHERE object_id = ?");
                    $stmt->bind_param("i", $post_id);
                    $stmt->execute();
                    
                    // Add new relationship
                    $stmt = $mysqli->prepare("
                        INSERT INTO wp_term_relationships (object_id, term_taxonomy_id, term_order) 
                        VALUES (?, ?, 0)
                    ");
                    $stmt->bind_param("ii", $post_id, $term['term_id']);
                    $stmt->execute();
                }
            }
            
            $mysqli->commit();
            echo "✓ $action: {$product['nombre']} (ID: $post_id)\n";
            $imported++;
            
        } catch (Exception $e) {
            $mysqli->rollback();
            echo "✗ Failed to import {$product['nombre']}: {$e->getMessage()}\n";
            $failed++;
        }
    }
    
    echo "\n=== Import Complete ===\n";
    echo "✓ Successfully processed: $imported products\n";
    echo "✗ Failed: $failed products\n";
    
    // Verify count
    $result = $mysqli->query("SELECT COUNT(*) as count FROM wp_posts WHERE post_type = 'producto' AND post_status = 'publish'");
    $count = $result->fetch_assoc();
    echo "Total products in database: {$count['count']}\n";
    
    echo "\n=== Admin Access ===\n";
    echo "URL: https://productos.prilabsa.com/wp-admin/\n";
    echo "Username: $username\n";
    echo "Password: $password\n";
    
    $mysqli->close();
    
} catch (Exception $e) {
    echo "✗ Error: {$e->getMessage()}\n";
}
?>