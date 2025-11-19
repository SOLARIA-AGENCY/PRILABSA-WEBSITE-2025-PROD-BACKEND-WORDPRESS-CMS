# 🚀 Guía de Despliegue y Arquitectura - Prilabsa 2025

Este documento detalla la arquitectura de despliegue, los problemas conocidos con GoDaddy y los procedimientos de mantenimiento para el sitio `productos.prilabsa.com`.

## 🏗️ Arquitectura

El proyecto utiliza una arquitectura **Headless WordPress**:

*   **Frontend:** React 19 + Vite (SPA).
*   **Backend:** WordPress (instalado en `/wordpress/`).
*   **API:** WordPress REST API (`/wp-json/wp/v2/productos`).
*   **Hosting:** GoDaddy (Hosting Compartido Linux).

### Estructura de Directorios en Servidor

```
/public_html/
├── .htaccess              # Enrutamiento principal (React + Proxy API)
├── index.html             # Entry point de React
├── assets/                # JS, CSS, Imágenes del frontend
├── wordpress/             # Instalación de WordPress (Backend)
│   ├── wp-admin/
│   ├── wp-content/
│   │   └── plugins/
│   │       └── prilabsa-productos/  # Plugin custom para CPT y API
│   └── index.php
└── ...
```

## 🔧 Configuración Crítica

### 1. Archivo `.htaccess` (Raíz)
El archivo `.htaccess` es vital para que funcionen tanto React como la API de WordPress.

**Funciones:**
1.  **Exclusiones:** Permite acceso directo a `/assets/`, `/wordpress/` y archivos con extensiones específicas (`.js`, `.css`, `.png`, etc.).
2.  **React Router:** Redirige cualquier otra petición a `index.html` para que React maneje la ruta.

### 2. Variables de Entorno (`.env.production`)
```env
VITE_SITE_URL=https://productos.prilabsa.com
VITE_WP_API_BASE_URL=https://productos.prilabsa.com/wp-json
```

## ⚠️ Problemas Conocidos: Caché de GoDaddy

Durante el despliegue inicial (Noviembre 2025), se identificó un problema crítico con la caché de servidor de GoDaddy.

*   **Síntoma:** El servidor entrega versiones antiguas de `index.html` y archivos PHP, ignorando los cambios recientes subidos por FTP.
*   **Solución:** Es necesario realizar un "Flush Cache" desde el panel de control de GoDaddy o esperar a que expire la caché (TTL variable).
*   **Diagnóstico:** Se han incluido scripts en `deployment-scripts/` para verificar si el archivo servido coincide con el subido.

## 🛠️ Scripts de Despliegue y Mantenimiento

Se han creado scripts de utilidad en la carpeta `deployment-scripts/`:

*   `deploy-full-build.sh`: Realiza un build de React y lo sube por FTP.
*   `audit-wordpress-v2.sh`: Verifica la instalación de plugins y archivos en el backend.
*   `run-activation.sh`: Ejecuta el script de activación de plugins remotamente.
*   `REPORTE-INCIDENCIA-GODADDY.md`: Plantilla para reportar problemas de caché a soporte.

## 🔄 Procedimiento de Actualización

1.  **Frontend:**
    ```bash
    npm run build
    # Subir contenido de dist/ a public_html/
    ```

2.  **Backend (Plugins):**
    *   Subir cambios a `public_html/wordpress/wp-content/plugins/prilabsa-productos/`.

3.  **Verificación:**
    *   Revisar `https://productos.prilabsa.com` (Hard Refresh).
    *   Verificar API: `https://productos.prilabsa.com/wp-json/wp/v2/productos`.

---
**Desarrollado por Solaria Agency**
