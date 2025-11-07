<?php
/**
 * Plugin Name: PRILABSA API Configuration
 * Description: Configura límites de la REST API para productos (permite hasta 500 productos para expansión futura)
 * Version: 1.0.0
 * Author: SOLARIA AGENCY
 *
 * Must-Use Plugin - Siempre activo, no se puede desactivar
 */

defined('ABSPATH') || exit;

/**
 * Aumenta el límite de productos por página en REST API
 *
 * Default WordPress: 100 productos máximo
 * Nueva configuración: 500 productos máximo
 *
 * Esto permite:
 * - Catálogo actual: 105 productos ✅
 * - Expansión futura: hasta 500 productos (5x crecimiento)
 * - Sin paginación para requests del frontend
 */
add_filter('rest_productos_query', function($args, $request) {
    // Aumentar límite solo para endpoint de productos
    $per_page = $request->get_param('per_page');

    // Si se solicita más de 100, permitir hasta 500
    if ($per_page && $per_page > 100) {
        $args['posts_per_page'] = min($per_page, 500);
    }

    return $args;
}, 10, 2);

/**
 * Aumenta el límite máximo permitido en parámetro per_page
 *
 * Esto permite que el frontend pueda solicitar per_page=500
 */
add_filter('rest_productos_collection_params', function($params) {
    if (isset($params['per_page'])) {
        $params['per_page']['maximum'] = 500;
    }
    return $params;
});

/**
 * Log de activación (solo para debug, comentar en producción)
 */
if (defined('WP_DEBUG') && WP_DEBUG) {
    error_log('[PRILABSA API Config] Plugin cargado - Límite API: 500 productos');
}
