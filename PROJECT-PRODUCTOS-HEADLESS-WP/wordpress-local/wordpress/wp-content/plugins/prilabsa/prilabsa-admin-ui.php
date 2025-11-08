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
 * Add help text for ACF multiidioma fields
 * Guide users on how to fill fields correctly
 */
function prilabsa_add_acf_field_instructions() {
	?>
	<style>
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
