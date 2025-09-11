#!/usr/bin/env node

/**
 * Diagnóstico de Redirección prilabsa.solaria.agency
 * Identifica y analiza el problema de redirección 301
 */

import https from 'https';
import http from 'http';
import { URL } from 'url';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`[${step}] ${message}`, 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

async function makeRequest(url, followRedirects = false) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'HEAD',
      headers: {
        'User-Agent': 'PRILABSA-Diagnostic-Tool/1.0'
      }
    };

    const client = urlObj.protocol === 'https:' ? https : http;
    
    const req = client.request(options, (res) => {
      resolve({
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        headers: res.headers,
        url: url
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

async function analyzeRedirectChain(startUrl, maxRedirects = 5) {
  const chain = [];
  let currentUrl = startUrl;
  let redirectCount = 0;

  while (redirectCount < maxRedirects) {
    try {
      logStep('REQ', `Testing: ${currentUrl}`);
      const response = await makeRequest(currentUrl);
      
      chain.push({
        url: currentUrl,
        status: response.statusCode,
        statusMessage: response.statusMessage,
        location: response.headers.location,
        server: response.headers.server,
        xRedirectBy: response.headers['x-redirect-by'],
        xPoweredBy: response.headers['x-powered-by']
      });

      // Log response details
      if (response.statusCode >= 300 && response.statusCode < 400) {
        logWarning(`${response.statusCode} ${response.statusMessage}`);
        if (response.headers.location) {
          logInfo(`   Redirects to: ${response.headers.location}`);
        }
        if (response.headers['x-redirect-by']) {
          logInfo(`   Redirect by: ${response.headers['x-redirect-by']}`);
        }
      } else if (response.statusCode === 200) {
        logSuccess(`${response.statusCode} ${response.statusMessage}`);
      } else {
        logError(`${response.statusCode} ${response.statusMessage}`);
      }

      // Check if this is a redirect
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        currentUrl = response.headers.location;
        redirectCount++;
      } else {
        break;
      }
    } catch (error) {
      logError(`Request failed: ${error.message}`);
      chain.push({
        url: currentUrl,
        error: error.message
      });
      break;
    }
  }

  return chain;
}

function analyzeRedirectCause(chain) {
  log('\n🔍 ANÁLISIS DE REDIRECCIÓN:', 'bright');
  
  const firstResponse = chain[0];
  if (!firstResponse) {
    logError('No se pudo obtener respuesta del servidor');
    return;
  }

  if (firstResponse.status === 301 || firstResponse.status === 302) {
    logWarning(`Redirección ${firstResponse.status} detectada`);
    
    if (firstResponse.xRedirectBy === 'WordPress') {
      logError('🎯 CAUSA: WordPress está causando la redirección');
      log('\n💡 SOLUCIONES RECOMENDADAS:', 'yellow');
      log('1. Acceder al panel de WordPress de prilabsa.solaria.agency', 'cyan');
      log('2. Ir a Ajustes > Generales', 'cyan');
      log('3. Verificar que ambas URLs sean: https://prilabsa.solaria.agency', 'cyan');
      log('4. Alternativamente, editar wp-config.php con WP_HOME y WP_SITEURL', 'cyan');
    } else if (firstResponse.server && firstResponse.server.includes('LiteSpeed')) {
      logWarning('🎯 CAUSA: Configuración del servidor LiteSpeed');
      log('\n💡 SOLUCIONES RECOMENDADAS:', 'yellow');
      log('1. Verificar configuración .htaccess', 'cyan');
      log('2. Contactar con el proveedor de hosting (Hostinger)', 'cyan');
      log('3. Revisar configuración de dominios en el panel de hosting', 'cyan');
    } else {
      logWarning('🎯 CAUSA: Redirección de origen desconocido');
    }

    if (firstResponse.location) {
      logInfo(`Destino de redirección: ${firstResponse.location}`);
      
      if (firstResponse.location.includes('solaria.agency')) {
        logError('❌ PROBLEMA: Redirige al dominio principal en lugar del subdominio');
      }
    }
  } else if (firstResponse.status === 200) {
    logSuccess('✅ No hay redirección - el sitio responde correctamente');
  } else {
    logError(`❌ Error HTTP: ${firstResponse.status} ${firstResponse.statusMessage}`);
  }
}

function generateSolutionScript(chain) {
  log('\n🔧 SCRIPT DE VERIFICACIÓN GENERADO:', 'bright');
  
  const firstResponse = chain[0];
  if (firstResponse && firstResponse.xRedirectBy === 'WordPress') {
    log('\n# Para verificar configuración WordPress:', 'yellow');
    log('curl -I https://prilabsa.solaria.agency', 'cyan');
    log('# Debería devolver 200 en lugar de 301', 'blue');
    
    log('\n# Para verificar contenido:', 'yellow');
    log('curl -s https://prilabsa.solaria.agency | head -20', 'cyan');
    log('# Debería mostrar HTML de PRILABSA, no redirección', 'blue');
  }
  
  log('\n# Monitoreo continuo:', 'yellow');
  log('watch -n 5 "curl -I https://prilabsa.solaria.agency"', 'cyan');
}

async function main() {
  try {
    log('🌐 DIAGNÓSTICO DE REDIRECCIÓN PRILABSA', 'bright');
    log(`📅 Timestamp: ${new Date().toISOString()}`, 'blue');
    log('', 'reset');
    
    const targetUrl = 'https://prilabsa.solaria.agency';
    
    logStep('START', `Analizando cadena de redirección desde: ${targetUrl}`);
    
    const redirectChain = await analyzeRedirectChain(targetUrl);
    
    log('\n📊 CADENA DE REDIRECCIÓN COMPLETA:', 'bright');
    redirectChain.forEach((step, index) => {
      log(`\n${index + 1}. ${step.url}`, 'magenta');
      if (step.error) {
        logError(`   Error: ${step.error}`);
      } else {
        log(`   Status: ${step.status} ${step.statusMessage}`, step.status === 200 ? 'green' : 'yellow');
        if (step.location) log(`   Location: ${step.location}`, 'blue');
        if (step.server) log(`   Server: ${step.server}`, 'blue');
        if (step.xRedirectBy) log(`   X-Redirect-By: ${step.xRedirectBy}`, 'blue');
        if (step.xPoweredBy) log(`   X-Powered-By: ${step.xPoweredBy}`, 'blue');
      }
    });
    
    analyzeRedirectCause(redirectChain);
    generateSolutionScript(redirectChain);
    
    log('\n📋 PRÓXIMOS PASOS:', 'bright');
    log('1. Aplicar una de las soluciones recomendadas', 'cyan');
    log('2. Ejecutar script de verificación', 'cyan');
    log('3. Confirmar que prilabsa.solaria.agency responde 200', 'cyan');
    log('4. Verificar que el contenido de PRILABSA se muestra correctamente', 'cyan');
    
  } catch (error) {
    logError(`\nDiagnóstico falló: ${error.message}`);
    process.exit(1);
  }
}

// Run diagnosis
main();