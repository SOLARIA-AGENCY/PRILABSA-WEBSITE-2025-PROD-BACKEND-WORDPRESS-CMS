# 🚨 PLAN DE DEPLOYMENT WORDPRESS - ZERO DOWNTIME

**Proyecto:** Prilabsa WordPress Headless
**Servidor:** productos.prilabsa.com (GoDaddy)
**Fecha:** 2025-11-24
**Prioridad:** ⚠️ **CRÍTICA - NO ROMPER FRONTEND ACTUAL**

---

## 🎯 OBJETIVO

Instalar WordPress Headless en **MISMO DOMINIO** (productos.prilabsa.com) manteniendo 100% disponibilidad del frontend React actual.

---

## ⚠️ RESTRICCIONES CRÍTICAS

```diff
+ ✅ Frontend React DEBE permanecer accesible en TODO momento
+ ✅ URLs actuales NO deben cambiar (/productos, /nosotros, /contacto)
+ ✅ .htaccess actual NO se modifica hasta FASE 6 (validación completa)
+ ✅ Backup completo ANTES de cualquier cambio
+ ✅ Rollback plan ready en cada fase
```

---

## 📋 FASES DE DEPLOYMENT

### **FASE 0: BACKUP Y PREPARACIÓN** ⏱ 15 min

#### 0.1 Backup Completo Servidor Actual

**Script:** `scripts/backup-godaddy-full.js`

```bash
# Descargar TODOS los archivos actuales
node scripts/backup-godaddy-full.js

# Backup incluye:
# - index.html (React SPA entry)
# - .htaccess (routing actual)
# - assets/ (bundles JS/CSS)
# - images/ (logos, assets)
# - favicon.png
```

**Validación:**
- [ ] Backup descargado a `deployment/backups/godaddy-YYYYMMDD-HHMMSS/`
- [ ] `.htaccess` respaldado y legible
- [ ] `index.html` respaldado
- [ ] Total archivos: ~490 archivos

**Rollback:** N/A (solo lectura)

---

#### 0.2 Obtener Credenciales MySQL GoDaddy

**Acciones:**
1. Login a GoDaddy cPanel
2. Ir a **MySQL Databases**
3. Verificar/crear base de datos:
   - Nombre sugerido: `prilabsa_wp_prod`
   - Usuario sugerido: `prilabsa_wpuser`
   - Password: (generar fuerte)

**Anotar:**
```
DB_NAME: _________________
DB_USER: _________________
DB_PASSWORD: _________________
DB_HOST: localhost (o IP provisto por GoDaddy)
```

**Validación:**
- [ ] Base de datos creada en cPanel
- [ ] Usuario con privilegios completos
- [ ] Credenciales anotadas de forma segura

---

#### 0.3 Descargar WordPress Core

```bash
cd PROJECT-PRODUCTOS-HEADLESS-WP/deployment/

# Descargar WordPress 6.6.2 (última versión estable)
curl -O https://wordpress.org/wordpress-6.6.2.tar.gz

# Extraer
tar -xzf wordpress-6.6.2.tar.gz

# Verificar estructura
ls -la wordpress/
# Expected: wp-admin/ wp-includes/ wp-content/ wp-config-sample.php
```

**Validación:**
- [ ] WordPress descargado: `wordpress-6.6.2.tar.gz`
- [ ] Extraído en `deployment/wordpress/`
- [ ] Archivos core presentes (wp-admin, wp-includes, wp-content)

---

### **FASE 1: PREPARAR WP-CONFIG.PHP LOCALMENTE** ⏱ 10 min

#### 1.1 Crear wp-config.php

**Archivo:** `deployment/wordpress/wp-config.php`

```php
<?php
/**
 * WordPress Configuration - Prilabsa Production
 * Generated: 2025-11-24
 */

// ** MySQL settings ** //
define('DB_NAME', 'REEMPLAZAR_CON_DB_NAME');
define('DB_USER', 'REEMPLAZAR_CON_DB_USER');
define('DB_PASSWORD', 'REEMPLAZAR_CON_DB_PASSWORD');
define('DB_HOST', 'localhost'); // O IP de GoDaddy
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');

// ** Authentication Unique Keys and Salts ** //
// IMPORTANTE: Generar en https://api.wordpress.org/secret-key/1.1/salt/
define('AUTH_KEY',         'REEMPLAZAR');
define('SECURE_AUTH_KEY',  'REEMPLAZAR');
define('LOGGED_IN_KEY',    'REEMPLAZAR');
define('NONCE_KEY',        'REEMPLAZAR');
define('AUTH_SALT',        'REEMPLAZAR');
define('SECURE_AUTH_SALT', 'REEMPLAZAR');
define('LOGGED_IN_SALT',   'REEMPLAZAR');
define('NONCE_SALT',       'REEMPLAZAR');

// ** WordPress Database Table prefix ** //
$table_prefix = 'wp_';

// ** CORS Configuration (Headless) ** //
define('WP_CORS_ALLOWED_ORIGINS', ['https://productos.prilabsa.com']);

// ** Debugging (disable in production after testing) ** //
define('WP_DEBUG', false);
define('WP_DEBUG_LOG', false);
define('WP_DEBUG_DISPLAY', false);

// ** Absolute path to the WordPress directory ** //
if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/');
}

// ** Sets up WordPress vars and included files ** //
require_once ABSPATH . 'wp-settings.php';
```

**Pasos:**
1. Copiar template arriba
2. Reemplazar `DB_NAME`, `DB_USER`, `DB_PASSWORD` con credenciales reales
3. Visitar https://api.wordpress.org/secret-key/1.1/salt/
4. Copiar keys generadas y reemplazar
5. Guardar archivo

**Validación:**
- [ ] wp-config.php creado
- [ ] Credenciales MySQL correctas
- [ ] Security keys únicas generadas
- [ ] CORS origins configured

---

### **FASE 2: SUBIR WORDPRESS (SIN MODIFICAR .HTACCESS)** ⏱ 20-30 min

#### 2.1 Upload WordPress Core via FTP

**Script:** `scripts/deploy-wordpress-safe.js`

```javascript
/**
 * Safe WordPress Deployment
 * - Uploads WP core files
 * - SKIPS .htaccess (preserva actual)
 * - SKIPS index.html (preserva React)
 */

const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');

const config = require('../.ftpconfig.json');
const client = new ftp.Client();

async function deploySafe() {
  try {
    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      secure: false
    });

    console.log('✓ Connected to GoDaddy FTP');

    // Lista de archivos/directorios WordPress a subir
    const wpFiles = [
      'wp-admin/',
      'wp-includes/',
      'wp-content/',
      'wp-config.php',
      'wp-load.php',
      'wp-login.php',
      'wp-settings.php',
      'wp-blog-header.php',
      'wp-comments-post.php',
      'wp-config-sample.php',
      'wp-cron.php',
      'wp-links-opml.php',
      'wp-mail.php',
      'wp-signup.php',
      'wp-trackback.php',
      'xmlrpc.php'
    ];

    const remoteBase = '/public_html/productos.prilabsa.com';
    const localBase = './deployment/wordpress';

    console.log('📤 Uploading WordPress files...');

    for (const file of wpFiles) {
      const localPath = path.join(localBase, file);
      const remotePath = path.join(remoteBase, file);

      if (fs.existsSync(localPath)) {
        console.log(`  ↑ ${file}`);

        if (fs.statSync(localPath).isDirectory()) {
          await client.uploadFromDir(localPath, remotePath);
        } else {
          await client.uploadFrom(localPath, remotePath);
        }
      }
    }

    console.log('✅ WordPress uploaded successfully');
    console.log('⚠️  .htaccess NOT modified (frontend safe)');
    console.log('⚠️  index.html NOT modified (React safe)');

    client.close();
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

deploySafe();
```

**Ejecutar:**
```bash
node scripts/deploy-wordpress-safe.js
```

**Validación:**
- [ ] wp-admin/ subido
- [ ] wp-includes/ subido
- [ ] wp-content/ subido
- [ ] wp-config.php subido
- [ ] .htaccess **NO modificado** ✅
- [ ] index.html **NO modificado** ✅

**Test Crítico:**
```bash
# Frontend DEBE seguir funcionando
curl -I https://productos.prilabsa.com/productos
# Expected: HTTP 200

curl -sL https://productos.prilabsa.com/productos | grep -o '<html[^>]*lang="es"'
# Expected: <html lang="es">
```

**Rollback:**
Si frontend falla:
```bash
# Eliminar archivos WordPress subidos
node scripts/cleanup-wordpress-files.js
```

---

### **FASE 3: VALIDAR COEXISTENCIA** ⏱ 5 min

#### 3.1 Verificar Frontend Funcional

**Tests:**
```bash
# 1. Home redirect
curl -I https://productos.prilabsa.com/
# Expected: HTTP 301 → /productos

# 2. Página productos
curl -I https://productos.prilabsa.com/productos
# Expected: HTTP 200

# 3. Assets loading
curl -I https://productos.prilabsa.com/assets/index-BWNJVzSa.js
# Expected: HTTP 200

# 4. Logos
curl -I https://productos.prilabsa.com/images/logos/prilabsa-logo.png
# Expected: HTTP 200
```

**Validación:**
- [ ] Frontend accesible en navegador
- [ ] Rutas React funcionando (/productos, /nosotros, /contacto)
- [ ] Assets cargando
- [ ] Sin errores 404 en consola

**Si falla:** STOP → Rollback Fase 2

---

#### 3.2 Intentar Acceder a WordPress Install

```bash
# Intentar acceder a instalación WordPress
curl -I https://productos.prilabsa.com/wp-admin/install.php
```

**Resultado Esperado:**
- **Escenario A:** HTTP 200 (WordPress accesible) ✅
- **Escenario B:** HTTP 404 (bloqueado por .htaccess actual) ⚠️

**Si Escenario B:** WordPress instalado pero no accesible por routing. Continuar a FASE 4.

---

### **FASE 4: INSTALACIÓN WORDPRESS** ⏱ 10 min

#### 4.1 Modificar .htaccess Temporalmente (Solo wp-admin)

**Estrategia:** Agregar regla ANTES de React routing para permitir wp-admin

**Archivo:** `.htaccess` (modificación mínima)

```apache
Options -MultiViews
RewriteEngine On
RewriteBase /

# NUEVA REGLA: Allow WordPress Admin (AÑADIR AL INICIO)
RewriteCond %{REQUEST_URI} ^/wp-admin [OR]
RewriteCond %{REQUEST_URI} ^/wp-login\.php [OR]
RewriteCond %{REQUEST_URI} ^/wp-json
RewriteRule ^ - [L]

# Security headers (PRESERVAR)
<IfModule mod_headers.c>
    Header set X-Content-Type-Options nosniff
    Header set X-Frame-Options DENY
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Gzip compression (PRESERVAR)
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json
</IfModule>

# React Router (PRESERVAR)
RewriteCond %{REQUEST_URI} \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|pdf|mp4|webm)$ [OR]
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Everything else goes to React (PRESERVAR)
RewriteRule ^ index.html [L]
```

**Script de deployment:**
```bash
node scripts/update-htaccess-hybrid.js
```

**Validación POST-UPDATE:**
```bash
# 1. Frontend sigue funcionando
curl -I https://productos.prilabsa.com/productos
# Expected: HTTP 200

# 2. WordPress install accesible
curl -I https://productos.prilabsa.com/wp-admin/install.php
# Expected: HTTP 200 o HTTP 302 (redirect al wizard)

# 3. wp-json endpoint
curl -I https://productos.prilabsa.com/wp-json/
# Expected: HTTP 200
```

**Si falla frontend:** ROLLBACK INMEDIATO
```bash
# Restaurar .htaccess original
node scripts/restore-htaccess-backup.js
```

---

#### 4.2 Completar WordPress Installation Wizard

**Acciones:**
1. Navegar a: https://productos.prilabsa.com/wp-admin/install.php
2. Completar wizard:
   - **Site Title:** Prilabsa Products API
   - **Username:** admin_prilabsa
   - **Password:** (generar fuerte, guardar en 1Password)
   - **Email:** admin@prilabsa.com
   - **Search Engine Visibility:** ☑ Discourage search engines (headless)
3. Click "Install WordPress"
4. Login con credenciales

**Validación:**
- [ ] Instalación completa sin errores
- [ ] Login a wp-admin exitoso
- [ ] Dashboard WordPress visible

---

### **FASE 5: INSTALAR PLUGINS Y CONFIGURAR** ⏱ 15 min

#### 5.1 Instalar Plugins Esenciales

**Vía WP Admin → Plugins → Add New:**

1. **Advanced Custom Fields (ACF)**
   - Search: "Advanced Custom Fields"
   - Install + Activate
   - ✅ Version: 6.3+

2. **ACF to REST API**
   - Search: "ACF to REST API"
   - Install + Activate
   - ✅ Version: 3.6+

**Validación:**
- [ ] ACF instalado y activo
- [ ] ACF to REST API instalado y activo
- [ ] No hay conflictos/errores

---

#### 5.2 Verificar REST API Funcionando

```bash
# Test REST API root
curl https://productos.prilabsa.com/wp-json/

# Expected JSON:
{
  "name": "Prilabsa Products API",
  "description": "Just another WordPress site",
  "url": "https://productos.prilabsa.com",
  "home": "https://productos.prilabsa.com",
  "namespaces": [
    "oembed/1.0",
    "acf/v3",
    "wp/v2"
  ]
}
```

**Validación:**
- [ ] `/wp-json/` responde JSON válido
- [ ] Namespace `wp/v2` presente
- [ ] Namespace `acf/v3` presente (ACF to REST API activo)

---

### **FASE 6: VALIDACIÓN FINAL** ⏱ 10 min

#### 6.1 Test Suite Completo

**Frontend React:**
```bash
# Test deployment suite existente
npm run test:deployment
```

**WordPress API:**
```bash
# Posts endpoint
curl https://productos.prilabsa.com/wp-json/wp/v2/posts
# Expected: [] (empty array, no posts yet)

# Pages endpoint
curl https://productos.prilabsa.com/wp-json/wp/v2/pages
# Expected: [] (empty array)

# ACF endpoints (después de configurar CPT)
curl https://productos.prilabsa.com/wp-json/wp/v2/productos
# Expected: 404 (CPT no creado aún - normal)
```

**Checklist Final:**
- [ ] Frontend accesible: ✅ https://productos.prilabsa.com/productos
- [ ] WordPress admin: ✅ https://productos.prilabsa.com/wp-admin
- [ ] REST API: ✅ https://productos.prilabsa.com/wp-json/
- [ ] Plugins instalados: ✅ ACF + ACF to REST API
- [ ] Sin errores en logs
- [ ] Sin downtime reportado

---

## 🔄 ROLLBACK PROCEDURES

### Rollback Total (Emergency)

```bash
# 1. Restaurar backup completo
node scripts/restore-from-backup.js --backup=godaddy-YYYYMMDD-HHMMSS

# 2. Verificar frontend
curl -I https://productos.prilabsa.com/productos
# Expected: HTTP 200

# 3. Eliminar archivos WordPress
rm -rf /public_html/productos.prilabsa.com/wp-*
```

### Rollback .htaccess Only

```bash
# Restaurar solo .htaccess
node scripts/restore-htaccess-backup.js

# Verificar
curl -I https://productos.prilabsa.com/productos
```

---

## 📊 MÉTRICAS DE ÉXITO

```
✅ Uptime Frontend:           100% (0 downtime)
✅ WordPress Instalado:        ✓
✅ Plugins Activos:            2/2 (ACF + ACF to REST API)
✅ REST API Funcional:         ✓ /wp-json/ responde
✅ Frontend No Alterado:       ✓ Tests passing
✅ Tiempo Total:               ~90 min
```

---

## ⚠️ NOTAS CRÍTICAS

### DO NOT
- ❌ Modificar .htaccess sin backup
- ❌ Borrar index.html
- ❌ Borrar carpeta assets/
- ❌ Subir archivos sin validar coexistencia
- ❌ Hacer cambios directos en producción sin plan

### ALWAYS
- ✅ Backup antes de cada fase
- ✅ Validar frontend después de cada cambio
- ✅ Tener rollback script ready
- ✅ Probar en staging primero (si disponible)
- ✅ Monitorear logs durante deployment

---

## 📞 PRÓXIMOS PASOS (POST-INSTALACIÓN)

**FASE B - Configuración WordPress (Siguiente Sesión):**
1. Crear Custom Post Type "productos"
2. Configurar ACF fields (9 campos)
3. Crear taxonomías (categorías_productos)
4. Importar 105 productos desde local
5. Importar Blog y Noticias
6. Configurar permisos y seguridad
7. Conectar frontend React con API

**Tiempo estimado:** 3-4 horas
**Riesgo:** 🟢 Bajo (WordPress ya instalado y funcional)

---

**Plan creado:** 2025-11-24
**Metodología:** SOLARIA Zero-Downtime Deployment
**Validado por:** ECO + DELTA (DevOps)
**Aprobación requerida:** CTO

---

## ✅ PRE-FLIGHT CHECKLIST

Antes de ejecutar, verificar:

- [ ] Backup tools ready (`scripts/backup-godaddy-full.js`)
- [ ] FTP credentials válidas (`.ftpconfig.json`)
- [ ] Credenciales MySQL GoDaddy obtenidas
- [ ] WordPress 6.6.2 descargado
- [ ] wp-config.php preparado con keys únicas
- [ ] Rollback scripts tested
- [ ] Monitoreo activo durante deployment
- [ ] CTO aprueba el plan

**Aprobación CTO:** ________________
**Fecha inicio:** ________________
**Responsable ejecución:** ________________
