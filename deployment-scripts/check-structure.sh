#!/bin/bash

echo "🔍 Verificando estructura de directorios..."

cat > check_structure.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

echo "=== PWD ==="
pwd

echo "=== LS public_html ==="
ls -la public_html | grep assets

echo "=== Assets directory exists? ==="
ls -ld public_html/assets

echo "=== First 10 files in assets ==="
ls -la public_html/assets | head -20

quit
EOF

lftp -f check_structure.txt
rm check_structure.txt
