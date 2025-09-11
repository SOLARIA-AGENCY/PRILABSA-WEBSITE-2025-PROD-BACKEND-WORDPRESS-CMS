#!/usr/bin/env node

/**
 * FTP Credentials Verification Script
 * Verifies that FTP credentials work correctly before deployment
 */

import ftp from 'basic-ftp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Colors for console output
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

async function loadStagingConfig() {
  const configFile = path.join(__dirname, '..', '.ftpconfig.staging.json');
  
  if (!fs.existsSync(configFile)) {
    throw new Error(`Staging config file not found: ${configFile}`);
  }
  
  const configData = fs.readFileSync(configFile, 'utf8');
  return JSON.parse(configData);
}

async function testFTPCredentials(config) {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  
  try {
    logStep('AUTH', 'Testing FTP authentication...');
    
    const connectionConfig = {
      host: config.host,
      user: config.user,
      password: config.password,
      port: config.port || 21,
      secure: config.secure || false,
      connTimeout: 30000,
      pasvTimeout: 30000
    };
    
    // Connect and authenticate
    await client.access(connectionConfig);
    logSuccess(`Authentication successful for user: ${config.user}`);
    
    // Test basic operations
    logStep('TEST', 'Testing basic FTP operations...');
    
    // Get current directory
    const currentDir = await client.pwd();
    logSuccess(`Current directory: ${currentDir}`);
    
    // Test navigation to target directory
    if (config.remoteRoot) {
      logStep('NAV', `Testing navigation to: ${config.remoteRoot}`);
      try {
        await client.cd(config.remoteRoot);
        logSuccess(`Successfully navigated to: ${config.remoteRoot}`);
        
        // List directory contents
        const list = await client.list();
        log(`   Directory contains ${list.length} items`, 'blue');
        
        // Test write permissions by creating a test file
        logStep('WRITE', 'Testing write permissions...');
        const testContent = `FTP Test - ${new Date().toISOString()}`;
        await client.uploadFrom(Buffer.from(testContent), 'ftp-test.txt');
        logSuccess('Write test successful - test file created');
        
        // Clean up test file
        try {
          await client.remove('ftp-test.txt');
          logSuccess('Test file cleaned up');
        } catch (cleanupError) {
          logWarning('Could not clean up test file (permissions?)');
        }
        
      } catch (navError) {
        logError(`Navigation failed: ${navError.message}`);
        throw navError;
      }
    }
    
    client.close();
    return true;
    
  } catch (error) {
    client.close();
    
    const errorMsg = error.message || error.toString();
    logError(`FTP test failed: ${errorMsg}`);
    
    // Provide specific guidance based on error type
    if (errorMsg.includes('530') || errorMsg.includes('authentication')) {
      logError('❌ Authentication failed - check username and password');
    } else if (errorMsg.includes('ENOTFOUND')) {
      logError('❌ Host not found - check STAGING_FTP_HOST');
    } else if (errorMsg.includes('ECONNREFUSED')) {
      logError('❌ Connection refused - check host and port');
    } else if (errorMsg.includes('timeout')) {
      logError('❌ Connection timeout - check network connectivity');
    }
    
    throw error;
  }
}

async function verifyGitHubSecretsFormat() {
  logStep('SECRETS', 'Verifying GitHub Secrets format...');
  
  const requiredSecrets = [
    'STAGING_FTP_HOST',
    'STAGING_FTP_USER', 
    'STAGING_FTP_PASSWORD'
  ];
  
  log('\n📋 Required GitHub Secrets:', 'yellow');
  log('   Repository Settings > Secrets and variables > Actions', 'blue');
  log('', 'reset');
  
  requiredSecrets.forEach(secret => {
    log(`   ${secret}`, 'cyan');
  });
  
  log('\n✅ Expected values:', 'green');
  log('   STAGING_FTP_HOST = "fr-int-web1794.main-hosting.eu"', 'cyan');
  log('   STAGING_FTP_USER = "u882790918"', 'cyan');
  log('   STAGING_FTP_PASSWORD = "[your-actual-password]"', 'cyan');
  log('', 'reset');
}

async function main() {
  try {
    log('🔐 FTP Credentials Verification', 'bright');
    log(`📅 Timestamp: ${new Date().toISOString()}`, 'blue');
    log('', 'reset');
    
    // First verify the expected GitHub Secrets format
    await verifyGitHubSecretsFormat();
    
    // Try to load and test staging config
    try {
      const config = await loadStagingConfig();
      
      log('\n🔧 Testing with current configuration:', 'yellow');
      log(`   Host: ${config.host}`, 'blue');
      log(`   User: ${config.user}`, 'blue');
      log(`   Port: ${config.port || 21}`, 'blue');
      log(`   Remote Root: ${config.remoteRoot || 'Not specified'}`, 'blue');
      log('', 'reset');
      
      await testFTPCredentials(config);
      
      log('\n🎉 FTP Credentials Verification PASSED!', 'green');
      log('✅ All tests successful - deployment should work', 'green');
      
    } catch (configError) {
      logWarning('Local config file not found or invalid');
      log('   This is normal for GitHub Actions environment', 'yellow');
      log('   Credentials will be loaded from GitHub Secrets during deployment', 'yellow');
    }
    
    log('\n📋 Next Steps:', 'bright');
    log('1. Ensure GitHub Secrets are set correctly', 'cyan');
    log('2. Run deployment: GitHub Actions > Deploy to Staging Environment', 'cyan');
    log('3. Monitor deployment logs for success', 'cyan');
    
  } catch (error) {
    logError(`\nVerification failed: ${error.message}`);
    log('\n🔧 Troubleshooting:', 'yellow');
    log('1. Double-check GitHub Secrets values', 'cyan');
    log('2. Contact hosting provider if credentials are correct', 'cyan');
    log('3. Run diagnose-ftp-staging.js for network diagnostics', 'cyan');
    process.exit(1);
  }
}

// Run verification
main();