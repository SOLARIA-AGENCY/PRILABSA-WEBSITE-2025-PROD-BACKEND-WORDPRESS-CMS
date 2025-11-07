<?php
/**
 * Router for PHP built-in server
 * Handles WordPress URL rewriting including REST API
 */

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Serve static files directly
if (file_exists(__DIR__ . $path) && is_file(__DIR__ . $path)) {
    return false;
}

// Special handling for wp-admin static files
if (preg_match('/\.(?:png|jpg|jpeg|gif|css|js|svg|woff|woff2|ttf|eot|ico)$/i', $path)) {
    $file = __DIR__ . $path;
    if (file_exists($file)) {
        return false; // Let PHP serve the file
    }
}

// Route everything else to index.php (WordPress handles routing)
// This includes wp-admin pages, REST API (/wp-json/), and frontend
$_SERVER['SCRIPT_NAME'] = '/index.php';
$_SERVER['SCRIPT_FILENAME'] = __DIR__ . '/index.php';
require __DIR__ . '/index.php';
