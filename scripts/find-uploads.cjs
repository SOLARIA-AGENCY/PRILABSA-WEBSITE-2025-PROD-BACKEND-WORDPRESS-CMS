const ftp = require('basic-ftp');

async function findUploadsDirectory() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    console.log('🔍 Buscando directorio de uploads...');
    
    await client.access({
      host: 'productos.prilabsa.com',
      user: 'solaria.charlie@blog.prilabsa.com',
      password: 'SoCh2025$%',
      port: 21,
      secure: false
    });

    // Check common upload locations
    const possiblePaths = [
      'public_html/wp-content/uploads',
      'wordpress/wp-content/uploads',
      'wp-content/uploads',
      'uploads'
    ];
    
    for (const path of possiblePaths) {
      try {
        await client.cd(path);
        console.log(`✅ Encontrado: ${path}`);
        
        // Try to create prilabsa-productos directory
        try {
          await client.mkdir('prilabsa-productos');
          console.log(`✅ Directorio prilabsa-productos creado en ${path}`);
        } catch (err) {
          console.log(`📁 Directorio prilabsa-productos ya existe en ${path}`);
        }
        
        // Upload catalog
        await client.uploadFrom('./catalogo-productos.json', 'PRILABSA_CATALOGO_WEB_2025.json');
        console.log(`✅ Catálogo subido a ${path}/prilabsa-productos/`);
        
        return path;
        
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

findUploadsDirectory();