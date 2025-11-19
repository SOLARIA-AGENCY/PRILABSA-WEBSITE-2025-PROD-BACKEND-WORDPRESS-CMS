#!/bin/bash

echo "🔧 Re-habilitando .htaccess..."

cat > enable_htaccess.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Rename back
mv public_html/.htaccess.disabled public_html/.htaccess || echo "Already enabled"

# Upload fresh .htaccess
put .htaccess -o public_html/.htaccess

quit
EOF

lftp -f enable_htaccess.txt
rm enable_htaccess.txt

echo "✅ .htaccess re-habilitado"
echo "🔍 Verificando index.html direct..."
curl -s https://productos.prilabsa.com/ | grep "script type"
