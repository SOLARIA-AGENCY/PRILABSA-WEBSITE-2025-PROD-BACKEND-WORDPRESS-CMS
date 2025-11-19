#!/bin/bash

echo "🚀 Subiendo plugins de Prilabsa..."

cat > upload_plugins.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Crear directorio del plugin
mkdir -p public_html/wordpress/wp-content/plugins/prilabsa-productos

# Subir archivos del plugin
mirror -R PROJECT-PRODUCTOS-HEADLESS-WP/deployment/wp-content/plugins/prilabsa/ public_html/wordpress/wp-content/plugins/prilabsa-productos/

# Crear archivo principal del plugin (loader)
put -c -o public_html/wordpress/wp-content/plugins/prilabsa-productos/index.php /dev/null

quit
EOF

lftp -f upload_plugins.txt
rm upload_plugins.txt

echo "✅ Plugins subidos."
