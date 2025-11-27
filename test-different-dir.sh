#!/bin/bash

echo "🧪 Probando con directorio diferente..."

# Crear script de comandos lftp
cat > test_different_dir.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Crear directorio estático y mover imagen allí
mkdir -p public_html/static
put dist/assets/images/productos/AD001_COMBACID_XL.png -o public_html/static/test.png

quit
EOF

echo "📤 Creando prueba en directorio estático..."
lftp -f test_different_dir.txt

echo "🧹 Limpiando..."
rm test_different_dir.txt

echo "🎉 ¡Prueba en directorio estático creada!"
echo "🌐 Verificando: https://productos.prilabsa.com/static/test.png"