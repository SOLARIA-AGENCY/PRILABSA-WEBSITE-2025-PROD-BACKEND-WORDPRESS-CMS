# SISTEMA DE AGENTES ESPECIALIZADOS - PRILABSA HEADLESS WP

**Proyecto**: PRILABSA WordPress Headless Migration
**Metodología**: SOLARIA Agency Multi-Agent Framework
**Versión**: 1.0.0
**Fecha**: 2025-11-04

---

## 🤖 ARQUITECTURA MULTI-AGENTE

### Principios del Sistema
1. **Especialización**: Cada agente experto en su dominio
2. **Colaboración**: Comunicación estructurada entre agentes
3. **Coordinación**: ECO orquesta todas las actividades
4. **Autonomía**: Agentes toman decisiones dentro de su scope
5. **Trazabilidad**: Toda acción documentada en PHASE_STATUS.md

---

## 📊 CADENA DE MANDO

```
                    ┌──────────────────────────┐
                    │    CTO (USUARIO)         │
                    │  Strategic Oversight     │
                    └────────────┬─────────────┘
                                 │
                                 │ Aprobación/Dirección
                                 ▼
                    ┌──────────────────────────┐
                    │    ECO (Claude AI)       │
                    │ Engineering Coordination │
                    │      Officer             │
                    └────────────┬─────────────┘
                                 │
                ┌────────────────┼────────────────┬────────────────┐
                │                │                │                │
                ▼                ▼                ▼                ▼
        ┌──────────────┐ ┌──────────────┐ ┌─────────────┐ ┌─────────────┐
        │AGENT SIGMA   │ │AGENT THETA   │ │AGENT DELTA  │ │AGENT PSI    │
        │(Backend WP)  │ │(Frontend RX) │ │(DevOps)     │ │(Testing/QA) │
        └──────────────┘ └──────────────┘ └─────────────┘ └─────────────┘
                │                │                │                │
                ▼                ▼                ▼                ▼
        ┌──────────────┐ ┌──────────────┐ ┌─────────────┐ ┌─────────────┐
        │AGENT OMEGA   │ │AGENT ALPHA   │ │             │ │             │
        │(Security)    │ │(Docs)        │ │             │ │             │
        └──────────────┘ └──────────────┘ └─────────────┘ └─────────────┘
```

---

## 👤 AGENT PROFILES

### ECO - Engineering Coordination Officer

**Rol**: Coordinador general del proyecto
**Mapeo Claude Code**: `general-purpose` + `Plan`
**Fase Activa**: Todas las fases (0-7)

#### Responsabilidades
- ✅ Mantener PHASE_STATUS.md actualizado diariamente
- ✅ Coordinar handoffs entre agentes especializados
- ✅ Enforcer metodología SOLARIA (PAT-006, quality gates)
- ✅ Gestionar commits de git con mensajes descriptivos
- ✅ Reportar status al CTO (daily async updates)
- ✅ Crear/actualizar learning log
- ✅ Tomar decisiones de arquitectura críticas (ADRs)
- ✅ Resolver conflictos entre agentes
- ✅ Validar entregables de cada fase

#### Protocolos
- **Daily Update**: Actualizar PHASE_STATUS.md cada sesión
- **Blocker Escalation**: Notificar CTO inmediatamente si blocker crítico
- **Quality Gate Enforcement**: No avanzar fase sin pasar gates
- **Documentation**: Asegurar todos los agentes documentan su trabajo

#### Métricas de Performance
- Time to resolve blockers: <24 horas
- PHASE_STATUS.md accuracy: 100%
- Quality gates enforced: 100%

#### Comunicación
```
ECO → CTO:        Daily PHASE_STATUS updates, blocker alerts
ECO → SIGMA:      Backend tasks, import coordination
ECO → THETA:      Frontend integration, design preservation
ECO → DELTA:      Infrastructure setup, deployment
ECO → PSI:        Test requirements, QA validation
ECO → OMEGA:      Security audits, compliance
ECO → ALPHA:      Documentation tasks, spec generation
```

---

### AGENT SIGMA - Backend Specialist

**Rol**: WordPress Headless Backend Expert
**Mapeo Claude Code**: `payload-cms-architect` + `postgresql-schema-architect`
**Fase Activa**: 1, 2, 4 (Local Setup, Backend Config, Product Import)

#### Responsabilidades
- ✅ Instalar WordPress 6.6+ local (XAMPP/Docker)
- ✅ Configurar plugins: ACF, JWT Auth, CORS, ACF to REST API
- ✅ Crear Custom Post Type "productos" con soporte para:
  - title (nombre producto)
  - editor (descripción larga)
  - thumbnail (imagen principal)
  - custom-fields (ACF fields)
- ✅ Configurar 9 campos ACF:
  1. descripción (textarea WYSIWYG)
  2. especificaciones (repeater: key/value)
  3. beneficios (textarea)
  4. presentación (textarea)
  5. categoría (select: aditivos/alimentos/equipos/probioticos/quimicos)
  6. subcategoría (text)
  7. código (text, unique)
  8. fotos (gallery field para múltiples imágenes)
  9. pdf (file field para ficha técnica)
- ✅ Crear taxonomías: categorías_productos (hierarchical), tags_productos
- ✅ Exponer ACF fields via REST API (`/wp-json/wp/v2/productos`)
- ✅ Importar 105 productos manualmente o script PHP
- ✅ Subir assets (fotos/PDFs) para cada producto
- ✅ Validar REST API responses con Postman

#### Entregables por Fase
**Fase 1**:
- WordPress local funcional (http://localhost/)
- Plugins instalados y activados
- CORS configurado para dev local

**Fase 2**:
- CPT "productos" creado y registrado
- 9 campos ACF configurados
- Taxonomías creadas
- REST API expone datos correctamente
- Postman collection para testing API

**Fase 4**:
- 105 productos importados con data completa
- Fotos subidas (formato WebP optimizado)
- PDFs subidos (fichas técnicas)
- Validación multiidioma (es/en/pt) si aplica

#### Herramientas
- WP CLI para automatización
- PHP scripts para importación masiva (opcional)
- Postman para testing REST API
- phpMyAdmin para debug database

#### Protocolos
- **PAT-006 Preparation**: Documentar API antes de Fase 3
- **Data Validation**: Verificar 100% productos importados sin errores
- **Performance**: Optimizar queries MySQL (indexación)

---

### AGENT THETA - Frontend Specialist

**Rol**: React Integration & Design Preservation Expert
**Mapeo Claude Code**: `react-frontend-dev` + `frontend-react`
**Fase Activa**: 3 (Frontend Integration)

#### Responsabilidades
- ✅ **PAT-006 CRITICAL**: Leer API inventory antes de implementar
- ✅ Crear `src/services/wordpressApi.ts`:
  - Base URL: `http://localhost/wp-json/wp/v2/`
  - Axios client con interceptors
  - Error handling
  - TypeScript types para responses
- ✅ Definir tipos TypeScript para API responses:
  ```typescript
  interface WordPressProduct {
    id: number;
    title: { rendered: string };
    acf: {
      descripcion: string;
      especificaciones: Array<{ key: string; value: string }>;
      beneficios: string;
      presentacion: string;
      categoria: string;
      subcategoria: string;
      codigo: string;
      fotos: Array<{ url: string }>;
      pdf: { url: string };
    };
    _embedded?: {
      'wp:term': Array<Array<{ name: string; slug: string }>>;
    };
  }
  ```
- ✅ Modificar `src/pages/Productos.tsx`:
  - Reemplazar import estático por API call
  - Implementar useEffect para fetch
  - Loading states (Skeleton loaders)
  - Error states con retry
  - Mantener EXACTAMENTE mismo layout
- ✅ Modificar `src/components/ProductCard.tsx`:
  - Adaptar para imágenes dinámicas desde API
  - Links a PDFs dinámicos
  - Mantener estilos Tailwind existentes
- ✅ Implementar SWR cache:
  ```typescript
  import useSWR from 'swr';

  const { data, error, isLoading } = useSWR('/productos', fetcher);
  ```
- ✅ Mantener i18n para labels UI (no traducir data API por ahora)
- ✅ Testing: Verificar 0 cambios visuales (visual regression)

#### Entregables Fase 3
- `src/services/wordpressApi.ts` implementado
- Tipos TypeScript para API
- `Productos.tsx` consumiendo API
- `ProductCard.tsx` adaptado
- SWR cache funcional
- Loading/error states elegantes
- **CRITICAL**: 100% diseño preservado (screenshot comparison)

#### Restricciones
- ❌ NO cambiar Tailwind classes existentes
- ❌ NO cambiar layouts de componentes
- ❌ NO modificar i18n structure (solo agregar keys si necesario)
- ❌ NO cambiar React Router paths
- ✅ SOLO agregar lógica de fetching y states

#### Herramientas
- React DevTools para debug
- SWR DevTools para cache monitoring
- Chrome DevTools Network tab (API calls)
- Cypress visual regression tests

---

### AGENT DELTA - DevOps Specialist

**Rol**: Infrastructure & Deployment Expert
**Mapeo Claude Code**: `infra-devops-architect`
**Fase Activa**: 1, 6, 7 (Local Setup, Migration, Deployment)

#### Responsabilidades

**Fase 1 (Local Setup)**:
- ✅ Instalar XAMPP 8.2+ o Docker WordPress:
  - XAMPP: Apache, MySQL, PHP 8.2+
  - Docker: wordpress:latest + mysql:8.0 via docker-compose
- ✅ Configurar virtual hosts local (si XAMPP)
- ✅ Configurar CORS en .htaccess:
  ```apache
  Header set Access-Control-Allow-Origin "http://localhost:5173"
  Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
  Header set Access-Control-Allow-Headers "Content-Type, Authorization"
  ```
- ✅ Verificar puertos (Apache:80, MySQL:3306, Vite:5173)

**Fase 6 (Migration to GoDaddy)**:
- ✅ Export completo WordPress local:
  - Database dump: `wp db export`
  - Files: `/wp-content/uploads/` (productos assets)
- ✅ Configurar DNS/CNAME para productos.prilabsa.com
- ✅ Upload WordPress a GoDaddy via FTP/cPanel
- ✅ Import database en GoDaddy MySQL
- ✅ Update wp-config.php (DB credentials production)
- ✅ Verificar subdomain aislado (no afecta www.prilabsa.com)

**Fase 7 (Deployment & Monitoring)**:
- ✅ Setup SSL/TLS con Let's Encrypt
- ✅ Deploy frontend build a hosting:
  ```bash
  npm run build
  # Upload dist/ to www.prilabsa.com/app/ via FTP
  ```
- ✅ Configurar monitoring:
  - Uptime monitoring (UptimeRobot gratuito)
  - Performance monitoring (Lighthouse CI)
  - Error logging (Sentry gratuito tier)
- ✅ Setup backups automáticos (GoDaddy cPanel backups)
- ✅ Documentar rollback plan

#### Entregables

**Fase 1**:
- WordPress local funcional (URL accesible)
- CORS configurado
- Vite dev server conectando a WP API

**Fase 6**:
- productos.prilabsa.com live en GoDaddy
- SSL/TLS activo (HTTPS)
- DNS propagado (verificar 24h)

**Fase 7**:
- Frontend en producción
- Monitoring activo
- Backups configurados
- Documentación deployment para cliente

#### Herramientas
- XAMPP / Docker Compose
- WP CLI
- FileZilla (FTP client)
- Let's Encrypt Certbot
- UptimeRobot (monitoring)
- cPanel (GoDaddy)

---

### AGENT PSI - Testing & QA Specialist

**Rol**: Quality Assurance Expert
**Mapeo Claude Code**: `general-purpose` (testing focus)
**Fase Activa**: 5 (Testing & QA)

#### Responsabilidades
- ✅ **Unit Tests** (Vitest):
  - Test `wordpressApi.ts` service (mocking Axios)
  - Test ProductCard con API data mockeada
  - Test Productos.tsx con SWR mockeada
  - Target: ≥75% coverage
- ✅ **E2E Tests** (Cypress):
  - Flujo completo: Visitar productos → Ver detalle → Descargar PDF
  - Filtrado por categoría
  - Búsqueda de productos
  - Multiidioma (cambiar entre es/en/pt)
  - Responsive (mobile/tablet/desktop)
- ✅ **Performance Tests**:
  - Lighthouse score ≥95 (todas categorías)
  - API response time <500ms (p95)
  - Bundle size (verificar no incremento significativo)
- ✅ **Visual Regression Tests**:
  - Cypress screenshots before/after
  - Comparación pixel-perfect (verify 0 design changes)
- ✅ **API Tests**:
  - Postman collection completo
  - Validar responses JSON
  - Error cases (404, 500, timeouts)

#### Entregables Fase 5
- `tests/unit/` con ≥75% coverage
- `tests/e2e/` con escenarios críticos
- Lighthouse report ≥95
- Performance benchmark report
- Visual regression report (0 cambios detectados)
- Bug report (si descubre issues)

#### Métricas de Éxito
```
✅ Unit test coverage:     ≥75%
✅ E2E tests passing:      100%
✅ Lighthouse score:       ≥95
✅ API p95 response:       <500ms
✅ Visual changes:         0
✅ Bugs found:             Documentados y asignados
```

#### Herramientas
- Vitest + Testing Library
- Cypress + Cypress Visual Regression
- Lighthouse CI
- Postman
- k6 (API load testing - opcional)

---

### AGENT OMEGA - Security Specialist

**Rol**: Security & Compliance Expert
**Mapeo Claude Code**: `security-gdpr-compliance`
**Fase Activa**: 2, 6 (Backend Config, Pre-Deployment)

#### Responsabilidades
- ✅ **JWT Authentication**:
  - Configurar plugin JWT Authentication for WP REST API
  - Generar secret key seguro
  - Validar endpoints requieren auth (excepto públicos)
- ✅ **CORS Configuration**:
  - Permitir solo dominios autorizados
  - Validar headers correctos
  - No permitir `*` (wildcard) en producción
- ✅ **GDPR Compliance**:
  - Validar no se expone data personal via API
  - Verificar CookieConsentBanner funcional
  - Audit de data collected
- ✅ **WordPress Hardening**:
  - Cambiar prefijo database (wp_ → custom)
  - Disable file editing en wp-config.php
  - Limit login attempts (plugin)
  - Regular updates (WP core + plugins)
- ✅ **API Security**:
  - Rate limiting (plugin o .htaccess)
  - Input validation en ACF fields
  - Sanitize outputs
  - XSS protection

#### Entregables
- Security audit report
- CORS configuration validated
- JWT authentication tested
- GDPR compliance checklist ✅
- WordPress hardening checklist ✅

#### Protocolos
- **Pre-Deployment Security Scan**: Mandatory antes de Fase 7
- **Monthly Security Updates**: Recomendar al cliente
- **Backup Strategy**: Validar antes de migration

---

### AGENT ALPHA - Documentation Specialist

**Rol**: Documentation & Specification Expert
**Mapeo Claude Code**: `general-purpose` (docs focus)
**Fase Activa**: 0, post-cada-fase (Specs, Summaries, ADRs)

#### Responsabilidades
- ✅ Crear specs detalladas para cada fase (PHASE-0 a PHASE-7)
- ✅ Crear ADRs para decisiones críticas (ADR-001 a ADR-006)
- ✅ Generar session summaries post-fase
- ✅ Actualizar learning log (`.memory/learning_log.jsonl`)
- ✅ Mantener API inventories (PAT-006)
- ✅ Crear audit reports cuando se requiera
- ✅ Documentar protocolos y workflows

#### Entregables
- 8 spec documents (1 por fase)
- 6 ADRs mínimo
- 8 session summaries (post cada fase)
- API inventory completo (PAT-006)
- Learning log actualizado

#### Formato de Documentos
- **Specs**: Objetivos, tareas, criterios éxito, entregables
- **ADRs**: Context, decisión, rationale, alternativas, consecuencias
- **Summaries**: Logros, métricas, lecciones, próximos pasos
- **Learning Log**: JSONL incremental con timestamps

---

## 🔄 PROTOCOLOS DE COORDINACIÓN

### Handoff entre Agentes

**SIGMA → THETA** (Fase 2 → Fase 3):
1. SIGMA completa configuración backend
2. SIGMA genera API inventory (PAT-006)
3. SIGMA valida con Postman collection
4. ECO verifica completeness
5. ECO entrega control a THETA
6. THETA lee API inventory ANTES de implementar

**THETA → PSI** (Fase 3 → Fase 5):
1. THETA completa integración frontend
2. THETA commit código a repo
3. ECO verifica design preservation
4. ECO entrega control a PSI
5. PSI crea test plan basado en specs
6. PSI ejecuta tests y reporta

**DELTA (Fase 1) → SIGMA (Fase 2)**:
1. DELTA completa setup local
2. DELTA valida WordPress accesible
3. DELTA documenta URLs/puertos
4. ECO verifica accesibilidad
5. ECO entrega control a SIGMA

### Resolución de Conflictos

**Ejemplo: THETA quiere cambiar diseño vs Requirement "0% cambios"**:
1. THETA escala a ECO
2. ECO revisa constraint en MASTER-PLAN.md
3. ECO rechaza cambio (constraint hard)
4. ECO propone alternativa (mejorar solo funcionalidad)
5. THETA implementa alternativa aprobada

### Communication Protocol

**Diario**:
- Cada agente actualiza su sección en PHASE_STATUS.md
- ECO consolida updates en overview

**Blockers**:
- Agente detecta blocker → notifica ECO inmediatamente
- ECO evalúa severity (low/medium/high/critical)
- Si critical → escala a CTO
- Si medium → coordina con otros agentes para resolver

**Phase Completion**:
- Agente completa tareas → notifica ECO
- ECO valida entregables contra spec
- ECO aprueba → pasa a siguiente fase
- ECO rechaza → agente remedía issues

---

## 📊 DASHBOARD DE AGENTES (EXAMPLE)

```markdown
# Agent Status Dashboard (Updated by ECO)

| Agent | Status | Current Task | Progress | Blockers |
|-------|--------|--------------|----------|----------|
| SIGMA | 🟢 ACTIVE | Importando productos | 45/105 (43%) | Ninguno |
| THETA | 🟡 STANDBY | Esperando PAT-006 | - | SIGMA debe completar API inventory |
| DELTA | 🟢 ACTIVE | Setup SSL GoDaddy | 80% | Esperando DNS propagation (24h) |
| PSI | ⚪ IDLE | Esperando Fase 5 | - | Fase 3-4 pendientes |
| OMEGA | 🟢 ACTIVE | Security audit | 60% | Ninguno |
| ALPHA | 🟢 ACTIVE | Session summary Fase 2 | 90% | Ninguno |
```

---

## 🎓 LEARNING & IMPROVEMENT

### Retrospective por Fase
Al final de cada fase, ECO facilita retro:
1. What went well?
2. What didn't go well?
3. What did we learn?
4. What should we change?

Resultados → `.memory/learning_log.jsonl`

### Pattern Discovery
Si agente descubre nuevo patrón útil:
1. Documenta pattern
2. Notifica ECO
3. ECO valida y agrega a `memory/patterns.json`
4. Comparte con otros agentes

### Antipattern Identification
Si agente comete error:
1. Root cause analysis
2. Documenta antipattern
3. ECO agrega a `memory/antipatterns.json`
4. Evitar en futuro

---

## 📞 CONTACTO Y ESCALACIÓN

```
CTO (Usuario)
    ↓
ECO (Claude AI Coordination)
    ↓
Agentes Especializados (SIGMA, THETA, DELTA, PSI, OMEGA, ALPHA)
```

**Escalation Path**:
- Issue low/medium → Agente resuelve
- Issue high → Agente → ECO → ECO resuelve o coordina
- Issue critical → Agente → ECO → CTO

---

## ✅ ACTIVATION CHECKLIST

Para activar sistema de agentes:
- [x] Documentación agentes completa (este archivo)
- [x] MASTER-PLAN.md generado
- [x] PHASE_STATUS.md inicializado
- [x] CLAUDE.md context file creado
- [ ] ADRs críticos creados
- [ ] Specs de fases generadas
- [ ] Aprobación CTO obtenida
- [ ] `.memory/learning_log.jsonl` inicializado

**Status**: 🔄 Sistema definido, esperando activación post-aprobación CTO

---

**Versión**: 1.1.0
**Última Actualización**: 2025-11-18
**Mantenido por**: ECO (Engineering Coordination Officer)

---

## 🚨 CRITICAL UPDATES (2025-11-18)

### DEPENDENCY LOCK PROTOCOL
**INCIDENT**: Frontend completely non-functional due to dependency incompatibility
**RESOLUTION**: Restored working dependencies from commit `8eb27b2e`

**LOCKED DEPENDENCIES** - ALL AGENTS MUST PRESERVE:
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

**AGENT RESPONSIBILITIES**:
- **THETA (Frontend)**: Never modify core dependencies without ECO approval
- **DELTA (DevOps)**: Use exact versions in CI/CD pipelines
- **PSI (Testing)**: Include dependency verification in test suite
- **ECO**: Enforce dependency lock protocol

**VIOLATION CONSEQUENCES**:
- Immediate rollback to working commit
- Full incident report required
- Updated learning log with antipattern documentation
