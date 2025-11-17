const ftp = require('basic-ftp');
const path = require('path');

async function deployPluginsToWordPress() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    console.log('🚀 Desplegando plugins en WordPress...');
    
    await client.access({
      host: 'productos.prilabsa.com',
      user: 'solaria.charlie@blog.prilabsa.com',
      password: 'SoCh2025$%',
      port: 21,
      secure: false
    });

    // Navigate to WordPress plugins directory
    await client.cd('wordpress/wp-content/plugins');
    
    // Create prilabsa-productos directory
    try {
      await client.mkdir('prilabsa-productos');
      console.log('✅ Directorio prilabsa-productos creado');
    } catch (err) {
      console.log('📁 Directorio prilabsa-productos ya existe');
    }
    
    await client.cd('prilabsa-productos');
    
    // Upload plugin files
    const pluginFiles = [
      'prilabsa-productos-cpt.php',
      'prilabsa-acf-config.php', 
      'prilabsa-rest-api-custom.php',
      'prilabsa-import-products.php'
    ];
    
    for (const file of pluginFiles) {
      const filePath = path.join(__dirname, '../wordpress-code/plugins', file);
      try {
        await client.uploadFrom(filePath, file);
        console.log(`✅ ${file} subido exitosamente`);
      } catch (err) {
        console.log(`❌ Error al subir ${file}:`, err.message);
      }
    }
    
    console.log('🎉 Plugins desplegados correctamente!');
    console.log('');
    console.log('📋 INSTRUCCIONES PARA ACTIVAR PLUGINS:');
    console.log('1. Ir a WordPress Admin: https://productos.prilabsa.com/wordpress/wp-admin/');
    console.log('2. Ir a Plugins > Instalados');
    console.log('3. Activar plugins PRILABSA en este orden:');
    console.log('   ✅ PRILABSA Productos Custom Post Type');
    console.log('   ✅ PRILABSA ACF Configuration');
    console.log('   ✅ PRILABSA REST API Custom Endpoints');
    console.log('   ✅ PRILABSA Product Importer');
    console.log('');
    console.log('🔗 URL Admin WordPress: https://productos.prilabsa.com/wordpress/wp-admin/');
    console.log('👤 Usuario: facipp');
    console.log('🔒 Contraseña: {sJu(ZheHgH3');
    
  } catch (err) {
    console.error('❌ Despliegue fallido:', err.message);
  } finally {
    client.close();
  }
}

deployPluginsToWordPress();