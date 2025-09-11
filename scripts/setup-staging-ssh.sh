#!/bin/bash

# SSH Setup Script for Prilabsa Staging Environment
# Target Server: fr-int-web1794.main-hosting.eu
# User: u882790918
# Domain: prilabsa.solaria.agency

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Configuration
STAGING_HOST="fr-int-web1794.main-hosting.eu"
STAGING_USER="u882790918"
STAGING_DOMAIN="prilabsa.solaria.agency"
STAGING_PATH="/home/u882790918/domains/prilabsa.solaria.agency/public_html"
SSH_KEY_PATH="$HOME/.ssh/prilabsa_staging_deploy_key"
SSH_CONFIG_PATH="$HOME/.ssh/config"

log_info "🚀 Setting up SSH configuration for Prilabsa staging environment"
log_info "Target: $STAGING_HOST"
log_info "User: $STAGING_USER"
log_info "Domain: $STAGING_DOMAIN"

# Check if SSH key exists
if [ ! -f "$SSH_KEY_PATH" ]; then
    log_warning "SSH key not found at $SSH_KEY_PATH"
    log_info "Please ensure you have the staging deploy key installed"
    log_info "Expected key location: $SSH_KEY_PATH"
    
    read -p "Do you want to create the SSH key directory? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        mkdir -p "$(dirname "$SSH_KEY_PATH")"
        log_success "SSH directory created"
        log_warning "Please copy your staging deploy key to: $SSH_KEY_PATH"
        log_warning "Then run: chmod 600 $SSH_KEY_PATH"
    fi
else
    log_success "SSH key found at $SSH_KEY_PATH"
    
    # Check key permissions
    KEY_PERMS=$(stat -c "%a" "$SSH_KEY_PATH" 2>/dev/null || stat -f "%A" "$SSH_KEY_PATH" 2>/dev/null || echo "unknown")
    if [ "$KEY_PERMS" != "600" ]; then
        log_warning "SSH key permissions are $KEY_PERMS, should be 600"
        chmod 600 "$SSH_KEY_PATH"
        log_success "SSH key permissions corrected"
    fi
fi

# Backup existing SSH config if it exists
if [ -f "$SSH_CONFIG_PATH" ]; then
    if ! grep -q "prilabsa-staging" "$SSH_CONFIG_PATH"; then
        log_info "Backing up existing SSH config"
        cp "$SSH_CONFIG_PATH" "$SSH_CONFIG_PATH.backup.$(date +%Y%m%d_%H%M%S)"
    else
        log_info "Prilabsa staging configuration already exists in SSH config"
    fi
fi

# Add SSH configuration
log_info "Adding SSH configuration for staging environment"

# Create SSH config entry
SSH_CONFIG_ENTRY="
# Prilabsa Staging Environment Configuration
# Added on $(date)
Host prilabsa-staging
    HostName $STAGING_HOST
    User $STAGING_USER
    Port 22
    IdentityFile $SSH_KEY_PATH
    StrictHostKeyChecking no
    UserKnownHostsFile /dev/null
    ServerAliveInterval 60
    ServerAliveCountMax 3
    ConnectTimeout 30

# Direct connection alternative
Host $STAGING_HOST
    User $STAGING_USER
    Port 22
    IdentityFile $SSH_KEY_PATH
    StrictHostKeyChecking no
    UserKnownHostsFile /dev/null
    ServerAliveInterval 60
    ServerAliveCountMax 3
    ConnectTimeout 30
"

# Add to SSH config if not already present
if [ ! -f "$SSH_CONFIG_PATH" ] || ! grep -q "prilabsa-staging" "$SSH_CONFIG_PATH"; then
    echo "$SSH_CONFIG_ENTRY" >> "$SSH_CONFIG_PATH"
    log_success "SSH configuration added"
else
    log_info "SSH configuration already exists"
fi

# Set proper permissions
chmod 600 "$SSH_CONFIG_PATH" 2>/dev/null || true

# Test SSH connection
log_info "Testing SSH connection to staging server..."

if [ -f "$SSH_KEY_PATH" ]; then
    if ssh -o ConnectTimeout=10 -o BatchMode=yes prilabsa-staging "echo 'SSH connection successful'" 2>/dev/null; then
        log_success "SSH connection to staging server successful!"
        
        # Test staging directory access
        log_info "Testing staging directory access..."
        if ssh prilabsa-staging "ls -la $STAGING_PATH" 2>/dev/null; then
            log_success "Staging directory accessible"
        else
            log_warning "Staging directory not accessible or doesn't exist"
            log_info "Creating staging directory..."
            if ssh prilabsa-staging "mkdir -p $STAGING_PATH" 2>/dev/null; then
                log_success "Staging directory created"
            else
                log_error "Failed to create staging directory"
            fi
        fi
        
    else
        log_error "SSH connection failed"
        log_info "Please check:"
        log_info "1. SSH key is correctly installed at $SSH_KEY_PATH"
        log_info "2. SSH key has been added as a deploy key to the repository"
        log_info "3. Server $STAGING_HOST is accessible"
        log_info "4. User $STAGING_USER has proper permissions"
    fi
else
    log_warning "SSH key not found, skipping connection test"
fi

# Display next steps
log_info "\n📋 Next Steps:"
log_info "1. Ensure the staging deploy key is added to your repository as a Deploy Key"
log_info "2. Add the following secrets to your GitHub repository:"
log_info "   - STAGING_FTP_HOST: $STAGING_HOST"
log_info "   - STAGING_FTP_USER: $STAGING_USER"
log_info "   - STAGING_FTP_PASSWORD: [your staging password]"
log_info "3. Test the deployment with: npm run deploy:staging"
log_info "4. Access your staging site at: https://$STAGING_DOMAIN"

log_success "\n✅ SSH setup for Prilabsa staging environment completed!"
log_info "Configuration saved to: $SSH_CONFIG_PATH"
log_info "You can now connect using: ssh prilabsa-staging"