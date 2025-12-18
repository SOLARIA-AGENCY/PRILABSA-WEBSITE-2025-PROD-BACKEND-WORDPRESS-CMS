#!/bin/bash

echo "🔍 AUDIT: Verificando estado del servidor..."

# Crear script de auditoría
cat > audit_server.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Listar archivos principales
ls -la index.html
ls -la assets/
ls -la assets/images/
ls -la assets/images/productos/

quit
EOF

echo "📋 Auditando archivos en servidor..."
lftp -f audit_server.txt

echo "🧹 Limpiando..."
rm audit_server.txt