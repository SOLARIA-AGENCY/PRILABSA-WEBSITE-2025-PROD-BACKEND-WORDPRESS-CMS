#!/usr/bin/env node

/**
 * Cloudflare SSL Configuration Fix
 * Configures SSL mode to 'Flexible' to resolve 525 SSL Handshake errors
 * Target: solaria.agency domain
 */

import https from 'https';
import { execSync } from 'child_process';

// Cloudflare configuration
const CLOUDFLARE_CONFIG = {
  zoneId: '7c5dce02ed5aaaddf4b141a233d2e877', // solaria.agency zone
  domain: 'solaria.agency',
  subdomain: 'prilabsa.solaria.agency'
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
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

async function checkCurrentSSLStatus() {
  logStep('CHECK', 'Verificando estado actual del SSL...');
  
  try {
    // Test HTTPS connectivity
    const testResult = execSync('./check-ssl-status.sh', { encoding: 'utf8' });
    
    if (testResult.includes('Error 525')) {
      logWarning('Confirmado: Error 525 SSL Handshake detectado');
      return false;
    } else if (testResult.includes('HTTPS funciona correctamente')) {
      logSuccess('SSL ya está funcionando correctamente');
      return true;
    }
  } catch (error) {
    logWarning(`Error verificando SSL: ${error.message}`);
  }
  
  return false;
}

async function configureCloudflareSSL() {
  logStep('CLOUDFLARE', 'Configurando Cloudflare SSL en modo Flexible...');
  
  // Manual configuration instructions
  log('\n📋 INSTRUCCIONES PARA CONFIGURAR CLOUDFLARE SSL:', 'bright');
  log('\n1. Accede a Cloudflare Dashboard:', 'yellow');
  log('   https://dash.cloudflare.com/', 'blue');
  
  log('\n2. Selecciona el dominio:', 'yellow');
  log(`   ${CLOUDFLARE_CONFIG.domain}`, 'blue');
  
  log('\n3. Ve a SSL/TLS > Overview:', 'yellow');
  log('   https://dash.cloudflare.com/ssl-tls', 'blue');
  
  log('\n4. Cambia el modo SSL de "Full" a "Flexible":', 'yellow');
  log('   • Busca "SSL/TLS encryption mode"', 'blue');
  log('   • Selecciona "Flexible"', 'blue');
  log('   • Guarda los cambios', 'blue');
  
  log('\n5. Espera la propagación (2-5 minutos)', 'yellow');
  
  log('\n🔧 CONFIGURACIÓN TÉCNICA:', 'bright');
  log('• Modo SSL: Flexible', 'blue');
  log('• Encriptación: Usuario ↔ Cloudflare (HTTPS)', 'blue');
  log('• Backend: Cloudflare ↔ Hostinger (HTTP)', 'blue');
  log('• Resultado: Resuelve error 525 sin cambios en Hostinger', 'blue');
  
  return true;
}

async function waitForPropagation() {
  logStep('WAIT', 'Esperando propagación de cambios SSL...');
  
  const maxAttempts = 12; // 6 minutos máximo
  const waitTime = 30000; // 30 segundos entre intentos
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    log(`\n🔄 Intento ${attempt}/${maxAttempts} - Verificando SSL...`, 'yellow');
    
    try {
      const result = execSync('./check-ssl-status.sh', { encoding: 'utf8' });
      
      if (result.includes('HTTPS funciona correctamente') && !result.includes('Error 525')) {
        logSuccess('¡SSL configurado correctamente!');
        return true;
      }
      
      if (attempt < maxAttempts) {
        log(`⏳ Esperando ${waitTime/1000}s antes del siguiente intento...`, 'yellow');
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    } catch (error) {
      logWarning(`Error en verificación: ${error.message}`);
    }
  }
  
  logWarning('Tiempo de espera agotado. Verifica manualmente la configuración.');
  return false;
}

async function verifySSLFix() {
  logStep('VERIFY', 'Verificación final del SSL...');
  
  try {
    // Test HTTPS
    const httpsTest = execSync(`curl -s -o /dev/null -w "%{http_code}" https://${CLOUDFLARE_CONFIG.subdomain}/`, { encoding: 'utf8' });
    
    if (httpsTest === '200' || httpsTest === '301') {
      logSuccess(`HTTPS funcionando: HTTP ${httpsTest}`);
    } else {
      logWarning(`HTTPS respuesta inesperada: HTTP ${httpsTest}`);
    }
    
    // Test site accessibility
    log(`\n🌐 Sitio accesible en: https://${CLOUDFLARE_CONFIG.subdomain}`, 'green');
    log(`📊 Estado SSL: Cloudflare Flexible SSL activo`, 'green');
    
    return true;
  } catch (error) {
    logError(`Error en verificación final: ${error.message}`);
    return false;
  }
}

async function main() {
  try {
    log('🔧 Cloudflare SSL Configuration Fix', 'bright');
    log(`Target: ${CLOUDFLARE_CONFIG.subdomain}`, 'blue');
    log('Objetivo: Resolver error 525 SSL Handshake\n', 'blue');
    
    // Check current status
    const sslWorking = await checkCurrentSSLStatus();
    
    if (sslWorking) {
      logSuccess('SSL ya está funcionando correctamente. No se requiere acción.');
      return;
    }
    
    // Configure Cloudflare SSL
    await configureCloudflareSSL();
    
    // Ask user to confirm manual configuration
    log('\n⏸️  PAUSA PARA CONFIGURACIÓN MANUAL', 'yellow');
    log('Después de completar la configuración en Cloudflare:', 'yellow');
    log('Presiona ENTER para continuar con la verificación...', 'yellow');
    
    // Wait for user input (in CI/CD, this will be skipped)
    if (process.stdin.isTTY) {
      await new Promise(resolve => {
        process.stdin.once('data', () => resolve());
      });
    } else {
      log('Modo CI/CD detectado. Esperando propagación automática...', 'blue');
      await new Promise(resolve => setTimeout(resolve, 120000)); // 2 minutos
    }
    
    // Wait for propagation and verify
    const success = await waitForPropagation();
    
    if (success) {
      await verifySSLFix();
      logSuccess('\n🎉 SSL configurado exitosamente!');
      log('El sitio ahora debería estar accesible via HTTPS', 'green');
    } else {
      logWarning('\n⚠️  Configuración SSL pendiente');
      log('Verifica manualmente la configuración de Cloudflare', 'yellow');
    }
    
  } catch (error) {
    logError(`\nError en configuración SSL: ${error.message}`);
    process.exit(1);
  }
}

// Run the SSL fix
main();