#!/bin/bash

echo "🚀 Activando plugin remotamente..."

cat > upload_activator.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

put activate-remote.php -o public_html/wordpress/activate-remote.php

quit
EOF

lftp -f upload_activator.txt
rm upload_activator.txt

echo "✅ Script subido. Ejecutando..."
curl -s https://productos.prilabsa.com/wordpress/activate-remote.php
