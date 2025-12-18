# PRILABSA - Sitio Web Corporativo 2025

## Descripción del Proyecto

Sitio web corporativo moderno para PRILABSA (Prime Laboratorio Prilab SA), empresa especializada en soluciones integrales para la industria acuícola en Ecuador. El proyecto está construido con tecnologías web modernas para garantizar máximo rendimiento, escalabilidad y experiencia de usuario.

## Información de la Empresa

- **Empresa**: PRILABSA (Prime Laboratorio Prilab SA)
- **RUC**: 0991316043001
- **Ubicación**: Guayaquil, Ecuador
- **Sector**: Soluciones especializadas para acuicultura
- **Contacto**: jquindeg@cofimar.com.ec

## Características Principales

### Catálogo de Productos
- **105 productos** organizados en 5 categorías principales:
  - 🧪 **ADITIVOS** (12 productos): Combacid XL, Carophyll Pink, Emerald, etc.
  - 🐟 **ALIMENTOS** (23 productos): Larva Z-Plus, EZ Artemia, Cistos de Artemia, etc.
  - ⚙️ **EQUIPOS** (48 productos): Balanzas, medidores, kits de análisis, etc.
  - 🦠 **PROBIÓTICOS** (4 productos): Terminate, PondToss, WSR, Hatchery Prime
  - ⚗️ **QUÍMICOS** (18 productos): EDTA, ácidos, sales especializadas, etc.

### Funcionalidades Avanzadas
- Sistema de cotización PDF integrado
- Búsqueda avanzada y filtros por categoría
- Soporte multiidioma (Español, Inglés, Portugués)
- Mapa interactivo de oficinas (Guayaquil, Pedernales, Acaraú-Brasil)
- Blog corporativo con noticias del sector
- Formularios de contacto y aplicación laboral
- Sistema de newsletter automatizado

## Stack Tecnológico

### Frontend
- **React 19.2.0**: Framework de interfaz de usuario ⚠️ **LOCKED VERSION**
- **TypeScript 5.3+**: Tipado estático y desarrollo robusto
- **Vite 6.3**: Build tool optimizado y servidor de desarrollo
- **TailwindCSS 4.1**: Framework de estilos utilitarios
- **React Router 7.9.6**: Navegación client-side ⚠️ **LOCKED VERSION**
- **react-leaflet 5.0.0**: Mapas interactivos ⚠️ **LOCKED VERSION**
- **@dr.pogodin/react-helmet 3.0.2**: SEO meta tags ⚠️ **LOCKED VERSION**

### Optimización y Performance
- **Code Splitting**: Carga dinámica de componentes
- **Lazy Loading**: Carga diferida de imágenes y recursos
- **Compresión Brotli**: Reducción de tamaño de assets
- **Tree Shaking**: Eliminación de código no utilizado
- **Bundle Optimization**: Chunks separados por funcionalidad

### Testing y Calidad
- **Vitest**: Framework de testing moderno
- **ESLint**: Análisis estático de código
- **TypeScript Strict Mode**: Verificación de tipos estricta
- **Testing Library**: Testing de componentes React

## Arquitectura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── ...
├── pages/              # Páginas principales
│   ├── HomePage.tsx
│   ├── Productos.tsx
│   ├── Cotizacion.tsx
│   └── ...
├── data/               # Datos y configuración
│   ├── productos.ts
│   ├── oficinasData.ts
│   └── ...
├── utils/              # Utilidades y helpers
├── types/              # Definiciones TypeScript
├── i18n/               # Configuración de traducciones
└── styles/             # Estilos globales
```

## ⚡ Optimizaciones Implementadas (2025)

### 🎯 i18n System Refactored
- **Antes**: Archivo monolítico 1,113 líneas
- **Ahora**: 24 chunks optimizados (~1.7KB c/u)
- **Mejora**: Lazy loading por namespace + bundle splitting
- **Performance**: Carga inicial 60%+ más rápida

### 🖼️ Sistema de Imágenes Avanzado
- **WebP Support**: Detección automática + fallback PNG
- **Lazy Loading**: Intersection Observer con umbral optimizado
- **Progressive Loading**: Cargas por lotes para mejor UX
- **Performance**: Optimización Core Web Vitals

### 📦 Bundle Optimization
- **Code Splitting**: Lazy loading por componentes y rutas
- **Dynamic Imports**: Carga bajo demanda de funcionalidades
- **Tree Shaking**: Eliminación código no utilizado
- **Chunk Strategy**: Optimización manual para mejor caching

## 🛠️ Desarrollo

```bash
# Instalación (CRITICAL: Use yarn for dependency resolution)
yarn install

# Desarrollo
yarn run dev          # Puerto 5174 - Frontend funcional
yarn run build        # Build producción
yarn run preview      # Preview build

# Testing
yarn run test         # Tests unitarios
yarn run test:ui      # UI tests
yarn run test:e2e     # Tests E2E

# Linting & Formatting
yarn run lint         # ESLint
yarn run type-check   # TypeScript check
```

## ⚠️ CRITICAL DEPENDENCY WARNING (2025-11-18)

**FRONTEND RESTORED**: El proyecto estaba no funcional por incompatibilidad de dependencias

**DEPENDENCIAS BLOQUEADAS** - NO MODIFICAR NUNCA:
```json
{
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "react-router-dom": "7.9.6",
  "react-leaflet": "5.0.0", 
  "@dr.pogodin/react-helmet": "^3.0.2",
  "leaflet": "1.9.4"
}
```

**¿QUÉ PASÓ?**
- Intento de downgrade a React 18.3.1 (incompatible)
- React Router 6.x incompatible con React 19
- react-leaflet 4.x incompatible con React 19
- Cambio a react-helmet-async (API diferente)

**SOLUCIÓN APLICADA**:
1. Crear rama `frontend-funcional` desde commit `8eb27b2e`
2. Identificar versiones compatibles originales
3. Restaurar package.json con versiones correctas
4. Limpieza completa: `rm -rf node_modules yarn.lock`
5. Reinstalar: `yarn install`
6. Verificar funcionalidad: ✅ http://localhost:5174

**RESULTADO**: ✅ Frontend 100% funcional

## 🌍 Internacionalización

El sistema i18n optimizado soporta:

- **Español (es)** - Idioma por defecto
- **English (en)** - Inglés internacional  
- **Português (pt)** - Portugués Brasil

### Uso en Componentes

```tsx
// Para productos
import { useProductTranslation } from '@/i18n/hooks';
const { getProductText, formatProductDescription } = useProductTranslation();

// Para páginas
import { usePageTranslation } from '@/i18n/hooks';
const { getPageText } = usePageTranslation(['pages', 'common']);
```

## 📊 Performance Metrics

- **First Contentful Paint**: < 1.2s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: Optimizado por idioma
- **Lighthouse Score**: 95+ en todas las categorías

## 🚀 Deployment

### Netlify (Producción)
```bash
# Deploy automático en push a main
git push origin main

# Deploy manual
netlify deploy --prod
```

### Cloudflare Workers (CDN)
```bash
# Deploy edge functions
npm run deploy:workers
```

## 📋 Estructura del Repositorio (Actualizada 2025-12-18)

```
PRILABSA-WEBSITE-2025-PROD-BACKEND-WORDPRESS-CMS/
├── src/                    # Codigo fuente React
├── public/                 # Assets publicos
├── dist/                   # Build de produccion
├── scripts/                # Scripts de build y deploy
├── docs/                   # Documentacion organizada
│   ├── deployment/         # Guias de deploy
│   ├── wordpress/          # Integracion WordPress
│   ├── architecture/       # Arquitectura y patrones
│   └── KNOWN-ISSUES.md     # Bugs conocidos y pendientes
├── archive/                # Archivos obsoletos (no eliminar)
│   ├── htaccess-legacy/    # Configuraciones htaccess antiguas
│   ├── php-import-scripts/ # Scripts PHP de migracion
│   ├── shell-scripts/      # Scripts bash temporales
│   ├── temp-files/         # Archivos temporales
│   └── logs/               # Logs de desarrollo
├── backups/                # Backups de produccion
└── [configs]               # Archivos de configuracion esenciales
```

### Archivos Esenciales en Root

| Archivo | Proposito |
|---------|-----------|
| `package.json` | Dependencias y scripts |
| `vite.config.ts` | Configuracion Vite |
| `tsconfig.json` | Configuracion TypeScript |
| `tailwind.config.cjs` | Configuracion TailwindCSS |
| `.htaccess` | Configuracion Apache produccion |
| `index.html` | Entry point HTML |

### Documentacion Importante

- **`docs/KNOWN-ISSUES.md`**: Bugs conocidos y correcciones pendientes
- **`docs/deployment/`**: Guias de despliegue a produccion
- **`docs/wordpress/`**: Integracion con WordPress CMS
- **`AGENTS.md`**: Instrucciones para agentes AI

## 🔧 Configuración

### Variables de Entorno

```bash
# Desarrollo
VITE_API_URL=http://localhost:3000
VITE_USE_NEW_WEBSITE=true

# Producción
VITE_API_URL=https://api.prilabsa.com
VITE_ENABLE_ANALYTICS=true
```

### Netlify Configuration

Ver `netlify.toml` para configuración completa de:
- Redirects y headers
- Edge functions
- Build commands
- Environment variables

## 📈 Monitoreo y Analytics

- **Core Web Vitals**: Monitoreo automático
- **Error Tracking**: Sentry integration
- **Performance**: Lighthouse CI en cada deploy
- **Uptime**: Monitoring 24/7

## 🤝 Contribución

1. Fork del repositorio
2. Crear feature branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'feat: nueva funcionalidad'`)
4. Push branch (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### Commit Convention

```bash
feat: nueva funcionalidad
fix: corrección bug  
docs: actualización documentación
style: cambios formato/estilo
refactor: refactorización código
test: agregar/actualizar tests
chore: tareas mantenimiento
```

### ⚠️ REGLAS CRÍTICAS DE CONTRIBUCIÓN

**PROHIBIDO ABSOLUTAMENTE**:
- ❌ Modificar versiones de React, React Router, react-leaflet, helmet
- ❌ Hacer downgrade de React 19 a React 18
- ❌ Cambiar versiones mayores sin testing completo
- ❌ Usar `npm install` (usar siempre `yarn install`)

**OBLIGATORIO**:
- ✅ Verificar frontend funcional después de cambios
- ✅ Usar versiones exactas (no rangos) para dependencias core
- ✅ Testear en localhost:5174 antes de PR
- ✅ Documentar cambios en dependencias si son necesarios

## 📄 Licencia

© 2025 Prilabsa. Todos los derechos reservados.

## 🆘 Soporte

Para consultas técnicas o problemas relacionados con el desarrollo:

1. **Revisar documentación**: Verificar este README y archivos en `/docs`
2. **Consultar logs**: Revisar salida de comandos npm para errores específicos
3. **Verificar dependencias**: Asegurar versiones correctas de Node.js y npm
4. **Contacto directo**: jquindeg@cofimar.com.ec

## Licencia

Este proyecto es de uso privado y propiedad exclusiva de PRILABSA (Prime Laboratorio Prilab SA). Todos los derechos reservados.

---

## 📝 HISTORIAL DE CAMBIOS CRÍTICOS

### 2025-11-18: Restauración Frontend Funcional
- **Problema**: Frontend completamente no funcional
- **Causa**: Incompatibilidad de dependencias (React 19 vs 18)
- **Solución**: Restaurar dependencias compatibles desde commit `8eb27b2e`
- **Resultado**: ✅ Frontend 100% operativo en http://localhost:5174
- **Lección**: Nunca modificar dependencias core sin testing exhaustivo

---

**PRILABSA - Especialistas en Soluciones Acuícolas**  
*Sitio web desarrollado con tecnologías modernas para máximo rendimiento*

**Última Actualización Crítica**: 2025-11-18 (Frontend Restaurado)
