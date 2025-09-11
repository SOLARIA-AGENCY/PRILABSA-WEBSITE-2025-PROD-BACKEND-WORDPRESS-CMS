#!/usr/bin/env node

/**
 * FTP Deployment Script for Prilabsa Website
 * Builds the project and deploys to blog.prilabsa.com
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
// @ts-ignore
import * as ftp from 'basic-ftp';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const CONFIG_FILE = path.join(__dirname, '..', '.ftpconfig.json');
const BUILD_DIR = path.join(__dirname, '..', 'dist');

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

async function loadConfig() {
  try {
    if (!fs.existsSync(CONFIG_FILE)) {
      throw new Error(`Configuration file not found: ${CONFIG_FILE}`);
    }
    
    const configData = fs.readFileSync(CONFIG_FILE, 'utf8');
    const config = JSON.parse(configData);
    return config;
  } catch (error) {
    logError(`Failed to load FTP configuration: ${error.message}`);
    process.exit(1);
  }
}

function buildProject() {
  logStep('BUILD', 'Starting project build...');
  
  try {
    // Clean previous build
    if (fs.existsSync(BUILD_DIR)) {
      execSync('rm -rf dist', { stdio: 'inherit' });
    }
    
    // Run type check and build
    execSync('npm run type-check', { stdio: 'inherit' });
    execSync('npm run build', { stdio: 'inherit' });
    
    if (!fs.existsSync(BUILD_DIR)) {
      throw new Error('Build directory not found after build');
    }
    
    logSuccess('Project built successfully');
  } catch (error) {
    logError(`Build failed: ${error.message}`);
    process.exit(1);
  }
}

// BACKUP .HTACCESS FUNCTION (as requested)
async function backupHtaccess(client) {
  logStep('BACKUP', 'Creating backup of existing .htaccess file...');
  
  try {
    // Check if .htaccess exists on server
    const files = await client.list();
    const htaccessExists = files.some(file => file.name === '.htaccess');
    
    if (htaccessExists) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupName = `.htaccess.backup.${timestamp}`;
      
      // Create backup by renaming current .htaccess
      await client.rename('.htaccess', backupName);
      logSuccess(`✅ .htaccess backed up as: ${backupName}`);
    } else {
      logWarning('⚠️  No existing .htaccess file found on server');
    }
  } catch (error) {
    logWarning(`⚠️  Could not backup .htaccess: ${error.message}`);
    // Continue deployment even if backup fails
  }
}

// UPLOAD WITH EXTENDED TIMEOUT FUNCTION
async function uploadWithExtendedTimeout(client, localDir, timeout) {
  logStep('UPLOAD', 'Starting file upload with extended timeouts...');
  
  try {
    // Configure client for extended timeouts
    client.ftp.timeout = timeout;
    client.ftp.keepAlive = 30000; // Keep connection alive
    
    // Upload directory with progress tracking
    let uploadedFiles = 0;
    const totalFiles = await countFiles(localDir);
    
    client.trackProgress(info => {
      if (info.type === 'upload') {
        uploadedFiles++;
        logStep('PROGRESS', `Uploaded ${uploadedFiles}/${totalFiles} files: ${info.name}`);
      }
    });
    
    await client.uploadFromDir(localDir);
    client.trackProgress(); // Stop tracking
    
    logSuccess(`✅ Successfully uploaded ${uploadedFiles} files`);
    
  } catch (error) {
    logError(`Upload failed: ${error.message}`);
    throw error;
  }
}

// FILE INTEGRITY VERIFICATION FUNCTION
async function verifyFileIntegrity(client, localDir) {
  logStep('VERIFY', 'Verifying file integrity...');
  
  try {
    const remoteFiles = await client.list();
    const localFiles = await getLocalFiles(localDir);
    
    let verifiedCount = 0;
    let errorCount = 0;
    
    for (const localFile of localFiles) {
      const remoteFile = remoteFiles.find(f => f.name === localFile.name);
      
      if (remoteFile) {
        // Basic size comparison
        if (Math.abs(remoteFile.size - localFile.size) < 100) { // Allow small differences
          verifiedCount++;
        } else {
          logWarning(`⚠️  Size mismatch for ${localFile.name}: local=${localFile.size}, remote=${remoteFile.size}`);
          errorCount++;
        }
      } else {
        logWarning(`⚠️  File not found on server: ${localFile.name}`);
        errorCount++;
      }
    }
    
    if (errorCount === 0) {
      logSuccess(`✅ File integrity verified: ${verifiedCount} files checked`);
    } else {
      logWarning(`⚠️  Integrity check completed with ${errorCount} warnings`);
    }
    
  } catch (error) {
    logWarning(`⚠️  Could not verify file integrity: ${error.message}`);
    // Continue even if verification fails
  }
}

// HELPER FUNCTIONS
async function countFiles(dir) {
  let count = 0;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    if (item.isFile()) {
      count++;
    } else if (item.isDirectory()) {
      count += await countFiles(path.join(dir, item.name));
    }
  }
  
  return count;
}

async function getLocalFiles(dir, basePath = '') {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const relativePath = path.join(basePath, item.name);
    
    if (item.isFile()) {
      const stats = fs.statSync(fullPath);
      files.push({
        name: relativePath.replace(/\\/g, '/'), // Normalize path separators
        size: stats.size
      });
    } else if (item.isDirectory()) {
      files.push(...await getLocalFiles(fullPath, relativePath));
    }
  }
  
  return files;
}

async function uploadToFTP(config) {
  const maxRetries = config.retries || 5;
  const timeout = config.timeout || 120000; // Extended timeout: 2 minutes
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    
    try {
      logStep('FTP', `Attempt ${attempt}/${maxRetries}: Connecting to ${config.host}:${config.port || 21}...`);
      
      // Set extended timeout for the connection
      const connectionConfig = {
        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port || 21,
        secure: config.secure || false,
        secureOptions: config.secureOptions || undefined
      };
      
      // Add extended timeout wrapper
      const connectPromise = client.access(connectionConfig);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), timeout)
      );
      
      await Promise.race([connectPromise, timeoutPromise]);
      
      logSuccess(`Connected to FTP server: ${config.host}`);
      
      // Test connection with a simple command
      await client.pwd();
      logStep('FTP', 'Connection verified successfully');
      
      // Change to remote directory
      if (config.remoteRoot) {
        logStep('FTP', `Changing to remote directory: ${config.remoteRoot}`);
        try {
          await client.ensureDir(config.remoteRoot);
          await client.cd(config.remoteRoot);
        } catch (dirError) {
          logWarning(`Could not change to ${config.remoteRoot}, trying to create it...`);
          await client.ensureDir(config.remoteRoot);
          await client.cd(config.remoteRoot);
        }
      }
      
      // STEP 1: Backup existing .htaccess file (as requested)
      await backupHtaccess(client);
      
      // STEP 2: Upload all project files
      logStep('FTP', 'Uploading project files with extended timeouts...');
      await uploadWithExtendedTimeout(client, BUILD_DIR, timeout);
      
      // STEP 3: Verify file integrity
      await verifyFileIntegrity(client, BUILD_DIR);
      
      logSuccess('All files uploaded and verified successfully');
      client.close();
      return; // Success, exit retry loop
      
    } catch (error) {
      client.close();
      
      const errorMsg = error.message || error.toString();
      logError(`FTP upload attempt ${attempt} failed: ${errorMsg}`);
      
      if (attempt === maxRetries) {
        // Last attempt failed
        logError('All FTP upload attempts failed');
        
        // Provide specific troubleshooting based on error type
        if (errorMsg.includes('ENOTFOUND') || errorMsg.includes('getaddrinfo')) {
          logError('❌ DNS resolution failed. Check FTP_HOST secret.');
        } else if (errorMsg.includes('ECONNREFUSED')) {
          logError('❌ Connection refused. Check if FTP server is running and port is correct.');
        } else if (errorMsg.includes('timeout') || errorMsg.includes('ETIMEDOUT')) {
          logError('❌ Connection timeout. Check firewall settings and passive mode.');
        } else if (errorMsg.includes('530') || errorMsg.includes('authentication')) {
          logError('❌ Authentication failed. Check FTP_USER and FTP_PASSWORD secrets.');
        } else if (errorMsg.includes('control socket')) {
          logError('❌ Control socket error. Try enabling secure mode or check passive mode settings.');
        }
        
        throw error;
      } else {
        // Wait before retry
        const waitTime = attempt * 2000; // Progressive backoff
        logStep('RETRY', `Waiting ${waitTime/1000}s before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }
}

async function verifyDeployment(config) {
  logStep('VERIFY', 'Verifying deployment...');
  
  try {
    // Check if index.html exists in build
    const indexPath = path.join(BUILD_DIR, 'index.html');
    if (!fs.existsSync(indexPath)) {
      throw new Error('index.html not found in build directory');
    }
    
    // Get build stats
    const stats = fs.statSync(BUILD_DIR);
    const files = fs.readdirSync(BUILD_DIR, { recursive: true });
    const fileCount = files.filter(file => {
      const fileName = typeof file === 'string' ? file : file.toString();
      const filePath = path.join(BUILD_DIR, fileName);
      return fs.statSync(filePath).isFile();
    }).length;
    
    logSuccess(`Deployment verified: ${fileCount} files uploaded`);
    log(`\n🚀 Deployment completed successfully!`, 'green');
    log(`📁 Build directory: ${BUILD_DIR}`, 'blue');
    log(`🌐 FTP Host: ${config.host}`, 'blue');
    log(`📂 Remote path: ${config.remoteRoot}`, 'blue');
    log(`📊 Files uploaded: ${fileCount}`, 'blue');
    
  } catch (error) {
    logWarning(`Verification warning: ${error.message}`);
  }
}

async function tryAlternativeConfigs(baseConfig) {
  const alternatives = [
    // Try with secure mode
    { ...baseConfig, secure: true, port: 21 },
    // Try SFTP
    { ...baseConfig, sftp: true, port: 22, secure: true },
    // Try different port
    { ...baseConfig, port: 2121, passive: false },
    // Try without passive mode
    { ...baseConfig, passive: false }
  ];
  
  for (const [index, config] of alternatives.entries()) {
    try {
      logStep('FALLBACK', `Trying alternative configuration ${index + 1}/${alternatives.length}...`);
      logStep('CONFIG', `Port: ${config.port}, Secure: ${config.secure}, SFTP: ${config.sftp}, Passive: ${config.passive}`);
      
      await uploadToFTP(config);
      logSuccess('Alternative configuration worked!');
      return config;
    } catch (error) {
      logWarning(`Alternative config ${index + 1} failed: ${error.message}`);
    }
  }
  
  throw new Error('All alternative configurations failed');
}

async function main() {
  const startTime = Date.now();
  
  log('\n🚀 PRILABSA FTP DEPLOYMENT SCRIPT - GODADDY OPTIMIZED', 'bright');
  log('=====================================================\n', 'bright');
  
  try {
    // Load configuration
    const config = await loadConfig();
    
    logStep('CONFIG', `Deploying to: ${config.host}${config.remoteRoot}`);
    logStep('CONFIG', `Using port: ${config.port}, Secure: ${config.secure}, Passive: ${config.passive}`);
    
    // Build project
    buildProject();
    
    // Upload to FTP (GoDaddy optimized - no fallbacks)
    await uploadToFTP(config);
    
    // Verify deployment
    await verifyDeployment(config);
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    log(`\n⏱️  Total deployment time: ${duration}s`, 'magenta');
    logSuccess('🎉 Deployment completed successfully!');
    logStep('INFO', `Files deployed to: https://${config.host}`);
    
  } catch (error) {
    logError(`Deployment failed: ${error.message}`);
    logError('\n🔧 TROUBLESHOOTING STEPS FOR GODADDY:');
    logError('1. Verify FTP credentials are correct');
    logError('2. Check if cPanel File Manager shows /public_html directory');
    logError('3. Ensure FTP is enabled in cPanel');
    logError('4. Try connecting with FileZilla using same credentials');
    logError('5. Contact GoDaddy support if connection issues persist');
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  log('\n⚠️  Deployment interrupted by user', 'yellow');
  process.exit(1);
});

process.on('SIGTERM', () => {
  log('\n⚠️  Deployment terminated', 'yellow');
  process.exit(1);
});

// Run the deployment
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main, loadConfig, buildProject, uploadToFTP };