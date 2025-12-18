<?php
$plugins = array(
    'prilabsa-productos-cpt.zip',
    'prilabsa-acf-config.zip', 
    'prilabsa-rest-api.zip',
    'prilabsa-import-products.zip'
);

foreach ($plugins as $zip) {
    $zipPath = $zip;
    $extractTo = 'wp-content/plugins/' . str_replace('.zip', '', $zip) . '/';
    
    if (file_exists($zipPath)) {
        // Create directory if it doesn't exist
        if (!is_dir($extractTo)) {
            mkdir($extractTo, 0755, true);
        }
        
        // Extract ZIP
        $zip = new ZipArchive();
        if ($zip->open($zipPath) === TRUE) {
            $zip->extractTo($extractTo);
            $zip->close();
            echo "Extracted: $zipPath to $extractTo
";
        } else {
            echo "Failed to extract: $zipPath
";
        }
    } else {
        echo "ZIP not found: $zipPath
";
    }
}
echo "Plugin extraction complete
";
?>