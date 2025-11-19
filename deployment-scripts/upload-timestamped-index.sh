#!/bin/bash

TIMESTAMP=$(date +%s)
NEW_INDEX="index_${TIMESTAMP}.html"

echo "🚀 Usando archivo index con timestamp: $NEW_INDEX"

# Copy index.html locally with new name
cp dist/index.html "/tmp/$NEW_INDEX"

cat > upload_timestamped.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Upload with timestamp name
put /tmp/$NEW_INDEX -o public_html/$NEW_INDEX

quit
EOF

lftp -f upload_timestamped.txt
rm upload_timestamped.txt

echo "✅ Archivo $NEW_INDEX subido!"
echo "🌐 Probando acceso..."
curl -s "https://productos.prilabsa.com/$NEW_INDEX" | grep "script type"
