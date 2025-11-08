<?php
/**
 * PRILABSA ACF Extras - Campos Adicionales
 *
 * Agrega campos extra a Productos, Blog y Noticias sin modificar archivos base
 * - Descripción corta (Productos)
 * - Imagen destacada (Blog, Noticias)
 * - SEO fields (Blog, Noticias)
 *
 * @package PRILABSA_ACF_Extras
 * @author SOLARIA AGENCY
 * @version 1.0.0
 */

// Security: Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Add extra fields to Productos ACF group
 */
add_action('acf/init', 'prilabsa_add_productos_extras', 20);
function prilabsa_add_productos_extras() {
	if (!function_exists('acf_add_local_field')) {
		return;
	}

	// Descripción Corta ES
	acf_add_local_field(array(
		'key' => 'field_productos_descripcion_corta_es',
		'label' => '🇪🇸 Descripción Corta',
		'name' => 'descripcion_corta_es',
		'type' => 'textarea',
		'parent' => 'group_prilabsa_productos',
		'instructions' => 'Resumen breve (1-2 oraciones, máx 200 caracteres)',
		'required' => 0,
		'rows' => 2,
		'maxlength' => 200,
		'placeholder' => 'Ej: Probiótico de alta concentración...',
		'wrapper' => array('width' => '33.33'),
		'menu_order' => 139, // Antes de descripcion_es
	));

	// Descripción Corta EN
	acf_add_local_field(array(
		'key' => 'field_productos_descripcion_corta_en',
		'label' => '🇬🇧 Short Description',
		'name' => 'descripcion_corta_en',
		'type' => 'textarea',
		'parent' => 'group_prilabsa_productos',
		'instructions' => 'Brief summary (1-2 sentences, max 200 chars)',
		'required' => 0,
		'rows' => 2,
		'maxlength' => 200,
		'placeholder' => 'Ex: High concentration probiotic...',
		'wrapper' => array('width' => '33.33'),
		'menu_order' => 140,
	));

	// Descripción Corta PT
	acf_add_local_field(array(
		'key' => 'field_productos_descripcion_corta_pt',
		'label' => '🇵🇹 Descrição Curta',
		'name' => 'descripcion_corta_pt',
		'type' => 'textarea',
		'parent' => 'group_prilabsa_productos',
		'instructions' => 'Resumo breve (1-2 frases, máx 200 caracteres)',
		'required' => 0,
		'rows' => 2,
		'maxlength' => 200,
		'placeholder' => 'Ex: Probiótico de alta concentração...',
		'wrapper' => array('width' => '33.33'),
		'menu_order' => 141,
	));
}

/**
 * Add extra fields to Blog ACF group
 */
add_action('acf/init', 'prilabsa_add_blog_extras', 20);
function prilabsa_add_blog_extras() {
	if (!function_exists('acf_add_local_field')) {
		return;
	}

	// Imagen Destacada
	acf_add_local_field(array(
		'key' => 'field_blog_imagen_destacada',
		'label' => '📷 Imagen Destacada',
		'name' => 'imagen_destacada',
		'type' => 'image',
		'parent' => 'group_prilabsa_blog',
		'instructions' => 'Imagen principal del artículo (recomendado: 1200x630px)',
		'required' => 0,
		'return_format' => 'array',
		'preview_size' => 'medium',
		'library' => 'all',
		'min_width' => 800,
		'min_height' => 400,
		'max_size' => 5,
		'mime_types' => 'jpg,jpeg,png,webp',
		'wrapper' => array('width' => '100'),
		'menu_order' => 1,
	));

	// SEO Título ES
	acf_add_local_field(array(
		'key' => 'field_blog_seo_titulo_es',
		'label' => '🔍 SEO Título (Español)',
		'name' => 'seo_titulo_es',
		'type' => 'text',
		'parent' => 'group_prilabsa_blog',
		'instructions' => 'Título optimizado para SEO (50-60 caracteres)',
		'required' => 0,
		'maxlength' => 60,
		'placeholder' => 'Deja vacío para usar el título del artículo',
		'wrapper' => array('width' => '33.33'),
		'menu_order' => 500,
	));

	// SEO Título EN
	acf_add_local_field(array(
		'key' => 'field_blog_seo_titulo_en',
		'label' => '🔍 SEO Title (English)',
		'name' => 'seo_titulo_en',
		'type' => 'text',
		'parent' => 'group_prilabsa_blog',
		'instructions' => 'SEO optimized title (50-60 characters)',
		'required' => 0,
		'maxlength' => 60,
		'placeholder' => 'Leave empty to use article title',
		'wrapper' => array('width' => '33.33'),
		'menu_order' => 501,
	));

	// SEO Título PT
	acf_add_local_field(array(
		'key' => 'field_blog_seo_titulo_pt',
		'label' => '🔍 SEO Título (Português)',
		'name' => 'seo_titulo_pt',
		'type' => 'text',
		'parent' => 'group_prilabsa_blog',
		'instructions' => 'Título otimizado para SEO (50-60 caracteres)',
		'required' => 0,
		'maxlength' => 60,
		'placeholder' => 'Deixe vazio para usar o título do artigo',
		'wrapper' => array('width' => '33.33'),
		'menu_order' => 502,
	));

	// SEO Descripción ES
	acf_add_local_field(array(
		'key' => 'field_blog_seo_descripcion_es',
		'label' => '🔍 SEO Descripción (Español)',
		'name' => 'seo_descripcion_es',
		'type' => 'textarea',
		'parent' => 'group_prilabsa_blog',
		'instructions' => 'Meta descripción para buscadores (150-160 caracteres)',
		'required' => 0,
		'rows' => 3,
		'maxlength' => 160,
		'placeholder' => 'Deja vacío para usar el resumen',
		'wrapper' => array('width' => '33.33'),
		'menu_order' => 503,
	));

	// SEO Descripción EN
	acf_add_local_field(array(
		'key' => 'field_blog_seo_descripcion_en',
		'label' => '🔍 SEO Description (English)',
		'name' => 'seo_descripcion_en',
		'type' => 'textarea',
		'parent' => 'group_prilabsa_blog',
		'instructions' => 'Meta description for search engines (150-160 characters)',
		'required' => 0,
		'rows' => 3,
		'maxlength' => 160,
		'placeholder' => 'Leave empty to use summary',
		'wrapper' => array('width' => '33.33'),
		'menu_order' => 504,
	));

	// SEO Descripción PT
	acf_add_local_field(array(
		'key' => 'field_blog_seo_descripcion_pt',
		'label' => '🔍 SEO Descrição (Português)',
		'name' => 'seo_descripcion_pt',
		'type' => 'textarea',
		'parent' => 'group_prilabsa_blog',
		'instructions' => 'Meta descrição para motores de busca (150-160 caracteres)',
		'required' => 0,
		'rows' => 3,
		'maxlength' => 160,
		'placeholder' => 'Deixe vazio para usar o resumo',
		'wrapper' => array('width' => '33.33'),
		'menu_order' => 505,
	));
}

/**
 * Add extra fields to Noticias ACF group
 */
add_action('acf/init', 'prilabsa_add_noticias_extras', 20);
function prilabsa_add_noticias_extras() {
	if (!function_exists('acf_add_local_field')) {
		return;
	}

	// Imagen Destacada
	acf_add_local_field(array(
		'key' => 'field_noticias_imagen_destacada',
		'label' => '📷 Imagen Destacada',
		'name' => 'imagen_destacada',
		'type' => 'image',
		'parent' => 'group_prilabsa_noticias',
		'instructions' => 'Imagen principal de la noticia (recomendado: 1200x630px)',
		'required' => 0,
		'return_format' => 'array',
		'preview_size' => 'medium',
		'library' => 'all',
		'min_width' => 800,
		'min_height' => 400,
		'max_size' => 5,
		'mime_types' => 'jpg,jpeg,png,webp',
		'wrapper' => array('width' => '100'),
		'menu_order' => 1,
	));

	// SEO Título ES
	acf_add_local_field(array(
		'key' => 'field_noticias_seo_titulo_es',
		'label' => '🔍 SEO Título (Español)',
		'name' => 'seo_titulo_es',
		'type' => 'text',
		'parent' => 'group_prilabsa_noticias',
		'instructions' => 'Título optimizado para SEO (50-60 caracteres)',
		'required' => 0,
		'maxlength' => 60,
		'placeholder' => 'Deja vacío para usar el título de la noticia',
		'wrapper' => array('width' => '33.33'),
		'menu_order' => 500,
	));

	// SEO Título EN
	acf_add_local_field(array(
		'key' => 'field_noticias_seo_titulo_en',
		'label' => '🔍 SEO Title (English)',
		'name' => 'seo_titulo_en',
		'type' => 'text',
		'parent' => 'group_prilabsa_noticias',
		'instructions' => 'SEO optimized title (50-60 characters)',
		'required' => 0,
		'maxlength' => 60,
		'placeholder' => 'Leave empty to use news title',
		'wrapper' => array('width' => '33.33'),
		'menu_order' => 501,
	));

	// SEO Título PT
	acf_add_local_field(array(
		'key' => 'field_noticias_seo_titulo_pt',
		'label' => '🔍 SEO Título (Português)',
		'name' => 'seo_titulo_pt',
		'type' => 'text',
		'parent' => 'group_prilabsa_noticias',
		'instructions' => 'Título otimizado para SEO (50-60 caracteres)',
		'required' => 0,
		'maxlength' => 60,
		'placeholder' => 'Deixe vazio para usar o título da notícia',
		'wrapper' => array('width' => '33.33'),
		'menu_order' => 502,
	));

	// SEO Descripción ES
	acf_add_local_field(array(
		'key' => 'field_noticias_seo_descripcion_es',
		'label' => '🔍 SEO Descripción (Español)',
		'name' => 'seo_descripcion_es',
		'type' => 'textarea',
		'parent' => 'group_prilabsa_noticias',
		'instructions' => 'Meta descripción para buscadores (150-160 caracteres)',
		'required' => 0,
		'rows' => 3,
		'maxlength' => 160,
		'placeholder' => 'Deja vacío para usar el resumen',
		'wrapper' => array('width' => '33.33'),
		'menu_order' => 503,
	));

	// SEO Descripción EN
	acf_add_local_field(array(
		'key' => 'field_noticias_seo_descripcion_en',
		'label' => '🔍 SEO Description (English)',
		'name' => 'seo_descripcion_en',
		'type' => 'textarea',
		'parent' => 'group_prilabsa_noticias',
		'instructions' => 'Meta description for search engines (150-160 characters)',
		'required' => 0,
		'rows' => 3,
		'maxlength' => 160,
		'placeholder' => 'Leave empty to use summary',
		'wrapper' => array('width' => '33.33'),
		'menu_order' => 504,
	));

	// SEO Descripción PT
	acf_add_local_field(array(
		'key' => 'field_noticias_seo_descripcion_pt',
		'label' => '🔍 SEO Descrição (Português)',
		'name' => 'seo_descripcion_pt',
		'type' => 'textarea',
		'parent' => 'group_prilabsa_noticias',
		'instructions' => 'Meta descrição para motores de busca (150-160 caracteres)',
		'required' => 0,
		'rows' => 3,
		'maxlength' => 160,
		'placeholder' => 'Deixe vazio para usar o resumo',
		'wrapper' => array('width' => '33.33'),
		'menu_order' => 505,
	));
}

/**
 * Expose new fields to REST API
 */
add_action('rest_api_init', 'prilabsa_register_extra_fields_rest');
function prilabsa_register_extra_fields_rest() {
	// Productos - Descripción corta
	$producto_fields = array(
		'descripcion_corta_es',
		'descripcion_corta_en',
		'descripcion_corta_pt',
	);

	foreach ($producto_fields as $field) {
		register_rest_field('productos', $field, array(
			'get_callback' => function($object) use ($field) {
				return get_field($field, $object['id']);
			},
			'schema' => array(
				'description' => "Campo ACF: {$field}",
				'type' => 'string',
			),
		));
	}

	// Blog - Imagen y SEO
	$blog_fields = array(
		'imagen_destacada',
		'seo_titulo_es',
		'seo_titulo_en',
		'seo_titulo_pt',
		'seo_descripcion_es',
		'seo_descripcion_en',
		'seo_descripcion_pt',
	);

	foreach ($blog_fields as $field) {
		register_rest_field('blog', $field, array(
			'get_callback' => function($object) use ($field) {
				return get_field($field, $object['id']);
			},
			'schema' => array(
				'description' => "Campo ACF: {$field}",
				'type' => 'string',
			),
		));
	}

	// Noticias - Imagen y SEO
	$noticias_fields = array(
		'imagen_destacada',
		'seo_titulo_es',
		'seo_titulo_en',
		'seo_titulo_pt',
		'seo_descripcion_es',
		'seo_descripcion_en',
		'seo_descripcion_pt',
	);

	foreach ($noticias_fields as $field) {
		register_rest_field('noticias', $field, array(
			'get_callback' => function($object) use ($field) {
				return get_field($field, $object['id']);
			},
			'schema' => array(
				'description' => "Campo ACF: {$field}",
				'type' => 'string',
			),
		));
	}
}
