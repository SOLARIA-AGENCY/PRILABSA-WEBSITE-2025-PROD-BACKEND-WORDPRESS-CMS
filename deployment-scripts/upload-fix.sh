#!/bin/bash

echo "🚀 Uploading fixed .htaccess..."

# Create lftp script
cat > upload_fix.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Backup existing .htaccess
get public_html/.htaccess -o public_html/.htaccess.backup_$(date +%s) || echo "No existing .htaccess to backup"

# Upload new .htaccess
put htaccess-hybrid -o public_html/.htaccess

echo "✅ Upload complete"
quit
EOF

# Execute lftp
lftp -f upload_fix.txt

# Clean up
rm upload_fix.txt
