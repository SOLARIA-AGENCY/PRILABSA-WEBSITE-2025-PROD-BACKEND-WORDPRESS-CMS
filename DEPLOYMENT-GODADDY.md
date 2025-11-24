# Guía de Despliegue GoDaddy - productos.prilabsa.com

**Proyecto**: Prilabsa Corporate Website 2025
**Hosting**: GoDaddy Shared Hosting
**Subdomain**: productos.prilabsa.com
**Estado**: ✅ Desplegado y operativo
**Última actualización**: 2025-11-24

---

## 📋 Tabla de Contenidos

1. [Estado del Despliegue](#estado-del-despliegue)
2. [Configuración del Entorno](#configuración-del-entorno)
3. [Estructura de Directorios](#estructura-de-directorios)
4. [Configuración .htaccess](#configuración-htaccess)
5. [Proceso de Despliegue](#proceso-de-despliegue)
6. [Verificación Post-Despliegue](#verificación-post-despliegue)
7. [Solución de Problemas](#solución-de-problemas)
8. [Scripts de Despliegue](#scripts-de-despliegue)

---

## Estado del Despliegue

### ✅ Verificación Exitosa (2025-11-24)

```bash
URL: https://productos.prilabsa.com
Status: HTTP 200 OK
Redirect: / → /productos (HTTP 301)
Language: Spanish (es) por defecto
Assets: Todos cargando correctamente
Logos: Cargando desde /images/logos/
```

### Métricas del Build Actual

```
Bundle Size:
- index-BWNJVzSa.js: 81.01 kB (gzipped)
- vendor-Dif9kfxu.js: 1.31 MB
- Total Assets: ~485 archivos
- index.html: 5.8 KB
- .htaccess: 1.6 KB
- favicon.png: 17.5 KB
```

---

## Configuración del Entorno

### Requisitos de Sistema

```json
{
  "node": ">=20.0.0",
  "npm": ">=8.0.0",
  "yarn": "1.22.22"
}
```

**Actual en desarrollo**:
- Node: v22.19.0
- NPM: 10.9.3
- Yarn: 1.22.22

### Dependencias Principales

```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.7.0",
  "i18next": "^25.3.2",
  "react-i18next": "^15.6.1",
  "vite": "^6.3.6",
  "typescript": "^5.3.3",
  "tailwindcss": "^4.1.10"
}
```

### Configuración FTP

**Archivo**: `.ftpconfig.json` (⚠️ NO COMMITEAR)

```json
{
  "host": "productos.prilabsa.com",
  "user": "solaria.charlie@blog.prilabsa.com",
  "password": "SoCh2025$%",
  "port": 21,
  "secure": false,
  "passive": true,
  "remoteRoot": "/public_html/productos.prilabsa.com",
  "retries": 5,
  "timeout": 120000
}
```

**⚠️ CRÍTICO**:
- El `remoteRoot` DEBE ser `/public_html/productos.prilabsa.com`
- NO usar `/public_html` (directorio raíz incorrecto)
- Passive mode: `true` para evitar timeout en bulk uploads

---

## Estructura de Directorios

### Estructura Local (dist/)

```
dist/
├── .htaccess                    # ⭐ Configuración Apache crítica
├── index.html                   # SPA entry point
├── favicon.png                  # 17KB
├── assets/                      # ~485 archivos JS/CSS
│   ├── index-BWNJVzSa.js       # Main bundle (81KB)
│   ├── vendor-Dif9kfxu.js      # Vendor bundle (1.3MB)
│   ├── index-C2tgQzUA.css      # Main styles (87KB)
│   └── [otros bundles...]
└── images/
    └── logos/
        ├── prilabsa-logo.png
        ├── logo-prilabsa-azul.png
        └── logo-prilabsa-blanco.png
```

### Estructura Remota (GoDaddy)

```
/public_html/
└── productos.prilabsa.com/      # ⭐ Subdomain root
    ├── .htaccess                # DEBE EXISTIR
    ├── index.html               # DEBE EXISTIR
    ├── favicon.png              # DEBE EXISTIR
    ├── assets/                  # DEBE EXISTIR
    └── images/                  # DEBE EXISTIR
```

**⚠️ ERROR COMÚN**:
Subir a `/public_html/` en lugar de `/public_html/productos.prilabsa.com/` causa HTTP 403/500.

---

## Configuración .htaccess

### Archivo Completo (VALIDADO ✅)

**Ubicación**: `dist/.htaccess`

```apache
Options -MultiViews
RewriteEngine On

# ⭐ Redirect root to /productos
RewriteCond %{REQUEST_URI} ^/$
RewriteRule ^$ /productos [R=301,L]

# Handle Angular and React Router requests - serve index.html for all non-file requests
RewriteCond %{THE_REQUEST} \s/+(.*?/)?(?:index)?\s [NC]
RewriteRule ^ /%1 [R=302,L]

# If the requested file or directory doesn't exist, serve index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options nosniff
    Header set X-Frame-Options DENY
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/svg+xml "access plus 1 month"
</IfModule>
```

### Explicación de Reglas Críticas

#### 1. Redirect Root → /productos
```apache
RewriteCond %{REQUEST_URI} ^/$
RewriteRule ^$ /productos [R=301,L]
```
- **Propósito**: Cuando usuario visita `productos.prilabsa.com/`, redirige a `/productos`
- **Tipo**: 301 (Permanent Redirect)
- **Verificación**: `curl -I https://productos.prilabsa.com/` debe mostrar `Location: /productos`

#### 2. SPA Router Fallback
```apache
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```
- **Propósito**: Todas las rutas no existentes sirven index.html (React Router)
- **Ejemplo**: `/productos/detalles/AL001` → `index.html` (client-side routing)

#### 3. Options -MultiViews
```apache
Options -MultiViews
```
- **Propósito**: Evita que Apache intente adivinar extensiones de archivo
- **Necesario**: Para SPA routing correcto

---

## Proceso de Despliegue

### 1. Build Local

```bash
# Build completo con validaciones
npm run build

# Build rápido (sin tests exhaustivos)
npm run build:fast
```

**El build incluye**:
- Materialización de imágenes esperadas
- Copia de assets de productos
- Verificación de integridad de productos
- Validación de imágenes
- Generación de bundles con Vite
- Verificación post-build

### 2. Verificación Pre-Despliegue

```bash
# Verificar archivos críticos localmente
ls -la dist/.htaccess dist/index.html dist/favicon.png

# Verificar tamaño de assets
du -sh dist/assets/

# Listar imágenes de logos
ls -la dist/images/logos/
```

**Checklist**:
- [ ] `.htaccess` existe (1.6 KB)
- [ ] `index.html` existe (5.8 KB)
- [ ] `favicon.png` existe (17.5 KB)
- [ ] `assets/` contiene ~485 archivos
- [ ] `images/logos/` contiene logos

### 3. Despliegue FTP

#### Opción A: Upload Crítico (Recomendado)

```bash
# Upload archivos críticos con retry
node scripts/upload-critical-retry.cjs
```

**Archivos subidos**:
1. index.html
2. favicon.png
3. .htaccess
4. assets/ (completo)

#### Opción B: Upload Completo

```bash
# Upload todo dist/
node scripts/upload-all-fast.cjs
```

#### Opción C: Solo Assets

```bash
# Solo actualizar assets/ (después de rebuild)
node scripts/upload-assets-only.cjs
```

#### Opción D: Imágenes + .htaccess

```bash
# Actualizar imágenes y .htaccess
node scripts/upload-images-and-htaccess.cjs
```

### 4. Auditoría Post-Despliegue

```bash
# Auditar servidor remoto
node scripts/full-audit.cjs
```

**Output esperado**:
```
✓ Conectado a: productos.prilabsa.com
✓ Directorio remoto: /public_html/productos.prilabsa.com

✓ index.html           6KB
✓ .htaccess            2KB
✓ favicon.png          17KB
✓ assets/              (directorio existe)
  → Contiene 485+ archivos
```

---

## Verificación Post-Despliegue

### Test Suite Automático

```bash
# Ejecutar todos los tests de verificación
npm run test:deployment
```

### Verificación Manual (HTTP)

```bash
# 1. Verificar home page
curl -I https://productos.prilabsa.com/
# Esperado: HTTP/2 301
# Location: https://productos.prilabsa.com/productos

# 2. Verificar página de productos
curl -I https://productos.prilabsa.com/productos
# Esperado: HTTP/2 200

# 3. Verificar logos
curl -I https://productos.prilabsa.com/images/logos/prilabsa-logo.png
# Esperado: HTTP/2 200

# 4. Verificar main bundle
curl -I https://productos.prilabsa.com/assets/index-BWNJVzSa.js
# Esperado: HTTP/2 200

# 5. Verificar idioma por defecto
curl -sL https://productos.prilabsa.com/productos | grep -o '<html[^>]*lang="[^"]*"'
# Esperado: <html lang="es"
```

### Checklist de Funcionalidad

- [ ] ✅ Sitio carga sin errores HTTP 500/403
- [ ] ✅ Redirect de `/` a `/productos` funciona (HTTP 301)
- [ ] ✅ Logos cargan correctamente
- [ ] ✅ Idioma por defecto es español (no auto-detecta navegador)
- [ ] ✅ Rutas SPA funcionan (ej: `/productos/detalles/AL001`)
- [ ] ✅ Assets JS/CSS cargan (sin 404)
- [ ] ✅ Favicon visible en navegador

---

## Solución de Problemas

### Error: HTTP 500 Internal Server Error

**Síntoma**:
```
GET https://productos.prilabsa.com/ net::ERR_HTTP_RESPONSE_CODE_FAILURE 500
```

**Causas Comunes**:
1. `.htaccess` con sintaxis incorrecta
2. Archivos no subidos al servidor
3. Directorio incorrecto (en `/public_html/` en lugar de subdomain)

**Solución**:
```bash
# 1. Verificar .htaccess localmente
cat dist/.htaccess

# 2. Auditar servidor
node scripts/full-audit.cjs

# 3. Re-subir .htaccess
node scripts/upload-critical-retry.cjs
```

---

### Error: HTTP 403 Forbidden

**Síntoma**:
```
Failed to load resource: the server responded with a status of 403
```

**Causas Comunes**:
1. Archivos en directorio incorrecto
2. Permisos de archivo incorrectos
3. `remoteRoot` incorrecto en `.ftpconfig.json`

**Solución**:
```bash
# 1. Verificar .ftpconfig.json
cat .ftpconfig.json | grep remoteRoot
# DEBE ser: /public_html/productos.prilabsa.com

# 2. Fijar permisos (si disponible)
node scripts/fix-permissions.cjs

# 3. Re-desplegar a directorio correcto
node scripts/upload-critical-retry.cjs
```

---

### Error: Assets no cargan (404)

**Síntoma**:
```
GET https://productos.prilabsa.com/assets/index-BWNJVzSa.js 404
```

**Causas Comunes**:
1. Bundle names cambiados en rebuild pero HTML no actualizado
2. Directorio `assets/` no subido o incompleto
3. Timeout durante upload masivo

**Solución**:
```bash
# 1. Rebuild completo
npm run build

# 2. Upload solo assets
node scripts/upload-assets-only.cjs

# 3. Verificar bundles remotos
node scripts/full-audit.cjs
```

---

### Error: Logos no cargan

**Síntoma**:
```
GET https://productos.prilabsa.com/images/logos/prilabsa-logo.png 404
```

**Solución**:
```bash
# Upload directorio images/
node scripts/upload-images-and-htaccess.cjs

# Verificar
curl -I https://productos.prilabsa.com/images/logos/prilabsa-logo.png
```

---

### Error: Idioma incorrecto (detecta navegador)

**Síntoma**: Sitio abre en inglés si navegador está en inglés

**Causa**: Configuración i18next con auto-detección

**Solución**: Ya implementada en:
- `src/contexts/LanguageContext.tsx:37` - Forzar 'es' por defecto
- `src/i18n/config.ts:22` - Remover 'navigator' de detection order

**Rebuild requerido**:
```bash
npm run build
node scripts/upload-critical-retry.cjs
```

---

### Error: FTP Timeout durante upload

**Síntoma**:
```
Can't open data connection in passive mode: connect ETIMEDOUT
```

**Solución**:
```bash
# Usar script con retry y active mode
node scripts/upload-critical-retry.cjs

# O ajustar timeout en .ftpconfig.json
# "timeout": 120000  # 2 minutos
```

---

## Scripts de Despliegue

### Scripts Disponibles

| Script | Propósito | Uso |
|--------|-----------|-----|
| `upload-critical-retry.cjs` | Upload archivos críticos con retry | Recomendado para deploys completos |
| `upload-all-fast.cjs` | Upload todo dist/ sin retry | Uso en conexión estable |
| `upload-assets-only.cjs` | Solo actualizar assets/ | Después de rebuild |
| `upload-images-and-htaccess.cjs` | Solo imágenes y .htaccess | Fix rápido de recursos |
| `full-audit.cjs` | Auditoría completa del servidor | Diagnóstico post-deploy |
| `fix-permissions.cjs` | Fijar permisos Unix (644/755) | Si hay errores 403 |

### Ejemplo de Workflow Completo

```bash
# 1. Cambios en código
vim src/components/MyComponent.tsx

# 2. Build local
npm run build

# 3. Test local
npm run preview

# 4. Deploy a GoDaddy
node scripts/upload-critical-retry.cjs

# 5. Auditar
node scripts/full-audit.cjs

# 6. Verificar live
curl -I https://productos.prilabsa.com/productos
```

---

## Configuración de Idioma (Español por Defecto)

### Estado Actual: ✅ Configurado

**Archivos modificados**:

#### 1. `src/contexts/LanguageContext.tsx`

```typescript
// Línea 37 - Siempre retorna 'es'
const getInitialLanguage = (): Language => {
  try {
    const saved = localStorage.getItem('prilabsa-language') as Language;
    if (saved && (saved === 'es' || saved === 'en' || saved === 'pt')) {
      return saved;
    }
  } catch (error) {
    console.warn('Error accessing localStorage:', error);
  }
  // SIEMPRE español por defecto, no detectar navegador
  return 'es';
};
```

#### 2. `src/i18n/config.ts`

```typescript
// Línea 22 - Removido 'navigator' de detection order
const detectionOptions = {
  order: ['localStorage', 'htmlTag'], // NO 'navigator'
  lookupLocalStorage: 'i18nextLng',
  caches: ['localStorage'],
  excludeCacheFor: ['cimode'],
  checkWhitelist: true
};
```

**Resultado**:
- Usuario nuevo → Español
- Usuario con localStorage → Idioma guardado
- Browser language → Ignorado

---

## Notas Finales

### ⚠️ Archivos Sensibles (NO COMMITEAR)

- `.ftpconfig.json` - Credenciales FTP
- `.env` - Variables de entorno
- Cualquier archivo con passwords

### 🔐 Credenciales de Acceso

**FTP GoDaddy**:
- Host: productos.prilabsa.com
- User: solaria.charlie@blog.prilabsa.com
- Pass: SoCh2025$%
- Port: 21 (FTP)

**⚠️ IMPORTANTE**: Cambiar credenciales periódicamente

### 📊 Monitoreo

**URLs de monitoreo**:
- Sitio principal: https://productos.prilabsa.com
- Verificación redirect: https://productos.prilabsa.com/ (debe redirigir)
- Test de logos: https://productos.prilabsa.com/images/logos/prilabsa-logo.png

---

**Documentación actualizada**: 2025-11-24
**Próxima revisión**: Fase 2 de desarrollo
**Mantenido por**: SOLARIA AGENCY / Prilabsa Development Team
