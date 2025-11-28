#!/bin/bash

echo "🔍 Verificando estructura completa del servidor..."

# Crear script de auditoría completa
cat > full_audit.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Listar estructura completa
pwd
ls -la
ls -la assets/
ls -la assets/images/
ls -la assets/images/productos/

quit
EOF

echo "📋 Auditoría completa..."
lftp -f full_audit.txt

echo "🧹 Limpiando..."
rm full_audit.txt