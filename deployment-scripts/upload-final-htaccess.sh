#!/bin/bash

echo "🔧 Subiendo .htaccess CORREGIDO FINAL..."

# Crear script de comandos lftp
cat > upload_final_htaccess.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Hacer backup y subir .htaccess corregido
get public_html/.htaccess -o public_html/.htaccess.backup
put htaccess-fixed-final -o public_html/.htaccess

quit
EOF

echo "📤 Subiendo .htaccess corregido final..."
lftp -f upload_final_htaccess.txt

echo "🧹 Limpiando..."
rm upload_final_htaccess.txt

echo "🎉 ¡ .htaccess corregido!"
echo "🌐 Verificando: https://productos.prilabsa.com/test.png"