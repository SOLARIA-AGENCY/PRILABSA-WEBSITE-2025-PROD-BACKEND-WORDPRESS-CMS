#!/bin/bash

echo "🚀 Uploading frontend files..."

# Create lftp script
cat > upload_frontend.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Upload assets directory
mirror -R dist/assets public_html/assets

# Upload index.html
put dist/index.html -o public_html/index.html

# Upload favicon
put dist/favicon.png -o public_html/favicon.png

echo "✅ Frontend upload complete"
quit
EOF

# Execute lftp
lftp -f upload_frontend.txt

# Clean up
rm upload_frontend.txt
