#!/bin/bash

echo "🔍 Iniciando Auditoría de WordPress..."

cat > audit_wp.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

echo "--- 1. Estructura Raíz WordPress ---"
ls -la public_html/wordpress/

echo "--- 2. Plugins Instalados ---"
ls -la public_html/wp-content/plugins/

echo "--- 3. Plugins Prilabsa ---"
ls -la public_html/wp-content/plugins/prilabsa-productos/

echo "--- 4. Uploads (Imágenes/PDFs) ---"
ls -la public_html/wp-content/uploads/prilabsa-productos/

quit
EOF

lftp -f audit_wp.txt > audit_results.txt
rm audit_wp.txt

echo "✅ Auditoría de archivos completada."
cat audit_results.txt
