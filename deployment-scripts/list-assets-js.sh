#!/bin/bash

echo "🔍 Listando archivos JS en assets..."

cat > list_assets.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

echo "--- JS files in public_html/assets: ---"
ls -la public_html/assets/*.js
echo "--- All files in assets (first 50): ---"
ls -la public_html/assets/ | head -50

quit
EOF

lftp -f list_assets.txt
rm list_assets.txt
