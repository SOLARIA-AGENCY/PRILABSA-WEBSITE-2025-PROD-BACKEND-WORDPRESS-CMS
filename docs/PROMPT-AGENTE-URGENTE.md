# PROMPT PARA AGENTE ESPECIALIZADO - RESOLUCIÓN SITIO PRILABSA

## CONTEXTO DE EMERGENCIA

Necesito que un agente especializado resuelva un problema crítico en el sitio https://productos.prilabsa.com/. El sitio está funcionando parcialmente pero las imágenes y archivos estáticos no cargan.

## PROBLEMA DETALLADO

### Síntomas:
- ✅ El HTML principal carga correctamente en https://productos.prilabsa.com/
- ❌ Todas las imágenes retornan HTML en lugar del contenido de la imagen
- ❌ Los archivos CSS y JS también retornan HTML
- ❌ Cualquier solicitud a cualquier ruta retorna el mismo HTML

### Evidencia técnica:
- Las imágenes están subidas correctamente en el servidor (verificado vía FTP)
- Ubicación: `/public_html/assets/images/productos/`
- Permisos correctos: 644 para archivos, 755 para directorios
- Múltiples .htaccess fueron probados sin éxito
- Incluso eliminando .htaccess completamente, el problema persiste

### Diagnóstico:
El servidor tiene una configuración global (Apache/Nginx) que fuerza TODAS las solicitudes a index.html, ignorando si los archivos existen físicamente.

## ACCIONES REQUERIDAS

### 1. INVESTIGACIÓN INMEDIATA
- Acceder al panel de control de GoDaddy del cliente
- Localizar la configuración de Apache/Nginx para el dominio productos.prilabsa.com
- Identificar reglas de reescritura globales que puedan estar causando este comportamiento
- Revisar archivos de configuración: httpd.conf, .conf del dominio, etc.

### 2. SOLUCIÓN PRINCIPAL
Modificar la configuración del servidor para que:
1. Verifique si el archivo existe ANTES de aplicar reescrituras
2. Sirva archivos estáticos directamente cuando existan
3. Aplique fallback a index.html solo para rutas que no son archivos

### 3. SOLUCIÓN ALTERNATIVA (si no hay acceso a config)
Implementar un servidor de archivos PHP como solución temporal:
- Crear file-server.php que sirva archivos estáticos con headers correctos
- Modificar .htaccess para redirigir archivos estáticos a file-server.php
- Mantener fallback a index.html para el resto

### 4. VERIFICACIÓN
- Probar acceso directo a imágenes: https://productos.prilabsa.com/assets/images/productos/AD001_COMBACID_XL.png
- Verificar que CSS y JS carguen correctamente
- Confirmar que el sitio funcione como SPA completa

## INFORMACIÓN DE ACCESO

### FTP (ya verificado funcional):
- Host: productos.prilabsa.com
- Usuario: solaria.charlie@blog.prilabsa.com
- Contraseña: SoCh2025$%
- Directorio web: /public_html/

### Archivos críticos afectados:
- Imágenes: /public_html/assets/images/productos/*.png (105 archivos)
- CSS: /public_html/assets/index-*.css
- JS: /public_html/assets/*.js
- HTML: /public_html/index.html

## PRIORIDAD: URGENTE

Este problema debe resolverse hoy mismo. El cliente necesita el sitio funcionando completamente con todas las imágenes de productos visibles.

## RESULTADO ESPERADO

Al finalizar:
- Las imágenes de productos deben cargar correctamente
- El sitio debe funcionar como una SPA completa
- Todos los assets estáticos deben servir apropiadamente
- El rendimiento debe ser óptimo

## NOTA IMPORTANTE

Este NO es un problema de código frontend. El código está correcto. Es un problema de configuración de servidor que requiere acceso a nivel de sistema o panel de control de hosting.

POR FAVOR, TOMAR ESTE CASO CON MÁXIMA PRIORIDAD Y RESOLVER LO ANTES POSIBLE.