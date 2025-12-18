const ftp = require('basic-ftp');
const fs = require('fs');

async function checkCurrentHtaccess() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    await client.access({
      host: 'productos.prilabsa.com',
      user: 'solaria.charlie@blog.prilabsa.com',
      password: 'SoCh2025$%',
      port: 21,
      secure: false
    });

    await client.cd('public_html');
    console.log('📄 Descargando .htaccess actual...');
    const writable = fs.createWriteStream('current-htaccess.txt');
    await client.downloadTo(writable, '.htaccess');
    console.log('✅ .htaccess descargado como current-htaccess.txt');
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    client.close();
  }
}

checkCurrentHtaccess();