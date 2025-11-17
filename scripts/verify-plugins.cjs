const ftp = require('basic-ftp');

async function verifyPluginFiles() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    console.log('🔍 Verificando archivos de plugins...');
    
    await client.access({
      host: 'productos.prilabsa.com',
      user: 'solaria.charlie@blog.prilabsa.com',
      password: 'SoCh2025$%',
      port: 21,
      secure: false
    });

    await client.cd('public_html/wp-content/plugins');
    
    // List plugins directory
    const files = await client.list('/');
    console.log('📁 Archivos en wp-content/plugins:');
    files.forEach(file => {
      console.log(`  ${file.name} (${file.type === 1 ? 'dir' : 'file'})`);
    });
    
    // Check if prilabsa-productos directory exists
    try {
      await client.cd('prilabsa-productos');
      const pluginFiles = await client.list('/');
      console.log('🔌 Plugins PRILABSA encontrados:');
      pluginFiles.forEach(file => {
        console.log(`  ${file.name}`);
      });
    } catch (err) {
      console.log('❌ Directorio prilabsa-productos no encontrado');
    }
    
  } catch (err) {
    console.error('❌ Verificación fallida:', err.message);
  } finally {
    client.close();
  }
}

verifyPluginFiles();