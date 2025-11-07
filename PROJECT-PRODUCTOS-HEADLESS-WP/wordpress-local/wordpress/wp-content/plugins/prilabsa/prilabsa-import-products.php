<?php
/**
 * PRILABSA Product Importer Script
 *
 * Script para importar 105 productos desde JSON con imágenes, PDFs y campos ACF completos
 * This file can be executed via WP-CLI
 *
 * @package PRILABSA_Importer
 * @author SOLARIA AGENCY
 * @link https://www.solaria.agency
 * @version 1.0.0
 */

// Security: Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Main Product Importer Class
 */
class PRILABSA_Product_Importer {

	/**
	 * Plugin version
	 *
	 * @var string
	 */
	const VERSION = '1.0.0';

	/**
	 * Singleton instance
	 *
	 * @var PRILABSA_Product_Importer
	 */
	private static $instance = null;

	/**
	 * Import statistics
	 *
	 * @var array
	 */
	private $stats = array(
		'total_processed'    => 0,
		'successful_imports' => 0,
		'failed_imports'     => 0,
		'updated_products'   => 0,
		'errors'             => array(),
		'start_time'         => 0,
		'end_time'           => 0,
	);

	/**
	 * Base paths for media files
	 *
	 * @var array
	 */
	private $media_paths = array(
		'images' => '',
		'pdfs'   => '',
	);

	/**
	 * Get singleton instance
	 *
	 * @return PRILABSA_Product_Importer
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
		$this->setup_media_paths();
	}

	/**
	 * Initialize WordPress hooks
	 */
	private function init_hooks() {
		// Add admin menu
		add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );

		// Register AJAX handlers
		add_action( 'wp_ajax_prilabsa_import_products', array( $this, 'ajax_import_products' ) );
		add_action( 'wp_ajax_prilabsa_validate_files', array( $this, 'ajax_validate_files' ) );

		// Load text domain
		add_action( 'init', array( $this, 'load_textdomain' ) );

		// Add admin styles and scripts
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_assets' ) );
	}

	/**
	 * Load plugin text domain
	 */
	public function load_textdomain() {
		load_plugin_textdomain(
			'prilabsa-importer',
			false,
			dirname( plugin_basename( __FILE__ ) ) . '/languages'
		);
	}

	/**
	 * Setup media paths
	 */
	private function setup_media_paths() {
		$base_path = WP_CONTENT_DIR . '/uploads/prilabsa-productos';

		$this->media_paths = array(
			'images' => $base_path . '/imagenes',
			'pdfs'   => $base_path . '/pdfs',
		);
	}

	/**
	 * Add admin menu
	 */
	public function add_admin_menu() {
		add_submenu_page(
			'edit.php?post_type=productos',
			__( 'Importar Productos', 'prilabsa-importer' ),
			__( 'Importar Productos', 'prilabsa-importer' ),
			'manage_options',
			'prilabsa-import-products',
			array( $this, 'render_admin_page' )
		);
	}

	/**
	 * Enqueue admin assets
	 *
	 * @param string $hook Current admin page hook.
	 */
	public function enqueue_admin_assets( $hook ) {
		if ( 'productos_page_prilabsa-import-products' !== $hook ) {
			return;
		}

		wp_enqueue_style(
			'prilabsa-importer-admin',
			plugins_url( 'assets/css/admin.css', __FILE__ ),
			array(),
			self::VERSION
		);

		wp_enqueue_script(
			'prilabsa-importer-admin',
			plugins_url( 'assets/js/admin.js', __FILE__ ),
			array( 'jquery' ),
			self::VERSION,
			true
		);

		wp_localize_script(
			'prilabsa-importer-admin',
			'prilabsaImporter',
			array(
				'ajaxurl' => admin_url( 'admin-ajax.php' ),
				'nonce'   => wp_create_nonce( 'prilabsa_import_nonce' ),
			)
		);
	}

	/**
	 * Render admin page
	 */
	public function render_admin_page() {
		?>
		<div class="wrap">
			<h1><?php esc_html_e( 'Importador de Productos PRILABSA', 'prilabsa-importer' ); ?></h1>

			<div class="card">
				<h2><?php esc_html_e( 'Importar desde JSON', 'prilabsa-importer' ); ?></h2>
				<p><?php esc_html_e( 'Este proceso importará todos los productos desde el archivo JSON del catálogo PRILABSA 2025.', 'prilabsa-importer' ); ?></p>

				<form id="prilabsa-import-form" method="post">
					<?php wp_nonce_field( 'prilabsa_import_products', 'prilabsa_import_nonce' ); ?>

					<table class="form-table">
						<tr>
							<th scope="row">
								<label for="json_file_path"><?php esc_html_e( 'Ruta del archivo JSON', 'prilabsa-importer' ); ?></label>
							</th>
							<td>
								<input type="text"
									   id="json_file_path"
									   name="json_file_path"
									   class="regular-text"
									   value="<?php echo esc_attr( $this->get_default_json_path() ); ?>"
									   required />
								<p class="description">
									<?php esc_html_e( 'Ruta absoluta al archivo PRILABSA_CATALOGO_WEB_2025.json', 'prilabsa-importer' ); ?>
								</p>
							</td>
						</tr>

						<tr>
							<th scope="row">
								<label for="images_path"><?php esc_html_e( 'Ruta de imágenes', 'prilabsa-importer' ); ?></label>
							</th>
							<td>
								<input type="text"
									   id="images_path"
									   name="images_path"
									   class="regular-text"
									   value="<?php echo esc_attr( $this->get_default_images_path() ); ?>"
									   required />
								<p class="description">
									<?php esc_html_e( 'Ruta absoluta a la carpeta que contiene las imágenes PNG de productos', 'prilabsa-importer' ); ?>
								</p>
							</td>
						</tr>

						<tr>
							<th scope="row">
								<label for="pdfs_path"><?php esc_html_e( 'Ruta de PDFs', 'prilabsa-importer' ); ?></label>
							</th>
							<td>
								<input type="text"
									   id="pdfs_path"
									   name="pdfs_path"
									   class="regular-text"
									   value="<?php echo esc_attr( $this->get_default_pdfs_path() ); ?>"
									   required />
								<p class="description">
									<?php esc_html_e( 'Ruta absoluta a la carpeta que contiene los archivos PDF de fichas técnicas', 'prilabsa-importer' ); ?>
								</p>
							</td>
						</tr>

						<tr>
							<th scope="row">
								<label for="update_existing"><?php esc_html_e( 'Actualizar existentes', 'prilabsa-importer' ); ?></label>
							</th>
							<td>
								<input type="checkbox"
									   id="update_existing"
									   name="update_existing"
									   value="1" />
								<label for="update_existing">
									<?php esc_html_e( 'Actualizar productos existentes (comparar por código)', 'prilabsa-importer' ); ?>
								</label>
							</td>
						</tr>

						<tr>
							<th scope="row">
								<label for="dry_run"><?php esc_html_e( 'Modo prueba', 'prilabsa-importer' ); ?></label>
							</th>
							<td>
								<input type="checkbox"
									   id="dry_run"
									   name="dry_run"
									   value="1"
									   checked />
								<label for="dry_run">
									<?php esc_html_e( 'Ejecutar en modo prueba (no guardar cambios)', 'prilabsa-importer' ); ?>
								</label>
							</td>
						</tr>
					</table>

					<p class="submit">
						<button type="button"
								id="validate-files-btn"
								class="button button-secondary">
							<?php esc_html_e( 'Validar Archivos', 'prilabsa-importer' ); ?>
						</button>

						<button type="submit"
								id="import-products-btn"
								class="button button-primary">
							<?php esc_html_e( 'Iniciar Importación', 'prilabsa-importer' ); ?>
						</button>
					</p>
				</form>

				<div id="import-progress" style="display:none;">
					<h3><?php esc_html_e( 'Progreso de Importación', 'prilabsa-importer' ); ?></h3>
					<div class="progress-bar">
						<div class="progress-bar-fill" style="width: 0%;"></div>
					</div>
					<p class="progress-text">0%</p>
					<div id="import-log"></div>
				</div>

				<div id="import-results" style="display:none;">
					<h3><?php esc_html_e( 'Resultados de Importación', 'prilabsa-importer' ); ?></h3>
					<div id="results-content"></div>
				</div>
			</div>
		</div>
		<?php
	}

	/**
	 * Get default JSON file path
	 *
	 * @return string Default JSON path.
	 */
	private function get_default_json_path() {
		return WP_CONTENT_DIR . '/uploads/prilabsa-productos/PRILABSA_CATALOGO_WEB_2025.json';
	}

	/**
	 * Get default images path
	 *
	 * @return string Default images path.
	 */
	private function get_default_images_path() {
		return WP_CONTENT_DIR . '/uploads/prilabsa-productos/imagenes';
	}

	/**
	 * Get default PDFs path
	 *
	 * @return string Default PDFs path.
	 */
	private function get_default_pdfs_path() {
		return WP_CONTENT_DIR . '/uploads/prilabsa-productos/pdfs';
	}

	/**
	 * AJAX handler for validating files
	 */
	public function ajax_validate_files() {
		check_ajax_referer( 'prilabsa_import_nonce', 'nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'Permisos insuficientes', 'prilabsa-importer' ) ) );
		}

		$json_path   = sanitize_text_field( $_POST['json_path'] ?? '' );
		$images_path = sanitize_text_field( $_POST['images_path'] ?? '' );
		$pdfs_path   = sanitize_text_field( $_POST['pdfs_path'] ?? '' );

		$validation = array(
			'json_exists'   => file_exists( $json_path ),
			'json_readable' => is_readable( $json_path ),
			'images_exists' => is_dir( $images_path ),
			'pdfs_exists'   => is_dir( $pdfs_path ),
			'json_valid'    => false,
			'product_count' => 0,
			'errors'        => array(),
		);

		// Validate JSON
		if ( $validation['json_exists'] && $validation['json_readable'] ) {
			$json_content = file_get_contents( $json_path );
			$data         = json_decode( $json_content, true );

			if ( json_last_error() === JSON_ERROR_NONE ) {
				$validation['json_valid']    = true;
				$validation['product_count'] = count( $data['productos'] ?? array() );
			} else {
				$validation['errors'][] = sprintf(
					__( 'Error al leer JSON: %s', 'prilabsa-importer' ),
					json_last_error_msg()
				);
			}
		} else {
			$validation['errors'][] = __( 'Archivo JSON no encontrado o no legible', 'prilabsa-importer' );
		}

		wp_send_json_success( $validation );
	}

	/**
	 * AJAX handler for importing products
	 */
	public function ajax_import_products() {
		check_ajax_referer( 'prilabsa_import_nonce', 'nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'Permisos insuficientes', 'prilabsa-importer' ) ) );
		}

		// Increase execution time and memory
		set_time_limit( 600 ); // 10 minutes
		ini_set( 'memory_limit', '512M' );

		$json_path       = sanitize_text_field( $_POST['json_path'] ?? '' );
		$images_path     = sanitize_text_field( $_POST['images_path'] ?? '' );
		$pdfs_path       = sanitize_text_field( $_POST['pdfs_path'] ?? '' );
		$update_existing = isset( $_POST['update_existing'] ) && '1' === $_POST['update_existing'];
		$dry_run         = isset( $_POST['dry_run'] ) && '1' === $_POST['dry_run'];

		$result = $this->import_from_json(
			$json_path,
			$images_path,
			$pdfs_path,
			$update_existing,
			$dry_run
		);

		if ( is_wp_error( $result ) ) {
			wp_send_json_error( array( 'message' => $result->get_error_message() ) );
		}

		wp_send_json_success( $result );
	}

	/**
	 * Import products from JSON file
	 *
	 * @param string $json_path       Path to JSON file.
	 * @param string $images_path     Path to images folder.
	 * @param string $pdfs_path       Path to PDFs folder.
	 * @param bool   $update_existing Update existing products.
	 * @param bool   $dry_run         Dry run mode.
	 * @return array|WP_Error Import results or error.
	 */
	public function import_from_json( $json_path, $images_path, $pdfs_path, $update_existing = false, $dry_run = false ) {
		// Reset statistics
		$this->stats = array(
			'total_processed'    => 0,
			'successful_imports' => 0,
			'failed_imports'     => 0,
			'updated_products'   => 0,
			'skipped_products'   => 0,
			'errors'             => array(),
			'start_time'         => microtime( true ),
			'end_time'           => 0,
		);

		// Validate JSON file
		if ( ! file_exists( $json_path ) ) {
			return new WP_Error( 'file_not_found', __( 'Archivo JSON no encontrado', 'prilabsa-importer' ) );
		}

		// Read and parse JSON
		$json_content = file_get_contents( $json_path );
		$data         = json_decode( $json_content, true );

		if ( json_last_error() !== JSON_ERROR_NONE ) {
			return new WP_Error(
				'json_parse_error',
				sprintf( __( 'Error al parsear JSON: %s', 'prilabsa-importer' ), json_last_error_msg() )
			);
		}

		if ( ! isset( $data['productos'] ) || ! is_array( $data['productos'] ) ) {
			return new WP_Error( 'invalid_json', __( 'Estructura JSON inválida: falta array de productos', 'prilabsa-importer' ) );
		}

		$productos = $data['productos'];
		$total     = count( $productos );

		$this->log_message( sprintf( __( 'Iniciando importación de %d productos...', 'prilabsa-importer' ), $total ) );

		if ( $dry_run ) {
			$this->log_message( __( 'MODO PRUEBA: No se guardarán cambios', 'prilabsa-importer' ) );
		}

		// Start transaction (using database transaction if possible)
		global $wpdb;
		$wpdb->query( 'START TRANSACTION' );

		try {
			foreach ( $productos as $index => $producto_data ) {
				$this->stats['total_processed']++;

				$result = $this->import_single_product(
					$producto_data,
					$images_path,
					$pdfs_path,
					$update_existing,
					$dry_run
				);

				if ( is_wp_error( $result ) ) {
					$this->stats['failed_imports']++;
					$this->stats['errors'][] = sprintf(
						__( 'Producto %d (%s): %s', 'prilabsa-importer' ),
						$index + 1,
						$producto_data['codigo'] ?? 'N/A',
						$result->get_error_message()
					);
				} elseif ( 'updated' === $result ) {
					$this->stats['updated_products']++;
				} elseif ( 'skipped' === $result ) {
					$this->stats['skipped_products']++;
				} else {
					$this->stats['successful_imports']++;
				}

				// Log progress every 10 products
				if ( 0 === ( $this->stats['total_processed'] % 10 ) ) {
					$this->log_message(
						sprintf(
							__( 'Progreso: %d/%d productos procesados', 'prilabsa-importer' ),
							$this->stats['total_processed'],
							$total
						)
					);
				}
			}

			// Commit or rollback
			if ( $dry_run ) {
				$wpdb->query( 'ROLLBACK' );
				$this->log_message( __( 'ROLLBACK: Cambios revertidos (modo prueba)', 'prilabsa-importer' ) );
			} else {
				$wpdb->query( 'COMMIT' );
				$this->log_message( __( 'COMMIT: Cambios guardados exitosamente', 'prilabsa-importer' ) );
			}
		} catch ( Exception $e ) {
			$wpdb->query( 'ROLLBACK' );
			return new WP_Error( 'import_exception', $e->getMessage() );
		}

		$this->stats['end_time'] = microtime( true );
		$this->stats['duration'] = round( $this->stats['end_time'] - $this->stats['start_time'], 2 );

		return $this->stats;
	}

	/**
	 * Import single product
	 *
	 * @param array  $data            Product data from JSON.
	 * @param string $images_path     Path to images folder.
	 * @param string $pdfs_path       Path to PDFs folder.
	 * @param bool   $update_existing Update if exists.
	 * @param bool   $dry_run         Dry run mode.
	 * @return int|string|WP_Error Post ID, 'updated', 'skipped', or error.
	 */
	private function import_single_product( $data, $images_path, $pdfs_path, $update_existing = false, $dry_run = false ) {
		// Validate required fields
		if ( empty( $data['codigo'] ) || empty( $data['nombre'] ) ) {
			return new WP_Error( 'missing_required_fields', __( 'Faltan campos requeridos: codigo o nombre', 'prilabsa-importer' ) );
		}

		// Check if product exists by codigo
		$existing_post_id = $this->get_product_by_codigo( $data['codigo'] );

		if ( $existing_post_id && ! $update_existing ) {
			return 'skipped';
		}

		// Prepare post data
		$post_data = array(
			'post_title'   => sanitize_text_field( $data['nombre'] ),
			'post_content' => wp_kses_post( $data['descripcion'] ?? '' ),
			'post_status'  => 'publish',
			'post_type'    => 'productos',
			'post_excerpt' => wp_trim_words( $data['descripcion'] ?? '', 30 ),
		);

		if ( $existing_post_id ) {
			$post_data['ID'] = $existing_post_id;
		}

		// Don't actually insert/update if dry run
		if ( $dry_run ) {
			$post_id = $existing_post_id ?: 999999; // Fake ID for dry run
		} else {
			$post_id = wp_insert_post( $post_data, true );

			if ( is_wp_error( $post_id ) ) {
				return $post_id;
			}
		}

		// Update ACF fields
		$acf_result = $this->update_acf_fields( $post_id, $data, $images_path, $pdfs_path, $dry_run );

		if ( is_wp_error( $acf_result ) ) {
			return $acf_result;
		}

		// Set featured image
		if ( ! empty( $data['imagen'] ) ) {
			$image_result = $this->set_featured_image( $post_id, $data['imagen'], $images_path, $dry_run );
			if ( is_wp_error( $image_result ) ) {
				$this->log_message( sprintf( __( 'Advertencia: No se pudo establecer imagen destacada para %s', 'prilabsa-importer' ), $data['codigo'] ) );
			}
		}

		return $existing_post_id ? 'updated' : $post_id;
	}

	/**
	 * Get product by codigo
	 *
	 * @param string $codigo Product code.
	 * @return int|null Post ID or null.
	 */
	private function get_product_by_codigo( $codigo ) {
		$args = array(
			'post_type'      => 'productos',
			'post_status'    => 'any',
			'posts_per_page' => 1,
			'fields'         => 'ids',
			'meta_query'     => array(
				array(
					'key'     => 'codigo',
					'value'   => sanitize_text_field( $codigo ),
					'compare' => '=',
				),
			),
		);

		$query = new WP_Query( $args );

		return $query->have_posts() ? $query->posts[0] : null;
	}

	/**
	 * Update ACF fields for product
	 *
	 * @param int    $post_id      Post ID.
	 * @param array  $data         Product data.
	 * @param string $images_path  Images path.
	 * @param string $pdfs_path    PDFs path.
	 * @param bool   $dry_run      Dry run mode.
	 * @return bool|WP_Error True on success, error on failure.
	 */
	private function update_acf_fields( $post_id, $data, $images_path, $pdfs_path, $dry_run = false ) {
		if ( ! function_exists( 'update_field' ) ) {
			return new WP_Error( 'acf_not_available', __( 'ACF no está disponible', 'prilabsa-importer' ) );
		}

		$fields = array(
			'descripcion'  => wp_kses_post( $data['descripcion'] ?? '' ),
			'beneficios'   => sanitize_textarea_field( $data['beneficios'] ?? '' ),
			'presentacion' => sanitize_textarea_field( $data['presentacion'] ?? '' ),
			'categoria'    => sanitize_text_field( $data['categoria'] ?? '' ),
			'subcategoria' => sanitize_text_field( $data['subcategoria'] ?? '' ),
			'codigo'       => sanitize_text_field( $data['codigo'] ?? '' ),
		);

		// Parse especificaciones into repeater format
		if ( ! empty( $data['especificaciones'] ) ) {
			$fields['especificaciones'] = $this->parse_especificaciones( $data['especificaciones'] );
		}

		// Handle PDF
		if ( ! empty( $data['pdf'] ) ) {
			$pdf_path = trailingslashit( $pdfs_path ) . $data['pdf'];
			if ( file_exists( $pdf_path ) ) {
				$pdf_id = $this->upload_file( $pdf_path, $post_id, $dry_run );
				if ( ! is_wp_error( $pdf_id ) ) {
					$fields['pdf'] = $pdf_id;
				}
			}
		}

		// Update fields
		if ( ! $dry_run ) {
			foreach ( $fields as $field_name => $field_value ) {
				update_field( $field_name, $field_value, $post_id );
			}
		}

		return true;
	}

	/**
	 * Parse especificaciones text into repeater format
	 *
	 * @param string $text Especificaciones text.
	 * @return array Repeater data.
	 */
	private function parse_especificaciones( $text ) {
		$repeater = array();
		$lines    = explode( "\n", $text );

		foreach ( $lines as $line ) {
			$line = trim( $line );

			// Skip empty lines or headers
			if ( empty( $line ) || false !== stripos( $line, 'ANÁLISIS GARANTIZADO' ) || false !== stripos( $line, 'APLICACIÓN' ) ) {
				continue;
			}

			// Try to split by colon
			if ( strpos( $line, ':' ) !== false ) {
				list( $clave, $valor ) = array_map( 'trim', explode( ':', $line, 2 ) );
				$clave = ltrim( $clave, '•-' );

				$repeater[] = array(
					'clave' => sanitize_text_field( $clave ),
					'valor' => sanitize_text_field( $valor ),
				);
			}
		}

		return $repeater;
	}

	/**
	 * Set featured image for product
	 *
	 * @param int    $post_id     Post ID.
	 * @param string $image_file  Image filename.
	 * @param string $images_path Images folder path.
	 * @param bool   $dry_run     Dry run mode.
	 * @return int|WP_Error Attachment ID or error.
	 */
	private function set_featured_image( $post_id, $image_file, $images_path, $dry_run = false ) {
		$image_path = trailingslashit( $images_path ) . $image_file;

		if ( ! file_exists( $image_path ) ) {
			return new WP_Error( 'image_not_found', sprintf( __( 'Imagen no encontrada: %s', 'prilabsa-importer' ), $image_file ) );
		}

		$attachment_id = $this->upload_file( $image_path, $post_id, $dry_run );

		if ( is_wp_error( $attachment_id ) ) {
			return $attachment_id;
		}

		if ( ! $dry_run ) {
			set_post_thumbnail( $post_id, $attachment_id );
		}

		return $attachment_id;
	}

	/**
	 * Upload file to WordPress media library
	 *
	 * @param string $file_path File path.
	 * @param int    $post_id   Post ID to attach to.
	 * @param bool   $dry_run   Dry run mode.
	 * @return int|WP_Error Attachment ID or error.
	 */
	private function upload_file( $file_path, $post_id, $dry_run = false ) {
		if ( ! file_exists( $file_path ) ) {
			return new WP_Error( 'file_not_found', __( 'Archivo no encontrado', 'prilabsa-importer' ) );
		}

		if ( $dry_run ) {
			return 123456; // Fake attachment ID for dry run
		}

		require_once ABSPATH . 'wp-admin/includes/file.php';
		require_once ABSPATH . 'wp-admin/includes/media.php';
		require_once ABSPATH . 'wp-admin/includes/image.php';

		$filename   = basename( $file_path );
		$upload_dir = wp_upload_dir();
		$upload_file = $upload_dir['path'] . '/' . $filename;

		// Copy file to uploads directory
		if ( ! copy( $file_path, $upload_file ) ) {
			return new WP_Error( 'copy_failed', __( 'No se pudo copiar el archivo', 'prilabsa-importer' ) );
		}

		// Create attachment
		$filetype = wp_check_filetype( $filename, null );

		$attachment = array(
			'post_mime_type' => $filetype['type'],
			'post_title'     => sanitize_file_name( pathinfo( $filename, PATHINFO_FILENAME ) ),
			'post_content'   => '',
			'post_status'    => 'inherit',
		);

		$attachment_id = wp_insert_attachment( $attachment, $upload_file, $post_id );

		if ( is_wp_error( $attachment_id ) ) {
			return $attachment_id;
		}

		// Generate metadata
		$attach_data = wp_generate_attachment_metadata( $attachment_id, $upload_file );
		wp_update_attachment_metadata( $attachment_id, $attach_data );

		return $attachment_id;
	}

	/**
	 * Log message
	 *
	 * @param string $message Log message.
	 */
	private function log_message( $message ) {
		if ( defined( 'WP_DEBUG' ) && WP_DEBUG && defined( 'WP_DEBUG_LOG' ) && WP_DEBUG_LOG ) {
			error_log( '[PRILABSA Importer] ' . $message );
		}
	}
}

/**
 * Initialize the plugin
 */
function prilabsa_product_importer_init() {
	return PRILABSA_Product_Importer::get_instance();
}

// Start the plugin
add_action( 'plugins_loaded', 'prilabsa_product_importer_init' );
