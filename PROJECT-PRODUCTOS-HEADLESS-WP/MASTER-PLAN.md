# PLAN MAESTRO: PRODUCTOS.PRILABSA.COM - WORDPRESS HEADLESS MIGRATION

**Proyecto**: PRILABSA Catálogo Dinámico de Productos
**Repositorio**: SOLARIA-AGENCY/PRILABSA-WEBSITE-2025-PROD-BACKEND-WORDPRESS-CMS
**Metodología**: SOLARIA Agency Development Framework
**Status**: 🔄 FASE PLANIFICACIÓN (SPEC-DRIVEN)
**Versión**: 1.0.0
**Fecha Inicio**: 2025-11-04
**CTO**: Usuario (Aprobación Requerida)
**ECO**: Claude AI (Engineering Coordination Officer)

---

## 🎯 MISIÓN DEL PROYECTO

### Objetivo Estratégico
Transformar el catálogo estático de 105 productos de PRILABSA en un sistema dinámico gestionable mediante WordPress Headless, **manteniendo 100% del diseño actual** y conservando todas las páginas existentes del subdominio productos.prilabsa.com.

### Restricciones Críticas
- ✅ **0% cambios en diseño frontend** (componentes, layouts, Tailwind, i18n)
- ✅ **Desarrollo local primero** (XAMPP/Docker → pruebas → migración)
- ✅ **Conservación contenido** existente en subdominio
- ✅ **0% dependencias de plugins premium** (solo gratuitos)
- ✅ **Subdominio aislado** (no afectar www.prilabsa.com)
- ✅ **Metodología SOLARIA** (0% deuda técnica, spec-driven, PAT-006 mandatory)

---

## 📊 MÉTRICAS DE ÉXITO

### Quantifiable Targets
```
✅ Coverage Tests:           ≥75%
✅ Lighthouse Score:         ≥95 (todas categorías)
✅ API Response Time:        <500ms (p95)
✅ Products Imported:        105/105 (100%)
✅ Design Preservation:      100% (0 cambios visuales)
✅ Existing Pages Migrated:  100%
✅ Technical Debt:           0%
✅ Build Warnings:           0
✅ Failed Tests:             0
✅ Stealth Check:            0% rastros desarrollo
```

### Business Metrics
```
📈 Time to Market:           8 semanas (local+prod)
💰 Total Cost:               <$50 (hosting only)
🔒 Uptime Target:            99.9%
⚡ Performance Gain:         +30% vs estático
```

---

## 🏗️ ARQUITECTURA DEL PROYECTO

### Stack Tecnológico

#### Frontend (Sin Cambios)
```
- React 19.1.0          → UI framework
- TypeScript 5.3+       → Type safety
- Vite 6.3.6            → Build tool
- TailwindCSS 4.1.10    → Styling
- React Router 7.7.0    → Routing
- i18next 25.3.2        → Multiidioma (es/en/pt)
- Axios                 → HTTP client (nuevo)
- SWR                   → API cache (nuevo)
```

#### Backend (Nuevo - Headless)
```
- WordPress 6.6+        → Headless CMS
- PHP 8.2+              → Runtime
- MySQL 8.0+            → Database
- ACF 6.3+              → Custom fields (gratuito)
- JWT Auth              → API authentication
- ACF to REST API       → ACF exposure
- CORS Headers          → Cross-origin support
```

#### Development Local
```
- XAMPP 8.2+ / Docker   → Local environment
- WP CLI 2.9+           → WP automation
- Node 20.11+           → Frontend dev
- npm 10.2+             → Package manager
```

#### Production Hosting
```
- GoDaddy               → productos.prilabsa.com
- Apache 2.4+           → Web server
- SSL/TLS               → HTTPS (Let's Encrypt)
- Cloudflare (opt)      → CDN/DDoS protection
```

### Diagrama de Arquitectura
```
┌─────────────────────────────────────────────────────────────┐
│                     USUARIOS FINALES                        │
│              (es/en/pt - Multi-device)                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              FRONTEND: productos.prilabsa.com               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React 19 SPA (Vite Build - Static + Dynamic)       │  │
│  │  - ProductCard, ProductCategories (existing)         │  │
│  │  - Productos.tsx, CategoryPage.tsx (modified)        │  │
│  │  - i18n (es/en/pt) - SWR cache - Axios client       │  │
│  └──────────────────────────────────────────────────────┘  │
│            ↕ HTTP/HTTPS (REST API - JSON)                   │
└─────────────────────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│       BACKEND HEADLESS: productos.prilabsa.com/wp-json/     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  WordPress 6.6+ Headless (No Theme Rendering)        │  │
│  │  - Custom Post Type: "productos"                     │  │
│  │  - ACF Fields: descripción, fotos, PDFs, categoría   │  │
│  │  - Taxonomies: categorías_productos, tags           │  │
│  │  - REST API: /wp/v2/productos (JWT auth)            │  │
│  └──────────────────────────────────────────────────────┘  │
│            ↕ MySQL Connection                                │
└─────────────────────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│             DATABASE: MySQL 8.0+                            │
│  - wp_posts (productos CPT)                                 │
│  - wp_postmeta (ACF fields)                                 │
│  - wp_terms (categorías/tags)                               │
│  - wp_users (admin only)                                    │
└─────────────────────────────────────────────────────────────┘

DEVELOPMENT FLOW:
Local (XAMPP/Docker) → Testing → Export → GoDaddy Production
```

---

## 📁 ESTRUCTURA DE DOCUMENTACIÓN

### Archivos Críticos Generados
```
PROJECT-PRODUCTOS-HEADLESS-WP/
├── MASTER-PLAN.md                   # Este archivo (plan maestro)
├── PHASE_STATUS.md                  # Status tracking en tiempo real
├── CLAUDE.md                        # Context para IA assistants
│
├── docs/
│   ├── specs/                       # Especificaciones por fase
│   │   ├── PHASE-0-ANALYSIS.md
│   │   ├── PHASE-1-LOCAL-SETUP.md
│   │   ├── PHASE-2-BACKEND-CONFIG.md
│   │   ├── PHASE-3-FRONTEND-INTEGRATION.md
│   │   ├── PHASE-4-PRODUCT-IMPORT.md
│   │   ├── PHASE-5-TESTING-QA.md
│   │   ├── PHASE-6-GODADDY-MIGRATION.md
│   │   └── PHASE-7-DEPLOYMENT-MONITORING.md
│   │
│   ├── ADR/                         # Architecture Decision Records
│   │   ├── ADR-001-wordpress-headless-vs-payload.md
│   │   ├── ADR-002-acf-vs-custom-metaboxes.md
│   │   ├── ADR-003-xampp-vs-docker.md
│   │   ├── ADR-004-manual-import-vs-wpalimport.md
│   │   ├── ADR-005-swr-vs-react-query.md
│   │   └── ADR-006-pat006-mandatory-api-verification.md
│   │
│   ├── audits/                      # Auditorías post-fase
│   │   ├── audit-phase-0.md
│   │   ├── audit-phase-1.md
│   │   └── ...
│   │
│   ├── session-summaries/           # Resúmenes de sesión
│   │   ├── SESSION-PHASE-0.md
│   │   ├── SESSION-PHASE-1.md
│   │   └── ...
│   │
│   └── api-inventories/             # PAT-006 API verification
│       ├── wordpress-rest-api-inventory.md
│       ├── acf-rest-api-inventory.md
│       └── react-components-inventory.md
│
├── memory/                          # Memoria persistente (SOLARIA)
│   ├── learning_log.jsonl          # Lecciones aprendidas (incremental)
│   ├── patterns.json               # Patrones validados
│   ├── antipatterns.json           # Antipatrones identificados
│   └── decisions.json              # Decisiones críticas
│
├── agents/                          # Sistema de agentes
│   ├── AGENTS-SYSTEM.md            # Descripción sistema multi-agente
│   ├── AGENT-SIGMA-BACKEND.md      # Backend WP specialist
│   ├── AGENT-THETA-FRONTEND.md     # Frontend React specialist
│   ├── AGENT-DELTA-DEVOPS.md       # DevOps/deployment
│   ├── AGENT-PSI-TESTING.md        # QA/testing specialist
│   └── COORDINATION-PROTOCOL.md     # Protocolos ECO-CTO
│
├── deployment/                      # Scripts y configs deployment
│   ├── local-setup.sh              # Setup XAMPP/Docker
│   ├── wp-config-local.php         # WP config local
│   ├── wp-config-prod.php          # WP config producción
│   ├── deploy-to-godaddy.sh        # Script migración
│   └── rollback-plan.md            # Plan de rollback
│
└── testing/                         # Testing artifacts
    ├── test-plan.md                # Plan de testing completo
    ├── e2e-scenarios.md            # Escenarios E2E (Cypress)
    ├── unit-tests-coverage.md      # Coverage report
    └── performance-benchmarks.md    # Lighthouse/API benchmarks
```

---

## 🤖 SISTEMA DE AGENTES ESPECIALIZADOS

### Cadena de Mando Digital

```
┌──────────────────────────────────────────────────────────────┐
│                    CTO (USUARIO)                             │
│              Strategic Oversight & Approval                  │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────┐
│              ECO (Engineering Coordination Officer)          │
│                    Claude AI - Coordination                  │
│  - Coordinar todos los agentes                               │
│  - Gestionar PHASE_STATUS.md                                 │
│  - Enforcing metodología SOLARIA                             │
│  - Reportes al CTO                                           │
└────────────────────────┬─────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┬────────────────┐
         ▼               ▼               ▼                ▼
┌────────────────┐ ┌────────────┐ ┌──────────────┐ ┌─────────────┐
│  AGENT SIGMA   │ │AGENT THETA │ │ AGENT DELTA  │ │ AGENT PSI   │
│   (Backend)    │ │ (Frontend) │ │  (DevOps)    │ │  (Testing)  │
│                │ │            │ │              │ │             │
│ - WP setup     │ │- React mods│ │- XAMPP setup │ │- Vitest     │
│ - ACF config   │ │- API client│ │- GoDaddy     │ │- Cypress    │
│ - CPT creation │ │- Components│ │- Migration   │ │- Lighthouse │
│ - Product      │ │- i18n keep │ │- DNS/SSL     │ │- Coverage   │
│   import       │ │- SWR cache │ │- Monitoring  │ │- E2E        │
└────────────────┘ └────────────┘ └──────────────┘ └─────────────┘
```

### Mapeo a Agentes Disponibles (Claude Code)

| Agente Conceptual | Mapeo Claude Code | Responsabilidades |
|-------------------|-------------------|-------------------|
| **ECO (Coordination)** | `general-purpose` + `Plan` | Coordinación, PHASE_STATUS, git commits, ADRs |
| **AGENT SIGMA (Backend)** | `payload-cms-architect` + `postgresql-schema-architect` | WordPress headless setup, ACF config, CPT, taxonomies, REST API |
| **AGENT THETA (Frontend)** | `react-frontend-dev` + `frontend-react` | Modificar Productos.tsx, ProductCard, API integration, SWR cache |
| **AGENT DELTA (DevOps)** | `infra-devops-architect` | XAMPP/Docker setup, GoDaddy migration, SSL, Apache config, DNS |
| **AGENT PSI (Testing)** | `general-purpose` (testing focus) | Vitest, Cypress, E2E, Lighthouse, coverage reports |
| **AGENT OMEGA (Security)** | `security-gdpr-compliance` | JWT auth, CORS, GDPR compliance, data protection |
| **AGENT ALPHA (Docs)** | `general-purpose` (docs focus) | Specs, ADRs, session summaries, learning logs |

---

## 📋 FASES DEL PROYECTO (OVERVIEW)

### Timeline Estimado: 8 Semanas

| Fase | Nombre | Duración | Agente Lead | Entregables Clave |
|------|--------|----------|-------------|-------------------|
| **0** | Análisis y Arquitectura | 1 semana | ECO + ALPHA | ADRs, Specs completas, API inventories |
| **1** | Setup Local WordPress | 1 semana | SIGMA + DELTA | WordPress local funcional, plugins instalados |
| **2** | Configuración Backend WP | 1.5 semanas | SIGMA | CPT productos, ACF fields, REST API expuesta |
| **3** | Integración Frontend React | 1.5 semanas | THETA | API client, componentes modificados, SWR cache |
| **4** | Importación 105 Productos | 1 semana | SIGMA + manual | 105 productos en WP con fotos/PDFs |
| **5** | Testing y QA | 1 semana | PSI + THETA | Tests ≥75% coverage, E2E passing, Lighthouse ≥95 |
| **6** | Migración a GoDaddy | 0.5 semanas | DELTA | Subdominio en producción, DNS configurado |
| **7** | Deployment y Monitoreo | 0.5 semanas | DELTA + ECO | Sistema en producción, monitoring activo |

**Total**: 8 semanas (puede reducirse con paralelización)

---

## 🔐 PROTOCOLOS MANDATORY (SOLARIA)

### PAT-006: API Verification Protocol
**Status**: 🔴 MANDATORY ANTES DE FASE 3 (Frontend Integration)

**Workflow**:
1. Inventariar TODAS las APIs de WordPress REST API disponibles
2. Documentar endpoints, parámetros, responses en `docs/api-inventories/`
3. Verificar que ACF fields están expuestos correctamente
4. Diseñar API client solo con APIs verificadas (0% especulación)
5. Validar cada endpoint antes de implementar

**Tiempo Estimado**: 20-30 min
**ROI**: 2+ horas ahorradas, 0 errores de integración
**Enforcement**: ECO bloquea Fase 3 si PAT-006 no completado

### ANTI-004: No Speculation-Driven Design
**Antipatrón Crítico**: ❌ Asumir que WordPress expone `/wp/v2/productos` sin verificar

**Correcto**: ✅ Leer documentación WP REST API, probar endpoints en Postman, documentar responses reales

### Quality Gates (Pre-Commit)
```bash
# Antes de cada commit a main:
✅ npm run type-check          # TypeScript strict pass
✅ npm run lint                # ESLint 0 warnings
✅ npm run test                # Vitest 100% passing
✅ npm run build               # Vite build success
✅ Lighthouse score ≥95        # Performance check
✅ No technical debt           # Manual review
```

### Auditoría Mandatory
**Trigger**: Si cualquier fase tiene >10 errores inesperados
**Protocolo**:
1. STOP desarrollo
2. Crear `docs/audits/audit-phase-X.md`
3. Root cause analysis
4. Remediation plan
5. Update learning log
6. Continuar solo después de remediation

---

## 📄 DECISION LOGS (ADRs) PREVISTOS

### ADR-001: WordPress Headless vs Payload CMS
**Decisión**: WordPress Headless
**Rationale**: Cliente ya tiene experiencia WP, plugins gratuitos disponibles, hosting GoDaddy listo, menor curva de aprendizaje.
**Alternativa Rechazada**: Payload CMS (requiere Node.js hosting, setup complejo, sin experiencia cliente)

### ADR-002: ACF vs Custom Meta Boxes
**Decisión**: Advanced Custom Fields (ACF)
**Rationale**: UI amigable, REST API plugin disponible, gratuito, documentación extensa.
**Alternativa Rechazada**: Custom Meta Boxes (más código, menos flexible, sin UI builder)

### ADR-003: XAMPP vs Docker
**Decisión**: XAMPP recomendado, Docker opcional
**Rationale**: XAMPP más simple para no-devops, instalación 10 min vs Docker 30 min config.
**Alternativa**: Docker aceptable si ya instalado.

### ADR-004: Importación Manual vs WP All Import
**Decisión**: Importación manual (o script PHP custom)
**Rationale**: Eliminar dependencia de plugin premium, 105 productos manejable manualmente, aprendizaje de WP admin.
**Alternativa Rechazada**: WP All Import (costo $99/año, overkill para proyecto)

### ADR-005: SWR vs React Query
**Decisión**: SWR
**Rationale**: Más ligero (9KB vs 30KB), suficiente para este proyecto, mejor integración con Vite.
**Alternativa**: React Query (más features, pero overkill)

### ADR-006: PAT-006 Mandatory API Verification
**Decisión**: PAT-006 es MANDATORY antes de Fase 3
**Rationale**: Metodología SOLARIA, evitar errores de especulación (39 errores en BRIK-64 sin PAT-006).
**Enforcement**: ECO bloquea fase si no completado.

---

## 🚀 CRITERIOS DE INICIO DE DESARROLLO

### Pre-Requisitos (BLOQUEANTES)
- [ ] **APROBACIÓN CTO**: Plan maestro revisado y aprobado
- [ ] **SPECS COMPLETAS**: Todas las fases tienen spec document detallado
- [ ] **AGENTES DEFINIDOS**: Sistema de agentes documentado y roles claros
- [ ] **ADRs CRÍTICOS**: ADR-001 a ADR-006 creados y aprobados
- [ ] **MEMORY SETUP**: `.memory/learning_log.jsonl` inicializado
- [ ] **PHASE_STATUS.md**: Creado y tracking configurado
- [ ] **CLAUDE.md**: Context file para IA generado

### Señal de Inicio
ECO emitirá mensaje:
```
🚀 DESARROLLO AUTORIZADO - FASE 0 INICIADA
CTO Approval: ✅
Specs Complete: ✅
Agents Ready: ✅
Memory Initialized: ✅
```

**HASTA RECIBIR APROBACIÓN CTO, NO SE INICIA DESARROLLO PRÁCTICO**

---

## 📊 REPORTING Y TRACKING

### PHASE_STATUS.md (Actualización Diaria)
```markdown
# Status: Fase X - [Nombre]
**Progress**: XX% complete
**Blockers**: [Lista de blockers]
**Next Actions**: [Próximos 3 pasos]
**ETA**: YYYY-MM-DD
```

### Session Summaries (Post-Fase)
Cada fase termina con:
- Logros alcanzados
- Métricas de calidad
- Lecciones aprendidas
- Próximos pasos
- Update learning log

### Communication Protocol ECO → CTO
- **Daily**: Update PHASE_STATUS.md (async)
- **Blockers**: Notificación inmediata al CTO
- **Phase Complete**: Session summary + approval request
- **Critical Decisions**: ADR creation + CTO review

---

## ⚠️ RIESGOS Y MITIGACIONES

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Conflicto DNS subdominio | Media | Alto | Verificar CNAME 24h antes migración |
| Performance API >500ms | Media | Medio | Pagination, caching SWR, indexación MySQL |
| Importación manual 105 productos | Baja | Bajo | Script PHP semi-automatizado |
| Migración GoDaddy falla | Baja | Alto | Backup completo antes, rollback plan |
| Cambio accidental diseño | Baja | Alto | Visual regression tests (Cypress snapshots) |
| Pérdida contenido existente | Baja | Crítico | Export WP completo antes de migración |
| CORS issues local ↔ WP | Alta | Bajo | Configurar headers en .htaccess local |

---

## 💰 PRESUPUESTO

```
Hosting GoDaddy subdominio:     $5/mes × 12 = $60/año
SSL Certificate:                $0 (Let's Encrypt)
Plugins WP:                     $0 (todos gratuitos)
Desarrollo:                     $0 (in-house con ECO)
Testing tools:                  $0 (Vitest/Cypress gratuitos)
───────────────────────────────────────────────────
TOTAL PRIMER AÑO:               ~$60
TOTAL SETUP (one-time):         <$50
```

---

## 📚 PRÓXIMOS PASOS (PENDIENTES APROBACIÓN CTO)

### Acción Inmediata ECO
1. ✅ Generar estructura documentación completa (EN PROGRESO)
2. ⏳ Crear todos los spec documents (PHASE-0 a PHASE-7)
3. ⏳ Crear todos los ADRs (ADR-001 a ADR-006)
4. ⏳ Documentar sistema de agentes detalladamente
5. ⏳ Generar CLAUDE.md y PHASE_STATUS.md
6. ⏳ Inicializar `.memory/learning_log.jsonl`
7. ⏳ Presentar paquete completo al CTO

### Decisión CTO Requerida
- [ ] **APROBAR** plan maestro → Continuar con generación specs
- [ ] **MODIFICAR** plan → Indicar cambios necesarios
- [ ] **RECHAZAR** plan → Re-análisis de requirements

---

## 📞 CONTACTO Y ESCALACIÓN

**CTO**: Usuario (tú)
**ECO**: Claude AI Engineering Coordination Officer
**Escalation Path**: CTO → ECO → Agentes Especializados
**Emergency Protocol**: Stop all development, notify CTO, root cause analysis

---

**Status**: 🔄 ESPERANDO APROBACIÓN CTO
**Próxima Acción**: Generar documentación completa de specs y ADRs
**Blocker**: Aprobación CTO requerida para iniciar Fase 0

---

*"Es mejor verificar una vez que asumir mil veces"* — PAT-006, Metodología SOLARIA

**Versión**: 1.0.0
**Última Actualización**: 2025-11-04
**Generado por**: ECO (Engineering Coordination Officer)
