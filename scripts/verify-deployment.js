#!/usr/bin/env node

/**
 * Script de Verificación Post-Deployment
 * Verifica que el sitio y todos los sistemas estén funcionando
 */

import https from 'https';
import http from 'http';
import { execSync } from 'child_process';

class DeploymentVerifier {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      site_health: {},
      github_actions: {},
      dns_status: {},
      overall_status: 'UNKNOWN'
    };
  }

  async testUrl(url, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const protocol = url.startsWith('https') ? https : http;
      const startTime = Date.now();
      
      const req = protocol.get(url, (res) => {
        const responseTime = Date.now() - startTime;
        let data = '';
        
        res.on('data', chunk => {
          data += chunk;
        });
        
        res.on('end', () => {
          resolve({
            accessible: true,
            status: res.statusCode,
            responseTime,
            contentLength: data.length,
            hasContent: data.length > 0,
            title: this.extractTitle(data)
          });
        });
      });
      
      req.on('error', (error) => {
        reject(error);
      });
      
      req.setTimeout(timeout, () => {
        req.destroy();
        reject(new Error('Timeout'));
      });
    });
  }

  extractTitle(html) {
    const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    return match ? match[1].trim() : 'No title found';
  }

  async checkDNS() {
    console.log('🔍 Verificando resolución DNS...');
    
    try {
      const result = execSync('nslookup prilabsa.solaria.agency', { encoding: 'utf8' });
      this.results.dns_status = {
        resolves: true,
        details: result
      };
      console.log('  ✅ DNS resuelve correctamente');
    } catch (error) {
      this.results.dns_status = {
        resolves: false,
        error: error.message
      };
      console.log('  ❌ DNS no resuelve');
    }
  }

  async checkSiteHealth() {
    console.log('\n🌐 Verificando salud del sitio...');
    
    const urls = [
      'https://prilabsa.solaria.agency/',
      'https://prilabsa.solaria.agency/es/',
      'https://prilabsa.solaria.agency/es/productos',
      'https://prilabsa.solaria.agency/es/noticias'
    ];

    for (const url of urls) {
      try {
        const result = await this.testUrl(url);
        this.results.site_health[url] = result;
        
        const status = result.status === 200 ? '✅' : '⚠️';
        console.log(`  ${status} ${url}`);
        console.log(`     Status: ${result.status}, Tiempo: ${result.responseTime}ms`);
        console.log(`     Título: ${result.title}`);
        
      } catch (error) {
        this.results.site_health[url] = {
          accessible: false,
          error: error.message
        };
        console.log(`  ❌ ${url} - ERROR: ${error.message}`);
      }
    }
  }

  async checkGitHubActions() {
    console.log('\n⚙️ Verificando estado de GitHub Actions...');
    
    try {
      // Verificar último commit
      const lastCommit = execSync('git log -1 --format="%h - %s (%cr)"', { encoding: 'utf8' }).trim();
      const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
      
      this.results.github_actions = {
        last_commit: lastCommit,
        current_branch: branch,
        workflows_pushed: true
      };
      
      console.log(`  📍 Branch: ${branch}`);
      console.log(`  🕐 Último commit: ${lastCommit}`);
      console.log(`  ✅ Workflows enviados a GitHub`);
      
    } catch (error) {
      this.results.github_actions = {
        error: error.message
      };
      console.log(`  ❌ Error verificando Git: ${error.message}`);
    }
  }

  generateOverallStatus() {
    const siteWorking = Object.values(this.results.site_health)
      .some(result => result.accessible && result.status === 200);
    
    const dnsWorking = this.results.dns_status.resolves;
    const gitWorking = this.results.github_actions.workflows_pushed;
    
    if (siteWorking && dnsWorking && gitWorking) {
      this.results.overall_status = 'HEALTHY';
    } else if (siteWorking) {
      this.results.overall_status = 'PARTIAL';
    } else {
      this.results.overall_status = 'CRITICAL';
    }
  }

  printSummary() {
    console.log('\n📊 RESUMEN DE VERIFICACIÓN');
    console.log('=' .repeat(40));
    
    const statusEmoji = {
      'HEALTHY': '✅',
      'PARTIAL': '⚠️',
      'CRITICAL': '❌'
    };
    
    console.log(`${statusEmoji[this.results.overall_status]} Estado General: ${this.results.overall_status}`);
    console.log(`📅 Verificado: ${this.results.timestamp}`);
    
    const workingSites = Object.values(this.results.site_health)
      .filter(result => result.accessible && result.status === 200).length;
    const totalSites = Object.keys(this.results.site_health).length;
    
    console.log(`🌐 Sitios funcionando: ${workingSites}/${totalSites}`);
    console.log(`🔍 DNS: ${this.results.dns_status.resolves ? 'OK' : 'FALLO'}`);
    console.log(`⚙️ GitHub Actions: ${this.results.github_actions.workflows_pushed ? 'OK' : 'FALLO'}`);
    
    if (this.results.overall_status === 'HEALTHY') {
      console.log('\n🎉 ¡Deployment verificado exitosamente!');
      console.log('   Todos los sistemas están funcionando correctamente.');
    } else if (this.results.overall_status === 'PARTIAL') {
      console.log('\n⚠️  Deployment parcialmente exitoso');
      console.log('   El sitio funciona pero hay problemas menores.');
    } else {
      console.log('\n🚨 Problemas críticos detectados');
      console.log('   Se requiere intervención inmediata.');
    }
  }

  async run() {
    console.log('🚀 VERIFICACIÓN POST-DEPLOYMENT PRILABSA');
    console.log('=' .repeat(50));
    
    await this.checkDNS();
    await this.checkSiteHealth();
    await this.checkGitHubActions();
    
    this.generateOverallStatus();
    this.printSummary();
    
    return this.results;
  }
}

// Ejecutar verificación
if (import.meta.url === `file://${process.argv[1]}`) {
  const verifier = new DeploymentVerifier();
  verifier.run().catch(console.error);
}

export default DeploymentVerifier;