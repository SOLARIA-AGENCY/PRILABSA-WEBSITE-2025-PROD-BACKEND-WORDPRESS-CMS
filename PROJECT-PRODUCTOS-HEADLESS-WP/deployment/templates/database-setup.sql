-- ============================================================================
-- PRILABSA WordPress Headless - Database Setup Script
-- ============================================================================
--
-- This script creates the necessary database and user for WordPress
-- with proper privileges and security settings.
--
-- DEPLOYMENT INSTRUCTIONS:
-- 1. Review and customize the credentials below
-- 2. Execute as MySQL/MariaDB root user:
--    mysql -u root -p < database-setup.sql
-- 3. Verify database creation:
--    mysql -u root -p -e "SHOW DATABASES LIKE 'prilabsa_wp%';"
-- 4. Test user connection:
--    mysql -u wp_user -p -e "USE prilabsa_wp_local; SHOW TABLES;"
--
-- SECURITY NOTES:
-- - Change the default password before production deployment
-- - Use strong passwords (16+ characters, mixed case, numbers, symbols)
-- - For production, restrict user to specific host instead of '%'
-- - Consider using MySQL 8+ caching_sha2_password for better security
--
-- @package PRILABSA_Headless_WordPress
-- @version 1.0.0
-- ============================================================================

-- ============================================================================
-- CONFIGURATION VARIABLES
-- ============================================================================
-- Replace these values with your actual credentials

SET @DB_NAME = 'prilabsa_wp_local';
SET @DB_USER = 'wp_user';
SET @DB_PASSWORD = 'wp_secure_password_2025';  -- CHANGE THIS!
SET @DB_CHARSET = 'utf8mb4';
SET @DB_COLLATE = 'utf8mb4_unicode_ci';

-- ============================================================================
-- DATABASE CREATION
-- ============================================================================

-- Drop database if exists (USE WITH CAUTION - DATA LOSS!)
-- Uncomment the following line only if you want to recreate the database
-- DROP DATABASE IF EXISTS prilabsa_wp_local;

-- Create database with UTF8MB4 support
-- UTF8MB4 supports emoji and all international characters
CREATE DATABASE IF NOT EXISTS prilabsa_wp_local
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- Verify database creation
SELECT
    SCHEMA_NAME AS 'Database',
    DEFAULT_CHARACTER_SET_NAME AS 'Charset',
    DEFAULT_COLLATION_NAME AS 'Collation'
FROM information_schema.SCHEMATA
WHERE SCHEMA_NAME = 'prilabsa_wp_local';

-- ============================================================================
-- USER CREATION AND PRIVILEGES
-- ============================================================================

-- Drop user if exists (for clean reinstallation)
-- Uncomment if you need to recreate the user
-- DROP USER IF EXISTS 'wp_user'@'localhost';
-- DROP USER IF EXISTS 'wp_user'@'%';

-- Create WordPress database user
-- For local development: use 'localhost'
-- For Docker/remote: use '%' (any host)

-- LOCAL DEVELOPMENT (recommended for security)
CREATE USER IF NOT EXISTS 'wp_user'@'localhost'
    IDENTIFIED BY 'wp_secure_password_2025';

-- DOCKER/REMOTE ACCESS (use only if needed)
-- CREATE USER IF NOT EXISTS 'wp_user'@'%'
--     IDENTIFIED BY 'wp_secure_password_2025';

-- ============================================================================
-- GRANT PRIVILEGES
-- ============================================================================

-- Grant all privileges on the WordPress database
-- This gives full control over the specific database only

-- For localhost
GRANT ALL PRIVILEGES ON prilabsa_wp_local.*
    TO 'wp_user'@'localhost'
    WITH GRANT OPTION;

-- For remote access (Docker/network)
-- GRANT ALL PRIVILEGES ON prilabsa_wp_local.*
--     TO 'wp_user'@'%'
--     WITH GRANT OPTION;

-- ============================================================================
-- SPECIFIC PRIVILEGE ASSIGNMENT (Alternative - More Secure)
-- ============================================================================

-- If you prefer minimal privileges instead of ALL PRIVILEGES,
-- uncomment this section and comment out the ALL PRIVILEGES section above

/*
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER,
      CREATE TEMPORARY TABLES, LOCK TABLES, EXECUTE, CREATE VIEW,
      SHOW VIEW, CREATE ROUTINE, ALTER ROUTINE, TRIGGER
    ON prilabsa_wp_local.*
    TO 'wp_user'@'localhost';
*/

-- ============================================================================
-- FLUSH PRIVILEGES
-- ============================================================================

-- Apply all privilege changes immediately
FLUSH PRIVILEGES;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Show all databases accessible to wp_user
SELECT 'Databases accessible to wp_user:' AS '';
SHOW GRANTS FOR 'wp_user'@'localhost';

-- Show database character set and collation
SELECT 'Database configuration:' AS '';
SELECT
    SCHEMA_NAME AS 'Database',
    DEFAULT_CHARACTER_SET_NAME AS 'Charset',
    DEFAULT_COLLATION_NAME AS 'Collation',
    CONCAT(
        ROUND(SUM(data_length + index_length) / 1024 / 1024, 2), ' MB'
    ) AS 'Size'
FROM information_schema.SCHEMATA
LEFT JOIN information_schema.TABLES ON SCHEMATA.SCHEMA_NAME = TABLES.TABLE_SCHEMA
WHERE SCHEMA_NAME = 'prilabsa_wp_local'
GROUP BY SCHEMA_NAME;

-- ============================================================================
-- OPTIONAL: CREATE ADDITIONAL DATABASES FOR ENVIRONMENTS
-- ============================================================================

-- Development database
-- CREATE DATABASE IF NOT EXISTS prilabsa_wp_dev
--     CHARACTER SET utf8mb4
--     COLLATE utf8mb4_unicode_ci;
-- GRANT ALL PRIVILEGES ON prilabsa_wp_dev.* TO 'wp_user'@'localhost';

-- Staging database
-- CREATE DATABASE IF NOT EXISTS prilabsa_wp_staging
--     CHARACTER SET utf8mb4
--     COLLATE utf8mb4_unicode_ci;
-- GRANT ALL PRIVILEGES ON prilabsa_wp_staging.* TO 'wp_user'@'localhost';

-- Production database (use separate server recommended)
-- CREATE DATABASE IF NOT EXISTS prilabsa_wp_prod
--     CHARACTER SET utf8mb4
--     COLLATE utf8mb4_unicode_ci;
-- GRANT ALL PRIVILEGES ON prilabsa_wp_prod.* TO 'wp_user'@'localhost';

-- ============================================================================
-- WORDPRESS-SPECIFIC OPTIMIZATION SETTINGS
-- ============================================================================

-- Use the created database
USE prilabsa_wp_local;

-- Set timezone (optional - adjust to your server location)
-- SET GLOBAL time_zone = '+00:00';  -- UTC
-- SET GLOBAL time_zone = '-05:00';  -- Colombia/Ecuador

-- Optimize MySQL settings for WordPress (requires SUPER privilege)
-- These settings improve performance for typical WordPress workloads

-- SET GLOBAL max_allowed_packet = 268435456;      -- 256MB for large uploads
-- SET GLOBAL innodb_buffer_pool_size = 268435456; -- 256MB for InnoDB cache
-- SET GLOBAL query_cache_size = 67108864;         -- 64MB for query cache
-- SET GLOBAL query_cache_limit = 2097152;         -- 2MB per query
-- SET GLOBAL table_open_cache = 4096;             -- Open table cache
-- SET GLOBAL thread_cache_size = 8;               -- Thread cache

-- ============================================================================
-- BACKUP USER (Optional but Recommended)
-- ============================================================================

-- Create a read-only user for backups
-- This user can only SELECT data, making it safer for automated backups

-- CREATE USER IF NOT EXISTS 'wp_backup'@'localhost'
--     IDENTIFIED BY 'backup_password_2025';
--
-- GRANT SELECT, LOCK TABLES, SHOW VIEW, EVENT, TRIGGER
--     ON prilabsa_wp_local.*
--     TO 'wp_backup'@'localhost';
--
-- FLUSH PRIVILEGES;

-- ============================================================================
-- MONITORING USER (Optional)
-- ============================================================================

-- Create a monitoring user with minimal privileges
-- Useful for monitoring tools and health checks

-- CREATE USER IF NOT EXISTS 'wp_monitor'@'localhost'
--     IDENTIFIED BY 'monitor_password_2025';
--
-- GRANT PROCESS, REPLICATION CLIENT
--     ON *.*
--     TO 'wp_monitor'@'localhost';
--
-- FLUSH PRIVILEGES;

-- ============================================================================
-- CLEANUP AND MAINTENANCE COMMANDS
-- ============================================================================

-- Commands for future maintenance (DO NOT RUN NOW)

-- To reset user password:
-- ALTER USER 'wp_user'@'localhost' IDENTIFIED BY 'new_password';

-- To remove database:
-- DROP DATABASE prilabsa_wp_local;

-- To remove user:
-- DROP USER 'wp_user'@'localhost';

-- To backup database:
-- mysqldump -u wp_user -p prilabsa_wp_local > prilabsa_backup_$(date +%Y%m%d).sql

-- To restore database:
-- mysql -u wp_user -p prilabsa_wp_local < prilabsa_backup_YYYYMMDD.sql

-- ============================================================================
-- SECURITY HARDENING RECOMMENDATIONS
-- ============================================================================

/*
POST-DEPLOYMENT SECURITY CHECKLIST:

1. PASSWORD SECURITY:
   [ ] Change default passwords to strong, unique values
   [ ] Use password manager to store credentials securely
   [ ] Never commit passwords to version control

2. USER PRIVILEGES:
   [ ] Use least privilege principle
   [ ] Create separate users for different purposes (app, backup, monitor)
   [ ] Restrict users to specific hosts when possible

3. NETWORK SECURITY:
   [ ] Configure firewall to allow only necessary connections
   [ ] Use SSH tunnels for remote database access
   [ ] Consider MySQL SSL/TLS for remote connections

4. DATABASE HARDENING:
   [ ] Remove test databases: DROP DATABASE IF EXISTS test;
   [ ] Remove anonymous users: DELETE FROM mysql.user WHERE User='';
   [ ] Disable remote root: DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');
   [ ] Run: mysql_secure_installation

5. MONITORING:
   [ ] Enable MySQL slow query log
   [ ] Set up regular backups (daily recommended)
   [ ] Monitor disk space and database size
   [ ] Configure alerts for failed login attempts

6. BACKUP STRATEGY:
   [ ] Implement automated daily backups
   [ ] Store backups off-server (S3, separate server, etc.)
   [ ] Test backup restoration regularly
   [ ] Keep at least 7 days of backups

7. PERFORMANCE:
   [ ] Monitor query performance with slow query log
   [ ] Optimize tables regularly: OPTIMIZE TABLE wp_posts;
   [ ] Review and optimize database configuration
   [ ] Consider implementing replication for high availability
*/

-- ============================================================================
-- SUCCESSFUL SETUP MESSAGE
-- ============================================================================

SELECT '========================================' AS '';
SELECT 'DATABASE SETUP COMPLETED SUCCESSFULLY!' AS '';
SELECT '========================================' AS '';
SELECT '' AS '';
SELECT 'Database Name: prilabsa_wp_local' AS 'Configuration';
SELECT 'Username: wp_user' AS '';
SELECT 'Password: wp_secure_password_2025' AS '';
SELECT 'Charset: utf8mb4' AS '';
SELECT 'Collation: utf8mb4_unicode_ci' AS '';
SELECT '' AS '';
SELECT 'IMPORTANT: Change the default password!' AS 'Security Warning';
SELECT 'Use: ALTER USER wp_user@localhost IDENTIFIED BY your_new_password;' AS '';
SELECT '' AS '';
SELECT 'Connection test:' AS 'Next Steps';
SELECT 'mysql -u wp_user -p -D prilabsa_wp_local' AS '';
SELECT '' AS '';

-- ============================================================================
-- END OF DATABASE SETUP SCRIPT
-- ============================================================================
