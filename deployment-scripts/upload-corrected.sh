#!/bin/bash

echo "🚀 Uploading CORRECTED .htaccess with priority rules..."

# Create lftp script
cat > upload_corrected.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Upload  new .htaccess
put .htaccess -o public_html/.htaccess

echo "✅ Upload complete"
quit
EOF

# Execute lftp
lftp -f upload_corrected.txt

# Clean up
rm upload_corrected.txt

echo "🎉 .htaccess deployed!"
echo "🔍 Testing WordPress API directly..."
sleep 3
curl -s 'https://productos.prilabsa.com/wordpress/wp-json/' | python3 -m json.tool | head -20 || echo "Not JSON, showing raw:"
curl -s 'https://productos.prilabsa.com/wordpress/wp-json/' | head -10
