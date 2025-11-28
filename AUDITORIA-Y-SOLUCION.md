# 🛡️ Auditoría de Despliegue y Diagnóstico - Prilabsa

**Fecha:** 22 Noviembre 2025
**Estado:** 🔴 CRÍTICO (Pantalla Blanca / Mismatch de Versiones)
**Sitio:** `https://productos.prilabsa.com`

## 🔍 Diagnóstico Ejecutivo

El sitio presenta una **"Pantalla Blanca de la Muerte"** debido a una desincronización entre el archivo `index.html` que sirve GoDaddy y los archivos JavaScript/CSS que realmente existen en el servidor.

### Evidencia Técnica

1.  **Versión en Servidor (Caché Antigua):**
    *   El servidor entrega un `index.html` que busca el archivo JS: `index-XnHfdbvB.js`.
    *   Este archivo **NO EXISTE** o no es accesible, lo que provoca que el servidor devuelva el propio `index.html` (debido a las reglas de React Router), causando un error de sintaxis en la consola del navegador (`Uncaught SyntaxError: Unexpected token '<'`).

2.  **Versión Local (Build Reciente):**
    *   Tu carpeta `dist/index.html` referencia al archivo JS: `index-BV5pYAlm.js`.
    *   Esto confirma que **GoDaddy está sirviendo una versión antigua (cacheada)** del `index.html`, ignorando el nuevo archivo que subiste.

3.  **Estado del Backend:**
    *   ✅ La API de WordPress responde correctamente (`/wp-json/wp/v2/types` devuelve JSON).
    *   El problema es 100% frontend y de caché.

---

## 🛠️ Solución Recomendada

### Paso 1: Actualizar `.htaccess` (Anti-Caché)

Debemos forzar al navegador y a GoDaddy a NO cachear el `index.html`. He preparado una versión mejorada de tu `htaccess-final-solution` que incluye cabeceras estrictas de no-caché para archivos HTML.

**Acción:** Reemplazaré tu archivo local `htaccess-final-solution` con la versión corregida. Deberás subirlo al servidor como `.htaccess`.

### Paso 2: Forzar Limpieza en GoDaddy

Aunque actualicemos el `.htaccess`, es posible que el servidor Nginx de GoDaddy siga sirviendo la copia vieja.

1.  Entra al **cPanel / Panel de GoDaddy**.
2.  Busca la opción **"Flush Cache"** o **"Managed WordPress" > "Flush Cache"**.
3.  Si no existe, intenta renombrar el archivo `index.html` en el servidor a `index_v2.html` y luego volverlo a llamar `index.html` (esto a veces rompe la caché de inodo).

### Paso 3: Verificación de Subida

Asegúrate de que la carpeta `assets/` en el servidor contenga los archivos que coinciden con tu build local (`index-BV5pYAlm.js`, etc.).

---

## 📝 Resumen de Cambios a Aplicar

Voy a modificar tu archivo `htaccess-final-solution` para agregar estas reglas críticas:

```apache
# Forzar NO CACHE para index.html y archivos de manifiesto
<FilesMatch "\.(html|htm|json)$">
    FileETag None
    <IfModule mod_headers.c>
        Header unset ETag
        Header set Cache-Control "max-age=0, no-cache, no-store, must-revalidate"
        Header set Pragma "no-cache"
        Header set Expires "Wed, 11 Jan 1984 05:00:00 GMT"
    </IfModule>
</FilesMatch>
```
