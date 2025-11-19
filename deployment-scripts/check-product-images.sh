#!/bin/bash

echo "🔍 Verificando imágenes de productos en public_html..."

# Crear script de auditoría
cat > check_product_images.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Verificar imágenes de productos
ls -la public_html/assets/images/productos/

quit
EOF

echo "📋 Verificando imágenes de productos..."
lftp -f check_product_images.txt

echo "🧹 Limpiando..."
rm check_product_images.txt