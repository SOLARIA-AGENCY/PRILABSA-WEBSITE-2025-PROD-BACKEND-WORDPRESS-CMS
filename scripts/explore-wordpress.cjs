const ftp = require('basic-ftp');

async function exploreWordPressStructure() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    console.log('🔍 Explorando estructura completa...');
    
    await client.access({
      host: 'productos.prilabsa.com',
      user: 'solaria.charlie@blog.prilabsa.com',
      password: 'SoCh2025$%',
      port: 21,
      secure: false
    });

    // Check if wordpress directory exists
    try {
      await client.cd('wordpress');
      console.log('✅ Directorio wordpress encontrado');
      
      const wpFiles = await client.list('/');
      console.log('📁 Contenido de wordpress:');
      wpFiles.forEach(file => {
        console.log(`  ${file.name} (${file.type === 1 ? 'dir' : 'file'})`);
      });
      
      // Check wp-content
      try {
        await client.cd('wp-content');
        console.log('✅ wp-content encontrado');
        
        const contentFiles = await client.list('/');
        console.log('📁 Contenido de wp-content:');
        contentFiles.forEach(file => {
          console.log(`  ${file.name} (${file.type === 1 ? 'dir' : 'file'})`);
        });
        
        // Check plugins
        try {
          await client.cd('plugins');
          console.log('✅ plugins encontrado');
          
          const pluginFiles = await client.list('/');
          console.log('📁 Contenido de plugins:');
          pluginFiles.forEach(file => {
            console.log(`  ${file.name} (${file.type === 1 ? 'dir' : 'file'})`);
          });
          
        } catch (err) {
          console.log('❌ Directorio plugins no encontrado');
        }
        
      } catch (err) {
        console.log('❌ Directorio wp-content no encontrado');
      }
      
    } catch (err) {
      console.log('❌ Directorio wordpress no encontrado');
    }
    
  } catch (err) {
    console.error('❌ Exploración fallida:', err.message);
  } finally {
    client.close();
  }
}

exploreWordPressStructure();