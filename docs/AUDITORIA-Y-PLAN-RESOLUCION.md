# AUDITORÍA Y PLAN DE RESOLUCIÓN - SITIO PRILABSA

## PROBLEMA CRÍTICO IDENTIFICADO

El sitio web https://productos.prilabsa.com/ tiene un problema fundamental de configuración de servidor que impide el acceso a archivos estáticos (imágenes, CSS, JS).

## SÍNTOMAS OBSERVADOS

1. **El sitio carga**: El HTML principal se sirve correctamente
2. **Los archivos estáticos no sirven**: Todas las imágenes, CSS y JS retornan el contenido de index.html en lugar del archivo solicitado
3. **Redirección global**: Cualquier solicitud a cualquier ruta retorna el mismo HTML

## DIAGNÓSTICO TÉCNICO

### Causa Raíz
El servidor tiene una configuración global (probablemente en Apache/Nginx) que fuerza todas las solicitudes a index.html, ignorando completamente si los archivos existen físicamente.

### Evidencia
- Las imágenes están subidas correctamente en el servidor (verificado vía FTP)
- Los archivos tienen los permisos correctos (644 para archivos, 755 para directorios)
- Múltiples configuraciones de .htaccess fueron probadas sin éxito
- Incluso sin .htaccess, el problema persiste

## PLAN DE RESOLUCIÓN

### OPCIÓN 1: Configuración de Servidor (Recomendada)

#### Acciones Inmediatas:
1. **Acceder al panel de control de GoDaddy**
2. **Localizar la configuración de Apache/Nginx**
3. **Identificar reglas de reescritura globales**
4. **Modificar configuración para permitir archivos estáticos**

#### Configuración Apache Deseada:
```apache
# En httpd.conf o .conf del dominio
<Directory "/home/f55gt259sx/public_html">
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
    
    # Permitir archivos estáticos antes de reescrituras
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]
    
    # SPA fallback solo para rutas que no son archivos
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ /index.html [L]
</Directory>
```

### OPCIÓN 2: Solución Temporal PHP

#### Crear un servidor de archivos PHP:
```php
<?php
// file-server.php
$filePath = __DIR__ . $_SERVER['REQUEST_URI'];

if (file_exists($filePath) && is_file($filePath)) {
    $extension = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
    
    switch ($extension) {
        case 'png':
            header('Content-Type: image/png');
            break;
        case 'jpg':
        case 'jpeg':
            header('Content-Type: image/jpeg');
            break;
        case 'css':
            header('Content-Type: text/css');
            break;
        case 'js':
            header('Content-Type: application/javascript');
            break;
        default:
            header('Content-Type: application/octet-stream');
    }
    
    header('Content-Length: ' . filesize($filePath));
    readfile($filePath);
    exit;
}

// Si no es archivo, servir index.html
include 'index.html';
?>
```

#### Modificar .htaccess:
```apache
RewriteEngine On
RewriteRule ^(assets/|.*\.(png|jpg|jpeg|css|js|ico|svg|woff|woff2|ttf|eot)$) file-server.php [L]
RewriteRule ^(.*)$ index.html [L]
```

### OPCIÓN 3: CDN Externo (Solución Rápida)

1. **Subir imágenes a un CDN** (Cloudinary, AWS S3, etc.)
2. **Actualizar las URLs en el frontend** para apuntar al CDN
3. **Mantener solo el HTML y JS en el servidor actual**

## ACCIONES INMEDIATAS REQUERIDAS

### Paso 1: Contactar Soporte GoDaddy
- Explicar el problema de redirección global
- Solicitar acceso a configuración de Apache/Nginx
- Pedir que permitan archivos estáticos antes de reescrituras

### Paso 2: Si no hay acceso a configuración
- Implementar solución PHP temporal (Opción 2)
- O mover archivos estáticos a CDN (Opción 3)

### Paso 3: Verificación
- Probar acceso a imágenes directamente
- Verificar que el sitio funciona completamente
- Monitorear rendimiento

## ARCHIVOS CRÍTICOS AFECTADOS

- **Imágenes de productos**: `/assets/images/productos/*.png`
- **CSS**: `/assets/index-*.css`
- **JavaScript**: `/assets/*.js`
- **Favicon**: `/favicon.png`

## PRIORIDAD

1. **URGENTE**: Resolver configuración de servidor
2. **ALTA**: Implementar solución temporal si es necesario
3. **MEDIA**: Optimizar rendimiento post-resolución
4. **BAJA**: Implementar monitoreo continuo

## CONTACTO TÉCNICO REQUERIDO

- **Soporte GoDaddy**: Configuración de servidor Apache/Nginx
- **Administrador del sistema**: Acceso a archivos de configuración
- **Equipo de desarrollo**: Implementación de soluciones temporales

## RESULTADO ESPERADO

Una vez resuelto:
- Las imágenes de productos cargarán correctamente
- El CSS y JS servirán apropiadamente
- El sitio funcionará como una SPA completa
- El rendimiento será óptimo

Este problema requiere intervención a nivel de configuración de servidor, no puede resolverse únicamente con cambios en el código o .htaccess.