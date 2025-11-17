<?php
/**
 * Plugin Name: PRILABSA REST API Custom Endpoints
 * Plugin URI: https://www.prilabsa.com
 * Description: Endpoints personalizados para la API REST de productos PRILABSA
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
 * Main REST API Class
 */
class PRILABSA_REST_API {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Register REST Routes
	 */
	public function register_routes() {
		// Register namespace
		register_rest_route( 'prilabsa/v1', '/productos', array(
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_productos' ),
				'permission_callback' => array( $this, 'check_permissions' ),
			),
		) );

		register_rest_route( 'prilabsa/v1', '/productos/(?P<id>\d+)', array(
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_producto' ),
				'permission_callback' => array( $this, 'check_permissions' ),
			),
		) );

		register_rest_route( 'prilabsa/v1', '/productos/search', array(
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'search_productos' ),
				'permission_callback' => array( $this, 'check_permissions' ),
			),
		) );

		register_rest_route( 'prilabsa/v1', '/categorias', array(
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_categorias' ),
				'permission_callback' => array( $this, 'check_permissions' ),
			),
		) );

		register_rest_route( 'prilabsa/v1', '/import/productos', array(
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'import_productos' ),
				'permission_callback' => array( $this, 'import_permissions' ),
			),
		) );
	}

	/**
	 * Check permissions
	 */
	public function check_permissions( $request ) {
		// Allow public access for GET requests
		if ( $request->get_method() === WP_REST_Server::READABLE ) {
			return true;
		}
		
		return current_user_can( 'edit_posts' );
	}

	/**
	 * Import permissions
	 */
	public function import_permissions( $request ) {
		return current_user_can( 'manage_options' );
	}

	/**
	 * Get all productos
	 */
	public function get_productos( $request ) {
		$args = array(
			'post_type'      => 'producto',
			'posts_per_page' => $request->get_param( 'per_page' ) ?: 10,
			'paged'         => $request->get_param( 'page' ) ?: 1,
			'post_status'    => 'publish',
		);

		// Filter by categoria
		if ( $request->get_param( 'categoria' ) ) {
			$args['tax_query'] = array(
				array(
					'taxonomy' => 'categoria_producto',
					'field'    => 'slug',
					'terms'    => $request->get_param( 'categoria' ),
				),
			);
		}

		// Filter by tipo
		if ( $request->get_param( 'tipo' ) ) {
			$args['tax_query'][] = array(
				'taxonomy' => 'tipo_producto',
				'field'    => 'slug',
				'terms'    => $request->get_param( 'tipo' ),
			);
		}

		$query = new WP_Query( $args );
		$productos = array();

		foreach ( $query->posts as $post ) {
			$productos[] = $this->prepare_producto_data( $post );
		}

		$response = new WP_REST_Response( $productos, 200 );
		
		// Add pagination headers
		$response->header( 'X-WP-Total', $query->found_posts );
		$response->header( 'X-WP-TotalPages', $query->max_num_pages );

		return $response;
	}

	/**
	 * Get single producto
	 */
	public function get_producto( $request ) {
		$post_id = $request->get_param( 'id' );
		$post = get_post( $post_id );

		if ( ! $post || $post->post_type !== 'producto' ) {
			return new WP_Error( 'not_found', 'Producto no encontrado', array( 'status' => 404 ) );
		}

		return $this->prepare_producto_data( $post );
	}

	/**
	 * Search productos
	 */
	public function search_productos( $request ) {
		$search = $request->get_param( 'q' );
		
		$args = array(
			'post_type'      => 'producto',
			'posts_per_page' => $request->get_param( 'per_page' ) ?: 10,
			'post_status'    => 'publish',
			's'              => $search,
		);

		$query = new WP_Query( $args );
		$productos = array();

		foreach ( $query->posts as $post ) {
			$productos[] = $this->prepare_producto_data( $post );
		}

		return new WP_REST_Response( $productos, 200 );
	}

	/**
	 * Get categorias
	 */
	public function get_categorias( $request ) {
		$categorias = get_terms( array(
			'taxonomy'   => 'categoria_producto',
			'hide_empty' => false,
		) );

		$data = array();
		foreach ( $categorias as $categoria ) {
			$data[] = array(
				'id'   => $categoria->term_id,
				'name' => $categoria->name,
				'slug' => $categoria->slug,
			);
		}

		return new WP_REST_Response( $data, 200 );
	}

	/**
	 * Import productos
	 */
	public function import_productos( $request ) {
		$data = $request->get_json_params();

		if ( ! isset( $data['productos'] ) || ! is_array( $data['productos'] ) ) {
			return new WP_Error( 'invalid_data', 'Datos inválidos', array( 'status' => 400 ) );
		}

		$imported = 0;
		$errors   = array();

		foreach ( $data['productos'] as $producto_data ) {
			$result = $this->import_single_producto( $producto_data );
			
			if ( $result['success'] ) {
				$imported++;
			} else {
				$errors[] = $result['error'];
			}
		}

		return new WP_REST_Response( array(
			'imported' => $imported,
			'errors'   => $errors,
		), 200 );
	}

	/**
	 * Import single producto
	 */
	private function import_single_producto( $data ) {
		$post_data = array(
			'post_type'   => 'producto',
			'post_title'  => $data['nombre'] ?? '',
			'post_status' => 'publish',
		);

		$post_id = wp_insert_post( $post_data );

		if ( ! $post_id ) {
			return array( 'success' => false, 'error' => 'Error al crear producto: ' . $data['nombre'] );
		}

		// Save custom fields
		if ( isset( $data['codigo'] ) ) {
			update_post_meta( $post_id, '_codigo_producto', sanitize_text_field( $data['codigo'] ) );
		}

		if ( isset( $data['precio'] ) ) {
			update_post_meta( $post_id, '_precio_producto', floatval( $data['precio'] ) );
		}

		if ( isset( $data['imagen'] ) ) {
			update_post_meta( $post_id, '_imagen_producto', esc_url_raw( $data['imagen'] ) );
		}

		// Set categories
		if ( isset( $data['categorias'] ) && is_array( $data['categorias'] ) ) {
			wp_set_post_terms( $post_id, $data['categorias'], 'categoria_producto' );
		}

		return array( 'success' => true, 'post_id' => $post_id );
	}

	/**
	 * Prepare producto data for response
	 */
	private function prepare_producto_data( $post ) {
		$acf_fields = function_exists( 'get_fields' ) ? get_fields( $post->ID ) : array();
		
		return array(
			'id'               => $post->ID,
			'title'            => $post->post_title,
			'content'          => $post->post_content,
			'excerpt'          => $post->post_excerpt,
			'slug'             => $post->post_name,
			'status'           => $post->post_status,
			'date'             => $post->post_date,
			'modified'         => $post->post_modified,
			'featured_image'    => get_the_post_thumbnail_url( $post->ID, 'full' ),
			'categorias'       => wp_get_post_terms( $post->ID, 'categoria_producto' ),
			'tipos'            => wp_get_post_terms( $post->ID, 'tipo_producto' ),
			'acf'              => $acf_fields,
		);
	}
}

// Initialize the plugin
new PRILABSA_REST_API();