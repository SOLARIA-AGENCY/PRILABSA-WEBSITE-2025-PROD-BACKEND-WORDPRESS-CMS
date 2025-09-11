#!/usr/bin/env python3
"""
Script para descargar .htaccess actual del FTP de GoDaddy
Parte del protocolo de deployment seguro ECO-NAZCAMEDIA
"""

import os
import sys
import ftplib
import json
from pathlib import Path
from datetime import datetime

def load_ftp_config():
    """Cargar configuración FTP desde .ftpconfig.json"""
    config_path = Path('.ftpconfig.json')
    if not config_path.exists():
        print('❌ Archivo .ftpconfig.json no encontrado')
        sys.exit(1)
    
    with open(config_path, 'r') as f:
        return json.load(f)

def connect_ftp(config):
    """Establecer conexión FTP"""
    try:
        ftp = ftplib.FTP()
        ftp.connect(config['host'], config.get('port', 21), timeout=config.get('timeout', 60))
        ftp.login(config['user'], config['password'])
        ftp.set_pasv(True)
        return ftp
    except Exception as e:
        print(f'❌ Error conectando al FTP: {e}')
        sys.exit(1)

def download_htaccess(ftp, remote_root):
    """Descargar .htaccess del servidor"""
    try:
        # Cambiar al directorio remoto
        ftp.cwd(remote_root)
        
        # Crear directorio de backup local
        backup_dir = Path('backup-ftp')
        backup_dir.mkdir(exist_ok=True)
        
        # Generar nombre de archivo con timestamp
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        local_htaccess = backup_dir / f'.htaccess_ftp_backup_{timestamp}'
        
        # Descargar .htaccess
        with open(local_htaccess, 'wb') as f:
            ftp.retrbinary('RETR .htaccess', f.write)
        
        print(f'✅ .htaccess descargado: {local_htaccess}')
        return local_htaccess
        
    except ftplib.error_perm as e:
        if '550' in str(e):  # File not found
            print('⚠️  .htaccess no encontrado en el servidor FTP')
            return None
        else:
            print(f'❌ Error de permisos FTP: {e}')
            sys.exit(1)
    except Exception as e:
        print(f'❌ Error descargando .htaccess: {e}')
        sys.exit(1)

def list_remote_files(ftp, remote_root):
    """Listar archivos en el directorio remoto para debug"""
    try:
        ftp.cwd(remote_root)
        files = []
        ftp.retrlines('LIST', files.append)
        
        print(f'\n📂 Archivos en {remote_root}:')
        for file_info in files:
            print(f'  {file_info}')
        
        return files
    except Exception as e:
        print(f'❌ Error listando archivos remotos: {e}')
        return []

def main():
    print('🔍 ECO-NAZCAMEDIA: Descargando .htaccess del FTP...')
    
    # Cargar configuración
    config = load_ftp_config()
    print(f'🔗 Conectando a {config["host"]}...')
    
    # Conectar FTP
    ftp = connect_ftp(config)
    print('✅ Conexión FTP establecida')
    
    # Listar archivos para debug
    list_remote_files(ftp, config['remoteRoot'])
    
    # Descargar .htaccess
    downloaded_file = download_htaccess(ftp, config['remoteRoot'])
    
    # Cerrar conexión
    ftp.quit()
    print('🔒 Conexión FTP cerrada')
    
    if downloaded_file:
        print(f'\n📋 Archivo descargado: {downloaded_file}')
        print('🔍 Contenido del .htaccess del FTP:')
        print('-' * 50)
        with open(downloaded_file, 'r') as f:
            content = f.read()
            print(content)
        print('-' * 50)
        
        return str(downloaded_file)
    else:
        print('\n⚠️  No se encontró .htaccess en el servidor FTP')
        return None

if __name__ == '__main__':
    main()