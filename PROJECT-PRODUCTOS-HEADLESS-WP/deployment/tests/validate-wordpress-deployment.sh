#!/bin/bash
#
# WordPress Deployment Validation Tests
# Validates WordPress CMS deployment and plugin PRILABSA
#
# Usage: ./validate-wordpress-deployment.sh
#

set -e

echo "════════════════════════════════════════════════════════"
echo "  WordPress Deployment Validation Tests"
echo "  Date: $(date '+%Y-%m-%d %H:%M:%S')"
echo "════════════════════════════════════════════════════════"
echo ""

# Configuration
BASE_URL="https://productos.prilabsa.com"
API_URL="$BASE_URL/wp-json"
ERRORS=0
WARNINGS=0

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test helper functions
test_pass() {
    echo -e "${GREEN}✓${NC} $1"
}

test_fail() {
    echo -e "${RED}✗${NC} $1"
    ((ERRORS++))
}

test_warn() {
    echo -e "${YELLOW}⚠${NC} $1"
    ((WARNINGS++))
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "TEST 1: WordPress Core Accessible"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test 1.1: WordPress admin redirect
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/wp-admin/")
if [ "$HTTP_CODE" = "302" ]; then
    test_pass "WordPress admin redirect (HTTP 302)"
else
    test_fail "WordPress admin not redirecting (HTTP $HTTP_CODE, expected 302)"
fi

# Test 1.2: WordPress login page
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/wp-login.php")
if [ "$HTTP_CODE" = "200" ]; then
    test_pass "WordPress login page accessible (HTTP 200)"
else
    test_fail "WordPress login page error (HTTP $HTTP_CODE, expected 200)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "TEST 2: REST API Functional"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test 2.1: REST API root
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/")
if [ "$HTTP_CODE" = "200" ]; then
    test_pass "REST API root accessible (HTTP 200)"
else
    test_fail "REST API root error (HTTP $HTTP_CODE, expected 200)"
fi

# Test 2.2: REST API returns JSON
CONTENT_TYPE=$(curl -s -I "$API_URL/" | grep -i "content-type" | grep -i "json")
if [ ! -z "$CONTENT_TYPE" ]; then
    test_pass "REST API returns JSON"
else
    test_fail "REST API not returning JSON"
fi

# Test 2.3: WordPress API v2
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/wp/v2/")
if [ "$HTTP_CODE" = "200" ]; then
    test_pass "WordPress API v2 accessible (HTTP 200)"
else
    test_fail "WordPress API v2 error (HTTP $HTTP_CODE, expected 200)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "TEST 3: Custom Post Type 'productos'"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test 3.1: Productos endpoint exists
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/wp/v2/productos")
if [ "$HTTP_CODE" = "200" ]; then
    test_pass "Custom Post Type 'productos' registered (HTTP 200)"
else
    test_fail "Custom Post Type 'productos' not found (HTTP $HTTP_CODE, expected 200)"
fi

# Test 3.2: Productos returns JSON array
RESPONSE=$(curl -s "$API_URL/wp/v2/productos")
if echo "$RESPONSE" | jq empty 2>/dev/null; then
    test_pass "Productos endpoint returns valid JSON"

    # Count products
    PRODUCT_COUNT=$(echo "$RESPONSE" | jq 'length')
    if [ "$PRODUCT_COUNT" -gt 0 ]; then
        test_pass "Products found: $PRODUCT_COUNT"
    else
        test_warn "No products published yet (count: $PRODUCT_COUNT)"
    fi
else
    test_fail "Productos endpoint returns invalid JSON"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "TEST 4: Taxonomies"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test 4.1: Categorías Productos
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/wp/v2/categorias_productos")
if [ "$HTTP_CODE" = "200" ]; then
    test_pass "Taxonomy 'categorias_productos' registered (HTTP 200)"
else
    test_fail "Taxonomy 'categorias_productos' not found (HTTP $HTTP_CODE)"
fi

# Test 4.2: Tags Productos
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/wp/v2/tags_productos")
if [ "$HTTP_CODE" = "200" ]; then
    test_pass "Taxonomy 'tags_productos' registered (HTTP 200)"
else
    test_fail "Taxonomy 'tags_productos' not found (HTTP $HTTP_CODE)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "TEST 5: React Frontend Preserved"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test 5.1: Frontend home
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/productos")
if [ "$HTTP_CODE" = "200" ]; then
    test_pass "React frontend /productos accessible (HTTP 200)"
else
    test_fail "React frontend error (HTTP $HTTP_CODE, expected 200)"
fi

# Test 5.2: Check if React bundle loads
RESPONSE=$(curl -s "$BASE_URL/productos")
if echo "$RESPONSE" | grep -q "root"; then
    test_pass "React root element present in HTML"
else
    test_warn "React root element not detected"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "TEST 6: ACF Fields Exposed in API"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test 6.1: Check if productos have ACF fields
RESPONSE=$(curl -s "$API_URL/wp/v2/productos?per_page=1")
PRODUCT_COUNT=$(echo "$RESPONSE" | jq 'length')

if [ "$PRODUCT_COUNT" -gt 0 ]; then
    # Check if ACF fields exist
    HAS_ACF=$(echo "$RESPONSE" | jq '.[0].acf' 2>/dev/null)
    if [ "$HAS_ACF" != "null" ] && [ ! -z "$HAS_ACF" ]; then
        test_pass "ACF fields exposed in REST API"

        # Check specific fields
        NOMBRE_ES=$(echo "$RESPONSE" | jq -r '.[0].acf.nombre_producto_es' 2>/dev/null)
        if [ "$NOMBRE_ES" != "null" ] && [ ! -z "$NOMBRE_ES" ]; then
            test_pass "ACF field 'nombre_producto_es' present"
        else
            test_warn "ACF field 'nombre_producto_es' missing or null"
        fi
    else
        test_fail "ACF fields NOT exposed in REST API"
    fi
else
    test_warn "Cannot test ACF fields (no products published)"
fi

echo ""
echo "════════════════════════════════════════════════════════"
echo "  Test Summary"
echo "════════════════════════════════════════════════════════"
echo ""

TOTAL_TESTS=$((ERRORS + WARNINGS))

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ ALL TESTS PASSED${NC}"
    echo ""
    echo "Errors: 0"
    echo "Warnings: $WARNINGS"
    exit 0
else
    echo -e "${RED}✗ TESTS FAILED${NC}"
    echo ""
    echo "Errors: $ERRORS"
    echo "Warnings: $WARNINGS"
    exit 1
fi
