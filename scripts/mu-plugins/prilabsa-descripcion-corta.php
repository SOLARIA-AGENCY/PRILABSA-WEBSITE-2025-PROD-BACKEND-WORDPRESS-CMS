<?php
/**
 * Plugin Name: PRILABSA - Descripcion Corta Fields
 * Description: Adds descripcion_corta ACF fields for productos
 * Version: 1.0
 *
 * Upload to: wp-content/mu-plugins/prilabsa-descripcion-corta.php
 */

add_action('acf/init', function() {
    if (!function_exists('acf_add_local_field_group')) {
        return;
    }

    // Add descripcion_corta fields to productos
    acf_add_local_field_group([
        'key' => 'group_descripcion_corta',
        'title' => 'Descripción Corta',
        'fields' => [
            [
                'key' => 'field_descripcion_corta_es',
                'label' => 'Descripción Corta (ES)',
                'name' => 'descripcion_corta_es',
                'type' => 'textarea',
                'rows' => 2,
                'maxlength' => 160,
                'wrapper' => ['width' => '33'],
            ],
            [
                'key' => 'field_descripcion_corta_en',
                'label' => 'Short Description (EN)',
                'name' => 'descripcion_corta_en',
                'type' => 'textarea',
                'rows' => 2,
                'maxlength' => 160,
                'wrapper' => ['width' => '33'],
            ],
            [
                'key' => 'field_descripcion_corta_pt',
                'label' => 'Descrição Curta (PT)',
                'name' => 'descripcion_corta_pt',
                'type' => 'textarea',
                'rows' => 2,
                'maxlength' => 160,
                'wrapper' => ['width' => '34'],
            ],
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'productos',
                ],
            ],
        ],
        'menu_order' => 5,
        'position' => 'normal',
        'style' => 'default',
        'show_in_rest' => true,
    ]);
});

// Ensure fields are exposed in REST API
add_filter('acf/rest_api/field_settings/show_in_rest', '__return_true');
