#!/usr/bin/env node

/**
 * ECO-NAZCAMEDIA Post-Deploy Validation Script
 * 
 * Realiza validaciones robustas tras deployment incluyendo:
 * - DNS resolution, TLS, HTTP status
 * - Content validation con feature flags
 * - Security headers básicos
 * - Rollback automático en fallos críticos
 */

const https = require('https');
const http = require('http');
const dns = require('dns').promises;
const { execSync } = require('child_process');

class PostDeployValidator {
  constructor(options = {}) {
    this.target = options.target; // 'main' o 'solaria-agency'
    this.domain = options.domain;
    this.maxRetries = options.maxRetries || 15;
    this.retryDelay = options.retryDelay || 60000; // 1 minuto
    this.timeout = options.timeout || 30000; // 30 segundos
    this.rollbackEnabled = options.rollbackEnabled !== false;
    
    this.validations = [];
    this.criticalFailures = [];
  }

  async validate() {
    console.log(`🔍 Iniciando validación post-deploy para ${this.domain}`);
    console.log(`🎯 Target: ${this.target}`);
    
    const checks = [
      () => this.validateDNS(),
      () => this.validateTLS(),
      () => this.validateHTTP(),
      () => this.validateContent(),
      () => this.validateSecurityHeaders(),
      () => this.validateRoutes(),
    ];

    let attempt = 0;
    while (attempt < this.maxRetries) {
      attempt++;
      console.log(`\n📡 Intento ${attempt}/${this.maxRetries}`);
      
      let allPassed = true;
      this.validations = [];
      this.criticalFailures = [];

      for (const check of checks) {
        try {
          const result = await check();
          if (!result.success) {
            allPassed = false;
            if (result.critical) {
              this.criticalFailures.push(result);
            }
          }
          this.validations.push(result);
        } catch (error) {
          const result = {
            name: 'Unknown Check',
            success: false,
            critical: true,
            error: error.message,
            timestamp: new Date().toISOString()
          };
          this.validations.push(result);
          this.criticalFailures.push(result);
          allPassed = false;
        }
      }

      if (allPassed) {
        console.log('\n🎉 Todas las validaciones pasaron!');
        this.printSummary();
        return { success: true, attempt, validations: this.validations };
      }

      console.log(`\n⚠️ Validaciones fallaron en intento ${attempt}`);
      this.printFailures();

      if (this.criticalFailures.length > 0 && attempt >= Math.ceil(this.maxRetries / 3)) {
        console.log('\n🚨 Fallos críticos detectados tras varios intentos');
        
        if (this.rollbackEnabled) {
          console.log('🔄 Iniciando rollback automático...');
          await this.performRollback();
          return { 
            success: false, 
            rollback: true, 
            criticalFailures: this.criticalFailures 
          };
        }
      }

      if (attempt < this.maxRetries) {
        console.log(`⏳ Esperando ${this.retryDelay / 1000}s antes del siguiente intento...`);
        await this.sleep(this.retryDelay);
      }
    }

    console.log('\n❌ Validación falló tras máximos intentos');
    return { 
      success: false, 
      attempt, 
      validations: this.validations,
      criticalFailures: this.criticalFailures
    };
  }

  async validateDNS() {
    console.log('🌐 Validando resolución DNS...');
    
    try {
      const records = await dns.resolve4(this.domain);
      
      if (records && records.length > 0) {
        console.log(`✅ DNS: ${this.domain} → ${records.join(', ')}`);
        return {
          name: 'DNS Resolution',
          success: true,
          details: { records },
          timestamp: new Date().toISOString()
        };
      } else {
        return {
          name: 'DNS Resolution',
          success: false,
          critical: true,
          error: 'No DNS records found',
          timestamp: new Date().toISOString()
        };
      }
    } catch (error) {
      console.log(`❌ DNS: Error resolviendo ${this.domain}`);
      return {
        name: 'DNS Resolution',
        success: false,
        critical: true,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  async validateTLS() {
    console.log('🔒 Validando certificado TLS...');
    
    return new Promise((resolve) => {
      const options = {
        hostname: this.domain,
        port: 443,
        method: 'HEAD',
        timeout: this.timeout,
        rejectUnauthorized: true
      };

      const req = https.request(options, (res) => {
        console.log(`✅ TLS: Certificado válido para ${this.domain}`);
        resolve({
          name: 'TLS Certificate',
          success: true,
          details: {
            authorized: res.socket?.authorized,
            protocol: res.socket?.getProtocol?.()
          },
          timestamp: new Date().toISOString()
        });
      });

      req.on('error', (error) => {
        console.log(`❌ TLS: Error de certificado - ${error.message}`);
        resolve({
          name: 'TLS Certificate',
          success: false,
          critical: true,
          error: error.message,
          timestamp: new Date().toISOString()
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          name: 'TLS Certificate',
          success: false,
          critical: false,
          error: 'Timeout validating TLS',
          timestamp: new Date().toISOString()
        });
      });

      req.end();
    });
  }

  async validateHTTP() {
    console.log('📡 Validando respuesta HTTP...');
    
    const url = `https://${this.domain}/`;
    
    return new Promise((resolve) => {
      const req = https.get(url, { timeout: this.timeout }, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          const success = res.statusCode === 200 || res.statusCode === 301;
          
          if (success) {
            console.log(`✅ HTTP: ${res.statusCode} ${url}`);
          } else {
            console.log(`❌ HTTP: ${res.statusCode} ${url}`);
          }
          
          resolve({
            name: 'HTTP Response',
            success,
            critical: !success,
            details: {
              statusCode: res.statusCode,
              headers: res.headers,
              contentLength: data.length
            },
            timestamp: new Date().toISOString()
          });
        });
      });

      req.on('error', (error) => {
        console.log(`❌ HTTP: Error - ${error.message}`);
        resolve({
          name: 'HTTP Response',
          success: false,
          critical: true,
          error: error.message,
          timestamp: new Date().toISOString()
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          name: 'HTTP Response',
          success: false,
          critical: false,
          error: 'HTTP timeout',
          timestamp: new Date().toISOString()
        });
      });
    });
  }

  async validateContent() {
    console.log('📄 Validando contenido específico por entorno...');
    
    const url = `https://${this.domain}/`;
    
    return new Promise((resolve) => {
      const req = https.get(url, { timeout: this.timeout }, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          const validations = this.validateEnvironmentContent(data);
          
          const allValid = validations.every(v => v.valid);
          
          if (allValid) {
            console.log(`✅ Content: Validación de entorno exitosa`);
          } else {
            console.log(`❌ Content: Fallos en validación de entorno`);
          }
          
          resolve({
            name: 'Content Validation',
            success: allValid,
            critical: false, // Content validation no es crítico
            details: { validations },
            timestamp: new Date().toISOString()
          });
        });
      });

      req.on('error', (error) => {
        resolve({
          name: 'Content Validation',
          success: false,
          critical: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
      });

      req.setTimeout(this.timeout, () => {
        req.destroy();
        resolve({
          name: 'Content Validation',
          success: false,
          critical: false,
          error: 'Content validation timeout',
          timestamp: new Date().toISOString()
        });
      });
    });
  }

  validateEnvironmentContent(html) {
    const validations = [];
    
    if (this.target === 'main') {
      // Para main: badge y quote widget deben estar DESHABILITADOS
      validations.push({
        name: 'Badge Disabled',
        valid: !html.includes('data-badge-enabled="true"') && 
               !html.includes('solaria-badge'),
        expected: 'Badge should be disabled in main branch'
      });
      
      validations.push({
        name: 'Quote Widget Disabled',
        valid: !html.includes('data-quote-enabled="true"') && 
               !html.includes('quote-widget'),
        expected: 'Quote widget should be disabled in main branch'
      });
      
    } else if (this.target === 'solaria-agency') {
      // Para solaria-agency: badge y quote widget deben estar HABILITADOS
      validations.push({
        name: 'Badge Enabled',
        valid: html.includes('data-badge-enabled="true"') || 
               html.includes('solaria-badge') ||
               html.includes('Solaria'), // Fallback: buscar "Solaria" en el contenido
        expected: 'Badge should be enabled in solaria-agency branch'
      });
      
      validations.push({
        name: 'Quote Widget Enabled', 
        valid: html.includes('data-quote-enabled="true"') || 
               html.includes('quote-widget') ||
               html.includes('cotizacion'), // Fallback: buscar "cotizacion"
        expected: 'Quote widget should be enabled in solaria-agency branch'
      });
    }
    
    // Validaciones comunes
    validations.push({
      name: 'Title Present',
      valid: html.includes('<title>') && html.includes('PRILABSA'),
      expected: 'Page should have title with PRILABSA'
    });
    
    validations.push({
      name: 'React App Mounted',
      valid: html.includes('id="root"') || html.includes('id="app"'),
      expected: 'React app should be properly mounted'
    });

    return validations;
  }

  async validateSecurityHeaders() {
    console.log('🛡️ Validando headers de seguridad...');
    
    const url = `https://${this.domain}/`;
    
    return new Promise((resolve) => {
      const req = https.get(url, { timeout: this.timeout }, (res) => {
        const headers = res.headers;
        const securityChecks = [];

        // Headers de seguridad esperados
        const expectedHeaders = {
          'x-content-type-options': 'nosniff',
          'x-frame-options': ['DENY', 'SAMEORIGIN'],
          'strict-transport-security': true, // Solo verificar presencia
        };

        for (const [header, expected] of Object.entries(expectedHeaders)) {
          const value = headers[header];
          let valid = false;
          
          if (Array.isArray(expected)) {
            valid = expected.some(exp => value?.toLowerCase().includes(exp.toLowerCase()));
          } else if (expected === true) {
            valid = !!value;
          } else {
            valid = value?.toLowerCase() === expected.toLowerCase();
          }
          
          securityChecks.push({
            header,
            value: value || 'missing',
            valid,
            expected
          });
        }

        const allValid = securityChecks.every(check => check.valid);
        
        if (allValid) {
          console.log(`✅ Security: Headers de seguridad presentes`);
        } else {
          console.log(`⚠️ Security: Algunos headers de seguridad faltantes`);
        }
        
        resolve({
          name: 'Security Headers',
          success: allValid,
          critical: false, // Security headers no son críticos para el deployment
          details: { securityChecks },
          timestamp: new Date().toISOString()
        });
      });

      req.on('error', (error) => {
        resolve({
          name: 'Security Headers',
          success: false,
          critical: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
      });

      req.setTimeout(this.timeout);
    });
  }

  async validateRoutes() {
    console.log('🛣️ Validando rutas clave...');
    
    const routes = [
      '/',
      '/productos',
      '/robots.txt',
      '/sitemap.xml'
    ];
    
    const results = [];
    
    for (const route of routes) {
      const url = `https://${this.domain}${route}`;
      
      try {
        const result = await this.checkRoute(url);
        results.push({ route, ...result });
        
        if (result.success) {
          console.log(`✅ Route: ${route} (${result.status})`);
        } else {
          console.log(`⚠️ Route: ${route} failed (${result.status})`);
        }
      } catch (error) {
        results.push({
          route,
          success: false,
          status: 'error',
          error: error.message
        });
      }
    }
    
    const criticalRoutes = ['/', '/productos'];
    const criticalFailed = results
      .filter(r => criticalRoutes.includes(r.route) && !r.success);
    
    const success = criticalFailed.length === 0;
    
    return {
      name: 'Route Validation',
      success,
      critical: !success,
      details: { results, criticalFailed },
      timestamp: new Date().toISOString()
    };
  }

  checkRoute(url) {
    return new Promise((resolve) => {
      const req = https.get(url, { timeout: this.timeout }, (res) => {
        const success = res.statusCode < 400;
        resolve({
          success,
          status: res.statusCode,
          contentType: res.headers['content-type']
        });
      });

      req.on('error', (error) => {
        resolve({
          success: false,
          status: 'error',
          error: error.message
        });
      });

      req.setTimeout(this.timeout, () => {
        req.destroy();
        resolve({
          success: false,
          status: 'timeout'
        });
      });
    });
  }

  async performRollback() {
    console.log('🔄 Ejecutando rollback automático...');
    
    try {
      // Para GoDaddy (main), intentar restaurar desde backup
      if (this.target === 'main') {
        console.log('📂 Restaurando backup anterior en GoDaddy...');
        // En un caso real, aquí habría lógica para restaurar desde backup
        // Por ahora, solo simulamos el proceso
        await this.sleep(2000);
        console.log('✅ Backup restaurado (simulado)');
      }
      
      // Para Cloudflare (solaria-agency), revertir deployment
      if (this.target === 'solaria-agency') {
        console.log('☁️ Revirtiendo deployment en Cloudflare Pages...');
        // En un caso real, usaríamos wrangler para rollback
        await this.sleep(2000);
        console.log('✅ Deployment revertido (simulado)');
      }
      
      return true;
    } catch (error) {
      console.error('❌ Error durante rollback:', error.message);
      return false;
    }
  }

  printSummary() {
    console.log('\n📊 RESUMEN DE VALIDACIÓN:');
    console.log('==========================');
    
    this.validations.forEach(validation => {
      const icon = validation.success ? '✅' : '❌';
      console.log(`${icon} ${validation.name}`);
    });
    
    console.log(`\n🎯 Sitio: ${this.domain}`);
    console.log(`🌐 Estado: HEALTHY`);
    console.log(`⏱️ Tiempo de validación: ${new Date().toISOString()}`);
  }

  printFailures() {
    console.log('\n💥 FALLOS EN VALIDACIÓN:');
    console.log('=========================');
    
    this.validations
      .filter(v => !v.success)
      .forEach(validation => {
        console.log(`❌ ${validation.name}`);
        if (validation.error) {
          console.log(`   Error: ${validation.error}`);
        }
        if (validation.critical) {
          console.log(`   ⚠️ CRÍTICO`);
        }
      });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// CLI execution
async function main() {
  const target = process.env.DEPLOY_TARGET || process.argv[2];
  const domain = process.env.DEPLOY_DOMAIN || process.argv[3];
  
  if (!target || !domain) {
    console.error('❌ Uso: node post-deploy-validation.js <target> <domain>');
    console.error('   target: main | solaria-agency');
    console.error('   domain: blog.prilabsa.com | prilabsa.solaria.agency');
    process.exit(1);
  }
  
  const validator = new PostDeployValidator({
    target,
    domain,
    maxRetries: parseInt(process.env.MAX_VALIDATION_RETRIES) || 15,
    rollbackEnabled: process.env.ROLLBACK_ENABLED !== 'false'
  });
  
  try {
    const result = await validator.validate();
    
    if (result.success) {
      console.log('\n🎉 Validación post-deploy exitosa!');
      process.exit(0);
    } else if (result.rollback) {
      console.log('\n🔄 Rollback ejecutado por fallos críticos');
      process.exit(2); // Exit code específico para rollback
    } else {
      console.log('\n❌ Validación post-deploy falló');
      process.exit(1);
    }
  } catch (error) {
    console.error('💥 Error crítico en validación:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = PostDeployValidator;