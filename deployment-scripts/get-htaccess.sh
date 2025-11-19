#!/bin/bash

echo "🔍 Descargando .htaccess del servidor..."

cat > get_htaccess.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

get public_html/.htaccess -o .htaccess_server

quit
EOF

lftp -f get_htaccess.txt
rm get_htaccess.txt

echo "--- Contenido del .htaccess en el servidor: ---"
cat .htaccess_server
