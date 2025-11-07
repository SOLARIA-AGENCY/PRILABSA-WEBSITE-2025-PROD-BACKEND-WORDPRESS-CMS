# PRILABSA WordPress Backend - Productos Headless CMS

## Descripción General

Sistema completo de backend WordPress para el catálogo de productos PRILABSA, diseñado para funcionar como Headless CMS con REST API optimizada para frontend React/Next.js.

**Versión:** 1.0.0
**Desarrollado por:** SOLARIA AGENCY
**Fecha:** Noviembre 2025
**Proyecto:** PRILABSA Website 2025 - Headless WordPress Migration

---

## Componentes del Sistema

### 1. Custom Post Type Plugin (`prilabsa-productos-cpt.php`)

**Propósito:** Registra el Custom Post Type "productos" con taxonomías y configuraciones REST API.

**Características:**
- Custom Post Type "productos" con soporte completo REST API
- Taxonomía jerárquica: `categorias_productos`
- Taxonomía no jerárquica: `tags_productos`
- Columnas admin personalizadas (imagen, código, categorías)
- Mensajes admin en español
- REST API endpoints optimizados
- Múltiples tamaños de imagen en respuesta API

**Instalación:**
1. Copiar archivo a `/wp-content/plugins/`
2. Activar desde el panel de WordPress
3. Verificar que aparezca menú "Productos" en admin

**REST API Endpoints:**
- `GET /wp/v2/productos` - Lista de productos
- `GET /wp/v2/productos/{id}` - Producto individual
- `GET /wp/v2/categorias-productos` - Categorías
- `GET /wp/v2/tags-productos` - Etiquetas

---

### 2. ACF Configuration Plugin (`prilabsa-acf-config.php`)

**Propósito:** Configuración programática de Advanced Custom Fields para productos.

**Requisitos:**
- Advanced Custom Fields PRO (versión 6.0+)

**Campos ACF Configurados:**

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `descripcion` | WYSIWYG | Sí | Descripción detallada del producto |
| `especificaciones` | Repeater | No | Especificaciones técnicas (clave-valor) |
| `beneficios` | Textarea | No | Lista de beneficios del producto |
| `presentacion` | Textarea | No | Formato y presentación |
| `categoria` | Select | Sí | Categoría (aditivos, alimentos, equipos, probioticos, quimicos) |
| `subcategoria` | Text | No | Subcategoría adicional |
| `codigo` | Text | Sí | Código único del producto (validado) |
| `fotos` | Gallery | No | Galería de imágenes (máx 10, min 300x300px) |
| `pdf` | File | No | Ficha técnica PDF (máx 10MB) |

**Características:**
- Validación de código único (no duplicados)
- Exposición completa en REST API
- Formateo optimizado de imágenes y archivos
- Schemas completos para GraphQL

**REST API Response:**
```json
{
  "id": 123,
  "titulo": "Combacid XL",
  "acf": {
    "descripcion": "...",
    "especificaciones": [
      {"clave": "Ácido Fórmico", "valor": "33% Mín."}
    ],
    "beneficios": "...",
    "presentacion": "...",
    "categoria": "aditivos",
    "subcategoria": "Acidificantes",
    "codigo": "AD001",
    "fotos": [
      {
        "id": 456,
        "url": "https://...",
        "alt": "...",
        "width": 1200,
        "height": 800
      }
    ],
    "pdf": {
      "id": 789,
      "url": "https://...",
      "filename": "AD001_COMBACID_XL.PDF"
    }
  }
}
```

---

### 3. Custom REST API Plugin (`prilabsa-rest-api-custom.php`)

**Propósito:** Endpoints REST API personalizados con CORS, caché y optimizaciones.

**Endpoints Personalizados:**

#### `GET /wp-json/prilabsa/v1/productos`
Lista mejorada de productos con paginación y filtros.

**Parámetros:**
- `page` (int): Página actual (default: 1)
- `per_page` (int): Productos por página (default: 20, max: 100)
- `categoria` (string): Filtrar por categoría
- `orderby` (string): Ordenar por 'date', 'title', 'modified', 'codigo'
- `order` (string): 'ASC' o 'DESC'
- `include_acf` (bool): Incluir campos ACF (default: true)

**Response Headers:**
- `X-WP-Total`: Total de productos
- `X-WP-TotalPages`: Total de páginas
- `Cache-Control`: public, max-age=300

#### `GET /wp-json/prilabsa/v1/productos/{identifier}`
Obtener producto por ID o código.

**Parámetros:**
- `identifier`: ID numérico o código alfanumérico

**Ejemplo:**
```bash
# Por ID
curl https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/123

# Por código
curl https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/AD001
```

#### `GET /wp-json/prilabsa/v1/productos/search`
Búsqueda de productos.

**Parámetros:**
- `query` (string, requerido): Término de búsqueda (mín. 2 caracteres)
- `per_page` (int): Resultados por página (default: 10)

#### `GET /wp-json/prilabsa/v1/productos/categoria/{categoria}`
Productos por categoría.

**Categorías válidas:**
- `aditivos`
- `alimentos`
- `equipos`
- `probioticos`
- `quimicos`

#### `GET /wp-json/prilabsa/v1/productos/stats`
Estadísticas del catálogo.

**Response:**
```json
{
  "total_productos": 105,
  "por_categoria": {
    "aditivos": 12,
    "alimentos": 23,
    "equipos": 48,
    "probioticos": 4,
    "quimicos": 18
  },
  "ultima_actualizacion": "2025-11-04 14:30:00"
}
```

**Características de Seguridad:**
- CORS headers configurables
- Rate limiting ready
- Cache control headers
- JWT authentication hooks (compatible con JWT Auth plugin)
- Sanitización completa de inputs

---

### 4. Product Importer Plugin (`prilabsa-import-products.php`)

**Propósito:** Importación masiva de 105 productos desde JSON con imágenes y PDFs.

**Características:**
- Importación desde JSON estructurado
- Carga de imágenes PNG a media library
- Carga de PDFs de fichas técnicas
- Modo prueba (dry run) sin guardar cambios
- Actualización de productos existentes (por código)
- Transacciones de base de datos (all or nothing)
- Interfaz admin con progreso visual
- Validación de archivos antes de importar
- Logging detallado de errores

**Uso desde Admin:**

1. Navegar a: **Productos > Importar Productos**

2. Configurar rutas:
   - **JSON:** `/ruta/a/PRILABSA_CATALOGO_WEB_2025.json`
   - **Imágenes:** `/ruta/a/imagenes/`
   - **PDFs:** `/ruta/a/pdfs/`

3. Opciones:
   - ✅ **Actualizar existentes:** Actualiza productos con mismo código
   - ✅ **Modo prueba:** No guarda cambios (recomendado primero)

4. **Validar Archivos** - Verifica que todo esté listo

5. **Iniciar Importación**

**Uso Programático:**
```php
$importer = PRILABSA_Product_Importer::get_instance();

$result = $importer->import_from_json(
    '/path/to/PRILABSA_CATALOGO_WEB_2025.json',
    '/path/to/imagenes',
    '/path/to/pdfs',
    true,  // update_existing
    false  // dry_run
);

if ( is_wp_error( $result ) ) {
    echo 'Error: ' . $result->get_error_message();
} else {
    echo 'Importados: ' . $result['successful_imports'];
    echo 'Actualizados: ' . $result['updated_products'];
    echo 'Errores: ' . $result['failed_imports'];
}
```

**Estructura JSON Esperada:**
```json
{
  "metadata": {
    "total_productos": 105,
    "version": "2025.1"
  },
  "productos": [
    {
      "orden": 1,
      "codigo": "AD001",
      "nombre": "Combacid XL",
      "categoria": "aditivos",
      "descripcion": "...",
      "especificaciones": "...",
      "beneficios": "...",
      "presentacion": "...",
      "imagen": "AD001_COMBACID_XL.PNG",
      "pdf": "AD001_COMBACID_XL.PDF"
    }
  ]
}
```

---

## Instalación Completa

### Paso 1: Requisitos del Servidor

**Mínimo:**
- WordPress 6.0+
- PHP 8.0+
- MySQL 5.7+ / MariaDB 10.3+
- Apache/Nginx con mod_rewrite
- SSL/HTTPS configurado

**Plugins Requeridos:**
- Advanced Custom Fields PRO 6.0+
- (Opcional) JWT Authentication for WP REST API

### Paso 2: Instalar Plugins

```bash
# 1. Copiar archivos a plugins directory
cd /var/www/wordpress/wp-content/plugins/

# Crear directorio para plugins PRILABSA
mkdir -p prilabsa-productos

# Copiar los 4 archivos PHP
cp /ruta/a/prilabsa-productos-cpt.php prilabsa-productos/
cp /ruta/a/prilabsa-acf-config.php prilabsa-productos/
cp /ruta/a/prilabsa-rest-api-custom.php prilabsa-productos/
cp /ruta/a/prilabsa-import-products.php prilabsa-productos/

# Ajustar permisos
chown -R www-data:www-data prilabsa-productos/
chmod -R 755 prilabsa-productos/
```

### Paso 3: Activar Plugins

1. Ir a **Plugins > Plugins Instalados**
2. Activar en orden:
   - ✅ Advanced Custom Fields PRO (si no está activo)
   - ✅ PRILABSA Productos Custom Post Type
   - ✅ PRILABSA ACF Configuration
   - ✅ PRILABSA REST API Custom Endpoints
   - ✅ PRILABSA Product Importer

### Paso 4: Configurar Permalinks

1. Ir a **Ajustes > Enlaces permanentes**
2. Seleccionar "Nombre de la entrada"
3. **Guardar cambios** (esto actualiza .htaccess y flush rewrite rules)

### Paso 5: Preparar Archivos para Importación

```bash
# Crear directorio de productos
mkdir -p /wp-content/uploads/prilabsa-productos/{imagenes,pdfs}

# Copiar archivos del catálogo
cp PRILABSA_CATALOGO_WEB_2025.json /wp-content/uploads/prilabsa-productos/
cp imagenes/*.PNG /wp-content/uploads/prilabsa-productos/imagenes/
cp pdfs/*.PDF /wp-content/uploads/prilabsa-productos/pdfs/

# Permisos
chown -R www-data:www-data /wp-content/uploads/prilabsa-productos/
chmod -R 755 /wp-content/uploads/prilabsa-productos/
```

### Paso 6: Importar Productos

1. Ir a **Productos > Importar Productos**
2. Verificar rutas automáticas o ajustar manualmente
3. Marcar **"Modo prueba"** primero
4. Click en **"Validar Archivos"**
5. Si validación OK, click **"Iniciar Importación"**
6. Revisar resultados
7. Si todo OK, desmarcar "Modo prueba" y ejecutar importación real

---

## Configuración de Seguridad

### CORS (Cross-Origin Resource Sharing)

Por defecto, el plugin permite todas las origins (`*`). Para producción:

```php
// En wp-config.php o functions.php del theme
add_filter( 'prilabsa_rest_allowed_origins', function( $origins ) {
    return array(
        'https://productos.prilabsa.com',
        'https://www.prilabsa.com',
        'https://app.prilabsa.com'
    );
} );
```

### JWT Authentication

Instalar plugin: [JWT Authentication for WP-API](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/)

```php
// wp-config.php
define('JWT_AUTH_SECRET_KEY', 'tu-clave-secreta-aqui');
define('JWT_AUTH_CORS_ENABLE', true);
```

### Rate Limiting

Recomendado: Nginx rate limiting

```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

location /wp-json/ {
    limit_req zone=api burst=20 nodelay;
}
```

### SSL/HTTPS

```apache
# .htaccess
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## Testing REST API

### Productos Listing
```bash
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos?per_page=5&categoria=aditivos"
```

### Producto Individual
```bash
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/AD001"
```

### Búsqueda
```bash
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/search?query=combacid"
```

### Stats
```bash
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/stats"
```

### Con autenticación JWT
```bash
# 1. Obtener token
TOKEN=$(curl -X POST "https://productos.prilabsa.com/wp-json/jwt-auth/v1/token" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}' | jq -r '.token')

# 2. Usar token
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos" \
  -H "Authorization: Bearer $TOKEN"
```

---

## Optimización y Performance

### Object Cache

Instalar Redis Object Cache:

```bash
apt install redis-server php-redis
```

```php
// wp-config.php
define('WP_REDIS_HOST', '127.0.0.1');
define('WP_REDIS_PORT', 6379);
define('WP_CACHE', true);
```

### CDN para Imágenes

Configurar CDN (Cloudflare, BunnyCDN, etc.) para `/wp-content/uploads/`

### Database Optimization

```sql
-- Índices para mejorar queries
ALTER TABLE wp_postmeta ADD INDEX idx_codigo (meta_key(20), meta_value(50));
ALTER TABLE wp_posts ADD INDEX idx_post_type_status (post_type, post_status, post_date);
```

---

## Troubleshooting

### Error: "ACF no está disponible"

**Solución:** Instalar y activar Advanced Custom Fields PRO

### Error: "Archivo JSON no encontrado"

**Solución:** Verificar ruta absoluta del JSON en importador

### Imágenes no se muestran

**Solución:**
```bash
# Verificar permisos
chmod -R 755 /wp-content/uploads/
chown -R www-data:www-data /wp-content/uploads/
```

### REST API devuelve 404

**Solución:**
1. Ir a **Ajustes > Enlaces permanentes**
2. Guardar cambios (flush rewrite rules)
3. Verificar `.htaccess` tiene reglas de rewrite

### Timeout en importación

**Solución:**
```php
// wp-config.php
define('WP_MEMORY_LIMIT', '512M');
set_time_limit(600);
```

---

## Mantenimiento

### Backup Regular

```bash
# Base de datos
mysqldump -u user -p wordpress_db > backup_$(date +%Y%m%d).sql

# Archivos
tar -czf uploads_backup_$(date +%Y%m%d).tar.gz /wp-content/uploads/
```

### Actualización de Productos

1. Exportar productos actuales (backup)
2. Modificar JSON con nuevos datos
3. Ejecutar importador con opción "Actualizar existentes"

### Logs y Monitoreo

```php
// Habilitar debug en wp-config.php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);

// Ver logs
tail -f /wp-content/debug.log
```

---

## Soporte y Contacto

**Desarrollado por:** SOLARIA AGENCY
**Website:** https://www.solaria.agency
**Email:** soporte@solaria.agency
**Proyecto:** PRILABSA Website 2025

**Documentación Adicional:**
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [ACF Documentation](https://www.advancedcustomfields.com/resources/)

---

## Licencia

GPL v2 or later

Copyright (c) 2025 SOLARIA AGENCY

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.
