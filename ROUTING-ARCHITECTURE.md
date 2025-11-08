# PRILABSA - Arquitectura de Routing y Subdominios

## 📋 Arquitectura General

### Dominios y Responsabilidades

| Dominio | Responsabilidad | Tecnología |
|---------|----------------|------------|
| **www.prilabsa.com** | Sitio institucional principal | WordPress tradicional |
| **productos.prilabsa.com** | Catálogo de productos + Blog + Noticias | React 19 + Vite (este proyecto) |

---

## 🔄 Tabla de Rutas y Redirecciones

### EN www.prilabsa.com (Sitio Principal)

| Ruta | Acción | Destino |
|------|--------|---------|
| `/` | ✅ Permanece | www.prilabsa.com (Home institucional) |
| `/quienes-somos` | ✅ Permanece | www.prilabsa.com/quienes-somos |
| `/sedes` | ✅ Permanece | www.prilabsa.com/sedes |
| `/oficinas` | ✅ Permanece | www.prilabsa.com/oficinas |
| `/contacto` | ✅ Permanece | www.prilabsa.com/contacto |
| `/trabaja-con-nosotros` | ✅ Permanece | www.prilabsa.com/trabaja-con-nosotros |
| `/productos` | 🔄 **Redirige** | https://productos.prilabsa.com/productos |
| `/blog` | 🔄 **Redirige** | https://productos.prilabsa.com/blog |
| `/noticias` | 🔄 **Redirige** | https://productos.prilabsa.com/noticias |

---

### EN productos.prilabsa.com (Este Proyecto React)

#### ✅ Rutas que PERMANECEN en productos.prilabsa.com

| Ruta | Descripción | Componente |
|------|-------------|-----------|
| `/productos` | Catálogo completo de productos | `Productos.tsx` |
| `/productos/:categorySlug` | Productos por categoría (ej: `/productos/probioticos`) | `CategoryPage.tsx` |
| `/productos/:categorySlug/:slug` | Detalle de producto individual | `ProductoDetalle.tsx` |
| `/blog` | Listado de artículos del blog | `Blog.tsx` |
| `/blog/:id` | Detalle de artículo de blog | `ArticlePage.tsx` |
| `/noticias` | Listado de noticias/novedades | `Noticias.tsx` |
| `/noticias/:id` | Detalle de noticia individual | `NoticiaPage.tsx` |
| `/cotizacion` | Carrito de cotización de productos | `Cotizacion.tsx` |

#### 🔄 Rutas que REDIRIGEN a www.prilabsa.com

| Ruta Actual | Acción | URL Destino |
|-------------|--------|-------------|
| `/` | 🔄 Redirige | https://www.prilabsa.com/ |
| `/quienes-somos` | 🔄 Redirige | https://www.prilabsa.com/quienes-somos |
| `/oficinas` | 🔄 Redirige | https://www.prilabsa.com/oficinas |
| `/contactanos` | 🔄 Redirige | https://www.prilabsa.com/contactanos |
| `/trabaja-con-nosotros` | 🔄 Redirige | https://www.prilabsa.com/trabaja-con-nosotros |

#### 🛠️ Rutas Técnicas/Admin (Solo Desarrollo)

| Ruta | Descripción | Producción |
|------|-------------|------------|
| `/dashboard` | Panel de despliegue | ❌ Ocultar en producción |
| `/home` | Página de prueba | ❌ Ocultar en producción |
| `/deploy` | Dashboard de deploy | ❌ Ocultar en producción |
| `/prilabsa` | Página de prueba | ❌ Ocultar en producción |
| `/website2025` | Página de prueba | ❌ Ocultar en producción |
| `/design-system` | Sistema de diseño | ❌ Solo desarrollo |
| `/login` | Login admin | ⚠️ Protegido |
| `/inventario-productos` | Inventario admin | ⚠️ Protegido + solo desarrollo |

#### ⚖️ Rutas Legales (MANTENER)

| Ruta | Descripción | Nota |
|------|-------------|------|
| `/politica-de-privacidad` | Política de Privacidad | ✅ GDPR requerido |
| `/terminos-y-condiciones` | Términos y Condiciones | ✅ Legal requerido |
| `/aviso-legal` | Aviso Legal | ✅ Legal requerido |
| `/politica-de-cookies` | Política de Cookies | ✅ GDPR requerido |

---

## 🎯 Estrategia de Implementación

### Fase 1: Crear Componente de Redirección Externa

```tsx
// src/components/ExternalRedirect.tsx
import { useEffect } from 'react';

export const ExternalRedirect = ({ to }: { to: string }) => {
  useEffect(() => {
    window.location.href = to;
  }, [to]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirigiendo a {to}...</p>
      </div>
    </div>
  );
};
```

### Fase 2: Actualizar App.tsx

**Rutas a ELIMINAR** (redirigir a www.prilabsa.com):
- `/` → `https://www.prilabsa.com/`
- `/quienes-somos` → `https://www.prilabsa.com/quienes-somos`
- `/oficinas` → `https://www.prilabsa.com/oficinas`
- `/contactanos` → `https://www.prilabsa.com/contactanos`
- `/trabaja-con-nosotros` → `https://www.prilabsa.com/trabaja-con-nosotros`

**Rutas a ELIMINAR** (solo desarrollo):
- `/dashboard`
- `/home`
- `/deploy`
- `/prilabsa`
- `/website2025`
- `/design-system`
- `/login`
- `/inventario-productos`

**Rutas a MANTENER**:
- `/productos/*` (todas las variantes)
- `/blog/*` (todas las variantes)
- `/noticias/*` (todas las variantes)
- `/cotizacion`
- Rutas legales (`/politica-de-privacidad`, `/terminos-y-condiciones`, etc.)

### Fase 3: Actualizar Navegación (Header/Footer)

**Links en menú de productos.prilabsa.com**:
```tsx
// Links INTERNOS (React Router Link)
<Link to="/productos">Productos</Link>
<Link to="/blog">Blog</Link>
<Link to="/noticias">Noticias</Link>

// Links EXTERNOS (tag <a> con href)
<a href="https://www.prilabsa.com/">Inicio</a>
<a href="https://www.prilabsa.com/quienes-somos">Quiénes Somos</a>
<a href="https://www.prilabsa.com/oficinas">Oficinas</a>
<a href="https://www.prilabsa.com/contactanos">Contacto</a>
```

---

## 📝 Checklist de Implementación

### ✅ Fase 1-3: Implementación React (COMPLETADO)

- [x] Crear componente `ExternalRedirect.tsx`
- [x] Actualizar `App.tsx` con redirecciones externas
- [x] Eliminar rutas de desarrollo en producción (condicional por `import.meta.env.MODE`)
- [x] Actualizar componente `Header.tsx` (links externos vs internos)
- [x] Actualizar componente `Footer.tsx` (links externos vs internos)
- [ ] Actualizar breadcrumbs para no romper navegación (verificar si es necesario)
- [ ] Actualizar archivo `vite.config.ts` si es necesario (verificar)
- [ ] Probar en localhost:5174 antes de deploy

### 🔄 Fase 4: Configuración DNS/Servidor (PENDIENTE)

- [ ] Configurar DNS para productos.prilabsa.com → servidor correcto
- [ ] Configurar redirección inversa en www.prilabsa.com:
  - `/productos` → https://productos.prilabsa.com/productos
  - `/blog` → https://productos.prilabsa.com/blog
  - `/noticias` → https://productos.prilabsa.com/noticias

---

## 🚀 Configuración DNS Requerida

```
# Zona DNS: prilabsa.com

# A Record para subdominio productos
productos.prilabsa.com.  A  46.62.222.138  # (IP del servidor Hetzner)

# Asegurar www apunta al sitio principal
www.prilabsa.com.        A  [IP-SERVIDOR-PRINCIPAL]
```

---

## 🔧 Configuración Nginx/Apache (Servidor)

### En www.prilabsa.com (WordPress tradicional)

```apache
# Redirecciones en .htaccess
RewriteEngine On

# Redirigir /productos a productos.prilabsa.com
RewriteRule ^productos(.*)$ https://productos.prilabsa.com/productos$1 [R=301,L]

# Redirigir /blog a productos.prilabsa.com
RewriteRule ^blog(.*)$ https://productos.prilabsa.com/blog$1 [R=301,L]

# Redirigir /noticias a productos.prilabsa.com
RewriteRule ^noticias(.*)$ https://productos.prilabsa.com/noticias$1 [R=301,L]
```

### En productos.prilabsa.com (React SPA)

```nginx
# Nginx config para React SPA
server {
    listen 80;
    server_name productos.prilabsa.com;

    root /var/www/productos-prilabsa/dist;
    index index.html;

    # React Router - todas las rutas sirven index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 📊 Métricas Esperadas

### Antes (Actual)
- 1 dominio: productos.prilabsa.com
- 26 rutas totales (incluyendo desarrollo)
- Confusión de navegación (todo en un solo sitio)

### Después (Nueva Arquitectura)
- 2 dominios especializados
- productos.prilabsa.com: 11 rutas productivas
- www.prilabsa.com: 6+ rutas institucionales
- Navegación clara y separación de responsabilidades

---

**Generado**: 2025-11-08
**Versión**: 1.0.0
**Autor**: SOLARIA AGENCY
