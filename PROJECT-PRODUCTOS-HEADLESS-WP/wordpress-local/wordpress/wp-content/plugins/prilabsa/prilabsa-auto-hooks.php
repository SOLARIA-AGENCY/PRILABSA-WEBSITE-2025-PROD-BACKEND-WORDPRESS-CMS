<?php
/**
 * PRILABSA Auto Hooks
 *
 * Automatizaciones para mejorar UX de WordPress Admin:
 * 1. Slug automático desde nombre_producto_es
 * 2. Imagen ACF → Featured Image automático
 * 3. Título del post desde nombre_producto_es
 *
 * @package PRILABSA_Auto_Hooks
 * @author SOLARIA AGENCY
 * @version 1.0.0
 */

// Security: Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Hook 1: Generar slug y título automáticamente desde nombre_producto_es
 *
 * Ejecuta DESPUÉS de que ACF guarda (prioridad 20)
 * En este punto get_field() ya funciona correctamente
 */
add_action( 'acf/save_post', 'prilabsa_auto_generate_slug_and_title', 20 );
function prilabsa_auto_generate_slug_and_title( $post_id ) {
	// Evitar loops infinitos
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	// Solo para productos
	if ( get_post_type( $post_id ) !== 'productos' ) {
		return;
	}

	// Obtener nombre_producto_es (ahora get_field funciona porque ACF ya guardó)
	$nombre_es = get_field( 'nombre_producto_es', $post_id );

	if ( empty( $nombre_es ) ) {
		return; // Sin nombre, no podemos generar slug
	}

	// Generar slug sanitizado
	$new_slug = sanitize_title( $nombre_es );
	$new_title = sanitize_text_field( $nombre_es );

	$post = get_post( $post_id );
	if ( ! $post ) {
		return;
	}

	$needs_update = false;
	$update_data = array( 'ID' => $post_id );

	// SIEMPRE actualizar título si es diferente
	// Permite que el título se sincronice incluso en posts existentes
	if ( $post->post_title !== $new_title ) {
		$update_data['post_title'] = $new_title;
		$needs_update = true;
	}

	// SIEMPRE actualizar slug si es diferente
	// Permite que el usuario pueda cambiar el nombre y el slug se actualice automáticamente
	// WordPress creará una redirección automática del slug antiguo al nuevo (no rompe enlaces)
	if ( $post->post_name !== $new_slug ) {
		$update_data['post_name'] = $new_slug;
		$needs_update = true;
	}

	if ( $needs_update ) {
		// Remover hook temporalmente para evitar loop
		remove_action( 'acf/save_post', 'prilabsa_auto_generate_slug_and_title', 20 );

		wp_update_post( $update_data );

		// Restaurar hook
		add_action( 'acf/save_post', 'prilabsa_auto_generate_slug_and_title', 20 );
	}
}

/**
 * Hook 2: Sincronizar imagen ACF → Featured Image
 *
 * Cuando se guarda imagen_producto en ACF, auto-asignarla como featured image
 * Elimina necesidad de subir imagen 2 veces
 */
add_action( 'acf/save_post', 'prilabsa_auto_sync_featured_image', 20 );
function prilabsa_auto_sync_featured_image( $post_id ) {
	// Evitar loops infinitos
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	// Solo para productos, blog y noticias
	$post_type = get_post_type( $post_id );
	if ( ! in_array( $post_type, array( 'productos', 'blog', 'noticias' ), true ) ) {
		return;
	}

	// Obtener imagen ACF (campo imagen_producto para productos, imagen_destacada para blog/noticias)
	$field_name = ( $post_type === 'productos' ) ? 'imagen_producto' : 'imagen_destacada';
	$imagen_acf = get_field( $field_name, $post_id );

	// Si hay imagen en ACF, asignarla como featured image
	if ( ! empty( $imagen_acf ) ) {
		// ACF devuelve array con ID cuando return_format = 'array'
		$attachment_id = is_array( $imagen_acf ) ? $imagen_acf['id'] : $imagen_acf;

		if ( ! empty( $attachment_id ) && is_numeric( $attachment_id ) ) {
			// Obtener featured image actual
			$current_thumbnail_id = get_post_thumbnail_id( $post_id );

			// Solo actualizar si es diferente (evitar updates innecesarios)
			if ( $current_thumbnail_id != $attachment_id ) {
				set_post_thumbnail( $post_id, $attachment_id );
			}
		}
	}
}

