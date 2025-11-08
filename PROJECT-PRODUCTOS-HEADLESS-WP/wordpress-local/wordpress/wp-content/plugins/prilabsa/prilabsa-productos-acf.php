<?php
/**
 * PRILABSA Productos ACF Configuration
 *
 * Advanced Custom Fields para Productos con exposición REST API completa
 * Incluye campos multiidioma (es, en, pt) organizados en tabs para mejor UX
 *
 * @package PRILABSA_Productos_ACF
 * @author SOLARIA AGENCY
 * @version 1.0.0
 */

// Security: Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register ACF Field Group for Productos with Tabs
 */
if ( function_exists( 'acf_add_local_field_group' ) ) {
	acf_add_local_field_group(
		array(
			'key'                   => 'group_prilabsa_productos',
			'title'                 => 'Información del Producto (Multiidioma)',
			'fields'                => array(
				// ========================================
				// TAB: ESPAÑOL
				// ========================================
				array(
					'key'               => 'field_productos_tab_es',
					'label'             => '🇪🇸 Español',
					'name'              => '',
					'type'              => 'tab',
					'instructions'      => '',
					'required'          => 0,
					'conditional_logic' => 0,
					'placement'         => 'top',
					'endpoint'          => 0,
				),
				// Descripción Español
				array(
					'key'               => 'field_productos_descripcion_es',
					'label'             => 'Descripción (Español)',
					'name'              => 'descripcion_es',
					'type'              => 'textarea',
					'instructions'      => 'Descripción completa del producto en español',
					'required'          => 1,
					'rows'              => 5,
					'maxlength'         => 2000,
					'placeholder'       => 'Describe el producto, sus características principales y usos...',
				),
				// Beneficios Español
				array(
					'key'               => 'field_productos_beneficios_es',
					'label'             => 'Beneficios (Español)',
					'name'              => 'beneficios_es',
					'type'              => 'textarea',
					'instructions'      => 'Lista de beneficios del producto (separar con saltos de línea)',
					'required'          => 0,
					'rows'              => 4,
					'maxlength'         => 1500,
					'placeholder'       => 'Beneficio 1\nBeneficio 2\nBeneficio 3',
				),
				// Presentación Español
				array(
					'key'               => 'field_productos_presentacion_es',
					'label'             => 'Presentación (Español)',
					'name'              => 'presentacion_es',
					'type'              => 'text',
					'instructions'      => 'Formato de presentación del producto (ej: "Saco de 25 kg")',
					'required'          => 0,
					'maxlength'         => 200,
					'placeholder'       => 'Ej: Saco de 25 kg, Botella de 1 litro',
				),

				// ========================================
				// TAB: ENGLISH
				// ========================================
				array(
					'key'               => 'field_productos_tab_en',
					'label'             => '🇬🇧 English',
					'name'              => '',
					'type'              => 'tab',
					'instructions'      => '',
					'required'          => 0,
					'conditional_logic' => 0,
					'placement'         => 'top',
					'endpoint'          => 0,
				),
				// Descripción Inglés
				array(
					'key'               => 'field_productos_descripcion_en',
					'label'             => 'Description (English)',
					'name'              => 'descripcion_en',
					'type'              => 'textarea',
					'instructions'      => 'Complete product description in English',
					'required'          => 1,
					'rows'              => 5,
					'maxlength'         => 2000,
					'placeholder'       => 'Describe the product, main features and uses...',
				),
				// Beneficios Inglés
				array(
					'key'               => 'field_productos_beneficios_en',
					'label'             => 'Benefits (English)',
					'name'              => 'beneficios_en',
					'type'              => 'textarea',
					'instructions'      => 'List of product benefits (separate with line breaks)',
					'required'          => 0,
					'rows'              => 4,
					'maxlength'         => 1500,
					'placeholder'       => 'Benefit 1\nBenefit 2\nBenefit 3',
				),
				// Presentación Inglés
				array(
					'key'               => 'field_productos_presentacion_en',
					'label'             => 'Presentation (English)',
					'name'              => 'presentacion_en',
					'type'              => 'text',
					'instructions'      => 'Product presentation format (e.g., "25 kg bag")',
					'required'          => 0,
					'maxlength'         => 200,
					'placeholder'       => 'Ex: 25 kg bag, 1 liter bottle',
				),

				// ========================================
				// TAB: PORTUGUÊS
				// ========================================
				array(
					'key'               => 'field_productos_tab_pt',
					'label'             => '🇵🇹 Português',
					'name'              => '',
					'type'              => 'tab',
					'instructions'      => '',
					'required'          => 0,
					'conditional_logic' => 0,
					'placement'         => 'top',
					'endpoint'          => 0,
				),
				// Descripción Portugués
				array(
					'key'               => 'field_productos_descripcion_pt',
					'label'             => 'Descrição (Português)',
					'name'              => 'descripcion_pt',
					'type'              => 'textarea',
					'instructions'      => 'Descrição completa do produto em português',
					'required'          => 1,
					'rows'              => 5,
					'maxlength'         => 2000,
					'placeholder'       => 'Descreva o produto, características principais e usos...',
				),
				// Beneficios Portugués
				array(
					'key'               => 'field_productos_beneficios_pt',
					'label'             => 'Benefícios (Português)',
					'name'              => 'beneficios_pt',
					'type'              => 'textarea',
					'instructions'      => 'Lista de benefícios do produto (separar com quebras de linha)',
					'required'          => 0,
					'rows'              => 4,
					'maxlength'         => 1500,
					'placeholder'       => 'Benefício 1\nBenefício 2\nBenefício 3',
				),
				// Presentación Portugués
				array(
					'key'               => 'field_productos_presentacion_pt',
					'label'             => 'Apresentação (Português)',
					'name'              => 'presentacion_pt',
					'type'              => 'text',
					'instructions'      => 'Formato de apresentação do produto (ex: "Saco de 25 kg")',
					'required'          => 0,
					'maxlength'         => 200,
					'placeholder'       => 'Ex: Saco de 25 kg, Garrafa de 1 litro',
				),
			),
			'location'              => array(
				array(
					array(
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'productos',
					),
				),
			),
			'menu_order'            => 0,
			'position'              => 'normal',
			'style'                 => 'default',
			'label_placement'       => 'top',
			'instruction_placement' => 'label',
			'hide_on_screen'        => '',
			'active'                => true,
			'description'           => 'Campos multiidioma para productos PRILABSA',
			'show_in_rest'          => 1,
		)
	);
}

/**
 * Expose ACF fields to REST API for 'productos' post type
 */
add_action(
	'rest_api_init',
	function () {
		// Register multiidioma fields
		$multiidioma_fields = array(
			'descripcion_es',
			'descripcion_en',
			'descripcion_pt',
			'beneficios_es',
			'beneficios_en',
			'beneficios_pt',
			'presentacion_es',
			'presentacion_en',
			'presentacion_pt',
		);

		foreach ( $multiidioma_fields as $field_name ) {
			register_rest_field(
				'productos',
				$field_name,
				array(
					'get_callback'    => function ( $object ) use ( $field_name ) {
						return get_field( $field_name, $object['id'] );
					},
					'update_callback' => function ( $value, $object ) use ( $field_name ) {
						return update_field( $field_name, $value, $object->ID );
					},
					'schema'          => array(
						'description' => "Campo ACF: {$field_name}",
						'type'        => 'string',
						'context'     => array( 'view', 'edit' ),
					),
				)
			);
		}
	}
);
