const ftp = require('basic-ftp');

async function uploadCatalogJSON() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    console.log('📦 Subiendo catálogo JSON al servidor...');
    
    await client.access({
      host: 'productos.prilabsa.com',
      user: 'solaria.charlie@blog.prilabsa.com',
      password: 'SoCh2025$%',
      port: 21,
      secure: false
    });

    // Navigate to uploads directory
    await client.cd('public_html/wp-content/uploads');
    
    try {
      await client.mkdir('prilabsa-productos');
      console.log('✅ Directorio prilabsa-productos creado');
    } catch (err) {
      console.log('📁 Directorio prilabsa-productos ya existe');
    }
    
    await client.cd('prilabsa-productos');
    
    // Upload catalog JSON
    await client.uploadFrom('./catalogo-productos.json', 'PRILABSA_CATALOGO_WEB_2025.json');
    
    console.log('✅ Catálogo JSON subido exitosamente');
    console.log('📋 Catálogo listo para importar desde WordPress Admin');
    console.log('');
    console.log('🔗 URL WordPress Admin: https://productos.prilabsa.com/wp-admin/');
    console.log('📂 Ruta del catálogo: /wp-content/uploads/prilabsa-productos/PRILABSA_CATALOGO_WEB_2025.json');
    
  } catch (err) {
    console.error('❌ Subida fallida:', err.message);
  } finally {
    client.close();
  }
}

uploadCatalogJSON();