#!/bin/bash

echo "🚀 Desplegando build COMPLETO actualizado..."

cat > deploy_full.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Upload index.html
put dist/index.html -o public_html/index.html

# Upload assets directory (mirror will sync)
mirror -R --delete dist/assets public_html/assets

# Upload favicon
put dist/favicon.png -o public_html/favicon.png

quit
EOF

lftp -f deploy_full.txt
rm deploy_full.txt

echo "✅ Deploy completado!"
echo "🔍 Verificando index.html..."
curl -s https://productos.prilabsa.com/ | grep -o "index-[a-zA-Z0-9_-]*.js"
