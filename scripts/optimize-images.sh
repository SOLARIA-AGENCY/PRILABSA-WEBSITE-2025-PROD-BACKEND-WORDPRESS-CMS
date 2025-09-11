#!/bin/bash

# Encontrar todas las imágenes PNG de más de 1MB en la carpeta public
find public -name "*.png" -size +1M | while read -r img; do
  echo "Optimizando $img"
  # Redimensionar la imagen a un ancho de 1200px
  sips -Z 1200 "$img" --out "${img%.png}-optimized.png"
  # Reemplazar la imagen original con la optimizada
  mv -f "${img%.png}-optimized.png" "$img"
done

echo "Optimización completada."