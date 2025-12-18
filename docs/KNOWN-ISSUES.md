# Known Issues & Pending Fixes

Este documento rastrea bugs conocidos y correcciones pendientes de deploy.

---

## ISSUE-001: Imagen faltante en producto EQ045 (Termometro)

**Fecha detectada:** 2025-12-18
**Severidad:** P2 Medium
**Estado:** FIX IMPLEMENTADO - PENDIENTE DEPLOY

### Descripcion del problema

El producto EQ045 (Termometro) no muestra su imagen en la pagina de detalle del producto. En su lugar, se muestra el placeholder por defecto.

**URL afectada:** https://productos.prilabsa.com/productos/equipos/eq045

### Causa raiz

El frontend adapter (`src/utils/wordpressAdapter.ts`) no utilizaba el campo `featured_image_url` de la API de WordPress. Solo buscaba:

1. `imagen_producto` (campo ACF tipo objeto - null para este producto)
2. Path estatico generado (que no coincidia con el archivo real por diferencia de mayusculas)

### Acciones completadas en WordPress

1. Imagen subida a WordPress Media Library:
   - **Media ID:** 641
   - **URL:** `https://productos.prilabsa.com/wp-content/uploads/2025/12/EQ045_TERMOMETRO.png`

2. Featured media asignada al producto:
   - **Post ID:** 587
   - **featured_media:** 641
   - **featured_image_url:** Configurada correctamente

### Fix implementado (NO DESPLEGADO)

**Archivo:** `src/utils/wordpressAdapter.ts`
**Lineas:** 183-200

```typescript
// ANTES: Solo buscaba imagen_producto o generaba path estatico
// DESPUES: Ahora tambien usa featured_image_url de WordPress

} else if (product.featured_image_url) {
  // Use WordPress featured image URL (from featured_media)
  assets.images = {
    main: {
      filename: product.featured_image_url.split('/').pop() || 'product-image.png',
      path: product.featured_image_url,
      extension: 'png',
      size: 0,
      exists: true,
      alt: productName,
      width: product.featured_image_sizes?.large?.width,
      height: product.featured_image_sizes?.large?.height,
      thumbnail: product.featured_image_sizes?.thumbnail?.url,
      webp: undefined,
    },
    gallery: [],
  };
  assets.image = assets.images.main;
}
```

### Validacion pre-deploy

- [x] TypeScript type-check: Sin errores
- [x] Tests unitarios: 27/27 pasaron
- [x] Build: Exitoso
- [ ] Deploy a produccion: **PENDIENTE**

### Instrucciones para desplegar

1. Verificar que no hay cambios adicionales pendientes:
   ```bash
   git status
   ```

2. Ejecutar tests antes de deploy:
   ```bash
   npm run test:run
   npm run type-check
   ```

3. Build de produccion:
   ```bash
   npm run build
   ```

4. Deploy via FTP:
   ```bash
   npm run deploy:ftp
   ```

5. Verificar en produccion:
   - Visitar https://productos.prilabsa.com/productos/equipos/eq045
   - Confirmar que la imagen del termometro se muestra correctamente

### Rollback en caso de problemas

Si el deploy causa problemas:

1. Revertir el cambio en `src/utils/wordpressAdapter.ts`:
   ```bash
   git checkout HEAD~1 -- src/utils/wordpressAdapter.ts
   ```

2. Rebuild y redeploy:
   ```bash
   npm run build && npm run deploy:ftp
   ```

---

## Historial de cambios

| Fecha | Issue | Estado | Notas |
|-------|-------|--------|-------|
| 2025-12-18 | ISSUE-001 | Fix implementado | Pendiente deploy, cambio en adapter |

---

## Notas para futuros deploys

1. **SIEMPRE** ejecutar tests antes de deploy
2. **SIEMPRE** verificar type-check sin errores
3. Hacer deploy en horarios de bajo trafico
4. Tener plan de rollback listo
5. Verificar funcionalidad critica post-deploy:
   - Navegacion de productos
   - Carga de imagenes
   - Filtros y busqueda
   - Links de descarga de PDFs
