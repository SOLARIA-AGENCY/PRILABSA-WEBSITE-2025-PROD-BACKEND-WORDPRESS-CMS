#!/bin/bash

echo "🚀 Subiendo .htaccess corregido..."

# Crear script de comandos lftp
cat > upload_htaccess.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Hacer backup del .htaccess actual
get .htaccess -o .htaccess.backup

# Subir nuevo .htaccess
put htaccess-simple-fixed -o .htaccess

quit
EOF

echo "📤 Subiendo .htaccess corregido..."
lftp -f upload_htaccess.txt

echo "🧹 Limpiando..."
rm upload_htaccess.txt

echo "🎉 ¡ .htactualizado!"
echo "🌐 Verificando sitio en: https://productos.prilabsa.com/"