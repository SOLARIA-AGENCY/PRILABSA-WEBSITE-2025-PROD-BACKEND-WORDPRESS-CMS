#!/usr/bin/env node

/**
 * WordPress Plugin Deployment Script
 * Deploys PRILABSA WordPress plugins to productos.prilabsa.com
 */

import fs from 'fs';
import path from 'path';
import ftp from 'basic-ftp';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`[${step}] ${message}`, 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

async function loadFTPConfig() {
  try {
    const configPath = path.join(__dirname, '..', '.ftpconfig.json');
    const configData = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configData);
    
    // Replace environment variables
    config.user = process.env.FTP_USER || config.user;
    config.password = process.env.FTP_PASSWORD || config.password;
    
    return config;
  } catch (error) {
    logError(`Failed to load FTP config: ${error.message}`);
    process.exit(1);
  }
}

async function deployWordPressPlugins() {
  log('\n🚀 WordPress Plugin Deployment', 'bright');
  log('===============================\n', 'bright');
  
  const config = await loadFTPConfig();
  const client = new ftp.Client();
  client.ftp.verbose = true;
  
  try {
    logStep('FTP', 'Connecting to server...');
    await client.access(config);
    logSuccess('Connected to FTP server');
    
    // Change to WordPress plugins directory
    const pluginDir = '/wp-content/plugins/prilabsa-productos';
    logStep('NAVIGATE', `Changing to plugin directory: ${pluginDir}`);
    
    try {
      await client.ensureDir(pluginDir);
      await client.cd(pluginDir);
      logSuccess(`Changed to: ${pluginDir}`);
    } catch (dirError) {
      logWarning(`Directory access issue: ${dirError.message}`);
      throw dirError;
    }
    
    // List plugin files to upload
    const pluginSourceDir = path.join(__dirname, '..', 'PROJECT-PRODUCTOS-HEADLESS-WP', 'wordpress-code');
    const pluginFiles = [
      'prilabsa-productos-cpt.php',
      'prilabsa-acf-config.php',
      'prilabsa-rest-api-custom.php',
      'prilabsa-import-products.php'
    ];
    
    logStep('UPLOAD', 'Uploading WordPress plugin files...');
    
    for (const filename of pluginFiles) {
      const localPath = path.join(pluginSourceDir, filename);
      
      if (!fs.existsSync(localPath)) {
        logError(`Plugin file not found: ${localPath}`);
        continue;
      }
      
      logStep('FILE', `Uploading: ${filename}`);
      await client.uploadFrom(localPath, filename);
      logSuccess(`✅ Uploaded: ${filename}`);
    }
    
    // Verify uploaded files
    logStep('VERIFY', 'Verifying uploaded files...');
    const remoteFiles = await client.list();
    
    for (const filename of pluginFiles) {
      const exists = remoteFiles.some(file => file.name === filename);
      if (exists) {
        logSuccess(`✅ Verified: ${filename}`);
      } else {
        logError(`❌ Missing: ${filename}`);
      }
    }
    
    client.close();
    logSuccess('\n🎉 WordPress plugin deployment completed!');
    log('\n📋 Next Steps:', 'blue');
    log('1. Log into WordPress admin at https://productos.prilabsa.com/wp-admin', 'blue');
    log('2. Install Advanced Custom Fields PRO plugin', 'blue');
    log('3. Activate PRILABSA plugins in this order:', 'blue');
    log('   - PRILABSA Productos Custom Post Type', 'blue');
    log('   - PRILABSA ACF Configuration', 'blue');
    log('   - PRILABSA REST API Custom Endpoints', 'blue');
    log('   - PRILABSA Product Importer', 'blue');
    
  } catch (error) {
    client.close();
    logError(`Deployment failed: ${error.message}`);
    
    // Provide troubleshooting
    log('\n🔧 Troubleshooting:', 'yellow');
    log('• Check FTP credentials in environment variables', 'yellow');
    log('• Verify /wp-content/plugins directory exists', 'yellow');
    log('• Check file permissions on server', 'yellow');
    log('• Ensure FTP user has write permissions', 'yellow');
    
    process.exit(1);
  }
}

async function main() {
  try {
    await deployWordPressPlugins();
  } catch (error) {
    logError(`Script failed: ${error.message}`);
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  log('\n⚠️  Deployment interrupted by user', 'yellow');
  process.exit(1);
});

// Run deployment
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { deployWordPressPlugins };