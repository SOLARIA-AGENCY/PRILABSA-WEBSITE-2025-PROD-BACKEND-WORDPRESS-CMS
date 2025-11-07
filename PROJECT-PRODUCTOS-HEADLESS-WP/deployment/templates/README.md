# WordPress Headless Infrastructure Templates

## Overview

This directory contains production-ready configuration templates for deploying WordPress as a headless CMS. All files are fully documented and ready for deployment with minimal customization.

## Template Files

### 1. wp-config-template.php
**Purpose**: Complete WordPress configuration file
**Use Case**: Copy to `wp-config.php` in WordPress root
**Features**:
- Database credentials setup
- JWT authentication configuration
- CORS headers for headless operation
- Security hardening
- Performance optimization
- Environment-specific settings
- Comprehensive inline documentation

**Quick Start**:
```bash
cp wp-config-template.php /var/www/html/wordpress/wp-config.php
# Edit and replace all {{PLACEHOLDER}} values
nano /var/www/html/wordpress/wp-config.php
```

**Required Changes**:
- Database credentials (DB_NAME, DB_USER, DB_PASSWORD, DB_HOST)
- Authentication keys (generate at https://api.wordpress.org/secret-key/1.1/salt/)
- JWT secret key (generate with `openssl rand -base64 64`)
- Site URLs (WP_SITEURL, WP_HOME)
- Frontend URL for CORS
- Environment type (local/development/staging/production)

---

### 2. database-setup.sql
**Purpose**: MySQL/MariaDB database initialization
**Use Case**: Create database and user for WordPress
**Features**:
- Database creation with UTF8MB4 charset
- User creation with proper privileges
- Security best practices
- Verification queries
- Optional: staging/production database setup
- Optional: backup and monitoring user creation

**Quick Start**:
```bash
# Review and edit credentials in the file first
mysql -u root -p < database-setup.sql

# Verify database created
mysql -u root -p -e "SHOW DATABASES LIKE 'prilabsa_wp%';"

# Test connection
mysql -u wp_user -p -D prilabsa_wp_local -e "SHOW TABLES;"
```

**Configuration Variables** (edit at top of file):
- `@DB_NAME` - Database name
- `@DB_USER` - Database username
- `@DB_PASSWORD` - Database password (CHANGE THIS!)
- `@DB_CHARSET` - Character set (default: utf8mb4)
- `@DB_COLLATE` - Collation (default: utf8mb4_unicode_ci)

---

### 3. htaccess-template
**Purpose**: Apache configuration for WordPress permalinks and security
**Use Case**: Copy to `.htaccess` in WordPress root
**Features**:
- WordPress permalink rewrite rules
- CORS headers for API access
- JWT authentication header pass-through
- Security headers (CSP, HSTS, X-Frame-Options)
- File protection (wp-config.php, .htaccess)
- Gzip compression
- Browser caching
- Rate limiting basics
- Upload directory PHP execution prevention

**Quick Start**:
```bash
cp htaccess-template /var/www/html/wordpress/.htaccess
chmod 644 /var/www/html/wordpress/.htaccess

# Enable required Apache modules
a2enmod rewrite
a2enmod headers
a2enmod deflate
a2enmod expires

# Test configuration
apachectl configtest

# Reload Apache
systemctl reload apache2
```

**Required Changes**:
- Update CORS origin (replace `localhost:5173` with production domain)
- Uncomment HTTPS redirect for production with SSL
- Adjust CSP policy for your frontend domains

**Required Apache Modules**:
- mod_rewrite (URL rewriting)
- mod_headers (HTTP headers)
- mod_deflate (compression)
- mod_expires (caching)

---

### 4. nginx-template.conf
**Purpose**: Nginx configuration (alternative to Apache)
**Use Case**: Copy to `/etc/nginx/sites-available/` and enable
**Features**:
- HTTP/2 support
- SSL/TLS configuration
- FastCGI caching
- PHP-FPM integration
- Rate limiting (DDoS protection)
- Security headers
- CORS configuration
- WordPress permalinks support
- Separate local and production blocks

**Quick Start**:
```bash
# Copy to sites-available
cp nginx-template.conf /etc/nginx/sites-available/prilabsa-wordpress

# Edit configuration (replace {{DOMAIN}}, paths, etc.)
nano /etc/nginx/sites-available/prilabsa-wordpress

# Create symlink
ln -s /etc/nginx/sites-available/prilabsa-wordpress /etc/nginx/sites-enabled/

# Create cache directory
mkdir -p /var/cache/nginx/prilabsa
chown -R www-data:www-data /var/cache/nginx/prilabsa

# Test configuration
nginx -t

# Reload Nginx
systemctl reload nginx
```

**Required Changes**:
- Replace `{{DOMAIN}}` with actual domain
- Update document root paths
- Configure SSL certificate paths
- Verify PHP-FPM socket path
- Update CORS origins for production

**SSL Certificate Setup**:
```bash
# Install certbot
apt install certbot python3-certbot-nginx

# Get certificate
certbot --nginx -d productos.prilabsa.com
```

---

### 5. php-uploads.ini
**Purpose**: PHP configuration for large file uploads
**Use Case**: Enable 300MB+ uploads for product images/PDFs
**Features**:
- 300MB upload limit
- Extended execution times
- Memory optimization
- OPcache configuration
- Security settings
- Environment-specific configurations

**Quick Start**:
```bash
# For PHP-FPM
cp php-uploads.ini /etc/php/8.4/fpm/conf.d/99-prilabsa-uploads.ini
systemctl restart php8.4-fpm

# For Apache mod_php
cp php-uploads.ini /etc/php/8.4/apache2/conf.d/99-prilabsa-uploads.ini
systemctl restart apache2

# Verify settings loaded
php -i | grep -E 'upload_max_filesize|post_max_size|memory_limit'
```

**Adjust Values Based On**:
- Available server RAM
- Expected file sizes
- Concurrent users
- Processing requirements

**Production Recommendations**:
- Set `display_errors = Off`
- Set `opcache.validate_timestamps = 0`
- Enable `log_errors = On`
- Remove development-only extensions

---

### 6. docker-compose-enhanced.yml
**Purpose**: Complete Docker environment for WordPress
**Use Case**: Run WordPress + MySQL + Redis + phpMyAdmin locally
**Features**:
- WordPress 6.6 with PHP 8.4
- MySQL 8.0 with optimizations
- Redis caching layer
- phpMyAdmin for DB management
- WP-CLI container
- Nginx reverse proxy (optional)
- Health checks for all services
- Volume persistence
- Resource limits
- Network isolation

**Quick Start**:
```bash
# Copy to project root
cp docker-compose-enhanced.yml docker-compose.yml

# Create .env file (see env-template)
cp env-template .env
nano .env  # Fill in credentials

# Start services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f wordpress

# Install WordPress via WP-CLI
docker-compose exec wpcli wp core install \
  --url="http://localhost:8080" \
  --title="PRILABSA Local Dev" \
  --admin_user="admin_local" \
  --admin_password="secure_password" \
  --admin_email="dev@prilabsa.local"
```

**Access Points**:
- WordPress: http://localhost:8080
- WordPress Admin: http://localhost:8080/wp-admin
- WordPress API: http://localhost:8080/wp-json/
- phpMyAdmin: http://localhost:8081

**Required Files**:
- `.env` file (create from `env-template`)
- `mysql-config/custom.cnf` (optional)
- `nginx-config/` (if using Nginx)

---

### 7. env-template
**Purpose**: Environment variables for Docker and configuration
**Use Case**: Copy to `.env` and fill in values
**Features**:
- All database credentials
- WordPress configuration
- JWT authentication
- CORS settings
- Redis configuration
- PHP settings
- Backup configuration
- SSL/TLS settings
- Security options

**Quick Start**:
```bash
# Copy to .env
cp env-template .env

# Generate secure passwords
openssl rand -base64 32  # For database passwords
openssl rand -base64 64  # For JWT secret

# Edit .env file
nano .env

# Add to .gitignore
echo ".env" >> .gitignore
```

**Critical Variables to Change**:
- `MYSQL_ROOT_PASSWORD`
- `MYSQL_PASSWORD`
- `JWT_SECRET_KEY` (64+ characters)
- `REDIS_PASSWORD`
- `WP_ADMIN_PASSWORD`
- `WORDPRESS_SITE_URL` (for production)
- `FRONTEND_URL` (for CORS)

---

## Deployment Workflows

### Local Development (XAMPP)

1. **Database Setup**:
   ```bash
   mysql -u root -p < database-setup.sql
   ```

2. **WordPress Installation**:
   ```bash
   # Download WordPress
   wget https://wordpress.org/latest.tar.gz
   tar -xzf latest.tar.gz -C /opt/lampp/htdocs/
   mv /opt/lampp/htdocs/wordpress /opt/lampp/htdocs/productos

   # Configure WordPress
   cp wp-config-template.php /opt/lampp/htdocs/productos/wp-config.php
   nano /opt/lampp/htdocs/productos/wp-config.php  # Edit credentials
   ```

3. **Apache Configuration**:
   ```bash
   cp htaccess-template /opt/lampp/htdocs/productos/.htaccess
   ```

4. **PHP Configuration**:
   ```bash
   cp php-uploads.ini /opt/lampp/etc/php.ini.d/99-prilabsa.ini
   /opt/lampp/lampp restart
   ```

5. **Access**: http://localhost/productos

---

### Local Development (Docker)

1. **Setup Environment**:
   ```bash
   cp docker-compose-enhanced.yml docker-compose.yml
   cp env-template .env
   nano .env  # Fill in credentials
   ```

2. **Start Services**:
   ```bash
   docker-compose up -d
   docker-compose ps  # Verify all healthy
   ```

3. **Install WordPress**:
   ```bash
   docker-compose exec wpcli wp core install \
     --url="http://localhost:8080" \
     --title="PRILABSA Local" \
     --admin_user="admin" \
     --admin_password="$(openssl rand -base64 16)" \
     --admin_email="admin@prilabsa.local"
   ```

4. **Install Required Plugins**:
   ```bash
   docker-compose exec wpcli wp plugin install \
     advanced-custom-fields \
     acf-to-rest-api \
     jwt-authentication-for-wp-rest-api \
     redis-cache \
     --activate
   ```

5. **Access**: http://localhost:8080

---

### Production Deployment (GoDaddy/VPS)

1. **Prepare Server**:
   ```bash
   # Update system
   apt update && apt upgrade -y

   # Install LAMP stack
   apt install apache2 mysql-server php8.4 php8.4-mysql php8.4-curl \
               php8.4-gd php8.4-mbstring php8.4-xml php8.4-zip -y

   # Enable Apache modules
   a2enmod rewrite headers deflate expires ssl
   ```

2. **Database Setup**:
   ```bash
   # Edit credentials in database-setup.sql first!
   mysql -u root -p < database-setup.sql
   ```

3. **WordPress Installation**:
   ```bash
   # Download and extract WordPress
   cd /var/www/html
   wget https://wordpress.org/latest.tar.gz
   tar -xzf latest.tar.gz
   mv wordpress productos
   rm latest.tar.gz

   # Configure WordPress
   cp wp-config-template.php productos/wp-config.php
   nano productos/wp-config.php  # Update for production

   # Set permissions
   chown -R www-data:www-data productos
   chmod 644 productos/wp-config.php
   ```

4. **Apache/Nginx Configuration**:
   ```bash
   # For Apache
   cp htaccess-template productos/.htaccess

   # For Nginx
   cp nginx-template.conf /etc/nginx/sites-available/prilabsa
   ln -s /etc/nginx/sites-available/prilabsa /etc/nginx/sites-enabled/
   nginx -t && systemctl reload nginx
   ```

5. **SSL Certificate**:
   ```bash
   # Install certbot
   apt install certbot python3-certbot-apache  # or python3-certbot-nginx

   # Get certificate
   certbot --apache -d productos.prilabsa.com  # or --nginx
   ```

6. **PHP Configuration**:
   ```bash
   cp php-uploads.ini /etc/php/8.4/apache2/conf.d/99-prilabsa.ini
   systemctl restart apache2  # or php8.4-fpm
   ```

7. **Verify**:
   - Visit https://productos.prilabsa.com
   - Check API: https://productos.prilabsa.com/wp-json/
   - Test CORS from frontend

---

## Configuration Verification

### WordPress Configuration
```bash
# Check wp-config.php loaded correctly
wp config list

# Verify database connection
wp db check

# Check installed plugins
wp plugin list

# Verify JWT authentication
curl -X POST http://localhost:8080/wp-json/jwt-auth/v1/token \
  -d "username=admin&password=your_password"
```

### Apache Configuration
```bash
# Test configuration
apachectl configtest

# Check loaded modules
apache2ctl -M | grep -E 'rewrite|headers|deflate|expires'

# Verify .htaccess working
curl -I http://localhost:8080/wp-admin/
# Should see Access-Control-Allow-Origin header
```

### Nginx Configuration
```bash
# Test configuration
nginx -t

# Check FastCGI cache
ls -lah /var/cache/nginx/prilabsa/

# Verify headers
curl -I http://localhost/wp-json/
```

### PHP Configuration
```bash
# Check upload limits
php -i | grep -E 'upload_max_filesize|post_max_size|memory_limit'

# Check OPcache
php -i | grep opcache

# Test PHP-FPM status
systemctl status php8.4-fpm
```

### Database Configuration
```bash
# Check database
mysql -u wp_user -p -e "USE prilabsa_wp_local; SHOW TABLES;"

# Verify charset
mysql -u wp_user -p -e "SHOW VARIABLES LIKE 'character%';"

# Check database size
mysql -u wp_user -p -e "SELECT table_schema AS 'Database',
  ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)'
  FROM information_schema.TABLES
  WHERE table_schema = 'prilabsa_wp_local';"
```

### Docker Configuration
```bash
# Check all services healthy
docker-compose ps

# View logs
docker-compose logs -f

# Check resource usage
docker stats

# Verify networks
docker network ls | grep prilabsa

# Check volumes
docker volume ls | grep prilabsa
```

---

## Security Checklist

Before deploying to production:

### Database
- [ ] Changed all default passwords
- [ ] Used strong passwords (16+ characters)
- [ ] Restricted user to localhost (production) or specific IP
- [ ] Removed test databases and anonymous users
- [ ] Enabled MySQL slow query log
- [ ] Configured regular backups

### WordPress
- [ ] Changed default table prefix from `wp_`
- [ ] Generated unique authentication keys
- [ ] Generated strong JWT secret (64+ characters)
- [ ] Set `WP_DEBUG` to false
- [ ] Disabled file editing (`DISALLOW_FILE_EDIT`)
- [ ] Restricted CORS to actual frontend domains
- [ ] Set correct file permissions (755 dirs, 644 files)
- [ ] Removed default admin username

### Web Server
- [ ] Enabled HTTPS with valid certificate
- [ ] Configured HSTS header
- [ ] Set proper security headers (CSP, X-Frame-Options, etc.)
- [ ] Disabled directory listing
- [ ] Protected wp-config.php from direct access
- [ ] Disabled PHP execution in uploads directory
- [ ] Configured rate limiting
- [ ] Enabled gzip compression

### PHP
- [ ] Set `display_errors` to Off
- [ ] Enabled error logging
- [ ] Set appropriate memory limits
- [ ] Configured OPcache for production
- [ ] Disabled dangerous functions
- [ ] Set open_basedir restriction
- [ ] Hid PHP version (`expose_php = Off`)

### System
- [ ] Configured firewall (UFW/iptables)
- [ ] Enabled fail2ban for brute force protection
- [ ] Configured automatic security updates
- [ ] Set up log rotation
- [ ] Implemented backup strategy
- [ ] Configured monitoring/alerting

---

## Troubleshooting

### WordPress White Screen
```bash
# Enable WordPress debugging
# Edit wp-config.php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);

# Check error log
tail -f wp-content/debug.log
```

### Database Connection Error
```bash
# Test database connection
mysql -u wp_user -p -h localhost prilabsa_wp_local

# Check credentials in wp-config.php
grep DB_ wp-config.php

# Verify MySQL running
systemctl status mysql
```

### Upload Errors
```bash
# Check PHP limits
php -i | grep -E 'upload_max_filesize|post_max_size'

# Check directory permissions
ls -ld wp-content/uploads
# Should be: drwxr-xr-x www-data www-data

# Check disk space
df -h
```

### CORS Errors
```bash
# Test CORS headers
curl -I -X OPTIONS http://localhost:8080/wp-json/ \
  -H "Origin: http://localhost:5173"

# Should see Access-Control-Allow-Origin header

# For Apache, check .htaccess loaded
# For Nginx, verify configuration includes CORS block
```

### SSL Certificate Issues
```bash
# Verify certificate
openssl s_client -connect productos.prilabsa.com:443

# Check expiration
certbot certificates

# Renew if needed
certbot renew
```

### Performance Issues
```bash
# Check Apache/Nginx logs
tail -f /var/log/apache2/error.log
tail -f /var/log/nginx/error.log

# Check MySQL slow queries
mysql -u root -p -e "SHOW VARIABLES LIKE 'slow_query%';"

# Enable query logging temporarily
# In wp-config.php:
define('SAVEQUERIES', true);

# Check OPcache status
php -r "print_r(opcache_get_status());"
```

---

## Backup & Restore

### Manual Backup
```bash
# Backup database
mysqldump -u wp_user -p prilabsa_wp_local > backup-$(date +%Y%m%d).sql

# Backup files
tar -czf wordpress-backup-$(date +%Y%m%d).tar.gz /var/www/html/wordpress

# Or with Docker
docker-compose exec wpcli wp db export /backups/backup-$(date +%Y%m%d).sql
```

### Automated Backup Script
```bash
#!/bin/bash
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d)
docker-compose exec -T wpcli wp db export - > $BACKUP_DIR/db-$DATE.sql
tar -czf $BACKUP_DIR/uploads-$DATE.tar.gz wp-content/uploads
# Keep only last 7 days
find $BACKUP_DIR -mtime +7 -delete
```

### Restore
```bash
# Restore database
mysql -u wp_user -p prilabsa_wp_local < backup-20250104.sql

# Or with Docker
docker-compose exec -T db mysql -u wp_user -p prilabsa_wp_local < backup-20250104.sql

# Restore files
tar -xzf wordpress-backup-20250104.tar.gz -C /
```

---

## Support & Resources

### Official Documentation
- WordPress: https://wordpress.org/support/
- WordPress REST API: https://developer.wordpress.org/rest-api/
- ACF: https://www.advancedcustomfields.com/resources/
- Docker: https://docs.docker.com/

### PRILABSA Project
- Main Repository: `PRILABSA-WEBSITE-2025-PROD-BACKEND-WORDPRESS-CMS`
- Frontend: React 19 + TypeScript + Vite
- Backend: WordPress 6.6+ (Headless)
- Methodology: SOLARIA Agency

### Contact
- Project: PRILABSA WordPress Headless
- Phase: 1 - Local Setup
- Agent: DELTA (DevOps Specialist)

---

**Last Updated**: 2025-11-04
**Version**: 1.0.0
**Maintained By**: AGENT DELTA (DevOps Specialist)
