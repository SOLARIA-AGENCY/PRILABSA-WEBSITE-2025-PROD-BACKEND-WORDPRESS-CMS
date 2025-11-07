<?php
/**
 * PRILABSA Blog ACF Configuration
 *
 * Advanced Custom Fields para Blog con exposición REST API completa
 * Incluye campos multiidioma (es, en, pt) para título, resumen, contenido, autor, tags
 *
 * @package PRILABSA_Blog_ACF
 * @author SOLARIA AGENCY
 * @version 1.0.0
 */

// Security: Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register ACF Field Group for Blog
 */
if ( function_exists( 'acf_add_local_field_group' ) ) {
	acf_add_local_field_group(
		array(
			'key'                   => 'group_prilabsa_blog',
			'title'                 => 'Configuración de Artículo de Blog',
			'fields'                => array(
				// Título Español
				array(
					'key'               => 'field_blog_titulo_es',
					'label'             => 'Título (Español)',
					'name'              => 'titulo_es',
					'type'              => 'text',
					'instructions'      => 'Título del artículo en español',
					'required'          => 1,
					'default_value'     => '',
					'placeholder'       => 'Ej: Nutrición Acuícola Avanzada',
					'maxlength'         => 200,
					'wrapper'           => array(
						'width' => '33.33',
					),
				),
				// Título Inglés
				array(
					'key'               => 'field_blog_titulo_en',
					'label'             => 'Título (English)',
					'name'              => 'titulo_en',
					'type'              => 'text',
					'instructions'      => 'Título del artículo en inglés',
					'required'          => 1,
					'default_value'     => '',
					'placeholder'       => 'Ex: Advanced Aquaculture Nutrition',
					'maxlength'         => 200,
					'wrapper'           => array(
						'width' => '33.33',
					),
				),
				// Título Portugués
				array(
					'key'               => 'field_blog_titulo_pt',
					'label'             => 'Título (Português)',
					'name'              => 'titulo_pt',
					'type'              => 'text',
					'instructions'      => 'Título del artículo en portugués',
					'required'          => 1,
					'default_value'     => '',
					'placeholder'       => 'Ex: Nutrição Aquícola Avançada',
					'maxlength'         => 200,
					'wrapper'           => array(
						'width' => '33.33',
					),
				),
				// Resumen Español
				array(
					'key'               => 'field_blog_resumen_es',
					'label'             => 'Resumen (Español)',
					'name'              => 'resumen_es',
					'type'              => 'textarea',
					'instructions'      => 'Resumen breve del artículo en español (2-3 oraciones)',
					'required'          => 1,
					'rows'              => 3,
					'maxlength'         => 500,
					'wrapper'           => array(
						'width' => '33.33',
					),
				),
				// Resumen Inglés
				array(
					'key'               => 'field_blog_resumen_en',
					'label'             => 'Resumen (English)',
					'name'              => 'resumen_en',
					'type'              => 'textarea',
					'instructions'      => 'Resumen breve del artículo en inglés (2-3 oraciones)',
					'required'          => 1,
					'rows'              => 3,
					'maxlength'         => 500,
					'wrapper'           => array(
						'width' => '33.33',
					),
				),
				// Resumen Portugués
				array(
					'key'               => 'field_blog_resumen_pt',
					'label'             => 'Resumen (Português)',
					'name'              => 'resumen_pt',
					'type'              => 'textarea',
					'instructions'      => 'Resumen breve del artículo en portugués (2-3 oraciones)',
					'required'          => 1,
					'rows'              => 3,
					'maxlength'         => 500,
					'wrapper'           => array(
						'width' => '33.33',
					),
				),
				// Contenido Español
				array(
					'key'               => 'field_blog_contenido_es',
					'label'             => 'Contenido (Español)',
					'name'              => 'contenido_es',
					'type'              => 'wysiwyg',
					'instructions'      => 'Contenido completo del artículo en español (HTML permitido)',
					'required'          => 1,
					'tabs'              => 'all',
					'toolbar'           => 'full',
					'media_upload'      => 0,
					'delay'             => 0,
					'wrapper'           => array(
						'width' => '33.33',
					),
				),
				// Contenido Inglés
				array(
					'key'               => 'field_blog_contenido_en',
					'label'             => 'Contenido (English)',
					'name'              => 'contenido_en',
					'type'              => 'wysiwyg',
					'instructions'      => 'Contenido completo del artículo en inglés (HTML permitido)',
					'required'          => 1,
					'tabs'              => 'all',
					'toolbar'           => 'full',
					'media_upload'      => 0,
					'delay'             => 0,
					'wrapper'           => array(
						'width' => '33.33',
					),
				),
				// Contenido Portugués
				array(
					'key'               => 'field_blog_contenido_pt',
					'label'             => 'Contenido (Português)',
					'name'              => 'contenido_pt',
					'type'              => 'wysiwyg',
					'instructions'      => 'Contenido completo del artículo en portugués (HTML permitido)',
					'required'          => 1,
					'tabs'              => 'all',
					'toolbar'           => 'full',
					'media_upload'      => 0,
					'delay'             => 0,
					'wrapper'           => array(
						'width' => '33.33',
					),
				),
				// Autor Español
				array(
					'key'               => 'field_blog_autor_es',
					'label'             => 'Autor (Español)',
					'name'              => 'autor_es',
					'type'              => 'text',
					'instructions'      => 'Nombre y cargo del autor en español',
					'required'          => 1,
					'placeholder'       => 'Ej: Dr. Armando Castillo, Director de I+D',
					'maxlength'         => 150,
					'wrapper'           => array(
						'width' => '33.33',
					),
				),
				// Autor Inglés
				array(
					'key'               => 'field_blog_autor_en',
					'label'             => 'Autor (English)',
					'name'              => 'autor_en',
					'type'              => 'text',
					'instructions'      => 'Nombre y cargo del autor en inglés',
					'required'          => 1,
					'placeholder'       => 'Ex: Dr. Armando Castillo, R&D Director',
					'maxlength'         => 150,
					'wrapper'           => array(
						'width' => '33.33',
					),
				),
				// Autor Portugués
				array(
					'key'               => 'field_blog_autor_pt',
					'label'             => 'Autor (Português)',
					'name'              => 'autor_pt',
					'type'              => 'text',
					'instructions'      => 'Nombre y cargo del autor en portugués',
					'required'          => 1,
					'placeholder'       => 'Ex: Dr. Armando Castillo, Diretor de P&D',
					'maxlength'         => 150,
					'wrapper'           => array(
						'width' => '33.33',
					),
				),
				// Fecha Publicación
				array(
					'key'               => 'field_blog_fecha_publicacion',
					'label'             => 'Fecha de Publicación',
					'name'              => 'fecha_publicacion',
					'type'              => 'date_picker',
					'instructions'      => 'Fecha de publicación del artículo',
					'required'          => 1,
					'display_format'    => 'd/m/Y',
					'return_format'     => 'Ymd',
					'first_day'         => 1,
					'wrapper'           => array(
						'width' => '33.33',
					),
				),
				// Tags Español
				array(
					'key'               => 'field_blog_tags_es',
					'label'             => 'Tags (Español)',
					'name'              => 'tags_es',
					'type'              => 'text',
					'instructions'      => 'Etiquetas separadas por comas (Ej: Nutrición, Acuicultura, Sostenible)',
					'required'          => 0,
					'placeholder'       => 'Tag1, Tag2, Tag3',
					'wrapper'           => array(
						'width' => '33.33',
					),
				),
				// Tags Inglés
				array(
					'key'               => 'field_blog_tags_en',
					'label'             => 'Tags (English)',
					'name'              => 'tags_en',
					'type'              => 'text',
					'instructions'      => 'Etiquetas separadas por comas (Ex: Nutrition, Aquaculture, Sustainable)',
					'required'          => 0,
					'placeholder'       => 'Tag1, Tag2, Tag3',
					'wrapper'           => array(
						'width' => '33.33',
					),
				),
				// Tags Portugués
				array(
					'key'               => 'field_blog_tags_pt',
					'label'             => 'Tags (Português)',
					'name'              => 'tags_pt',
					'type'              => 'text',
					'instructions'      => 'Etiquetas separadas por comas (Ex: Nutrição, Aquicultura, Sustentável)',
					'required'          => 0,
					'placeholder'       => 'Tag1, Tag2, Tag3',
					'wrapper'           => array(
						'width' => '33.33',
					),
				),
			),
			'location'              => array(
				array(
					array(
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'blog',
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
			'description'           => 'Campos personalizados para artículos de blog multiidioma',
			'show_in_rest'          => 1,
		)
	);
}
