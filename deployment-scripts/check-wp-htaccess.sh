#!/bin/bash

echo "🔍 Checking for .htaccess in wordpress directory..."

# Create lftp script
cat > check_wp_htaccess.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%
echo "--- Checking WordPress .htaccess ---"
get public_html/wordpress/.htaccess -o wordpress-htaccess-backup.txt || echo "No .htaccess in wordpress directory"
quit
EOF

# Execute lftp
lftp -f check_wp_htaccess.txt

# Show content if it exists
if [ -f wordpress-htaccess-backup.txt ]; then
    echo "--- WordPress .htaccess content ---"
    cat wordpress-htaccess-backup.txt
fi

# Clean up
rm check_wp_htaccess.txt
