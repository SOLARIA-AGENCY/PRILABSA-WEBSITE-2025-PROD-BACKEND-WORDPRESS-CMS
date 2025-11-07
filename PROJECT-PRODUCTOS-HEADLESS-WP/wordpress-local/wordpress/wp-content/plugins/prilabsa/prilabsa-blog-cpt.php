<?php
/**
 * PRILABSA Blog Custom Post Type Module
 *
 * Custom Post Type para artículos de blog de PRILABSA con configuración REST API optimizada
 * This file is loaded by the main PRILABSA plugin
 *
 * @package PRILABSA_Blog
 * @author SOLARIA AGENCY
 * @link https://www.solaria.agency
 * @version 1.0.0
 */

// Security: Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Blog CPT Class
 */
class PRILABSA_Blog_CPT {

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
	const POST_TYPE = 'blog';

	/**
	 * Singleton instance
	 *
	 * @var PRILABSA_Blog_CPT
	 */
	private static $instance = null;

	/**
	 * Get singleton instance
	 *
	 * @return PRILABSA_Blog_CPT
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
		// Register post type
		add_action( 'init', array( $this, 'register_post_type' ) );

		// Load text domain for translations
		add_action( 'init', array( $this, 'load_textdomain' ) );

		// Admin customizations
		add_filter( 'manage_' . self::POST_TYPE . '_posts_columns', array( $this, 'customize_admin_columns' ) );
		add_action( 'manage_' . self::POST_TYPE . '_posts_custom_column', array( $this, 'render_admin_columns' ), 10, 2 );

		// REST API customizations
		add_action( 'rest_api_init', array( $this, 'customize_rest_api' ) );

		// Admin notices and messages
		add_filter( 'post_updated_messages', array( $this, 'custom_post_messages' ) );
	}

	/**
	 * Load plugin text domain for translations
	 */
	public function load_textdomain() {
		load_plugin_textdomain(
			'prilabsa-blog',
			false,
			dirname( plugin_basename( __FILE__ ) ) . '/languages'
		);
	}

	/**
	 * Register custom post type 'blog'
	 */
	public function register_post_type() {
		$labels = array(
			'name'                     => _x( 'Blog', 'Post type general name', 'prilabsa-blog' ),
			'singular_name'            => _x( 'Artículo', 'Post type singular name', 'prilabsa-blog' ),
			'menu_name'                => _x( 'Blog', 'Admin Menu text', 'prilabsa-blog' ),
			'name_admin_bar'           => _x( 'Artículo', 'Add New on Toolbar', 'prilabsa-blog' ),
			'add_new'                  => __( 'Agregar Nuevo', 'prilabsa-blog' ),
			'add_new_item'             => __( 'Agregar Nuevo Artículo', 'prilabsa-blog' ),
			'new_item'                 => __( 'Nuevo Artículo', 'prilabsa-blog' ),
			'edit_item'                => __( 'Editar Artículo', 'prilabsa-blog' ),
			'view_item'                => __( 'Ver Artículo', 'prilabsa-blog' ),
			'all_items'                => __( 'Todos los Artículos', 'prilabsa-blog' ),
			'search_items'             => __( 'Buscar Artículos', 'prilabsa-blog' ),
			'not_found'                => __( 'No se encontraron artículos.', 'prilabsa-blog' ),
			'not_found_in_trash'       => __( 'No se encontraron artículos en la papelera.', 'prilabsa-blog' ),
			'featured_image'           => _x( 'Imagen Hero del Artículo', 'Overrides the "Featured Image" phrase', 'prilabsa-blog' ),
			'set_featured_image'       => _x( 'Establecer imagen hero', 'Overrides the "Set featured image" phrase', 'prilabsa-blog' ),
			'remove_featured_image'    => _x( 'Eliminar imagen hero', 'Overrides the "Remove featured image" phrase', 'prilabsa-blog' ),
			'use_featured_image'       => _x( 'Usar como imagen hero', 'Overrides the "Use as featured image" phrase', 'prilabsa-blog' ),
			'archives'                 => _x( 'Archivo de Blog', 'The post type archive label', 'prilabsa-blog' ),
			'insert_into_item'         => _x( 'Insertar en artículo', 'Overrides the "Insert into post" phrase', 'prilabsa-blog' ),
			'uploaded_to_this_item'    => _x( 'Subido a este artículo', 'Overrides the "Uploaded to this post" phrase', 'prilabsa-blog' ),
			'filter_items_list'        => _x( 'Filtrar lista de artículos', 'Screen reader text for the filter links', 'prilabsa-blog' ),
			'items_list_navigation'    => _x( 'Navegación de lista de artículos', 'Screen reader text for the pagination', 'prilabsa-blog' ),
			'items_list'               => _x( 'Lista de artículos', 'Screen reader text for the items list', 'prilabsa-blog' ),
		);

		$args = array(
			'labels'                => $labels,
			'description'           => __( 'Artículos de blog de PRILABSA', 'prilabsa-blog' ),
			'public'                => true,
			'publicly_queryable'    => true,
			'show_ui'               => true,
			'show_in_menu'          => true,
			'query_var'             => true,
			'rewrite'               => array(
				'slug'       => 'blog',
				'with_front' => false,
				'feeds'      => true,
				'pages'      => true,
			),
			'capability_type'       => 'post',
			'has_archive'           => true,
			'hierarchical'          => false,
			'menu_position'         => 21,
			'menu_icon'             => 'dashicons-welcome-write-blog',
			'supports'              => array( 'title', 'editor', 'thumbnail', 'custom-fields', 'excerpt', 'revisions' ),
			'show_in_rest'          => true,
			'rest_base'             => 'blog',
			'rest_controller_class' => 'WP_REST_Posts_Controller',
		);

		register_post_type( self::POST_TYPE, $args );
	}

	/**
	 * Customize admin columns for blog listing
	 *
	 * @param array $columns Default columns.
	 * @return array Modified columns.
	 */
	public function customize_admin_columns( $columns ) {
		// Reorder and add custom columns
		$new_columns = array();

		$new_columns['cb']             = $columns['cb'];
		$new_columns['featured_image'] = __( 'Imagen', 'prilabsa-blog' );
		$new_columns['title']          = $columns['title'];
		$new_columns['author_es']      = __( 'Autor', 'prilabsa-blog' );
		$new_columns['date']           = $columns['date'];

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

			case 'author_es':
				$author = get_post_meta( $post_id, 'autor_es', true );
				if ( ! empty( $author ) ) {
					echo esc_html( $author );
				} else {
					echo '<span style="color: #999;">—</span>';
				}
				break;
		}
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
					'description' => __( 'URL de la imagen hero', 'prilabsa-blog' ),
					'type'        => 'string',
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
			1  => sprintf( __( 'Artículo actualizado. <a href="%s">Ver artículo</a>', 'prilabsa-blog' ), esc_url( $permalink ) ),
			2  => __( 'Campo personalizado actualizado.', 'prilabsa-blog' ),
			3  => __( 'Campo personalizado eliminado.', 'prilabsa-blog' ),
			4  => __( 'Artículo actualizado.', 'prilabsa-blog' ),
			5  => isset( $_GET['revision'] ) ? sprintf( __( 'Artículo restaurado a revisión del %s', 'prilabsa-blog' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
			6  => sprintf( __( 'Artículo publicado. <a href="%s">Ver artículo</a>', 'prilabsa-blog' ), esc_url( $permalink ) ),
			7  => __( 'Artículo guardado.', 'prilabsa-blog' ),
			8  => sprintf( __( 'Artículo enviado. <a target="_blank" href="%s">Previsualizar artículo</a>', 'prilabsa-blog' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
			9  => sprintf(
				__( 'Artículo programado para: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Previsualizar artículo</a>', 'prilabsa-blog' ),
				date_i18n( __( 'M j, Y @ G:i', 'prilabsa-blog' ), strtotime( $post->post_date ) ),
				esc_url( $permalink )
			),
			10 => sprintf( __( 'Borrador de artículo actualizado. <a target="_blank" href="%s">Previsualizar artículo</a>', 'prilabsa-blog' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
		);

		return $messages;
	}
}

/**
 * Initialize the plugin
 */
function prilabsa_blog_cpt_init() {
	return PRILABSA_Blog_CPT::get_instance();
}

// Start the plugin
add_action( 'plugins_loaded', 'prilabsa_blog_cpt_init' );
