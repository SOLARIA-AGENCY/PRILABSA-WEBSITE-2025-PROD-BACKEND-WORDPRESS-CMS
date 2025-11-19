#!/bin/bash

echo "🧹 Limpiando caché y subiendo index.html actualizado..."

cat > force_upload.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Delete old index.html
rm public_html/index.html || echo "No old file"

# Upload new index.html
put dist/index.html -o public_html/index.html

# Verify
ls -la public_html/index.html

quit
EOF

lftp -f force_upload.txt
rm force_upload.txt

echo "✅ Forzado upload completado!"
echo "🔍 Esperando 3 segundos para que se actualice..."
sleep 3
echo "Verificando contenido actual:"
curl -s https://productos.prilabsa.com/ | grep -A 2 "script type"
