#!/bin/bash

echo "🗑️ Eliminando .htaccess para probar..."

# Crear script de comandos lftp
cat > remove_htaccess.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Hacer backup y eliminar .htaccess
rm public_html/.htaccess

quit
EOF

echo "📤 Eliminando .htaccess..."
lftp -f remove_htaccess.txt

echo "🧹 Limpiando..."
rm remove_htaccess.txt

echo "🎉 ¡ .htaccess eliminado!"
echo "🌐 Verificando: https://productos.prilabsa.com/test.png"