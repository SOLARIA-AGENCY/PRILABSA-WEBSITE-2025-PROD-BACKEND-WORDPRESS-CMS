#!/bin/bash

# Configuración FTP
HOST="productos.prilabsa.com"
USER="solaria.charlie@blog.prilabsa.com"
PASS="SoCh2025$%"

echo "🚀 Subiendo archivos críticos al servidor..."

# Subir index.html
echo "📤 Subiendo index.html..."
curl -T "dist/index.html" "ftp://$USER:$PASS@$HOST/index.html" --ftp-create-dirs

# Subir CSS
echo "📤 Subiendo CSS..."
curl -T "dist/assets/index-C2tgQzUA.css" "ftp://$USER:$PASS@$HOST/assets/index-C2tgQzUA.css" --ftp-create-dirs

# Subir JavaScript
echo "📤 Subiendo JavaScript..."
curl -T "dist/assets/index-BV5pYAlm.js" "ftp://$USER:$PASS@$HOST/assets/index-BV5pYAlm.js" --ftp-create-dirs
curl -T "dist/assets/react-DMrr_GdF.js" "ftp://$USER:$PASS@$HOST/assets/react-DMrr_GdF.js" --ftp-create-dirs"
curl -T "dist/assets/vendor-CtuOAJYM.js" "ftp://$USER:$PASS@$HOST/assets/vendor-CtuOAJYM.js" --ftp-create-dirs"

# Subir algunas imágenes críticas
echo "🖼️ Subiendo imágenes críticas..."
curl -T "dist/assets/productos/AD001_COMBACID_XL.png" "ftp://$USER:$PASS@$HOST/assets/productos/AD001_COMBACID_XL.png" --ftp-create-dirs
curl -T "dist/assets/productos/AD002_Carophyll_Pink.png" "ftp://$USER:$PASS@$HOST/assets/productos/AD002_Carophyll_Pink.png" --ftp-create-dirs"
curl -T "dist/assets/productos/AL001_CAMARON_CRECIMIENTO_35.png" "ftp://$USER:$PASS@$HOST/assets/productos/AL001_CAMARON_CRECIMIENTO_35.png" --ftp-create-dirs"

echo "🎉 ¡Archivos críticos subidos exitosamente!"
echo "🌐 Sitio web disponible en: https://productos.prilabsa.com/"