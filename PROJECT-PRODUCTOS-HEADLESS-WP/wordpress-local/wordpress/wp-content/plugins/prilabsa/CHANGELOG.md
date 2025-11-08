# PRILABSA WordPress Headless - Changelog

## [2.2.0] - 2025-11-08

### 🎯 CRITICAL FIX - SLUG Y TÍTULO UNIFICADOS

#### ✅ Problema Resuelto: Discrepancia entre Nombre y Slug
**ANTES**: Confusión entre título del post (sidebar) y nombre_producto_es (ACF)
- Usuario editaba nombre en 2 lugares diferentes
- Slug se generaba desde título del post (sidebar)
- Nombre en frontend (nombre_producto_es) ≠ Slug (título post)
- **RESULTADO**: URLs inconsistentes como `/productos/alimentos/adafa` cuando el producto se llama "tee"

**AHORA**: Una sola fuente de verdad → nombre_producto_es
- ✅ Título del post WordPress **OCULTO** (no editable)
- ✅ Título del post = nombre_producto_es (auto-sincronizado)
- ✅ Slug = sanitize_title(nombre_producto_es) (auto-generado)
- ✅ Usuario solo edita **1 campo**: nombre_producto_es
- **RESULTADO**: URLs consistentes `/productos/alimentos/probiotico-xyz` ✅

#### 🔧 Cambios Técnicos

**Archivos Modificados**:
- `prilabsa-admin-ui.php` (+35 líneas)
  - Nueva función: `prilabsa_hide_native_title()` - Oculta título del post con CSS
  - Mensaje amarillo: "El nombre se gestiona en los campos ACF multiidioma"

- `prilabsa-auto-hooks.php` (refactorizado)
  - **SIMPLIFICADO**: 3 funciones → 2 funciones
  - `prilabsa_auto_generate_slug_and_title()` - Unifica generación de título Y slug desde nombre_producto_es
  - `prilabsa_auto_sync_featured_image()` - Mantiene sincronización de imagen
  - **ELIMINADAS**: Funciones duplicadas que causaban conflictos

**Flujo Correcto Ahora**:
```
Usuario escribe nombre_producto_es: "Probiótico Alta Concentración"
       ↓
Hook acf/save_post ejecuta (prioridad 20)
       ↓
post_title = "Probiótico Alta Concentración"
post_name  = "probiotico-alta-concentracion"
       ↓
Frontend muestra: /productos/probioticos/probiotico-alta-concentracion ✅
```

#### 🎓 Instrucciones de Actualización

**Para productos existentes con slugs incorrectos**:
1. Editar producto en WordPress
2. Verificar que `nombre_producto_es` tiene el nombre correcto
3. Guardar → Título y slug se actualizarán automáticamente ✅
4. WordPress creará redirección automática del slug antiguo al nuevo (enlaces no se rompen)

**Para nuevos productos**:
- Solo escribir `nombre_producto_es` → Título y slug se generan automáticamente ✅

**Verificación**:
- Título del post oculto (no editable)
- Breadcrumb frontend: `[CODIGO] Nombre ES`
- URL frontend: `/productos/categoria/nombre-es-sanitizado`

---

## [2.1.0] - 2025-11-08

### 🎯 UX IMPROVEMENTS - ADMIN INTERFACE

#### ✅ Slug Automático
- **NUEVO**: Slug se genera automáticamente desde `nombre_producto_es`
- **ELIMINADO**: Necesidad de editar slug manualmente
- **IMPLEMENTACIÓN**: Hook `wp_insert_post_data` en `prilabsa-auto-hooks.php`

#### ✅ Imagen Unificada
- **NUEVO**: Imagen ACF (`imagen_producto`) se sincroniza automáticamente con Featured Image
- **ELIMINADO**: Necesidad de subir imagen 2 veces
- **IMPLEMENTACIÓN**: Hook `acf/save_post` en `prilabsa-auto-hooks.php`
- **APLICA A**: Productos (imagen_producto), Blog/Noticias (imagen_destacada)

#### ✅ Título Automático
- **NUEVO**: Título del post se sincroniza con `nombre_producto_es`
- **BENEFICIO**: Mejor consistencia de datos
- **IMPLEMENTACIÓN**: Hook `acf/save_post` en `prilabsa-auto-hooks.php`

#### ✅ Botón Publicar en Columna Principal
- **MEJORADO**: JavaScript más robusto para mover botón de publicar
- **NUEVO**: MutationObserver como fallback si ACF tarda en cargar
- **NUEVO**: Múltiples intentos (1s, 3s, observer)
- **IMPLEMENTACIÓN**: `prilabsa-admin-ui.php` líneas 281-418

#### ✅ Campos Multiidioma Alineados Horizontalmente
- **MEJORADO**: CSS con flexbox en lugar de float
- **NUEVO**: Estrategia `:has()` para aplicar flex al contenedor padre
- **BENEFICIO**: Campos ES/EN/PT aparecen lado a lado en una fila
- **IMPLEMENTACIÓN**: `prilabsa-admin-ui.php` líneas 431-502

### 📁 Archivos Nuevos
- `prilabsa-auto-hooks.php` - Automatizaciones de slug, imagen y título

### 🔧 Archivos Modificados
- `prilabsa.php` - Versión 2.0.0 → 2.1.0, carga nuevo módulo auto-hooks
- `prilabsa-admin-ui.php` - JavaScript y CSS mejorados

### 🎓 Instrucciones de Actualización
1. **Desactivar** plugin "PRILABSA WordPress Headless" en http://localhost:8000/wp-admin/plugins.php
2. **Activar** nuevamente
3. **Verificar** en nueva página de producto:
   - Campos de nombres aparecen en fila horizontal ✅
   - Botón "Publicar" está en columna principal ✅
   - Slug se genera automáticamente al escribir nombre_producto_es ✅
   - Imagen solo se sube una vez (ACF imagen_producto) ✅

---

## [2.0.0] - 2025-11-07

### 🚀 MAJOR RELEASE - MODULAR ACF EXTRAS

#### ✅ Campos Adicionales sin Modificar Archivos Base
- **NUEVO**: `prilabsa-acf-extras.php` para extensiones modulares
- **Productos**: descripcion_corta_es/en/pt (200 chars)
- **Blog/Noticias**: imagen_destacada, seo_titulo_es/en/pt, seo_descripcion_es/en/pt

### 📁 Archivos Nuevos
- `prilabsa-acf-extras.php` - Campos adicionales (descripción corta, SEO, imagen)

### 🔧 Archivos Modificados
- `prilabsa.php` - Carga nuevo módulo acf-extras
- `prilabsa-productos-acf.php` - Versión 2.1.0, agregados codigo, categoria, ficha_tecnica_pdf

---

## [1.7.0] - 2025-11-07
- Auto-enable publish button cuando campos requeridos completos
- CSS mejorado para alineación horizontal de campos multiidioma

## [1.6.0] - 2025-11-07
- Botón publicar movido a columna principal (intento 1)

## [1.5.0] - 2025-11-07
- Agregado campo PDF ficha_tecnica_pdf

## [1.4.0] - 2025-11-07
- Agregados campos codigo y categoria

## [1.3.0] - 2025-11-06
- Versión inicial con CPT productos, blog, noticias
- ACF configuration base
- REST API exposure
