#!/usr/bin/env python3
import os
import sys
import ftplib
import argparse
from pathlib import Path


def connect_ftp(host: str, user: str, password: str, port: int = 21, passive: bool = True) -> ftplib.FTP:
    ftp = ftplib.FTP()
    ftp.connect(host, port, timeout=60)
    ftp.login(user=user, passwd=password)
    ftp.set_pasv(passive)
    return ftp


def ensure_remote_dir(ftp: ftplib.FTP, remote_dir: str):
    parts = [p for p in remote_dir.strip('/').split('/') if p]
    for part in parts:
        try:
            ftp.mkd(part)
        except Exception:
            pass
        ftp.cwd(part)


def upload_file(ftp: ftplib.FTP, local_path: Path, remote_name: str):
    with open(local_path, 'rb') as f:
        ftp.storbinary(f'STOR {remote_name}', f)


def upload_dir(ftp: ftplib.FTP, local_dir: Path):
    for root, dirs, files in os.walk(local_dir):
        rel_root = os.path.relpath(root, local_dir)
        if rel_root == '.':
            rel_root = ''
        # Ensure directory on remote
        if rel_root:
            for part in rel_root.split(os.sep):
                if part:
                    try:
                        ftp.mkd(part)
                    except Exception:
                        pass
                    ftp.cwd(part)
        # Upload files in this directory
        for fname in files:
            local_file = Path(root) / fname
            upload_file(ftp, local_file, fname)
        # Go back to base after finishing this dir
        if rel_root:
            # Navigate back up to the base directory
            up_levels = len(rel_root.split(os.sep))
            for _ in range(up_levels):
                ftp.cwd('..')


def main():
    parser = argparse.ArgumentParser(description='Upload dist/ to FTP server')
    parser.add_argument('--host', required=True)
    parser.add_argument('--user', required=True)
    parser.add_argument('--password', required=True)
    parser.add_argument('--port', type=int, default=21)
    parser.add_argument('--remote-root', default='/public_html/blog')
    parser.add_argument('--local-dir', default='dist')
    args = parser.parse_args()

    local_dir = Path(args.local_dir).resolve()
    if not (local_dir.exists() and (local_dir / 'index.html').exists()):
        print('❌ dist/index.html no encontrado. Asegúrate de tener el build listo.')
        sys.exit(2)

    print(f'🔗 Conectando a {args.host}:{args.port} ...')
    ftp = connect_ftp(args.host, args.user, args.password, args.port, passive=True)
    print('✅ Conectado')

    print(f'📂 Asegurando directorio remoto: {args.remote_root}')
    ensure_remote_dir(ftp, args.remote_root)

    print(f'⬆️  Subiendo contenido de {local_dir} ...')
    upload_dir(ftp, local_dir)
    print('✅ Subida completa')

    ftp.quit()


if __name__ == '__main__':
    main()
