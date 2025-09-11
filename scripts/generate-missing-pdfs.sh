#!/bin/bash

# Script para generar PDFs placeholder para productos faltantes

PDF_DIR="/Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/public/assets/productos/pdfs"
PLACEHOLDER="$PDF_DIR/placeholder.pdf"

# Lista de PDFs faltantes
MISSING_PDFS=$(comm -23 /tmp/expected_pdfs.txt /tmp/existing_pdfs.txt)

echo "Generando PDFs placeholder para productos faltantes..."
echo "Total de PDFs a generar: $(echo "$MISSING_PDFS" | wc -l)"

# Crear cada PDF faltante como copia del placeholder
while IFS= read -r filename; do
    if [ ! -z "$filename" ]; then
        echo "Creando: $filename"
        cp "$PLACEHOLDER" "$PDF_DIR/$filename"
    fi
done <<< "$MISSING_PDFS"

# Eliminar el placeholder original
rm "$PLACEHOLDER"

echo "✅ Proceso completado!"
echo "Total de PDFs en el directorio: $(ls -1 "$PDF_DIR"/*.pdf 2>/dev/null | wc -l)"