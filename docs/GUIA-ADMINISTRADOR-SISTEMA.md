# Guía de Administración del Sistema - PRILABSA Productos

## 📋 Información del Sistema

| Campo | Valor |
|-------|-------|
| **Aplicación** | Catálogo de Productos PRILABSA |
| **Arquitectura** | Headless WordPress + React Frontend |
| **Frontend URL** | <https://productos.prilabsa.com> |
| **WordPress Admin** | <https://productos.prilabsa.com/wp-admin> |
| **API Base** | <https://productos.prilabsa.com/wp-json/wp/v2> |
| **Desarrollado por** | Solaria Agency |

---

## 🏗️ 1. Arquitectura del Sistema

### Diagrama de Dominios

```
┌─────────────────────────┐     ┌──────────────────────────────┐
│     prilabsa.com        │     │   productos.prilabsa.com     │
│   (Sitio Principal)     │     │   (Catálogo de Productos)    │
│                         │     │                              │
│  /productos ──────────────────→  /                          │
│                         │     │  /inventario-productos       │
│  ←────────────────────────────── /contacto, /nosotros, etc. │
└─────────────────────────┘     └──────────────────────────────┘
                                            │
                                            ▼
                                ┌──────────────────────────────┐
                                │   WordPress REST API         │
                                │   /wp-json/wp/v2/productos   │
                                └──────────────────────────────┘
```

### Componentes

| Componente | Tecnología | Ubicación |
|------------|------------|-----------|
| Frontend | React + TypeScript + Vite | `productos.prilabsa.com` |
| Backend CMS | WordPress + ACF | `productos.prilabsa.com/wp-admin` |
| API | WordPress REST API | `/wp-json/wp/v2/productos` |
| Hosting | GoDaddy | `public_html/productos.prilabsa.com/` |

---

## 🔄 2. Redirecciones Configuradas

### De prilabsa.com a productos.prilabsa.com

```htaccess
# En prilabsa.com/.htaccess
RewriteEngine On
RewriteRule ^productos/?$ https://productos.prilabsa.com/ [R=301,L]
RewriteRule ^productos/(.*)$ https://productos.prilabsa.com/productos/$1 [R=301,L]
```

### De productos.prilabsa.com a prilabsa.com

Las siguientes rutas en `productos.prilabsa.com` redirigen al sitio principal:

| Ruta | Redirección |
|------|-------------|
| `/contacto` | `prilabsa.com/contacto` |
| `/nosotros` | `prilabsa.com/nosotros` |
| `/sedes` | `prilabsa.com/sedes` |
| `/servicios` | `prilabsa.com/servicios` |

---

## ⚙️ 3. Configuración de WordPress

### Acceso al Panel de Administración

- **URL:** <https://productos.prilabsa.com/wp-admin>
- **Usuario administrador:** Solicitar a Solaria Agency

### Plugins Requeridos

| Plugin | Función | Estado |
|--------|---------|--------|
| Advanced Custom Fields (ACF) | Campos personalizados de productos | ✅ Activo |
| JWT Authentication | Autenticación API | ✅ Activo |
| PRILABSA Productos CPT | Custom Post Type | ✅ Activo |
| PRILABSA REST API | Endpoints personalizados | ✅ Activo |

### Campos ACF Configurados

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `codigo` | Texto | Código único del producto |
| `nombre_producto_es` | Texto | Nombre en español |
| `nombre_producto_en` | Texto | Nombre en inglés |
| `nombre_producto_pt` | Texto | Nombre en portugués |
| `categoria` | Select | Categoría del producto |
| `descripcion_corta_es/en/pt` | Textarea | Descripción breve |
| `descripcion_es` | WYSIWYG | Descripción completa |
| `beneficio_1_es` a `beneficio_4_es` | Texto | Beneficios del producto |
| `presentacion_es/en/pt` | Textarea | Formatos disponibles |
| `imagen_producto` | Imagen | Foto principal |
| `ficha_tecnica_pdf` | Archivo | PDF de ficha técnica |

---

## 🔌 4. Configuración de API

### Endpoints Disponibles

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/wp-json/wp/v2/productos` | GET | Lista todos los productos |
| `/wp-json/wp/v2/productos/{id}` | GET | Obtiene un producto por ID |
| `/wp-json/wp/v2/productos` | POST | Crea un producto (auth requerida) |
| `/wp-json/wp/v2/productos/{id}` | PUT | Actualiza un producto (auth requerida) |
| `/wp-json/wp/v2/productos/{id}` | DELETE | Elimina un producto (auth requerida) |

### Variables de Entorno

Archivo `.env.production`:

```env
VITE_WP_API_BASE_URL=https://productos.prilabsa.com
VITE_WP_REST_URL=https://productos.prilabsa.com/wp-json/wp/v2
VITE_WP_JWT_USER=usuario_api
VITE_WP_JWT_PASSWORD=contraseña_aplicacion
```

### Autenticación JWT

Para operaciones de escritura (crear/editar/eliminar):

1. Generar Application Password en WordPress:
   - Ir a **Usuarios → Tu Perfil**
   - Sección **"Application Passwords"**
   - Crear nueva contraseña

2. Configurar en `.env.production`:

   ```env
   VITE_WP_JWT_USER=nombre_usuario
   VITE_WP_JWT_PASSWORD=xxxx xxxx xxxx xxxx
   ```

### Headers de Caché

La API incluye headers de caché:

- `Cache-Control: max-age=300` (5 minutos)
- El frontend usa localStorage para caché adicional

---

## 👥 5. Gestión de Usuarios

### Roles Disponibles

| Rol | Permisos |
|-----|----------|
| **Administrador** | Acceso total: productos, usuarios, logs, configuración |
| **Editor** | Solo productos: crear, editar, eliminar, exportar CSV |

### Crear Usuario

1. Iniciar sesión como Administrador
2. Clic en avatar → **"Roles y permisos"**
3. Clic en **"Nuevo Usuario"**
4. Completar:
   - Nombre completo
   - Nombre de usuario (único)
   - Contraseña
   - Rol (Admin/Editor)
5. Clic en **"Crear"**

### Modificar Usuario

1. En la lista de usuarios, clic en **"Editar"**
2. Modificar campos necesarios
3. Para cambiar rol, clic en **"Permisos"**

### Eliminar Usuario

1. Clic en **"Eliminar"** junto al usuario
2. Confirmar la acción

> ⚠️ El usuario `ADMIN-PRILABSA` no puede ser eliminado.

---

## 🔒 6. Seguridad

### CORS (Cross-Origin Resource Sharing)

Dominios permitidos (configurar en WordPress):

- `https://prilabsa.com`
- `https://productos.prilabsa.com`
- `http://localhost:5173` (desarrollo)

### SSL/HTTPS

✅ Certificado SSL activo para ambos dominios.

### Recomendaciones

1. **Contraseñas seguras**: Mínimo 12 caracteres, incluir números y símbolos
2. **Rotación de Application Passwords**: Regenerar cada 6 meses
3. **Revisar logs de actividad**: Verificar accesos sospechosos
4. **Backups regulares**: WordPress y base de datos

---

## 🚀 7. Despliegue

### Estructura de Archivos en Servidor

```
public_html/productos.prilabsa.com/
├── index.html          # Punto de entrada
├── assets/             # JS, CSS compilados
│   ├── index-[hash].js
│   └── index-[hash].css
├── favicon.png
└── wp-admin/           # WordPress (no tocar)
    └── ...
```

### Proceso de Despliegue

1. **Build local:**

   ```bash
   npm run build
   ```

2. **Subir archivos:**

   ```bash
   ./deployment-scripts/deploy-full-build.sh
   ```

3. **Verificar:**
   - Abrir <https://productos.prilabsa.com>
   - Verificar que carga sin errores
   - Probar creación/edición de producto

### Script de Despliegue

Ubicación: `deployment-scripts/deploy-full-build.sh`

Requiere credenciales FTP:

- Host: `productos.prilabsa.com`
- Usuario: (configurado en script)
- Puerto: 21

---

## 📊 8. Monitoreo y Logs

### Logs de Actividad (Frontend)

- Accesibles desde: **Panel Admin → LOG CAMBIOS** (solo administradores)
- Registra: login/logout, creación/edición/eliminación de productos y usuarios
- Retención: últimos 100 registros

### Logs de WordPress

- Ubicación: `wp-content/debug.log` (si WP_DEBUG está activo)
- Para activar:

  ```php
  // wp-config.php
  define('WP_DEBUG', true);
  define('WP_DEBUG_LOG', true);
  ```

---

## 🛠️ 9. Troubleshooting

### Problema: API devuelve 403 Forbidden

**Causa:** Credenciales JWT incorrectas o expiradas.

**Solución:**

1. Regenerar Application Password en WordPress
2. Actualizar `.env.production`
3. Rebuild y deploy

### Problema: Solo se muestran 100 productos

**Causa:** Límite de paginación de WordPress API.

**Solución:** Ya implementada paginación recursiva en el frontend. Si persiste:

1. Limpiar caché del navegador
2. Verificar consola para errores de página 2

### Problema: Cambios no se reflejan en el sitio

**Causa:** Caché del navegador o CDN.

**Solución:**

1. Esperar 5 minutos
2. Forzar recarga: `Ctrl+Shift+R`
3. Limpiar localStorage: `localStorage.clear()`

### Problema: CSV no abre bien en Excel

**Solución:** Importar usando:

- Delimitador: Punto y coma (;)
- Codificación: UTF-8

---

## 📞 10. Contacto de Soporte

| Tipo | Contacto |
|------|----------|
| **Soporte Técnico** | <soporte@solaria.agency> |
| **Emergencias** | Contactar vía email con asunto "[URGENTE]" |
| **Documentación** | Este documento + `/docs/` del repositorio |

---

## 📝 Historial de Cambios

| Fecha | Versión | Cambios |
|-------|---------|---------|
| Enero 2026 | 1.1.0 | Fix paginación 105 productos, mejora CSV |
| Noviembre 2025 | 1.0.0 | Versión inicial |

---

*Última actualización: Enero 2026*
*Desarrollado por Solaria Agency*
