#!/bin/bash

echo "🧪 PRUEBA: Desactivando .htaccess temporalmente..."

cat > disable_htaccess.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Rename .htaccess to disable it
mv public_html/.htaccess public_html/.htaccess.disabled

quit
EOF

lftp -f disable_htaccess.txt
rm disable_htaccess.txt

echo "✅ .htaccess desactivado temporalmente"
echo "🔍 Probando acceso AHORA..."
sleep 2
curl -I https://productos.prilabsa.com/assets/react-DMrr_GdF.js | grep HTTP
