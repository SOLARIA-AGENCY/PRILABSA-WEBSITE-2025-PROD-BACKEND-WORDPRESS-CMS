#!/usr/bin/env node

/**
 * Sistema de Diagnóstico Completo PRILABSA
 * Verifica estado de sitio, GitHub Actions, y configuración
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SystemDiagnostic {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      site_status: {},
      github_actions: {},
      configuration: {},
      workflows: {},
      recommendations: []
    };
  }

  async checkSiteStatus() {
    console.log('🔍 Verificando estado del sitio...');
    
    const sites = [
      'https://prilabsa.solaria.agency/',
      'https://prilabsa.solaria.agency/es/',
      'https://prilabsa.solaria.agency/es/productos',
      'https://prilabsa.solaria.agency/es/noticias'
    ];

    for (const site of sites) {
      try {
        const status = await this.testUrl(site);
        this.results.site_status[site] = status;
        console.log(`  ${status.accessible ? '✅' : '❌'} ${site} - ${status.status || 'ERROR'}`);
      } catch (error) {
        this.results.site_status[site] = {
          accessible: false,
          error: error.message,
          status: 'ERROR'
        };
        console.log(`  ❌ ${site} - ERROR: ${error.message}`);
      }
    }
  }

  testUrl(url) {
    return new Promise((resolve, reject) => {
      const protocol = url.startsWith('https') ? https : http;
      const startTime = Date.now();
      
      const req = protocol.get(url, (res) => {
        const responseTime = Date.now() - startTime;
        resolve({
          accessible: true,
          status: res.statusCode,
          responseTime,
          headers: res.headers
        });
      });
      
      req.on('error', (error) => {
        reject(error);
      });
      
      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Timeout'));
      });
    });
  }

  checkWorkflowFiles() {
    console.log('\n📋 Verificando archivos de workflow...');
    
    const workflowDir = '.github/workflows';
    const expectedWorkflows = [
      'deploy-staging.yml',
      'monitor-staging.yml',
      'linear-integration.yml',
      'manage-deployments.yml',
      'deployment-notifications.yml'
    ];

    for (const workflow of expectedWorkflows) {
      const filePath = path.join(workflowDir, workflow);
      if (fs.existsSync(filePath)) {
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          this.results.workflows[workflow] = {
            exists: true,
            size: content.length,
            hasSecrets: content.includes('LINEAR_API_KEY'),
            hasTriggers: content.includes('on:'),
            valid: true
          };
          console.log(`  ✅ ${workflow} - OK`);
        } catch (error) {
          this.results.workflows[workflow] = {
            exists: true,
            error: error.message,
            valid: false
          };
          console.log(`  ❌ ${workflow} - ERROR: ${error.message}`);
        }
      } else {
        this.results.workflows[workflow] = {
          exists: false,
          valid: false
        };
        console.log(`  ❌ ${workflow} - NO EXISTE`);
      }
    }
  }

  checkGitStatus() {
    console.log('\n🔄 Verificando estado de Git...');
    
    try {
      const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
      const status = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
      const lastCommit = execSync('git log -1 --format="%h - %s (%cr)"', { encoding: 'utf8' }).trim();
      const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
      
      this.results.github_actions.git_status = {
        current_branch: branch,
        has_changes: status.length > 0,
        changes: status.split('\n').filter(line => line.trim()),
        last_commit: lastCommit,
        remote_url: remoteUrl
      };
      
      console.log(`  📍 Branch actual: ${branch}`);
      console.log(`  📝 Cambios pendientes: ${status.length > 0 ? 'SÍ' : 'NO'}`);
      console.log(`  🕐 Último commit: ${lastCommit}`);
      
    } catch (error) {
      this.results.github_actions.git_status = {
        error: error.message
      };
      console.log(`  ❌ Error verificando Git: ${error.message}`);
    }
  }

  checkConfiguration() {
    console.log('\n⚙️ Verificando configuración...');
    
    // Verificar archivos de configuración
    const configFiles = [
      'package.json',
      'vite.config.ts',
      'netlify.toml',
      '.env.staging'
    ];
    
    for (const file of configFiles) {
      if (fs.existsSync(file)) {
        this.results.configuration[file] = { exists: true };
        console.log(`  ✅ ${file} - OK`);
      } else {
        this.results.configuration[file] = { exists: false };
        console.log(`  ❌ ${file} - NO EXISTE`);
      }
    }
    
    // Verificar scripts de package.json
    if (fs.existsSync('package.json')) {
      try {
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        this.results.configuration.scripts = {
          build: !!pkg.scripts?.build,
          'deploy:staging': !!pkg.scripts?.['deploy:staging'],
          'deploy:prod': !!pkg.scripts?.['deploy:prod']
        };
        console.log(`  📦 Scripts disponibles: ${Object.keys(pkg.scripts || {}).join(', ')}`);
      } catch (error) {
        console.log(`  ❌ Error leyendo package.json: ${error.message}`);
      }
    }
  }

  generateRecommendations() {
    console.log('\n💡 Generando recomendaciones...');
    
    // Verificar si el sitio está caído
    const mainSiteDown = !this.results.site_status['https://prilabsa.solaria.agency/']?.accessible;
    if (mainSiteDown) {
      this.results.recommendations.push({
        priority: 'CRÍTICO',
        issue: 'Sitio principal no accesible',
        action: 'Ejecutar deployment manual inmediato',
        command: 'npm run deploy:staging'
      });
    }
    
    // Verificar workflows faltantes
    const missingWorkflows = Object.entries(this.results.workflows)
      .filter(([name, info]) => !info.exists)
      .map(([name]) => name);
    
    if (missingWorkflows.length > 0) {
      this.results.recommendations.push({
        priority: 'ALTO',
        issue: `Workflows faltantes: ${missingWorkflows.join(', ')}`,
        action: 'Recrear workflows de GitHub Actions',
        command: 'Verificar archivos en .github/workflows/'
      });
    }
    
    // Verificar si hay cambios sin commit
    if (this.results.github_actions.git_status?.has_changes) {
      this.results.recommendations.push({
        priority: 'MEDIO',
        issue: 'Cambios pendientes sin commit',
        action: 'Hacer commit y push para triggerar workflows',
        command: 'git add . && git commit -m "Fix: Trigger workflows" && git push'
      });
    }
    
    // Verificar LINEAR_API_KEY
    const hasLinearKey = Object.values(this.results.workflows)
      .some(workflow => workflow.hasSecrets);
    
    if (hasLinearKey) {
      this.results.recommendations.push({
        priority: 'ALTO',
        issue: 'LINEAR_API_KEY requerido en GitHub Secrets',
        action: 'Configurar LINEAR_API_KEY en GitHub Repository Settings',
        command: 'Ir a Settings → Secrets and variables → Actions'
      });
    }
    
    // Mostrar recomendaciones
    this.results.recommendations.forEach((rec, index) => {
      console.log(`  ${index + 1}. [${rec.priority}] ${rec.issue}`);
      console.log(`     → ${rec.action}`);
      console.log(`     💻 ${rec.command}`);
      console.log('');
    });
  }

  async run() {
    console.log('🚀 DIAGNÓSTICO COMPLETO DEL SISTEMA PRILABSA');
    console.log('=' .repeat(50));
    
    await this.checkSiteStatus();
    this.checkWorkflowFiles();
    this.checkGitStatus();
    this.checkConfiguration();
    this.generateRecommendations();
    
    // Guardar reporte
    const reportPath = 'diagnostic-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    
    console.log('\n📊 RESUMEN DEL DIAGNÓSTICO');
    console.log('=' .repeat(30));
    console.log(`📅 Timestamp: ${this.results.timestamp}`);
    console.log(`🌐 Sitios verificados: ${Object.keys(this.results.site_status).length}`);
    console.log(`📋 Workflows verificados: ${Object.keys(this.results.workflows).length}`);
    console.log(`⚠️  Recomendaciones: ${this.results.recommendations.length}`);
    console.log(`📄 Reporte guardado en: ${reportPath}`);
    
    return this.results;
  }
}

// Ejecutar diagnóstico
if (import.meta.url === `file://${process.argv[1]}`) {
  const diagnostic = new SystemDiagnostic();
  diagnostic.run().catch(console.error);
}

export default SystemDiagnostic;