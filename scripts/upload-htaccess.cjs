const ftp = require('basic-ftp');
const path = require('path');
const fs = require('fs');

async function uploadHtaccess() {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    console.log('🔧 Uploading WordPress .htaccess file...');
    
    await client.access({
      host: 'productos.prilabsa.com',
      user: 'solaria.charlie@blog.prilabsa.com',
      password: 'SoCh2025$%',
      port: 21,
      secure: false
    });

    console.log('✅ Connected to FTP server');

    // Upload .htaccess to public_html directory
    await client.cd('public_html');
    const htaccessPath = path.join(__dirname, '../.htaccess');
    await client.uploadFrom(htaccessPath, '.htaccess');
    
    console.log('✅ .htaccess file uploaded successfully');
    
  } catch (err) {
    console.error('❌ Upload failed:', err.message);
  } finally {
    client.close();
  }
}

uploadHtaccess();