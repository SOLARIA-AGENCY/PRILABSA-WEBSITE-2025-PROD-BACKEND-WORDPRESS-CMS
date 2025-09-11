#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class CredentialsSetup {
  constructor() {
    this.envPath = path.join(process.cwd(), '.env.local');
  }

  async setup() {
    console.log('🔐 CONFIGURACIÓN DE CREDENCIALES FTP');
    console.log('=====================================');
    console.log('Este script configurará las credenciales FTP para deployment local.');
    console.log('Los datos se guardarán en .env.local (no versionado).\n');
    
    try {
      const credentials = await this.collectCredentials();
      await this.saveCredentials(credentials);
      await this.testConnection(credentials);
      
      console.log('\n✅ Configuración completada exitosamente');
      console.log('📝 Próximos pasos:');
      console.log('   1. Ejecutar: node scripts/deploy-wordpress-vite.js');
      console.log('   2. Verificar: https://prilabsa.solaria.agency');
      
    } catch (error) {
      console.error('❌ Error en configuración:', error.message);
      process.exit(1);
    } finally {
      rl.close();
    }
  }

  async collectCredentials() {
    const credentials = {};
    
    console.log('📋 Ingresa las credenciales FTP:');
    
    credentials.host = await this.question('Host FTP [fr-int-web1794.main-hosting.eu]: ') 
      || 'fr-int-web1794.main-hosting.eu';
    
    credentials.user = await this.question('Usuario FTP [u882790918]: ') 
      || 'u882790918';
    
    credentials.password = await this.question('Password FTP: ');
    if (!credentials.password) {
      throw new Error('Password FTP es requerido');
    }
    
    credentials.root = await this.question('Directorio raíz [/domains/prilabsa.solaria.agency/public_html]: ') 
      || '/domains/prilabsa.solaria.agency/public_html';
    
    return credentials;
  }

  async saveCredentials(credentials) {
    const envContent = `# Credenciales FTP para deployment local
# Generado automáticamente - NO VERSIONAR
STAGING_FTP_HOST=${credentials.host}
STAGING_FTP_USER=${credentials.user}
STAGING_FTP_PASSWORD=${credentials.password}
STAGING_FTP_ROOT=${credentials.root}

# Configuración adicional
VITE_DEPLOY_TARGET=staging
NODE_ENV=production
`;
    
    fs.writeFileSync(this.envPath, envContent);
    console.log('✅ Credenciales guardadas en .env.local');
    
    // Verificar que .env.local esté en .gitignore
    await this.ensureGitIgnore();
  }

  async ensureGitIgnore() {
    const gitignorePath = path.join(process.cwd(), '.gitignore');
    
    if (fs.existsSync(gitignorePath)) {
      const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
      
      if (!gitignoreContent.includes('.env.local')) {
        fs.appendFileSync(gitignorePath, '\n# Credenciales locales\n.env.local\n');
        console.log('✅ .env.local añadido a .gitignore');
      }
    }
  }

  async testConnection(credentials) {
    console.log('\n🔍 Probando conexión FTP...');
    
    try {
      const ftp = require('basic-ftp');
      const client = new ftp.Client();
      
      await client.access({
        host: credentials.host,
        user: credentials.user,
        password: credentials.password
      });
      
      console.log('✅ Conexión FTP exitosa');
      
      // Verificar directorio raíz
      try {
        await client.ensureDir(credentials.root);
        console.log('✅ Directorio raíz accesible');
      } catch (error) {
        console.log('⚠️  Advertencia: No se pudo acceder al directorio raíz');
        console.log('   Esto podría ser normal, se intentará crear durante el deployment');
      }
      
      client.close();
      
    } catch (error) {
      console.error('❌ Error de conexión FTP:', error.message);
      console.log('\n🔧 Posibles soluciones:');
      console.log('   1. Verificar credenciales con el proveedor de hosting');
      console.log('   2. Comprobar que el servidor FTP esté activo');
      console.log('   3. Verificar configuración de firewall');
      
      const retry = await this.question('\n¿Continuar sin verificar conexión? (y/N): ');
      if (retry.toLowerCase() !== 'y') {
        throw new Error('Configuración cancelada por el usuario');
      }
    }
  }

  question(prompt) {
    return new Promise(resolve => {
      rl.question(prompt, resolve);
    });
  }
}

// Verificar dependencias
function checkDependencies() {
  try {
    require('basic-ftp');
  } catch (error) {
    console.error('❌ Dependencia faltante: basic-ftp');
    console.log('📦 Instalar con: npm install basic-ftp');
    process.exit(1);
  }
}

if (require.main === module) {
  checkDependencies();
  new CredentialsSetup().setup();
}

module.exports = CredentialsSetup;