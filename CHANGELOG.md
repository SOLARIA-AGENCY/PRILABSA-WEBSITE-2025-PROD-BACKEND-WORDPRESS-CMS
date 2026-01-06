# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-01-06

### 🐛 Corrección Crítica: Límite de 100 Productos

#### Problema

El sitio en producción (`productos.prilabsa.com`) mostraba solo 100 productos en lugar de los 105 disponibles en la API de WordPress.

#### Causas Identificadas

1. **Límite de WordPress REST API**: La API tiene un límite máximo de `per_page=100` productos por solicitud
2. **Path de Deployment Incorrecto**: El script de despliegue subía archivos a `public_html/` en lugar de `public_html/productos.prilabsa.com/`
3. **Caché Agresivo del Navegador**: Los datos de productos se almacenaban en localStorage y no se actualizaban

#### Solución Implementada

##### 1. Paginación Recursiva Agresiva (`src/services/wordpressApi.ts`)

- Implementada lógica de "fallback agresivo" que automáticamente solicita la siguiente página si la página actual retorna 100 productos
- Esto resuelve el problema independientemente de si el servidor devuelve los headers `X-WP-TotalPages`

```typescript
// Si la página actual está llena (100 productos), solicitar siguiente página
if (products.length === CONFIG.DEFAULT_PER_PAGE) {
  return this._fetchAndCacheProducts(page + 1, allProducts);
}
```

##### 2. Corrección del Path de Deployment (`deployment-scripts/deploy-full-build.sh`)

- Actualizado para desplegar a `public_html/productos.prilabsa.com/`
- Anteriormente desplegaba a `public_html/` (directorio incorrecto)

##### 3. Cache Busting (`src/services/wordpressApi.ts`)

- Actualizada la clave de caché a `prilabsa_products_cache_v3`
- Fuerza a todos los navegadores a descargar datos frescos

##### 4. Timestamp de Build (`src/main.tsx`)

- Añadido timestamp de build para forzar nuevos hashes en los bundles de Vite

### ✅ Verificación

- **API Response**: `X-WP-Total: 105`, `X-WP-TotalPages: 2`
- **LocalStorage**: 105 productos almacenados correctamente
- **Console Logs**: Confirman paginación recursiva funcionando

### 📁 Archivos Modificados

- `src/services/wordpressApi.ts` - Paginación recursiva y cache busting
- `src/main.tsx` - Timestamp de build
- `deployment-scripts/deploy-full-build.sh` - Path de deployment corregido

---

## [1.0.0] - 2025-12-XX

### Added

- Sistema de inventario de productos headless WordPress
- Integración con ACF (Advanced Custom Fields) para datos extendidos
- Dashboard de administración
- Sincronización de PDFs de productos
- Gestión de categorías y etiquetas
