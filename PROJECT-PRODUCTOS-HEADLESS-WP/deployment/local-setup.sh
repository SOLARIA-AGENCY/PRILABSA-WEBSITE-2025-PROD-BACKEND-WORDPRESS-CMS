#!/bin/bash

###############################################################################
# PRILABSA WordPress Headless - Local Development Setup Script
# Metodología: SOLARIA Agency
# Fase: 1 - Setup Local WordPress
# Agentes: DELTA (DevOps) + SIGMA (Backend)
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="prilabsa-local"
DB_NAME="prilabsa_wp_local"
DB_USER="wp_user"
DB_PASSWORD="wp_strong_password_2025!"
WP_ADMIN_USER="admin_local"
WP_ADMIN_EMAIL="dev@prilabsa.local"
WP_URL="http://localhost/$PROJECT_NAME"

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}║    PRILABSA WordPress Headless - Local Setup              ║${NC}"
echo -e "${BLUE}║    Metodología SOLARIA Agency                              ║${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

###############################################################################
# Step 1: Check Prerequisites
###############################################################################

echo -e "${YELLOW}[1/8] Verificando prerequisites...${NC}"

# Detect OS
OS_TYPE=$(uname -s)
echo "  OS detectado: $OS_TYPE"

# Check if XAMPP or Docker
if [ "$OS_TYPE" == "Darwin" ]; then
    # macOS
    XAMPP_PATH="/Applications/XAMPP/xamppfiles"
    HTDOCS_PATH="$XAMPP_PATH/htdocs"
elif [ "$OS_TYPE" == "Linux" ]; then
    # Linux
    XAMPP_PATH="/opt/lampp"
    HTDOCS_PATH="$XAMPP_PATH/htdocs"
else
    # Windows (Git Bash or WSL)
    XAMPP_PATH="/c/xampp"
    HTDOCS_PATH="$XAMPP_PATH/htdocs"
fi

if [ -d "$XAMPP_PATH" ]; then
    echo -e "  ${GREEN}✓${NC} XAMPP encontrado en: $XAMPP_PATH"
    USING_XAMPP=true
elif command -v docker &> /dev/null; then
    echo -e "  ${GREEN}✓${NC} Docker encontrado, usaremos Docker Compose"
    USING_XAMPP=false
else
    echo -e "  ${RED}✗${NC} Ni XAMPP ni Docker encontrados"
    echo -e "  ${YELLOW}Por favor instala XAMPP o Docker:${NC}"
    echo "    - XAMPP: https://www.apachefriends.org/download.html"
    echo "    - Docker: https://www.docker.com/get-started"
    exit 1
fi

###############################################################################
# Step 2: Setup WordPress Directory
###############################################################################

echo ""
echo -e "${YELLOW}[2/8] Preparando directorio WordPress...${NC}"

if [ "$USING_XAMPP" = true ]; then
    WP_DIR="$HTDOCS_PATH/$PROJECT_NAME"

    if [ -d "$WP_DIR" ]; then
        echo -e "  ${YELLOW}⚠${NC} Directorio ya existe: $WP_DIR"
        read -p "  ¿Deseas eliminar y reinstalar? (y/n): " CONFIRM
        if [ "$CONFIRM" == "y" ]; then
            echo "  Eliminando directorio existente..."
            rm -rf "$WP_DIR"
        else
            echo "  Abortando setup."
            exit 0
        fi
    fi

    mkdir -p "$WP_DIR"
    cd "$WP_DIR"
    echo -e "  ${GREEN}✓${NC} Directorio creado: $WP_DIR"
else
    # Docker setup
    WP_DIR="$PWD/wordpress-local"
    mkdir -p "$WP_DIR"
    cd "$WP_DIR"
    echo -e "  ${GREEN}✓${NC} Directorio Docker creado: $WP_DIR"
fi

###############################################################################
# Step 3: Download WordPress
###############################################################################

echo ""
echo -e "${YELLOW}[3/8] Descargando WordPress latest...${NC}"

if [ "$USING_XAMPP" = true ]; then
    curl -O https://wordpress.org/latest.tar.gz
    echo "  Extrayendo WordPress..."
    tar -xzf latest.tar.gz
    mv wordpress/* .
    rm -rf wordpress latest.tar.gz
    echo -e "  ${GREEN}✓${NC} WordPress descargado y extraído"
else
    # Docker will handle WordPress installation
    echo "  Docker descargará WordPress automáticamente"
fi

###############################################################################
# Step 4: Create Database (XAMPP only)
###############################################################################

if [ "$USING_XAMPP" = true ]; then
    echo ""
    echo -e "${YELLOW}[4/8] Configurando base de datos MySQL...${NC}"

    # Create SQL file
    SQL_FILE="/tmp/prilabsa_setup.sql"
    cat > "$SQL_FILE" <<EOF
CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';
FLUSH PRIVILEGES;
EOF

    # Execute SQL
    "$XAMPP_PATH/bin/mysql" -u root <<EOF
CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';
FLUSH PRIVILEGES;
EOF

    if [ $? -eq 0 ]; then
        echo -e "  ${GREEN}✓${NC} Base de datos '$DB_NAME' creada"
        echo -e "  ${GREEN}✓${NC} Usuario '$DB_USER' creado con permisos"
    else
        echo -e "  ${RED}✗${NC} Error creando base de datos"
        echo "  Intenta crearla manualmente via phpMyAdmin: http://localhost/phpmyadmin/"
    fi

    rm -f "$SQL_FILE"
fi

###############################################################################
# Step 5: Configure wp-config.php
###############################################################################

echo ""
echo -e "${YELLOW}[5/8] Configurando wp-config.php...${NC}"

if [ "$USING_XAMPP" = true ]; then
    # Generate WordPress security keys
    SALT=$(curl -s https://api.wordpress.org/secret-key/1.1/salt/)

    # Create wp-config.php
    cat > "$WP_DIR/wp-config.php" <<EOF
<?php
/**
 * PRILABSA WordPress Headless - Local Configuration
 * Generated by: local-setup.sh (SOLARIA Agency)
 * Date: $(date)
 */

// ** Database settings ** //
define('DB_NAME', '$DB_NAME');
define('DB_USER', '$DB_USER');
define('DB_PASSWORD', '$DB_PASSWORD');
define('DB_HOST', 'localhost');
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', 'utf8mb4_unicode_ci');

// ** Security Keys ** //
$SALT

// ** JWT Authentication ** //
define('JWT_AUTH_SECRET_KEY', '$(openssl rand -base64 32)');
define('JWT_AUTH_CORS_ENABLE', true);

// ** WordPress Database Table prefix ** //
\$table_prefix = 'wp_';

// ** Development Mode ** //
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
define('SCRIPT_DEBUG', true);

// ** Disable file editing ** //
define('DISALLOW_FILE_EDIT', false); // Allow for local dev

// ** WordPress Absolute Path ** //
if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/');
}

require_once ABSPATH . 'wp-settings.php';
EOF

    echo -e "  ${GREEN}✓${NC} wp-config.php creado con seguridad"
fi

###############################################################################
# Step 6: Configure CORS (.htaccess)
###############################################################################

echo ""
echo -e "${YELLOW}[6/8] Configurando CORS para desarrollo...${NC}"

if [ "$USING_XAMPP" = true ]; then
    cat > "$WP_DIR/.htaccess" <<'EOF'
# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
RewriteBase /prilabsa-local/
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /prilabsa-local/index.php [L]
</IfModule>
# END WordPress

# BEGIN CORS Configuration (Local Development)
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "http://localhost:5173"
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With"
    Header set Access-Control-Allow-Credentials "true"

    # Handle preflight requests
    RewriteCond %{REQUEST_METHOD} OPTIONS
    RewriteRule ^(.*)$ $1 [R=200,L]
</IfModule>
# END CORS Configuration
EOF

    echo -e "  ${GREEN}✓${NC} .htaccess configurado con CORS"
fi

###############################################################################
# Step 7: Install WordPress (CLI if available)
###############################################################################

echo ""
echo -e "${YELLOW}[7/8] Instalando WordPress...${NC}"

if command -v wp &> /dev/null && [ "$USING_XAMPP" = true ]; then
    echo "  Usando WP-CLI para instalación automática..."

    # Generate random admin password
    WP_ADMIN_PASSWORD=$(openssl rand -base64 12)

    wp core install \
        --url="$WP_URL" \
        --title="PRILABSA Local Dev" \
        --admin_user="$WP_ADMIN_USER" \
        --admin_password="$WP_ADMIN_PASSWORD" \
        --admin_email="$WP_ADMIN_EMAIL" \
        --path="$WP_DIR"

    echo -e "  ${GREEN}✓${NC} WordPress instalado via WP-CLI"
    echo ""
    echo -e "  ${BLUE}═══ CREDENCIALES WORDPRESS ═══${NC}"
    echo -e "  URL:      $WP_URL"
    echo -e "  Admin:    $WP_ADMIN_USER"
    echo -e "  Password: $WP_ADMIN_PASSWORD"
    echo -e "  ${BLUE}════════════════════════════════${NC}"
else
    echo "  WP-CLI no disponible o usando Docker."
    echo "  Completa instalación manualmente:"
    echo "  1. Navega a: $WP_URL"
    echo "  2. Sigue el wizard de instalación"
fi

###############################################################################
# Step 8: Create .env.local file
###############################################################################

echo ""
echo -e "${YELLOW}[8/8] Generando archivo .env.local...${NC}"

ENV_FILE="$PWD/../.env.local"
cat > "$ENV_FILE" <<EOF
# PRILABSA WordPress Headless - Local Environment
# Generated: $(date)
# DO NOT COMMIT TO GIT

# WordPress Local
WP_LOCAL_URL=$WP_URL
WP_ADMIN_URL=$WP_URL/wp-admin/
WP_API_URL=$WP_URL/wp-json/

# Database
WP_DB_NAME=$DB_NAME
WP_DB_USER=$DB_USER
WP_DB_PASSWORD=$DB_PASSWORD
WP_DB_HOST=localhost

# WordPress Admin (change after first login)
WP_ADMIN_USER=$WP_ADMIN_USER
WP_ADMIN_EMAIL=$WP_ADMIN_EMAIL

# JWT (DO NOT SHARE)
JWT_SECRET_KEY=$(openssl rand -base64 32)

# Vite Dev Server
VITE_API_BASE_URL=$WP_URL/wp-json
EOF

echo -e "  ${GREEN}✓${NC} Archivo .env.local creado"

###############################################################################
# Final Summary
###############################################################################

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                            ║${NC}"
echo -e "${GREEN}║    ✓ SETUP COMPLETADO EXITOSAMENTE                        ║${NC}"
echo -e "${GREEN}║                                                            ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}Próximos pasos:${NC}"
echo "  1. Navega a: $WP_URL"
echo "  2. Completa instalación si no usaste WP-CLI"
echo "  3. Login al admin: $WP_URL/wp-admin/"
echo "  4. Instala plugins necesarios (ver PHASE-1-LOCAL-SETUP.md)"
echo ""
echo -e "${YELLOW}Comandos útiles:${NC}"
if [ "$USING_XAMPP" = true ]; then
    echo "  - Iniciar XAMPP: sudo $XAMPP_PATH/xampp start"
    echo "  - Detener XAMPP: sudo $XAMPP_PATH/xampp stop"
    echo "  - phpMyAdmin: http://localhost/phpmyadmin/"
else
    echo "  - Iniciar Docker: docker-compose up -d"
    echo "  - Detener Docker: docker-compose down"
fi
echo ""
echo -e "${GREEN}Setup completado por AGENT DELTA (DevOps)${NC}"
echo -e "Siguiente: AGENT SIGMA configurará plugins y backend (Fase 2)"
echo ""
