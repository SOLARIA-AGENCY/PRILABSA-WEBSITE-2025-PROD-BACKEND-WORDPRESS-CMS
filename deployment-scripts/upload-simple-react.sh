#!/bin/bash

echo "🚀 Subiendo .htaccess SIMPLE para React..."

cat > upload_simple.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%
put .htaccess -o public_html/.htaccess
quit
EOF

lftp -f upload_simple.txt
rm upload_simple.txt

echo "✅ .htaccess subido!"
echo "🌐 Probando el sitio..."
sleep 2
curl -I https://productos.prilabsa.com
