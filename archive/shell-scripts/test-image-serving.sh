#!/bin/bash

echo "🧪 Creando prueba de imagen simple..."

# Crear script de comandos lftp
cat > test_image_serving.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Crear una prueba simple - copiar una imagen existente con nombre simple
put public_html/assets/images/productos/AD001_COMBACID_XL.png -o public_html/test.png

quit
EOF

echo "📤 Creando prueba de imagen..."
lftp -f test_image_serving.txt

echo "🧹 Limpiando..."
rm test_image_serving.txt

echo "🎉 ¡Imagen de prueba creada!"
echo "🌐 Probando: https://productos.prilabsa.com/test.png"