const ftp = require('basic-ftp');

async function checkWordPressInstallation() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    console.log('🔍 Checking WordPress installation status...');
    
    await client.access({
      host: 'productos.prilabsa.com',
      user: 'solaria.charlie@blog.prilabsa.com',
      password: 'SoCh2025$%',
      port: 21,
      secure: false
    });

    await client.cd('public_html');
    
    // List all files to see what's actually there
    const files = await client.list('/');
    console.log('📁 All files in public_html:');
    files.forEach(file => {
      console.log(`  ${file.name} (${file.type === 1 ? 'dir' : 'file'})`);
    });
    
  } catch (err) {
    console.error('❌ Check failed:', err.message);
  } finally {
    client.close();
  }
}

checkWordPressInstallation();