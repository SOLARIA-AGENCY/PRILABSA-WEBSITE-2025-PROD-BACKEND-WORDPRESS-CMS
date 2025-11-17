<?php
/**
 * Plugin Name: PRILABSA Temp API Fix
 * Description: Plugin temporal para corregir API
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class PRILABSA_Temp_API {
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }
    
    public function register_routes() {
        register_rest_route('prilabsa/v2', '/productos', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_productos'),
            'permission_callback' => '__return_true',
        ));
        
        register_rest_route('prilabsa/v2', '/categorias', array(
            'methods' => 'GET', 
            'callback' => array($this, 'get_categorias'),
            'permission_callback' => '__return_true',
        ));
    }
    
    public function get_productos($request) {
        $args = array(
            'post_type' => 'producto',
            'posts_per_page' => 10,
            'post_status' => 'publish',
        );
        
        $query = new WP_Query($args);
        $productos = array();
        
        foreach ($query->posts as $post) {
            $productos[] = array(
                'id' => $post->ID,
                'title' => $post->post_title,
                'content' => $post->post_content,
                'slug' => $post->post_name,
                'featured_image' => get_the_post_thumbnail_url($post->ID, 'full'),
                'categorias' => wp_get_post_terms($post->ID, 'categoria_producto'),
                'tipos' => wp_get_post_terms($post->ID, 'tipo_producto'),
            );
        }
        
        return new WP_REST_Response($productos, 200);
    }
    
    public function get_categorias($request) {
        $categorias = get_terms(array(
            'taxonomy' => 'categoria_producto',
            'hide_empty' => false,
        ));
        
        $data = array();
        foreach ($categorias as $categoria) {
            $data[] = array(
                'id' => $categoria->term_id,
                'name' => $categoria->name,
                'slug' => $categoria->slug,
            );
        }
        
        return new WP_REST_Response($data, 200);
    }
}

new PRILABSA_Temp_API();