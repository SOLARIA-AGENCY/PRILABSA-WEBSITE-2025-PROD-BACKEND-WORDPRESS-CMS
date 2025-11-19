#!/bin/bash

echo "🔍 Verificando archivos en public_html..."

# Crear script de auditoría
cat > check_public_html.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Verificar public_html
ls -la public_html/
ls -la public_html/assets/
ls -la public_html/assets/images/

quit
EOF

echo "📋 Verificando public_html..."
lftp -f check_public_html.txt

echo "🧹 Limpiando..."
rm check_public_html.txt