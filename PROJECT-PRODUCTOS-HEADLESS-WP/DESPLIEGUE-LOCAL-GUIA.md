# 🚀 GUÍA DESPLIEGUE LOCAL - STEP BY STEP

**Proyecto**: PRILABSA WordPress Headless
**Tiempo Total**: 15-30 minutos
**Última Actualización**: 2025-11-04

---

## ✅ PASO 1: VERIFICAR PREREQUISITES

### Opción A: Docker (Recomendado)

```bash
# Verificar Docker instalado
docker --version
docker-compose --version

# Expected output:
# Docker version 20.10+
# Docker Compose version 2.0+
```

✅ **Si Docker instalado** → Continuar a Paso 2A
❌ **Si no instalado** → Instalar: https://www.docker.com/get-started

---

### Opción B: XAMPP

```bash
# macOS
ls /Applications/XAMPP/xamppfiles/

# Linux
ls /opt/lampp/

# Windows
dir C:\xampp\
```

✅ **Si XAMPP instalado** → Continuar a Paso 2B
❌ **Si no instalado** → Instalar: https://www.apachefriends.org/

---

## 🐳 PASO 2A: DOCKER DEPLOYMENT (Recomendado)

### 2A.1: Copiar Configuración

```bash
# Navegar al directorio deployment
cd PROJECT-PRODUCTOS-HEADLESS-WP/deployment

# Copiar docker-compose enhanced
cp templates/docker-compose-enhanced.yml docker-compose.yml

# Copiar environment template
cp templates/env-template .env

# Editar .env (cambiar contraseñas)
nano .env  # o vim, code, etc.
```

**Cambiar en .env**:
- `MYSQL_ROOT_PASSWORD=` → password seguro
- `MYSQL_PASSWORD=` → password seguro
- `WORDPRESS_ADMIN_PASSWORD=` → password seguro
- `JWT_AUTH_SECRET_KEY=` → generar con: `openssl rand -base64 64`

---

### 2A.2: Iniciar Servicios

```bash
# Iniciar todos los servicios
docker-compose up -d

# Verificar servicios corriendo
docker-compose ps

# Expected output:
# NAME                          STATUS
# prilabsa-wordpress-local      Up (healthy)
# prilabsa-mysql-local          Up (healthy)
# prilabsa-redis-local          Up
# prilabsa-phpmyadmin           Up
# prilabsa-wpcli                Up
```

**Tiempo**: 2-3 minutos (primera vez, descarga imágenes)

---

### 2A.3: Esperar WordPress Ready

```bash
# Esperar a que WordPress esté listo
docker-compose logs -f wordpress

# Esperar mensaje: "Apache/2.4.x ... configured"
# Ctrl+C para salir de logs
```

**URLs Disponibles**:
- WordPress: http://localhost:8080
- phpMyAdmin: http://localhost:8081
- API: http://localhost:8080/wp-json/

---

### 2A.4: Instalar WordPress Core

```bash
# Instalar WordPress via WP-CLI
docker-compose exec wpcli wp core install \
  --url="http://localhost:8080" \
  --title="PRILABSA WordPress Headless" \
  --admin_user="admin_local" \
  --admin_password="SecurePass2025!" \
  --admin_email="dev@prilabsa.local" \
  --skip-email

# Verificar instalación
docker-compose exec wpcli wp core version

# Expected: WordPress 6.6.x
```

✅ **Validación**: Abrir http://localhost:8080 → Debe ver homepage WordPress

---

## 📦 PASO 3: INSTALAR PLUGINS

```bash
# Instalar ACF (Advanced Custom Fields)
docker-compose exec wpcli wp plugin install advanced-custom-fields --activate

# Instalar ACF to REST API
docker-compose exec wpcli wp plugin install acf-to-rest-api --activate

# Instalar JWT Authentication
docker-compose exec wpcli wp plugin install jwt-authentication-for-wp-rest-api --activate

# Verificar plugins activos
docker-compose exec wpcli wp plugin list

# Expected: 3 plugins con status "active"
```

✅ **Validación**: http://localhost:8080/wp-admin/plugins.php → 3 plugins activos

---

## 🔧 PASO 4: INSTALAR CÓDIGO CUSTOM PRILABSA

### 4.1: Crear Plugin PRILABSA

```bash
# Crear directorio plugin
docker-compose exec wordpress mkdir -p /var/www/html/wp-content/plugins/prilabsa

# Copiar archivos PHP al contenedor
docker cp ../wordpress-code/prilabsa-productos-cpt.php \
  prilabsa-wordpress-local:/var/www/html/wp-content/plugins/prilabsa/

docker cp ../wordpress-code/prilabsa-acf-config.php \
  prilabsa-wordpress-local:/var/www/html/wp-content/plugins/prilabsa/

docker cp ../wordpress-code/prilabsa-rest-api-custom.php \
  prilabsa-wordpress-local:/var/www/html/wp-content/plugins/prilabsa/

docker cp ../wordpress-code/prilabsa-import-products.php \
  prilabsa-wordpress-local:/var/www/html/wp-content/plugins/prilabsa/

# Crear plugin header file
docker-compose exec wordpress bash -c 'cat > /var/www/html/wp-content/plugins/prilabsa/prilabsa.php << "EOF"
<?php
/**
 * Plugin Name: PRILABSA WordPress Headless
 * Description: Custom Post Type, ACF Config, REST API for PRILABSA Products
 * Version: 1.0.0
 * Author: SOLARIA Agency
 */

// Load all modules
require_once __DIR__ . "/prilabsa-productos-cpt.php";
require_once __DIR__ . "/prilabsa-acf-config.php";
require_once __DIR__ . "/prilabsa-rest-api-custom.php";
// Note: import script loaded separately
EOF'
```

---

### 4.2: Activar Plugin

```bash
# Activar plugin PRILABSA
docker-compose exec wpcli wp plugin activate prilabsa

# Verificar activación
docker-compose exec wpcli wp plugin list | grep prilabsa

# Expected: prilabsa | active
```

---

### 4.3: Verificar Custom Post Type

```bash
# Listar post types
docker-compose exec wpcli wp post-type list

# Expected: debe aparecer "productos" en la lista
```

✅ **Validación**: http://localhost:8080/wp-admin/edit.php?post_type=productos → Ver admin productos

---

## ✅ PASO 5: VALIDAR REST API

### 5.1: Test API Root

```bash
# Test API root
curl http://localhost:8080/wp-json/

# Expected: JSON con namespaces ["wp/v2", "prilabsa/v1", "jwt-auth/v1"]
```

---

### 5.2: Test Productos Endpoint

```bash
# Test productos endpoint (vacío por ahora)
curl http://localhost:8080/wp-json/wp/v2/productos

# Expected: [] (array vacío - normal, aún no hay productos)
```

---

### 5.3: Test CORS Headers

```bash
# Test CORS
curl -I http://localhost:8080/wp-json/ -H "Origin: http://localhost:5173"

# Expected headers:
# Access-Control-Allow-Origin: http://localhost:5173
# Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE
```

---

### 5.4: Test JWT Token

```bash
# Generar JWT token
curl -X POST http://localhost:8080/wp-json/jwt-auth/v1/token \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin_local",
    "password": "SecurePass2025!"
  }'

# Expected:
# {
#   "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
#   "user_email": "dev@prilabsa.local",
#   "user_nicename": "admin_local"
# }
```

✅ **Si todos los tests pasan** → REST API funcional

---

## 📦 PASO 6: IMPORTAR 105 PRODUCTOS

### 6.1: Preparar Archivo JSON

```bash
# Verificar que existe el archivo de productos
ls ../MODULO\ PRODUCTOS\ PRILABSA\ CATALOGO\ JULIO\ 2025/PRILABSA_CATALOGO_WEB_2025.json

# Si existe, copiar al contenedor
docker cp ../MODULO\ PRODUCTOS\ PRILABSA\ CATALOGO\ JULIO\ 2025/PRILABSA_CATALOGO_WEB_2025.json \
  prilabsa-wordpress-local:/tmp/productos.json
```

---

### 6.2: Ejecutar Import (Dry Run)

```bash
# Test import (no guarda, solo valida)
docker-compose exec wpcli wp eval-file \
  /var/www/html/wp-content/plugins/prilabsa/prilabsa-import-products.php \
  --dry-run

# Expected output:
# [DRY RUN] Validando 105 productos...
# [DRY RUN] ✓ 105 productos válidos
# [DRY RUN] No se guardó nada (modo test)
```

---

### 6.3: Ejecutar Import Real

```bash
# Import real (guarda en database)
docker-compose exec wpcli wp eval-file \
  /var/www/html/wp-content/plugins/prilabsa/prilabsa-import-products.php

# Expected output:
# Importando 105 productos...
# Progress: [===================] 100%
# ✓ 105 productos importados
# ✓ 500+ imágenes subidas
# ✓ 105 PDFs subidos
# Tiempo: ~3-5 minutos
```

**Tiempo**: 3-5 minutos (depende de conexión para descargar assets)

---

### 6.4: Verificar Productos Importados

```bash
# Contar productos
docker-compose exec wpcli wp post list --post_type=productos --format=count

# Expected: 105

# Ver primeros 5 productos
docker-compose exec wpcli wp post list --post_type=productos --posts_per_page=5
```

✅ **Validación**: http://localhost:8080/wp-admin/edit.php?post_type=productos → Ver 105 productos

---

## 🧪 PASO 7: TESTING CON POSTMAN

### 7.1: Importar Collection

1. Abrir Postman
2. File → Import
3. Seleccionar: `testing/PRILABSA-WordPress-API.postman_collection.json`
4. Import

---

### 7.2: Configurar Environment

En Postman:
1. Click en "Environments" (⚙️)
2. Create New Environment: "PRILABSA Local"
3. Agregar variables:
   - `base_url`: `http://localhost:8080`
   - `wp_username`: `admin_local`
   - `wp_password`: `SecurePass2025!`
4. Save

---

### 7.3: Ejecutar Tests

En Postman:
1. Select environment: "PRILABSA Local"
2. Collection "PRILABSA WordPress Headless API"
3. Run → "1. JWT - Generate Token"
   - Expected: 200 OK, token generado
4. Run → "2. GET /wp/v2/productos (List All)"
   - Expected: 200 OK, array con 105 productos
5. Run → "3. GET /prilabsa/v1/productos/stats"
   - Expected: 200 OK, total: 105, categorías: 5

✅ **Validación**: Todos los tests pasan (verde)

---

## 🎯 PASO 8: CONECTAR FRONTEND REACT

### 8.1: Instalar Dependencies

```bash
# Navegar a tu proyecto React
cd /path/to/your/react/app

# Instalar Axios + SWR
npm install axios@^1.7.9 swr@^2.3.0
```

---

### 8.2: Copiar Código Frontend

```bash
# Copiar tipos TypeScript
cp PROJECT-PRODUCTOS-HEADLESS-WP/frontend-code/src/types/wordpress.ts \
   src/types/

# Copiar API client
cp PROJECT-PRODUCTOS-HEADLESS-WP/frontend-code/src/services/wordpressApi.ts \
   src/services/

# Copiar hooks
cp -r PROJECT-PRODUCTOS-HEADLESS-WP/frontend-code/src/hooks/* \
   src/hooks/

# Copiar utils
cp PROJECT-PRODUCTOS-HEADLESS-WP/frontend-code/src/utils/productAdapter.ts \
   src/utils/

# Copiar componentes
cp -r PROJECT-PRODUCTOS-HEADLESS-WP/frontend-code/src/components/* \
   src/components/
```

---

### 8.3: Configurar Environment

```bash
# Crear .env.development
cat > .env.development << 'EOF'
VITE_API_BASE_URL=http://localhost:8080/wp-json
VITE_API_TIMEOUT=10000
VITE_ENABLE_CACHE=true
EOF
```

---

### 8.4: Iniciar Dev Server

```bash
# Iniciar Vite
npm run dev

# Expected:
# VITE v6.3.6  ready in 500 ms
# ➜  Local:   http://localhost:5173/
```

---

### 8.5: Verificar Integración

1. Abrir: http://localhost:5173/productos
2. Expected: Ver 105 productos cargados desde WordPress API
3. Check DevTools Network:
   - Request: `http://localhost:8080/wp-json/wp/v2/productos`
   - Status: 200 OK
   - Response Time: <500ms

✅ **Success**: React consumiendo WordPress API

---

## ✅ CHECKLIST FINAL

Verificar todos completados:

- [ ] Docker/XAMPP instalado y corriendo
- [ ] WordPress 6.6+ instalado (http://localhost:8080)
- [ ] 3 plugins activos (ACF, ACF to REST API, JWT)
- [ ] Plugin PRILABSA activado
- [ ] Custom Post Type "productos" visible
- [ ] REST API respondiendo (`/wp-json/`)
- [ ] CORS headers presentes
- [ ] JWT token generado exitosamente
- [ ] 105 productos importados
- [ ] Postman tests pasando (5/5)
- [ ] Frontend React conectado
- [ ] Productos visibles en frontend

---

## 📊 MÉTRICAS FINALES

```
WordPress Status:        ✅ Running
Database:                ✅ Connected
REST API:                ✅ Functional (200 OK)
CORS:                    ✅ Configured
JWT:                     ✅ Working
Products Imported:       ✅ 105/105 (100%)
API Response Time:       ✅ <500ms
Frontend Integration:    ✅ Connected
Tests Passing:          ✅ 30/30 (Postman)
```

---

## 🚨 TROUBLESHOOTING

### Problema: Docker no inicia

```bash
# Ver logs
docker-compose logs wordpress

# Reiniciar servicios
docker-compose down
docker-compose up -d
```

---

### Problema: Productos no importan

```bash
# Verificar permisos
docker-compose exec wordpress chown -R www-data:www-data /var/www/html/wp-content/

# Ver logs import
docker-compose exec wpcli wp eval-file \
  /var/www/html/wp-content/plugins/prilabsa/prilabsa-import-products.php \
  --debug
```

---

### Problema: CORS no funciona

```bash
# Verificar .htaccess
docker-compose exec wordpress cat /var/www/html/.htaccess

# Si falta, copiar template
docker cp templates/htaccess-template \
  prilabsa-wordpress-local:/var/www/html/.htaccess
```

---

## 📞 SOPORTE

**Logs útiles**:
```bash
# WordPress logs
docker-compose logs -f wordpress

# MySQL logs
docker-compose logs -f db

# Ver todos
docker-compose logs -f
```

**Reiniciar todo**:
```bash
docker-compose restart
```

**Eliminar todo y empezar de nuevo**:
```bash
docker-compose down -v  # ⚠️ BORRA LA DATABASE
```

---

## ✅ SIGUIENTE PASO

Una vez validado localmente:
- [ ] Migration a GoDaddy (productos.prilabsa.com)
- [ ] SSL/TLS setup
- [ ] Production deployment frontend
- [ ] DNS configuration

---

**Generado por**: ECO (Engineering Coordination Officer)
**Metodología**: SOLARIA Agency
**Tiempo Total**: 15-30 minutos
**Última Actualización**: 2025-11-04
