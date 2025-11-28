#!/bin/bash

echo "🚀 Moviendo archivos a public_html (directorio correcto)..."

# Crear script de comandos lftp
cat > move_to_public_html.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Mover archivos principales a public_html
put index.html -o public_html/index.html
put .htaccess -o public_html/.htaccess

# Mover assets completos
mirror -R assets/ public_html/assets/

quit
EOF

echo "📤 Moviendo archivos a public_html..."
lftp -f move_to_public_html.txt

echo "🧹 Limpiando..."
rm move_to_public_html.txt

echo "🎉 ¡Archivos movidos a public_html!"
echo "🌐 Sitio web disponible en: https://productos.prilabsa.com/"