#!/usr/bin/env node

/**
 * DEPLOY WORDPRESS-VITE HÍBRIDO
 * 
 * Este script realiza un deployment híbrido que:
 * 1. Compila la aplicación Vite para subdirectorio /app/
 * 2. Genera estructura WordPress mínima
 * 3. Sube todo vía FTP al hosting WordPress
 * 
 * Uso: node scripts/deploy-wordpress-vite.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ftp = require('basic-ftp');
require('dotenv').config({ path: '.env.local' });

const CONFIG = {
  ftp: {
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    secure: false
  },
  paths: {
    dist: './dist',
    wordpressTemplate: './wordpress-template',
    tempDeploy: './temp-deploy'
  }
};

class WordPressViteDeployer {
  constructor() {
    this.validateCredentials();
  }

  validateCredentials() {
    const required = ['FTP_HOST', 'FTP_USER', 'FTP_PASSWORD'];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      console.error('❌ Credenciales FTP faltantes:', missing.join(', '));
      console.log('💡 Ejecuta: node scripts/setup-credentials.js');
      process.exit(1);
    }
  }

  async deploy() {
    try {
      console.log('🚀 Iniciando deployment WordPress-Vite híbrido...');
      
      // Paso 1: Limpiar directorios temporales
      this.cleanTempDirectories();
      
      // Paso 2: Compilar Vite para subdirectorio
      this.buildViteApp();
      
      // Paso 3: Preparar estructura de deployment
      this.prepareDeploymentStructure();
      
      // Paso 4: Subir vía FTP
      await this.uploadViaFTP();
      
      // Paso 5: Limpiar archivos temporales
      this.cleanTempDirectories();
      
      console.log('✅ Deployment completado exitosamente!');
      console.log('🌐 Sitio disponible en: https://prilabsa.solaria.agency');
      
    } catch (error) {
      console.error('❌ Error en deployment:', error.message);
      this.cleanTempDirectories();
      process.exit(1);
    }
  }

  cleanTempDirectories() {
    const dirs = [CONFIG.paths.tempDeploy];
    dirs.forEach(dir => {
      if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
      }
    });
  }

  buildViteApp() {
    console.log('📦 Compilando aplicación Vite...');
    
    // Configurar variable de entorno para staging
    process.env.VITE_DEPLOY_TARGET = 'staging';
    
    try {
      execSync('npm run build', { 
        stdio: 'inherit',
        env: { ...process.env, VITE_DEPLOY_TARGET: 'staging' }
      });
      console.log('✅ Compilación Vite completada');
    } catch (error) {
      throw new Error(`Error compilando Vite: ${error.message}`);
    }
  }

  prepareDeploymentStructure() {
    console.log('📁 Preparando estructura de deployment...');
    
    // Crear directorio temporal
    fs.mkdirSync(CONFIG.paths.tempDeploy, { recursive: true });
    
    // Copiar archivos WordPress base
    this.copyWordPressFiles();
    
    // Copiar aplicación Vite compilada a /app/
    this.copyViteApp();
    
    console.log('✅ Estructura de deployment preparada');
  }

  copyWordPressFiles() {
    const wpFiles = ['index.php', 'wp-config.php', '.htaccess'];
    
    wpFiles.forEach(file => {
      const source = path.join(CONFIG.paths.wordpressTemplate, file);
      const dest = path.join(CONFIG.paths.tempDeploy, file);
      
      if (fs.existsSync(source)) {
        fs.copyFileSync(source, dest);
        console.log(`📄 Copiado: ${file}`);
      } else {
        console.warn(`⚠️  Archivo no encontrado: ${source}`);
      }
    });
  }

  copyViteApp() {
    const appDir = path.join(CONFIG.paths.tempDeploy, 'app');
    fs.mkdirSync(appDir, { recursive: true });
    
    // Copiar todo el contenido de dist/ a app/
    this.copyDirectory(CONFIG.paths.dist, appDir);
    console.log('📱 Aplicación Vite copiada a /app/');
  }

  copyDirectory(source, destination) {
    if (!fs.existsSync(source)) {
      throw new Error(`Directorio fuente no existe: ${source}`);
    }
    
    const items = fs.readdirSync(source);
    
    items.forEach(item => {
      const sourcePath = path.join(source, item);
      const destPath = path.join(destination, item);
      
      if (fs.statSync(sourcePath).isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        this.copyDirectory(sourcePath, destPath);
      } else {
        fs.copyFileSync(sourcePath, destPath);
      }
    });
  }

  async uploadViaFTP() {
    console.log('🌐 Conectando a FTP...');
    
    const client = new ftp.Client();
    client.ftp.verbose = false;
    
    try {
      await client.access(CONFIG.ftp);
      console.log('✅ Conectado a FTP');
      
      // Limpiar directorio remoto (opcional)
      await this.cleanRemoteDirectory(client);
      
      // Subir archivos
      await client.uploadFromDir(CONFIG.paths.tempDeploy, '/');
      console.log('✅ Archivos subidos exitosamente');
      
    } finally {
      client.close();
    }
  }

  async cleanRemoteDirectory(client) {
    try {
      console.log('🧹 Limpiando directorio remoto...');
      
      // Listar archivos remotos
      const files = await client.list('/');
      
      // Eliminar archivos específicos (mantener directorios del sistema)
      const filesToDelete = files.filter(file => {
        const name = file.name;
        return !name.startsWith('.') && 
               !['wp-admin', 'wp-includes', 'wp-content'].includes(name) &&
               file.type !== 2; // No es directorio
      });
      
      for (const file of filesToDelete) {
        try {
          await client.remove(file.name);
          console.log(`🗑️  Eliminado: ${file.name}`);
        } catch (error) {
          console.warn(`⚠️  No se pudo eliminar: ${file.name}`);
        }
      }
      
    } catch (error) {
      console.warn('⚠️  Error limpiando directorio remoto:', error.message);
    }
  }
}

// Ejecutar deployment
if (require.main === module) {
  const deployer = new WordPressViteDeployer();
  deployer.deploy();
}

module.exports = WordPressViteDeployer;