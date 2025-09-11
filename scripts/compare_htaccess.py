#!/usr/bin/env python3
"""
Script para comparar .htaccess del FTP vs código local
Parte del protocolo de deployment seguro ECO-NAZCAMEDIA
"""

import os
import sys
from pathlib import Path
import difflib
from datetime import datetime

def read_file_content(file_path):
    """Leer contenido de archivo"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read().strip()
    except Exception as e:
        print(f'❌ Error leyendo {file_path}: {e}')
        return None

def find_latest_ftp_backup():
    """Encontrar el backup más reciente del FTP"""
    backup_dir = Path('backup-ftp')
    if not backup_dir.exists():
        print('❌ Directorio backup-ftp no encontrado')
        return None
    
    htaccess_files = list(backup_dir.glob('.htaccess_ftp_backup_*'))
    if not htaccess_files:
        print('❌ No se encontraron backups de .htaccess del FTP')
        return None
    
    # Obtener el más reciente
    latest_file = max(htaccess_files, key=lambda x: x.stat().st_mtime)
    return latest_file

def compare_htaccess_files(ftp_file, local_file):
    """Comparar archivos .htaccess"""
    print('🔍 ECO-NAZCAMEDIA: Comparando archivos .htaccess...')
    
    # Leer contenidos
    ftp_content = read_file_content(ftp_file)
    local_content = read_file_content(local_file)
    
    if ftp_content is None or local_content is None:
        return False
    
    print(f'\n📂 FTP .htaccess: {ftp_file}')
    print(f'📂 Local .htaccess: {local_file}')
    
    # Comparar contenidos
    if ftp_content == local_content:
        print('\n✅ Los archivos .htaccess son IDÉNTICOS')
        print('✅ No se requiere sincronización')
        return True
    else:
        print('\n⚠️  Los archivos .htaccess son DIFERENTES')
        print('🔍 Generando diff detallado...')
        
        # Generar diff
        ftp_lines = ftp_content.splitlines(keepends=True)
        local_lines = local_content.splitlines(keepends=True)
        
        diff = list(difflib.unified_diff(
            local_lines, 
            ftp_lines,
            fromfile='LOCAL .htaccess',
            tofile='FTP .htaccess',
            lineterm=''
        ))
        
        if diff:
            print('\n📋 DIFERENCIAS ENCONTRADAS:')
            print('=' * 60)
            for line in diff:
                if line.startswith('+++') or line.startswith('---'):
                    print(f'\033[94m{line}\033[0m')  # Blue
                elif line.startswith('+'):
                    print(f'\033[92m{line}\033[0m')  # Green
                elif line.startswith('-'):
                    print(f'\033[91m{line}\033[0m')  # Red
                elif line.startswith('@@'):
                    print(f'\033[93m{line}\033[0m')  # Yellow
                else:
                    print(line)
            print('=' * 60)
        
        return False

def analyze_differences(ftp_file, local_file):
    """Analizar las diferencias y dar recomendaciones"""
    ftp_content = read_file_content(ftp_file)
    local_content = read_file_content(local_file)
    
    print('\n🔍 ANÁLISIS DE DIFERENCIAS:')
    print('-' * 40)
    
    # Análisis de características clave
    ftp_has_spa = 'RewriteRule . /index.html [L]' in ftp_content
    local_has_spa = 'RewriteRule . /index.html [L]' in local_content or 'RewriteRule ^(.*)$ /index.html [L]' in local_content
    
    ftp_has_https = 'HTTPS' in ftp_content or 'https://' in ftp_content
    local_has_https = 'HTTPS' in local_content or 'https://' in local_content
    
    ftp_has_cloudflare = 'CF-Visitor' in ftp_content or 'Cloudflare' in ftp_content
    local_has_cloudflare = 'CF-Visitor' in local_content or 'Cloudflare' in local_content
    
    print(f'📱 SPA Routing:')
    print(f'  FTP: {"✅" if ftp_has_spa else "❌"} | Local: {"✅" if local_has_spa else "❌"}')
    
    print(f'🔒 HTTPS Redirect:')
    print(f'  FTP: {"✅" if ftp_has_https else "❌"} | Local: {"✅" if local_has_https else "❌"}')
    
    print(f'☁️  Cloudflare Integration:')
    print(f'  FTP: {"✅" if ftp_has_cloudflare else "❌"} | Local: {"✅" if local_has_cloudflare else "❌"}')
    
    # Recomendaciones
    print('\n💡 RECOMENDACIONES:')
    
    if ftp_has_spa and not local_has_cloudflare:
        print('⚠️  El FTP tiene SPA routing básico, el local tiene Cloudflare')
        print('   → Mantener .htaccess del FTP para evitar loops')
        
    if local_has_cloudflare and not ftp_has_cloudflare:
        print('⚠️  Conflicto potencial: Local optimizado para Cloudflare')
        print('   → El FTP no tiene configuración Cloudflare')
        print('   → CRÍTICO: Usar .htaccess del FTP para evitar redirecciones infinitas')
        
    if not ftp_has_spa and local_has_spa:
        print('✅ Actualizar FTP con SPA routing del local')
        
    return {
        'ftp_has_spa': ftp_has_spa,
        'local_has_spa': local_has_spa,
        'ftp_has_https': ftp_has_https,
        'local_has_https': local_has_https,
        'ftp_has_cloudflare': ftp_has_cloudflare,
        'local_has_cloudflare': local_has_cloudflare
    }

def create_deployment_htaccess(analysis, ftp_file):
    """Crear .htaccess optimizado para deployment"""
    print('\n🔧 CREANDO .htaccess PARA DEPLOYMENT...')
    
    # Si el FTP no tiene Cloudflare pero el local sí, usar el del FTP
    if analysis['local_has_cloudflare'] and not analysis['ftp_has_cloudflare']:
        print('⚠️  Usando .htaccess del FTP para evitar loops de Cloudflare')
        
        ftp_content = read_file_content(ftp_file)
        deployment_file = Path('.htaccess.deployment')
        
        with open(deployment_file, 'w') as f:
            f.write(ftp_content)
        
        print(f'✅ Creado: {deployment_file}')
        return deployment_file
    else:
        print('✅ Usar .htaccess local existente')
        return Path('.htaccess')

def main():
    print('🔍 ECO-NAZCAMEDIA: Análisis comparativo de .htaccess')
    
    # Encontrar backup más reciente del FTP
    ftp_backup = find_latest_ftp_backup()
    if not ftp_backup:
        sys.exit(1)
    
    # Archivo local
    local_htaccess = Path('.htaccess')
    if not local_htaccess.exists():
        print('❌ .htaccess local no encontrado')
        sys.exit(1)
    
    # Comparar archivos
    are_identical = compare_htaccess_files(ftp_backup, local_htaccess)
    
    # Analizar diferencias si no son idénticos
    if not are_identical:
        analysis = analyze_differences(ftp_backup, local_htaccess)
        deployment_file = create_deployment_htaccess(analysis, ftp_backup)
        
        print(f'\n🎯 RESULTADO FINAL:')
        print(f'📁 Usar para deployment: {deployment_file}')
        
        if deployment_file.name == '.htaccess.deployment':
            print('⚠️  CRÍTICO: Se creó .htaccess.deployment basado en FTP')
            print('   → Este archivo debe usarse en el deployment a GoDaddy')
            print('   → Evita loops de redirección con Cloudflare')
    
    print('\n✅ Análisis completado')

if __name__ == '__main__':
    main()