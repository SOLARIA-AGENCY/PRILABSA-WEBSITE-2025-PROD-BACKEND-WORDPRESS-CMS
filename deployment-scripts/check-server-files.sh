#!/bin/bash

echo "🔍 Checking server files..."

# Create lftp script
cat > check_files.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%
ls public_html/
quit
EOF

# Execute lftp
lftp -f check_files.txt

# Clean up
rm check_files.txt
