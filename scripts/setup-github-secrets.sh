#!/bin/bash

# 🔐 PRILABSA GitHub Secrets Configuration Script
# Configura automáticamente los secrets necesarios para el despliegue

set -e

echo "🚀 Configurando GitHub Secrets para PRILABSA deployment..."

# Verificar que GitHub CLI esté instalado
if ! command -v gh &> /dev/null; then
    echo "❌ Error: GitHub CLI no está instalado"
    echo "📥 Instalar con: brew install gh"
    exit 1
fi

# Verificar autenticación
if ! gh auth status &> /dev/null; then
    echo "❌ Error: No estás autenticado en GitHub CLI"
    echo "🔑 Ejecutar: gh auth login"
    exit 1
fi

# Leer credenciales FTP desde .ftpconfig.json
if [ ! -f ".ftpconfig.json" ]; then
    echo "❌ Error: Archivo .ftpconfig.json no encontrado"
    exit 1
fi

echo "📖 Leyendo credenciales FTP desde .ftpconfig.json..."

# Extraer valores usando jq o python
if command -v jq &> /dev/null; then
    FTP_HOST=$(jq -r '.host' .ftpconfig.json)
    FTP_USERNAME=$(jq -r '.user' .ftpconfig.json)
    FTP_PASSWORD=$(jq -r '.password' .ftpconfig.json)
else
    # Fallback usando python
    FTP_HOST=$(python3 -c "import json; print(json.load(open('.ftpconfig.json'))['host'])")
    FTP_USERNAME=$(python3 -c "import json; print(json.load(open('.ftpconfig.json'))['user'])")
    FTP_PASSWORD=$(python3 -c "import json; print(json.load(open('.ftpconfig.json'))['password'])")
fi

echo "🔧 Configurando secrets en GitHub..."

# Configurar secrets
echo "$FTP_HOST" | gh secret set FTP_HOST
echo "$FTP_USERNAME" | gh secret set FTP_USERNAME
echo "$FTP_PASSWORD" | gh secret set FTP_PASSWORD

echo "✅ GitHub Secrets configurados exitosamente!"
echo ""
echo "📋 Secrets configurados:"
gh secret list

echo ""
echo "🎯 Próximos pasos:"
echo "1. Hacer commit y push a la rama 'main' para activar el despliegue automático"
echo "2. Monitorear el progreso en: https://github.com/SOLARIA-AGENCY/PRILABSA-WEBSITE-2025/actions"
echo "3. Verificar el sitio desplegado en: https://blog.prilabsa.com"
echo ""
echo "🚀 ¡Despliegue automático configurado y listo!"