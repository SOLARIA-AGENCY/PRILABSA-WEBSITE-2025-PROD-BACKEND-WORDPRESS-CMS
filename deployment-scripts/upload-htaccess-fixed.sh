#!/bin/bash

echo "🚀 Subiendo .htaccess CORREGIDO con exclusión de /assets/..."

cat > upload_htaccess_fixed.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

put .htaccess -o public_html/.htaccess

quit
EOF

lftp -f upload_htaccess_fixed.txt
rm upload_htaccess_fixed.txt

echo "✅ .htaccess actualizado!"
echo "🔍 Probando acceso a assets..."
sleep 3
curl -I https://productos.prilabsa.com/assets/react-DMrr_GdF.js | grep HTTP
