#!/bin/bash

# SSL Status Checker for prilabsa.solaria.agency
# Verifies SSL configuration and provides diagnostic information

SITE_URL="prilabsa.solaria.agency"
HTTPS_URL="https://${SITE_URL}"
HTTP_URL="http://${SITE_URL}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}🔍 SSL Status Check for ${SITE_URL}${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# Function to test HTTP connectivity
test_http() {
    echo -e "${YELLOW}📡 Testing HTTP connectivity...${NC}"
    
    HTTP_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 10 --max-time 30 "$HTTP_URL" 2>/dev/null || echo "000")
    
    if [ "$HTTP_RESPONSE" = "200" ] || [ "$HTTP_RESPONSE" = "301" ] || [ "$HTTP_RESPONSE" = "302" ]; then
        echo -e "${GREEN}✅ HTTP funciona correctamente (${HTTP_RESPONSE})${NC}"
        return 0
    else
        echo -e "${RED}❌ HTTP no responde correctamente (${HTTP_RESPONSE})${NC}"
        return 1
    fi
}

# Function to test HTTPS connectivity
test_https() {
    echo -e "${YELLOW}🔒 Testing HTTPS connectivity...${NC}"
    
    # Test HTTPS with detailed error information
    HTTPS_OUTPUT=$(curl -s -I --connect-timeout 10 --max-time 30 "$HTTPS_URL" 2>&1)
    HTTPS_RESPONSE=$(echo "$HTTPS_OUTPUT" | head -n1 | grep -o '[0-9]\{3\}' | head -n1)
    
    if echo "$HTTPS_OUTPUT" | grep -q "SSL_ERROR_SYSCALL\|SSL handshake\|SSL connection\|525"; then
        echo -e "${RED}❌ Error 525: SSL Handshake Failed${NC}"
        echo -e "${YELLOW}   Cloudflare no puede conectar con el servidor origen via SSL${NC}"
        return 1
    elif [ "$HTTPS_RESPONSE" = "200" ] || [ "$HTTPS_RESPONSE" = "301" ] || [ "$HTTPS_RESPONSE" = "302" ]; then
        echo -e "${GREEN}✅ HTTPS funciona correctamente (${HTTPS_RESPONSE})${NC}"
        return 0
    else
        echo -e "${RED}❌ HTTPS no responde correctamente${NC}"
        echo -e "${YELLOW}   Response: ${HTTPS_RESPONSE:-'No response'}${NC}"
        return 1
    fi
}

# Function to check DNS resolution
check_dns() {
    echo -e "${YELLOW}🌐 Checking DNS resolution...${NC}"
    
    DNS_RESULT=$(nslookup "$SITE_URL" 2>/dev/null | grep -A1 "Name:" | tail -n1 | awk '{print $2}')
    
    if [ -n "$DNS_RESULT" ]; then
        echo -e "${GREEN}✅ DNS resuelve a: ${DNS_RESULT}${NC}"
        return 0
    else
        echo -e "${RED}❌ DNS no resuelve correctamente${NC}"
        return 1
    fi
}

# Function to check Cloudflare status
check_cloudflare() {
    echo -e "${YELLOW}☁️  Checking Cloudflare status...${NC}"
    
    CF_HEADERS=$(curl -s -I --connect-timeout 10 "$HTTP_URL" 2>/dev/null | grep -i "cf-\|cloudflare")
    
    if [ -n "$CF_HEADERS" ]; then
        echo -e "${GREEN}✅ Cloudflare detectado${NC}"
        echo "$CF_HEADERS" | while read -r line; do
            echo -e "${BLUE}   $line${NC}"
        done
        return 0
    else
        echo -e "${YELLOW}⚠️  Cloudflare headers no detectados${NC}"
        return 1
    fi
}

# Function to provide SSL fix recommendations
recommend_ssl_fix() {
    echo ""
    echo -e "${CYAN}🔧 SOLUCIÓN RECOMENDADA${NC}"
    echo -e "${BLUE}================================================${NC}"
    echo -e "${YELLOW}El error 525 indica que Cloudflare no puede establecer${NC}"
    echo -e "${YELLOW}una conexión SSL con el servidor origen (Hostinger).${NC}"
    echo ""
    echo -e "${GREEN}Solución inmediata:${NC}"
    echo -e "${BLUE}1. Accede a Cloudflare Dashboard${NC}"
    echo -e "${BLUE}2. Ve a SSL/TLS > Overview${NC}"
    echo -e "${BLUE}3. Cambia el modo SSL de 'Full' a 'Flexible'${NC}"
    echo ""
    echo -e "${GREEN}O ejecuta:${NC}"
    echo -e "${BLUE}npm run ssl:fix${NC}"
    echo ""
    echo -e "${YELLOW}Esto permitirá:${NC}"
    echo -e "${BLUE}• Usuario → Cloudflare: HTTPS (encriptado)${NC}"
    echo -e "${BLUE}• Cloudflare → Hostinger: HTTP (no encriptado)${NC}"
    echo -e "${BLUE}• Resultado: Sitio funcional con HTTPS${NC}"
}

# Main execution
echo -e "${BLUE}Iniciando verificación completa...${NC}"
echo ""

# Run all checks
DNS_OK=0
HTTP_OK=0
HTTPS_OK=0
CF_OK=0

check_dns && DNS_OK=1
echo ""

test_http && HTTP_OK=1
echo ""

test_https && HTTPS_OK=1
echo ""

check_cloudflare && CF_OK=1
echo ""

# Summary
echo -e "${CYAN}📊 RESUMEN DEL ESTADO${NC}"
echo -e "${BLUE}================================================${NC}"
echo -e "DNS Resolution: $([ $DNS_OK -eq 1 ] && echo -e "${GREEN}✅ OK${NC}" || echo -e "${RED}❌ FAIL${NC}")"
echo -e "HTTP Access:    $([ $HTTP_OK -eq 1 ] && echo -e "${GREEN}✅ OK${NC}" || echo -e "${RED}❌ FAIL${NC}")"
echo -e "HTTPS Access:   $([ $HTTPS_OK -eq 1 ] && echo -e "${GREEN}✅ OK${NC}" || echo -e "${RED}❌ FAIL${NC}")"
echo -e "Cloudflare:     $([ $CF_OK -eq 1 ] && echo -e "${GREEN}✅ OK${NC}" || echo -e "${YELLOW}⚠️  PARTIAL${NC}")"
echo ""

# Determine overall status and recommendations
if [ $HTTPS_OK -eq 1 ]; then
    echo -e "${GREEN}🎉 SSL está funcionando correctamente!${NC}"
    echo -e "${GREEN}El sitio es accesible via HTTPS${NC}"
    exit 0
elif [ $HTTP_OK -eq 1 ] && [ $HTTPS_OK -eq 0 ]; then
    echo -e "${YELLOW}⚠️  SSL Error 525 detectado${NC}"
    echo -e "${YELLOW}El sitio funciona via HTTP pero no HTTPS${NC}"
    recommend_ssl_fix
    exit 1
else
    echo -e "${RED}❌ Problemas graves de conectividad detectados${NC}"
    echo -e "${RED}El sitio no es accesible via HTTP ni HTTPS${NC}"
    echo ""
    echo -e "${YELLOW}Verifica:${NC}"
    echo -e "${BLUE}• Configuración DNS${NC}"
    echo -e "${BLUE}• Estado del servidor Hostinger${NC}"
    echo -e "${BLUE}• Configuración de Cloudflare${NC}"
    exit 1
fi