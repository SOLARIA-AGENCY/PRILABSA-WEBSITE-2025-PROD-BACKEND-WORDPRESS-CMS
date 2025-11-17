-- WordPress Admin User Creation SQL
-- Run this in phpMyAdmin database: productos_wp (or similar)

-- First, check if user exists and update password
UPDATE wp_users 
SET user_pass = MD5('SolariaAdmin2025!')
WHERE user_login = 'admin' OR user_login = 'webmaster' OR user_login = 'webmaster_solaria';

-- If no existing user, create new admin user
INSERT IGNORE INTO wp_users (user_login, user_pass, user_nicename, user_email, user_status, display_name) 
VALUES ('webmaster_solaria', MD5('SolariaAdmin2025!'), 'webmaster_solaria', 'webmaster@solaria.agency', 0, 'Webmaster Solaria');

-- Get the user ID
SET @user_id = (SELECT ID FROM wp_users WHERE user_login = 'webmaster_solaria');

-- Assign admin capabilities
INSERT IGNORE INTO wp_usermeta (user_id, meta_key, meta_value) 
VALUES 
(@user_id, 'wp_capabilities', 'a:1:{s:13:"administrator";s:1:"1";}'),
(@user_id, 'wp_user_level', '10'),
(@user_id, 'first_name', 'Webmaster'),
(@user_id, 'last_name', 'Solaria'),
(@user_id, 'nickname', 'webmaster_solaria');

-- Login credentials:
-- URL: https://productos.prilabsa.com/wp-admin/
-- Username: webmaster_solaria  
-- Password: SolariaAdmin2025!