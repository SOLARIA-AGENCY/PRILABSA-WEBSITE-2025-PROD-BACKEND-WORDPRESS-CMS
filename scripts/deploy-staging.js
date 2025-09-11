#!/usr/bin/env node

/**
 * Staging Deployment Script for Prilabsa Website
 * Deploys to prilabsa.solaria.agency staging environment
 * Target: /home/u882790918/domains/prilabsa.solaria.agency/public_html/
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import ftp from 'basic-ftp';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const CONFIG_FILE = path.join(__dirname, '..', '.ftpconfig.staging.json');
const BUILD_DIR = path.join(__dirname, '..', 'dist');
const ENV_FILE = path.join(__dirname, '..', '.env.staging');

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
      throw new Error(`Staging configuration file not found: ${CONFIG_FILE}`);
    }
    
    const configData = fs.readFileSync(CONFIG_FILE, 'utf8');
    return JSON.parse(configData);
  } catch (error) {
    logError(`Failed to load staging FTP configuration: ${error.message}`);
    process.exit(1);
  }
}

function setupStagingEnvironment() {
  logStep('ENV', 'Setting up staging environment variables...');
  
  try {
    // Create staging environment file if it doesn't exist
    if (!fs.existsSync(ENV_FILE)) {
      const stagingEnv = `# Staging Environment Configuration
NODE_ENV=production

# Site Configuration
VITE_SITE_URL=https://prilabsa.solaria.agency
VITE_SITE_NAME=Prilabsa
VITE_SITE_DESCRIPTION=Proveedores de soluciones integrales en alimentos

# API Configuration
VITE_API_BASE_URL=https://prilabsa.solaria.agency/api

# Analytics (staging - disabled)
VITE_GA_TRACKING_ID=
VITE_GTM_ID=

# Contact Configuration
VITE_CONTACT_EMAIL=info@prilabsa.com.ec
VITE_WHATSAPP_NUMBER=593999999999

# Development Configuration
VITE_DEV_MODE=false
VITE_STAGING=true
`;
      fs.writeFileSync(ENV_FILE, stagingEnv);
      logSuccess('Staging environment file created');
    }
    
    // Copy staging env to .env for build
    fs.copyFileSync(ENV_FILE, path.join(__dirname, '..', '.env'));
    logSuccess('Staging environment configured');
  } catch (error) {
    logError(`Failed to setup staging environment: ${error.message}`);
    process.exit(1);
  }
}

function buildProject() {
  logStep('BUILD', 'Starting staging build...');
  
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
    
    logSuccess('Staging build completed successfully');
  } catch (error) {
    logError(`Staging build failed: ${error.message}`);
    process.exit(1);
  }
}

async function uploadToStaging(config) {
  const maxRetries = config.retries || 3;
  const timeout = config.timeout || 120000; // Increased timeout for staging
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    
    try {
      logStep('STAGING', `Attempt ${attempt}/${maxRetries}: Connecting to staging server...`);
      
      const connectionConfig = {
        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port || 21,
        secure: config.secure || false,
        secureOptions: config.secureOptions || { rejectUnauthorized: false },
        connTimeout: 120000,  // Increased from default
        pasvTimeout: 120000,  // Increased from default
        keepalive: 120000     // Increased from default
      };
      
      // Add timeout wrapper
      const connectPromise = client.access(connectionConfig);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), timeout)
      );
      
      await Promise.race([connectPromise, timeoutPromise]);
      
      logSuccess(`Connected to staging server: ${config.host}`);
      
      // Test connection
      await client.pwd();
      logStep('STAGING', 'Staging connection verified');
      
      // Navigate to staging directory
      if (config.remoteRoot) {
        logStep('STAGING', `Navigating to: ${config.remoteRoot}`);
        try {
          await client.ensureDir(config.remoteRoot);
          await client.cd(config.remoteRoot);
        } catch (dirError) {
          logWarning(`Creating staging directory: ${config.remoteRoot}`);
          await client.ensureDir(config.remoteRoot);
          await client.cd(config.remoteRoot);
        }
      }
      
      // Upload staging files
      logStep('STAGING', 'Uploading files to staging environment...');
      await client.uploadFromDir(BUILD_DIR);
      
      logSuccess('Staging deployment completed successfully');
      client.close();
      return; // Success, exit retry loop
      
    } catch (error) {
      client.close();
      
      const errorMsg = error.message || error.toString();
      logError(`Staging upload attempt ${attempt} failed: ${errorMsg}`);
      
      if (attempt === maxRetries) {
        logError('All staging upload attempts failed');
        
        // Provide specific troubleshooting
        if (errorMsg.includes('ENOTFOUND')) {
          logError('❌ DNS resolution failed. Check staging server hostname.');
        } else if (errorMsg.includes('ECONNREFUSED')) {
          logError('❌ Connection refused. Check staging server status.');
        } else if (errorMsg.includes('timeout')) {
          logError('❌ Connection timeout. Check staging server connectivity.');
        } else if (errorMsg.includes('530') || errorMsg.includes('authentication')) {
          logError('❌ Authentication failed. Check staging credentials.');
        }
        
        throw error;
      } else {
        const waitTime = Math.pow(2, attempt) * 5000; // Exponential backoff: 10s, 20s, 40s
        logStep('RETRY', `Waiting ${waitTime/1000}s before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }
}

async function verifyStaging(config) {
  logStep('VERIFY', 'Verifying staging deployment...');
  
  try {
    // Check build files
    const indexPath = path.join(BUILD_DIR, 'index.html');
    if (!fs.existsSync(indexPath)) {
      throw new Error('index.html not found in build directory');
    }
    
    // Get deployment stats
    const files = fs.readdirSync(BUILD_DIR, { recursive: true });
    const fileCount = files.filter(file => {
      const filePath = path.join(BUILD_DIR, file);
      return fs.statSync(filePath).isFile();
    }).length;
    
    logSuccess(`Staging deployment verified: ${fileCount} files uploaded`);
    logSuccess(`Staging URL: https://prilabsa.solaria.agency`);
    
    // Cleanup staging env
    const envPath = path.join(__dirname, '..', '.env');
    if (fs.existsSync(envPath)) {
      fs.unlinkSync(envPath);
    }
    
  } catch (error) {
    logWarning(`Staging verification warning: ${error.message}`);
  }
}

async function main() {
  try {
    log('🚀 Prilabsa Staging Deployment Started', 'bright');
    log('Target: prilabsa.solaria.agency', 'blue');
    log(`📅 Timestamp: ${new Date().toISOString()}`, 'blue');
    log(`🔧 Node.js version: ${process.version}`, 'blue');
    
    const config = await loadConfig();
    
    setupStagingEnvironment();
    buildProject();
    await uploadToStaging(config);
    await verifyStaging(config);
    
    log('\n✅ Staging deployment completed successfully!', 'green');
    log('🌐 Staging URL: https://prilabsa.solaria.agency', 'cyan');
    log('\n📋 Next steps:', 'yellow');
    log('   1. Configure Cloudflare SSL to "Flexible" mode', 'yellow');
    log('   2. Verify HTTPS functionality', 'yellow');
    
  } catch (error) {
    logError(`\nStaging deployment failed: ${error.message}`);
    logError('📍 Error details:');
    logError(`   Type: ${error.constructor.name}`);
    logError(`   Code: ${error.code || 'N/A'}`);
    logError(`   Stack: ${error.stack}`);
    process.exit(1);
  }
}

// Run deployment
main();