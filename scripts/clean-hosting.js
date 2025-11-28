#!/usr/bin/env node

/**
 * Clean hosting script - Remove all files from GoDaddy /public_html
 */

import fs from 'fs';
import path from 'path';
import * as ftp from 'basic-ftp';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CONFIG_FILE = path.join(__dirname, '..', '.ftpconfig.json');

async function loadConfig() {
  const configData = fs.readFileSync(CONFIG_FILE, 'utf8');
  return JSON.parse(configData);
}

async function cleanHosting() {
  console.log('\n🧹 CLEANING HOSTING - PRILABSA');
  console.log('================================\n');

  const config = await loadConfig();
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    console.log(`📡 Connecting to ${config.host}...`);
    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      port: config.port || 21,
      secure: config.secure || false,
    });

    console.log(`✅ Connected to FTP server`);

    // Change to remote directory
    if (config.remoteRoot) {
      console.log(`📂 Navigating to ${config.remoteRoot}...`);
      await client.cd(config.remoteRoot);
    }

    // List all files
    const files = await client.list();
    console.log(`\n📋 Found ${files.length} items in ${config.remoteRoot}`);

    // Remove all files except .htaccess and cgi-bin
    let removedCount = 0;
    for (const file of files) {
      if (file.name === '.htaccess' || file.name === 'cgi-bin') {
        console.log(`⏭️  Skipping: ${file.name}`);
        continue;
      }

      try {
        if (file.isDirectory) {
          console.log(`🗑️  Removing directory: ${file.name}`);
          await client.removeDir(file.name);
        } else {
          console.log(`🗑️  Removing file: ${file.name}`);
          await client.remove(file.name);
        }
        removedCount++;
      } catch (error) {
        console.log(`⚠️  Could not remove ${file.name}: ${error.message}`);
      }
    }

    console.log(`\n✅ Cleanup complete: ${removedCount} items removed`);
    console.log(`🎯 Hosting is now clean and ready for fresh deployment`);

    client.close();
  } catch (error) {
    console.error(`❌ Cleanup failed: ${error.message}`);
    client.close();
    process.exit(1);
  }
}

cleanHosting();
