const ftp = require('basic-ftp');

async function searchWordPressEverywhere() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    console.log('🔍 Buscando WordPress en todo el servidor...');
    
    await client.access({
      host: 'productos.prilabsa.com',
      user: 'solaria.charlie@blog.prilabsa.com',
      password: 'SoCh2025$%',
      port: 21,
      secure: false
    });

    // Check all directories in root
    const rootFiles = await client.list('/');
    const directories = rootFiles.filter(f => f.type === 1);
    
    console.log(`📁 Buscando en ${directories.length} directorios...`);
    
    for (const dir of directories) {
      try {
        await client.cd(dir.name);
        
        // Look for WordPress indicators
        const wpIndicators = ['wp-config.php', 'wp-admin', 'wp-includes', 'index.php'];
        let foundCount = 0;
        
        for (const indicator of wpIndicators) {
          try {
            await client.size(indicator);
            foundCount++;
          } catch (err) {
            // Not found
          }
        }
        
        if (foundCount >= 2) {
          console.log(`🎯 WordPress encontrado en: /${dir.name}`);
          
          // Check if wp-content exists
          try {
            await client.cd('wp-content');
            console.log(`  ✅ wp-content encontrado en /${dir.name}/wp-content`);
            
            try {
              await client.cd('plugins');
              console.log(`  ✅ plugins encontrado en /${dir.name}/wp-content/plugins`);
              
              const plugins = await client.list('/');
              console.log(`  📁 Plugins existentes: ${plugins.length}`);
              
            } catch (err) {
              console.log(`  ❌ plugins no encontrado en /${dir.name}/wp-content`);
            }
            
          } catch (err) {
            console.log(`  ❌ wp-content no encontrado en /${dir.name}`);
          }
        }
        
        await client.cd('..');
      } catch (err) {
        // Can't access directory
      }
    }
    
    console.log('');
    console.log('🌐 Como el sitio responde, WordPress debe estar instalado.');
    console.log('📋 Vamos a usar la URL del admin directamente:');
    console.log('   https://productos.prilabsa.com/wp-admin/');
    console.log('');
    console.log('🔌 Los plugins deben activarse manualmente desde el admin.');
    
  } catch (err) {
    console.error('❌ Búsqueda fallida:', err.message);
  } finally {
    client.close();
  }
}

searchWordPressEverywhere();