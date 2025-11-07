# PHASE 1: Setup Local WordPress Headless

**Fase**: 1 de 8
**Nombre**: Setup Local WordPress Headless
**Duración Estimada**: 1 semana (5-7 días hábiles)
**Agentes Lead**: SIGMA (Backend) + DELTA (DevOps)
**Status**: 🔄 IN PROGRESS (5%)
**Fecha Inicio**: 2025-11-04
**ETA Completion**: 2025-11-11

---

## 🎯 OBJETIVOS DE FASE

### Objetivo Principal
Establecer entorno de desarrollo local funcional con WordPress 6.6+ headless, plugins necesarios instalados, y preparado para configuración backend en Fase 2.

### Objetivos Específicos
1. ✅ Instalar entorno LAMP local (XAMPP recomendado, Docker alternativo)
2. ✅ Instalar WordPress 6.6+ en entorno local
3. ✅ Configurar plugins gratuitos necesarios (ACF, JWT Auth, CORS)
4. ✅ Migrar contenido existente de productos.prilabsa.com (páginas actuales)
5. ✅ Configurar CORS para desarrollo (permitir localhost:5173)
6. ✅ Validar acceso WordPress admin y REST API funcional

---

## 📋 TAREAS DETALLADAS

### Tarea 1: Instalación XAMPP (AGENT DELTA)
**Duración**: 1-2 horas
**Prioridad**: P0 (Critical)

#### Pasos
1. **Download XAMPP 8.2+**:
   ```bash
   # macOS
   curl -O https://sourceforge.net/projects/xampp/files/XAMPP%20Mac%20OS%20X/8.2.12/xampp-osx-8.2.12-0-installer.dmg

   # Windows
   # Download from https://www.apachefriends.org/download.html
   ```

2. **Instalar XAMPP**:
   - macOS: Montar DMG, arrastrar a Applications
   - Windows: Ejecutar instalador, seguir wizard
   - Componentes necesarios: Apache, MySQL, PHP

3. **Iniciar servicios**:
   ```bash
   # macOS
   sudo /Applications/XAMPP/xamppfiles/xampp start

   # Windows (XAMPP Control Panel)
   # Start Apache
   # Start MySQL
   ```

4. **Verificar instalación**:
   - Navegar a: http://localhost/
   - Expected: XAMPP welcome page
   - Verificar: http://localhost/phpmyadmin/
   - Expected: phpMyAdmin dashboard

#### Criterios de Aceptación
- [ ] Apache corriendo en puerto 80
- [ ] MySQL corriendo en puerto 3306
- [ ] PHP 8.2+ disponible
- [ ] phpMyAdmin accesible

---

### Tarea 2: Crear Base de Datos MySQL (AGENT DELTA)
**Duración**: 15 minutos
**Prioridad**: P0 (Critical)

#### Pasos
1. **Acceder phpMyAdmin**: http://localhost/phpmyadmin/
2. **Crear base de datos**:
   ```sql
   CREATE DATABASE prilabsa_wp_local
   CHARACTER SET utf8mb4
   COLLATE utf8mb4_unicode_ci;
   ```

3. **Crear usuario WordPress**:
   ```sql
   CREATE USER 'wp_user'@'localhost' IDENTIFIED BY 'wp_strong_password_2025!';
   GRANT ALL PRIVILEGES ON prilabsa_wp_local.* TO 'wp_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

#### Criterios de Aceptación
- [ ] Base de datos `prilabsa_wp_local` creada
- [ ] Usuario `wp_user` con permisos completos
- [ ] Charset UTF-8MB4 configurado

---

### Tarea 3: Instalar WordPress 6.6+ (AGENT SIGMA)
**Duración**: 30-45 minutos
**Prioridad**: P0 (Critical)

#### Pasos
1. **Download WordPress latest**:
   ```bash
   cd /Applications/XAMPP/xamppfiles/htdocs/
   # o en Windows: C:\xampp\htdocs\

   curl -O https://wordpress.org/latest.tar.gz
   tar -xzf latest.tar.gz
   mv wordpress prilabsa-local
   ```

2. **Configurar wp-config.php**:
   ```bash
   cd prilabsa-local
   cp wp-config-sample.php wp-config.php
   nano wp-config.php
   ```

   Actualizar:
   ```php
   define('DB_NAME', 'prilabsa_wp_local');
   define('DB_USER', 'wp_user');
   define('DB_PASSWORD', 'wp_strong_password_2025!');
   define('DB_HOST', 'localhost');
   define('DB_CHARSET', 'utf8mb4');
   define('DB_COLLATE', 'utf8mb4_unicode_ci');

   // Security keys (generar en https://api.wordpress.org/secret-key/1.1/salt/)
   define('AUTH_KEY', '...');
   // ... resto de keys
   ```

3. **Instalar WordPress via navegador**:
   - Navegar a: http://localhost/prilabsa-local/
   - Seguir wizard instalación:
     - Site Title: "PRILABSA Local Dev"
     - Username: admin_local
     - Password: (strong password)
     - Email: dev@prilabsa.local

4. **Completar instalación**:
   - Clic "Install WordPress"
   - Login a admin: http://localhost/prilabsa-local/wp-admin/

#### Criterios de Aceptación
- [ ] WordPress 6.6+ instalado
- [ ] Admin accesible (http://localhost/prilabsa-local/wp-admin/)
- [ ] Database conectada correctamente
- [ ] Login funcional con credenciales admin

---

### Tarea 4: Instalar Plugins Necesarios (AGENT SIGMA)
**Duración**: 30 minutos
**Prioridad**: P0 (Critical)

#### Plugins a Instalar (Todos Gratuitos)

1. **Advanced Custom Fields (ACF) 6.3+**:
   ```
   WP Admin → Plugins → Add New
   Search: "Advanced Custom Fields"
   Install + Activate
   ```

2. **ACF to REST API**:
   ```
   Search: "ACF to REST API"
   Install + Activate
   ```

3. **JWT Authentication for WP REST API**:
   ```
   Search: "JWT Authentication for WP REST API"
   Install + Activate
   ```

4. **WP REST API Controller**:
   ```
   Search: "WP REST API Controller" (opcional, para mejor control)
   Install + Activate
   ```

5. **Enable CORS** (vía plugin o .htaccess):
   ```
   Search: "WP CORS"
   Install + Activate
   O configurar manualmente en .htaccess (ver Tarea 6)
   ```

#### Criterios de Aceptación
- [ ] ACF 6.3+ instalado y activado
- [ ] ACF to REST API activo
- [ ] JWT Authentication activo
- [ ] CORS plugin activo (o .htaccess configurado)

---

### Tarea 5: Configurar JWT Authentication (AGENT OMEGA)
**Duración**: 20 minutos
**Prioridad**: P1 (High)

#### Pasos
1. **Editar wp-config.php**:
   ```php
   // Agregar antes de "That's all, stop editing!"
   define('JWT_AUTH_SECRET_KEY', 'your-top-secret-key-here-change-this');
   define('JWT_AUTH_CORS_ENABLE', true);
   ```

2. **Configurar .htaccess**:
   ```apache
   # Agregar al inicio de .htaccess
   RewriteEngine On
   RewriteCond %{HTTP:Authorization} ^(.*)
   RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]

   SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
   ```

3. **Test JWT token**:
   ```bash
   # Obtener token
   curl -X POST http://localhost/prilabsa-local/wp-json/jwt-auth/v1/token \
     -H "Content-Type: application/json" \
     -d '{"username":"admin_local","password":"your_password"}'

   # Expected: {"token":"eyJ0eXAiOiJKV1QiLCJhbGc..."}
   ```

#### Criterios de Aceptación
- [ ] JWT_AUTH_SECRET_KEY configurado
- [ ] Endpoint `/wp-json/jwt-auth/v1/token` responde
- [ ] Token generado correctamente

---

### Tarea 6: Configurar CORS para Desarrollo Local (AGENT DELTA)
**Duración**: 15 minutos
**Prioridad**: P0 (Critical)

#### Pasos
1. **Editar .htaccess** en raíz WordPress:
   ```apache
   # CORS Configuration for Local Development
   <IfModule mod_headers.c>
       # Allow requests from Vite dev server
       Header set Access-Control-Allow-Origin "http://localhost:5173"
       Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"
       Header set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With"
       Header set Access-Control-Allow-Credentials "true"

       # Handle preflight requests
       RewriteEngine On
       RewriteCond %{REQUEST_METHOD} OPTIONS
       RewriteRule ^(.*)$ $1 [R=200,L]
   </IfModule>
   ```

2. **Alternative: functions.php** (si .htaccess no funciona):
   ```php
   add_action('rest_api_init', function() {
       remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
       add_filter('rest_pre_serve_request', function($value) {
           header('Access-Control-Allow-Origin: http://localhost:5173');
           header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
           header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
           header('Access-Control-Allow-Credentials: true');
           return $value;
       });
   }, 15);
   ```

3. **Test CORS**:
   ```bash
   curl -I -X OPTIONS http://localhost/prilabsa-local/wp-json/wp/v2/ \
     -H "Origin: http://localhost:5173"

   # Expected headers:
   # Access-Control-Allow-Origin: http://localhost:5173
   # Access-Control-Allow-Methods: GET, POST, OPTIONS...
   ```

#### Criterios de Aceptación
- [ ] CORS headers configurados
- [ ] OPTIONS requests responden 200
- [ ] Origin localhost:5173 permitido

---

### Tarea 7: Migrar Contenido Existente (AGENT SIGMA)
**Duración**: 1-2 horas
**Prioridad**: P1 (High)

#### Pasos
1. **Export contenido de productos.prilabsa.com**:
   - Login a productos.prilabsa.com/wp-admin/
   - Tools → Export
   - Select: All content (posts, pages, media)
   - Download export.xml

2. **Import a WordPress local**:
   - WP Admin local → Tools → Import
   - Install "WordPress Importer" plugin
   - Run Importer
   - Upload export.xml
   - Check "Download and import file attachments"
   - Assign authors (o crear usuarios)
   - Run import

3. **Verificar contenido migrado**:
   - Pages: Verificar páginas existentes aparecen
   - Media: Verificar imágenes importadas
   - Settings: Verificar permalinks (Settings → Permalinks)

#### Criterios de Aceptación
- [ ] Contenido existente importado (páginas)
- [ ] Media/imágenes importadas
- [ ] 0 errores de importación
- [ ] Contenido visible en local

---

### Tarea 8: Validación y Testing (AGENT PSI)
**Duración**: 30 minutos
**Prioridad**: P0 (Critical)

#### Tests a Ejecutar

1. **Test Admin Access**:
   - URL: http://localhost/prilabsa-local/wp-admin/
   - Expected: Dashboard accesible
   - Login funcional

2. **Test REST API**:
   ```bash
   # Test API root
   curl http://localhost/prilabsa-local/wp-json/
   # Expected: JSON con rutas disponibles

   # Test posts endpoint
   curl http://localhost/prilabsa-local/wp-json/wp/v2/posts
   # Expected: Array de posts (puede estar vacío)

   # Test pages endpoint
   curl http://localhost/prilabsa-local/wp-json/wp/v2/pages
   # Expected: Array de páginas
   ```

3. **Test ACF Plugin**:
   - WP Admin → Custom Fields
   - Expected: ACF interface visible
   - Create test field group (temporal)

4. **Test CORS**:
   ```bash
   curl -I http://localhost/prilabsa-local/wp-json/wp/v2/ \
     -H "Origin: http://localhost:5173"
   # Expected: Access-Control-Allow-Origin header presente
   ```

5. **Test Database Connection**:
   - phpMyAdmin → prilabsa_wp_local
   - Verificar tablas WP creadas (wp_posts, wp_options, etc.)

#### Criterios de Aceptación
- [ ] Admin dashboard accesible
- [ ] REST API responde correctamente
- [ ] ACF plugin funcional
- [ ] CORS headers presentes
- [ ] Database poblada con tablas WP

---

## 📊 ENTREGABLES DE FASE

### Entregables Técnicos
1. ✅ WordPress 6.6+ local funcional en http://localhost/prilabsa-local/
2. ✅ Base de datos MySQL `prilabsa_wp_local` poblada
3. ✅ Plugins instalados: ACF, JWT Auth, ACF to REST API, CORS
4. ✅ Contenido existente migrado (páginas del subdominio)
5. ✅ CORS configurado para localhost:5173
6. ✅ REST API `/wp-json/` accesible y respondiendo

### Entregables de Documentación
1. ✅ Credenciales guardadas en documentación (no en repo)
2. ✅ Script de setup automatizado (`deployment/local-setup.sh`)
3. ✅ Postman collection básica para testing API
4. ✅ Session summary Fase 1

---

## 🎯 CRITERIOS DE ÉXITO

### Technical Success Criteria
```
✅ WordPress local accesible:              http://localhost/prilabsa-local/
✅ Admin login funcional:                  username/password work
✅ REST API respondiendo:                  /wp-json/ returns JSON
✅ Plugins instalados y activos:           4/4 plugins active
✅ CORS configurado:                       localhost:5173 allowed
✅ Database conectada:                     0 connection errors
✅ Contenido migrado:                      Páginas existentes presentes
```

### Quality Metrics
```
⏱️ Setup time:                            <4 horas (target: 2-3 horas)
🐛 Errors during setup:                   0 critical errors
📊 Completion:                            100% tareas completadas
```

---

## ⚠️ RIESGOS Y MITIGACIONES

| Riesgo | Probabilidad | Impact | Mitigación |
|--------|--------------|--------|------------|
| XAMPP instalación falla | Baja | Alto | Fallback a Docker (docker-compose.yml preparado) |
| Plugin ACF no instala | Baja | Crítico | Download manual .zip desde wordpress.org/plugins/ |
| CORS no funciona | Media | Alto | Configurar vía functions.php como fallback |
| Puerto 80 ocupado | Media | Medio | Cambiar Apache a puerto 8080 en XAMPP config |
| MySQL no inicia | Baja | Alto | Verificar permisos, reinstalar XAMPP, usar Docker |
| Importación contenido falla | Baja | Medio | Importación manual página por página |

---

## 📂 ARCHIVOS GENERADOS EN FASE

### Scripts
- `deployment/local-setup.sh` - Script automatizado setup XAMPP + WP
- `deployment/wp-config-local.php` - Template wp-config para local
- `deployment/htaccess-local` - Template .htaccess con CORS

### Configuración
- `PROJECT-PRODUCTOS-HEADLESS-WP/.env.local` - Credenciales locales (gitignored)
  ```env
  WP_LOCAL_URL=http://localhost/prilabsa-local
  WP_DB_NAME=prilabsa_wp_local
  WP_DB_USER=wp_user
  WP_DB_PASSWORD=wp_strong_password_2025!
  WP_ADMIN_USER=admin_local
  WP_ADMIN_PASSWORD=[secure_password]
  JWT_SECRET_KEY=[generated_key]
  ```

### Testing
- `testing/postman/phase1-basic-api-tests.postman_collection.json`
  - GET /wp-json/
  - GET /wp-json/wp/v2/posts
  - GET /wp-json/wp/v2/pages
  - POST /wp-json/jwt-auth/v1/token

---

## 🔄 HANDOFF A FASE 2

### Prerequisitos para Fase 2
- [x] WordPress local funcional y validado
- [x] Plugins necesarios instalados
- [x] REST API accesible
- [x] AGENT SIGMA recibe control para backend config

### Lo que SIGMA recibirá:
1. WordPress admin credentials
2. Database credentials
3. REST API base URL: http://localhost/prilabsa-local/wp-json/
4. Postman collection para testing

### Próximo Objetivo (Fase 2):
Configurar Custom Post Type "productos" con 9 campos ACF y exponer via REST API.

---

## 📞 COMUNICACIÓN Y UPDATES

### Daily Updates (ECO)
- Actualizar PHASE_STATUS.md con progreso (%)
- Documentar blockers si aparecen
- Update learning log si lecciones nuevas

### Reportar a CTO
- Notificar cuando Fase 1 complete (100%)
- Session summary generado
- Solicitar aprobación para Fase 2

---

## 🎓 LECCIONES ESPERADAS

### Patterns to Validate
- Local dev setup time (XAMPP vs Docker)
- Plugin installation challenges
- CORS configuration effectiveness

### Antipatterns to Watch
- Skip validation steps (test each component)
- No backup before changes (export/import issues)
- Assume plugins work without testing

---

**Status**: 🔄 IN PROGRESS (5%)
**Agentes Asignados**: SIGMA (Backend) + DELTA (DevOps)
**ETA Completion**: 2025-11-11
**Última Actualización**: 2025-11-04 19:15

---

*Generado por ECO (Engineering Coordination Officer)*
*Metodología: SOLARIA Agency*
