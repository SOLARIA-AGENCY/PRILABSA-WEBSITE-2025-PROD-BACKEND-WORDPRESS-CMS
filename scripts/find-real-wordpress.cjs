const ftp = require('basic-ftp');

async function findRealWordPress() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    console.log('🔍 Buscando instalación real de WordPress...');
    
    await client.access({
      host: 'productos.prilabsa.com',
      user: 'solaria.charlie@blog.prilabsa.com',
      password: 'SoCh2025$%',
      port: 21,
      secure: false
    });

    // Check root directory
    const rootFiles = await client.list('/');
    console.log('📁 Directorio raíz:');
    rootFiles.forEach(file => {
      if (file.type === 1) { // solo directorios
        console.log(`  📁 ${file.name}`);
      }
    });
    
    // Check public_html
    await client.cd('public_html');
    const publicFiles = await client.list('/');
    console.log('📁 Directorio public_html:');
    publicFiles.forEach(file => {
      if (file.type === 1) { // solo directorios
        console.log(`  📁 ${file.name}`);
      }
    });
    
    // Look for WordPress files in public_html
    console.log('🔍 Buscando archivos WordPress en public_html:');
    const wpFiles = ['wp-config.php', 'wp-admin', 'wp-includes', 'index.php'];
    for (const file of wpFiles) {
      try {
        const size = await client.size(file);
        console.log(`  ✅ ${file} encontrado`);
      } catch (err) {
        console.log(`  ❌ ${file} no encontrado`);
      }
    }
    
    // Check if wp-content exists in public_html
    try {
      await client.cd('wp-content');
      console.log('✅ wp-content encontrado en public_html');
      
      const contentFiles = await client.list('/');
      console.log('📁 Contenido de wp-content:');
      contentFiles.forEach(file => {
        if (file.type === 1) {
          console.log(`  📁 ${file.name}`);
        }
      });
      
      // Check plugins
      try {
        await client.cd('plugins');
        console.log('✅ plugins encontrado');
        
        const pluginFiles = await client.list('/');
        console.log('📁 Contenido de plugins:');
        pluginFiles.forEach(file => {
          console.log(`  📁 ${file.name}`);
        });
        
      } catch (err) {
        console.log('❌ plugins no encontrado - creando...');
        await client.mkdir('plugins');
        console.log('✅ plugins creado');
      }
      
    } catch (err) {
      console.log('❌ wp-content no encontrado en public_html');
    }
    
  } catch (err) {
    console.error('❌ Búsqueda fallida:', err.message);
  } finally {
    client.close();
  }
}

findRealWordPress();