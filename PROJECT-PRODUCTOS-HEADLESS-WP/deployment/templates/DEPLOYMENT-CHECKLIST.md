# WordPress Headless Deployment Checklist

## Pre-Deployment Preparation

### System Requirements Verification
- [ ] Operating System: Ubuntu 20.04+ / macOS / Windows with WSL2
- [ ] PHP: 8.1+ (8.4 recommended)
- [ ] MySQL/MariaDB: 8.0+ / 10.6+
- [ ] Apache: 2.4+ OR Nginx: 1.18+
- [ ] Node.js: 20+ (for frontend development)
- [ ] Docker: 20+ (if using Docker deployment)
- [ ] Disk Space: 10GB+ free space
- [ ] RAM: 2GB minimum, 4GB+ recommended

### Required Tools Installation
- [ ] Git installed and configured
- [ ] WP-CLI installed (optional but recommended)
- [ ] Composer installed (optional)
- [ ] certbot installed (for SSL in production)
- [ ] Text editor (nano, vim, VSCode, etc.)

### Credentials Prepared
- [ ] Generated strong database root password (16+ chars)
- [ ] Generated strong database user password (16+ chars)
- [ ] Generated JWT secret key (64+ chars): `openssl rand -base64 64`
- [ ] Generated Redis password (if using Redis)
- [ ] Generated WordPress admin password
- [ ] Obtained domain name (for production)
- [ ] SSH keys configured (for production server access)

---

## Local Development Setup (Choose One)

### Option A: Docker Deployment (Recommended for Beginners)

#### Step 1: Prepare Environment
```bash
# Navigate to project directory
cd /path/to/PRILABSA-WEBSITE-2025-PROD-BACKEND-WORDPRESS-CMS/PROJECT-PRODUCTOS-HEADLESS-WP/deployment

# Copy Docker Compose file
cp templates/docker-compose-enhanced.yml docker-compose.yml

# Create and configure .env file
cp templates/env-template .env
nano .env  # Fill in all credentials
```

**Checklist**:
- [ ] docker-compose.yml copied
- [ ] .env file created and configured
- [ ] All passwords generated and filled
- [ ] JWT secret key generated
- [ ] Frontend URL configured

#### Step 2: Start Services
```bash
# Start all containers
docker-compose up -d

# Check status (all should be "healthy" or "running")
docker-compose ps

# View logs if any issues
docker-compose logs -f
```

**Checklist**:
- [ ] All containers started successfully
- [ ] MySQL container healthy
- [ ] WordPress container healthy
- [ ] Redis container healthy (if enabled)
- [ ] No error messages in logs

#### Step 3: Install WordPress
```bash
# Install WordPress via WP-CLI
docker-compose exec wpcli wp core install \
  --url="http://localhost:8080" \
  --title="PRILABSA Local Development" \
  --admin_user="admin_local" \
  --admin_password="YOUR_SECURE_PASSWORD" \
  --admin_email="admin@prilabsa.local"

# Install required plugins
docker-compose exec wpcli wp plugin install \
  advanced-custom-fields \
  acf-to-rest-api \
  jwt-authentication-for-wp-rest-api \
  --activate
```

**Checklist**:
- [ ] WordPress installed successfully
- [ ] Admin user created
- [ ] Required plugins installed
- [ ] Plugins activated

#### Step 4: Verify Installation
```bash
# Test WordPress API
curl http://localhost:8080/wp-json/

# Test JWT authentication endpoint
curl http://localhost:8080/wp-json/jwt-auth/v1/
```

**Checklist**:
- [ ] WordPress accessible at http://localhost:8080
- [ ] Admin panel accessible at http://localhost:8080/wp-admin
- [ ] REST API responding at http://localhost:8080/wp-json/
- [ ] phpMyAdmin accessible at http://localhost:8081
- [ ] Can login to WordPress admin

---

### Option B: XAMPP Deployment (Alternative)

#### Step 1: Install XAMPP
```bash
# Download XAMPP from https://www.apachefriends.org/
# Install following official instructions

# Start XAMPP
# Linux/Mac:
sudo /opt/lampp/lampp start

# Windows: Use XAMPP Control Panel
```

**Checklist**:
- [ ] XAMPP installed
- [ ] Apache started successfully
- [ ] MySQL started successfully
- [ ] phpMyAdmin accessible at http://localhost/phpmyadmin

#### Step 2: Create Database
```bash
# Copy and edit database setup script
cp templates/database-setup.sql database-setup-local.sql
nano database-setup-local.sql  # Edit credentials

# Execute in phpMyAdmin or via CLI
mysql -u root -p < database-setup-local.sql
```

**Checklist**:
- [ ] Database created successfully
- [ ] User created with proper privileges
- [ ] Can connect to database

#### Step 3: Install WordPress
```bash
# Download WordPress
cd /opt/lampp/htdocs  # Linux/Mac
# cd C:\xampp\htdocs  # Windows

wget https://wordpress.org/latest.tar.gz
tar -xzf latest.tar.gz
mv wordpress productos-prilabsa

# Configure WordPress
cd productos-prilabsa
cp /path/to/templates/wp-config-template.php wp-config.php
nano wp-config.php  # Edit all credentials and settings
```

**Checklist**:
- [ ] WordPress downloaded and extracted
- [ ] wp-config.php configured
- [ ] Database credentials correct
- [ ] JWT secret key configured
- [ ] CORS settings configured

#### Step 4: Configure Apache
```bash
# Copy .htaccess
cp /path/to/templates/htaccess-template .htaccess

# Edit CORS origins
nano .htaccess

# Enable required Apache modules
# Linux:
sudo a2enmod rewrite headers deflate expires

# Restart Apache
sudo /opt/lampp/lampp restart
```

**Checklist**:
- [ ] .htaccess file configured
- [ ] Apache modules enabled
- [ ] Apache restarted successfully
- [ ] No errors in Apache error log

#### Step 5: Configure PHP
```bash
# Copy PHP configuration
cp /path/to/templates/php-uploads.ini /opt/lampp/etc/php.ini.d/99-prilabsa.ini

# Or edit main php.ini
nano /opt/lampp/etc/php.ini
# Paste settings from php-uploads.ini

# Restart Apache
sudo /opt/lampp/lampp restart
```

**Checklist**:
- [ ] PHP upload limits configured
- [ ] Memory limits set appropriately
- [ ] Execution time increased
- [ ] Settings verified with phpinfo()

#### Step 6: Complete WordPress Installation
```bash
# Visit in browser
open http://localhost/productos-prilabsa/wp-admin/install.php

# Or use WP-CLI
wp core install \
  --url="http://localhost/productos-prilabsa" \
  --title="PRILABSA Local" \
  --admin_user="admin" \
  --admin_password="secure_password" \
  --admin_email="admin@prilabsa.local"
```

**Checklist**:
- [ ] WordPress installation completed
- [ ] Admin user created
- [ ] Can login to admin panel
- [ ] Permalinks working (test some URLs)

---

## Plugin Installation & Configuration

### Required Plugins Installation
```bash
# If using Docker
docker-compose exec wpcli wp plugin install PLUGIN_NAME --activate

# If using WP-CLI locally
wp plugin install PLUGIN_NAME --activate

# Or install via WordPress admin: Plugins > Add New
```

**Install These Plugins**:
- [ ] Advanced Custom Fields (ACF) 6.3+
- [ ] ACF to REST API
- [ ] JWT Authentication for WP REST API
- [ ] (Optional) Redis Object Cache
- [ ] (Optional) WP Mail SMTP
- [ ] (Optional) UpdraftPlus (backups)

### ACF Configuration
1. [ ] Navigate to Custom Fields > Field Groups
2. [ ] Create field group "Product Information"
3. [ ] Add fields:
   - [ ] Description (Wysiwyg Editor)
   - [ ] Photos (Gallery)
   - [ ] PDF Files (File)
   - [ ] Category (Taxonomy)
   - [ ] Price (Number)
   - [ ] SKU (Text)
   - [ ] Stock Status (Select)
   - [ ] Features (Repeater)
   - [ ] Technical Specs (Text Area)
4. [ ] Set location rule: Post Type == Products
5. [ ] Verify fields appear in REST API

### JWT Authentication Configuration
```bash
# Add to wp-config.php (should already be there from template)
define('JWT_AUTH_SECRET_KEY', 'your-secret-key-here');
define('JWT_AUTH_CORS_ENABLE', true);

# Test JWT endpoint
curl -X POST http://localhost:8080/wp-json/jwt-auth/v1/token \
  -d "username=admin&password=your_password"
```

**Checklist**:
- [ ] JWT secret key configured
- [ ] JWT endpoint responding
- [ ] Token generated successfully
- [ ] CORS headers present in response

---

## Custom Post Type Setup

### Option 1: Using Code (Recommended)
```php
// Add to functions.php or custom plugin
function prilabsa_register_products_cpt() {
    register_post_type('productos', array(
        'labels' => array(
            'name' => 'Products',
            'singular_name' => 'Product'
        ),
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,  // CRITICAL for REST API
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'taxonomies' => array('category', 'post_tag')
    ));
}
add_action('init', 'prilabsa_register_products_cpt');
```

**Checklist**:
- [ ] Custom post type registered
- [ ] `show_in_rest` enabled
- [ ] CPT visible in WordPress admin
- [ ] CPT accessible via REST API

### Option 2: Using Plugin
```bash
# Install CPT UI plugin
wp plugin install custom-post-type-ui --activate
```

**Checklist**:
- [ ] CPT UI plugin installed
- [ ] Products post type created
- [ ] REST API enabled for CPT
- [ ] Taxonomies assigned

---

## REST API Verification (PAT-006 Protocol)

### Test WordPress Default Endpoints
```bash
# List all routes
curl http://localhost:8080/wp-json/

# Get posts
curl http://localhost:8080/wp-json/wp/v2/posts

# Get products (if CPT created)
curl http://localhost:8080/wp-json/wp/v2/productos
```

**Checklist**:
- [ ] `/wp-json/` responding with route list
- [ ] `/wp-json/wp/v2/posts` returning posts
- [ ] `/wp-json/wp/v2/productos` returning products
- [ ] ACF fields included in responses

### Test ACF Fields in API
```bash
# Get single product with ACF fields
curl http://localhost:8080/wp-json/wp/v2/productos/1

# Should see ACF fields in response
```

**Checklist**:
- [ ] ACF fields appear in API response
- [ ] Image URLs are complete and accessible
- [ ] File attachments have proper URLs
- [ ] Taxonomy data included

### Test CORS Headers
```bash
# Test CORS
curl -I -X OPTIONS http://localhost:8080/wp-json/wp/v2/posts \
  -H "Origin: http://localhost:5173"

# Should see:
# Access-Control-Allow-Origin: http://localhost:5173
# Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
```

**Checklist**:
- [ ] CORS headers present
- [ ] Correct origin allowed
- [ ] All HTTP methods allowed
- [ ] Credentials allowed

### Document API Inventory
```bash
# Create API documentation
# List all endpoints in: docs/api-inventories/wordpress-rest-api-inventory.md
```

**Checklist**:
- [ ] All endpoints documented
- [ ] Request/response examples provided
- [ ] Authentication requirements noted
- [ ] Rate limits documented (if any)

---

## Security Hardening

### WordPress Security
- [ ] Changed default table prefix
- [ ] Generated unique auth keys
- [ ] Set strong admin password
- [ ] Disabled file editing: `define('DISALLOW_FILE_EDIT', true);`
- [ ] Removed default "admin" username
- [ ] Configured proper file permissions:
  ```bash
  find /path/to/wordpress -type d -exec chmod 755 {} \;
  find /path/to/wordpress -type f -exec chmod 644 {} \;
  chmod 600 wp-config.php
  ```

### Database Security
- [ ] Changed MySQL root password
- [ ] Created separate WordPress user (not root)
- [ ] Restricted user to localhost only
- [ ] Removed test databases
- [ ] Removed anonymous users:
  ```sql
  DELETE FROM mysql.user WHERE User='';
  FLUSH PRIVILEGES;
  ```

### Web Server Security
- [ ] Disabled directory listing: `Options -Indexes`
- [ ] Protected wp-config.php from direct access
- [ ] Disabled PHP execution in uploads:
  ```apache
  <Directory "/wp-content/uploads/">
      <Files "*.php">
          deny from all
      </Files>
  </Directory>
  ```
- [ ] Enabled security headers (HSTS, CSP, X-Frame-Options)
- [ ] Configured rate limiting

### SSL/TLS (Production Only)
- [ ] Obtained SSL certificate (Let's Encrypt recommended)
- [ ] Configured HTTPS redirection
- [ ] Enabled HSTS header
- [ ] Verified certificate chain
- [ ] Set certificate auto-renewal

---

## Performance Optimization

### WordPress Performance
- [ ] Enabled object caching (Redis recommended)
- [ ] Limited post revisions: `define('WP_POST_REVISIONS', 5);`
- [ ] Increased autosave interval: `define('AUTOSAVE_INTERVAL', 300);`
- [ ] Optimized database tables:
  ```bash
  wp db optimize
  ```

### PHP Performance
- [ ] Enabled OPcache
- [ ] Configured OPcache for production:
  ```ini
  opcache.enable=1
  opcache.memory_consumption=256
  opcache.validate_timestamps=0
  ```
- [ ] Set appropriate memory limits

### Web Server Performance
- [ ] Enabled Gzip compression
- [ ] Configured browser caching headers
- [ ] Enabled HTTP/2 (if using Nginx/Apache 2.4.17+)
- [ ] Set up FastCGI cache (Nginx) or mod_cache (Apache)

### Database Performance
- [ ] Configured MySQL query cache
- [ ] Set appropriate buffer pool size
- [ ] Enabled slow query log for monitoring
- [ ] Regular database optimization scheduled

---

## Testing & Verification

### Functional Testing
- [ ] WordPress admin accessible
- [ ] Can create/edit/delete posts
- [ ] Can upload images (test with 50MB+ file)
- [ ] Can upload PDFs (test with 100MB+ file)
- [ ] ACF fields save correctly
- [ ] Permalinks working (not showing index.php in URLs)

### API Testing
- [ ] REST API responding
- [ ] JWT authentication working
- [ ] CORS working from frontend origin
- [ ] ACF fields in API responses
- [ ] Image URLs accessible
- [ ] PDF URLs accessible
- [ ] Pagination working
- [ ] Search endpoint working

### Frontend Integration Testing
- [ ] Frontend can fetch products
- [ ] Images load correctly
- [ ] PDFs download correctly
- [ ] Categories filter working
- [ ] Search functionality working
- [ ] i18n data available

### Performance Testing
```bash
# Test API response time
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:8080/wp-json/wp/v2/productos

# Should be < 500ms
```

**Checklist**:
- [ ] API response time < 500ms
- [ ] Page load time < 2s
- [ ] Images optimized (< 500KB each)
- [ ] No N+1 query problems

### Load Testing (Production)
```bash
# Install Apache Bench
apt install apache2-utils

# Test load
ab -n 1000 -c 10 http://localhost:8080/wp-json/wp/v2/productos
```

**Checklist**:
- [ ] Server handles 100+ concurrent requests
- [ ] No 500 errors under load
- [ ] Response time remains stable

---

## Backup Configuration

### Automated Database Backup
```bash
# Create backup script
cat > /scripts/backup-wordpress.sh <<'EOF'
#!/bin/bash
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Database backup
docker-compose exec -T wpcli wp db export - > $BACKUP_DIR/db-$DATE.sql

# Compress
gzip $BACKUP_DIR/db-$DATE.sql

# Keep only last 7 days
find $BACKUP_DIR -name "db-*.sql.gz" -mtime +7 -delete
EOF

chmod +x /scripts/backup-wordpress.sh

# Add to crontab (daily at 2 AM)
crontab -e
# Add: 0 2 * * * /scripts/backup-wordpress.sh
```

**Checklist**:
- [ ] Backup script created
- [ ] Script executable
- [ ] Cron job configured
- [ ] Backup directory has sufficient space
- [ ] Test backup restoration

### File Backup
```bash
# Backup uploads directory
rsync -avz wp-content/uploads/ /backups/uploads-$(date +%Y%m%d)/
```

**Checklist**:
- [ ] Upload files backed up
- [ ] Plugins backed up (if customized)
- [ ] Themes backed up (if customized)

### Off-Site Backup (Recommended)
```bash
# Install rclone for cloud backup
# Configure S3/Google Drive/Dropbox
rclone copy /backups/ remote:prilabsa-backups/
```

**Checklist**:
- [ ] Off-site backup configured
- [ ] Test restoration from off-site backup
- [ ] Backup encryption configured

---

## Monitoring & Maintenance

### Log Monitoring
```bash
# WordPress debug log
tail -f wp-content/debug.log

# Apache error log
tail -f /var/log/apache2/error.log

# MySQL error log
tail -f /var/log/mysql/error.log

# Docker logs
docker-compose logs -f
```

**Checklist**:
- [ ] Log rotation configured
- [ ] Error monitoring set up
- [ ] Alerts configured for critical errors

### Uptime Monitoring
**Recommended Services**:
- [ ] UptimeRobot (free, simple)
- [ ] Pingdom (paid, comprehensive)
- [ ] StatusCake (freemium)

**Configure**:
- [ ] HTTP endpoint monitoring
- [ ] API endpoint monitoring
- [ ] Alert contacts configured

### Performance Monitoring
```bash
# Install and configure New Relic (optional)
# Or use basic monitoring
```

**Checklist**:
- [ ] Response time monitoring
- [ ] Database query monitoring
- [ ] Resource usage monitoring (CPU, RAM, disk)

### Regular Maintenance Tasks
**Weekly**:
- [ ] Check error logs
- [ ] Verify backups completed
- [ ] Check disk space
- [ ] Review security logs

**Monthly**:
- [ ] Update WordPress core
- [ ] Update plugins
- [ ] Update themes
- [ ] Optimize database
- [ ] Review performance metrics
- [ ] Test backup restoration

---

## Production Deployment (GoDaddy/VPS)

### Pre-Production Checklist
- [ ] All local testing complete
- [ ] Database export prepared
- [ ] Files ready for upload
- [ ] Domain name configured
- [ ] DNS records updated
- [ ] SSL certificate obtained
- [ ] Firewall rules configured

### Migration Steps
1. [ ] Export local database:
   ```bash
   wp db export prilabsa-local-export.sql
   ```

2. [ ] Update URLs in database:
   ```bash
   wp search-replace 'http://localhost:8080' 'https://productos.prilabsa.com' \
     --dry-run  # Test first
   wp search-replace 'http://localhost:8080' 'https://productos.prilabsa.com'
   ```

3. [ ] Upload files to production server:
   ```bash
   rsync -avz --exclude=wp-config.php wordpress/ user@server:/var/www/html/
   ```

4. [ ] Create production wp-config.php with production credentials

5. [ ] Import database on production:
   ```bash
   mysql -u wp_user -p prilabsa_wp_prod < prilabsa-local-export.sql
   ```

6. [ ] Configure web server (Apache/Nginx)

7. [ ] Test everything thoroughly

### Post-Deployment Verification
- [ ] Site accessible via HTTPS
- [ ] Admin panel accessible
- [ ] API endpoints responding
- [ ] CORS working with production frontend
- [ ] Images loading correctly
- [ ] PDFs downloading correctly
- [ ] SSL certificate valid
- [ ] All pages loading without errors

---

## Rollback Plan

### If Deployment Fails

1. **Immediate Actions**:
   - [ ] Stop deployment
   - [ ] Document error messages
   - [ ] Take screenshots of errors

2. **Rollback Steps**:
   ```bash
   # Restore previous database backup
   mysql -u wp_user -p prilabsa_wp_prod < backups/pre-deployment-backup.sql

   # Restore previous files
   rsync -avz backups/wordpress-pre-deployment/ /var/www/html/

   # Clear caches
   wp cache flush

   # Restart services
   systemctl restart apache2 php8.4-fpm
   ```

3. **Verification**:
   - [ ] Old version accessible
   - [ ] Data integrity verified
   - [ ] All functionality working

4. **Post-Mortem**:
   - [ ] Document what went wrong
   - [ ] Identify root cause
   - [ ] Update deployment process
   - [ ] Plan remediation

---

## Final Sign-Off Checklist

### Technical Verification
- [ ] All services running and healthy
- [ ] All tests passing
- [ ] API fully functional
- [ ] CORS configured correctly
- [ ] JWT authentication working
- [ ] File uploads working (tested with large files)
- [ ] Database optimized
- [ ] Backups configured and tested
- [ ] Security hardening complete
- [ ] Performance benchmarks met (< 500ms API, >95 Lighthouse)

### Documentation Complete
- [ ] API endpoints documented
- [ ] Configuration files backed up
- [ ] Credentials stored securely
- [ ] Deployment process documented
- [ ] Rollback procedure documented
- [ ] Maintenance procedures documented

### Stakeholder Sign-Off
- [ ] CTO approval
- [ ] Frontend team verified API compatibility
- [ ] QA team testing complete
- [ ] Security review complete
- [ ] Performance review complete

---

## Emergency Contacts

### Key Personnel
- **CTO**: [Contact Info]
- **DevOps Lead**: [Contact Info]
- **Frontend Lead**: [Contact Info]
- **Security Lead**: [Contact Info]

### External Support
- **Hosting Provider**: GoDaddy / Hetzner Support
- **Domain Registrar**: [Provider]
- **SSL Provider**: Let's Encrypt / Cloudflare

### Critical Services
- **WordPress Support**: https://wordpress.org/support/
- **Docker Support**: https://docs.docker.com/
- **MySQL Support**: https://dev.mysql.com/doc/

---

**Deployment Date**: _______________
**Deployed By**: _______________
**Verified By**: _______________
**Approved By**: _______________

---

**Version**: 1.0.0
**Last Updated**: 2025-11-04
**Project**: PRILABSA WordPress Headless
**Phase**: 1 - Local Setup & Deployment
**Agent**: DELTA (DevOps Specialist)
