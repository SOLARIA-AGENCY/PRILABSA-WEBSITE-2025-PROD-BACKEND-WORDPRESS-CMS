#!/usr/bin/env node

import * as ftp from 'basic-ftp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CONFIG_FILE = path.join(__dirname, '..', '.ftpconfig.json');

async function loadConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    throw new Error(`Configuration file not found: ${CONFIG_FILE}`);
  }
  
  const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  return config;
}

async function removeHtaccess() {
  const client = new ftp.Client();
  client.ftp.verbose = false;
  
  try {
    const config = await loadConfig();
    
    console.log('🔍 Connecting to FTP server...');
    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      port: config.port || 21,
      secure: config.secure || false,
      secureOptions: { rejectUnauthorized: false }
    });
    
    console.log('✅ Connected successfully');
    
    // Navigate to remote directory
    await client.cd(config.remoteRoot || '/public_html');
    console.log(`📂 Changed to directory: ${config.remoteRoot || '/public_html'}`);
    
    // Try to remove .htaccess
    try {
      await client.remove('.htaccess');
      console.log('✅ .htaccess file removed successfully');
    } catch (error) {
      console.log(`⚠️  Could not remove .htaccess: ${error.message}`);
    }
    
  } catch (error) {
    console.error(`❌ FTP Error: ${error.message}`);
  } finally {
    client.close();
  }
}

removeHtaccess().catch(console.error);