#!/bin/bash

echo "🚀 Subiendo index.html correcto a public_html..."

# Crear script de comandos lftp
cat > upload_correct_index.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Subir index.html correcto a public_html
put dist/index.html -o public_html/index.html

quit
EOF

echo "📤 Subiendo index.html correcto..."
lftp -f upload_correct_index.txt

echo "🧹 Limpiando..."
rm upload_correct_index.txt

echo "🎉 ¡index.html actualizado en public_html!"
echo "🌐 Verificando sitio en: https://productos.prilabsa.com/"