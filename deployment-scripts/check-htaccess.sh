#!/bin/bash

echo "🔍 Verificando .htaccess en el servidor..."

# Crear script de auditoría
cat > check_htaccess.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Verificar .htaccess
get .htaccess -o server_htaccess.txt

quit
EOF

echo "📋 Descargando .htaccess..."
lftp -f check_htaccess.txt

echo "📄 Contenido de .htaccess:"
cat server_htaccess.txt

echo "🧹 Limpiando..."
rm check_htaccess.txt server_htaccess.txt