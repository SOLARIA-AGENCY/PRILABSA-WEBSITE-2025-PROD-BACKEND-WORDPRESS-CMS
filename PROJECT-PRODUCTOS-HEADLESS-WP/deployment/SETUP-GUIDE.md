# 🚀 GUÍA DE SETUP LOCAL - PRILABSA WORDPRESS HEADLESS

**Fase**: 1 - Setup Local WordPress Headless
**Agentes**: DELTA (DevOps) + SIGMA (Backend)
**Duración Estimada**: 2-4 horas
**Fecha**: 2025-11-04

---

## 📋 PRE-REQUISITOS

Antes de comenzar, asegúrate de tener:

### Opción A: XAMPP (Recomendado para principiantes)
- [ ] XAMPP 8.2+ instalado
  - macOS: https://sourceforge.net/projects/xampp/files/XAMPP%20Mac%20OS%20X/
  - Windows: https://www.apachefriends.org/download.html
  - Linux: https://www.apachefriends.org/download.html

### Opción B: Docker (Recomendado para developers)
- [ ] Docker Desktop instalado: https://www.docker.com/get-started
- [ ] Docker Compose instalado (incluido en Docker Desktop)

### Herramientas Adicionales
- [ ] cURL (para testing APIs)
- [ ] Postman (opcional, para testing REST API)
- [ ] Git (para clonar repositorio)

---

## 🎯 OPCIÓN 1: SETUP CON XAMPP (AUTOMÁTICO)

### Paso 1: Ejecutar Script de Setup

```bash
# Navegar al directorio del proyecto
cd PROJECT-PRODUCTOS-HEADLESS-WP/deployment/

# Ejecutar script de setup
./local-setup.sh
```

El script automáticamente:
- ✅ Detecta tu sistema operativo
- ✅ Verifica instalación XAMPP
- ✅ Descarga WordPress 6.6+
- ✅ Crea base de datos MySQL
- ✅ Configura wp-config.php
- ✅ Configura CORS para localhost:5173
- ✅ Genera archivo .env.local

### Paso 2: Completar Instalación WordPress

1. **Abrir navegador**: http://localhost/prilabsa-local/

2. **Si aparece wizard de instalación**:
   - Site Title: `PRILABSA Local Dev`
   - Username: `admin_local`
   - Password: (crear password seguro)
   - Email: `dev@prilabsa.local`
   - Click: "Install WordPress"

3. **Login al admin**: http://localhost/prilabsa-local/wp-admin/
   - Username: `admin_local`
   - Password: (el que creaste)

### Paso 3: Instalar Plugins

En WP Admin, ir a **Plugins → Add New**:

1. **Advanced Custom Fields (ACF)**
   - Search: "Advanced Custom Fields"
   - Install + Activate

2. **ACF to REST API**
   - Search: "ACF to REST API"
   - Install + Activate

3. **JWT Authentication**
   - Search: "JWT Authentication for WP REST API"
   - Install + Activate

4. **CORS Plugin** (opcional si .htaccess no funciona)
   - Search: "WP CORS"
   - Install + Activate

### Paso 4: Verificar Instalación

**Test 1: Admin accesible**
```
URL: http://localhost/prilabsa-local/wp-admin/
Expected: Dashboard visible
```

**Test 2: REST API funcional**
```bash
curl http://localhost/prilabsa-local/wp-json/
# Expected: JSON con rutas disponibles
```

**Test 3: CORS configurado**
```bash
curl -I http://localhost/prilabsa-local/wp-json/ -H "Origin: http://localhost:5173"
# Expected: Access-Control-Allow-Origin: http://localhost:5173
```

---

## 🐳 OPCIÓN 2: SETUP CON DOCKER

### Paso 1: Iniciar Servicios Docker

```bash
# Navegar al directorio deployment
cd PROJECT-PRODUCTOS-HEADLESS-WP/deployment/

# Iniciar servicios
docker-compose up -d

# Verificar servicios corriendo
docker-compose ps
```

**Servicios disponibles**:
- WordPress: http://localhost:8080
- phpMyAdmin: http://localhost:8081
- MySQL: localhost:3306

### Paso 2: Instalar WordPress via WP-CLI

```bash
# Instalar WordPress
docker-compose exec wpcli wp core install \
  --url="http://localhost:8080" \
  --title="PRILABSA Local Dev" \
  --admin_user="admin_local" \
  --admin_password="SecurePassword2025!" \
  --admin_email="dev@prilabsa.local"

# Verificar instalación
docker-compose exec wpcli wp core version
```

### Paso 3: Instalar Plugins via WP-CLI

```bash
# ACF
docker-compose exec wpcli wp plugin install advanced-custom-fields --activate

# ACF to REST API
docker-compose exec wpcli wp plugin install acf-to-rest-api --activate

# JWT Authentication
docker-compose exec wpcli wp plugin install jwt-authentication-for-wp-rest-api --activate

# Verificar plugins
docker-compose exec wpcli wp plugin list
```

### Paso 4: Verificar Instalación

**Test 1: WordPress accesible**
```
URL: http://localhost:8080
Expected: WordPress homepage
```

**Test 2: Admin panel**
```
URL: http://localhost:8080/wp-admin/
Username: admin_local
Password: SecurePassword2025!
```

**Test 3: REST API**
```bash
curl http://localhost:8080/wp-json/
# Expected: JSON response
```

---

## 🔧 CONFIGURACIÓN MANUAL (Si scripts fallan)

### Paso 1: Crear Base de Datos

**Via phpMyAdmin** (http://localhost/phpmyadmin/):

1. Click "New" en sidebar izquierdo
2. Database name: `prilabsa_wp_local`
3. Collation: `utf8mb4_unicode_ci`
4. Click "Create"

5. Tab "SQL", ejecutar:
```sql
CREATE USER 'wp_user'@'localhost' IDENTIFIED BY 'wp_strong_password_2025!';
GRANT ALL PRIVILEGES ON prilabsa_wp_local.* TO 'wp_user'@'localhost';
FLUSH PRIVILEGES;
```

### Paso 2: Configurar wp-config.php

Copiar template:
```bash
cp deployment/wp-config-template.php /path/to/htdocs/prilabsa-local/wp-config.php
```

Editar valores:
```php
define('DB_NAME', 'prilabsa_wp_local');
define('DB_USER', 'wp_user');
define('DB_PASSWORD', 'wp_strong_password_2025!');
define('DB_HOST', 'localhost');
```

Generar security keys:
1. Visitar: https://api.wordpress.org/secret-key/1.1/salt/
2. Copiar output
3. Reemplazar en wp-config.php

### Paso 3: Configurar CORS

Editar `.htaccess` en raíz WordPress:

```apache
# CORS Configuration
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "http://localhost:5173"
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
    Header set Access-Control-Allow-Credentials "true"
</IfModule>
```

O agregar a `functions.php` del tema:

```php
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: http://localhost:5173');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
        header('Access-Control-Allow-Credentials: true');
        return $value;
    });
}, 15);
```

---

## 🧪 TESTING Y VALIDACIÓN

### Test Suite Básico

**1. Test Admin Access**
```
URL: http://localhost/prilabsa-local/wp-admin/
Status: ✅ Accesible
Login: ✅ Funcional
```

**2. Test REST API Root**
```bash
curl http://localhost/prilabsa-local/wp-json/

# Expected output:
{
  "name": "PRILABSA Local Dev",
  "description": "Just another WordPress site",
  "url": "http://localhost/prilabsa-local",
  "home": "http://localhost/prilabsa-local",
  "namespaces": ["oembed/1.0", "wp/v2", "jwt-auth/v1"]
}
```

**3. Test Posts Endpoint**
```bash
curl http://localhost/prilabsa-local/wp-json/wp/v2/posts

# Expected: Array (puede estar vacío)
[]
```

**4. Test CORS Headers**
```bash
curl -I -X OPTIONS http://localhost/prilabsa-local/wp-json/ \
  -H "Origin: http://localhost:5173"

# Expected headers:
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE
```

**5. Test JWT Token Generation**
```bash
curl -X POST http://localhost/prilabsa-local/wp-json/jwt-auth/v1/token \
  -H "Content-Type: application/json" \
  -d '{"username":"admin_local","password":"your_password"}'

# Expected:
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user_email": "dev@prilabsa.local",
  "user_nicename": "admin_local"
}
```

---

## 🐛 TROUBLESHOOTING

### Problema: Apache no inicia (XAMPP)

**Síntoma**: Error "Port 80 already in use"

**Solución**:
1. Verificar qué usa puerto 80:
   ```bash
   # macOS/Linux
   sudo lsof -i :80

   # Windows
   netstat -ano | findstr :80
   ```

2. Cambiar puerto Apache en XAMPP:
   - Editar: `/Applications/XAMPP/xamppfiles/etc/httpd.conf`
   - Cambiar `Listen 80` → `Listen 8080`
   - Reiniciar Apache

### Problema: MySQL no inicia

**Solución**:
1. Verificar logs: `/Applications/XAMPP/xamppfiles/logs/mysql_error.log`
2. Verificar permisos: `sudo chmod -R 777 /Applications/XAMPP/xamppfiles/var/mysql/`
3. Reinstalar XAMPP si persiste

### Problema: CORS no funciona

**Solución**:
1. Verificar módulo headers activo:
   ```bash
   # En httpd.conf buscar:
   LoadModule headers_module modules/mod_headers.so
   # Asegurar NO esté comentado (#)
   ```

2. Alternative: Usar plugin "WP CORS" desde WordPress admin

3. Alternative: Configurar via functions.php (ver arriba)

### Problema: Plugins no instalan

**Solución manual**:
1. Download .zip desde https://wordpress.org/plugins/
2. WP Admin → Plugins → Add New → Upload Plugin
3. Select .zip → Install Now → Activate

---

## 📁 ARCHIVOS GENERADOS

Después del setup, deberías tener:

```
/Applications/XAMPP/xamppfiles/htdocs/prilabsa-local/
├── wp-admin/
├── wp-content/
│   ├── plugins/
│   │   ├── advanced-custom-fields/
│   │   ├── acf-to-rest-api/
│   │   └── jwt-authentication-for-wp-rest-api/
│   └── themes/
├── wp-includes/
├── .htaccess              # Con CORS configurado
├── wp-config.php          # Con DB credentials + JWT
└── index.php

PROJECT-PRODUCTOS-HEADLESS-WP/
├── .env.local             # Credenciales (NOT IN GIT)
└── deployment/
    ├── local-setup.sh     # Script automatizado
    ├── docker-compose.yml # Docker alternativo
    └── SETUP-GUIDE.md     # Esta guía
```

---

## ✅ CHECKLIST FINAL

Antes de considerar Fase 1 completada:

- [ ] WordPress 6.6+ instalado y accesible
- [ ] Base de datos `prilabsa_wp_local` creada
- [ ] Admin panel funcional (http://localhost/prilabsa-local/wp-admin/)
- [ ] ACF plugin instalado y activado
- [ ] ACF to REST API plugin instalado y activado
- [ ] JWT Authentication plugin instalado y activado
- [ ] CORS configurado (headers presentes en responses)
- [ ] REST API accesible (/wp-json/ responde)
- [ ] JWT token puede generarse
- [ ] Archivo .env.local creado con credenciales

---

## 📞 PRÓXIMOS PASOS

Una vez completada Fase 1:

1. **Notificar a ECO**: Fase 1 completa
2. **Session Summary**: ECO generará resumen
3. **Handoff a AGENT SIGMA**: Fase 2 - Backend Configuration
4. **Fase 2**: Crear Custom Post Type "productos" + ACF fields

---

## 📚 RECURSOS ÚTILES

- WordPress Docs: https://developer.wordpress.org/
- ACF Docs: https://www.advancedcustomfields.com/resources/
- REST API Handbook: https://developer.wordpress.org/rest-api/
- JWT Plugin: https://github.com/usefulteam/jwt-auth
- XAMPP Docs: https://www.apachefriends.org/faq.html
- Docker Compose: https://docs.docker.com/compose/

---

**Generado por**: AGENT DELTA (DevOps)
**Fecha**: 2025-11-04
**Metodología**: SOLARIA Agency
**Fase**: 1/8 - Setup Local WordPress Headless
