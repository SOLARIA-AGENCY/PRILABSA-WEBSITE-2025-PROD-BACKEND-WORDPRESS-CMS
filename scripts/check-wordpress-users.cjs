const ftp = require('basic-ftp');

async function checkWordPressUsers() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    console.log('🔍 Checking WordPress installation and users...');
    
    await client.access({
      host: 'productos.prilabsa.com',
      user: 'solaria.charlie@blog.prilabsa.com',
      password: 'SoCh2025$%',
      port: 21,
      secure: false
    });

    await client.cd('public_html');
    
    // Check if wp-config.php exists and read it
    try {
      const configContent = await client.downloadTo(null, 'wp-config.php');
      console.log('✅ wp-config.php found');
      
      // Look for database credentials
      const lines = configContent.toString().split('\n');
      lines.forEach(line => {
        if (line.includes('DB_USER') || line.includes('DB_PASSWORD') || line.includes('DB_NAME')) {
          console.log('📋', line.trim());
        }
      });
      
    } catch (err) {
      console.log('❌ wp-config.php not found or not readable');
    }

    // List WordPress files
    const files = await client.list('/');
    console.log('📁 WordPress files in public_html:');
    files.forEach(file => {
      if (file.name.includes('wp-') || file.name === 'index.php') {
        console.log(`  ${file.name} (${file.type})`);
      }
    });
    
  } catch (err) {
    console.error('❌ Check failed:', err.message);
  } finally {
    client.close();
  }
}

checkWordPressUsers();