#!/bin/bash

echo "🚀 Subiendo index.html actualizado desde dist/..."

cat > upload_index.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%
put dist/index.html -o public_html/index.html
quit
EOF

lftp -f upload_index.txt
rm upload_index.txt

echo "✅ index.html actualizado!"
echo "🌐 Verificando..."
sleep 2
curl -s https://productos.prilabsa.com/ | grep -o "index-[a-zA-Z0-9_-]*.js" | head -1
