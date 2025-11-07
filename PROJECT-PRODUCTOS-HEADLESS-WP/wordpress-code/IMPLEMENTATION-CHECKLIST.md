# PRILABSA WordPress Backend - Implementation Checklist

## Pre-Implementation Verification

### Server Requirements ✓
- [ ] WordPress 6.0+ installed
- [ ] PHP 8.0+ running
- [ ] MariaDB 11.4+ configured
- [ ] Apache/Nginx with mod_rewrite enabled
- [ ] SSL certificate configured (HTTPS)
- [ ] Memory limit: 256M minimum (512M recommended)
- [ ] Max execution time: 300 seconds minimum
- [ ] Post max size: 64M minimum
- [ ] Upload max filesize: 64M minimum

### WordPress Configuration ✓
- [ ] Permalinks set to "Post name" structure
- [ ] WP_DEBUG enabled in development
- [ ] WP_DEBUG_LOG enabled
- [ ] Database prefix documented
- [ ] Admin user created with strong password
- [ ] Backup strategy in place

### Required Plugins ✓
- [ ] Advanced Custom Fields PRO installed and activated
- [ ] (Optional) JWT Authentication for WP REST API installed
- [ ] (Optional) Redis Object Cache for performance

---

## Phase 1: Plugin Installation

### Step 1.1: Copy Plugin Files ✓
```bash
# Create plugin directory
mkdir -p /var/www/wordpress/wp-content/plugins/prilabsa-productos/

# Copy files
cp prilabsa-productos-cpt.php /var/www/wordpress/wp-content/plugins/prilabsa-productos/
cp prilabsa-acf-config.php /var/www/wordpress/wp-content/plugins/prilabsa-productos/
cp prilabsa-rest-api-custom.php /var/www/wordpress/wp-content/plugins/prilabsa-productos/
cp prilabsa-import-products.php /var/www/wordpress/wp-content/plugins/prilabsa-productos/

# Set permissions
chown -R www-data:www-data /var/www/wordpress/wp-content/plugins/prilabsa-productos/
chmod -R 755 /var/www/wordpress/wp-content/plugins/prilabsa-productos/
```

**Verification:**
- [ ] All 4 PHP files copied successfully
- [ ] Permissions set correctly (755 for directories, 644 for files)
- [ ] Owner set to web server user (www-data, apache, nginx)

### Step 1.2: Activate Plugins ✓

**Order of Activation:**
1. [ ] Advanced Custom Fields PRO
2. [ ] PRILABSA Productos Custom Post Type
3. [ ] PRILABSA ACF Configuration
4. [ ] PRILABSA REST API Custom Endpoints
5. [ ] PRILABSA Product Importer

**Verification:**
- [ ] No activation errors shown
- [ ] "Productos" menu appears in WordPress admin
- [ ] "Importar Productos" submenu visible under Productos
- [ ] No PHP errors in debug.log

### Step 1.3: Flush Rewrite Rules ✓
1. [ ] Go to Settings > Permalinks
2. [ ] Click "Save Changes" (no changes needed)
3. [ ] Verify .htaccess updated (if using Apache)

**Verification:**
- [ ] /wp-json/wp/v2/productos endpoint accessible
- [ ] /wp-json/prilabsa/v1/productos endpoint accessible
- [ ] No 404 errors on REST endpoints

---

## Phase 2: Data Preparation

### Step 2.1: Create Upload Directories ✓
```bash
# Create structure
mkdir -p /var/www/wordpress/wp-content/uploads/prilabsa-productos/imagenes
mkdir -p /var/www/wordpress/wp-content/uploads/prilabsa-productos/pdfs

# Set permissions
chown -R www-data:www-data /var/www/wordpress/wp-content/uploads/prilabsa-productos/
chmod -R 755 /var/www/wordpress/wp-content/uploads/prilabsa-productos/
```

**Verification:**
- [ ] Directories created successfully
- [ ] Web server can write to directories
- [ ] Correct ownership and permissions

### Step 2.2: Upload Source Files ✓

```bash
# Copy JSON catalog
cp PRILABSA_CATALOGO_WEB_2025.json /var/www/wordpress/wp-content/uploads/prilabsa-productos/

# Copy images (105 PNG files)
cp imagenes/*.PNG /var/www/wordpress/wp-content/uploads/prilabsa-productos/imagenes/

# Copy PDFs (105 PDF files)
cp pdfs/*.PDF /var/www/wordpress/wp-content/uploads/prilabsa-productos/pdfs/

# Verify count
ls -1 /var/www/wordpress/wp-content/uploads/prilabsa-productos/imagenes/*.PNG | wc -l  # Should be 105
ls -1 /var/www/wordpress/wp-content/uploads/prilabsa-productos/pdfs/*.PDF | wc -l      # Should be 105
```

**Verification:**
- [ ] JSON file uploaded (PRILABSA_CATALOGO_WEB_2025.json)
- [ ] 105 PNG images uploaded
- [ ] 105 PDF files uploaded
- [ ] File naming matches JSON references (e.g., AD001_COMBACID_XL.PNG)
- [ ] All files readable by web server

---

## Phase 3: Import Products

### Step 3.1: Pre-Import Validation ✓

1. [ ] Navigate to: Productos > Importar Productos
2. [ ] Verify default paths are correct:
   - JSON: `/var/www/wordpress/wp-content/uploads/prilabsa-productos/PRILABSA_CATALOGO_WEB_2025.json`
   - Images: `/var/www/wordpress/wp-content/uploads/prilabsa-productos/imagenes`
   - PDFs: `/var/www/wordpress/wp-content/uploads/prilabsa-productos/pdfs`
3. [ ] Click "Validar Archivos"
4. [ ] Verify validation results:
   - [ ] JSON exists: ✓
   - [ ] JSON readable: ✓
   - [ ] JSON valid: ✓
   - [ ] Product count: 105
   - [ ] Images directory exists: ✓
   - [ ] PDFs directory exists: ✓
   - [ ] No validation errors

### Step 3.2: Dry Run Import ✓

1. [ ] Check "Modo prueba" (Dry Run)
2. [ ] Uncheck "Actualizar existentes" (first import)
3. [ ] Click "Iniciar Importación"
4. [ ] Monitor progress bar
5. [ ] Wait for completion (may take 2-5 minutes)

**Verification:**
- [ ] Import completes without fatal errors
- [ ] Statistics shown:
  - Total processed: 105
  - Successful imports: ~105
  - Failed imports: 0 (or minimal)
- [ ] No products actually created (dry run)
- [ ] Review error log for any warnings

### Step 3.3: Real Import ✓

1. [ ] Uncheck "Modo prueba"
2. [ ] Keep "Actualizar existentes" unchecked
3. [ ] Click "Iniciar Importación"
4. [ ] Monitor progress
5. [ ] Wait for completion

**Verification:**
- [ ] Import completes successfully
- [ ] 105 products created
- [ ] Go to Productos > Todos los Productos
- [ ] Verify products list populated
- [ ] Check random products for:
  - [ ] Title populated
  - [ ] Featured image set
  - [ ] ACF fields filled (descripcion, codigo, categoria, etc.)
  - [ ] PDF uploaded

### Step 3.4: Data Integrity Check ✓

**Sample Products to Verify:**

1. **AD001 - Combacid XL**
   - [ ] Title: "Combacid XL"
   - [ ] Código: "AD001"
   - [ ] Categoría: "aditivos"
   - [ ] Descripción populated
   - [ ] Especificaciones repeater has rows
   - [ ] Featured image: AD001_COMBACID_XL.PNG
   - [ ] PDF: AD001_COMBACID_XL.PDF

2. **AL001 - First alimentos product**
   - [ ] Categoría: "alimentos"
   - [ ] All fields populated
   - [ ] Image and PDF uploaded

3. **EQ001 - First equipos product**
   - [ ] Categoría: "equipos"
   - [ ] All fields populated
   - [ ] Image and PDF uploaded

**Database Check:**
```sql
-- Count products
SELECT COUNT(*) FROM wp_posts WHERE post_type = 'productos' AND post_status = 'publish';
-- Should return 105

-- Check codes are unique
SELECT meta_value, COUNT(*)
FROM wp_postmeta
WHERE meta_key = 'codigo'
GROUP BY meta_value
HAVING COUNT(*) > 1;
-- Should return 0 rows (no duplicates)

-- Count by category
SELECT meta_value, COUNT(*)
FROM wp_postmeta
WHERE meta_key = 'categoria'
GROUP BY meta_value;
-- Should match: aditivos: 12, alimentos: 23, equipos: 48, probioticos: 4, quimicos: 18
```

---

## Phase 4: REST API Testing

### Step 4.1: Standard WordPress Endpoints ✓

**Test 1: List productos**
```bash
curl -X GET "https://productos.prilabsa.com/wp-json/wp/v2/productos?per_page=5"
```
- [ ] Returns JSON array
- [ ] Contains 5 products
- [ ] Each product has: id, title, content, acf fields
- [ ] Status code: 200

**Test 2: Single producto**
```bash
curl -X GET "https://productos.prilabsa.com/wp-json/wp/v2/productos/123"
```
- [ ] Returns single product object
- [ ] ACF fields included
- [ ] Featured image URLs present
- [ ] Status code: 200

**Test 3: Filter by taxonomy**
```bash
curl -X GET "https://productos.prilabsa.com/wp-json/wp/v2/productos?categorias_productos=3"
```
- [ ] Returns filtered results
- [ ] All products match category
- [ ] Status code: 200

### Step 4.2: Custom PRILABSA Endpoints ✓

**Test 1: Enhanced productos list**
```bash
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos?per_page=10&categoria=aditivos"
```
- [ ] Returns 10 products
- [ ] All are "aditivos" category
- [ ] ACF fields included by default
- [ ] Headers present: X-WP-Total, X-WP-TotalPages
- [ ] Cache-Control header set
- [ ] Status code: 200

**Test 2: Get by codigo**
```bash
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/AD001"
```
- [ ] Returns Combacid XL product
- [ ] All fields populated
- [ ] Status code: 200

**Test 3: Search**
```bash
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/search?query=combacid"
```
- [ ] Returns matching products
- [ ] Search works in title and content
- [ ] Status code: 200

**Test 4: Stats**
```bash
curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos/stats"
```
- [ ] Returns statistics object
- [ ] total_productos: 105
- [ ] por_categoria counts correct
- [ ] ultima_actualizacion present
- [ ] Status code: 200

### Step 4.3: CORS Testing ✓

**From Frontend Domain:**
```javascript
fetch('https://productos.prilabsa.com/wp-json/prilabsa/v1/productos')
  .then(response => response.json())
  .then(data => console.log(data));
```
- [ ] No CORS errors in browser console
- [ ] Data received successfully
- [ ] Access-Control-Allow-Origin header present

**Preflight Request:**
```bash
curl -X OPTIONS "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos" \
  -H "Access-Control-Request-Method: GET" \
  -H "Origin: https://app.prilabsa.com"
```
- [ ] Status code: 200
- [ ] Access-Control headers returned

### Step 4.4: Performance Testing ✓

**Response Time:**
```bash
time curl -X GET "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos?per_page=20"
```
- [ ] Response time < 500ms (with cache)
- [ ] Response time < 2s (without cache)
- [ ] Payload size reasonable (< 500KB for 20 products)

**Load Test (optional):**
```bash
ab -n 100 -c 10 "https://productos.prilabsa.com/wp-json/prilabsa/v1/productos"
```
- [ ] 100% requests successful
- [ ] No 500 errors
- [ ] Average response time acceptable

---

## Phase 5: Security Configuration

### Step 5.1: CORS Configuration ✓

**Production Settings:**
```php
// Add to wp-config.php or theme functions.php
add_filter( 'prilabsa_rest_allowed_origins', function( $origins ) {
    return array(
        'https://productos.prilabsa.com',
        'https://www.prilabsa.com',
        'https://app.prilabsa.com',
    );
} );
```
- [ ] CORS origins restricted to allowed domains
- [ ] Wildcard (*) removed in production
- [ ] Tested from allowed and disallowed origins

### Step 5.2: Authentication (Optional) ✓

**If using JWT:**
```php
// wp-config.php
define('JWT_AUTH_SECRET_KEY', 'STRONG-RANDOM-KEY-HERE');
define('JWT_AUTH_CORS_ENABLE', true);
```
- [ ] JWT plugin installed and configured
- [ ] Secret key generated (use: https://api.wordpress.org/secret-key/1.1/salt/)
- [ ] Token generation tested
- [ ] Protected endpoints work with token

### Step 5.3: Rate Limiting ✓

**Nginx Configuration:**
```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

location /wp-json/ {
    limit_req zone=api burst=20 nodelay;
}
```
- [ ] Rate limiting configured
- [ ] Excessive requests return 429 status
- [ ] Legitimate requests not blocked

### Step 5.4: SSL/HTTPS ✓
- [ ] SSL certificate installed
- [ ] HTTPS enforced (HTTP redirects to HTTPS)
- [ ] Mixed content warnings resolved
- [ ] Security headers configured (HSTS, etc.)

---

## Phase 6: Optimization

### Step 6.1: Caching ✓

**Object Cache (Redis):**
```bash
# Install Redis
apt install redis-server php-redis
systemctl enable redis-server
systemctl start redis-server

# Install WordPress plugin
wp plugin install redis-cache --activate
wp redis enable
```
- [ ] Redis installed and running
- [ ] WordPress connected to Redis
- [ ] Cache hit rate > 80% after warmup

**Page Cache:**
- [ ] Consider WP Super Cache or W3 Total Cache
- [ ] Or use Nginx FastCGI cache
- [ ] Configure cache exclusions for /wp-admin/

### Step 6.2: Database Optimization ✓

**Indexes:**
```sql
-- Add indexes for performance
ALTER TABLE wp_postmeta ADD INDEX idx_meta_key_value (meta_key(20), meta_value(50));
ALTER TABLE wp_posts ADD INDEX idx_type_status_date (post_type, post_status, post_date);
```
- [ ] Indexes created
- [ ] Query performance improved (test with EXPLAIN)

**Cleanup:**
```sql
-- Remove post revisions (keep last 3)
DELETE FROM wp_posts WHERE post_type = 'revision'
  AND post_parent IN (
    SELECT ID FROM (
      SELECT p.ID FROM wp_posts p
      WHERE p.post_type = 'productos'
    ) AS temp
  )
  AND ID NOT IN (
    SELECT ID FROM (
      SELECT ID FROM wp_posts
      WHERE post_type = 'revision'
      ORDER BY post_date DESC
      LIMIT 315
    ) AS keep
  );

-- Optimize tables
OPTIMIZE TABLE wp_posts, wp_postmeta, wp_options;
```
- [ ] Old revisions cleaned
- [ ] Tables optimized
- [ ] Database size reduced

### Step 6.3: CDN Configuration ✓

**Setup CDN for uploads:**
- [ ] CDN account created (Cloudflare, BunnyCDN, etc.)
- [ ] CDN configured to cache /wp-content/uploads/
- [ ] Cache headers set correctly
- [ ] Images loading from CDN URL
- [ ] No hotlink protection blocking legitimate requests

---

## Phase 7: Monitoring & Maintenance

### Step 7.1: Error Monitoring ✓

**Debug Logging:**
```php
// wp-config.php (production)
define('WP_DEBUG', false);
define('WP_DEBUG_LOG', true);  // Log to /wp-content/debug.log
define('WP_DEBUG_DISPLAY', false);
```
- [ ] Debug logging enabled
- [ ] Error log monitored (weekly)
- [ ] Critical errors addressed promptly

**External Monitoring:**
- [ ] Uptime monitoring configured (UptimeRobot, Pingdom)
- [ ] API endpoint monitoring active
- [ ] Alert notifications set up

### Step 7.2: Backup Strategy ✓

**Automated Backups:**
```bash
#!/bin/bash
# Daily backup script

DATE=$(date +%Y%m%d)
BACKUP_DIR="/backups/prilabsa"

# Database backup
mysqldump -u user -p'password' wordpress_db | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# Files backup
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz /var/www/wordpress/wp-content/uploads/

# Keep only last 7 days
find $BACKUP_DIR -name "*.gz" -mtime +7 -delete
```
- [ ] Backup script created and tested
- [ ] Cron job scheduled (daily)
- [ ] Backups stored off-server
- [ ] Restore tested successfully

### Step 7.3: Update Plan ✓

**Regular Updates:**
- [ ] WordPress core updates (monthly)
- [ ] Plugin updates (ACF PRO, JWT, etc.)
- [ ] PHP version updates (coordinate with host)
- [ ] Security patches (immediate)

**Product Catalog Updates:**
- [ ] Process documented for adding new products
- [ ] Process documented for updating existing products
- [ ] CSV/JSON export capability verified
- [ ] Re-import tested with "Actualizar existentes" option

---

## Phase 8: Documentation & Handoff

### Step 8.1: Technical Documentation ✓
- [ ] README.md complete and accurate
- [ ] API documentation generated
- [ ] Code comments comprehensive
- [ ] Database schema documented

### Step 8.2: User Documentation ✓
- [ ] Admin user guide created
- [ ] How to add/edit products manually
- [ ] How to use importer for updates
- [ ] Troubleshooting guide

### Step 8.3: Handoff Checklist ✓
- [ ] Admin credentials provided (securely)
- [ ] Server access credentials documented
- [ ] Database credentials documented
- [ ] CDN credentials (if applicable)
- [ ] Monitoring dashboard access
- [ ] Emergency contact information
- [ ] SLA defined (if applicable)

---

## Success Criteria

### Functional Requirements ✓
- [x] 105 products imported successfully
- [x] All ACF fields populated correctly
- [x] Images and PDFs uploaded and linked
- [x] REST API endpoints functional
- [x] CORS configured for frontend access
- [x] Search and filtering working

### Performance Requirements ✓
- [ ] API response time < 500ms (cached)
- [ ] API response time < 2s (uncached)
- [ ] Server load acceptable (< 70% CPU)
- [ ] Database queries optimized (< 50 queries per request)
- [ ] Image loading < 3s on 3G

### Security Requirements ✓
- [ ] HTTPS enforced
- [ ] CORS restricted to allowed origins
- [ ] No sensitive data exposed in API
- [ ] File upload restrictions in place
- [ ] SQL injection prevented
- [ ] XSS vulnerabilities mitigated

### Code Quality ✓
- [x] WordPress coding standards followed
- [x] No PHP errors or warnings
- [x] Code documented with inline comments
- [x] Functions have proper sanitization/escaping
- [x] Capability checks on admin functions
- [x] Nonce verification on forms

---

## Sign-off

### Developer Sign-off
- [ ] All code tested and functional
- [ ] Documentation complete
- [ ] Known issues documented
- [ ] Handoff completed

**Name:** ___________________
**Date:** ___________________
**Signature:** ___________________

### Client/Stakeholder Sign-off
- [ ] System meets requirements
- [ ] Training completed
- [ ] Documentation received
- [ ] Ready for production

**Name:** ___________________
**Date:** ___________________
**Signature:** ___________________

---

## Notes and Issues

### Known Issues
- Document any known limitations or issues

### Future Enhancements
- Suggest improvements for future iterations

### Change Log
- Track any changes made post-implementation

---

**Document Version:** 1.0.0
**Last Updated:** 2025-11-04
**Prepared by:** SOLARIA AGENCY
**Project:** PRILABSA Website 2025 - WordPress Headless Backend
