<?php
/**
 * Crear usuario temporal para importación de productos
 */

// Cargar WordPress
require_once('wp-config.php');

// Crear usuario temporal para importación
$username = 'importador_temp';
$email = 'import@prilabsa.com';
$password = wp_generate_password(12, false);

// Verificar si el usuario ya existe
$user = get_user_by('login', $username);

if (!$user) {
    // Crear nuevo usuario
    $user_id = wp_create_user($username, $password, $email);
    
    if (is_wp_error($user_id)) {
        echo "Error creando usuario: " . $user_id->get_error_message() . "\n";
        exit(1);
    }
    
    // Asignar rol de editor para poder crear posts
    $user = new WP_User($user_id);
    $user->set_role('editor');
    
    echo "✅ Usuario creado:\n";
    echo "  Usuario: $username\n";
    echo "  Password: $password\n";
    echo "  Email: $email\n";
    echo "  ID: $user_id\n";
    
} else {
    echo "ℹ️  Usuario ya existe: $username\n";
    
    // Resetear password
    wp_set_password($password, $user->ID);
    echo "🔄 Password reseteado: $password\n";
}

// Generar token de aplicación para API REST
if (class_exists('WP_Application_Passwords')) {
    $app_password = wp_generate_password(24, false);
    $hashed = wp_hash_password($app_password);
    
    // Guardar application password
    $user_app_passwords = get_user_meta($user->ID, 'application_passwords', true) ?: array();
    $user_app_passwords[] = array(
        'uuid' => wp_generate_uuid4(),
        'app_id' => 'prilabsa-import',
        'name' => 'Importador PRILABSA',
        'password' => $hashed,
        'created' => time(),
        'last_used' => null,
        'last_ip' => null
    );
    
    update_user_meta($user->ID, 'application_passwords', $user_app_passwords);
    
    echo "🔑 Application Password: $app_password\n";
    echo "📝 Para usar en API: $username:$app_password\n";
} else {
    echo "⚠️  Application Passwords no disponible\n";
}

echo "\n🎯 Para importar productos via API REST:\n";
echo "curl -X POST 'https://productos.prilabsa.com/wp-json/wp/v2/productos' \\\n";
echo "  -u '$username:$app_password' \\\n";
echo "  -H 'Content-Type: application/json' \\\n";
echo "  -d '{\"title\":\"Producto Test\",\"content\":\"Descripción\",\"status\":\"publish\"}'\n";

?>