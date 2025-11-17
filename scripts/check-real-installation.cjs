const ftp = require('basic-ftp');

async function checkRealWordPressInstallation() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    console.log('🔍 Checking actual WordPress installation...');
    
    await client.access({
      host: 'productos.prilabsa.com',
      user: 'webmaster@solaria.agency',
      password: 'Solaria2025!',
      port: 21,
      secure: false
    });

    await client.cd('public_html');
    
    // List all files in the actual public_html
    const files = await client.list('/');
    console.log('📁 Files in public_html:');
    files.forEach(file => {
      console.log(`  ${file.name} (${file.type === 1 ? 'dir' : 'file'})`);
    });
    
    // Check if wp-content has our plugins
    try {
      await client.cd('wp-content/plugins');
      const plugins = await client.list('/');
      console.log('🔌 Plugins found:');
      plugins.forEach(plugin => {
        console.log(`  ${plugin.name} (${plugin.type === 1 ? 'dir' : 'file'})`);
      });
    } catch (err) {
      console.log('❌ No plugins directory found');
    }
    
  } catch (err) {
    console.error('❌ Check failed:', err.message);
  } finally {
    client.close();
  }
}

checkRealWordPressInstallation();