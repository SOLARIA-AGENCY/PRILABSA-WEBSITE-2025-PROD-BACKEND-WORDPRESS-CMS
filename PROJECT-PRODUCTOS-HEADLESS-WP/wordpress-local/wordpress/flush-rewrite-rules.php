<?php
/**
 * Flush rewrite rules to ensure REST API works properly
 * Run from browser: http://localhost:8000/flush-rewrite-rules.php
 */

require_once __DIR__ . '/wp-load.php';

echo "<h1>Flush Rewrite Rules</h1>\n";
echo "<pre>\n";

echo "🔄 Flushing rewrite rules...\n\n";

// Flush rewrite rules
flush_rewrite_rules(true);

echo "✅ Rewrite rules flushed successfully!\n\n";

// Test REST API
echo "🧪 Testing REST API...\n\n";

$base_url = 'http://localhost:8000';

$tests = [
    'REST API root' => '/wp-json/',
    'WP REST API v2' => '/wp-json/wp/v2/',
    'Productos endpoint' => '/wp-json/wp/v2/productos/',
];

foreach ($tests as $name => $endpoint) {
    $url = $base_url . $endpoint;
    echo "Testing {$name}: {$url}\n";

    $response = wp_remote_get($url);

    if (is_wp_error($response)) {
        echo "  ❌ Error: " . $response->get_error_message() . "\n";
    } else {
        $code = wp_remote_retrieve_response_code($response);
        $body = wp_remote_retrieve_body($response);
        $content_type = wp_remote_retrieve_header($response, 'content-type');

        echo "  Status: {$code}\n";
        echo "  Content-Type: {$content_type}\n";

        if (strpos($content_type, 'application/json') !== false) {
            $data = json_decode($body, true);
            if (is_array($data)) {
                echo "  ✅ Valid JSON response (" . count($data) . " items)\n";
            } else {
                echo "  ✅ Valid JSON response\n";
            }
        } else {
            echo "  ⚠️  Not JSON - might be an error\n";
        }
    }
    echo "\n";
}

echo "</pre>\n";
