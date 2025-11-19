#!/bin/bash

echo "🚀 Subiendo todas las imágenes de productos al servidor..."

# Crear script de comandos lftp para subir todas las imágenes
cat > lftp_all_images.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Subir todas las imágenes de productos
EOF

# Agregar comandos para cada imagen
for file in dist/assets/images/productos/*.png; do
  filename=$(basename "$file")
  echo "put dist/assets/images/productos/$filename -o assets/images/productos/$filename" >> lftp_all_images.txt
done

echo "quit" >> lftp_all_images.txt

echo "📤 Subiendo $(ls dist/assets/images/productos/*.png | wc -l) imágenes..."
lftp -f lftp_all_images.txt

echo "🧹 Limpiando..."
rm lftp_all_images.txt

echo "🎉 ¡Todas las imágenes subidas exitosamente!"
echo "🌐 Sitio web disponible en: https://productos.prilabsa.com/"