<?php
/**
 * Script para forzar flush de permalinks y verificar configuración WordPress
 *
 * USO: Acceder directamente desde navegador
 * http://localhost:8000/fix-permalink-flush.php
 *
 * Este script:
 * 1. Verifica el theme activo
 * 2. Flush rewrite rules para que WordPress reconozca URLs de productos
 * 3. Verifica existencia del template single-productos.php
 */

// Cargar WordPress
require_once(__DIR__ . '/wordpress/wp-load.php');

// Verificar que estamos logueados como admin
if (!is_user_logged_in() || !current_user_can('administrator')) {
    wp_die('Debes estar logueado como administrador para ejecutar este script.');
}

echo "<h1>🔧 PRILABSA WordPress - Fix Permalinks & Templates</h1>";
echo "<hr>";

// 1. Verificar theme activo
$current_theme = wp_get_theme();
echo "<h2>1. Theme Activo</h2>";
echo "<p><strong>Theme:</strong> " . $current_theme->get('Name') . " (Versión " . $current_theme->get('Version') . ")</p>";
echo "<p><strong>Directory:</strong> " . get_template_directory() . "</p>";

// 2. Verificar si existe template single-productos.php
$template_path = get_template_directory() . '/single-productos.php';
echo "<h2>2. Template single-productos.php</h2>";
if (file_exists($template_path)) {
    echo "<p style='color: green;'>✅ <strong>Encontrado:</strong> " . $template_path . "</p>";
    echo "<p><strong>Última modificación:</strong> " . date('Y-m-d H:i:s', filemtime($template_path)) . "</p>";
} else {
    echo "<p style='color: red;'>❌ <strong>NO ENCONTRADO:</strong> " . $template_path . "</p>";
    echo "<p>El archivo debe estar en la carpeta del theme activo.</p>";
}

// 3. Flush rewrite rules
echo "<h2>3. Flush Rewrite Rules</h2>";
flush_rewrite_rules();
echo "<p style='color: green;'>✅ <strong>Permalinks actualizados correctamente</strong></p>";

// 4. Verificar estructura de permalinks
$permalink_structure = get_option('permalink_structure');
echo "<h2>4. Estructura de Permalinks</h2>";
echo "<p><strong>Actual:</strong> " . ($permalink_structure ? $permalink_structure : 'Plain (predeterminado)') . "</p>";

if (!$permalink_structure) {
    echo "<p style='color: orange;'>⚠️ <strong>Recomendación:</strong> Cambiar a permalinks bonitos en Ajustes > Enlaces permanentes</p>";
    echo "<p>Opción recomendada: <code>/%postname%/</code></p>";
}

// 5. Verificar post type productos
echo "<h2>5. Post Type 'productos'</h2>";
if (post_type_exists('productos')) {
    echo "<p style='color: green;'>✅ Post type 'productos' registrado correctamente</p>";

    $productos = get_posts(array(
        'post_type' => 'productos',
        'posts_per_page' => 5,
        'post_status' => 'any'
    ));

    echo "<p><strong>Total productos:</strong> " . count($productos) . "</p>";

    if (count($productos) > 0) {
        echo "<h3>Productos encontrados:</h3>";
        echo "<ul>";
        foreach ($productos as $producto) {
            $slug = $producto->post_name;
            $url = get_permalink($producto->ID);
            $status = get_post_status($producto->ID);

            echo "<li>";
            echo "<strong>" . $producto->post_title . "</strong> ";
            echo "(<em>Estado: " . $status . "</em>) ";
            echo "<br>URL: <a href='" . $url . "' target='_blank'>" . $url . "</a>";
            echo "</li>";
        }
        echo "</ul>";
    }
} else {
    echo "<p style='color: red;'>❌ Post type 'productos' NO está registrado</p>";
    echo "<p>Asegúrate de que el plugin PRILABSA WordPress Headless esté activado.</p>";
}

// 6. Verificar plugin PRILABSA
echo "<h2>6. Plugin PRILABSA</h2>";
if (is_plugin_active('prilabsa/prilabsa.php')) {
    echo "<p style='color: green;'>✅ Plugin PRILABSA activo</p>";
    echo "<p><strong>Versión:</strong> " . (defined('PRILABSA_VERSION') ? PRILABSA_VERSION : 'No detectada') . "</p>";
} else {
    echo "<p style='color: red;'>❌ Plugin PRILABSA NO está activo</p>";
    echo "<p>Actívalo en Plugins > Plugins instalados</p>";
}

echo "<hr>";
echo "<h2>✅ Proceso completado</h2>";
echo "<p><strong>Prueba ahora:</strong> Crea un producto y visita su URL en formato:<br>";
echo "<code>http://localhost:8000/productos/nombre-del-producto/</code></p>";

echo "<p><a href='/wp-admin/edit.php?post_type=productos'>← Volver a Productos</a></p>";
?>
