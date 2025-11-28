const ftp = require('basic-ftp');

async function upload() {
  const client = new ftp.Client();
  try {
    await client.access({
      host: 'productos.prilabsa.com',
      user: 'solaria.charlie@blog.prilabsa.com',
      password: 'SoCh2025$%',
      secure: false
    });
    await client.cd('/public_html/productos.prilabsa.com');
    console.log('📤 Uploading index.html...');
    await client.uploadFrom('dist/index.html', 'index.html');
    console.log('✅ Done!');
  } catch(err) {
    console.error('❌', err.message);
  } finally {
    client.close();
  }
}
upload();
