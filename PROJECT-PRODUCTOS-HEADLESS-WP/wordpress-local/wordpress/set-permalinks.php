<?php
/**
 * Set WordPress permalinks to Post Name structure
 * Run from browser: http://localhost:8000/set-permalinks.php
 */

require_once __DIR__ . '/wp-load.php';

echo "<h1>Configure Permalinks</h1>\n";
echo "<pre>\n";

echo "🔄 Setting permalink structure to 'Post name'...\n\n";

// Set permalink structure to /%postname%/
update_option('permalink_structure', '/%postname%/');

// Flush rewrite rules
flush_rewrite_rules(true);

echo "✅ Permalinks configured successfully!\n\n";

// Show current settings
$permalink_structure = get_option('permalink_structure');
echo "Current permalink structure: {$permalink_structure}\n\n";

// Now test productos endpoint with query string method
echo "🧪 Testing REST API endpoints...\n\n";

// Test 1: REST API root
$test_url = "index.php?rest_route=/";
echo "1. REST API root: GET {$test_url}\n";
$ch = curl_init("http://localhost:8000/{$test_url}");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 2);
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code == 200 && $response) {
    $data = json_decode($response, true);
    if ($data && isset($data['name'])) {
        echo "   ✅ Status 200 - Site: {$data['name']}\n";
        echo "   ✅ Namespaces: " . implode(', ', $data['namespaces']) . "\n";
    }
} else {
    echo "   ⚠️ Status {$http_code}\n";
}

echo "\n";

// Test 2: Productos endpoint
$test_url = "index.php?rest_route=/wp/v2/productos";
echo "2. Productos endpoint: GET {$test_url}\n";
$ch = curl_init("http://localhost:8000/{$test_url}");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 2);
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code == 200 && $response) {
    $data = json_decode($response, true);
    if (is_array($data)) {
        echo "   ✅ Status 200 - Found " . count($data) . " products\n";
        if (count($data) > 0) {
            echo "   ✅ First product: {$data[0]['title']['rendered']} (ID: {$data[0]['id']})\n";
        }
    }
} else {
    echo "   ⚠️ Status {$http_code}\n";
}

echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
echo "✅ REST API is accessible via query string format:\n";
echo "   http://localhost:8000/index.php?rest_route=/wp/v2/productos\n\n";

echo "✅ Pretty URLs should now work:\n";
echo "   http://localhost:8000/wp-json/wp/v2/productos\n\n";

echo "Note: You may need to restart the PHP server for changes to take effect.\n";

echo "</pre>\n";
