# CONTEXT FILE: PRODUCTOS.PRILABSA.COM - WORDPRESS HEADLESS MIGRATION

**Project**: PRILABSA Dynamic Product Catalog
**Purpose**: Context file for AI assistants (Claude, ChatGPT, etc.)
**Methodology**: SOLARIA Agency Development Framework
**Version**: 1.0.0
**Last Updated**: 2025-11-04

---

## 🎯 PROJECT MISSION

Transform the static 105-product catalog of PRILABSA into a dynamic system manageable via WordPress Headless, **maintaining 100% of current design** and preserving all existing pages from productos.prilabsa.com subdomain.

---

## 📊 PROJECT OVERVIEW

### Key Facts
- **Current State**: React 19 SPA with static product data (`src/data/products/`)
- **Target State**: React 19 SPA consuming WordPress REST API (headless CMS)
- **Products**: 105 products in 5 categories (Aditivos, Alimentos, Equipos, Probióticos, Químicos)
- **Languages**: Spanish (primary), English, Portuguese (i18next)
- **Constraint**: 0% design changes (components/layouts/styles preserved)
- **Development**: Local first (XAMPP/Docker) → Test → GoDaddy production migration

### Critical Requirements
- ✅ Maintain 100% existing design (ProductCard, ProductCategories, Productos.tsx)
- ✅ Preserve existing subdomain content (export/import WordPress)
- ✅ Local development environment first (no direct production changes)
- ✅ Manual product import (no premium plugins like WP All Import)
- ✅ Subdomain isolation (productos.prilabsa.com ≠ www.prilabsa.com)
- ✅ SOLARIA methodology (0% technical debt, spec-driven, PAT-006)

---

## 🏗️ TECHNICAL ARCHITECTURE

### Frontend (No Changes to Design)
```typescript
// Existing Stack (Preserved) - ⚠️ CRITICAL: DO NOT MODIFY DEPENDENCIES
React 19.2.0 + TypeScript 5.3+ + Vite 6.3.6 + TailwindCSS 4.1.10
React Router 7.9.6 + i18next 25.3.2 + @dr.pogodin/react-helmet 3.0.2
react-leaflet 5.0.0 + leaflet 1.9.4

// New Additions (Functionality Only)
Axios           → HTTP client for WordPress API
SWR             → API caching and revalidation
```

### ⚠️ CRITICAL DEPENDENCY WARNING (2025-11-18)
**PROBLEM RESOLVED**: Frontend was non-functional due to dependency incompatibility
**SOLUTION**: Restored original compatible dependencies from commit `8eb27b2e`

**LOCKED DEPENDENCIES** - NEVER MODIFY THESE VERSIONS:
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

**WHAT CAUSED THE ISSUE**:
- Attempted downgrade to React 18.3.1 (incompatible with project design)
- React Router 6.x (incompatible with React 19)
- react-leaflet 4.x (incompatible with React 19)
- react-helmet-async (different API from @dr.pogodin/react-helmet)

**SOLUTION IMPLEMENTED**:
1. Created branch `frontend-funcional` from working commit `8eb27b2e`
2. Identified original compatible dependency versions
3. Restored package.json with correct versions
4. Clean reinstall with `yarn install`
5. Verified frontend functionality

**RESULT**: ✅ Frontend fully functional at http://localhost:5174

### Backend (New - Headless WordPress)
```php
// WordPress Headless Setup
WordPress 6.6+         → CMS (no theme rendering)
PHP 8.2+               → Runtime
MySQL 8.0+             → Database

// Plugins (All Free)
ACF 6.3+               → Advanced Custom Fields
ACF to REST API        → Expose ACF fields in /wp-json/
JWT Authentication     → API security
CORS Headers           → Cross-origin support
```

### Development Environment
```bash
# Local Options
XAMPP 8.2+             → Apache + MySQL + PHP (recommended)
Docker Compose         → Alternative (wordpress:latest image)

# Tools
WP CLI 2.9+            → WordPress automation
Node 20.11+            → Frontend dev
npm 10.2+              → Package manager
Postman                → API testing
```

### Production Hosting
```bash
GoDaddy                → productos.prilabsa.com (WordPress ready)
Apache 2.4+            → Web server
Let's Encrypt          → Free SSL/TLS
```

---

## 📁 PROJECT STRUCTURE

### New Documentation Directory
```
PROJECT-PRODUCTOS-HEADLESS-WP/
├── MASTER-PLAN.md              # Strategic plan (this is the source of truth)
├── PHASE_STATUS.md             # Live progress tracking
├── CLAUDE.md                   # This file (AI context)
│
├── docs/
│   ├── specs/                  # Phase specifications
│   │   ├── PHASE-0-ANALYSIS.md
│   │   ├── PHASE-1-LOCAL-SETUP.md
│   │   ├── PHASE-2-BACKEND-CONFIG.md
│   │   ├── PHASE-3-FRONTEND-INTEGRATION.md
│   │   ├── PHASE-4-PRODUCT-IMPORT.md
│   │   ├── PHASE-5-TESTING-QA.md
│   │   ├── PHASE-6-GODADDY-MIGRATION.md
│   │   └── PHASE-7-DEPLOYMENT-MONITORING.md
│   │
│   ├── ADR/                    # Architecture Decision Records
│   │   ├── ADR-001-wordpress-headless-vs-payload.md
│   │   ├── ADR-002-acf-vs-custom-metaboxes.md
│   │   ├── ADR-003-xampp-vs-docker.md
│   │   ├── ADR-004-manual-import-vs-wpalimport.md
│   │   ├── ADR-005-swr-vs-react-query.md
│   │   └── ADR-006-pat006-mandatory-api-verification.md
│   │
│   ├── audits/                 # Post-phase audits
│   ├── session-summaries/      # Phase completion summaries
│   └── api-inventories/        # PAT-006 API verification docs
│
├── memory/                     # Persistent memory (SOLARIA)
│   ├── learning_log.jsonl     # Incremental lessons learned
│   ├── patterns.json          # Validated patterns
│   ├── antipatterns.json      # Identified antipatterns
│   └── decisions.json         # Critical decisions
│
├── agents/                     # Multi-agent system docs
│   ├── AGENTS-SYSTEM.md       # Agent coordination overview
│   ├── AGENT-SIGMA-BACKEND.md
│   ├── AGENT-THETA-FRONTEND.md
│   ├── AGENT-DELTA-DEVOPS.md
│   ├── AGENT-PSI-TESTING.md
│   └── COORDINATION-PROTOCOL.md
│
├── deployment/                 # Deployment scripts
│   ├── local-setup.sh
│   ├── wp-config-local.php
│   ├── deploy-to-godaddy.sh
│   └── rollback-plan.md
│
└── testing/                    # Testing artifacts
    ├── test-plan.md
    ├── e2e-scenarios.md
    └── performance-benchmarks.md
```

### Existing Frontend Structure (Preserved)
```
src/
├── pages/
│   ├── Productos.tsx           # MODIFY: Consume API instead of static data
│   └── CategoryPage.tsx        # MODIFY: Dynamic categories from API
│
├── components/
│   ├── ProductCard.tsx         # MODIFY: Adapt for dynamic images/PDFs
│   ├── organisms/
│   │   └── ProductCategories.tsx  # MODIFY: Dynamic categories
│   └── ...
│
├── data/
│   └── products/
│       ├── julio-2025.ts       # KEEP: Backup static data
│       └── types.ts            # EXTEND: Add API response types
│
├── services/
│   └── wordpressApi.ts         # NEW: API client for WordPress
│
└── i18n/
    └── locales/                # KEEP: Existing translations
        ├── es/
        ├── en/
        └── pt/
```

---

## 🤖 MULTI-AGENT SYSTEM

### Agent Roles and Responsibilities

#### ECO (Engineering Coordination Officer) - General Coordination
**Role**: Project coordinator, enforces SOLARIA methodology
**Responsibilities**:
- Update PHASE_STATUS.md daily
- Coordinate between specialized agents
- Enforce quality gates and PAT-006
- Manage git commits
- Report to CTO

**Tools**: `general-purpose` + `Plan` agents

#### AGENT SIGMA - Backend Specialist
**Role**: WordPress headless setup and configuration
**Responsibilities**:
- Install/configure WordPress local (XAMPP/Docker)
- Create Custom Post Type "productos"
- Configure ACF fields (9 fields: descripción, fotos, PDFs, categoría, etc.)
- Setup taxonomies (categorías_productos, tags)
- Expose ACF via REST API
- Import 105 products manually or via script

**Tools**: `payload-cms-architect` + `postgresql-schema-architect`

#### AGENT THETA - Frontend Specialist
**Role**: React integration with WordPress API
**Responsibilities**:
- Create `src/services/wordpressApi.ts` API client
- Modify `Productos.tsx` to consume API
- Adapt ProductCard for dynamic images/PDFs
- Implement SWR caching
- Maintain 100% design preservation
- Manage i18n for API data

**Tools**: `react-frontend-dev` + `frontend-react`

#### AGENT DELTA - DevOps Specialist
**Role**: Infrastructure and deployment
**Responsibilities**:
- Setup XAMPP/Docker local environment
- Configure CORS for local development
- Migrate WordPress from local to GoDaddy
- Configure DNS/CNAME for subdomain
- Setup SSL/TLS (Let's Encrypt)
- Deploy frontend build to production

**Tools**: `infra-devops-architect`

#### AGENT PSI - Testing Specialist
**Role**: Quality assurance and testing
**Responsibilities**:
- Write Vitest unit tests (≥75% coverage)
- Create Cypress E2E tests (full product flow)
- Lighthouse performance tests (≥95 score)
- API performance tests (<500ms p95)
- Visual regression tests (ensure design preservation)

**Tools**: `general-purpose` (testing focus)

#### AGENT OMEGA - Security Specialist
**Role**: Security and compliance
**Responsibilities**:
- Configure JWT authentication
- Setup CORS headers correctly
- Validate GDPR compliance
- Secure API endpoints
- Audit data protection measures

**Tools**: `security-gdpr-compliance`

---

## 📋 DEVELOPMENT PHASES

### Phase Overview (8 Weeks Total)

| Phase | Name | Duration | Agent Lead | Key Deliverables |
|-------|------|----------|------------|------------------|
| 0 | Analysis & Architecture | 1 week | ECO + ALPHA | ADRs, Specs, API inventories |
| 1 | Local WordPress Setup | 1 week | SIGMA + DELTA | WordPress functional locally |
| 2 | Backend WP Configuration | 1.5 weeks | SIGMA | CPT, ACF, REST API exposed |
| 3 | Frontend Integration | 1.5 weeks | THETA | API client, modified components |
| 4 | Product Import (105) | 1 week | SIGMA + manual | All products in WP |
| 5 | Testing & QA | 1 week | PSI + THETA | Tests ≥75%, E2E passing |
| 6 | GoDaddy Migration | 0.5 weeks | DELTA | Production subdomain live |
| 7 | Deployment & Monitoring | 0.5 weeks | DELTA + ECO | System in production |

**Current Phase**: 0 (Analysis & Architecture - 10% complete)
**Status**: 🔄 Waiting CTO approval of MASTER-PLAN.md

---

## 🔐 MANDATORY PROTOCOLS (SOLARIA)

### PAT-006: API Verification Protocol
**When**: BEFORE Phase 3 (Frontend Integration)
**What**: Inventory all WordPress REST API endpoints
**Why**: Prevent speculation errors (39 errors in BRIK-64 project without PAT-006)
**How**:
1. List all endpoints: `GET /wp-json/wp/v2/` (documentation)
2. Test in Postman: Verify responses
3. Document in `docs/api-inventories/wordpress-rest-api-inventory.md`
4. Design API client using ONLY verified endpoints
5. No speculation allowed (0% guessing)

**Time**: 20-30 min
**ROI**: 2+ hours saved, 0 integration errors
**Enforced by**: ECO blocks Phase 3 if PAT-006 not completed

### ANTI-004: No Speculation-Driven Design
**Antipattern**: ❌ Assume WordPress exposes `/wp/v2/productos` without verification
**Correct**: ✅ Read WP REST API docs, test endpoints, document real responses

### Quality Gates (Pre-Commit)
```bash
✅ npm run type-check          # TypeScript strict pass
✅ npm run lint                # ESLint 0 warnings
✅ npm run test                # Vitest 100% passing
✅ npm run build               # Vite build success
✅ No technical debt           # Manual review
```

### Mandatory Audit Trigger
**If**: Any phase has >10 unexpected errors
**Then**:
1. STOP development
2. Create audit report in `docs/audits/`
3. Root cause analysis
4. Remediation plan
5. Update learning log
6. Continue only after fix

---

## 🎓 KEY LEARNINGS (From SOLARIA BRIK-64 Project)

### Validated Patterns
1. **PAT-006 (API Verification)**: 2+ hours saved per integration phase
2. **Spec-Driven Development**: 0 errors when specs complete before code
3. **Zero Technical Debt**: Easier maintenance, predictable timeline
4. **Iterative Error Fixing**: Fix one error at a time (not 10)
5. **Documentation-First**: Anyone can understand project in 30 min

### Identified Antipatterns
1. **ANTI-004 (Speculation)**: Assuming APIs without reading → 39 errors
2. **ANTI-005 (Tech Debt Hiding)**: "Fix later" → never fixed
3. **ANTI-006 (Missing Specs)**: Code without spec → rework

### Metrics from BRIK-64 (Reference)
- **With Methodology**: 292 tests passing, 82% coverage, 0 errors
- **Without Methodology**: 39 errors, 2+ hours debugging, code non-functional
- **ROI**: 400% (80% less debugging, 90% less rework)

---

## 🚀 CURRENT STATUS

### What's Complete
- [x] Project structure created
- [x] MASTER-PLAN.md generated
- [x] PHASE_STATUS.md tracking initialized
- [x] CLAUDE.md (this file) created
- [x] Methodology SOLARIA applied

### What's In Progress
- [🔄] System documentation (agents, ADRs, specs)
- [🔄] Waiting CTO approval

### What's Blocked
- [🔴] Phase 1-7 implementation (blocked by Phase 0 approval)
- [🔴] Development work (blocked by CTO approval)

### Next Actions (After CTO Approval)
1. Generate all spec documents (PHASE-0 to PHASE-7)
2. Create all ADRs (ADR-001 to ADR-006)
3. Document agent system in detail
4. Initialize `.memory/learning_log.jsonl`
5. Emit "DEVELOPMENT AUTHORIZED" signal

---

## 📊 SUCCESS CRITERIA

### Technical Metrics
```
✅ Test Coverage:           ≥75%
✅ Tests Passing:           100% (except explicit #[ignore])
✅ Build Warnings:          0
✅ Technical Debt:          0
✅ Lighthouse Score:        ≥95 (all categories)
✅ API Response Time:       <500ms (p95)
✅ Products Imported:       105/105 (100%)
```

### Business Metrics
```
✅ Design Preservation:     100% (0 visual changes)
✅ Existing Pages Migrated: 100%
✅ Subdomain Isolation:     ✅ (no impact on www.prilabsa.com)
✅ Timeline Adherence:      ≤8 weeks
✅ Budget Adherence:        ≤$50 setup cost
```

---

## ⚠️ CRITICAL CONSTRAINTS

### NEVER Do
- ❌ Change frontend design (layouts, components, Tailwind classes)
- ❌ Start implementation without complete specs
- ❌ Skip PAT-006 before API integration
- ❌ Introduce technical debt ("fix later")
- ❌ Speculate about WordPress APIs without verification
- ❌ Deploy to production before local testing complete
- ❌ **CRITICAL**: MODIFY DEPENDENCY VERSIONS (React, React Router, react-leaflet, helmet)
- ❌ Downgrade React 19 to React 18 (breaks entire frontend)
- ❌ Change major versions of core dependencies without testing

### ALWAYS Do
- ✅ Read specs before writing code
- ✅ Update PHASE_STATUS.md daily
- ✅ Run quality gates before commits
- ✅ Document decisions in ADRs
- ✅ Update learning log when discovering patterns
- ✅ Preserve existing design 100%
- ✅ Test locally before production migration
- ✅ **CRITICAL**: Verify dependency compatibility before any changes
- ✅ **CRITICAL**: Test frontend functionality after dependency updates
- ✅ **CRITICAL**: Use exact versions for core dependencies (no ranges)

---

## 📞 COMMUNICATION PROTOCOL

### ECO → CTO
- **Daily**: Update PHASE_STATUS.md (asynchronous)
- **Blockers**: Immediate notification
- **Phase Complete**: Session summary + approval request
- **Critical Decisions**: ADR creation + review

### File References Priority
1. **PHASE_STATUS.md** - Current status (check first)
2. **MASTER-PLAN.md** - Strategic overview
3. **docs/specs/PHASE-X-*.md** - Phase details
4. **docs/ADR/ADR-*.md** - Architectural decisions
5. **memory/learning_log.jsonl** - Lessons learned

---

## 🎯 AI ASSISTANT INSTRUCTIONS

When activated on this project:

1. **Read Context**: Start by reading PHASE_STATUS.md to understand current phase
2. **Check Specs**: Read relevant spec document for current phase
3. **Apply PAT-006**: If Phase 3+, verify API inventory exists
4. **Follow Methodology**: Enforce SOLARIA principles (0% tech debt, spec-driven)
5. **Update Status**: After work, update PHASE_STATUS.md
6. **Document Decisions**: Create ADRs for critical choices
7. **Update Learning Log**: Add entries to `.memory/learning_log.jsonl`

### Activation Phrase
When user says: **"Activate SOLARIA Methodology for PRILABSA Headless"**

Response should be:
```
✅ SOLARIA Methodology Activated
✅ Project: PRILABSA WordPress Headless
✅ Current Phase: [Check PHASE_STATUS.md]
✅ Next Actions: [List from PHASE_STATUS.md]
✅ Blockers: [List from PHASE_STATUS.md]

Ready for instructions. What would you like to work on?
```

---

## 📚 REFERENCES

### Internal Documents
- `MASTER-PLAN.md` - Strategic plan (source of truth)
- `PHASE_STATUS.md` - Live tracking
- `METODOLOGIA SOLARIA/` - Framework documentation

### External Resources
- WordPress REST API Handbook: https://developer.wordpress.org/rest-api/
- ACF Documentation: https://www.advancedcustomfields.com/resources/
- React 19 Docs: https://react.dev/
- SOLARIA Agency: https://www.solaria.agency

---

## 🔄 VERSION HISTORY

- **1.0.0** (2025-11-04): Initial context file created
- **1.1.0** (2025-11-18): Added critical dependency lock warning after frontend restoration
- Future versions will be tracked as project evolves

---

**Status**: 🔄 PLANNING PHASE
**Next Update**: After CTO approval of MASTER-PLAN.md

---

*"Spec-Driven Development: Read first, code second"* — SOLARIA Methodology

**Maintained by**: ECO (Engineering Coordination Officer)
**Last Updated**: 2025-11-04
