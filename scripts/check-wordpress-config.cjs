const ftp = require('basic-ftp');

async function checkWordPressConfig() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    console.log('🔍 Checking WordPress configuration...');
    
    await client.access({
      host: 'productos.prilabsa.com',
      user: 'solaria.charlie@blog.prilabsa.com',
      password: 'SoCh2025$%',
      port: 21,
      secure: false
    });

    // Check if wp-config.php exists
    try {
      const configExists = await client.size('wp-config.php');
      console.log('✅ wp-config.php exists');
    } catch (err) {
      console.log('❌ wp-config.php not found');
    }

    // List files in root directory
    const files = await client.list('/');
    console.log('📁 Root directory files:');
    files.forEach(file => {
      console.log(`  ${file.name} (${file.type})`);
    });

    // Check if index.php exists
    try {
      const indexExists = await client.size('index.php');
      console.log('✅ index.php exists');
    } catch (err) {
      console.log('❌ index.php not found');
    }
    
  } catch (err) {
    console.error('❌ Check failed:', err.message);
  } finally {
    client.close();
  }
}

checkWordPressConfig();