#!/bin/bash

# Deployment Verification Script
# Quick verification of deployment to productos.prilabsa.com

URL="https://productos.prilabsa.com"

echo "🔍 DEPLOYMENT VERIFICATION - productos.prilabsa.com"
echo "=================================================="
echo ""

# 1. Root redirect
echo "1️⃣ Testing root redirect..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -L "$URL/")
if [ "$STATUS" -eq 200 ]; then
  echo "   ✅ Root redirects correctly (HTTP $STATUS)"
else
  echo "   ❌ Root redirect failed (HTTP $STATUS)"
fi
echo ""

# 2. Productos page
echo "2️⃣ Testing /productos page..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL/productos")
if [ "$STATUS" -eq 200 ]; then
  echo "   ✅ /productos loads (HTTP $STATUS)"
else
  echo "   ❌ /productos failed (HTTP $STATUS)"
fi
echo ""

# 3. Logo
echo "3️⃣ Testing logo images..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL/images/logos/prilabsa-logo.png")
if [ "$STATUS" -eq 200 ]; then
  echo "   ✅ Logo loads (HTTP $STATUS)"
else
  echo "   ❌ Logo failed (HTTP $STATUS)"
fi
echo ""

# 4. Language
echo "4️⃣ Testing Spanish language default..."
LANG=$(curl -sL "$URL/productos" | grep -o '<html[^>]*lang="[^"]*"' | head -1)
if [[ "$LANG" == *'lang="es"'* ]]; then
  echo "   ✅ Spanish is default language"
else
  echo "   ❌ Language not Spanish: $LANG"
fi
echo ""

# 5. Main bundle
echo "5️⃣ Testing main bundle..."
BUNDLE=$(curl -sL "$URL/productos" | grep -o 'assets/index-[A-Za-z0-9_-]*\.js' | head -1)
if [ -n "$BUNDLE" ]; then
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL/$BUNDLE")
  if [ "$STATUS" -eq 200 ]; then
    echo "   ✅ Main bundle loads: $BUNDLE (HTTP $STATUS)"
  else
    echo "   ❌ Main bundle failed: $BUNDLE (HTTP $STATUS)"
  fi
else
  echo "   ❌ Main bundle not found in HTML"
fi
echo ""

echo "=================================================="
echo "✅ Verification complete!"
echo ""
