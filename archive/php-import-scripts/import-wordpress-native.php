<?php
/**
 * PRILABSA Product Import via WordPress REST API
 * Creates authentication and imports all products
 */

// Bootstrap WordPress
require_once('wp-config.php');
require_once('wp-load.php');

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "=== PRILABSA Product Import ===\n";

// Step 1: Create import user if not exists
$username = 'prilabsa_import';
$email = 'import@prilabsa.com';

// Check if user exists
$user = get_user_by('login', $username);
if (!$user) {
    // Create user
    $user_id = wp_create_user($username, wp_generate_password(), $email);
    $user = get_user_by('id', $user_id);
    
    // Assign capabilities
    $user->set_role('editor');
    
    echo "✓ Created import user: $username\n";
} else {
    echo "✓ Import user exists: $username\n";
}

// Step 2: Create application password for API access
if (!class_exists('WP_Application_Passwords')) {
    echo "✗ Application Passwords not available\n";
    exit;
}

$app_passwords = new WP_Application_Passwords();
$passwords = $app_passwords->get_user_application_passwords($user->ID);

if (empty($passwords)) {
    $app_password = $app_passwords->create_new_application_password($user->ID, array(
        'name' => 'Product Import API',
        'app_id' => 'prilabsa-import'
    ));
    
    $password = reset($app_password);
    echo "✓ Created application password\n";
    echo "  Password: $password\n";
} else {
    $password = reset($passwords)['password'];
    echo "✓ Using existing application password\n";
}

// Step 3: Load product catalog
$catalog_file = __DIR__ . '/catalogo-productos.json';
if (!file_exists($catalog_file)) {
    echo "✗ Catalog file not found: $catalog_file\n";
    exit;
}

$catalog = json_decode(file_get_contents($catalog_file), true);
if (!$catalog) {
    echo "✗ Failed to parse catalog file\n";
    exit;
}

echo "✓ Loaded catalog with {$catalog['metadata']['total_productos']} products\n";

// Step 4: Import products using WordPress functions
$imported = 0;
$failed = 0;

foreach ($catalog['productos'] as $product_data) {
    try {
        // Prepare post data
        $post_data = array(
            'post_title' => $product_data['nombre'],
            'post_content' => $product_data['descripcion'] ?? '',
            'post_excerpt' => $product_data['descripcion_corta'] ?? '',
            'post_status' => 'publish',
            'post_type' => 'producto',
            'post_author' => $user->ID
        );
        
        // Insert post
        $post_id = wp_insert_post($post_data, true);
        
        if (is_wp_error($post_id)) {
            echo "✗ Failed to create product: {$product_data['nombre']} - {$post_id->get_error_message()}\n";
            $failed++;
            continue;
        }
        
        // Add meta fields
        update_post_meta($post_id, 'codigo', $product_data['codigo']);
        update_post_meta($post_id, 'precio', $product_data['precio'] ?? 0);
        update_post_meta($post_id, 'moneda', $product_data['moneda'] ?? 'USD');
        update_post_meta($post_id, 'stock', $product_data['stock'] ?? 0);
        update_post_meta($post_id, 'marca', $product_data['marca'] ?? '');
        update_post_meta($post_id, 'modelo', $product_data['modelo'] ?? '');
        update_post_meta($post_id, 'ficha_tecnica', $product_data['ficha_tecnica'] ?? '');
        update_post_meta($post_id, 'imagen_url', $product_data['imagen_url'] ?? '');
        
        // Set categories
        if (!empty($product_data['categoria'])) {
            $category = get_term_by('slug', $product_data['categoria'], 'categoria_producto');
            if ($category) {
                wp_set_post_terms($post_id, array($category->term_id), 'categoria_producto');
            }
        }
        
        // Set product type
        if (!empty($product_data['tipo'])) {
            $type = get_term_by('slug', $product_data['tipo'], 'tipo_producto');
            if ($type) {
                wp_set_post_terms($post_id, array($type->term_id), 'tipo_producto');
            }
        }
        
        echo "✓ Imported: {$product_data['nombre']} (ID: $post_id)\n";
        $imported++;
        
    } catch (Exception $e) {
        echo "✗ Error importing {$product_data['nombre']}: {$e->getMessage()}\n";
        $failed++;
    }
}

echo "\n=== Import Summary ===\n";
echo "✓ Successfully imported: $imported products\n";
echo "✗ Failed to import: $failed products\n";
echo "Total processed: " . ($imported + $failed) . "\n";

// Step 5: Verify import
$total_products = wp_count_posts('producto')->publish;
echo "Total products in database: $total_products\n";

echo "\n=== API Access Information ===\n";
echo "API Endpoint: https://productos.prilabsa.com/wp-json/wp/v2/productos\n";
echo "Username: $username\n";
echo "Password: $password\n";
?>