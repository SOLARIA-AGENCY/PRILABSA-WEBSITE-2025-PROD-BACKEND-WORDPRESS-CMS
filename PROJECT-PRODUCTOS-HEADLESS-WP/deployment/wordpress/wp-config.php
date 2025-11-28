<?php
/**
 * WordPress Configuration for PRILABSA - productos.prilabsa.com
 * Generated: 2025-11-26
 * Environment: Production (GoDaddy Hosting)
 */

// ============================================================================
// DATABASE CONFIGURATION (GoDaddy MySQL)
// ============================================================================

/** Database name */
define('DB_NAME', 'i10459829_vrmd1');

/** Database username */
define('DB_USER', 'i10459829_vrmd1');

/** Database password */
define('DB_PASSWORD', 'F.36Ym5mx8oZzclXxPa11');

/** Database hostname */
define('DB_HOST', 'localhost');

/** Database charset */
define('DB_CHARSET', 'utf8mb4');

/** Database collate type */
define('DB_COLLATE', '');

// ============================================================================
// AUTHENTICATION KEYS AND SALTS
// ============================================================================

define('AUTH_KEY',         '1,lhU2xGIJ+6fpTnXnh$yDLt[gF[0TI-|:,Fr*0m<SMfs*fZ5-{0/eFS_-KAu822');
define('SECURE_AUTH_KEY',  'l$cx4&MH#7:2 z+pb/?ey(~_{Z>yd;Tx)XMJ3tyhAAFeB+0A[+~g|ygj&_w{7&&h');
define('LOGGED_IN_KEY',    '>Oy<]Ust1Rq&*oF;Kz~!_] R{ (%F1X11V!KcMs#8KVOJ*/zK<W;[Nl4zSTN.9?O');
define('NONCE_KEY',        '2m4h1^bd;`~zws(b.<9D!#j;,`:=L`/cRsVCC]L&{+6uY<2IfNE{Q1)60tTMbwce');
define('AUTH_SALT',        'V<]~_ph|RCBuM8.JD|-Ijx<BGSyLtpiu;G11I7RFviXa[$Wvjdw:_RP8!AENNZ&B');
define('SECURE_AUTH_SALT', '}NBC-iW@/>R>wk,6Ig0*c`V27-@Vp(]lax$D }|XKuBDFniKMC=^u+@y pzgV[J/');
define('LOGGED_IN_SALT',   'A/8l&8/FXyG.s&*/8_|zi|+N0,#I(Z|5<#vfu(..R+q|D|nw9A4@@3mm7Mg6chzi');
define('NONCE_SALT',       '@PffNU0TbAN3,nD+sy|Dx(kYNw+)[WW|PgTeJ9VH57<]3~O!]loQV3+7]LgXLft;');

// ============================================================================
// WORDPRESS TABLE PREFIX
// ============================================================================

$table_prefix = 'yqsw_';

// ============================================================================
// WORDPRESS URLS
// ============================================================================

define('WP_SITEURL', 'https://productos.prilabsa.com');
define('WP_HOME', 'https://productos.prilabsa.com');

// ============================================================================
// HEADLESS CMS CONFIGURATION
// ============================================================================

/** Enable REST API */
define('REST_API_ENABLED', true);

/** CORS for frontend React app */
define('JWT_AUTH_CORS_ENABLE', true);

/** Increase API response limits */
define('WP_REST_API_MAX_RESULTS', 100);

// ============================================================================
// SECURITY HARDENING (PRODUCTION)
// ============================================================================

/** Disable file editing from admin */
define('DISALLOW_FILE_EDIT', true);

/** Force SSL for admin */
define('FORCE_SSL_ADMIN', true);

/** Limit post revisions */
define('WP_POST_REVISIONS', 5);

/** Auto-save interval (5 minutes) */
define('AUTOSAVE_INTERVAL', 300);

/** Empty trash after 30 days */
define('EMPTY_TRASH_DAYS', 30);

// ============================================================================
// PERFORMANCE OPTIMIZATION
// ============================================================================

/** Enable object caching */
define('WP_CACHE', true);

/** Memory limits */
define('WP_MEMORY_LIMIT', '256M');
define('WP_MAX_MEMORY_LIMIT', '512M');

// ============================================================================
// DEBUGGING (DISABLED IN PRODUCTION)
// ============================================================================

define('WP_DEBUG', false);
define('WP_DEBUG_LOG', false);
define('WP_DEBUG_DISPLAY', false);
define('SCRIPT_DEBUG', false);
@ini_set('display_errors', 0);

// ============================================================================
// LANGUAGE
// ============================================================================

define('WPLANG', 'es_ES');

// ============================================================================
// ENVIRONMENT
// ============================================================================

define('WP_ENVIRONMENT_TYPE', 'production');

// ============================================================================
// ABSOLUTE PATH
// ============================================================================

if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/');
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
