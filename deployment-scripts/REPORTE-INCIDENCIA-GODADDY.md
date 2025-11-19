# 🚨 Reporte de Incidencia Técnica - Despliegue productos.prilabsa.com

**Fecha:** 19 de Noviembre, 2025
**Asunto:** Persistencia de Caché Severa en Servidor GoDaddy impidiendo despliegue
**Dominio:** https://productos.prilabsa.com
**Prioridad:** ALTA - Bloqueante para producción

---

## 📋 Resumen Ejecutivo

Se ha detectado un problema crítico de **caché a nivel de servidor (Server-Side Caching / CDN)** en el hosting de GoDaddy que está impidiendo la actualización del sitio web. 

A pesar de que los archivos se actualizan correctamente vía FTP y se verifican como correctos en el sistema de archivos del servidor, el servidor web (Apache/Nginx) sigue entregando una versión antigua de los archivos (de hace >24 horas) a cualquier petición HTTP/HTTPS.

## 🔍 Evidencia Técnica

Hemos realizado pruebas exhaustivas que confirman que el sistema de archivos (FTP) y el servidor web (HTTP) están desincronizados debido a una capa de caché agresiva.

### 1. Discrepancia de Archivos (Index.html)

El archivo `index.html` contiene referencias a los scripts JavaScript de la aplicación.

*   **Versión Correcta (Visible vía FTP):**
    *   Referencia: `index-BV5pYAlm.js`
    *   Estado: Confirmado subido y verificado descargando el archivo directamente por FTP.

*   **Versión Servida (Visible vía Web):**
    *   Referencia: `index-XnHfdbvB.js` (Versión antigua)
    *   Estado: Esta versión **YA NO EXISTE** en el servidor, pero sigue siendo entregada por HTTP.

### 2. Pruebas Realizadas (Fallidas por Caché)

1.  **Eliminación de Archivo:** Se eliminó `index.html` del servidor vía FTP.
    *   *Resultado:* La web **siguió cargando** (HTTP 200) con el contenido antiguo, lo cual es técnicamente imposible sin una caché intermedia.
2.  **Cambio de Nombre:** Se subió un archivo con nombre único `index_1763540409.html`.
    *   *Resultado:* Al acceder a esta URL específica, el servidor entregó el contenido del `index.html` antiguo, ignorando el contenido real del nuevo archivo.
3.  **Bypass de Caché:** Se intentó acceder con parámetros `?t=123` y headers `Cache-Control: no-cache`.
    *   *Resultado:* El servidor ignoró los headers y sirvió contenido antiguo.
4.  **Desactivación .htaccess:** Se renombró el archivo `.htaccess` para desactivarlo.
    *   *Resultado:* No hubo cambios en el comportamiento, indicando que la caché está por encima de la configuración de Apache.

### 3. Logs de Verificación

```bash
# Verificación vía FTP (Muestra contenido REAL y CORRECTO)
ftp> get public_html/index.html
> Contiene: <script src="/assets/index-BV5pYAlm.js">

# Verificación vía HTTP (Muestra contenido FANTASMA/CACHÉ)
curl https://productos.prilabsa.com/index.html
> Contiene: <script src="/assets/index-XnHfdbvB.js">
```

## 🛠️ Solicitud al Webmaster / Soporte

Por favor, solicitamos realizar las siguientes acciones en el panel de hosting de GoDaddy:

1.  **FLUSH / PURGE CACHE:** Realizar un vaciado completo de la caché del servidor. Esto puede estar etiquetado como:
    *   "Flush Cache" en el panel de Managed WordPress.
    *   "Purge Varnish" o "Nginx Cache".
    *   "Clear Cache" en la configuración de CDN si está activa.
2.  **Verificar Permisos:** Asegurar que los permisos de escritura en `public_html` se estén propagando al servidor web.
3.  **Desactivar Caché Temporalmente:** Si es posible, desactivar la caché de servidor durante la fase de desarrollo/despliegue actual.

---

**Nota Técnica Adicional:**
El despliegue actual incluye una aplicación React (Frontend) y WordPress (Backend). La integridad de los archivos en disco es correcta (verificada por FTP), el único punto de fallo es la entrega HTTP de dichos archivos.
