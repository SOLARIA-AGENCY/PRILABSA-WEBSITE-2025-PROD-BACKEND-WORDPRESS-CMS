#!/bin/bash

# PRILABSA Emergency Deployment Script
# Deploys updated solution with PHP file server

echo "🚀 Starting PRILABSA Emergency Deployment..."

# FTP Configuration
FTP_HOST="blog.prilabsa.com"
FTP_USER="solaria.charlie@blog.prilabsa.com"
FTP_PASS="SoCh2025$%"
REMOTE_DIR="/public_html"

# Upload critical files
echo "📤 Uploading PHP file server..."
lftp -u "$FTP_USER,$FTP_PASS" $FTP_HOST <<EOF
set ssl:verify-certificate no
cd $REMOTE_DIR
put file-server.php
put .htaccess
quit
EOF

# Upload updated assets
echo "📤 Uploading updated assets..."
lftp -u "$FTP_USER,$FTP_PASS" $FTP_HOST <<EOF
set ssl:verify-certificate no
cd $REMOTE_DIR
mirror -R --delete dist/assets/ assets/
quit
EOF

# Upload product images
echo "📤 Uploading product images..."
lftp -u "$FTP_USER,$FTP_PASS" $FTP_HOST <<EOF
set ssl:verify-certificate no
cd $REMOTE_DIR
mirror -R --delete assets/product-images/ assets/product-images/
quit
EOF

# Upload main HTML
echo "📤 Uploading main index.html..."
lftp -u "$FTP_USER,$FTP_PASS" $FTP_HOST <<EOF
set ssl:verify-certificate no
cd $REMOTE_DIR
put dist/index.html
quit
EOF

echo "✅ Deployment completed!"
echo "🌐 Testing site..."

# Test the site
curl -I https://productos.prilabsa.com/ | head -1

echo "🎯 Deployment complete!"