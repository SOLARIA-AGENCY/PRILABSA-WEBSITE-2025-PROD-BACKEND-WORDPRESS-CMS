<?php
/**
 * PRILABSA Productos Custom Post Type Module
 *
 * Custom Post Type para productos de PRILABSA con taxonomías y configuración REST API optimizada
 * This file is loaded by the main PRILABSA plugin
 *
 * @package PRILABSA_Productos
 * @author SOLARIA AGENCY
 * @link https://www.solaria.agency
 * @version 1.0.0
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
	 * Plugin version
	 *
	 * @var string
	 */
	const VERSION = '1.0.0';

	/**
	 * Post type slug
	 *
	 * @var string
	 */
	const POST_TYPE = 'productos';

	/**
	 * Category taxonomy slug
	 *
	 * @var string
	 */
	const TAX_CATEGORY = 'categorias_productos';

	/**
	 * Tags taxonomy slug
	 *
	 * @var string
	 */
	const TAX_TAGS = 'tags_productos';

	/**
	 * Singleton instance
	 *
	 * @var PRILABSA_Productos_CPT
	 */
	private static $instance = null;

	/**
	 * Get singleton instance
	 *
	 * @return PRILABSA_Productos_CPT
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
		// Register post type and taxonomies
		add_action( 'init', array( $this, 'register_post_type' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );

		// Load text domain for translations
		add_action( 'init', array( $this, 'load_textdomain' ) );

		// Admin customizations
		add_filter( 'manage_' . self::POST_TYPE . '_posts_columns', array( $this, 'customize_admin_columns' ) );
		add_action( 'manage_' . self::POST_TYPE . '_posts_custom_column', array( $this, 'render_admin_columns' ), 10, 2 );
		add_filter( 'manage_edit-' . self::POST_TYPE . '_sortable_columns', array( $this, 'sortable_admin_columns' ) );

		// REST API customizations
		add_action( 'rest_api_init', array( $this, 'customize_rest_api' ) );
		add_filter( 'rest_' . self::POST_TYPE . '_query', array( $this, 'filter_rest_query' ), 10, 2 );

		// Admin notices and messages
		add_filter( 'post_updated_messages', array( $this, 'custom_post_messages' ) );

		// Flush rewrite rules on activation
		register_activation_hook( __FILE__, array( $this, 'activate' ) );
		register_deactivation_hook( __FILE__, array( $this, 'deactivate' ) );
	}

	/**
	 * Load plugin text domain for translations
	 */
	public function load_textdomain() {
		load_plugin_textdomain(
			'prilabsa-productos',
			false,
			dirname( plugin_basename( __FILE__ ) ) . '/languages'
		);
	}

	/**
	 * Register custom post type 'productos'
	 */
	public function register_post_type() {
		$labels = array(
			'name'                     => _x( 'Productos', 'Post type general name', 'prilabsa-productos' ),
			'singular_name'            => _x( 'Producto', 'Post type singular name', 'prilabsa-productos' ),
			'menu_name'                => _x( 'Productos', 'Admin Menu text', 'prilabsa-productos' ),
			'name_admin_bar'           => _x( 'Producto', 'Add New on Toolbar', 'prilabsa-productos' ),
			'add_new'                  => __( 'Agregar Nuevo', 'prilabsa-productos' ),
			'add_new_item'             => __( 'Agregar Nuevo Producto', 'prilabsa-productos' ),
			'new_item'                 => __( 'Nuevo Producto', 'prilabsa-productos' ),
			'edit_item'                => __( 'Editar Producto', 'prilabsa-productos' ),
			'view_item'                => __( 'Ver Producto', 'prilabsa-productos' ),
			'all_items'                => __( 'Todos los Productos', 'prilabsa-productos' ),
			'search_items'             => __( 'Buscar Productos', 'prilabsa-productos' ),
			'parent_item_colon'        => __( 'Producto Padre:', 'prilabsa-productos' ),
			'not_found'                => __( 'No se encontraron productos.', 'prilabsa-productos' ),
			'not_found_in_trash'       => __( 'No se encontraron productos en la papelera.', 'prilabsa-productos' ),
			'featured_image'           => _x( 'Imagen Destacada del Producto', 'Overrides the "Featured Image" phrase', 'prilabsa-productos' ),
			'set_featured_image'       => _x( 'Establecer imagen destacada', 'Overrides the "Set featured image" phrase', 'prilabsa-productos' ),
			'remove_featured_image'    => _x( 'Eliminar imagen destacada', 'Overrides the "Remove featured image" phrase', 'prilabsa-productos' ),
			'use_featured_image'       => _x( 'Usar como imagen destacada', 'Overrides the "Use as featured image" phrase', 'prilabsa-productos' ),
			'archives'                 => _x( 'Archivo de Productos', 'The post type archive label', 'prilabsa-productos' ),
			'insert_into_item'         => _x( 'Insertar en producto', 'Overrides the "Insert into post" phrase', 'prilabsa-productos' ),
			'uploaded_to_this_item'    => _x( 'Subido a este producto', 'Overrides the "Uploaded to this post" phrase', 'prilabsa-productos' ),
			'filter_items_list'        => _x( 'Filtrar lista de productos', 'Screen reader text for the filter links', 'prilabsa-productos' ),
			'items_list_navigation'    => _x( 'Navegación de lista de productos', 'Screen reader text for the pagination', 'prilabsa-productos' ),
			'items_list'               => _x( 'Lista de productos', 'Screen reader text for the items list', 'prilabsa-productos' ),
		);

		$args = array(
			'labels'                => $labels,
			'description'           => __( 'Catálogo de productos PRILABSA', 'prilabsa-productos' ),
			'public'                => true,
			'publicly_queryable'    => true,
			'show_ui'               => true,
			'show_in_menu'          => true,
			'query_var'             => true,
			'rewrite'               => array(
				'slug'       => 'productos',
				'with_front' => false,
				'feeds'      => true,
				'pages'      => true,
			),
			'capability_type'       => 'post',
			'has_archive'           => true,
			'hierarchical'          => false,
			'menu_position'         => 20,
			'menu_icon'             => 'dashicons-products',
			'supports'              => array( 'title', 'editor', 'thumbnail', 'custom-fields', 'excerpt', 'revisions' ),
			'show_in_rest'          => true,
			'rest_base'             => 'productos',
			'rest_controller_class' => 'WP_REST_Posts_Controller',
			'taxonomies'            => array( self::TAX_CATEGORY, self::TAX_TAGS ),
		);

		register_post_type( self::POST_TYPE, $args );
	}

	/**
	 * Register custom taxonomies for productos
	 */
	public function register_taxonomies() {
		// Register hierarchical taxonomy (categories)
		$category_labels = array(
			'name'                       => _x( 'Categorías de Productos', 'taxonomy general name', 'prilabsa-productos' ),
			'singular_name'              => _x( 'Categoría de Producto', 'taxonomy singular name', 'prilabsa-productos' ),
			'search_items'               => __( 'Buscar Categorías', 'prilabsa-productos' ),
			'popular_items'              => __( 'Categorías Populares', 'prilabsa-productos' ),
			'all_items'                  => __( 'Todas las Categorías', 'prilabsa-productos' ),
			'parent_item'                => __( 'Categoría Padre', 'prilabsa-productos' ),
			'parent_item_colon'          => __( 'Categoría Padre:', 'prilabsa-productos' ),
			'edit_item'                  => __( 'Editar Categoría', 'prilabsa-productos' ),
			'update_item'                => __( 'Actualizar Categoría', 'prilabsa-productos' ),
			'add_new_item'               => __( 'Agregar Nueva Categoría', 'prilabsa-productos' ),
			'new_item_name'              => __( 'Nombre de Nueva Categoría', 'prilabsa-productos' ),
			'separate_items_with_commas' => __( 'Separar categorías con comas', 'prilabsa-productos' ),
			'add_or_remove_items'        => __( 'Agregar o eliminar categorías', 'prilabsa-productos' ),
			'choose_from_most_used'      => __( 'Elegir de las categorías más usadas', 'prilabsa-productos' ),
			'not_found'                  => __( 'No se encontraron categorías.', 'prilabsa-productos' ),
			'menu_name'                  => __( 'Categorías', 'prilabsa-productos' ),
		);

		$category_args = array(
			'labels'            => $category_labels,
			'hierarchical'      => true,
			'public'            => true,
			'show_ui'           => true,
			'show_admin_column' => true,
			'show_in_nav_menus' => true,
			'show_tagcloud'     => true,
			'show_in_rest'      => true,
			'rest_base'         => 'categorias-productos',
			'rewrite'           => array(
				'slug'         => 'categoria-producto',
				'with_front'   => false,
				'hierarchical' => true,
			),
		);

		register_taxonomy( self::TAX_CATEGORY, array( self::POST_TYPE ), $category_args );

		// Register non-hierarchical taxonomy (tags)
		$tags_labels = array(
			'name'                       => _x( 'Etiquetas de Productos', 'taxonomy general name', 'prilabsa-productos' ),
			'singular_name'              => _x( 'Etiqueta de Producto', 'taxonomy singular name', 'prilabsa-productos' ),
			'search_items'               => __( 'Buscar Etiquetas', 'prilabsa-productos' ),
			'popular_items'              => __( 'Etiquetas Populares', 'prilabsa-productos' ),
			'all_items'                  => __( 'Todas las Etiquetas', 'prilabsa-productos' ),
			'edit_item'                  => __( 'Editar Etiqueta', 'prilabsa-productos' ),
			'update_item'                => __( 'Actualizar Etiqueta', 'prilabsa-productos' ),
			'add_new_item'               => __( 'Agregar Nueva Etiqueta', 'prilabsa-productos' ),
			'new_item_name'              => __( 'Nombre de Nueva Etiqueta', 'prilabsa-productos' ),
			'separate_items_with_commas' => __( 'Separar etiquetas con comas', 'prilabsa-productos' ),
			'add_or_remove_items'        => __( 'Agregar o eliminar etiquetas', 'prilabsa-productos' ),
			'choose_from_most_used'      => __( 'Elegir de las etiquetas más usadas', 'prilabsa-productos' ),
			'not_found'                  => __( 'No se encontraron etiquetas.', 'prilabsa-productos' ),
			'menu_name'                  => __( 'Etiquetas', 'prilabsa-productos' ),
		);

		$tags_args = array(
			'labels'            => $tags_labels,
			'hierarchical'      => false,
			'public'            => true,
			'show_ui'           => true,
			'show_admin_column' => true,
			'show_in_nav_menus' => true,
			'show_tagcloud'     => true,
			'show_in_rest'      => true,
			'rest_base'         => 'tags-productos',
			'rewrite'           => array(
				'slug'       => 'tag-producto',
				'with_front' => false,
			),
		);

		register_taxonomy( self::TAX_TAGS, array( self::POST_TYPE ), $tags_args );
	}

	/**
	 * Customize admin columns for productos listing
	 *
	 * @param array $columns Default columns.
	 * @return array Modified columns.
	 */
	public function customize_admin_columns( $columns ) {
		// Reorder and add custom columns
		$new_columns = array();

		$new_columns['cb']                      = $columns['cb'];
		$new_columns['featured_image']          = __( 'Imagen', 'prilabsa-productos' );
		$new_columns['title']                   = $columns['title'];
		$new_columns['codigo']                  = __( 'Código', 'prilabsa-productos' );
		$new_columns['taxonomy-' . self::TAX_CATEGORY] = __( 'Categorías', 'prilabsa-productos' );
		$new_columns['taxonomy-' . self::TAX_TAGS]     = __( 'Etiquetas', 'prilabsa-productos' );
		$new_columns['date']                    = $columns['date'];

		return $new_columns;
	}

	/**
	 * Render custom admin column content
	 *
	 * @param string $column  Column name.
	 * @param int    $post_id Post ID.
	 */
	public function render_admin_columns( $column, $post_id ) {
		switch ( $column ) {
			case 'featured_image':
				if ( has_post_thumbnail( $post_id ) ) {
					echo get_the_post_thumbnail( $post_id, array( 60, 60 ) );
				} else {
					echo '<span class="dashicons dashicons-format-image" style="font-size: 40px; color: #ddd;"></span>';
				}
				break;

			case 'codigo':
				$codigo = get_post_meta( $post_id, 'codigo', true );
				if ( ! empty( $codigo ) ) {
					echo '<strong>' . esc_html( $codigo ) . '</strong>';
				} else {
					echo '<span style="color: #999;">—</span>';
				}
				break;
		}
	}

	/**
	 * Make admin columns sortable
	 *
	 * @param array $columns Sortable columns.
	 * @return array Modified sortable columns.
	 */
	public function sortable_admin_columns( $columns ) {
		$columns['codigo'] = 'codigo';
		return $columns;
	}

	/**
	 * Customize REST API endpoints
	 */
	public function customize_rest_api() {
		// Register custom meta fields to REST API
		register_rest_field(
			self::POST_TYPE,
			'featured_image_url',
			array(
				'get_callback' => array( $this, 'get_featured_image_url' ),
				'schema'       => array(
					'description' => __( 'URL de la imagen destacada', 'prilabsa-productos' ),
					'type'        => 'string',
					'context'     => array( 'view', 'edit', 'embed' ),
				),
			)
		);

		register_rest_field(
			self::POST_TYPE,
			'featured_image_sizes',
			array(
				'get_callback' => array( $this, 'get_featured_image_sizes' ),
				'schema'       => array(
					'description' => __( 'URLs de diferentes tamaños de la imagen destacada', 'prilabsa-productos' ),
					'type'        => 'object',
					'context'     => array( 'view', 'edit', 'embed' ),
				),
			)
		);
	}

	/**
	 * Get featured image URL for REST API
	 *
	 * @param array $object Post object.
	 * @return string|null Image URL or null.
	 */
	public function get_featured_image_url( $object ) {
		if ( ! isset( $object['featured_media'] ) || empty( $object['featured_media'] ) ) {
			return null;
		}

		$image = wp_get_attachment_image_src( $object['featured_media'], 'full' );

		return $image ? $image[0] : null;
	}

	/**
	 * Get featured image in multiple sizes for REST API
	 *
	 * @param array $object Post object.
	 * @return array|null Image URLs by size or null.
	 */
	public function get_featured_image_sizes( $object ) {
		if ( ! isset( $object['featured_media'] ) || empty( $object['featured_media'] ) ) {
			return null;
		}

		$sizes = array( 'thumbnail', 'medium', 'medium_large', 'large', 'full' );
		$image_sizes = array();

		foreach ( $sizes as $size ) {
			$image = wp_get_attachment_image_src( $object['featured_media'], $size );
			if ( $image ) {
				$image_sizes[ $size ] = array(
					'url'    => $image[0],
					'width'  => $image[1],
					'height' => $image[2],
				);
			}
		}

		return ! empty( $image_sizes ) ? $image_sizes : null;
	}

	/**
	 * Filter REST API query parameters
	 *
	 * @param array           $args    Query arguments.
	 * @param WP_REST_Request $request REST request object.
	 * @return array Modified query arguments.
	 */
	public function filter_rest_query( $args, $request ) {
		// Allow filtering by custom taxonomy
		if ( isset( $request['categoria'] ) ) {
			$args['tax_query'] = array(
				array(
					'taxonomy' => self::TAX_CATEGORY,
					'field'    => 'slug',
					'terms'    => sanitize_text_field( $request['categoria'] ),
				),
			);
		}

		// Allow searching by product code
		if ( isset( $request['codigo'] ) ) {
			$args['meta_query'] = array(
				array(
					'key'     => 'codigo',
					'value'   => sanitize_text_field( $request['codigo'] ),
					'compare' => '=',
				),
			);
		}

		return $args;
	}

	/**
	 * Custom post type messages
	 *
	 * @param array $messages Post update messages.
	 * @return array Modified messages.
	 */
	public function custom_post_messages( $messages ) {
		global $post, $post_ID;

		$permalink = get_permalink( $post_ID );

		$messages[ self::POST_TYPE ] = array(
			0  => '', // Unused. Messages start at index 1.
			1  => sprintf( __( 'Producto actualizado. <a href="%s">Ver producto</a>', 'prilabsa-productos' ), esc_url( $permalink ) ),
			2  => __( 'Campo personalizado actualizado.', 'prilabsa-productos' ),
			3  => __( 'Campo personalizado eliminado.', 'prilabsa-productos' ),
			4  => __( 'Producto actualizado.', 'prilabsa-productos' ),
			5  => isset( $_GET['revision'] ) ? sprintf( __( 'Producto restaurado a revisión del %s', 'prilabsa-productos' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
			6  => sprintf( __( 'Producto publicado. <a href="%s">Ver producto</a>', 'prilabsa-productos' ), esc_url( $permalink ) ),
			7  => __( 'Producto guardado.', 'prilabsa-productos' ),
			8  => sprintf( __( 'Producto enviado. <a target="_blank" href="%s">Previsualizar producto</a>', 'prilabsa-productos' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
			9  => sprintf(
				__( 'Producto programado para: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Previsualizar producto</a>', 'prilabsa-productos' ),
				date_i18n( __( 'M j, Y @ G:i', 'prilabsa-productos' ), strtotime( $post->post_date ) ),
				esc_url( $permalink )
			),
			10 => sprintf( __( 'Borrador de producto actualizado. <a target="_blank" href="%s">Previsualizar producto</a>', 'prilabsa-productos' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
		);

		return $messages;
	}

	/**
	 * Plugin activation hook
	 */
	public function activate() {
		// Register post type and taxonomies
		$this->register_post_type();
		$this->register_taxonomies();

		// Flush rewrite rules
		flush_rewrite_rules();

		// Log activation
		if ( function_exists( 'error_log' ) ) {
			error_log( 'PRILABSA Productos CPT Plugin activated - Version ' . self::VERSION );
		}
	}

	/**
	 * Plugin deactivation hook
	 */
	public function deactivate() {
		// Flush rewrite rules
		flush_rewrite_rules();

		// Log deactivation
		if ( function_exists( 'error_log' ) ) {
			error_log( 'PRILABSA Productos CPT Plugin deactivated' );
		}
	}
}

/**
 * Initialize the plugin
 */
function prilabsa_productos_cpt_init() {
	return PRILABSA_Productos_CPT::get_instance();
}

// Start the plugin
add_action( 'plugins_loaded', 'prilabsa_productos_cpt_init' );
