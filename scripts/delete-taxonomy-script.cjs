#!/usr/bin/env node
const ftp = require('basic-ftp');

async function deleteScript() {
  const client = new ftp.Client();
  try {
    console.log('🔒 Deleting populate-taxonomies.php for security...\n');
    
    await client.access({
      host: 'productos.prilabsa.com',
      user: 'solaria.charlie@blog.prilabsa.com',
      password: 'SoCh2025$%',
      secure: false
    });
    
    await client.cd('/public_html/productos.prilabsa.com');
    await client.remove('populate-taxonomies.php');
    
    console.log('✓ Script deleted successfully\n');
  } catch (error) {
    console.error('✗ ERROR:', error.message);
    process.exit(1);
  } finally {
    client.close();
  }
}

deleteScript();
