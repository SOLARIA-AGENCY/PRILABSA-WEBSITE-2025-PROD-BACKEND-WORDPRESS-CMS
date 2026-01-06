#!/bin/bash

echo "🚀 Desplegando build COMPLETO actualizado a subdomain..."

cat > deploy_full.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Upload index.html to subdomain root
put dist/index.html -o public_html/productos.prilabsa.com/index.html

# Upload assets directory (mirror will sync) to subdomain assets
mirror -R --delete dist/assets public_html/productos.prilabsa.com/assets

# Upload favicon to subdomain root
put dist/favicon.png -o public_html/productos.prilabsa.com/favicon.png

quit
EOF

lftp -f deploy_full.txt
rm deploy_full.txt

echo "✅ Deploy completado!"
echo "🔍 Verificando index.html..."
curl -s https://productos.prilabsa.com/ | grep -o "index-[a-zA-Z0-9_-]*.js"
