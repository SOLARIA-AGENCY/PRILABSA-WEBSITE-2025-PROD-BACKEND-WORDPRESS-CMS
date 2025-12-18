<?php
// Simple plugin activation script
require_once('wp-load.php');

$plugins_to_activate = array(
    'prilabsa-productos-cpt/prilabsa-productos-cpt.php',
    'prilabsa-acf-config/prilabsa-acf-config.php', 
    'prilabsa-rest-api/prilabsa-rest-api.php',
    'prilabsa-import-products/prilabsa-import-products.php'
);

$results = array();
foreach ($plugins_to_activate as $plugin) {
    if (!is_plugin_active($plugin)) {
        $result = activate_plugin($plugin);
        if (is_wp_error($result)) {
            $results[] = 'ERROR activating ' . $plugin . ': ' . $result->get_error_message();
        } else {
            $results[] = 'SUCCESS: Activated ' . $plugin;
        }
    } else {
        $results[] = 'ALREADY ACTIVE: ' . $plugin;
    }
}

echo 'Plugin Activation Results:
';
foreach ($results as $result) {
    echo $result . '
';
}
?>