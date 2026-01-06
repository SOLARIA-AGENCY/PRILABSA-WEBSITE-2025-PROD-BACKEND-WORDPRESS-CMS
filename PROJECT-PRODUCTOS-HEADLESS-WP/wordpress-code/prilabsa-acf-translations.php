<?php
/**
 * Plugin Name: PRILABSA ACF Translations
 * Description: Registers localized fields for Product Short Description and Specifications
 */

if (!defined('ABSPATH'))
    exit;

// 1. Register ACF Fields
add_action('acf/init', 'prilabsa_register_translation_fields');
function prilabsa_register_translation_fields()
{
    if (!function_exists('acf_add_local_field_group'))
        return;

    acf_add_local_field_group(array(
        'key' => 'group_productos_translations',
        'title' => 'Traducciones Productos (Descripción Corta y Espec.)',
        'fields' => array(
            // Descripción Corta
            array(
                'key' => 'field_descripcion_corta_es',
                'label' => 'Descripción Corta (Español)',
                'name' => 'descripcion_corta_es',
                'type' => 'text',
                'instructions' => 'Breve descripción para listados (Español)',
                'wrapper' => array('width' => '33'),
                'show_in_rest' => 1,
            ),
            array(
                'key' => 'field_descripcion_corta_en',
                'label' => 'Descripción Corta (Inglés)',
                'name' => 'descripcion_corta_en',
                'type' => 'text',
                'wrapper' => array('width' => '33'),
                'show_in_rest' => 1,
            ),
            array(
                'key' => 'field_descripcion_corta_pt',
                'label' => 'Descripción Corta (Portugués)',
                'name' => 'descripcion_corta_pt',
                'type' => 'text',
                'wrapper' => array('width' => '33'),
                'show_in_rest' => 1,
            ),
            // Especificaciones
            array(
                'key' => 'field_especificaciones_es',
                'label' => 'Especificaciones (Español)',
                'name' => 'especificaciones_es',
                'type' => 'textarea',
                'instructions' => 'Clave: Valor (uno por línea)',
                'rows' => 6,
                'wrapper' => array('width' => '33'),
                'show_in_rest' => 1,
            ),
            array(
                'key' => 'field_especificaciones_en',
                'label' => 'Especificaciones (Inglés)',
                'name' => 'especificaciones_en',
                'type' => 'textarea',
                'rows' => 6,
                'wrapper' => array('width' => '33'),
                'show_in_rest' => 1,
            ),
            array(
                'key' => 'field_especificaciones_pt',
                'label' => 'Especificaciones (Portugués)',
                'name' => 'especificaciones_pt',
                'type' => 'textarea',
                'rows' => 6,
                'wrapper' => array('width' => '33'),
                'show_in_rest' => 1,
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'productos',
                ),
            ),
        ),
        'menu_order' => 5, // Show after main details
        'position' => 'normal',
        'style' => 'default',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
        'active' => true,
        'show_in_rest' => 1,
    ));
}

// 2. Register REST API Fields
add_action('rest_api_init', 'prilabsa_register_rest_translations');
function prilabsa_register_rest_translations()
{
    $fields = array(
        'descripcion_corta_es',
        'descripcion_corta_en',
        'descripcion_corta_pt',
        'especificaciones_es',
        'especificaciones_en',
        'especificaciones_pt'
    );

    foreach ($fields as $field) {
        register_rest_field('productos', $field, array(
            'get_callback' => function ($object) use ($field) {
                return get_field($field, $object['id']);
            },
            'update_callback' => function ($value, $object) use ($field) {
                return update_field($field, $value, $object->ID);
            },
            'schema' => array(
                'description' => $field,
                'type' => 'string',
                'context' => array('view', 'edit', 'embed'),
            ),
        ));
    }
}
