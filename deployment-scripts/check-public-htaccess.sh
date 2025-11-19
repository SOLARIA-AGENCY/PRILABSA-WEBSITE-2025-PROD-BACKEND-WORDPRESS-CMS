#!/bin/bash

echo "🔍 Verificando .htaccess en public_html..."

# Crear script de auditoría
cat > check_public_htaccess.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Verificar .htaccess en public_html
get public_html/.htaccess -o public_htaccess.txt

quit
EOF

echo "📋 Descargando .htaccess de public_html..."
lftp -f check_public_htaccess.txt

echo "📄 Contenido de .htaccess en public_html:"
cat public_htaccess.txt

echo "🧹 Limpiando..."
rm check_public_htaccess.txt public_htaccess.txt