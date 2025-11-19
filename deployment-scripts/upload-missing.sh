#!/bin/bash

echo "🚀 Subiendo archivos faltantes críticos..."

# Crear script de comandos lftp
cat > lftp_missing.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Subir archivos faltantes
put dist/assets/index.js -o assets/index.js

quit
EOF

echo "📤 Subiendo archivo index.js faltante..."
lftp -f lftp_missing.txt

echo "🧹 Limpiando..."
rm lftp_missing.txt

echo "🎉 ¡Archivos faltantes subidos!"
echo "🌐 Verificando sitio en: https://productos.prilabsa.com/"