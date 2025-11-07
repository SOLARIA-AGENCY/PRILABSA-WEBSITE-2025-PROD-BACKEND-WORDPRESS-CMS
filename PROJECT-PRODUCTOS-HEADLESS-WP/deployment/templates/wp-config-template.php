<?php
/**
 * WordPress Configuration Template for PRILABSA Headless CMS
 *
 * This template provides a production-ready WordPress configuration
 * optimized for headless CMS usage with JWT authentication.
 *
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Copy this file to wp-config.php in your WordPress root
 * 2. Replace all {{PLACEHOLDER}} values with actual credentials
 * 3. Generate new salts at: https://api.wordpress.org/secret-key/1.1/salt/
 * 4. Adjust WP_DEBUG based on environment (true for dev, false for prod)
 *
 * @package PRILABSA_Headless_WordPress
 * @version 1.0.0
 */

// ============================================================================
// DATABASE CONFIGURATION
// ============================================================================

/** Database name */
define('DB_NAME', '{{DB_NAME}}');

/** Database username */
define('DB_USER', '{{DB_USER}}');

/** Database password */
define('DB_PASSWORD', '{{DB_PASSWORD}}');

/** Database hostname */
define('DB_HOST', '{{DB_HOST}}');

/** Database charset - UTF8MB4 supports emoji and special characters */
define('DB_CHARSET', 'utf8mb4');

/** Database collate type - leave blank for default */
define('DB_COLLATE', '');

// ============================================================================
// AUTHENTICATION KEYS AND SALTS
// ============================================================================

/**
 * Security keys for WordPress encryption
 *
 * CRITICAL: Generate unique keys for each installation
 * Visit: https://api.wordpress.org/secret-key/1.1/salt/
 *
 * Replace the placeholder text below with the generated keys
 */
define('AUTH_KEY',         '{{GENERATE_UNIQUE_KEY}}');
define('SECURE_AUTH_KEY',  '{{GENERATE_UNIQUE_KEY}}');
define('LOGGED_IN_KEY',    '{{GENERATE_UNIQUE_KEY}}');
define('NONCE_KEY',        '{{GENERATE_UNIQUE_KEY}}');
define('AUTH_SALT',        '{{GENERATE_UNIQUE_KEY}}');
define('SECURE_AUTH_SALT', '{{GENERATE_UNIQUE_KEY}}');
define('LOGGED_IN_SALT',   '{{GENERATE_UNIQUE_KEY}}');
define('NONCE_SALT',       '{{GENERATE_UNIQUE_KEY}}');

// ============================================================================
// JWT AUTHENTICATION CONFIGURATION
// ============================================================================

/**
 * JWT Secret Key for headless authentication
 *
 * Generate a strong random string (64+ characters recommended)
 * Example generation: openssl rand -base64 64
 */
define('JWT_AUTH_SECRET_KEY', '{{GENERATE_JWT_SECRET}}');

/**
 * CORS (Cross-Origin Resource Sharing) Configuration
 *
 * Allows frontend applications to access the WordPress API
 *
 * For production: Use specific domain (e.g., 'https://productos.prilabsa.com')
 * For development: Use 'http://localhost:5173' or '*' for testing
 */
define('JWT_AUTH_CORS_ENABLE', true);

// ============================================================================
// WORDPRESS TABLE PREFIX
// ============================================================================

/**
 * WordPress Database Table prefix
 *
 * For security, change this from the default 'wp_' to something unique
 * Only use numbers, letters, and underscores
 */
$table_prefix = 'prilabsa_';

// ============================================================================
// HEADLESS CMS OPTIMIZATIONS
// ============================================================================

/**
 * Disable WordPress theme features when running headless
 * Uncomment these lines if not using WordPress for frontend rendering
 */
// define('WP_USE_THEMES', false);

/**
 * Enable REST API
 * Required for headless WordPress functionality
 */
define('REST_API_ENABLED', true);

/**
 * Increase API response limits
 * Useful for product catalog endpoints
 */
define('WP_REST_API_MAX_RESULTS', 100);

// ============================================================================
// FILE UPLOAD CONFIGURATION
// ============================================================================

/**
 * Maximum upload file size (in bytes)
 * 300MB = 314572800 bytes (for large product PDFs and images)
 */
define('WP_MEMORY_LIMIT', '256M');
define('WP_MAX_MEMORY_LIMIT', '512M');

// ============================================================================
// WORDPRESS URLS
// ============================================================================

/**
 * WordPress Address (URL)
 * The address where WordPress core files reside
 */
define('WP_SITEURL', '{{WP_SITEURL}}');

/**
 * Site Address (URL)
 * The address used to access your site
 * For headless, this is typically your API endpoint
 */
define('WP_HOME', '{{WP_HOME}}');

// ============================================================================
// SECURITY HARDENING
// ============================================================================

/**
 * Disable file editing from WordPress admin
 * Prevents unauthorized plugin/theme modifications
 */
define('DISALLOW_FILE_EDIT', true);

/**
 * Disable plugin and theme updates from admin
 * Recommended for production - use version control instead
 */
// define('DISALLOW_FILE_MODS', true);

/**
 * Force SSL for admin and login pages
 * Uncomment for production with HTTPS
 */
// define('FORCE_SSL_ADMIN', true);

/**
 * Security keys timeout (in seconds)
 * 2 days = 172800 seconds
 */
define('AUTH_COOKIE_EXPIRATION', 172800);

// ============================================================================
// PERFORMANCE OPTIMIZATION
// ============================================================================

/**
 * Enable WordPress object caching
 * Improves API response times significantly
 */
define('WP_CACHE', true);

/**
 * Disable WordPress cron for production
 * Use system cron instead for better performance
 */
// define('DISABLE_WP_CRON', true);

/**
 * Limit post revisions to save database space
 */
define('WP_POST_REVISIONS', 5);

/**
 * Auto-save interval (in seconds)
 */
define('AUTOSAVE_INTERVAL', 300);

/**
 * Empty trash automatically after X days
 */
define('EMPTY_TRASH_DAYS', 30);

// ============================================================================
// DEBUGGING AND ERROR REPORTING
// ============================================================================

/**
 * Enable WordPress debug mode
 *
 * IMPORTANT: Set to false in production!
 * true = development environment
 * false = production environment
 */
define('WP_DEBUG', {{WP_DEBUG_MODE}});

/**
 * Debug log file location
 * Logs errors to wp-content/debug.log
 */
define('WP_DEBUG_LOG', {{WP_DEBUG_MODE}});

/**
 * Display errors on screen
 * Should always be false in production
 */
define('WP_DEBUG_DISPLAY', false);
@ini_set('display_errors', 0);

/**
 * Script debug mode
 * Forces WordPress to use development versions of core CSS/JS files
 */
define('SCRIPT_DEBUG', {{WP_DEBUG_MODE}});

/**
 * Save database queries for analysis
 */
define('SAVEQUERIES', {{WP_DEBUG_MODE}});

// ============================================================================
// MULTILINGUAL SUPPORT (Optional)
// ============================================================================

/**
 * WordPress Language
 * Use 'es_ES' for Spanish, 'en_US' for English
 */
define('WPLANG', 'es_ES');

// ============================================================================
// CUSTOM CONSTANTS FOR PRILABSA
// ============================================================================

/**
 * Frontend application URL
 * Used for CORS and API documentation
 */
define('PRILABSA_FRONTEND_URL', '{{FRONTEND_URL}}');

/**
 * API version for custom endpoints
 */
define('PRILABSA_API_VERSION', 'v1');

/**
 * Enable product catalog features
 */
define('PRILABSA_CATALOG_ENABLED', true);

/**
 * Maximum products per API request
 */
define('PRILABSA_PRODUCTS_PER_PAGE', 50);

// ============================================================================
// ENVIRONMENT DETECTION
// ============================================================================

/**
 * Environment type: 'local', 'development', 'staging', 'production'
 */
define('WP_ENVIRONMENT_TYPE', '{{ENVIRONMENT}}');

/**
 * Conditional configurations based on environment
 */
if (defined('WP_ENVIRONMENT_TYPE')) {
    switch (WP_ENVIRONMENT_TYPE) {
        case 'local':
        case 'development':
            // Development-specific settings
            define('WP_DEBUG', true);
            define('WP_DEBUG_LOG', true);
            define('SCRIPT_DEBUG', true);
            break;

        case 'staging':
            // Staging-specific settings
            define('WP_DEBUG', true);
            define('WP_DEBUG_LOG', true);
            define('WP_DEBUG_DISPLAY', false);
            break;

        case 'production':
            // Production-specific settings
            define('WP_DEBUG', false);
            define('WP_DEBUG_LOG', false);
            define('WP_DEBUG_DISPLAY', false);
            define('DISALLOW_FILE_MODS', true);
            define('FORCE_SSL_ADMIN', true);
            break;
    }
}

// ============================================================================
// ABSOLUTE PATH TO WORDPRESS DIRECTORY
// ============================================================================

/**
 * Sets up WordPress vars and included files
 * Do not modify this section
 */
if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/');
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

// ============================================================================
// END OF CONFIGURATION
// ============================================================================

/**
 * SECURITY CHECKLIST BEFORE DEPLOYMENT:
 *
 * [ ] All {{PLACEHOLDER}} values replaced with actual data
 * [ ] Unique authentication keys generated
 * [ ] JWT secret key generated (64+ characters)
 * [ ] Database credentials verified
 * [ ] WP_DEBUG set to false for production
 * [ ] CORS origins restricted to actual frontend domain
 * [ ] HTTPS enforced for production
 * [ ] File permissions set correctly (644 for wp-config.php)
 * [ ] Backup strategy in place
 *
 * RECOMMENDED FILE PERMISSIONS:
 * chmod 644 wp-config.php
 * chown www-data:www-data wp-config.php
 */
