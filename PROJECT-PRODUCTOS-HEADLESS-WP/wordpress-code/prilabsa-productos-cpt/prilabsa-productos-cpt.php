<?php
/**
 * Plugin Name: PRILABSA Productos Custom Post Type
 * Plugin URI: https://www.prilabsa.com
 * Description: Custom Post Type para productos de PRILABSA con taxonomías y configuración REST API optimizada
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
 * Main Plugin Class
 */
class PRILABSA_Productos_CPT {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'register_post_type' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_action( 'rest_api_init', array( $this, 'add_rest_support' ) );
		add_filter( 'rest_prepare_producto', array( $this, 'prepare_producto_rest' ), 10, 3 );
	}

	/**
	 * Register Custom Post Type
	 */
	public function register_post_type() {
		$labels = array(
			'name'                  => _x( 'Productos', 'Post type general name', 'prilabsa' ),
			'singular_name'         => _x( 'Producto', 'Post type singular name', 'prilabsa' ),
			'menu_name'             => _x( 'Productos', 'Admin Menu text', 'prilabsa' ),
			'name_admin_bar'         => _x( 'Producto', 'Add New on Toolbar', 'prilabsa' ),
			'add_new'               => __( 'Añadir nuevo', 'prilabsa' ),
			'add_new_item'          => __( 'Añadir nuevo producto', 'prilabsa' ),
			'new_item'              => __( 'Nuevo producto', 'prilabsa' ),
			'edit_item'             => __( 'Editar producto', 'prilabsa' ),
			'view_item'             => __( 'Ver producto', 'prilabsa' ),
			'all_items'             => __( 'Todos los productos', 'prilabsa' ),
			'search_items'          => __( 'Buscar productos', 'prilabsa' ),
			'parent_item_colon'      => __( 'Producto padre:', 'prilabsa' ),
			'not_found'             => __( 'No se encontraron productos.', 'prilabsa' ),
			'not_found_in_trash'    => __( 'No se encontraron productos en la papelera.', 'prilabsa' ),
			'featured_image'        => _x( 'Imagen del producto', 'Overrides the "Featured Image" phrase for this post type.', 'prilabsa' ),
			'set_featured_image'     => _x( 'Establecer imagen del producto', 'Overrides the "Set featured image" phrase for this post type.', 'prilabsa' ),
			'remove_featured_image'  => _x( 'Eliminar imagen del producto', 'Overrides the "Remove featured image" phrase for this post type.', 'prilabsa' ),
			'use_featured_image'     => _x( 'Usar como imagen del producto', 'Overrides the "Use as featured image" phrase for this post type.', 'prilabsa' ),
			'archives'              => _x( 'Archivo de productos', 'The post type archive label used in nav menus.', 'prilabsa' ),
			'insert_into_item'      => _x( 'Insertar en producto', 'Overrides the "Insert into post" phrase. Used in the media frame.', 'prilabsa' ),
			'uploaded_to_this_item'  => _x( 'Subidos a este producto', 'Overrides the "Uploaded to this post" phrase. Used in the media frame.', 'prilabsa' ),
			'filter_items_list'     => _x( 'Filtrar lista de productos', 'Screen reader text for the filter links heading on the post type listing screen.', 'prilabsa' ),
			'items_list_navigation'  => _x( 'Navegación de lista de productos', 'Screen reader text for the pagination heading on the post type listing screen.', 'prilabsa' ),
			'items_list'            => _x( 'Lista de productos', 'Screen reader text for the items list heading on the post type listing screen.', 'prilabsa' ),
		);

		$args = array(
			'labels'             => $labels,
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'query_var'          => true,
			'rewrite'            => array( 'slug' => 'producto' ),
			'capability_type'     => 'post',
			'has_archive'        => true,
			'hierarchical'       => false,
			'menu_position'      => 5,
			'menu_icon'          => 'dashicons-cart',
			'supports'           => array( 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields' ),
			'show_in_rest'       => true,
			'rest_base'          => 'productos',
			'rest_controller_class' => 'WP_REST_Posts_Controller',
		);

		register_post_type( 'producto', $args );
	}

	/**
	 * Register Taxonomies
	 */
	public function register_taxonomies() {
		// Categoría de Producto
		$labels_categoria = array(
			'name'              => _x( 'Categorías de Productos', 'taxonomy general name', 'prilabsa' ),
			'singular_name'     => _x( 'Categoría de Producto', 'taxonomy singular name', 'prilabsa' ),
			'search_items'      => __( 'Buscar Categorías de Productos', 'prilabsa' ),
			'all_items'         => __( 'Todas las Categorías de Productos', 'prilabsa' ),
			'parent_item'       => __( 'Categoría padre', 'prilabsa' ),
			'parent_item_colon' => __( 'Categoría padre:', 'prilabsa' ),
			'edit_item'         => __( 'Editar Categoría de Producto', 'prilabsa' ),
			'update_item'       => __( 'Actualizar Categoría de Producto', 'prilabsa' ),
			'add_new_item'      => __( 'Añadir nueva Categoría de Producto', 'prilabsa' ),
			'new_item_name'     => __( 'Nombre nueva Categoría de Producto', 'prilabsa' ),
			'menu_name'         => __( 'Categorías de Productos', 'prilabsa' ),
		);

		$args_categoria = array(
			'labels'            => $labels_categoria,
			'hierarchical'      => true,
			'public'            => true,
			'show_ui'           => true,
			'show_admin_column'  => true,
			'query_var'         => true,
			'rewrite'           => array( 'slug' => 'categoria-producto' ),
			'show_in_rest'      => true,
		);

		register_taxonomy( 'categoria_producto', array( 'producto' ), $args_categoria );

		// Tipo de Producto
		$labels_tipo = array(
			'name'              => _x( 'Tipos de Productos', 'taxonomy general name', 'prilabsa' ),
			'singular_name'     => _x( 'Tipo de Producto', 'taxonomy singular name', 'prilabsa' ),
			'search_items'      => __( 'Buscar Tipos de Productos', 'prilabsa' ),
			'all_items'         => __( 'Todos los Tipos de Productos', 'prilabsa' ),
			'parent_item'       => __( 'Tipo padre', 'prilabsa' ),
			'parent_item_colon' => __( 'Tipo padre:', 'prilabsa' ),
			'edit_item'         => __( 'Editar Tipo de Producto', 'prilabsa' ),
			'update_item'       => __( 'Actualizar Tipo de Producto', 'prilabsa' ),
			'add_new_item'      => __( 'Añadir nuevo Tipo de Producto', 'prilabsa' ),
			'new_item_name'     => __( 'Nombre nuevo Tipo de Producto', 'prilabsa' ),
			'menu_name'         => __( 'Tipos de Productos', 'prilabsa' ),
		);

		$args_tipo = array(
			'labels'            => $labels_tipo,
			'hierarchical'      => false,
			'public'            => true,
			'show_ui'           => true,
			'show_admin_column'  => true,
			'query_var'         => true,
			'rewrite'           => array( 'slug' => 'tipo-producto' ),
			'show_in_rest'      => true,
		);

		register_taxonomy( 'tipo_producto', array( 'producto' ), $args_tipo );
	}

	/**
	 * Add REST API Support
	 */
	public function add_rest_support() {
		// Add custom fields to REST API
		register_rest_field( 'producto', 'codigo_producto', array(
			'get_callback'    => array( $this, 'get_codigo_producto' ),
			'update_callback' => array( $this, 'update_codigo_producto' ),
			'schema'          => array(
				'type'        => 'string',
				'description' => 'Código único del producto',
			),
		) );

		register_rest_field( 'producto', 'precio_producto', array(
			'get_callback'    => array( $this, 'get_precio_producto' ),
			'update_callback' => array( $this, 'update_precio_producto' ),
			'schema'          => array(
				'type'        => 'number',
				'description' => 'Precio del producto',
			),
		) );

		register_rest_field( 'producto', 'imagen_producto', array(
			'get_callback'    => array( $this, 'get_imagen_producto' ),
			'update_callback' => array( $this, 'update_imagen_producto' ),
			'schema'          => array(
				'type'        => 'string',
				'description' => 'URL de la imagen del producto',
			),
		) );
	}

	/**
	 * Getters and Setters for REST fields
	 */
	public function get_codigo_producto( $object, $field_name, $request ) {
		return get_post_meta( $object['id'], '_codigo_producto', true );
	}

	public function update_codigo_producto( $value, $object, $field_name ) {
		return update_post_meta( $object->ID, '_codigo_producto', $value );
	}

	public function get_precio_producto( $object, $field_name, $request ) {
		return get_post_meta( $object['id'], '_precio_producto', true );
	}

	public function update_precio_producto( $value, $object, $field_name ) {
		return update_post_meta( $object->ID, '_precio_producto', $value );
	}

	public function get_imagen_producto( $object, $field_name, $request ) {
		return get_post_meta( $object['id'], '_imagen_producto', true );
	}

	public function update_imagen_producto( $value, $object, $field_name ) {
		return update_post_meta( $object->ID, '_imagen_producto', $value );
	}

	/**
	 * Prepare REST response
	 */
	public function prepare_producto_rest( $response, $post, $request ) {
		// Add custom data to response
		$response->data['codigo_producto'] = get_post_meta( $post->ID, '_codigo_producto', true );
		$response->data['precio_producto'] = get_post_meta( $post->ID, '_precio_producto', true );
		$response->data['imagen_producto'] = get_post_meta( $post->ID, '_imagen_producto', true );
		
		return $response;
	}
}

// Initialize the plugin
new PRILABSA_Productos_CPT();