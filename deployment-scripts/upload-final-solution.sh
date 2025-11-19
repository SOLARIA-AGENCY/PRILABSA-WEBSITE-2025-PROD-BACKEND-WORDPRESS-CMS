#!/bin/bash

echo "🚀 Uploading FINAL SOLUTION .htaccess..."

# Create lftp script
cat > upload_final_solution.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Backup existing .htaccess
get public_html/.htaccess -o .htaccess.backup_final || echo "No existing .htaccess"

# Upload new .htaccess
put htaccess-final-solution -o public_html/.htaccess

echo "✅ Upload complete"
quit
EOF

# Execute lftp
lftp -f upload_final_solution.txt

# Clean up
rm upload_final_solution.txt

echo "🎉 .htaccess deployed!"
echo "🔍 Testing API..."
sleep 2
curl -s https://productos.prilabsa.com/wp-json | head -5
