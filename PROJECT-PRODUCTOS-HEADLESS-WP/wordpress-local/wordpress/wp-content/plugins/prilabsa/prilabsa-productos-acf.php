<?php
/**
 * PRILABSA Productos ACF Configuration
 *
 * Advanced Custom Fields para Productos con exposición REST API completa
 * Organización en 3 columnas (ES/EN/PT) para visualización simultánea
 *
 * @package PRILABSA_Productos_ACF
 * @author SOLARIA AGENCY
 * @version 2.0.0
 */

// Security: Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register ACF Field Group for Productos (3 Column Layout)
 */
if ( function_exists( 'acf_add_local_field_group' ) ) {
	acf_add_local_field_group(
		array(
			'key'                   => 'group_prilabsa_productos',
			'title'                 => 'Información del Producto (Multiidioma)',
			'fields'                => array(

				// ========================================
				// FILA 1: NOMBRES (3 columnas)
				// ========================================
				array(
					'key'               => 'field_productos_nombre_es',
					'label'             => '🇪🇸 Nombre del Producto',
					'name'              => 'nombre_producto_es',
					'type'              => 'text',
					'instructions'      => 'Nombre comercial en español',
					'required'          => 1,
					'maxlength'         => 200,
					'placeholder'       => 'Ej: Probiótico Premium Plus',
					'wrapper'           => array( 'width' => '33.33' ),
				),
				array(
					'key'               => 'field_productos_nombre_en',
					'label'             => '🇬🇧 Product Name',
					'name'              => 'nombre_producto_en',
					'type'              => 'text',
					'instructions'      => 'Commercial name in English',
					'required'          => 1,
					'maxlength'         => 200,
					'placeholder'       => 'Ex: Premium Plus Probiotic',
					'wrapper'           => array( 'width' => '33.33' ),
				),
				array(
					'key'               => 'field_productos_nombre_pt',
					'label'             => '🇵🇹 Nome do Produto',
					'name'              => 'nombre_producto_pt',
					'type'              => 'text',
					'instructions'      => 'Nome comercial em português',
					'required'          => 1,
					'maxlength'         => 200,
					'placeholder'       => 'Ex: Probiótico Premium Plus',
					'wrapper'           => array( 'width' => '33.33' ),
				),

				// ========================================
				// FILA 2: DESCRIPCIONES (3 columnas)
				// ========================================
				array(
					'key'               => 'field_productos_descripcion_es',
					'label'             => '🇪🇸 Descripción',
					'name'              => 'descripcion_es',
					'type'              => 'textarea',
					'instructions'      => 'Descripción completa en español',
					'required'          => 1,
					'rows'              => 6,
					'maxlength'         => 2000,
					'placeholder'       => 'Describe el producto, características principales y usos...',
					'wrapper'           => array( 'width' => '33.33' ),
				),
				array(
					'key'               => 'field_productos_descripcion_en',
					'label'             => '🇬🇧 Description',
					'name'              => 'descripcion_en',
					'type'              => 'textarea',
					'instructions'      => 'Complete description in English',
					'required'          => 1,
					'rows'              => 6,
					'maxlength'         => 2000,
					'placeholder'       => 'Describe the product, main features and uses...',
					'wrapper'           => array( 'width' => '33.33' ),
				),
				array(
					'key'               => 'field_productos_descripcion_pt',
					'label'             => '🇵🇹 Descrição',
					'name'              => 'descripcion_pt',
					'type'              => 'textarea',
					'instructions'      => 'Descrição completa em português',
					'required'          => 1,
					'rows'              => 6,
					'maxlength'         => 2000,
					'placeholder'       => 'Descreva o produto, características principais e usos...',
					'wrapper'           => array( 'width' => '33.33' ),
				),

				// ========================================
				// FILA 3: BENEFICIO 1 (3 columnas)
				// ========================================
				array(
					'key'               => 'field_productos_beneficio_1_es',
					'label'             => '🇪🇸 Beneficio 1',
					'name'              => 'beneficio_1_es',
					'type'              => 'text',
					'instructions'      => 'Primer beneficio principal',
					'required'          => 0,
					'maxlength'         => 200,
					'placeholder'       => 'Ej: Mejora la salud intestinal',
					'wrapper'           => array( 'width' => '33.33' ),
				),
				array(
					'key'               => 'field_productos_beneficio_1_en',
					'label'             => '🇬🇧 Benefit 1',
					'name'              => 'beneficio_1_en',
					'type'              => 'text',
					'instructions'      => 'First main benefit',
					'required'          => 0,
					'maxlength'         => 200,
					'placeholder'       => 'Ex: Improves intestinal health',
					'wrapper'           => array( 'width' => '33.33' ),
				),
				array(
					'key'               => 'field_productos_beneficio_1_pt',
					'label'             => '🇵🇹 Benefício 1',
					'name'              => 'beneficio_1_pt',
					'type'              => 'text',
					'instructions'      => 'Primeiro benefício principal',
					'required'          => 0,
					'maxlength'         => 200,
					'placeholder'       => 'Ex: Melhora a saúde intestinal',
					'wrapper'           => array( 'width' => '33.33' ),
				),

				// ========================================
				// FILA 4: BENEFICIO 2 (3 columnas)
				// ========================================
				array(
					'key'               => 'field_productos_beneficio_2_es',
					'label'             => '🇪🇸 Beneficio 2',
					'name'              => 'beneficio_2_es',
					'type'              => 'text',
					'instructions'      => 'Segundo beneficio principal',
					'required'          => 0,
					'maxlength'         => 200,
					'placeholder'       => 'Ej: Aumenta la tasa de conversión alimenticia',
					'wrapper'           => array( 'width' => '33.33' ),
				),
				array(
					'key'               => 'field_productos_beneficio_2_en',
					'label'             => '🇬🇧 Benefit 2',
					'name'              => 'beneficio_2_en',
					'type'              => 'text',
					'instructions'      => 'Second main benefit',
					'required'          => 0,
					'maxlength'         => 200,
					'placeholder'       => 'Ex: Increases feed conversion rate',
					'wrapper'           => array( 'width' => '33.33' ),
				),
				array(
					'key'               => 'field_productos_beneficio_2_pt',
					'label'             => '🇵🇹 Benefício 2',
					'name'              => 'beneficio_2_pt',
					'type'              => 'text',
					'instructions'      => 'Segundo benefício principal',
					'required'          => 0,
					'maxlength'         => 200,
					'placeholder'       => 'Ex: Aumenta a taxa de conversão alimentar',
					'wrapper'           => array( 'width' => '33.33' ),
				),

				// ========================================
				// FILA 5: BENEFICIO 3 (3 columnas)
				// ========================================
				array(
					'key'               => 'field_productos_beneficio_3_es',
					'label'             => '🇪🇸 Beneficio 3',
					'name'              => 'beneficio_3_es',
					'type'              => 'text',
					'instructions'      => 'Tercer beneficio principal',
					'required'          => 0,
					'maxlength'         => 200,
					'placeholder'       => 'Ej: Reduce la mortalidad',
					'wrapper'           => array( 'width' => '33.33' ),
				),
				array(
					'key'               => 'field_productos_beneficio_3_en',
					'label'             => '🇬🇧 Benefit 3',
					'name'              => 'beneficio_3_en',
					'type'              => 'text',
					'instructions'      => 'Third main benefit',
					'required'          => 0,
					'maxlength'         => 200,
					'placeholder'       => 'Ex: Reduces mortality',
					'wrapper'           => array( 'width' => '33.33' ),
				),
				array(
					'key'               => 'field_productos_beneficio_3_pt',
					'label'             => '🇵🇹 Benefício 3',
					'name'              => 'beneficio_3_pt',
					'type'              => 'text',
					'instructions'      => 'Terceiro benefício principal',
					'required'          => 0,
					'maxlength'         => 200,
					'placeholder'       => 'Ex: Reduz a mortalidade',
					'wrapper'           => array( 'width' => '33.33' ),
				),

				// ========================================
				// FILA 6: PRESENTACIÓN (3 columnas)
				// ========================================
				array(
					'key'               => 'field_productos_presentacion_es',
					'label'             => '🇪🇸 Presentación',
					'name'              => 'presentacion_es',
					'type'              => 'text',
					'instructions'      => 'Formato de presentación',
					'required'          => 0,
					'maxlength'         => 200,
					'placeholder'       => 'Ej: Saco de 25 kg, Botella de 1 litro',
					'wrapper'           => array( 'width' => '33.33' ),
				),
				array(
					'key'               => 'field_productos_presentacion_en',
					'label'             => '🇬🇧 Presentation',
					'name'              => 'presentacion_en',
					'type'              => 'text',
					'instructions'      => 'Presentation format',
					'required'          => 0,
					'maxlength'         => 200,
					'placeholder'       => 'Ex: 25 kg bag, 1 liter bottle',
					'wrapper'           => array( 'width' => '33.33' ),
				),
				array(
					'key'               => 'field_productos_presentacion_pt',
					'label'             => '🇵🇹 Apresentação',
					'name'              => 'presentacion_pt',
					'type'              => 'text',
					'instructions'      => 'Formato de apresentação',
					'required'          => 0,
					'maxlength'         => 200,
					'placeholder'       => 'Ex: Saco de 25 kg, Garrafa de 1 litro',
					'wrapper'           => array( 'width' => '33.33' ),
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
			'description'           => 'Campos multiidioma organizados en 3 columnas (ES/EN/PT)',
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
