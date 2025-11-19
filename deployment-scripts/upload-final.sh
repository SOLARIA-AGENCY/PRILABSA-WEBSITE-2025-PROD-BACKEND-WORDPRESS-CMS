#!/bin/bash

# Usar lftp para subir archivos críticos
echo "🚀 Subiendo archivos críticos al servidor..."

# Crear script de comandos lftp
cat > lftp_commands.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Subir archivos principales
put dist/index.html -o index.html
put dist/assets/index-C2tgQzUA.css -o assets/index-C2tgQzUA.css
put dist/assets/index-BV5pYAlm.js -o assets/index-BV5pYAlm.js
put dist/assets/react-DMrr_GdF.js -o assets/react-DMrr_GdF.js
put dist/assets/vendor-CtuOAJYM.js -o assets/vendor-CtuOAJYM.js

# Subir imágenes críticas con nombres correctos
mkdir -p assets/images/productos
put dist/assets/images/productos/AD001_COMBACID_XL.png -o assets/images/productos/AD001_COMBACID_XL.png
put dist/assets/images/productos/AD002_Carophyll_Pink.png -o assets/images/productos/AD002_Carophyll_Pink.png
put dist/assets/images/productos/AL001_Advance_Feed.png -o assets/images/productos/AL001_Advance_Feed.png
put dist/assets/images/productos/EQ001_AMMO_LOCK.png -o assets/images/productos/EQ001_AMMO_LOCK.png
put dist/assets/images/productos/QU001_ACIDO_FORMICO.PNG -o assets/images/productos/QU001_ACIDO_FORMICO.PNG

quit
EOF

echo "📤 Ejecutando comandos FTP..."
lftp -f lftp_commands.txt

echo "🧹 Limpiando..."
rm lftp_commands.txt

echo "🎉 ¡Archivos críticos subidos exitosamente!"
echo "🌐 Sitio web disponible en: https://productos.prilabsa.com/"