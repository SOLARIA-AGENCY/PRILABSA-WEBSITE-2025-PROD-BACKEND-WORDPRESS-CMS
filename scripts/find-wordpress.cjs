const ftp = require('basic-ftp');

async function findWordPressStructure() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    console.log('🔍 Buscando estructura WordPress...');
    
    await client.access({
      host: 'productos.prilabsa.com',
      user: 'solaria.charlie@blog.prilabsa.com',
      password: 'SoCh2025$%',
      port: 21,
      secure: false
    });

    // Check root directory
    console.log('📁 Contenido del directorio raíz:');
    const rootFiles = await client.list('/');
    rootFiles.forEach(file => {
      if (file.name.includes('wp') || file.name === 'public_html') {
        console.log(`  ${file.name} (${file.type === 1 ? 'dir' : 'file'})`);
      }
    });
    
    // Check if WordPress is in a subdirectory
    await client.cd('public_html');
    console.log('📁 Contenido de public_html:');
    const publicFiles = await client.list('/');
    publicFiles.forEach(file => {
      console.log(`  ${file.name} (${file.type === 1 ? 'dir' : 'file'})`);
    });
    
    // Look for wp-content in different locations
    const possiblePaths = [
      'wp-content',
      'wordpress/wp-content',
      'site/wp-content',
      'cms/wp-content'
    ];
    
    for (const path of possiblePaths) {
      try {
        await client.cd(path);
        console.log(`✅ Encontrado wp-content en: ${path}`);
        
        // Check if plugins directory exists
        try {
          const plugins = await client.list('plugins');
          console.log(`📁 Plugins en ${path}/plugins:`, plugins.length);
        } catch (err) {
          console.log(`📁 Creando plugins en ${path}`);
        }
        break;
      } catch (err) {
        console.log(`❌ No encontrado: ${path}`);
      }
    }
    
  } catch (err) {
    console.error('❌ Búsqueda fallida:', err.message);
  } finally {
    client.close();
  }
}

findWordPressStructure();