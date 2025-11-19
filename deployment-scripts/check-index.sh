#!/bin/bash

echo "🔍 Verificando si index.js está en el servidor..."

# Crear script de auditoría
cat > check_index.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Verificar si index.js existe
ls -la assets/index.js

quit
EOF

echo "📋 Verificando index.js..."
lftp -f check_index.txt

echo "🧹 Limpiando..."
rm check_index.txt