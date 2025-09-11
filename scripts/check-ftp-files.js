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

async function checkFTPFiles() {
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
    
    // Check if assets directory exists
    try {
      await client.cd('assets');
      console.log('📂 Found assets directory');
      
      await client.cd('images');
      console.log('📂 Found images directory');
      
      await client.cd('productos');
      console.log('📂 Found productos directory');
      
      // List files in productos directory
      const files = await client.list();
      console.log(`\n📋 Files in productos directory (${files.length} items):`);
      
      files.forEach((file, index) => {
        if (index < 10) { // Show first 10 files
          console.log(`   ${file.type === 1 ? '📁' : '📄'} ${file.name} (${file.size} bytes)`);
        }
      });
      
      if (files.length > 10) {
        console.log(`   ... and ${files.length - 10} more files`);
      }
      
      // Check for specific file
      const targetFile = 'AL023_ZM_FEED_PARA_ZOEA_MYSIS.png';
      const foundFile = files.find(f => f.name === targetFile);
      
      if (foundFile) {
        console.log(`\n✅ Found target file: ${targetFile} (${foundFile.size} bytes)`);
      } else {
        console.log(`\n❌ Target file NOT found: ${targetFile}`);
      }
      
    } catch (error) {
      console.log(`❌ Error navigating to assets/images/productos: ${error.message}`);
    }
    
  } catch (error) {
    console.error(`❌ FTP Error: ${error.message}`);
  } finally {
    client.close();
  }
}

checkFTPFiles().catch(console.error);