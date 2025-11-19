#!/bin/bash

echo "🔍 Re-intentando Auditoría de WordPress (Rutas Corregidas)..."

cat > audit_wp_v2.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

echo "--- 1. Plugins Instalados (en /wordpress/wp-content/plugins) ---"
ls -la public_html/wordpress/wp-content/plugins/

echo "--- 2. Plugins Prilabsa (en /wordpress/wp-content/plugins/prilabsa-productos) ---"
ls -la public_html/wordpress/wp-content/plugins/prilabsa-productos/

echo "--- 3. Uploads (en /wordpress/wp-content/uploads/prilabsa-productos) ---"
ls -la public_html/wordpress/wp-content/uploads/prilabsa-productos/

echo "--- 4. Uploads Imágenes ---"
ls -la public_html/wordpress/wp-content/uploads/prilabsa-productos/imagenes/ | head -10

quit
EOF

lftp -f audit_wp_v2.txt > audit_results_v2.txt
rm audit_wp_v2.txt

echo "✅ Auditoría v2 completada."
cat audit_results_v2.txt
