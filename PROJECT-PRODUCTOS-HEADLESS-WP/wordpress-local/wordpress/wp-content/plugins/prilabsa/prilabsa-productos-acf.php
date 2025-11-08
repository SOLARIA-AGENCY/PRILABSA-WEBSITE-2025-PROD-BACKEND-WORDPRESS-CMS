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
				// Nombre del Producto Español
				array(
					'key'               => 'field_productos_nombre_es',
					'label'             => 'Nombre del Producto',
					'name'              => 'nombre_producto_es',
					'type'              => 'text',
					'instructions'      => 'Nombre comercial del producto en español',
					'required'          => 1,
					'maxlength'         => 200,
					'placeholder'       => 'Ej: Probiótico Premium Plus',
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
				// Beneficio 1 Español
				array(
					'key'               => 'field_productos_beneficio_1_es',
					'label'             => 'Beneficio 1',
					'name'              => 'beneficio_1_es',
					'type'              => 'text',
					'instructions'      => 'Primer beneficio principal del producto',
					'required'          => 0,
					'maxlength'         => 200,
					'placeholder'       => 'Ej: Mejora la salud intestinal',
				),
				// Beneficio 2 Español
				array(
					'key'               => 'field_productos_beneficio_2_es',
					'label'             => 'Beneficio 2',
					'name'              => 'beneficio_2_es',
					'type'              => 'text',
					'instructions'      => 'Segundo beneficio principal del producto',
					'required'          => 0,
					'maxlength'         => 200,
					'placeholder'       => 'Ej: Aumenta la tasa de conversión alimenticia',
				),
				// Beneficio 3 Español
				array(
					'key'               => 'field_productos_beneficio_3_es',
					'label'             => 'Beneficio 3',
					'name'              => 'beneficio_3_es',
					'type'              => 'text',
					'instructions'      => 'Tercer beneficio principal del producto',
					'required'          => 0,
					'maxlength'         => 200,
					'placeholder'       => 'Ej: Reduce la mortalidad',
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
				// Nombre del Producto Inglés
				array(
					'key'               => 'field_productos_nombre_en',
					'label'             => 'Product Name',
					'name'              => 'nombre_producto_en',
					'type'              => 'text',
					'instructions'      => 'Commercial product name in English',
					'required'          => 1,
					'maxlength'         => 200,
					'placeholder'       => 'Ex: Premium Plus Probiotic',
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
				// Beneficio 1 Inglés
				array(
					'key'               => 'field_productos_beneficio_1_en',
					'label'             => 'Benefit 1',
					'name'              => 'beneficio_1_en',
					'type'              => 'text',
					'instructions'      => 'First main product benefit',
					'required'          => 0,
					'maxlength'         => 200,
					'placeholder'       => 'Ex: Improves intestinal health',
				),
				// Beneficio 2 Inglés
				array(
					'key'               => 'field_productos_beneficio_2_en',
					'label'             => 'Benefit 2',
					'name'              => 'beneficio_2_en',
					'type'              => 'text',
					'instructions'      => 'Second main product benefit',
					'required'          => 0,
					'maxlength'         => 200,
					'placeholder'       => 'Ex: Increases feed conversion rate',
				),
				// Beneficio 3 Inglés
				array(
					'key'               => 'field_productos_beneficio_3_en',
					'label'             => 'Benefit 3',
					'name'              => 'beneficio_3_en',
					'type'              => 'text',
					'instructions'      => 'Third main product benefit',
					'required'          => 0,
					'maxlength'         => 200,
					'placeholder'       => 'Ex: Reduces mortality',
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
				// Nombre del Producto Portugués
				array(
					'key'               => 'field_productos_nombre_pt',
					'label'             => 'Nome do Produto',
					'name'              => 'nombre_producto_pt',
					'type'              => 'text',
					'instructions'      => 'Nome comercial do produto em português',
					'required'          => 1,
					'maxlength'         => 200,
					'placeholder'       => 'Ex: Probiótico Premium Plus',
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
				// Beneficio 1 Portugués
				array(
					'key'               => 'field_productos_beneficio_1_pt',
					'label'             => 'Benefício 1',
					'name'              => 'beneficio_1_pt',
					'type'              => 'text',
					'instructions'      => 'Primeiro benefício principal do produto',
					'required'          => 0,
					'maxlength'         => 200,
					'placeholder'       => 'Ex: Melhora a saúde intestinal',
				),
				// Beneficio 2 Portugués
				array(
					'key'               => 'field_productos_beneficio_2_pt',
					'label'             => 'Benefício 2',
					'name'              => 'beneficio_2_pt',
					'type'              => 'text',
					'instructions'      => 'Segundo benefício principal do produto',
					'required'          => 0,
					'maxlength'         => 200,
					'placeholder'       => 'Ex: Aumenta a taxa de conversão alimentar',
				),
				// Beneficio 3 Portugués
				array(
					'key'               => 'field_productos_beneficio_3_pt',
					'label'             => 'Benefício 3',
					'name'              => 'beneficio_3_pt',
					'type'              => 'text',
					'instructions'      => 'Terceiro benefício principal do produto',
					'required'          => 0,
					'maxlength'         => 200,
					'placeholder'       => 'Ex: Reduz a mortalidade',
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
			// Nombres de producto
			'nombre_producto_es',
			'nombre_producto_en',
			'nombre_producto_pt',
			// Descripciones
			'descripcion_es',
			'descripcion_en',
			'descripcion_pt',
			// Beneficios (3 campos separados por idioma)
			'beneficio_1_es',
			'beneficio_2_es',
			'beneficio_3_es',
			'beneficio_1_en',
			'beneficio_2_en',
			'beneficio_3_en',
			'beneficio_1_pt',
			'beneficio_2_pt',
			'beneficio_3_pt',
			// Presentaciones
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
