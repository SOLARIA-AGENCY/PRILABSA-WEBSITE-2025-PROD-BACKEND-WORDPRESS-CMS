<?php
/**
 * PRILABSA ACF Configuration Module
 *
 * Advanced Custom Fields configuration para productos PRILABSA con exposición REST API completa
 * This file is loaded by the main PRILABSA plugin
 *
 * @package PRILABSA_ACF
 * @author SOLARIA AGENCY
 * @link https://www.solaria.agency
 * @version 1.0.0
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
	 * Plugin version
	 *
	 * @var string
	 */
	const VERSION = '1.0.0';

	/**
	 * Singleton instance
	 *
	 * @var PRILABSA_ACF_Config
	 */
	private static $instance = null;

	/**
	 * Get singleton instance
	 *
	 * @return PRILABSA_ACF_Config
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
		// Register ACF fields programmatically
		add_action( 'acf/init', array( $this, 'register_acf_fields' ) );

		// Customize REST API exposure
		add_action( 'rest_api_init', array( $this, 'register_rest_fields' ) );

		// Add ACF fields to REST API responses
		add_filter( 'acf/rest_api/productos/get_fields', array( $this, 'customize_rest_fields' ), 10, 3 );

		// Validate ACF fields on save
		add_filter( 'acf/validate_value/name=codigo', array( $this, 'validate_codigo_unique' ), 10, 4 );

		// Load text domain
		add_action( 'init', array( $this, 'load_textdomain' ) );

		// Admin notices
		add_action( 'admin_notices', array( $this, 'check_acf_dependency' ) );
	}

	/**
	 * Load plugin text domain
	 */
	public function load_textdomain() {
		load_plugin_textdomain(
			'prilabsa-acf',
			false,
			dirname( plugin_basename( __FILE__ ) ) . '/languages'
		);
	}

	/**
	 * Check if ACF Pro is installed and active
	 */
	public function check_acf_dependency() {
		if ( ! function_exists( 'acf_add_local_field_group' ) ) {
			?>
			<div class="notice notice-error">
				<p>
					<strong><?php esc_html_e( 'PRILABSA ACF Configuration:', 'prilabsa-acf' ); ?></strong>
					<?php esc_html_e( 'Este plugin requiere Advanced Custom Fields PRO para funcionar. Por favor instala y activa ACF PRO.', 'prilabsa-acf' ); ?>
				</p>
			</div>
			<?php
		}
	}

	/**
	 * Register ACF field groups programmatically
	 */
	public function register_acf_fields() {
		// Check if ACF function exists
		if ( ! function_exists( 'acf_add_local_field_group' ) ) {
			return;
		}

		// Field Group: Detalles Producto
		acf_add_local_field_group(
			array(
				'key'                   => 'group_productos_detalles',
				'title'                 => __( 'Detalles del Producto', 'prilabsa-acf' ),
				'fields'                => $this->get_product_fields(),
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
				'description'           => __( 'Información detallada del producto PRILABSA', 'prilabsa-acf' ),
				'show_in_rest'          => 1,
			)
		);
	}

	/**
	 * Get all product ACF fields configuration
	 *
	 * @return array ACF fields array.
	 */
	private function get_product_fields() {
		return array(
			// Field 1: Descripción (WYSIWYG)
			array(
				'key'               => 'field_descripcion',
				'label'             => __( 'Descripción Detallada', 'prilabsa-acf' ),
				'name'              => 'descripcion',
				'type'              => 'wysiwyg',
				'instructions'      => __( 'Descripción completa del producto con formato rico', 'prilabsa-acf' ),
				'required'          => 1,
				'conditional_logic' => 0,
				'wrapper'           => array(
					'width' => '',
					'class' => '',
					'id'    => '',
				),
				'default_value'     => '',
				'tabs'              => 'all',
				'toolbar'           => 'full',
				'media_upload'      => 1,
				'delay'             => 0,
				'show_in_rest'      => 1,
			),

			// Field 2: Especificaciones (Repeater)
			array(
				'key'               => 'field_especificaciones',
				'label'             => __( 'Especificaciones Técnicas', 'prilabsa-acf' ),
				'name'              => 'especificaciones',
				'type'              => 'repeater',
				'instructions'      => __( 'Especificaciones técnicas del producto en formato clave-valor', 'prilabsa-acf' ),
				'required'          => 0,
				'conditional_logic' => 0,
				'wrapper'           => array(
					'width' => '',
					'class' => '',
					'id'    => '',
				),
				'collapsed'         => '',
				'min'               => 0,
				'max'               => 0,
				'layout'            => 'table',
				'button_label'      => __( 'Agregar Especificación', 'prilabsa-acf' ),
				'show_in_rest'      => 1,
				'sub_fields'        => array(
					array(
						'key'               => 'field_especificacion_clave',
						'label'             => __( 'Clave', 'prilabsa-acf' ),
						'name'              => 'clave',
						'type'              => 'text',
						'instructions'      => __( 'Nombre de la especificación (ej: "Peso", "Dimensiones")', 'prilabsa-acf' ),
						'required'          => 1,
						'conditional_logic' => 0,
						'wrapper'           => array(
							'width' => '40',
							'class' => '',
							'id'    => '',
						),
						'default_value'     => '',
						'placeholder'       => __( 'Ej: Peso', 'prilabsa-acf' ),
						'prepend'           => '',
						'append'            => '',
						'maxlength'         => '',
						'show_in_rest'      => 1,
					),
					array(
						'key'               => 'field_especificacion_valor',
						'label'             => __( 'Valor', 'prilabsa-acf' ),
						'name'              => 'valor',
						'type'              => 'text',
						'instructions'      => __( 'Valor de la especificación (ej: "1.5 kg")', 'prilabsa-acf' ),
						'required'          => 1,
						'conditional_logic' => 0,
						'wrapper'           => array(
							'width' => '60',
							'class' => '',
							'id'    => '',
						),
						'default_value'     => '',
						'placeholder'       => __( 'Ej: 1.5 kg', 'prilabsa-acf' ),
						'prepend'           => '',
						'append'            => '',
						'maxlength'         => '',
						'show_in_rest'      => 1,
					),
				),
			),

			// Field 3: Beneficios (Textarea)
			array(
				'key'               => 'field_beneficios',
				'label'             => __( 'Beneficios', 'prilabsa-acf' ),
				'name'              => 'beneficios',
				'type'              => 'textarea',
				'instructions'      => __( 'Lista de beneficios del producto (uno por línea)', 'prilabsa-acf' ),
				'required'          => 0,
				'conditional_logic' => 0,
				'wrapper'           => array(
					'width' => '',
					'class' => '',
					'id'    => '',
				),
				'default_value'     => '',
				'placeholder'       => __( "Ej:\n- Mejora la digestión\n- Aumenta la productividad\n- Reduce costos", 'prilabsa-acf' ),
				'maxlength'         => '',
				'rows'              => 6,
				'new_lines'         => 'wpautop',
				'show_in_rest'      => 1,
			),

			// Field 4: Presentación (Textarea)
			array(
				'key'               => 'field_presentacion',
				'label'             => __( 'Presentación', 'prilabsa-acf' ),
				'name'              => 'presentacion',
				'type'              => 'textarea',
				'instructions'      => __( 'Formato y presentación del producto', 'prilabsa-acf' ),
				'required'          => 0,
				'conditional_logic' => 0,
				'wrapper'           => array(
					'width' => '',
					'class' => '',
					'id'    => '',
				),
				'default_value'     => '',
				'placeholder'       => __( 'Ej: Bolsa de 25 kg, Envase de 1 litro', 'prilabsa-acf' ),
				'maxlength'         => '',
				'rows'              => 3,
				'new_lines'         => 'br',
				'show_in_rest'      => 1,
			),

			// Field 5: Categoría (Select)
			array(
				'key'               => 'field_categoria',
				'label'             => __( 'Categoría Principal', 'prilabsa-acf' ),
				'name'              => 'categoria',
				'type'              => 'select',
				'instructions'      => __( 'Categoría principal del producto', 'prilabsa-acf' ),
				'required'          => 1,
				'conditional_logic' => 0,
				'wrapper'           => array(
					'width' => '50',
					'class' => '',
					'id'    => '',
				),
				'choices'           => array(
					'aditivos'    => __( 'Aditivos', 'prilabsa-acf' ),
					'alimentos'   => __( 'Alimentos', 'prilabsa-acf' ),
					'equipos'     => __( 'Equipos', 'prilabsa-acf' ),
					'probioticos' => __( 'Probióticos', 'prilabsa-acf' ),
					'quimicos'    => __( 'Químicos', 'prilabsa-acf' ),
				),
				'default_value'     => false,
				'allow_null'        => 0,
				'multiple'          => 0,
				'ui'                => 1,
				'ajax'              => 0,
				'return_format'     => 'value',
				'placeholder'       => __( 'Seleccionar categoría', 'prilabsa-acf' ),
				'show_in_rest'      => 1,
			),

			// Field 6: Subcategoría (Text)
			array(
				'key'               => 'field_subcategoria',
				'label'             => __( 'Subcategoría', 'prilabsa-acf' ),
				'name'              => 'subcategoria',
				'type'              => 'text',
				'instructions'      => __( 'Subcategoría o clasificación adicional del producto', 'prilabsa-acf' ),
				'required'          => 0,
				'conditional_logic' => 0,
				'wrapper'           => array(
					'width' => '50',
					'class' => '',
					'id'    => '',
				),
				'default_value'     => '',
				'placeholder'       => __( 'Ej: Acidificantes, Enzimas', 'prilabsa-acf' ),
				'prepend'           => '',
				'append'            => '',
				'maxlength'         => 100,
				'show_in_rest'      => 1,
			),

			// Field 7: Código (Text - Unique)
			array(
				'key'               => 'field_codigo',
				'label'             => __( 'Código de Producto', 'prilabsa-acf' ),
				'name'              => 'codigo',
				'type'              => 'text',
				'instructions'      => __( 'Código único identificador del producto (SKU)', 'prilabsa-acf' ),
				'required'          => 1,
				'conditional_logic' => 0,
				'wrapper'           => array(
					'width' => '50',
					'class' => '',
					'id'    => '',
				),
				'default_value'     => '',
				'placeholder'       => __( 'Ej: PROD-001', 'prilabsa-acf' ),
				'prepend'           => '',
				'append'            => '',
				'maxlength'         => 50,
				'show_in_rest'      => 1,
			),

			// Field 8: Fotos (Gallery)
			array(
				'key'               => 'field_fotos',
				'label'             => __( 'Galería de Fotos', 'prilabsa-acf' ),
				'name'              => 'fotos',
				'type'              => 'gallery',
				'instructions'      => __( 'Galería de imágenes del producto', 'prilabsa-acf' ),
				'required'          => 0,
				'conditional_logic' => 0,
				'wrapper'           => array(
					'width' => '',
					'class' => '',
					'id'    => '',
				),
				'return_format'     => 'array',
				'preview_size'      => 'medium',
				'insert'            => 'append',
				'library'           => 'all',
				'min'               => 0,
				'max'               => 10,
				'min_width'         => 300,
				'min_height'        => 300,
				'min_size'          => '',
				'max_size'          => 5,
				'mime_types'        => 'jpg,jpeg,png,webp',
				'show_in_rest'      => 1,
			),

			// Field 9: PDF (File)
			array(
				'key'               => 'field_pdf',
				'label'             => __( 'Ficha Técnica PDF', 'prilabsa-acf' ),
				'name'              => 'pdf',
				'type'              => 'file',
				'instructions'      => __( 'Archivo PDF con la ficha técnica del producto', 'prilabsa-acf' ),
				'required'          => 0,
				'conditional_logic' => 0,
				'wrapper'           => array(
					'width' => '50',
					'class' => '',
					'id'    => '',
				),
				'return_format'     => 'array',
				'library'           => 'all',
				'min_size'          => '',
				'max_size'          => 10,
				'mime_types'        => 'pdf',
				'show_in_rest'      => 1,
			),
		);
	}

	/**
	 * Register ACF fields in REST API
	 */
	public function register_rest_fields() {
		// Register all ACF fields for productos in REST API
		$fields = array(
			'descripcion',
			'especificaciones',
			'beneficios',
			'presentacion',
			'categoria',
			'subcategoria',
			'codigo',
			'fotos',
			'pdf',
		);

		foreach ( $fields as $field_name ) {
			register_rest_field(
				'productos',
				$field_name,
				array(
					'get_callback'    => array( $this, 'get_acf_field_rest' ),
					'update_callback' => array( $this, 'update_acf_field_rest' ),
					'schema'          => $this->get_field_schema( $field_name ),
				)
			);
		}

		// Register computed field for full product data
		register_rest_field(
			'productos',
			'acf_fields',
			array(
				'get_callback' => array( $this, 'get_all_acf_fields_rest' ),
				'schema'       => array(
					'description' => __( 'Todos los campos ACF del producto', 'prilabsa-acf' ),
					'type'        => 'object',
					'context'     => array( 'view', 'edit', 'embed' ),
				),
			)
		);
	}

	/**
	 * Get ACF field for REST API
	 *
	 * @param array  $object     Post object.
	 * @param string $field_name Field name.
	 * @param object $request    REST request object.
	 * @return mixed Field value.
	 */
	public function get_acf_field_rest( $object, $field_name, $request ) {
		$value = get_field( $field_name, $object['id'] );

		// Format gallery field for REST API
		if ( 'fotos' === $field_name && is_array( $value ) ) {
			return $this->format_gallery_for_rest( $value );
		}

		// Format file field for REST API
		if ( 'pdf' === $field_name && is_array( $value ) ) {
			return $this->format_file_for_rest( $value );
		}

		return $value;
	}

	/**
	 * Update ACF field via REST API
	 *
	 * @param mixed  $value      Field value.
	 * @param object $object     Post object.
	 * @param string $field_name Field name.
	 * @return bool True on success.
	 */
	public function update_acf_field_rest( $value, $object, $field_name ) {
		return update_field( $field_name, $value, $object->ID );
	}

	/**
	 * Get all ACF fields for REST API
	 *
	 * @param array $object Post object.
	 * @return array All ACF fields.
	 */
	public function get_all_acf_fields_rest( $object ) {
		$fields = get_fields( $object['id'] );

		if ( ! $fields ) {
			return array();
		}

		// Format gallery if exists
		if ( isset( $fields['fotos'] ) && is_array( $fields['fotos'] ) ) {
			$fields['fotos'] = $this->format_gallery_for_rest( $fields['fotos'] );
		}

		// Format PDF if exists
		if ( isset( $fields['pdf'] ) && is_array( $fields['pdf'] ) ) {
			$fields['pdf'] = $this->format_file_for_rest( $fields['pdf'] );
		}

		return $fields;
	}

	/**
	 * Format gallery array for REST API response
	 *
	 * @param array $gallery Gallery array from ACF.
	 * @return array Formatted gallery.
	 */
	private function format_gallery_for_rest( $gallery ) {
		if ( empty( $gallery ) ) {
			return array();
		}

		$formatted = array();

		foreach ( $gallery as $image ) {
			if ( isset( $image['ID'] ) ) {
				$formatted[] = array(
					'id'          => $image['ID'],
					'url'         => $image['url'] ?? '',
					'title'       => $image['title'] ?? '',
					'alt'         => $image['alt'] ?? '',
					'caption'     => $image['caption'] ?? '',
					'description' => $image['description'] ?? '',
					'width'       => $image['width'] ?? 0,
					'height'      => $image['height'] ?? 0,
					'sizes'       => $image['sizes'] ?? array(),
					'mime_type'   => $image['mime_type'] ?? '',
				);
			}
		}

		return $formatted;
	}

	/**
	 * Format file array for REST API response
	 *
	 * @param array $file File array from ACF.
	 * @return array Formatted file.
	 */
	private function format_file_for_rest( $file ) {
		if ( empty( $file ) || ! isset( $file['ID'] ) ) {
			return null;
		}

		return array(
			'id'          => $file['ID'],
			'url'         => $file['url'] ?? '',
			'title'       => $file['title'] ?? '',
			'filename'    => $file['filename'] ?? '',
			'filesize'    => $file['filesize'] ?? 0,
			'mime_type'   => $file['mime_type'] ?? '',
			'description' => $file['description'] ?? '',
		);
	}

	/**
	 * Get REST API schema for field
	 *
	 * @param string $field_name Field name.
	 * @return array Field schema.
	 */
	private function get_field_schema( $field_name ) {
		$schemas = array(
			'descripcion'      => array(
				'description' => __( 'Descripción detallada del producto', 'prilabsa-acf' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit', 'embed' ),
			),
			'especificaciones' => array(
				'description' => __( 'Especificaciones técnicas del producto', 'prilabsa-acf' ),
				'type'        => 'array',
				'context'     => array( 'view', 'edit', 'embed' ),
				'items'       => array(
					'type'       => 'object',
					'properties' => array(
						'clave' => array(
							'type' => 'string',
						),
						'valor' => array(
							'type' => 'string',
						),
					),
				),
			),
			'beneficios'       => array(
				'description' => __( 'Beneficios del producto', 'prilabsa-acf' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit', 'embed' ),
			),
			'presentacion'     => array(
				'description' => __( 'Formato y presentación del producto', 'prilabsa-acf' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit', 'embed' ),
			),
			'categoria'        => array(
				'description' => __( 'Categoría principal del producto', 'prilabsa-acf' ),
				'type'        => 'string',
				'enum'        => array( 'aditivos', 'alimentos', 'equipos', 'probioticos', 'quimicos' ),
				'context'     => array( 'view', 'edit', 'embed' ),
			),
			'subcategoria'     => array(
				'description' => __( 'Subcategoría del producto', 'prilabsa-acf' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit', 'embed' ),
			),
			'codigo'           => array(
				'description' => __( 'Código único del producto', 'prilabsa-acf' ),
				'type'        => 'string',
				'context'     => array( 'view', 'edit', 'embed' ),
			),
			'fotos'            => array(
				'description' => __( 'Galería de fotos del producto', 'prilabsa-acf' ),
				'type'        => 'array',
				'context'     => array( 'view', 'edit', 'embed' ),
				'items'       => array(
					'type' => 'object',
				),
			),
			'pdf'              => array(
				'description' => __( 'Ficha técnica en PDF', 'prilabsa-acf' ),
				'type'        => 'object',
				'context'     => array( 'view', 'edit', 'embed' ),
			),
		);

		return $schemas[ $field_name ] ?? array();
	}

	/**
	 * Validate product code uniqueness
	 *
	 * @param bool   $valid      Validation status.
	 * @param mixed  $value      Field value.
	 * @param array  $field      Field configuration.
	 * @param string $input_name Input name.
	 * @return bool|string True if valid, error message if invalid.
	 */
	public function validate_codigo_unique( $valid, $value, $field, $input_name ) {
		// Skip if already invalid
		if ( ! $valid ) {
			return $valid;
		}

		// Skip if empty (required validation handles this)
		if ( empty( $value ) ) {
			return $valid;
		}

		// Get current post ID
		$post_id = 0;
		if ( isset( $_POST['post_ID'] ) ) {
			$post_id = intval( $_POST['post_ID'] );
		}

		// Query for existing products with same code
		$args = array(
			'post_type'      => 'productos',
			'post_status'    => 'any',
			'posts_per_page' => 1,
			'fields'         => 'ids',
			'meta_query'     => array(
				array(
					'key'     => 'codigo',
					'value'   => sanitize_text_field( $value ),
					'compare' => '=',
				),
			),
		);

		// Exclude current post if editing
		if ( $post_id > 0 ) {
			$args['post__not_in'] = array( $post_id );
		}

		$query = new WP_Query( $args );

		if ( $query->have_posts() ) {
			return sprintf(
				__( 'El código "%s" ya está en uso por otro producto. Por favor usa un código único.', 'prilabsa-acf' ),
				esc_html( $value )
			);
		}

		return $valid;
	}

	/**
	 * Customize REST API fields for productos
	 *
	 * @param array  $fields   ACF fields.
	 * @param array  $post     Post object.
	 * @param object $request  REST request.
	 * @return array Modified fields.
	 */
	public function customize_rest_fields( $fields, $post, $request = null ) {
		// Add any custom field transformations here
		return $fields;
	}
}

/**
 * Initialize the plugin
 */
function prilabsa_acf_config_init() {
	return PRILABSA_ACF_Config::get_instance();
}

// Start the plugin
add_action( 'plugins_loaded', 'prilabsa_acf_config_init' );
