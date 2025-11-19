#!/bin/bash

echo "🔍 Checking server files detailed..."

# Create lftp script
cat > check_files_detailed.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%
echo "--- ROOT ---"
ls public_html/
echo "--- WORDPRESS DIR ---"
ls public_html/wordpress/
quit
EOF

# Execute lftp
lftp -f check_files_detailed.txt

# Clean up
rm check_files_detailed.txt
