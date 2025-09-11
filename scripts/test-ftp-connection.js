#!/usr/bin/env node

/**
 * FTP Connection Test Script
 * Tests FTP connectivity before deployment
 */

import fs from 'fs';
import path from 'path';
import ftp from 'basic-ftp';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import readline from 'readline';

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
  magenta: '\x1b[35m',
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

function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function getCredentials() {
  const rl = createReadlineInterface();
  
  log('\n🔐 FTP Connection Test', 'bright');
  log('=====================\n', 'bright');
  
  const credentials = {
    host: await askQuestion(rl, 'FTP Host: '),
    user: await askQuestion(rl, 'FTP Username: '),
    password: await askQuestion(rl, 'FTP Password: '),
    port: parseInt(await askQuestion(rl, 'FTP Port (default 21): ') || '21'),
    remoteRoot: await askQuestion(rl, 'Remote Directory (default /public_html): ') || '/public_html'
  };
  
  rl.close();
  return credentials;
}

async function testFTPConnection(config, testType = 'basic') {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  
  try {
    logStep('TEST', `Testing ${testType} FTP connection...`);
    
    const connectionConfig = {
      host: config.host,
      user: config.user,
      password: config.password,
      port: config.port,
      secure: testType === 'secure',
      secureOptions: testType === 'secure' ? { rejectUnauthorized: false } : undefined
    };
    
    // Test connection with timeout
    const connectPromise = client.access(connectionConfig);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Connection timeout (30s)')), 30000)
    );
    
    await Promise.race([connectPromise, timeoutPromise]);
    logSuccess(`Connected to ${config.host}:${config.port}`);
    
    // Test basic commands
    const currentDir = await client.pwd();
    logSuccess(`Current directory: ${currentDir}`);
    
    // Test directory navigation
    if (config.remoteRoot) {
      try {
        await client.cd(config.remoteRoot);
        logSuccess(`Successfully changed to: ${config.remoteRoot}`);
      } catch (dirError) {
        logWarning(`Could not access ${config.remoteRoot}: ${dirError.message}`);
        
        // Try to create the directory
        try {
          await client.ensureDir(config.remoteRoot);
          logSuccess(`Created directory: ${config.remoteRoot}`);
        } catch (createError) {
          logError(`Cannot create directory: ${createError.message}`);
        }
      }
    }
    
    // Test file operations
    const testFileName = 'ftp-test-' + Date.now() + '.txt';
    const testContent = 'FTP connection test successful!';
    
    try {
      await client.uploadFrom(Buffer.from(testContent), testFileName);
      logSuccess(`Test file uploaded: ${testFileName}`);
      
      // Clean up test file
      await client.remove(testFileName);
      logSuccess('Test file cleaned up');
    } catch (uploadError) {
      logWarning(`File upload test failed: ${uploadError.message}`);
    }
    
    client.close();
    return true;
    
  } catch (error) {
    client.close();
    logError(`${testType} FTP test failed: ${error.message}`);
    return false;
  }
}

async function testAllConfigurations(baseConfig) {
  const testConfigs = [
    { name: 'Basic FTP', config: { ...baseConfig }, type: 'basic' },
    { name: 'Secure FTP', config: { ...baseConfig }, type: 'secure' },
    { name: 'SFTP (Port 22)', config: { ...baseConfig, port: 22 }, type: 'sftp' },
    { name: 'Alternative Port (2121)', config: { ...baseConfig, port: 2121 }, type: 'basic' }
  ];
  
  const results = [];
  
  for (const test of testConfigs) {
    log(`\n🧪 Testing: ${test.name}`, 'yellow');
    log('─'.repeat(40), 'yellow');
    
    if (test.type === 'sftp') {
      logWarning('SFTP testing requires different library - skipping for now');
      results.push({ name: test.name, success: false, reason: 'SFTP not implemented in this test' });
      continue;
    }
    
    const success = await testFTPConnection(test.config, test.type);
    results.push({ name: test.name, success, config: test.config });
    
    if (success) {
      logSuccess(`${test.name} connection successful!`);
    }
  }
  
  return results;
}

function generateWorkflowConfig(workingConfig) {
  const config = {
    host: '"${{ secrets.FTP_HOST }}"',
    user: '"${{ secrets.FTP_USER }}"',
    password: '"${{ secrets.FTP_PASSWORD }}"',
    port: workingConfig.port,
    localRoot: '"./dist"',
    remoteRoot: `"${workingConfig.remoteRoot}"`,
    uploadOnSave: false,
    passive: true,
    secure: workingConfig.type === 'secure',
    secureOptions: workingConfig.type === 'secure' ? {
      rejectUnauthorized: false
    } : null,
    sftp: workingConfig.type === 'sftp',
    deleteRemote: false,
    timeout: 30000,
    retries: 3,
    ignore: [
      '".vscode"',
      '".git"',
      '".DS_Store"',
      '"Thumbs.db"',
      '"node_modules"',
      '"src"',
      '"*.log"',
      '"*.tmp"'
    ]
  };
  
  return JSON.stringify(config, null, 2);
}

async function main() {
  try {
    // Get credentials from user
    const credentials = await getCredentials();
    
    // Test all configurations
    const results = await testAllConfigurations(credentials);
    
    // Display results
    log('\n📊 Test Results Summary', 'bright');
    log('========================\n', 'bright');
    
    const successfulTests = results.filter(r => r.success);
    const failedTests = results.filter(r => !r.success);
    
    if (successfulTests.length > 0) {
      log('✅ Successful Configurations:', 'green');
      successfulTests.forEach(test => {
        log(`   • ${test.name}`, 'green');
      });
      
      // Generate recommended workflow config
      const bestConfig = successfulTests[0];
      log('\n🔧 Recommended Workflow Configuration:', 'cyan');
      log('=====================================\n', 'cyan');
      console.log(generateWorkflowConfig(bestConfig.config));
      
    } else {
      log('❌ All configurations failed', 'red');
    }
    
    if (failedTests.length > 0) {
      log('\n❌ Failed Configurations:', 'red');
      failedTests.forEach(test => {
        log(`   • ${test.name}${test.reason ? ': ' + test.reason : ''}`, 'red');
      });
    }
    
    // Provide troubleshooting tips
    if (successfulTests.length === 0) {
      log('\n🔧 Troubleshooting Tips:', 'yellow');
      log('• Check if FTP server is online and accessible', 'yellow');
      log('• Verify credentials are correct', 'yellow');
      log('• Check firewall settings (ports 21, 22)', 'yellow');
      log('• Contact hosting provider for FTP server status', 'yellow');
      log('• Try connecting from a different network', 'yellow');
    }
    
  } catch (error) {
    logError(`Test failed: ${error.message}`);
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  log('\n⚠️  Test interrupted by user', 'yellow');
  process.exit(1);
});

// Run the test
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { testFTPConnection, testAllConfigurations };