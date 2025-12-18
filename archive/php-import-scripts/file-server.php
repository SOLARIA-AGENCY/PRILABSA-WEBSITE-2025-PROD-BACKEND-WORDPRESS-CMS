<?php
/**
 * PRILABSA Static File Server
 * Handles serving static assets with proper MIME types
 */

// Get the requested file path
$requestPath = $_SERVER['REQUEST_URI'];

// Remove query string
$requestPath = explode('?', $requestPath)[0];

// Base directory for static files
$baseDir = __DIR__;

// Security: prevent directory traversal
$realBaseDir = realpath($baseDir);
$requestedFile = realpath($baseDir . $requestPath);

if ($requestedFile === false || strpos($requestedFile, $realBaseDir) !== 0) {
    http_response_code(403);
    die('Access denied');
}

// Check if file exists
if (!file_exists($requestedFile)) {
    http_response_code(404);
    die('File not found');
}

// Get file extension
$extension = strtolower(pathinfo($requestedFile, PATHINFO_EXTENSION));

// Set appropriate MIME type
$mimeTypes = [
    'jpg' => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'png' => 'image/png',
    'gif' => 'image/gif',
    'webp' => 'image/webp',
    'svg' => 'image/svg+xml',
    'css' => 'text/css',
    'js' => 'application/javascript',
    'json' => 'application/json',
    'pdf' => 'application/pdf',
    'ico' => 'image/x-icon',
    'woff' => 'font/woff',
    'woff2' => 'font/woff2',
    'ttf' => 'font/ttf',
    'eot' => 'application/vnd.ms-fontobject'
];

if (isset($mimeTypes[$extension])) {
    header('Content-Type: ' . $mimeTypes[$extension]);
} else {
    header('Content-Type: application/octet-stream');
}

// Set caching headers
header('Cache-Control: public, max-age=31536000'); // 1 year
header('Expires: ' . gmdate('D, d M Y H:i:s \G\M\T', time() + 31536000));

// Set content length
header('Content-Length: ' . filesize($requestedFile));

// Output the file
readfile($requestedFile);
exit;
?>