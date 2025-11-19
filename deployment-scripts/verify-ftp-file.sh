#!/bin/bash

echo "🔍 Verificando DIRECTAMENTE el archivo subido via FTP..."

cat > verify_file.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Download and check content
get public_html/index.html -o /tmp/ftp_index.html

quit
EOF

lftp -f verify_file.txt
rm verify_file.txt

echo "--- Contenido del archivo en FTP (script tags): ---"
grep "script type" /tmp/ftp_index.html

echo ""
echo "--- Comparando con local: ---"
grep "script type" dist/index.html
