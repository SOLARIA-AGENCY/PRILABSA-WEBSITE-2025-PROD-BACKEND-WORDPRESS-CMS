#!/bin/bash

echo "🔍 Diagnóstico completo de FTP..."

cat > ftp_diagnosis.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
set ftp:debug 9
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

echo "--- Current directory ---"
pwd

echo "--- Listing files ---"
ls -la public_html/ | head -20

echo "--- Permissions check ---"
quote SITE CHMOD 644 public_html/index.html

echo "--- Attempting upload with different name ---"
put dist/index.html -o public_html/index_new.html

echo "--- Listing again ---"
ls -la public_html/index*

quit
EOF

lftp -f ftp_diagnosis.txt 2>&1
rm ftp_diagnosis.txt
