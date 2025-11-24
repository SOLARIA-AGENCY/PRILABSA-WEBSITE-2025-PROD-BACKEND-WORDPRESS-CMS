# AGENTS.md - Workflow de Desarrollo con Claude Code

**Proyecto**: Prilabsa Corporate Website 2025
**Herramienta**: Claude Code (CLI)
**Modelo**: Claude Sonnet 4.5
**Última actualización**: 2025-11-24

---

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Configuración del Entorno](#configuración-del-entorno)
3. [Workflow de Desarrollo](#workflow-de-desarrollo)
4. [Patrones de Trabajo](#patrones-de-trabajo)
5. [Comandos Frecuentes](#comandos-frecuentes)
6. [Mejores Prácticas](#mejores-prácticas)
7. [Troubleshooting con Claude](#troubleshooting-con-claude)

---

## Introducción

Este documento describe el workflow de desarrollo del proyecto Prilabsa utilizando Claude Code como asistente de desarrollo principal. Claude Code ha sido fundamental en:

- ✅ Resolución de problemas de deployment (HTTP 500/403)
- ✅ Configuración de i18n (español por defecto)
- ✅ Creación de scripts FTP de deployment
- ✅ Auditoría y verificación de servidor remoto
- ✅ Documentación exhaustiva del proyecto

---

## Configuración del Entorno

### Archivos de Contexto

Claude Code utiliza los siguientes archivos para mantener contexto del proyecto:

1. **`CLAUDE.md`** (en `/Users/carlosjperez/`)
   - Información del servidor de demostración Solaria
   - Estado completo del proyecto Prilabsa
   - Stack tecnológico y dependencias
   - Scripts y configuraciones

2. **`README.md`** (en repositorio)
   - Documentación general del proyecto
   - Instrucciones de instalación
   - Guías de uso

3. **`DEPLOYMENT-GODADDY.md`** (en repositorio)
   - Guía específica de deployment a GoDaddy
   - Configuración .htaccess
   - Troubleshooting de errores comunes

4. **`AGENTS.md`** (en repositorio - este archivo)
   - Workflow de desarrollo con Claude Code
   - Patrones y mejores prácticas

### Variables de Entorno

**⚠️ Archivos NO commiteables**:
- `.ftpconfig.json` - Credenciales FTP
- `.env` - Variables de entorno sensibles

---

## Workflow de Desarrollo

### Fase 1: Análisis del Problema

Cuando se presenta un problema, Claude Code sigue este proceso:

1. **Lectura de contexto**
   ```bash
   # Claude lee automáticamente CLAUDE.md
   # Claude analiza archivos relevantes del proyecto
   ```

2. **Diagnóstico inicial**
   ```bash
   # Ejemplo: HTTP 500 error
   - Verificar .htaccess
   - Revisar logs de servidor
   - Comprobar archivos subidos
   ```

3. **Creación de scripts de auditoría**
   ```javascript
   // Ejemplo: scripts/full-audit.cjs
   // Auditar estado del servidor remoto
   ```

### Fase 2: Implementación de Solución

1. **Desarrollo de scripts auxiliares**
   - Scripts de upload FTP
   - Scripts de verificación
   - Scripts de auditoría

2. **Modificación de código fuente**
   - Cambios en configuración (i18n, routing)
   - Actualizaciones de componentes
   - Fixes de bugs

3. **Rebuild y testing**
   ```bash
   npm run build
   npm run test:run
   ```

### Fase 3: Deployment y Verificación

1. **Upload a GoDaddy**
   ```bash
   node scripts/upload-critical-retry.cjs
   ```

2. **Auditoría post-deploy**
   ```bash
   node scripts/full-audit.cjs
   ```

3. **Verificación HTTP**
   ```bash
   curl -I https://productos.prilabsa.com/
   ```

### Fase 4: Documentación

1. **Actualizar CLAUDE.md**
   - Estado del proyecto
   - Problemas resueltos
   - Nuevos scripts creados

2. **Actualizar DEPLOYMENT-GODADDY.md**
   - Nuevos procedimientos
   - Errores y soluciones
   - Configuraciones actualizadas

3. **Commit y push**
   ```bash
   git add .
   git commit -m "descripción"
   git push
   ```

---

## Patrones de Trabajo

### Patrón 1: Resolución de Error HTTP

**Problema**: Error HTTP 500/403/404 en producción

**Workflow**:
```bash
# 1. Auditar servidor
node scripts/full-audit.cjs

# 2. Identificar causa raíz
# - Archivos faltantes
# - Directorio incorrecto
# - Permisos incorrectos

# 3. Crear/ajustar script de fix
# Ejemplo: upload-critical-retry.cjs

# 4. Deploy fix
node scripts/upload-critical-retry.cjs

# 5. Verificar
curl -I https://productos.prilabsa.com/
```

**Ejemplo Real**: HTTP 403 → Files en directorio incorrecto
- **Causa**: `.ftpconfig.json` con `remoteRoot: "/public_html"`
- **Fix**: Cambiar a `remoteRoot: "/public_html/productos.prilabsa.com"`
- **Verificación**: Sitio accesible con HTTP 200

---

### Patrón 2: Cambio de Configuración

**Problema**: Cambiar comportamiento de la aplicación (ej: idioma por defecto)

**Workflow**:
```bash
# 1. Identificar archivos a modificar
# - src/contexts/LanguageContext.tsx
# - src/i18n/config.ts

# 2. Realizar cambios
# Modificar getInitialLanguage() para retornar 'es'

# 3. Rebuild
npm run build

# 4. Deploy
node scripts/upload-critical-retry.cjs

# 5. Verificar
curl -sL https://productos.prilabsa.com/productos | grep 'lang='
```

**Ejemplo Real**: Forzar español por defecto
- **Archivos**: `LanguageContext.tsx:37`, `i18n/config.ts:22`
- **Cambios**: Remover auto-detección de navegador
- **Resultado**: Siempre carga en español

---

### Patrón 3: Creación de Scripts Auxiliares

**Necesidad**: Automatizar tarea repetitiva (ej: upload FTP)

**Workflow**:
```bash
# 1. Definir requisitos
# - ¿Qué archivos subir?
# - ¿Qué verificar?
# - ¿Manejo de errores?

# 2. Crear script en scripts/
# Ejemplo: upload-critical-retry.cjs

# 3. Probar localmente
node scripts/upload-critical-retry.cjs

# 4. Documentar en package.json
# "deploy:critical": "node scripts/upload-critical-retry.cjs"

# 5. Actualizar documentación
# Agregar a DEPLOYMENT-GODADDY.md
```

**Scripts Creados en Fase 1**:
- `upload-critical-retry.cjs` - Upload con retry
- `upload-all-fast.cjs` - Upload completo
- `upload-assets-only.cjs` - Solo assets
- `upload-images-and-htaccess.cjs` - Imágenes y .htaccess
- `full-audit.cjs` - Auditoría completa
- `fix-permissions.cjs` - Fix permisos Unix

---

## Comandos Frecuentes

### Build y Testing

```bash
# Build completo con validaciones
npm run build

# Build rápido (desarrollo)
npm run build:fast

# Build + análisis de bundle
npm run build:analyze

# Tests
npm run test
npm run test:run
npm run test:coverage

# Linting
npm run lint
npm run lint:fix

# Type checking
npm run type-check
```

### Deployment

```bash
# Deploy completo (recomendado)
node scripts/upload-critical-retry.cjs

# Deploy todo (primera vez)
node scripts/upload-all-fast.cjs

# Solo actualizar assets
node scripts/upload-assets-only.cjs

# Solo imágenes y .htaccess
node scripts/upload-images-and-htaccess.cjs
```

### Verificación

```bash
# Auditoría completa del servidor
node scripts/full-audit.cjs

# Verificar redirect
curl -I https://productos.prilabsa.com/

# Verificar página
curl -I https://productos.prilabsa.com/productos

# Verificar logos
curl -I https://productos.prilabsa.com/images/logos/prilabsa-logo.png

# Verificar bundles
curl -I https://productos.prilabsa.com/assets/index-BWNJVzSa.js

# Verificar idioma
curl -sL https://productos.prilabsa.com/productos | grep -o '<html[^>]*lang="[^"]*"'
```

### Git Workflow

```bash
# Estado actual
git status

# Ver cambios
git diff

# Agregar archivos
git add .

# Commit
git commit -m "descripción del cambio"

# Push
git push origin main

# Ver log
git log --oneline -10
```

---

## Mejores Prácticas

### 1. Documentación Continua

**Regla**: Documentar mientras desarrollas, no después

**Implementación**:
- Actualizar CLAUDE.md con cada cambio significativo
- Documentar nuevos scripts en DEPLOYMENT-GODADDY.md
- Agregar comentarios en código para decisiones no obvias

**Ejemplo**:
```typescript
// SIEMPRE español por defecto, no detectar navegador
return 'es';
```

---

### 2. Verificación Exhaustiva

**Regla**: Verificar SIEMPRE antes de considerar completado

**Checklist post-deployment**:
- [ ] Sitio carga sin errores (HTTP 200)
- [ ] Redirect funciona (/ → /productos)
- [ ] Logos cargan correctamente
- [ ] Bundles JS/CSS cargan
- [ ] Idioma correcto por defecto
- [ ] Routing SPA funciona

**Script de verificación**:
```bash
# Ejecutar todos los tests de verificación
npm run test:deployment  # (pendiente crear)
```

---

### 3. Scripts Reutilizables

**Regla**: Si lo haces más de 2 veces, crea un script

**Patrón**:
```javascript
// scripts/nombre-descriptivo.cjs
const { Client } = require('basic-ftp');
const config = require('../.ftpconfig.json');

async function main() {
  const client = new Client();
  try {
    await client.access(config);
    // Lógica del script
    console.log('✅ Success');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  } finally {
    client.close();
  }
}

main();
```

---

### 4. Manejo de Errores

**Regla**: Siempre implementar retry y fallback

**Ejemplo**:
```javascript
async function uploadWithRetry(file, maxAttempts = 3) {
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      await client.uploadFrom(file);
      console.log(`✓ ${file}`);
      return;
    } catch (err) {
      attempts++;
      if (attempts >= maxAttempts) {
        throw err;
      }
      console.log(`⚠ Retry ${attempts}/${maxAttempts}...`);
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}
```

---

### 5. Seguridad en Credentials

**Regla**: NUNCA commitear credenciales

**Archivos sensibles**:
- `.ftpconfig.json`
- `.env`
- Cualquier archivo con passwords

**Verificar .gitignore**:
```gitignore
.ftpconfig.json
.env
.env.local
*.key
*.pem
```

---

## Troubleshooting con Claude

### Caso 1: Error HTTP 500

**Síntomas**:
```
GET https://productos.prilabsa.com/ 500 Internal Server Error
```

**Workflow con Claude**:
1. Claude analiza logs y estado del servidor
2. Claude crea script de auditoría (`full-audit.cjs`)
3. Claude identifica causa raíz (archivos no subidos)
4. Claude crea script de fix (`upload-all-fast.cjs`)
5. Claude verifica deployment exitoso

**Tiempo de resolución**: ~15 minutos

---

### Caso 2: Assets no cargan (404)

**Síntomas**:
```
GET /assets/index-XYZ.js 404 Not Found
```

**Workflow con Claude**:
1. Claude verifica bundles en dist/
2. Claude compara con HTML referencias
3. Claude identifica mismatch de nombres
4. Claude ejecuta rebuild + redeploy
5. Claude verifica bundles cargando

**Tiempo de resolución**: ~5 minutos

---

### Caso 3: Configuración incorrecta

**Síntomas**:
```
Sitio carga en inglés en lugar de español
```

**Workflow con Claude**:
1. Claude analiza configuración i18n
2. Claude identifica auto-detección activa
3. Claude modifica `LanguageContext.tsx` y `i18n/config.ts`
4. Claude rebuilds + redeploy
5. Claude verifica idioma por defecto

**Tiempo de resolución**: ~10 minutos

---

## Notas Finales

### Aprendizajes de Fase 1

1. **GoDaddy requiere subdomain directory correcto**
   - No subir a `/public_html/`
   - Usar `/public_html/productos.prilabsa.com/`

2. **.htaccess es crítico para SPA routing**
   - Redirect root → /productos
   - Fallback a index.html para rutas
   - Security headers y caching

3. **FTP timeout es común con bulk uploads**
   - Usar passive mode generalmente
   - Implementar retry logic
   - Timeout mínimo 120 segundos

4. **Documentación proactiva ahorra tiempo**
   - CLAUDE.md como source of truth
   - DEPLOYMENT-GODADDY.md como guía paso a paso
   - Scripts documentados y reutilizables

### Preparación para Fase 2

**Objetivos**:
- Implementar test suite exhaustivo
- Crear CI/CD pipeline automatizado
- Integración con CMS WordPress
- SEO optimization completo
- Analytics integration

**Herramientas a explorar**:
- GitHub Actions (CI/CD)
- Playwright (E2E testing)
- Lighthouse (Performance)
- Google Analytics + Meta Pixel

---

**Última actualización**: 2025-11-24
**Fase actual**: Fase 1 Completa ✅
**Próxima fase**: Fase 2 - Funcionalidades Avanzadas
**Mantenido por**: SOLARIA AGENCY / Prilabsa Development Team
