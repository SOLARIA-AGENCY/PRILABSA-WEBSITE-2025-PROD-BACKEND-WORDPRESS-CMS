# 🚀 PRILABSA GoDaddy Implementation Plan
## Complete WordPress Headless CMS + Frontend Deployment

---

## 📋 **PROJECT OVERVIEW**

**Objective**: Deploy complete PRILABSA website with WordPress Headless CMS + React frontend on GoDaddy hosting at `productos.prilabsa.com`

**Architecture**: 
- **Backend**: WordPress 6.0+ with custom plugins (Headless CMS)
- **Frontend**: React/TypeScript/Vite application
- **API**: WordPress REST API with custom endpoints
- **Data**: 105 products with images and PDFs

---

## 🎯 **IMPLEMENTATION PHASES**

### **PHASE 1: WORDPRESS BACKEND SETUP** ⏱️ ~45 minutes

#### 1.1 WordPress Plugin Installation
**Files to Upload**:
```
/wp-content/plugins/prilabsa-productos/
├── prilabsa-productos-cpt.php      # Custom Post Type
├── prilabsa-acf-config.php          # ACF Configuration  
├── prilabsa-rest-api-custom.php     # Custom REST API
└── prilabsa-import-products.php     # Product Importer
```

**Dependencies**:
- Advanced Custom Fields PRO (v6.0+)
- (Optional) JWT Authentication for WP REST API

#### 1.2 Plugin Activation Sequence
1. Install ACF PRO first
2. Activate PRILABSA Productos Custom Post Type
3. Activate PRILABSA ACF Configuration
4. Activate PRILABSA REST API Custom Endpoints
5. Activate PRILABSA Product Importer

#### 1.3 Product Data Import
**Assets Structure**:
```
/wp-content/uploads/prilabsa-productos/
├── PRILABSA_CATALOGO_WEB_2025.json  # Product data
├── imagenes/                        # Product images (PNG)
└── pdfs/                           # Technical sheets (PDF)
```

**Import Process**:
1. Upload catalog JSON to uploads directory
2. Upload product images (105 PNG files)
3. Upload technical PDFs (105 PDF files)
4. Run WordPress importer with dry-run first
5. Execute full import (105 products)

#### 1.4 API Testing
**Endpoints to Verify**:
```bash
# Core WordPress API
GET /wp-json                          ✅ Already working
GET /wp-json/wp/v2                    ✅ Already working
GET /wp-json/wp/v2/productos          🔄 Test after plugin install

# Custom PRILABSA API  
GET /wp-json/prilabsa/v1/productos           🔄 Test after plugin install
GET /wp-json/prilabsa/v1/productos/stats     🔄 Test after plugin install
GET /wp-json/prilabsa/v1/productos/search    🔄 Test after plugin install
```

---

### **PHASE 2: FRONTEND INTEGRATION & DEPLOYMENT** ⏱️ ~30 minutes

#### 2.1 Frontend Build Process
```bash
# Environment verification
npm run type-check
npm run test:run

# Build with WordPress integration
npm run build

# Post-build verification
npm run verify:wordpress
```

#### 2.2 FTP Deployment
**Target Configuration**:
- **Host**: `productos.prilabsa.com`
- **Directory**: `/public_html`
- **Protocol**: FTP (passive mode)
- **Timeout**: 120 seconds
- **Retries**: 5 attempts

**Deployment Steps**:
1. Backup existing `.htaccess` file
2. Upload all frontend files
3. Verify file integrity
4. Test frontend accessibility

#### 2.3 Frontend-Backend Integration Testing
**Test Scenarios**:
- Product listing from WordPress API
- Individual product pages
- Category filtering
- Search functionality
- Multi-language support
- PDF downloads
- Image loading

---

### **PHASE 3: PRODUCTION OPTIMIZATION** ⏱️ ~30 minutes

#### 3.1 Security Configuration
**WordPress Security**:
```php
// wp-config.php additions
define('WP_DEBUG', false);
define('DISALLOW_FILE_EDIT', true);
define('WP_CACHE', true);
```

**CORS Configuration**:
```php
// Allow frontend domain
add_filter('prilabsa_rest_allowed_origins', function($origins) {
    return array('https://productos.prilabsa.com');
});
```

#### 3.2 Performance Optimization
**WordPress Caching**:
- Enable object caching (Redis if available)
- Configure page caching
- Optimize database queries

**Frontend Optimization**:
- Enable gzip compression
- Set browser caching headers
- Optimize image delivery

#### 3.3 Monitoring & Maintenance
**Setup Monitoring**:
- WordPress error logging
- API response time monitoring
- Frontend error tracking

**Backup Strategy**:
- Daily database backups
- Weekly file backups
- Offsite backup storage

---

## 🔧 **DETAILED IMPLEMENTATION PROCEDURES**

### **PROCEDURE 1: WordPress Plugin Installation**

#### Step 1: Create Plugin Directory
```bash
# Via FTP or cPanel File Manager
mkdir -p /wp-content/plugins/prilabsa-productos
chmod 755 /wp-content/plugins/prilabsa-productos
```

#### Step 2: Upload Plugin Files
```bash
# Upload 4 PHP files to plugin directory
prilabsa-productos-cpt.php
prilabsa-acf-config.php  
prilabsa-rest-api-custom.php
prilabsa-import-products.php

# Set proper permissions
chmod 644 *.php
chown www-data:www-data *.php
```

#### Step 3: Install ACF PRO
1. Download ACF PRO from official website
2. Upload to `/wp-content/plugins/advanced-custom-fields-pro/`
3. Activate from WordPress admin

#### Step 4: Activate Plugins
Navigate to **Plugins > Installed Plugins** and activate in order:
1. ✅ Advanced Custom Fields PRO
2. ✅ PRILABSA Productos Custom Post Type
3. ✅ PRILABSA ACF Configuration  
4. ✅ PRILABSA REST API Custom Endpoints
5. ✅ PRILABSA Product Importer

### **PROCEDURE 2: Product Data Import**

#### Step 1: Prepare Upload Directory
```bash
mkdir -p /wp-content/uploads/prilabsa-productos/{imagenes,pdfs}
chmod 755 /wp-content/uploads/prilabsa-productos
chmod 755 /wp-content/uploads/prilabsa-productos/imagenes
chmod 755 /wp-content/uploads/prilabsa-productos/pdfs
```

#### Step 2: Upload Assets
```bash
# Upload catalog JSON
cp PRILABSA_CATALOGO_WEB_2025.json /wp-content/uploads/prilabsa-productos/

# Upload product images (105 files)
cp imagenes/*.PNG /wp-content/uploads/prilabsa-productos/imagenes/

# Upload PDFs (105 files)  
cp pdfs/*.PDF /wp-content/uploads/prilabsa-productos/pdfs/

# Set permissions
chown -R www-data:www-data /wp-content/uploads/prilabsa-productos/
chmod -R 755 /wp-content/uploads/prilabsa-productos/
```

#### Step 3: Execute Import
1. Navigate to **Productos > Importar Productos** in WordPress admin
2. Verify file paths are correct
3. Enable **"Modo prueba"** (dry run)
4. Click **"Validar Archivos"**
5. If validation passes, disable dry run
6. Click **"Iniciar Importación"**
7. Monitor progress and verify results

### **PROCEDURE 3: Frontend Deployment**

#### Step 1: Build Frontend
```bash
# Clean build
npm run build:clean

# Type checking
npm run type-check

# Build with WordPress integration
npm run build

# Verify build
ls -la dist/
```

#### Step 2: FTP Deployment
```bash
# Test FTP connection first
npm run test:ftp

# Deploy frontend
npm run deploy:ftp

# Verify deployment
npm run verify:staging
```

#### Step 3: Post-Deployment Testing
```bash
# Test WordPress API integration
node scripts/test-wordpress-api.js

# Test frontend integration
node scripts/test-frontend-integration.js
```

---

## 📊 **SUCCESS CRITERIA**

### **Phase 1 Success Metrics**
- ✅ All 4 PRILABSA plugins activated
- ✅ 105 products imported successfully
- ✅ All custom API endpoints responding (200 OK)
- ✅ Product images and PDFs accessible

### **Phase 2 Success Metrics**  
- ✅ Frontend builds without errors
- ✅ All files deployed via FTP
- ✅ Frontend loads at `https://productos.prilabsa.com`
- ✅ Products display from WordPress API

### **Phase 3 Success Metrics**
- ✅ Page load time < 3 seconds
- ✅ API response time < 500ms
- ✅ Security headers configured
- ✅ Backups automated

---

## 🚨 **RISK MITIGATION**

### **Technical Risks**
1. **Plugin Conflicts**: Test plugins one by one
2. **Import Failures**: Use dry-run mode first
3. **FTP Timeouts**: Extended timeout configuration
4. **API Errors**: Comprehensive error handling

### **Backup Strategies**
1. **Pre-deployment**: Full WordPress backup
2. **During Deployment**: File-level backups
3. **Post-deployment**: Database backup

### **Rollback Plan**
1. **WordPress**: Restore from backup
2. **Frontend**: Previous build via FTP
3. **Database**: Import backup SQL file

---

## ⏱️ **IMPLEMENTATION TIMELINE**

| Time | Activity | Phase |
|------|----------|-------|
| 0:00-0:15 | Plugin upload & activation | Phase 1 |
| 0:15-0:30 | Product data import | Phase 1 |
| 0:30-0:45 | API testing & verification | Phase 1 |
| 0:45-1:00 | Frontend build & deployment | Phase 2 |
| 1:00-1:15 | Integration testing | Phase 2 |
| 1:15-1:30 | Performance optimization | Phase 3 |
| 1:30-1:45 | Security configuration | Phase 3 |
| 1:45-2:00 | Final testing & monitoring | Phase 3 |

**Total Estimated Time**: 2 hours

---

## 🎯 **READY TO BEGIN**

All preparation work is complete:
- ✅ Server analysis done
- ✅ Configuration files updated  
- ✅ Testing scripts ready
- ✅ Implementation plan documented

**Starting Phase 1: WordPress Backend Setup**