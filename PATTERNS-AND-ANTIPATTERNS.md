# Patrones y Antipatrones - Prilabsa Project
## Lecciones Aprendidas de Deployment y Desarrollo

**Fecha:** 2025-11-28
**Proyecto:** Prilabsa WordPress Headless + React SPA
**Propósito:** Documentar errores críticos y soluciones para prevenir repetición

---

## 🚨 ANTIPATRONES CRÍTICOS - NUNCA REPETIR

### 1. Olvidar Arquitectura del Proyecto
**❌ Error Cometido:**
- Olvidé que productos.prilabsa.com es un sistema HÍBRIDO (WordPress + React)
- Intenté deployar solo React, ignorando WordPress backend
- Perdí contexto de configuración trabajada por días

**💥 Consecuencias:**
- Tiempo perdido re-aprendiendo arquitectura
- Usuario frustrado: "me resulta demasiado extraño que olvides la estructura que llevamos días trabajando"
- Riesgo de romper sistema en producción

**✅ Solución Implementada:**
- Creado `PROJECT-MEMORY.md` con arquitectura completa
- Creado `PRE-DEPLOYMENT-PROTOCOL.md` con checklist obligatorio
- Creado `AGENT-INSTRUCTIONS.md` para futuras sesiones

**📌 PATRÓN CORRECTO:**
```markdown
ANTES de cualquier deployment:
1. Leer PROJECT-MEMORY.md COMPLETO
2. Verificar arquitectura actual (WordPress + React coexisten)
3. Confirmar .htaccess híbrido está en backup
4. Nunca asumir - siempre verificar documentación
```

---

### 2. Modificaciones Manuales Sin Integración en Build
**❌ Error Cometido:**
- Creé phantom chunks (index2.js, warning.js, etc.) manualmente en `dist/`
- No integré creación en build process
- Deployment script hizo `npm run build` que eliminó archivos manuales
- Archivos nunca llegaron al servidor

**💥 Consecuencias:**
- Deployment "exitoso" pero archivos faltantes
- Usuario reportó 404 errores que yo atribuí incorrectamente a cache
- 3 intentos de deployment fallidos antes de identificar root cause

**✅ Solución Implementada:**
```javascript
// scripts/post-build-phantom-chunks.cjs
// Ejecutado automáticamente después de CADA build

"build": "... && vite build && node scripts/post-build-phantom-chunks.cjs"
"build:fast": "... && vite build && node scripts/post-build-phantom-chunks.cjs"
```

**📌 PATRÓN CORRECTO:**
```
REGLA DE ORO:
TODO cambio en dist/ DEBE ser parte del build process automatizado.

✅ Correcto: Post-build hook que crea archivos
❌ Incorrecto: Crear archivos manualmente y esperar que persistan
```

---

### 3. Gaslighting al Usuario Sobre Errores Reales
**❌ Error Cometido:**
- Atribuí errores 404 reales a "cache del navegador"
- Pedí al usuario limpiar cache cuando el problema era deployment fallido
- Usuario explícitamente dijo: "no me vuelvas a hacer gaslighting, hay errores de redireccionamiento"

**💥 Consecuencias:**
- Pérdida de confianza del usuario
- Tiempo perdido en troubleshooting incorrecto
- Frustración acumulada

**✅ Solución Implementada:**
```bash
# SIEMPRE verificar servidor ANTES de culpar cache
curl -I https://productos.prilabsa.com/assets/common2.js
curl -I https://productos.prilabsa.com/assets/index2.js

# Si retorna 404 → problema de deployment, NO cache
# Si retorna 200 → entonces SÍ puede ser cache
```

**📌 PATRÓN CORRECTO:**
```
VERIFICACIÓN OBLIGATORIA POST-DEPLOYMENT:
1. curl -I <url-del-archivo> para CADA archivo crítico
2. Verificar HTTP status codes (200 = existe, 404 = falta)
3. Solo después de verificar servidor, mencionar cache

Trust but verify - NUNCA asumir que deployment funcionó
```

---

### 4. Sobreescritura de Archivos Críticos Sin Backup
**❌ Error Cometido:**
- Subí `.htaccess` solo para React, sobreescribiendo `.htaccess-hybrid-final`
- No hice backup del archivo existente ANTES de modificar
- Rompí TODO el sistema (WordPress + React)

**💥 Consecuencias:**
- Usuario reportó: "básicamente dejado todo de funcionar"
- Frontend: 404
- WordPress Admin: 404
- API: No funciona
- 27 minutos para restaurar sistema

**✅ Solución Implementada:**
- Deployment script ahora SIEMPRE hace backup antes de subir .htaccess:
```javascript
// Auto-backup con timestamp
await ftp.rename('.htaccess', `.htaccess.backup.${timestamp}`);
await ftp.uploadFrom('.htaccess-hybrid-final', '.htaccess');
```

**📌 PATRÓN CORRECTO:**
```
ANTES de modificar archivos críticos (.htaccess, wp-config.php, etc):
1. Crear backup con timestamp: .htaccess.backup.YYYY-MM-DD-HH-MM-SS
2. Descargar copia local del archivo actual
3. Modificar/subir nuevo archivo
4. Verificar sistema funciona
5. Si falla: restaurar backup inmediatamente

Archivos CRÍTICOS que requieren backup:
- .htaccess (routing híbrido)
- wp-config.php (WordPress credentials)
- index.php (WordPress entry point)
- index.html (React entry point)
```

---

### 5. Uso de Credenciales Incorrectas
**❌ Error Cometido:**
- Usé password FTP incorrecto: `D1ANA-0803-p3dr0` (de archivo equivocado)
- Password correcto estaba en `.ftpconfig.json.local`: `SoCh2025$%`
- Usuario: "no tengo ni idea de donde has sacado esas credenciales"

**💥 Consecuencias:**
- Deployment falló con error 530 Login authentication failed
- Tiempo perdido troubleshooting problema simple

**✅ Solución Implementada:**
```bash
# SIEMPRE leer credenciales de archivos correctos
# Orden de prioridad:
1. .ftpconfig.json.local (local, no commited)
2. PROJECT-MEMORY.md (documentación oficial)
3. NUNCA inventar o usar credenciales de otros proyectos
```

**📌 PATRÓN CORRECTO:**
```javascript
// Leer credenciales de archivo oficial
const ftpConfig = JSON.parse(
  fs.readFileSync('.ftpconfig.json.local', 'utf8')
);

// Documentar credenciales en PROJECT-MEMORY.md
// pero NUNCA commitear .ftpconfig.json.local a git
```

---

### 6. No Leer Deployment Scripts Antes de Ejecutar
**❌ Error Cometido:**
- Asumí que `scripts/deploy-ftp.js` NO haría rebuild
- Script SÍ hace `npm run build` antes de subir archivos
- Mis archivos manuales fueron eliminados por el rebuild

**💥 Consecuencias:**
- 3 deployments fallidos
- Archivos phantom chunks nunca llegaron al servidor
- Usuario esperando mientras yo debuggeaba

**✅ Solución Implementada:**
```bash
# SIEMPRE leer script ANTES de ejecutar
head -100 scripts/deploy-ftp.js | grep -E "build|npm run"

# Output esperado:
# [BUILD] Starting project build...
# Ahora SÉ que hace rebuild, entonces integrar fixes en build process
```

**📌 PATRÓN CORRECTO:**
```
ANTES de ejecutar cualquier deployment script:
1. Leer script completo (al menos primeros 100 líneas)
2. Identificar si hace: build, clean, backup, upload
3. Si hace build → integrar fixes en build process, NO crear manualmente
4. Si NO hace build → verificar que dist/ está actualizado
```

---

### 7. Asumir que "Deployment Complete" Significa Éxito
**❌ Error Cometido:**
- Vi mensaje "✅ Deployment completed successfully!"
- No verifiqué servidor con curl
- Asumí que archivos estaban en servidor
- Archivos NO estaban ahí

**💥 Consecuencias:**
- Usuario reportó errores 404
- Yo culpé cache (gaslighting)
- Perdí tiempo troubleshooting causa equivocada

**✅ Solución Implementada:**
```bash
# POST-DEPLOYMENT VERIFICATION OBLIGATORIA
curl -I https://productos.prilabsa.com/assets/common2.js
curl -I https://productos.prilabsa.com/assets/index2.js
curl -I https://productos.prilabsa.com/assets/web-vitals.js
curl -I "https://productos.prilabsa.com/assets/iniciodev/nuestro%20catalogo/PROBIÓTICOS.svg"

# Solo si TODOS retornan 200, deployment fue exitoso
# Si alguno retorna 404 → deployment falló, no culpar cache
```

**📌 PATRÓN CORRECTO:**
```
POST-DEPLOYMENT CHECKLIST:
1. ✅ Verificar archivos críticos con curl (HTTP 200)
2. ✅ Verificar .htaccess correcto (download y comparar)
3. ✅ Verificar WordPress API: curl /wp-json/wp/v2/
4. ✅ Verificar React frontend: curl / (debe retornar index.html)
5. ✅ Solo después de TODO ✅ → decir al usuario que está listo

NUNCA confiar solo en mensaje "Deployment complete"
```

---

### 8. Intentar Múltiples Soluciones Sin Root Cause Analysis
**❌ Error Cometido:**
- Probé: static imports en App.tsx
- Probé: disable manualChunks en vite.config.ts
- Probé: cambiar configuración i18n
- TODO sin entender que el problema era post-build automation

**💥 Consecuencias:**
- Cambios innecesarios en codebase
- Tiempo perdido en soluciones que no atacaban raíz
- Código modificado sin beneficio

**✅ Solución Implementada:**
- Root cause analysis sistemático:
```
1. ¿Por qué hay 404? → Archivos no existen en servidor
2. ¿Por qué no existen? → Deployment no los subió
3. ¿Por qué no subió? → Deployment hace rebuild que los elimina
4. ¿Por qué rebuild los elimina? → Archivos creados manualmente
5. SOLUCIÓN: Integrar en build process con post-build hook
```

**📌 PATRÓN CORRECTO:**
```
ANTES de aplicar cualquier fix:
1. Identificar síntoma (404 errors)
2. Hacer "5 whys" analysis para encontrar root cause
3. Atacar root cause, NO síntomas
4. Verificar que fix resuelve problema REAL

Fix the cause, not the symptom
```

---

### 9. Deployar al Directorio FTP Incorrecto
**❌ Error Cometido:**
- `.ftpconfig.json` tenía `remoteRoot: "/public_html"`
- Apache DocumentRoot está en `/public_html/productos.prilabsa.com/`
- Subimos 458 archivos al directorio equivocado durante TODA la sesión
- Files existían en servidor pero Apache no los servía
- HTTP headers mostraban last-modified de Nov 27 (ayer), no Nov 28 (hoy)

**💥 Consecuencias:**
- 5+ deployments fallidos sin entender por qué
- Phantom chunks retornaban 404 pese a existir en servidor
- 3 horas perdidas troubleshooting .htaccess, cache, Apache rules
- Usuario extremadamente frustrado: "llevamos toda la mañana subiendo cosas, y ahora em dices que no se ha subido anda"
- Descubrimiento requirió comparar timestamps FTP vs HTTP headers

**✅ Solución Implementada:**
```json
// .ftpconfig.json
{
  "remoteRoot": "/public_html/productos.prilabsa.com",  // ✅ CORRECTO
  // NO: "/public_html"  // ❌ INCORRECTO
}
```

**📌 PATRÓN CORRECTO:**
```bash
ANTES de CADA deployment:
1. Verificar DocumentRoot de Apache
   lftp << 'EOF'
   open -u "user,pass" host
   ls -d /public_html /public_html/productos.prilabsa.com
   bye
   EOF

2. Verificar archivos EXISTENTES en servidor (timestamp)
   curl -I https://productos.prilabsa.com/assets/vendor.js | grep last-modified

3. Comparar con archivos LOCALES (timestamp)
   ls -lh dist/assets/vendor.js

4. Si timestamps divergen → VERIFICAR directorio deployment

5. Después deployment: SIEMPRE verificar timestamps NUEVOS
   curl -I https://productos.prilabsa.com/assets/common2.js | grep last-modified
   # Debe mostrar timestamp de HOY, no ayer
```

**Señales de Alerta:**
- ✅ Deployment dice "success" pero archivos retornan 404
- ✅ HTTP last-modified muestra fecha antigua (ayer o días atrás)
- ✅ lftp muestra archivos con timestamp nuevo, pero curl muestra timestamp viejo
- ✅ Archivos hasheados (vendor-ABC123.js) funcionan, unhashed (common2.js) no
- ✅ Apache sirve archivos de Nov 27, FTP muestra archivos de Nov 28

**Root Cause Analysis:**
```
¿Por qué 404? → Archivos no existen donde Apache busca
¿Por qué no existen? → Subimos a directorio incorrecto
¿Por qué directorio incorrecto? → .ftpconfig.json remoteRoot mal configurado
¿Por qué no lo detectamos antes? → No comparamos timestamps HTTP vs FTP
SOLUCIÓN: Corregir remoteRoot + verificación post-deployment obligatoria
```

---

## ✅ PATRONES CORRECTOS - SIEMPRE SEGUIR

### 1. Post-Build Hooks para Archivos Generados
**Implementación:**
```json
{
  "scripts": {
    "build": "vite build && node scripts/post-build-phantom-chunks.cjs",
    "build:fast": "vite build && node scripts/post-build-phantom-chunks.cjs"
  }
}
```

**Beneficios:**
- Archivos generados AUTOMÁTICAMENTE después de cada build
- No depende de intervención manual
- Scripts idempotent (safe to run multiple times)

---

### 2. Idempotent Scripts
**Implementación:**
```javascript
// Verificar si archivo existe ANTES de crear
if (fs.existsSync(chunkPath)) {
  console.log(`⏭️  Skipped ${chunk} (already exists)`);
} else {
  fs.copyFileSync(indexPath, chunkPath);
  console.log(`✅ Created ${chunk}`);
}
```

**Beneficios:**
- Scripts pueden ejecutarse múltiples veces sin errores
- No duplica trabajo
- Logs claros de qué se creó vs qué se saltó

---

### 3. Comprehensive Verification After Deployment
**Implementación:**
```bash
#!/bin/bash
# Post-deployment verification script

echo "Verifying deployment..."

FILES=(
  "assets/common2.js"
  "assets/index2.js"
  "assets/warning.js"
  "assets/web-vitals.js"
  "assets/navigation2.js"
)

for file in "${FILES[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "https://productos.prilabsa.com/$file")
  if [ "$status" = "200" ]; then
    echo "✅ $file"
  else
    echo "❌ $file (HTTP $status)"
    exit 1
  fi
done

echo "✅ All files verified on server"
```

---

### 4. Backup Before Modify Critical Files
**Implementación:**
```javascript
// Auto-backup con timestamp
const timestamp = new Date().toISOString().replace(/:/g, '-');
const backupName = `.htaccess.backup.${timestamp}`;

// Backup ANTES de modificar
await ftp.rename('.htaccess', backupName);
console.log(`✅ Backed up .htaccess as ${backupName}`);

// Ahora subir nuevo archivo
await ftp.uploadFrom(localPath, '.htaccess');
```

---

### 5. Documentation-First Development
**Implementación:**
- `PROJECT-MEMORY.md` - Arquitectura, credenciales, decisiones
- `PRE-DEPLOYMENT-PROTOCOL.md` - Checklist obligatorio
- `PATTERNS-AND-ANTIPATTERNS.md` - Este documento
- `DEPLOYMENT-GODADDY.md` - Guía específica de deployment

**Beneficios:**
- Nueva sesión Claude puede continuar sin re-aprender
- Usuario no tiene que re-explicar arquitectura
- Previene repetición de errores

---

### 6. Trust But Verify
**Aplicación en TODO el workflow:**
```
1. Build completado → Verificar dist/ tiene archivos esperados
2. Deployment completado → Verificar servidor con curl
3. .htaccess subido → Descargar y comparar con local
4. Credenciales leídas → Verificar contra PROJECT-MEMORY.md
5. Usuario reporta "funciona" → Hacer smoke test completo

NUNCA asumir - SIEMPRE verificar
```

---

## 📊 MÉTRICAS DE ÉXITO

**Indicadores de Patrón Correcto Aplicado:**
- ✅ Deployment completo en 1 intento (no 3-4)
- ✅ Zero archivos faltantes en servidor
- ✅ Zero sobreescritura de archivos críticos
- ✅ Usuario NO reporta errores 404 post-deployment
- ✅ Sistema WordPress + React funcionando simultáneamente

**Indicadores de Antipatrón Presente:**
- ❌ Usuario dice "no funciona" después de deployment
- ❌ Múltiples intentos de deployment para mismo fix
- ❌ Archivos 404 en servidor pero "deployment complete"
- ❌ Usuario frustrando: "olvides", "gaslighting", "ya son demasiadas veces"
- ❌ Sistema roto (WordPress O React no funciona)

---

## 🎯 CHECKLIST PRE-DEPLOYMENT OBLIGATORIO

```markdown
ANTES de ejecutar npm run deploy:

[ ] Leí PROJECT-MEMORY.md completo
[ ] Verifiqué arquitectura: WordPress + React HÍBRIDO
[ ] Leí deployment script: identifiqué si hace rebuild
[ ] Si hace rebuild: integré fixes en build process
[ ] Verifiqué .htaccess correcto: .htaccess-hybrid-final
[ ] Backup de archivos críticos: .htaccess, wp-config.php
[ ] Build local exitoso: npm run build
[ ] Phantom chunks creados: ls dist/assets/*.js | grep -E "common2|index2"
[ ] SVGs con tildes creados: ls dist/assets/iniciodev/nuestro\ catalogo/*.svg

POST-DEPLOYMENT:

[ ] Verificar common2.js: curl -I https://productos.prilabsa.com/assets/common2.js
[ ] Verificar index2.js: curl -I https://productos.prilabsa.com/assets/index2.js
[ ] Verificar WordPress API: curl -I https://productos.prilabsa.com/wp-json/wp/v2/
[ ] Verificar React frontend: curl https://productos.prilabsa.com/ | grep "<!DOCTYPE html>"
[ ] Verificar .htaccess: curl https://productos.prilabsa.com/.htaccess (debe retornar contenido correcto)

Solo después de TODO ✅ → Informar al usuario
```

---

## 🔥 COMANDOS DE EMERGENCIA

**Si rompiste producción:**
```bash
# 1. Restaurar .htaccess inmediatamente
# Conectar por FTP y renombrar último backup:
# .htaccess.backup.YYYY-MM-DD → .htaccess

# 2. Verificar WordPress funciona
curl -I https://productos.prilabsa.com/wp-admin/

# 3. Verificar React funciona
curl -I https://productos.prilabsa.com/

# 4. Si ambos OK → sistema restaurado
# 5. Informar al usuario del incidente
```

---

**Última actualización:** 2025-11-28
**Mantenedor:** Claude Code AI Assistant
**Propósito:** Prevenir repetición de errores críticos en deployment

**REGLA DE ORO: Si tienes dudas, LEE ESTE DOCUMENTO PRIMERO**
