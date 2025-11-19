#!/bin/bash

echo "🔥 FORZANDO actualización de index.html con delete + upload..."

cat > force_update_index.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Backup primero
get public_html/index.html -o .index.html.old_backup

# Delete index.html
rm -f public_html/index.html

# Confirm deletion
ls -la public_html/index.html || echo "Deleted successfully"

# Upload fresh copy
put dist/index.html -o public_html/index.html

# Verify upload
ls -la public_html/index.html

quit
EOF

lftp -f force_update_index.txt
rm force_update_index.txt

echo "✅ Index actualizado con delete + upload!"
echo "🔍 Esperando 5 segundos..."
sleep 5
echo "Verificando NOW:"
curl -H "Cache-Control: no-cache" -s https://productos.prilabsa.com/?t=$(date +%s) | grep "script type"
