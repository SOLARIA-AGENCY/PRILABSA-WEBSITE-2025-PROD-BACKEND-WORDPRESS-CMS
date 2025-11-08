<?php
/**
 * PRILABSA Admin UI Customizations
 *
 * Simplify WordPress admin interface for productos (headless CMS)
 * - Hide preview button (no frontend, headless-only)
 * - Clean UI for non-technical users
 * - Remove unnecessary WordPress features
 *
 * @package PRILABSA_Admin_UI
 * @author SOLARIA AGENCY
 * @version 1.0.0
 */

// Security: Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Hide preview button for productos post type
 * Since PRILABSA is headless, products are consumed via API, not WordPress frontend
 */
function prilabsa_hide_preview_button() {
	global $post_type;

	// Only apply to productos, blog, and noticias edit screens
	if ( ! in_array( $post_type, array( 'productos', 'blog', 'noticias' ), true ) ) {
		return;
	}

	?>
	<style type="text/css">
		/* Hide preview button (headless CMS - no WordPress frontend) */
		#post-preview,
		.preview.button,
		a.preview.button {
			display: none !important;
		}

		/* Hide "View Post" link after publish */
		.post-publish-panel__postpublish-header a,
		.components-snackbar__content a {
			display: none !important;
		}

		/* Hide Gutenberg preview dropdown */
		.editor-post-preview,
		.editor-post-preview__dropdown,
		.components-dropdown-menu__menu-item.is-active[aria-label*="Preview"] {
			display: none !important;
		}

		/* Simplify publish panel - remove "view post" link */
		.post-publish-panel__postpublish-buttons .components-button.is-link {
			display: none !important;
		}

		/* Clean up unnecessary Gutenberg panels */
		.editor-post-permalink,
		.editor-post-permalink__link,
		.components-panel__body.edit-post-post-link {
			display: none !important;
		}

		/* ===================================== */
		/* MAKE PUBLISH BUTTON MORE PROMINENT   */
		/* ===================================== */

		/* Classic Editor - Make publish box stand out */
		#submitdiv {
			background: #f0f8ff !important;
			border: 2px solid #0073aa !important;
			box-shadow: 0 2px 8px rgba(0, 115, 170, 0.2) !important;
		}

		#submitdiv h2 {
			background: #0073aa !important;
			color: white !important;
			padding: 12px 15px !important;
			margin: -1px -1px 10px -1px !important;
			font-size: 15px !important;
		}

		/* Make primary publish button larger and more visible */
		#publish,
		#save-post {
			height: 40px !important;
			font-size: 15px !important;
			font-weight: 600 !important;
			min-width: 100% !important;
			margin-top: 8px !important;
			background: #0073aa !important;
			border-color: #0073aa !important;
			box-shadow: 0 2px 4px rgba(0, 115, 170, 0.3) !important;
			transition: all 0.2s ease !important;
		}

		#publish:hover,
		#save-post:hover {
			background: #005a87 !important;
			border-color: #005a87 !important;
			box-shadow: 0 4px 8px rgba(0, 115, 170, 0.4) !important;
			transform: translateY(-1px) !important;
		}

		/* Gutenberg Editor - Make publish button prominent */
		.editor-post-publish-button,
		.editor-post-publish-panel__toggle {
			min-height: 40px !important;
			font-size: 14px !important;
			font-weight: 600 !important;
			padding: 8px 20px !important;
			background: #0073aa !important;
			border-color: #0073aa !important;
			box-shadow: 0 2px 4px rgba(0, 115, 170, 0.3) !important;
		}

		.editor-post-publish-button:not(:disabled):not([aria-disabled=true]):hover,
		.editor-post-publish-panel__toggle:not(:disabled):not([aria-disabled=true]):hover {
			background: #005a87 !important;
			border-color: #005a87 !important;
			box-shadow: 0 4px 8px rgba(0, 115, 170, 0.4) !important;
		}

		/* Add visual indicator arrow pointing to publish button */
		#submitdiv:before {
			content: "👉 Haz clic en PUBLICAR cuando termines de editar";
			display: block;
			background: #fff3cd;
			color: #856404;
			padding: 10px;
			margin: -1px -1px 10px -1px;
			border: 1px solid #ffc107;
			border-radius: 3px;
			font-size: 13px;
			font-weight: 600;
			text-align: center;
		}

		/* Add custom banner for headless notice */
		.prilabsa-headless-notice {
			background: #e7f5fe;
			border-left: 4px solid #0073aa;
			padding: 12px 15px;
			margin: 10px 0 20px 0;
			font-size: 14px;
			line-height: 1.5;
		}

		.prilabsa-headless-notice strong {
			color: #0073aa;
		}

		.prilabsa-headless-notice code {
			background: #fff;
			padding: 2px 6px;
			border-radius: 3px;
			font-family: Consolas, Monaco, monospace;
			font-size: 13px;
		}
	</style>
	<?php
}

add_action( 'admin_head-post.php', 'prilabsa_hide_preview_button' );
add_action( 'admin_head-post-new.php', 'prilabsa_hide_preview_button' );

/**
 * Add headless CMS notice to productos edit screen
 * Inform users that content is consumed via API, not WordPress frontend
 */
function prilabsa_add_headless_notice() {
	global $post_type;

	if ( ! in_array( $post_type, array( 'productos', 'blog', 'noticias' ), true ) ) {
		return;
	}

	$post_type_labels = array(
		'productos' => 'producto',
		'blog'      => 'artículo de blog',
		'noticias'  => 'noticia',
	);

	$label = $post_type_labels[ $post_type ] ?? 'contenido';

	?>
	<div class="prilabsa-headless-notice">
		<strong>ℹ️ Modo Headless CMS:</strong>
		Este <?php echo esc_html( $label ); ?> será consumido por el frontend de PRILABSA a través de API.
		<strong>No necesitas previsualizarlo</strong> - publica directamente y se reflejará automáticamente en
		<code>https://www.prilabsa.com</code>
	</div>
	<script>
		// Move notice to top of editor (before title)
		document.addEventListener('DOMContentLoaded', function() {
			const notice = document.querySelector('.prilabsa-headless-notice');
			const editor = document.querySelector('.edit-post-visual-editor') ||
			               document.querySelector('#post-body-content') ||
			               document.querySelector('.block-editor-writing-flow');

			if (notice && editor) {
				editor.insertBefore(notice, editor.firstChild);
			}
		});
	</script>
	<?php
}

add_action( 'edit_form_after_title', 'prilabsa_add_headless_notice' );

/**
 * Remove unnecessary metaboxes from productos edit screen
 * Simplify UI for non-technical users
 */
function prilabsa_remove_metaboxes() {
	// Remove for productos
	remove_meta_box( 'slugdiv', 'productos', 'normal' );              // Slug
	remove_meta_box( 'postcustom', 'productos', 'normal' );           // Custom Fields
	remove_meta_box( 'commentstatusdiv', 'productos', 'normal' );     // Discussion
	remove_meta_box( 'commentsdiv', 'productos', 'normal' );          // Comments
	remove_meta_box( 'authordiv', 'productos', 'normal' );            // Author
	remove_meta_box( 'revisionsdiv', 'productos', 'normal' );         // Revisions
	remove_meta_box( 'trackbacksdiv', 'productos', 'normal' );        // Trackbacks

	// Remove for blog
	remove_meta_box( 'slugdiv', 'blog', 'normal' );
	remove_meta_box( 'postcustom', 'blog', 'normal' );
	remove_meta_box( 'commentstatusdiv', 'blog', 'normal' );
	remove_meta_box( 'commentsdiv', 'blog', 'normal' );

	// Remove for noticias
	remove_meta_box( 'slugdiv', 'noticias', 'normal' );
	remove_meta_box( 'postcustom', 'noticias', 'normal' );
	remove_meta_box( 'commentstatusdiv', 'noticias', 'normal' );
	remove_meta_box( 'commentsdiv', 'noticias', 'normal' );
}

add_action( 'admin_menu', 'prilabsa_remove_metaboxes' );

/**
 * Ocultar título nativo de WordPress para productos
 *
 * Usamos nombre_producto_es como título principal, no el título del post
 * Esto evita confusión entre título del post y nombres multiidioma
 */
function prilabsa_hide_native_title() {
	global $post_type;

	if ( ! in_array( $post_type, array( 'productos', 'blog', 'noticias' ), true ) ) {
		return;
	}

	?>
	<style>
		/* Ocultar título nativo de WordPress */
		#titlediv,
		#title-prompt-text {
			display: none !important;
		}

		/* Mensaje explicativo donde estaba el título */
		.wrap h1:after {
			content: "El nombre se gestiona en los campos ACF multiidioma (🇪🇸 🇬🇧 🇵🇹)";
			display: block;
			background: #fff3cd;
			border-left: 4px solid #ffc107;
			color: #856404;
			padding: 12px;
			margin: 15px 0;
			font-size: 13px;
			font-weight: normal;
			border-radius: 4px;
		}
	</style>
	<?php
}

add_action( 'admin_head-post.php', 'prilabsa_hide_native_title' );
add_action( 'admin_head-post-new.php', 'prilabsa_hide_native_title' );

/**
 * Customize Gutenberg editor for productos
 * Disable unnecessary features for cleaner UX
 */
function prilabsa_customize_gutenberg_editor() {
	global $post_type;

	if ( ! in_array( $post_type, array( 'productos', 'blog', 'noticias' ), true ) ) {
		return;
	}

	?>
	<script>
		// Wait for Gutenberg to load
		wp.domReady(function() {
			// Disable Code Editor (too technical for non-coders)
			if (wp.data && wp.data.dispatch('core/edit-post')) {
				wp.data.dispatch('core/edit-post').removeEditorPanel('post-excerpt');
			}
		});
	</script>
	<?php
}

add_action( 'admin_head-post.php', 'prilabsa_customize_gutenberg_editor' );
add_action( 'admin_head-post-new.php', 'prilabsa_customize_gutenberg_editor' );

/**
 * Move publish metabox to main column (after ACF fields)
 * Makes publish button more visible and intuitive for non-technical users
 */
function prilabsa_move_publish_to_main_column() {
	global $post_type;

	if ( ! in_array( $post_type, array( 'productos', 'blog', 'noticias' ), true ) ) {
		return;
	}

	?>
	<script>
		jQuery(document).ready(function($) {
			// Función principal para mover el botón de publicar
			function movePublishBox() {
				// Find publish metabox in sidebar
				const $publishBox = $('#submitdiv');

				if ($publishBox.length === 0) {
					console.log('⏳ Publish box not found yet...');
					return false;
				}

				// Verificar si ya fue movido
				if ($publishBox.data('moved-to-main')) {
					console.log('✅ Publish box already moved');
					return true;
				}

				// Find ACF field group (múltiples selectores para mayor compatibilidad)
				const $acfFields = $('.acf-field-group').last() ||
				                   $('.acf-fields').last() ||
				                   $('[data-key^="group_prilabsa"]').last();

				if ($acfFields.length === 0) {
					console.log('⏳ ACF fields not found yet, trying alternative selector');
					// Fallback: insert after post body
					const $postBody = $('#post-body-content');
					if ($postBody.length > 0) {
						$publishBox.insertAfter($postBody);
						$publishBox.css({
							'width': '100%',
							'margin-top': '30px',
							'box-shadow': '0 4px 12px rgba(0, 115, 170, 0.3)',
							'border': '3px solid #0073aa'
						});
						$publishBox.data('moved-to-main', true);
						console.log('✅ Publish box moved to main column (after post body)');
						return true;
					}
					return false;
				}

				// Move publish box after ACF fields
				$publishBox.insertAfter($acfFields);

				// Style the moved box
				$publishBox.css({
					'width': '100%',
					'margin-top': '30px',
					'margin-bottom': '30px',
					'box-shadow': '0 4px 12px rgba(0, 115, 170, 0.3)',
					'border': '3px solid #0073aa',
					'background': '#f0f8ff'
				});

				// Add visual separator
				$publishBox.before('<hr style="margin: 30px 0; border: 2px solid #e5e7eb;">');

				// Marcar como movido
				$publishBox.data('moved-to-main', true);

				console.log('✅ Publish box moved to main column (after ACF fields)');

				// Debug: Check why publish might be disabled
				const $publishButton = $('#publish');

				// Auto-enable publish button when all required fields are filled
				function checkAndEnablePublish() {
					let allFilled = true;
					let emptyFields = [];

					$('.acf-field.is-required').each(function() {
						const fieldName = $(this).data('name');
						const $input = $(this).find('input, textarea, select').not('[type="hidden"]');
						const fieldValue = $input.val();
						const isEmpty = !fieldValue || (typeof fieldValue === 'string' && fieldValue.trim().length === 0);

						if (isEmpty) {
							allFilled = false;
							emptyFields.push(fieldName);
						}
					});

					if (allFilled && $publishButton.prop('disabled')) {
						console.log('🔓 Auto-enabling publish button (all required fields filled)');
						$publishButton.prop('disabled', false).removeClass('disabled');
					} else if (!allFilled) {
						console.warn('⚠️ Publish button disabled - Empty fields:', emptyFields);
					}

					return allFilled;
				}

				// Check immediately
				checkAndEnablePublish();

				// Re-check when ACF fields change
				$(document).on('change blur', '.acf-field.is-required input, .acf-field.is-required textarea, .acf-field.is-required select', function() {
					setTimeout(checkAndEnablePublish, 100);
				});

				// Re-check every 2 seconds (fallback)
				setInterval(checkAndEnablePublish, 2000);

				if ($publishButton.prop('disabled')) {
					console.warn('⚠️ Publish button is DISABLED');
				} else {
					console.log('✅ Publish button is ENABLED');
				}

				return true;
			}

			// Intentar mover inmediatamente
			setTimeout(movePublishBox, 1000);

			// Reintentar después de 3 segundos si ACF tarda
			setTimeout(movePublishBox, 3000);

			// MutationObserver como fallback para detectar cuando ACF carga
			const observer = new MutationObserver(function(mutations) {
				// Intentar mover cuando detectamos cambios en el DOM
				const moved = movePublishBox();
				if (moved) {
					observer.disconnect(); // Detener observación una vez movido
				}
			});

			// Observar cambios en #post-body
			const postBody = document.querySelector('#post-body');
			if (postBody) {
				observer.observe(postBody, {
					childList: true,
					subtree: true
				});
			}
		});
	</script>
	<?php
}

add_action( 'admin_head-post.php', 'prilabsa_move_publish_to_main_column' );
add_action( 'admin_head-post-new.php', 'prilabsa_move_publish_to_main_column' );

/**
 * Add help text for ACF multiidioma fields
 * Guide users on how to fill fields correctly
 */
function prilabsa_add_acf_field_instructions() {
	?>
	<style>
		/* ===================================== */
		/* FORCE HORIZONTAL ALIGNMENT FOR NAMES */
		/* ===================================== */

		/**
		 * Estrategia: Forzar flexbox en el contenedor padre ACF
		 * Esto funciona mejor que float:left porque ACF respeta flex
		 */

		/* Detectar el contenedor de ACF fields y forzar flex cuando contiene campos multiidioma */
		.acf-fields:has(.acf-field[data-name="nombre_producto_es"]),
		.acf-fields:has(.acf-field[data-name="descripcion_es"]),
		.acf-fields:has(.acf-field[data-name="presentacion_es"]) {
			display: flex !important;
			flex-wrap: wrap !important;
			gap: 0 !important;
		}

		/* Forzar que los campos de nombres ocupen exactamente 33.33% */
		.acf-field[data-name="nombre_producto_es"],
		.acf-field[data-name="nombre_producto_en"],
		.acf-field[data-name="nombre_producto_pt"] {
			width: 33.33% !important;
			max-width: 33.33% !important;
			flex: 0 0 33.33% !important;
			display: inline-block !important;
			box-sizing: border-box !important;
		}

		/* Same for descripciones */
		.acf-field[data-name="descripcion_es"],
		.acf-field[data-name="descripcion_en"],
		.acf-field[data-name="descripcion_pt"] {
			width: 33.33% !important;
			max-width: 33.33% !important;
			flex: 0 0 33.33% !important;
			display: inline-block !important;
			box-sizing: border-box !important;
		}

		/* Same for presentaciones */
		.acf-field[data-name="presentacion_es"],
		.acf-field[data-name="presentacion_en"],
		.acf-field[data-name="presentacion_pt"] {
			width: 33.33% !important;
			max-width: 33.33% !important;
			flex: 0 0 33.33% !important;
			display: inline-block !important;
			box-sizing: border-box !important;
		}

		/* Beneficios también en 3 columnas por fila */
		.acf-field[data-name^="beneficio_1"],
		.acf-field[data-name^="beneficio_2"],
		.acf-field[data-name^="beneficio_3"] {
			width: 33.33% !important;
			max-width: 33.33% !important;
			flex: 0 0 33.33% !important;
			display: inline-block !important;
			box-sizing: border-box !important;
		}

		/* Campos de ancho completo (100%) */
		.acf-field[data-name="codigo"],
		.acf-field[data-name="categoria"],
		.acf-field[data-name="imagen_producto"],
		.acf-field[data-name="ficha_tecnica_pdf"] {
			width: 100% !important;
			max-width: 100% !important;
			flex: 0 0 100% !important;
		}

		/* Add visual row separators */
		.acf-field[data-name="codigo"] {
			border-top: 3px solid #0073aa;
			padding-top: 20px;
		}

		.acf-field[data-name="nombre_producto_es"] {
			border-top: 3px solid #10b981;
			padding-top: 20px;
			margin-top: 20px;
		}

		.acf-field[data-name="imagen_producto"],
		.acf-field[data-name="ficha_tecnica_pdf"] {
			border-top: 2px dashed #9ca3af;
			padding-top: 20px;
			margin-top: 20px;
		}

		/* Style ACF tabs for better visibility */
		.acf-tab-wrap .acf-tab-group li.active a {
			background: #0073aa;
			color: white;
			font-weight: bold;
		}

		/* Highlight required fields */
		.acf-field.is-required .acf-label label:after {
			content: " *";
			color: #d63638;
			font-weight: bold;
		}

		/* Add helper icons to ACF fields */
		.acf-field[data-name*="nombre_producto"] .acf-label:before,
		.acf-field[data-name*="descripcion"] .acf-label:before,
		.acf-field[data-name*="beneficio"] .acf-label:before {
			font-family: dashicons;
			margin-right: 5px;
		}

		.acf-field[data-name*="nombre_producto"] .acf-label:before {
			content: "\f481"; /* Tag icon */
		}

		.acf-field[data-name*="descripcion"] .acf-label:before {
			content: "\f123"; /* Document icon */
		}

		.acf-field[data-name*="beneficio"] .acf-label:before {
			content: "\f147"; /* Checkmark icon */
		}

		/* Better spacing for benefit fields */
		.acf-field[data-name*="beneficio"] {
			margin-bottom: 15px;
		}

		.acf-field[data-name*="beneficio_1"] .acf-label {
			color: #2271b1;
		}

		.acf-field[data-name*="beneficio_2"] .acf-label {
			color: #2271b1;
		}

		.acf-field[data-name*="beneficio_3"] .acf-label {
			color: #2271b1;
		}
	</style>
	<?php
}

add_action( 'acf/input/admin_head', 'prilabsa_add_acf_field_instructions' );

/**
 * Modify post updated messages for clarity
 * Custom messages for productos, blog, noticias
 */
function prilabsa_custom_post_updated_messages( $messages ) {
	global $post;

	$messages['productos'] = array(
		0  => '', // Unused
		1  => '✅ Producto actualizado. Los cambios ya están disponibles en la API.',
		2  => '✅ Campo personalizado actualizado.',
		3  => '✅ Campo personalizado eliminado.',
		4  => '✅ Producto actualizado.',
		5  => isset( $_GET['revision'] ) ? sprintf( 'Producto restaurado desde revisión %s', wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
		6  => '✅ Producto publicado. Ya está disponible en el frontend de PRILABSA.',
		7  => '✅ Producto guardado.',
		8  => '✅ Producto enviado.',
		9  => sprintf( 'Producto programado para: <strong>%1$s</strong>.', date_i18n( 'M j, Y @ G:i', strtotime( $post->post_date ) ) ),
		10 => '✅ Borrador de producto actualizado.',
	);

	$messages['blog'] = array(
		0  => '',
		1  => '✅ Artículo actualizado. Los cambios ya están disponibles en la API.',
		6  => '✅ Artículo publicado. Ya está visible en el blog de PRILABSA.',
		10 => '✅ Borrador de artículo actualizado.',
	);

	$messages['noticias'] = array(
		0  => '',
		1  => '✅ Noticia actualizada. Los cambios ya están disponibles en la API.',
		6  => '✅ Noticia publicada. Ya está visible en la sección de noticias de PRILABSA.',
		10 => '✅ Borrador de noticia actualizado.',
	);

	return $messages;
}

add_filter( 'post_updated_messages', 'prilabsa_custom_post_updated_messages' );

/**
 * Add custom admin footer text for PRILABSA editors
 * Branding and support information
 */
function prilabsa_custom_admin_footer() {
	$screen = get_current_screen();

	// Only show on PRILABSA post types
	if ( ! in_array( $screen->post_type, array( 'productos', 'blog', 'noticias' ), true ) ) {
		return;
	}

	echo '<span id="footer-thankyou">Panel de Gestión <strong>PRILABSA</strong> | Desarrollado por <a href="https://www.solaria.agency" target="_blank">SOLARIA Agency</a></span>';
}

add_filter( 'admin_footer_text', 'prilabsa_custom_admin_footer' );
