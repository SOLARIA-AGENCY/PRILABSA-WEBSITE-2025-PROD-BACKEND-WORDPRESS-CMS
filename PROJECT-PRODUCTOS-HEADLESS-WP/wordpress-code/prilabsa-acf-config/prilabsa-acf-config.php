<?php
/**
 * Plugin Name: PRILABSA ACF Configuration
 * Plugin URI: https://www.prilabsa.com
 * Description: Advanced Custom Fields configuration para productos PRILABSA con exposición REST API completa
 * Version: 1.0.0
 * Author: SOLARIA AGENCY
 * Author URI: https://www.solaria.agency
 * License: GPL v2 or later
 * Text Domain: prilabsa
 */

// Security: Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Main ACF Configuration Class
 */
class PRILABSA_ACF_Config {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'acf/init', array( $this, 'register_fields' ) );
		add_action( 'acf/init', array( $this, 'register_options_page' ) );
		add_action( 'rest_api_init', array( $this, 'add_acf_to_rest' ) );
	}

	/**
	 * Register ACF Fields
	 */
	public function register_fields() {
		if ( function_exists( 'acf_add_local_field_group' ) ) {
			acf_add_local_field_group( array(
				'key' => 'group_prilabsa_producto',
				'title' => 'Información del Producto PRILABSA',
				'fields' => array(
					array(
						'key' => 'field_codigo_producto',
						'label' => 'Código del Producto',
						'name' => 'codigo_producto',
						'type' => 'text',
						'required' => 1,
						'placeholder' => 'Ej: LAB-001',
						'instructions' => 'Código único del producto',
					),
					array(
						'key' => 'field_precio_producto',
						'label' => 'Precio',
						'name' => 'precio_producto',
						'type' => 'number',
						'required' => 1,
						'placeholder' => '0.00',
						'instructions' => 'Precio del producto',
						'step' => '0.01',
						'prepend' => '$',
					),
					array(
						'key' => 'field_imagen_producto',
						'label' => 'Imagen del Producto',
						'name' => 'imagen_producto',
						'type' => 'image',
						'required' => 0,
						'return_format' => 'url',
						'preview_size' => 'thumbnail',
						'instructions' => 'Imagen principal del producto',
					),
					array(
						'key' => 'field_ficha_tecnica',
						'label' => 'Ficha Técnica',
						'name' => 'ficha_tecnica',
						'type' => 'file',
						'required' => 0,
						'return_format' => 'url',
						'instructions' => 'PDF con ficha técnica del producto',
					),
					array(
						'key' => 'field_categoria_especifica',
						'label' => 'Categoría Específica',
						'name' => 'categoria_especifica',
						'type' => 'select',
						'required' => 1,
						'choices' => array(
							'equipos' => 'Equipos',
							'quimicos' => 'Químicos',
							'materiales' => 'Materiales',
						),
						'default_value' => 'equipos',
						'instructions' => 'Seleccione la categoría principal del producto',
					),
					array(
						'key' => 'field_stock',
						'label' => 'Stock',
						'name' => 'stock',
						'type' => 'number',
						'required' => 0,
						'placeholder' => '0',
						'instructions' => 'Cantidad disponible en stock',
					),
					array(
						'key' => 'field_destacado',
						'label' => 'Producto Destacado',
						'name' => 'destacado',
						'type' => 'true_false',
						'required' => 0,
						'default_value' => 0,
						'instructions' => 'Marcar como producto destacado',
					),
				),
				'location' => array(
					array(
						array(
							'param' => 'post_type',
							'operator' => '==',
							'value' => 'producto',
						),
					),
				),
				'menu_order' => 0,
				'position' => 'normal',
				'style' => 'default',
				'label_placement' => 'top',
				'instruction_placement' => 'label',
				'hide_on_screen' => array(
					0 => 'the_content',
				),
			) );
		}
	}

	/**
	 * Register Options Page
	 */
	public function register_options_page() {
		if ( function_exists( 'acf_add_options_page' ) ) {
			acf_add_options_page( array(
				'page_title'  => 'Configuración PRILABSA',
				'menu_title'  => 'PRILABSA',
				'menu_slug'   => 'prilabsa-config',
				'capability'  => 'manage_options',
				'redirect'    => false,
				'parent_slug' => 'edit.php?post_type=producto',
			) );
		}
	}

	/**
	 * Add ACF fields to REST API
	 */
	public function add_acf_to_rest() {
		// Add ACF fields to REST API for productos
		register_rest_field( 'producto', 'acf', array(
			'get_callback'    => array( $this, 'get_acf_fields' ),
			'update_callback' => null,
			'schema'          => null,
		) );
	}

	/**
	 * Get ACF fields for REST API
	 */
	public function get_acf_fields( $object, $field_name, $request ) {
		$fields = get_fields( $object['id'] );
		return $fields;
	}
}

// Initialize the plugin
new PRILABSA_ACF_Config();