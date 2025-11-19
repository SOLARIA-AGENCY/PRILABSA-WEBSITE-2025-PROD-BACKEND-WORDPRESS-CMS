#!/bin/bash

echo "🔧 Subiendo .htaccess ultra-simple..."

# Crear script de comandos lftp
cat > upload_simple_htaccess.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Subir .htaccess ultra-simple
put htaccess-simple -o public_html/.htaccess

quit
EOF

echo "📤 Subiendo .htaccess ultra-simple..."
lftp -f upload_simple_htaccess.txt

echo "🧹 Limpiando..."
rm upload_simple_htaccess.txt

echo "🎉 ¡ .htaccess ultra-simple subido!"
echo "🌐 Verificando: https://productos.prilabsa.com/test.png"