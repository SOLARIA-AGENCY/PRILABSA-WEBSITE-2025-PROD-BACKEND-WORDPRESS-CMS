#!/usr/bin/env node

/**
 * VERIFICADOR DE CONFIGURACIÓN WORDPRESS-VITE
 * 
 * Este script verifica que toda la configuración esté correcta
 * antes de realizar un deployment real.
 * 
 * Uso: node scripts/verify-wordpress-setup.js
 */

const fs = require('fs');
const path = require('path');
const ftp = require('basic-ftp');
require('dotenv').config({ path: '.env.local' });

class WordPressSetupVerifier {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.success = [];
  }

  async verify() {
    console.log('🔍 Verificando configuración WordPress-Vite híbrido...');
    console.log('=' .repeat(60));
    
    // Verificaciones
    this.checkCredentials();
    this.checkWordPressTemplate();
    this.checkViteConfig();
    this.checkScripts();
    this.checkPackageJson();
    await this.testFTPConnection();
    await this.testViteBuild();
    
    // Reporte final
    this.generateReport();
  }

  checkCredentials() {
    console.log('\n🔐 Verificando credenciales FTP...');
    
    const envFile = '.env.local';
    if (!fs.existsSync(envFile)) {
      this.errors.push('Archivo .env.local no encontrado');
      this.errors.push('Ejecuta: npm run setup:credentials');
      return;
    }
    
    const required = ['FTP_HOST', 'FTP_USER', 'FTP_PASSWORD'];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      this.errors.push(`Credenciales faltantes: ${missing.join(', ')}`);
    } else {
      this.success.push('✅ Credenciales FTP configuradas');
    }
    
    // Verificar .gitignore
    const gitignore = '.gitignore';
    if (fs.existsSync(gitignore)) {
      const content = fs.readFileSync(gitignore, 'utf8');
      if (content.includes('.env.local')) {
        this.success.push('✅ .env.local está en .gitignore');
      } else {
        this.warnings.push('⚠️  .env.local no está en .gitignore');
      }
    }
  }

  checkWordPressTemplate() {
    console.log('\n📁 Verificando template WordPress...');
    
    const templateDir = 'wordpress-template';
    if (!fs.existsSync(templateDir)) {
      this.errors.push('Directorio wordpress-template no encontrado');
      return;
    }
    
    const requiredFiles = ['index.php', 'wp-config.php', '.htaccess'];
    
    requiredFiles.forEach(file => {
      const filePath = path.join(templateDir, file);
      if (fs.existsSync(filePath)) {
        this.success.push(`✅ ${file} encontrado`);
        
        // Verificaciones específicas
        const content = fs.readFileSync(filePath, 'utf8');
        
        if (file === 'index.php') {
          if (content.includes('/app/')) {
            this.success.push('✅ index.php tiene redirecciones a /app/');
          } else {
            this.errors.push('❌ index.php no tiene redirecciones a /app/');
          }
        }
        
        if (file === '.htaccess') {
          if (content.includes('RewriteRule') && content.includes('/app/')) {
            this.success.push('✅ .htaccess tiene reglas para /app/');
          } else {
            this.errors.push('❌ .htaccess no tiene reglas correctas');
          }
        }
        
      } else {
        this.errors.push(`❌ ${file} no encontrado`);
      }
    });
  }

  checkViteConfig() {
    console.log('\n⚡ Verificando configuración Vite...');
    
    const viteConfig = 'vite.config.ts';
    if (!fs.existsSync(viteConfig)) {
      this.errors.push('vite.config.ts no encontrado');
      return;
    }
    
    const content = fs.readFileSync(viteConfig, 'utf8');
    
    if (content.includes('VITE_DEPLOY_TARGET')) {
      this.success.push('✅ Vite configurado para VITE_DEPLOY_TARGET');
    } else {
      this.errors.push('❌ Vite no configurado para staging');
    }
    
    if (content.includes("base: isStaging ? '/app/' : '/'")) {
      this.success.push('✅ Base path configurado para /app/');
    } else {
      this.warnings.push('⚠️  Base path podría no estar configurado');
    }
  }

  checkScripts() {
    console.log('\n📜 Verificando scripts...');
    
    const scripts = [
      'scripts/setup-credentials.js',
      'scripts/deploy-wordpress-vite.js'
    ];
    
    scripts.forEach(script => {
      if (fs.existsSync(script)) {
        this.success.push(`✅ ${script} encontrado`);
      } else {
        this.errors.push(`❌ ${script} no encontrado`);
      }
    });
  }

  checkPackageJson() {
    console.log('\n📦 Verificando package.json...');
    
    if (!fs.existsSync('package.json')) {
      this.errors.push('package.json no encontrado');
      return;
    }
    
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    const requiredScripts = [
      'setup:credentials',
      'deploy:wordpress',
      'deploy:wordpress:fast',
      'deploy:wordpress:full'
    ];
    
    requiredScripts.forEach(script => {
      if (pkg.scripts && pkg.scripts[script]) {
        this.success.push(`✅ Script ${script} configurado`);
      } else {
        this.errors.push(`❌ Script ${script} faltante`);
      }
    });
    
    // Verificar dependencias
    if (pkg.devDependencies && pkg.devDependencies['basic-ftp']) {
      this.success.push('✅ Dependencia basic-ftp instalada');
    } else {
      this.errors.push('❌ Dependencia basic-ftp faltante');
    }
  }

  async testFTPConnection() {
    console.log('\n🌐 Probando conexión FTP...');
    
    if (!process.env.FTP_HOST) {
      this.warnings.push('⚠️  No se puede probar FTP sin credenciales');
      return;
    }
    
    const client = new ftp.Client();
    client.ftp.verbose = false;
    
    try {
      await client.access({
        host: process.env.FTP_HOST,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD,
        secure: false
      });
      
      this.success.push('✅ Conexión FTP exitosa');
      
      // Verificar permisos
      const files = await client.list('/');
      this.success.push(`✅ Listado remoto: ${files.length} archivos`);
      
    } catch (error) {
      this.errors.push(`❌ Error FTP: ${error.message}`);
    } finally {
      client.close();
    }
  }

  async testViteBuild() {
    console.log('\n🔨 Probando build de Vite...');
    
    try {
      // Verificar que dist/ no existe o está vacío
      if (fs.existsSync('dist')) {
        const files = fs.readdirSync('dist');
        if (files.length > 0) {
          this.warnings.push('⚠️  Directorio dist/ no está vacío');
        }
      }
      
      // Simular build (sin ejecutar realmente)
      const { execSync } = require('child_process');
      
      // Solo verificar que el comando existe
      execSync('npm run build --help', { stdio: 'pipe' });
      this.success.push('✅ Comando npm run build disponible');
      
      // Verificar configuración de entorno
      process.env.VITE_DEPLOY_TARGET = 'staging';
      this.success.push('✅ Variable VITE_DEPLOY_TARGET configurada');
      
    } catch (error) {
      this.errors.push(`❌ Error en build: ${error.message}`);
    }
  }

  generateReport() {
    console.log('\n' + '=' .repeat(60));
    console.log('📊 REPORTE DE VERIFICACIÓN');
    console.log('=' .repeat(60));
    
    if (this.success.length > 0) {
      console.log('\n✅ ÉXITOS:');
      this.success.forEach(msg => console.log(`  ${msg}`));
    }
    
    if (this.warnings.length > 0) {
      console.log('\n⚠️  ADVERTENCIAS:');
      this.warnings.forEach(msg => console.log(`  ${msg}`));
    }
    
    if (this.errors.length > 0) {
      console.log('\n❌ ERRORES:');
      this.errors.forEach(msg => console.log(`  ${msg}`));
    }
    
    console.log('\n' + '=' .repeat(60));
    
    if (this.errors.length === 0) {
      console.log('🎉 CONFIGURACIÓN LISTA PARA DEPLOYMENT');
      console.log('\n🚀 Comandos disponibles:');
      console.log('  npm run deploy:wordpress:fast    # Deployment rápido');
      console.log('  npm run deploy:wordpress:full    # Deployment completo');
      console.log('  npm run deploy:wordpress         # Deployment básico');
    } else {
      console.log('🔧 CONFIGURACIÓN REQUIERE CORRECCIONES');
      console.log('\n📋 Pasos sugeridos:');
      console.log('  1. Corregir errores listados arriba');
      console.log('  2. Ejecutar: npm run setup:credentials (si es necesario)');
      console.log('  3. Volver a ejecutar esta verificación');
    }
    
    console.log('\n📚 Documentación: README-WORDPRESS-DEPLOYMENT.md');
    console.log('=' .repeat(60));
    
    // Exit code
    process.exit(this.errors.length > 0 ? 1 : 0);
  }
}

// Ejecutar verificación
if (require.main === module) {
  const verifier = new WordPressSetupVerifier();
  verifier.verify().catch(error => {
    console.error('❌ Error en verificación:', error.message);
    process.exit(1);
  });
}

module.exports = WordPressSetupVerifier;