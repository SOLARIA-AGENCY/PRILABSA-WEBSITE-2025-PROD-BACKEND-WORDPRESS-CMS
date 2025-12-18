<?php
require_once('wp-load.php');
if (!is_user_logged_in()) {
    wp_set_current_user(1); // Admin user
}

$plugins = array(
    'prilabsa-productos-cpt/prilabsa-productos-cpt.php',
    'prilabsa-acf-config/prilabsa-acf-config.php',
    'prilabsa-rest-api/prilabsa-rest-api.php',
    'prilabsa-import-products/prilabsa-import-products.php'
);

foreach ($plugins as $plugin) {
    if (!is_plugin_active($plugin)) {
        activate_plugin($plugin);
        echo "Activated: $plugin
";
    } else {
        echo "Already active: $plugin
";
    }
}
echo "Plugin activation complete
";
?>