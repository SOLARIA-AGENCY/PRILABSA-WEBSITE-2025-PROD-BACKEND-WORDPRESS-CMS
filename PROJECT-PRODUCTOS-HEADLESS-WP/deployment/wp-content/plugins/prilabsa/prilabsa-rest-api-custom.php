<?php
/**
 * PRILABSA REST API Custom Endpoints Module
 *
 * Custom REST API endpoints y mejoras para productos PRILABSA con CORS, JWT y optimizaciones
 * This file is loaded by the main PRILABSA plugin
 *
 * @package PRILABSA_REST_API
 * @author SOLARIA AGENCY
 * @link https://www.solaria.agency
 * @version 1.0.0
 */

// Security: Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Main REST API Custom Class
 */
class PRILABSA_REST_API_Custom {

	/**
	 * Plugin version
	 *
	 * @var string
	 */
	const VERSION = '1.0.0';

	/**
	 * API namespace
	 *
	 * @var string
	 */
	const API_NAMESPACE = 'prilabsa/v1';

	/**
	 * Singleton instance
	 *
	 * @var PRILABSA_REST_API_Custom
	 */
	private static $instance = null;

	/**
	 * Get singleton instance
	 *
	 * @return PRILABSA_REST_API_Custom
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor - Initialize plugin
	 */
	private function __construct() {
		$this->init_hooks();
	}

	/**
	 * Initialize WordPress hooks
	 */
	private function init_hooks() {
		// Register custom REST API routes
		add_action( 'rest_api_init', array( $this, 'register_custom_endpoints' ) );

		// CORS handling
		add_action( 'rest_api_init', array( $this, 'setup_cors' ) );
		add_filter( 'rest_pre_serve_request', array( $this, 'add_cors_headers' ) );

		// JWT Authentication hooks (if JWT plugin is installed)
		add_filter( 'jwt_auth_token_before_dispatch', array( $this, 'customize_jwt_response' ), 10, 2 );

		// Optimize REST API responses
		add_filter( 'rest_productos_query', array( $this, 'optimize_productos_query' ), 10, 2 );

		// Add custom query parameters
		add_filter( 'rest_productos_collection_params', array( $this, 'add_custom_collection_params' ), 10, 1 );

		// Cache control headers
		add_filter( 'rest_post_dispatch', array( $this, 'add_cache_headers' ), 10, 3 );

		// Load text domain
		add_action( 'init', array( $this, 'load_textdomain' ) );
	}

	/**
	 * Load plugin text domain
	 */
	public function load_textdomain() {
		load_plugin_textdomain(
			'prilabsa-rest-api',
			false,
			dirname( plugin_basename( __FILE__ ) ) . '/languages'
		);
	}

	/**
	 * Register custom REST API endpoints
	 */
	public function register_custom_endpoints() {
		// Endpoint: Get all productos with enhanced data
		register_rest_route(
			self::API_NAMESPACE,
			'/productos',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_productos_enhanced' ),
				'permission_callback' => '__return_true',
				'args'                => $this->get_productos_args(),
			)
		);

		// Endpoint: Get single producto by ID or codigo
		register_rest_route(
			self::API_NAMESPACE,
			'/productos/(?P<identifier>[a-zA-Z0-9-_]+)',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_producto_by_identifier' ),
				'permission_callback' => '__return_true',
				'args'                => array(
					'identifier' => array(
						'description'       => __( 'ID del producto o código único', 'prilabsa-rest-api' ),
						'type'              => 'string',
						'required'          => true,
						'sanitize_callback' => 'sanitize_text_field',
					),
				),
			)
		);

		// Endpoint: Search productos
		register_rest_route(
			self::API_NAMESPACE,
			'/productos/search',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'search_productos' ),
				'permission_callback' => '__return_true',
				'args'                => array(
					'query' => array(
						'description'       => __( 'Término de búsqueda', 'prilabsa-rest-api' ),
						'type'              => 'string',
						'required'          => true,
						'sanitize_callback' => 'sanitize_text_field',
						'validate_callback' => function( $param ) {
							return strlen( $param ) >= 2;
						},
					),
					'per_page' => array(
						'description'       => __( 'Resultados por página', 'prilabsa-rest-api' ),
						'type'              => 'integer',
						'default'           => 10,
						'minimum'           => 1,
						'maximum'           => 100,
						'sanitize_callback' => 'absint',
					),
				),
			)
		);

		// Endpoint: Get productos by category
		register_rest_route(
			self::API_NAMESPACE,
			'/productos/categoria/(?P<categoria>[a-z]+)',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_productos_by_categoria' ),
				'permission_callback' => '__return_true',
				'args'                => array(
					'categoria' => array(
						'description'       => __( 'Categoría del producto', 'prilabsa-rest-api' ),
						'type'              => 'string',
						'required'          => true,
						'enum'              => array( 'aditivos', 'alimentos', 'equipos', 'probioticos', 'quimicos' ),
						'sanitize_callback' => 'sanitize_text_field',
					),
					'per_page' => array(
						'description'       => __( 'Resultados por página', 'prilabsa-rest-api' ),
						'type'              => 'integer',
						'default'           => 20,
						'sanitize_callback' => 'absint',
					),
				),
			)
		);

		// Endpoint: Get product statistics
		register_rest_route(
			self::API_NAMESPACE,
			'/productos/stats',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_productos_stats' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	/**
	 * Get arguments for productos endpoint
	 *
	 * @return array Endpoint arguments.
	 */
	private function get_productos_args() {
		return array(
			'page'        => array(
				'description'       => __( 'Página actual de resultados', 'prilabsa-rest-api' ),
				'type'              => 'integer',
				'default'           => 1,
				'minimum'           => 1,
				'sanitize_callback' => 'absint',
			),
			'per_page'    => array(
				'description'       => __( 'Resultados por página', 'prilabsa-rest-api' ),
				'type'              => 'integer',
				'default'           => 20,
				'minimum'           => 1,
				'maximum'           => 100,
				'sanitize_callback' => 'absint',
			),
			'categoria'   => array(
				'description'       => __( 'Filtrar por categoría', 'prilabsa-rest-api' ),
				'type'              => 'string',
				'sanitize_callback' => 'sanitize_text_field',
			),
			'orderby'     => array(
				'description'       => __( 'Ordenar por campo', 'prilabsa-rest-api' ),
				'type'              => 'string',
				'default'           => 'date',
				'enum'              => array( 'date', 'title', 'modified', 'codigo' ),
				'sanitize_callback' => 'sanitize_text_field',
			),
			'order'       => array(
				'description'       => __( 'Orden ascendente o descendente', 'prilabsa-rest-api' ),
				'type'              => 'string',
				'default'           => 'DESC',
				'enum'              => array( 'ASC', 'DESC' ),
				'sanitize_callback' => 'sanitize_text_field',
			),
			'include_acf' => array(
				'description' => __( 'Incluir campos ACF en respuesta', 'prilabsa-rest-api' ),
				'type'        => 'boolean',
				'default'     => true,
			),
		);
	}

	/**
	 * Get enhanced productos list
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response Response object.
	 */
	public function get_productos_enhanced( $request ) {
		$page        = $request->get_param( 'page' );
		$per_page    = $request->get_param( 'per_page' );
		$categoria   = $request->get_param( 'categoria' );
		$orderby     = $request->get_param( 'orderby' );
		$order       = $request->get_param( 'order' );
		$include_acf = $request->get_param( 'include_acf' );

		$args = array(
			'post_type'      => 'productos',
			'post_status'    => 'publish',
			'posts_per_page' => $per_page,
			'paged'          => $page,
			'orderby'        => $orderby === 'codigo' ? 'meta_value' : $orderby,
			'order'          => $order,
		);

		// Add meta key for codigo ordering
		if ( 'codigo' === $orderby ) {
			$args['meta_key'] = 'codigo';
		}

		// Filter by category if provided
		if ( ! empty( $categoria ) ) {
			$args['meta_query'] = array(
				array(
					'key'     => 'categoria',
					'value'   => $categoria,
					'compare' => '=',
				),
			);
		}

		$query = new WP_Query( $args );

		$productos = array();
		foreach ( $query->posts as $post ) {
			$productos[] = $this->format_producto_response( $post, $include_acf );
		}

		$response = rest_ensure_response( $productos );

		// Add pagination headers
		$response->header( 'X-WP-Total', $query->found_posts );
		$response->header( 'X-WP-TotalPages', $query->max_num_pages );

		return $response;
	}

	/**
	 * Get producto by ID or codigo
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error Response object or error.
	 */
	public function get_producto_by_identifier( $request ) {
		$identifier = $request->get_param( 'identifier' );

		// Try to get by ID first
		if ( is_numeric( $identifier ) ) {
			$post = get_post( absint( $identifier ) );
		} else {
			// Search by codigo
			$args = array(
				'post_type'      => 'productos',
				'post_status'    => 'publish',
				'posts_per_page' => 1,
				'meta_query'     => array(
					array(
						'key'     => 'codigo',
						'value'   => sanitize_text_field( $identifier ),
						'compare' => '=',
					),
				),
			);

			$query = new WP_Query( $args );
			$post  = $query->have_posts() ? $query->posts[0] : null;
		}

		if ( ! $post || 'productos' !== $post->post_type ) {
			return new WP_Error(
				'producto_not_found',
				__( 'Producto no encontrado', 'prilabsa-rest-api' ),
				array( 'status' => 404 )
			);
		}

		return rest_ensure_response( $this->format_producto_response( $post, true ) );
	}

	/**
	 * Search productos
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response Response object.
	 */
	public function search_productos( $request ) {
		$query_string = $request->get_param( 'query' );
		$per_page     = $request->get_param( 'per_page' );

		$args = array(
			'post_type'      => 'productos',
			'post_status'    => 'publish',
			'posts_per_page' => $per_page,
			's'              => $query_string,
		);

		$query = new WP_Query( $args );

		$productos = array();
		foreach ( $query->posts as $post ) {
			$productos[] = $this->format_producto_response( $post, true );
		}

		$response = rest_ensure_response( $productos );
		$response->header( 'X-WP-Total', $query->found_posts );

		return $response;
	}

	/**
	 * Get productos by categoria
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response Response object.
	 */
	public function get_productos_by_categoria( $request ) {
		$categoria = $request->get_param( 'categoria' );
		$per_page  = $request->get_param( 'per_page' );

		$args = array(
			'post_type'      => 'productos',
			'post_status'    => 'publish',
			'posts_per_page' => $per_page,
			'meta_query'     => array(
				array(
					'key'     => 'categoria',
					'value'   => $categoria,
					'compare' => '=',
				),
			),
		);

		$query = new WP_Query( $args );

		$productos = array();
		foreach ( $query->posts as $post ) {
			$productos[] = $this->format_producto_response( $post, true );
		}

		$response = rest_ensure_response( $productos );
		$response->header( 'X-WP-Total', $query->found_posts );

		return $response;
	}

	/**
	 * Get product statistics
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response Response object.
	 */
	public function get_productos_stats( $request ) {
		$total_productos = wp_count_posts( 'productos' )->publish;

		// Count by category
		$categorias = array( 'aditivos', 'alimentos', 'equipos', 'probioticos', 'quimicos' );
		$stats_by_categoria = array();

		foreach ( $categorias as $categoria ) {
			$args = array(
				'post_type'      => 'productos',
				'post_status'    => 'publish',
				'posts_per_page' => 1,
				'meta_query'     => array(
					array(
						'key'     => 'categoria',
						'value'   => $categoria,
						'compare' => '=',
					),
				),
			);

			$query = new WP_Query( $args );
			$stats_by_categoria[ $categoria ] = $query->found_posts;
		}

		$stats = array(
			'total_productos'    => (int) $total_productos,
			'por_categoria'      => $stats_by_categoria,
			'ultima_actualizacion' => get_lastpostmodified( 'productos' ),
		);

		return rest_ensure_response( $stats );
	}

	/**
	 * Format producto response
	 *
	 * @param WP_Post $post        Post object.
	 * @param bool    $include_acf Include ACF fields.
	 * @return array Formatted producto.
	 */
	private function format_producto_response( $post, $include_acf = true ) {
		$producto = array(
			'id'            => $post->ID,
			'titulo'        => $post->post_title,
			'slug'          => $post->post_name,
			'contenido'     => apply_filters( 'the_content', $post->post_content ),
			'excerpt'       => $post->post_excerpt,
			'fecha'         => $post->post_date,
			'modificado'    => $post->post_modified,
			'imagen_destacada' => null,
		);

		// Add featured image
		if ( has_post_thumbnail( $post->ID ) ) {
			$thumbnail_id = get_post_thumbnail_id( $post->ID );
			$producto['imagen_destacada'] = array(
				'id'    => $thumbnail_id,
				'url'   => get_the_post_thumbnail_url( $post->ID, 'full' ),
				'sizes' => $this->get_image_sizes( $thumbnail_id ),
			);
		}

		// Add ACF fields if requested
		if ( $include_acf && function_exists( 'get_fields' ) ) {
			$acf_fields = get_fields( $post->ID );

			if ( $acf_fields ) {
				// Format gallery
				if ( isset( $acf_fields['fotos'] ) && is_array( $acf_fields['fotos'] ) ) {
					$acf_fields['fotos'] = $this->format_gallery( $acf_fields['fotos'] );
				}

				// Format PDF
				if ( isset( $acf_fields['pdf'] ) && is_array( $acf_fields['pdf'] ) ) {
					$acf_fields['pdf'] = $this->format_file( $acf_fields['pdf'] );
				}

				$producto['acf'] = $acf_fields;
			}
		}

		// Add taxonomies
		$producto['categorias_productos'] = wp_get_post_terms( $post->ID, 'categorias_productos', array( 'fields' => 'names' ) );
		$producto['tags_productos']       = wp_get_post_terms( $post->ID, 'tags_productos', array( 'fields' => 'names' ) );

		return $producto;
	}

	/**
	 * Get image sizes
	 *
	 * @param int $attachment_id Attachment ID.
	 * @return array Image sizes.
	 */
	private function get_image_sizes( $attachment_id ) {
		$sizes = array( 'thumbnail', 'medium', 'medium_large', 'large', 'full' );
		$image_sizes = array();

		foreach ( $sizes as $size ) {
			$image = wp_get_attachment_image_src( $attachment_id, $size );
			if ( $image ) {
				$image_sizes[ $size ] = array(
					'url'    => $image[0],
					'width'  => $image[1],
					'height' => $image[2],
				);
			}
		}

		return $image_sizes;
	}

	/**
	 * Format gallery for response
	 *
	 * @param array $gallery Gallery array.
	 * @return array Formatted gallery.
	 */
	private function format_gallery( $gallery ) {
		$formatted = array();

		foreach ( $gallery as $image ) {
			if ( isset( $image['ID'] ) ) {
				$formatted[] = array(
					'id'        => $image['ID'],
					'url'       => $image['url'] ?? '',
					'title'     => $image['title'] ?? '',
					'alt'       => $image['alt'] ?? '',
					'width'     => $image['width'] ?? 0,
					'height'    => $image['height'] ?? 0,
					'mime_type' => $image['mime_type'] ?? '',
				);
			}
		}

		return $formatted;
	}

	/**
	 * Format file for response
	 *
	 * @param array $file File array.
	 * @return array|null Formatted file.
	 */
	private function format_file( $file ) {
		if ( empty( $file ) || ! isset( $file['ID'] ) ) {
			return null;
		}

		return array(
			'id'        => $file['ID'],
			'url'       => $file['url'] ?? '',
			'title'     => $file['title'] ?? '',
			'filename'  => $file['filename'] ?? '',
			'filesize'  => $file['filesize'] ?? 0,
			'mime_type' => $file['mime_type'] ?? '',
		);
	}

	/**
	 * Setup CORS handling
	 */
	public function setup_cors() {
		// Remove default CORS headers
		remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
	}

	/**
	 * Add CORS headers to REST API responses
	 *
	 * @param bool $served  Whether the request has already been served.
	 * @return bool
	 */
	public function add_cors_headers( $served ) {
		// Get allowed origins from settings or use default
		$allowed_origins = apply_filters( 'prilabsa_rest_allowed_origins', array( '*' ) );

		// Set CORS headers
		header( 'Access-Control-Allow-Origin: ' . implode( ', ', $allowed_origins ) );
		header( 'Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS' );
		header( 'Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce' );
		header( 'Access-Control-Allow-Credentials: true' );
		header( 'Access-Control-Max-Age: 86400' );

		// Handle preflight requests
		if ( 'OPTIONS' === $_SERVER['REQUEST_METHOD'] ) {
			status_header( 200 );
			exit();
		}

		return $served;
	}

	/**
	 * Customize JWT token response
	 *
	 * @param array $data JWT response data.
	 * @param WP_User $user User object.
	 * @return array Modified JWT response.
	 */
	public function customize_jwt_response( $data, $user ) {
		$data['user_display_name'] = $user->display_name;
		$data['user_email']        = $user->user_email;
		return $data;
	}

	/**
	 * Optimize productos query
	 *
	 * @param array           $args    Query args.
	 * @param WP_REST_Request $request Request object.
	 * @return array Modified query args.
	 */
	public function optimize_productos_query( $args, $request ) {
		// Don't load unnecessary post data
		$args['no_found_rows'] = false; // We need found_rows for pagination

		return $args;
	}

	/**
	 * Add custom collection parameters
	 *
	 * @param array $params Query parameters.
	 * @return array Modified parameters.
	 */
	public function add_custom_collection_params( $params ) {
		$params['categoria'] = array(
			'description' => __( 'Filtrar por categoría de producto', 'prilabsa-rest-api' ),
			'type'        => 'string',
		);

		$params['codigo'] = array(
			'description' => __( 'Filtrar por código de producto', 'prilabsa-rest-api' ),
			'type'        => 'string',
		);

		return $params;
	}

	/**
	 * Add cache control headers
	 *
	 * @param WP_HTTP_Response $result  Result to send to the client.
	 * @param WP_REST_Server   $server  Server instance.
	 * @param WP_REST_Request  $request Request used to generate the response.
	 * @return WP_HTTP_Response Modified response.
	 */
	public function add_cache_headers( $result, $server, $request ) {
		// Only cache GET requests
		if ( 'GET' !== $request->get_method() ) {
			return $result;
		}

		// Check if this is a productos endpoint
		$route = $request->get_route();
		if ( strpos( $route, '/productos' ) === false && strpos( $route, self::API_NAMESPACE ) === false ) {
			return $result;
		}

		// Add cache headers (5 minutes cache)
		$result->header( 'Cache-Control', 'public, max-age=300' );
		$result->header( 'Expires', gmdate( 'D, d M Y H:i:s', time() + 300 ) . ' GMT' );

		return $result;
	}
}

/**
 * Initialize the plugin
 */
function prilabsa_rest_api_custom_init() {
	return PRILABSA_REST_API_Custom::get_instance();
}

// Start the plugin
add_action( 'plugins_loaded', 'prilabsa_rest_api_custom_init' );
