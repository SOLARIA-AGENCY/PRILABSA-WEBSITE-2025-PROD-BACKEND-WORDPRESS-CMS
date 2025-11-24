#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ftp = require('basic-ftp');

async function uploadImagesAndHtaccess() {
  const configPath = path.join(__dirname, '..', '.ftpconfig.json');
  const distPath = path.join(__dirname, '..', 'dist');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  console.log('\n🚀 SUBIENDO IMAGES Y .HTACCESS ACTUALIZADO');
  console.log('==========================================\n');

  const client = new ftp.Client();
  client.ftp.verbose = false;
  client.ftp.timeout = 60000;

  try {
    console.log(`🔌 Conectando a ${config.host}...`);
    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      port: config.port || 21,
      secure: config.secure || false
    });

    await client.cd(config.remoteRoot);
    console.log(`✓ En directorio: ${config.remoteRoot}\n`);

    // 1. Subir .htaccess actualizado
    console.log('📄 Subiendo .htaccess con redirección...');
    const htaccessPath = path.join(distPath, '.htaccess');
    await client.uploadFrom(htaccessPath, '.htaccess');
    console.log('✓ .htaccess actualizado\n');

    // 2. Subir directorio images/
    console.log('📁 Subiendo directorio images/...');
    const imagesPath = path.join(distPath, 'images');

    // Eliminar directorio images antiguo si existe
    try {
      await client.removeDir('images');
      console.log('  → Directorio images/ antiguo eliminado');
    } catch (err) {
      // No existe, continuar
    }

    await client.uploadFromDir(imagesPath, 'images');
    console.log('✓ Directorio images/ subido completamente\n');

    console.log('✅ Actualización completa:');
    console.log('   - .htaccess: Redirección / → /productos');
    console.log('   - images/: Todos los logos y assets\n');

    client.close();
    process.exit(0);

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    client.close();
    process.exit(1);
  }
}

uploadImagesAndHtaccess();
