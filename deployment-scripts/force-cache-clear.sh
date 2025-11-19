#!/bin/bash

echo "⚡ FORZANDO limpieza de caché - cambiando permisos y timestamp..."

cat > force_cache_clear.txt << EOF
set ftp:ssl-allow no
set ftp:passive-mode on
open ftp://productos.prilabsa.com
user solaria.charlie@blog.prilabsa.com SoCh2025\$%

# Change permissions (this sometimes triggers cache清invalidation)
quote SITE CHMOD 644 public_html/index.html
quote SITE CHMOD 755 public_html/index.html
quote SITE CHMOD 644 public_html/index.html

# Delete and re-upload to force new timestamp
rm -f public_html/index.html
put dist/index.html -o public_html/index.html

# Touch all JS files to update timestamps
quote SITE CHMOD 644 public_html/assets/index-BV5pYAlm.js
quote SITE CHMOD 644 public_html/assets/index.js  
quote SITE CHMOD 644 public_html/assets/react-DMrr_GdF.js
quote SITE CHMOD 644 public_html/assets/vendor-CtuOAJYM.js

quit
EOF

lftp -f force_cache_clear.txt
rm force_cache_clear.txt

echo "✅ Timestamps actualizados!"
echo "⏳ Esperando 10 segundos para que la caché se limpie..."
sleep 10
echo "🔍 Probando ahora..."
curl -H "Cache-Control: no-cache" -H "Pragma: no-cache" -s "https://productos.prilabsa.com/?cachebust=$(date +%s)" | grep "script type"
