#!/bin/bash

echo "🧪 Creando prueba de imagen simple (v2)..."

# Crear script de comandos lftp
cat > test_image_v2.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Copiar imagen local directamente
put dist/assets/images/productos/AD001_COMBACID_XL.png -o public_html/test.png

quit
EOF

echo "📤 Creando prueba de imagen v2..."
lftp -f test_image_v2.txt

echo "🧹 Limpiando..."
rm test_image_v2.txt

echo "🎉 ¡Imagen de prueba creada!"
echo "🌐 Probando: https://productos.prilabsa.com/test.png"