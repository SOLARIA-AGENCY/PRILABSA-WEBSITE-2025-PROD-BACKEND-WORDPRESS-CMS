<?php
/**
 * Plugin Name: PRILABSA Product Importer
 * Plugin URI: https://www.prilabsa.com
 * Description: Importador masivo de productos PRILABSA desde JSON y CSV
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
 * Main Importer Class
 */
class PRILABSA_Product_Importer {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );
		add_action( 'admin_init', array( $this, 'handle_import' ) );
	}

	/**
	 * Add admin menu
	 */
	public function add_admin_menu() {
		add_submenu_page(
			'edit.php?post_type=producto',
			'Importar Productos',
			'Importar Productos',
			'manage_options',
			'prilabsa-import',
			array( $this, 'import_page' )
		);
	}

	/**
	 * Import page
	 */
	public function import_page() {
		?>
		<div class="wrap">
			<h1>Importar Productos PRILABSA</h1>
			
			<div class="card">
				<h2>Importar desde Archivo</h2>
				<p>Sube un archivo JSON o CSV con los productos a importar.</p>
				
				<form method="post" enctype="multipart/form-data">
					<?php wp_nonce_field( 'prilabsa_import_nonce', 'nonce' ); ?>
					
					<table class="form-table">
						<tr>
							<th scope="row">
								<label for="import_file">Archivo de Importación</label>
							</th>
							<td>
								<input type="file" id="import_file" name="import_file" accept=".json,.csv" required>
								<p class="description">Formatos aceptados: JSON, CSV</p>
							</td>
						</tr>
						<tr>
							<th scope="row">
								<label for="dry_run">Modo de Prueba</label>
							</th>
							<td>
								<input type="checkbox" id="dry_run" name="dry_run" value="1">
								<p class="description">Ejecutar en modo prueba (no crea productos)</p>
							</td>
						</tr>
						<tr>
							<th scope="row">
								<label for="overwrite">Sobrescribir Existente</label>
							</th>
							<td>
								<input type="checkbox" id="overwrite" name="overwrite" value="1">
								<p class="description">Actualizar productos existentes por código</p>
							</td>
						</tr>
					</table>
					
					<?php submit_button( 'Importar Productos' ); ?>
				</form>
			</div>
			
			<div class="card">
				<h2>Importar desde Catálogo JSON</h2>
				<p>Importar productos desde el catálogo JSON preconfigurado.</p>
				
				<form method="post">
					<?php wp_nonce_field( 'prilabsa_import_json_nonce', 'json_nonce' ); ?>
					
					<table class="form-table">
						<tr>
							<th scope="row">
								<label for="json_file">Archivo JSON del Catálogo</label>
							</th>
							<td>
								<select id="json_file" name="json_file">
									<option value="">Seleccionar archivo</option>
									<option value="PRILABSA_CATALOGO_WEB_2025.json">Catálogo Completo 2025</option>
								</select>
								<p class="description">Archivo JSON del catálogo de productos</p>
							</td>
						</tr>
						<tr>
							<th scope="row">
								<label for="json_dry_run">Modo de Prueba</label>
							</th>
							<td>
								<input type="checkbox" id="json_dry_run" name="json_dry_run" value="1" checked>
								<p class="description">Ejecutar en modo prueba (no crea productos)</p>
							</td>
						</tr>
					</table>
					
					<?php submit_button( 'Importar desde JSON' ); ?>
				</form>
			</div>
			
			<?php if ( isset( $_GET['import_result'] ) ) : ?>
			<div class="notice notice-success is-dismissible">
				<p><strong>Importación Completada:</strong></p>
				<pre><?php echo esc_html( $_GET['import_result'] ); ?></pre>
			</div>
			<?php endif; ?>
			
			<?php if ( isset( $_GET['import_error'] ) ) : ?>
			<div class="notice notice-error is-dismissible">
				<p><strong>Error en Importación:</strong></p>
				<p><?php echo esc_html( $_GET['import_error'] ); ?></p>
			</div>
			<?php endif; ?>
		</div>
		<?php
	}

	/**
	 * Handle import
	 */
	public function handle_import() {
		// Handle file upload
		if ( isset( $_POST['submit'] ) && isset( $_FILES['import_file'] ) ) {
			if ( ! wp_verify_nonce( $_POST['nonce'], 'prilabsa_import_nonce' ) ) {
				wp_die( 'Security check failed' );
			}

			$file = $_FILES['import_file'];
			$dry_run = isset( $_POST['dry_run'] );
			$overwrite = isset( $_POST['overwrite'] );

			if ( $file['error'] !== UPLOAD_ERR_OK ) {
				wp_redirect( add_query_arg( 'import_error', 'Error al subir archivo' ) );
				exit;
			}

			$file_content = file_get_contents( $file['tmp_name'] );
			$extension = pathinfo( $file['name'], PATHINFO_EXTENSION );

			if ( $extension === 'json' ) {
				$data = json_decode( $file_content, true );
			} elseif ( $extension === 'csv' ) {
				$data = $this->parse_csv( $file_content );
			} else {
				wp_redirect( add_query_arg( 'import_error', 'Formato de archivo no soportado' ) );
				exit;
			}

			$result = $this->import_products( $data, $dry_run, $overwrite );
			
			$redirect_url = add_query_arg( 'import_result', json_encode( $result ) );
			wp_redirect( $redirect_url );
			exit;
		}

		// Handle JSON import
		if ( isset( $_POST['submit'] ) && isset( $_POST['json_file'] ) ) {
			if ( ! wp_verify_nonce( $_POST['json_nonce'], 'prilabsa_import_json_nonce' ) ) {
				wp_die( 'Security check failed' );
			}

			$json_file = $_POST['json_file'];
			$dry_run = isset( $_POST['json_dry_run'] );

			if ( empty( $json_file ) ) {
				wp_redirect( add_query_arg( 'import_error', 'Selecciona un archivo JSON' ) );
				exit;
			}

			// Try to load JSON from uploads directory
			$upload_dir = wp_upload_dir();
			$json_path = $upload_dir['basedir'] . '/prilabsa-productos/' . $json_file;

			if ( ! file_exists( $json_path ) ) {
				wp_redirect( add_query_arg( 'import_error', 'Archivo JSON no encontrado' ) );
				exit;
			}

			$json_content = file_get_contents( $json_path );
			$data = json_decode( $json_content, true );

			if ( ! $data ) {
				wp_redirect( add_query_arg( 'import_error', 'Error al decodificar JSON' ) );
				exit;
			}

			$result = $this->import_products( $data, $dry_run, false );
			
			$redirect_url = add_query_arg( 'import_result', json_encode( $result ) );
			wp_redirect( $redirect_url );
			exit;
		}
	}

	/**
	 * Import products
	 */
	private function import_products( $data, $dry_run = false, $overwrite = false ) {
		$imported = 0;
		$updated = 0;
		$errors = 0;

		if ( ! isset( $data['productos'] ) ) {
			return array( 'error' => 'Formato JSON inválido' );
		}

		foreach ( $data['productos'] as $product_data ) {
			try {
				$result = $this->import_single_product( $product_data, $dry_run, $overwrite );
				
				if ( $result['status'] === 'created' ) {
					$imported++;
				} elseif ( $result['status'] === 'updated' ) {
					$updated++;
				} else {
					$errors++;
				}
			} catch ( Exception $e ) {
				$errors++;
			}
		}

		return array(
			'imported' => $imported,
			'updated'  => $updated,
			'errors'   => $errors,
			'total'    => count( $data['productos'] ),
			'dry_run'  => $dry_run,
		);
	}

	/**
	 * Import single product
	 */
	private function import_single_product( $data, $dry_run = false, $overwrite = false ) {
		$codigo = $data['codigo'] ?? '';
		
		if ( empty( $codigo ) ) {
			return array( 'status' => 'error', 'message' => 'Código vacío' );
		}

		// Check if product exists by code
		$existing = get_posts( array(
			'post_type'  => 'producto',
			'meta_key'   => '_codigo_producto',
			'meta_value' => $codigo,
			'posts_per_page' => 1,
		) );

		$post_data = array(
			'post_type'   => 'producto',
			'post_title'  => $data['nombre'] ?? $codigo,
			'post_content'=> $data['descripcion'] ?? '',
			'post_excerpt'=> $data['resumen'] ?? '',
			'post_status' => 'publish',
		);

		if ( ! empty( $existing ) && $overwrite ) {
			$post_data['ID'] = $existing[0]->ID;
			$post_id = wp_update_post( $post_data );
			$status = 'updated';
		} elseif ( empty( $existing ) ) {
			if ( $dry_run ) {
				return array( 'status' => 'created', 'message' => "Producto $codigo sería creado" );
			}
			$post_id = wp_insert_post( $post_data );
			$status = 'created';
		} else {
			return array( 'status' => 'skipped', 'message' => "Producto $codigo ya existe" );
		}

		if ( ! $post_id ) {
			return array( 'status' => 'error', 'message' => "Error al guardar producto $codigo" );
		}

		// Save custom fields
		update_post_meta( $post_id, '_codigo_producto', sanitize_text_field( $codigo ) );
		
		if ( isset( $data['precio'] ) ) {
			update_post_meta( $post_id, '_precio_producto', floatval( $data['precio'] ) );
		}

		if ( isset( $data['imagen'] ) ) {
			update_post_meta( $post_id, '_imagen_producto', esc_url_raw( $data['imagen'] ) );
		}

		if ( isset( $data['ficha_tecnica'] ) ) {
			update_post_meta( $post_id, '_ficha_tecnica', esc_url_raw( $data['ficha_tecnica'] ) );
		}

		// Set categories
		if ( isset( $data['categoria'] ) ) {
			wp_set_post_terms( $post_id, array( $data['categoria'] ), 'categoria_producto' );
		}

		return array( 'status' => $status, 'post_id' => $post_id );
	}

	/**
	 * Parse CSV
	 */
	private function parse_csv( $content ) {
		$lines = explode( "\n", $content );
		$headers = str_getcsv( array_shift( $lines ) );
		$data = array( 'productos' => array() );

		foreach ( $lines as $line ) {
			if ( empty( trim( $line ) ) ) continue;
			
			$values = str_getcsv( $line );
			$product = array();
			
			foreach ( $headers as $i => $header ) {
				$product[ $header ] = $values[ $i ] ?? '';
			}
			
			$data['productos'][] = $product;
		}

		return $data;
	}
}

// Initialize the plugin
new PRILABSA_Product_Importer();