#!/bin/bash

# Script para generar imágenes placeholder para productos faltantes

IMAGES_DIR="/Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/public/assets/productos/images"
PLACEHOLDER="/Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/public/assets/images/placeholder-product.jpg"

# Lista de imágenes faltantes
MISSING_IMAGES=$(comm -23 /tmp/expected_images.txt /tmp/existing_images.txt)

echo "Generando imágenes placeholder para productos faltantes..."
echo "Total de imágenes a generar: $(echo "$MISSING_IMAGES" | wc -l)"

# Crear cada imagen faltante como copia del placeholder
while IFS= read -r filename; do
    if [ ! -z "$filename" ]; then
        echo "Creando: $filename"
        cp "$PLACEHOLDER" "$IMAGES_DIR/$filename"
    fi
done <<< "$MISSING_IMAGES"

echo "✅ Proceso completado!"
echo "Total de imágenes en el directorio: $(ls -1 "$IMAGES_DIR"/*.png 2>/dev/null | wc -l)"