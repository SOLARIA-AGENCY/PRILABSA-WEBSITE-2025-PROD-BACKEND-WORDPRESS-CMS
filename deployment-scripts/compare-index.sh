#!/bin/bash

echo "🔍 Descargando index.html del servidor y comparando con dist..."

curl -s https://productos.prilabsa.com/ > /tmp/server_index.html
cp dist/index.html /tmp/local_index.html

echo "--- Comparación de archivos ---"
diff /tmp/server_index.html /tmp/local_index.html || echo "Los archivos son DIFERENTES"

echo ""
echo "--- Script tags en servidor:"
grep "script type" /tmp/server_index.html

echo ""
echo "--- Script tags en local:"
grep "script type" /tmp/local_index.html
