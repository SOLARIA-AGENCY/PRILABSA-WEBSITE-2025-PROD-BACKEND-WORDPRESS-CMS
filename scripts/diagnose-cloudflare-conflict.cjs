#!/usr/bin/env node

const { execSync } = require('child_process');
const https = require('https');
const http = require('http');

console.log('🔍 DIAGNÓSTICO AVANZADO CLOUDFLARE-HOSTINGER');
console.log('=' .repeat(60));

// Función para ejecutar comandos y capturar output
function runCommand(command) {
    try {
        return execSync(command, { encoding: 'utf8' }).trim();
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

// Función para hacer request HTTP con detalles
function makeHttpRequest(url) {
    return new Promise((resolve) => {
        const urlObj = new URL(url);
        const options = {
            hostname: urlObj.hostname,
            port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
            path: urlObj.pathname,
            method: 'GET',
            headers: {
                'User-Agent': 'PRILABSA-DNS-Diagnostic/1.0'
            }
        };

        const client = urlObj.protocol === 'https:' ? https : http;
        
        const req = client.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    data: data.substring(0, 500) // Primeros 500 chars
                });
            });
        });

        req.on('error', (error) => {
            resolve({ error: error.message });
        });

        req.setTimeout(10000, () => {
            req.destroy();
            resolve({ error: 'Timeout' });
        });

        req.end();
    });
}

async function diagnosticComplete() {
    console.log('\n📋 PASO 1: Verificación DNS Detallada');
    console.log('-'.repeat(40));
    
    // DNS Resolution detallada
    console.log('🔍 DNS A Record:');
    const dnsA = runCommand('dig +short prilabsa.solaria.agency A');
    console.log(`   ${dnsA}`);
    
    console.log('🔍 DNS CNAME Record:');
    const dnsCNAME = runCommand('dig +short prilabsa.solaria.agency CNAME');
    console.log(`   ${dnsCNAME || 'No CNAME found'}`);
    
    console.log('🔍 DNS con diferentes servidores:');
    const servers = ['8.8.8.8', '1.1.1.1', '208.67.222.222'];
    for (const server of servers) {
        const result = runCommand(`dig @${server} +short prilabsa.solaria.agency A`);
        console.log(`   @${server}: ${result}`);
    }
    
    console.log('\n📋 PASO 2: Verificación HTTP Detallada');
    console.log('-'.repeat(40));
    
    // HTTP Request detallado
    console.log('🌐 HTTP Request a prilabsa.solaria.agency:');
    const httpResult = await makeHttpRequest('http://prilabsa.solaria.agency');
    console.log(`   Status: ${httpResult.statusCode || 'Error'}`);
    if (httpResult.headers) {
        console.log(`   Location: ${httpResult.headers.location || 'N/A'}`);
        console.log(`   Server: ${httpResult.headers.server || 'N/A'}`);
        console.log(`   X-Redirect-By: ${httpResult.headers['x-redirect-by'] || 'N/A'}`);
    }
    if (httpResult.error) {
        console.log(`   Error: ${httpResult.error}`);
    }
    
    console.log('\n🔒 HTTPS Request a prilabsa.solaria.agency:');
    const httpsResult = await makeHttpRequest('https://prilabsa.solaria.agency');
    console.log(`   Status: ${httpsResult.statusCode || 'Error'}`);
    if (httpsResult.headers) {
        console.log(`   Location: ${httpsResult.headers.location || 'N/A'}`);
        console.log(`   Server: ${httpsResult.headers.server || 'N/A'}`);
        console.log(`   CF-Ray: ${httpsResult.headers['cf-ray'] || 'N/A'}`);
    }
    if (httpsResult.error) {
        console.log(`   Error: ${httpsResult.error}`);
    }
    
    console.log('\n📋 PASO 3: Verificación del Servidor Target');
    console.log('-'.repeat(40));
    
    // Verificar servidor target directamente
    console.log('🎯 Verificando servidor target (193.203.168.188):');
    const targetResult = await makeHttpRequest('http://193.203.168.188');
    console.log(`   Status: ${targetResult.statusCode || 'Error'}`);
    if (targetResult.headers) {
        console.log(`   Server: ${targetResult.headers.server || 'N/A'}`);
    }
    if (targetResult.error) {
        console.log(`   Error: ${targetResult.error}`);
    }
    
    console.log('\n📋 PASO 4: Análisis de Cloudflare');
    console.log('-'.repeat(40));
    
    // Verificar si está pasando por Cloudflare
    console.log('☁️ Verificando headers de Cloudflare:');
    if (httpsResult.headers) {
        const cfHeaders = Object.keys(httpsResult.headers)
            .filter(key => key.toLowerCase().startsWith('cf-'))
            .map(key => `${key}: ${httpsResult.headers[key]}`);
        
        if (cfHeaders.length > 0) {
            console.log('   Headers CF encontrados:');
            cfHeaders.forEach(header => console.log(`     ${header}`));
        } else {
            console.log('   ⚠️ No se encontraron headers de Cloudflare');
        }
    }
    
    console.log('\n📋 DIAGNÓSTICO FINAL');
    console.log('=' .repeat(60));
    
    // Análisis final
    const currentIPs = dnsA.split('\n').filter(ip => ip.trim());
    const targetIP = '193.203.168.188';
    
    if (currentIPs.includes(targetIP)) {
        console.log('✅ DNS apunta a la IP correcta');
        if (httpsResult.statusCode === 301) {
            console.log('❌ PROBLEMA: Servidor está redirigiendo');
            console.log('   Causa probable: Configuración en el servidor web');
        } else {
            console.log('✅ Configuración correcta');
        }
    } else {
        console.log('❌ PROBLEMA: DNS no apunta a la IP correcta');
        console.log(`   IPs actuales: ${currentIPs.join(', ')}`);
        console.log(`   IP objetivo: ${targetIP}`);
        console.log('   Causa probable: Configuración de Cloudflare no propagada');
    }
    
    console.log('\n🔧 ACCIONES RECOMENDADAS:');
    if (!currentIPs.includes(targetIP)) {
        console.log('1. Purgar cache de Cloudflare completamente');
        console.log('2. Verificar que el registro A esté en modo "DNS only" (gris)');
        console.log('3. Esperar 15-30 minutos para propagación');
    } else if (httpsResult.statusCode === 301) {
        console.log('1. Verificar configuración del servidor web en Hostinger');
        console.log('2. Revisar archivos .htaccess o configuración de virtual hosts');
        console.log('3. Contactar soporte de Hostinger si es necesario');
    }
}

diagnosticComplete().catch(console.error);