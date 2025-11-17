<?php
/**
 * AJAX Product Import for PRILABSA
 */

// Bootstrap WordPress
require_once('wp-config.php');

// Handle AJAX request
if ($_POST['action'] === 'import_products') {
    header('Content-Type: application/json');
    
    try {
        // Load catalog
        $catalog_file = ABSPATH . 'catalogo-productos.json';
        if (!file_exists($catalog_file)) {
            wp_send_json_error('Catalog file not found');
        }
        
        $catalog = json_decode(file_get_contents($catalog_file), true);
        if (!$catalog || !isset($catalog['productos'])) {
            wp_send_json_error('Failed to parse catalog');
        }
        
        $imported = 0;
        $failed = 0;
        $results = array();
        
        foreach ($catalog['productos'] as $product_data) {
            try {
                // Check if product exists
                $existing = get_posts(array(
                    'post_type' => 'producto',
                    'meta_key' => 'codigo',
                    'meta_value' => $product_data['codigo'],
                    'posts_per_page' => 1
                ));
                
                $post_data = array(
                    'post_title' => $product_data['nombre'],
                    'post_content' => $product_data['descripcion'] ?? '',
                    'post_excerpt' => $product_data['descripcion_corta'] ?? '',
                    'post_status' => 'publish',
                    'post_type' => 'producto'
                );
                
                if (!empty($existing)) {
                    $post_data['ID'] = $existing[0]->ID;
                    $post_id = wp_update_post($post_data);
                    $action = 'updated';
                } else {
                    $post_id = wp_insert_post($post_data);
                    $action = 'created';
                }
                
                if (is_wp_error($post_id)) {
                    throw new Exception($post_id->get_error_message());
                }
                
                // Update meta fields
                update_post_meta($post_id, 'codigo', $product_data['codigo']);
                update_post_meta($post_id, 'precio', $product_data['precio'] ?? 0);
                update_post_meta($post_id, 'moneda', $product_data['moneda'] ?? 'USD');
                update_post_meta($post_id, 'stock', $product_data['stock'] ?? 0);
                update_post_meta($post_id, 'marca', $product_data['marca'] ?? '');
                update_post_meta($post_id, 'modelo', $product_data['modelo'] ?? '');
                update_post_meta($post_id, 'ficha_tecnica', $product_data['ficha_tecnica'] ?? '');
                update_post_meta($post_id, 'imagen_url', $product_data['imagen_url'] ?? '');
                
                // Set categories
                if (!empty($product_data['categoria'])) {
                    $term = get_term_by('slug', $product_data['categoria'], 'categoria_producto');
                    if ($term) {
                        wp_set_post_terms($post_id, array($term->term_id), 'categoria_producto');
                    }
                }
                
                $results[] = array(
                    'name' => $product_data['nombre'],
                    'codigo' => $product_data['codigo'],
                    'action' => $action,
                    'post_id' => $post_id
                );
                
                $imported++;
                
            } catch (Exception $e) {
                $results[] = array(
                    'name' => $product_data['nombre'],
                    'codigo' => $product_data['codigo'],
                    'error' => $e->getMessage()
                );
                $failed++;
            }
        }
        
        wp_send_json_success(array(
            'imported' => $imported,
            'failed' => $failed,
            'total' => count($catalog['productos']),
            'results' => $results
        ));
        
    } catch (Exception $e) {
        wp_send_json_error($e->getMessage());
    }
}

// If not AJAX, show simple form
?>
<!DOCTYPE html>
<html>
<head>
    <title>PRILABSA Product Import</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .button { background: #0073aa; color: white; padding: 10px 20px; border: none; cursor: pointer; }
        .button:hover { background: #005a87; }
        .results { margin-top: 20px; }
        .success { color: green; }
        .error { color: red; }
        .progress { margin: 10px 0; }
    </style>
</head>
<body>
    <h1>PRILABSA Product Import</h1>
    
    <div id="status">
        <p>Ready to import products from catalog.</p>
        <button class="button" onclick="startImport()">Start Import</button>
    </div>
    
    <div id="results" class="results" style="display:none;">
        <h3>Import Results</h3>
        <div id="progress" class="progress"></div>
        <div id="details"></div>
    </div>
    
    <script>
        function startImport() {
            const statusDiv = document.getElementById('status');
            const resultsDiv = document.getElementById('results');
            const progressDiv = document.getElementById('progress');
            const detailsDiv = document.getElementById('details');
            
            statusDiv.innerHTML = '<p>Importing products... Please wait.</p>';
            resultsDiv.style.display = 'block';
            progressDiv.innerHTML = 'Processing...';
            detailsDiv.innerHTML = '';
            
            const formData = new FormData();
            formData.append('action', 'import_products');
            
            fetch('', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    progressDiv.innerHTML = `
                        <p><strong>Import Complete!</strong></p>
                        <p>✅ Imported: ${data.data.imported}</p>
                        <p>❌ Failed: ${data.data.failed}</p>
                        <p>Total: ${data.data.total}</p>
                    `;
                    
                    let details = '<h4>Details:</h4>';
                    data.data.results.forEach(result => {
                        if (result.error) {
                            details += `<p class="error">❌ ${result.name} (${result.codigo}): ${result.error}</p>`;
                        } else {
                            details += `<p class="success">✅ ${result.name} (${result.codigo}): ${result.action} (ID: ${result.post_id})</p>`;
                        }
                    });
                    detailsDiv.innerHTML = details;
                    
                    statusDiv.innerHTML = '<p>✅ Import completed successfully!</p>';
                } else {
                    progressDiv.innerHTML = `<p class="error">❌ Error: ${data.data}</p>`;
                    statusDiv.innerHTML = '<p>❌ Import failed!</p>';
                }
            })
            .catch(error => {
                progressDiv.innerHTML = `<p class="error">❌ Network error: ${error.message}</p>`;
                statusDiv.innerHTML = '<p>❌ Import failed!</p>';
            });
        }
    </script>
</body>
</html>