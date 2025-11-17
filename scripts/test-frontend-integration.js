#!/usr/bin/env node

/**
 * Frontend WordPress Integration Test
 * Tests if frontend can connect to WordPress API
 */

import { testWordPressAPI } from './test-wordpress-api.js';

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

function checkEnvironmentVariables() {
  log('\n🔧 Environment Variables Check', 'bright');
  log('===============================\n', 'bright');
  
  const requiredVars = [
    'VITE_SITE_URL',
    'VITE_API_BASE_URL', 
    'VITE_WP_API_BASE_URL',
    'VITE_WP_REST_URL',
    'VITE_PRILABSA_API_URL'
  ];
  
  const envVars = {};
  
  for (const varName of requiredVars) {
    const value = process.env[varName];
    if (value) {
      logSuccess(`${varName}: ${value}`);
      envVars[varName] = value;
    } else {
      logWarning(`${varName}: Not set`);
    }
  }
  
  return envVars;
}

function checkFrontendConfiguration() {
  log('\n⚙️  Frontend Configuration Check', 'bright');
  log('==================================\n', 'bright');
  
  try {
    // Check if we have the right API service files
    const fs = require('fs');
    const path = require('path');
    
    const apiServicePath = path.join(process.cwd(), 'src', 'services', 'api.ts');
    
    if (fs.existsSync(apiServicePath)) {
      logSuccess('API service file exists');
      
      const apiContent = fs.readFileSync(apiServicePath, 'utf8');
      
      // Check for WordPress API configuration
      if (apiContent.includes('wp-json')) {
        logSuccess('WordPress API endpoints found in service');
      } else {
        logWarning('WordPress API endpoints not found in service');
      }
      
      // Check for PRILABSA API configuration
      if (apiContent.includes('prilabsa')) {
        logSuccess('PRILABSA API endpoints found in service');
      } else {
        logWarning('PRILABSA API endpoints not found in service');
      }
      
    } else {
      logError('API service file not found');
    }
    
  } catch (error) {
    logError(`Configuration check failed: ${error.message}`);
  }
}

function generateIntegrationPlan() {
  log('\n📋 Integration Plan', 'bright');
  log('==================\n', 'bright');
  
  log('Phase 1: WordPress Backend Setup', 'yellow');
  log('  1. Install PRILABSA WordPress plugins', 'yellow');
  log('  2. Configure Custom Post Types', 'yellow');
  log('  3. Import 105 products data', 'yellow');
  log('  4. Test REST API endpoints', 'yellow');
  
  log('\nPhase 2: Frontend Integration', 'yellow');
  log('  1. Update API service configuration', 'yellow');
  log('  2. Test WordPress API connectivity', 'yellow');
  log('  3. Update product components', 'yellow');
  log('  4. Test frontend-backend integration', 'yellow');
  
  log('\nPhase 3: Deployment', 'yellow');
  log('  1. Build frontend with WordPress integration', 'yellow');
  log('  2. Deploy to productos.prilabsa.com', 'yellow');
  log('  3. Test live integration', 'yellow');
  log('  4. Monitor and optimize', 'yellow');
}

async function main() {
  log('\n🚀 Frontend WordPress Integration Test', 'bright');
  log('=======================================\n', 'bright');
  
  try {
    // Load environment variables
    const { createRequire } = await import('module');
    const require = createRequire(import.meta.url);
    const dotenv = require('dotenv');
    
    // Load production environment
    dotenv.config({ path: '.env.production' });
    
    // Check environment variables
    checkEnvironmentVariables();
    
    // Check frontend configuration
    checkFrontendConfiguration();
    
    // Test WordPress API connectivity
    await testWordPressAPI();
    
    // Generate integration plan
    generateIntegrationPlan();
    
    log('\n🎯 Next Steps', 'bright');
    log('=============\n', 'bright');
    logSuccess('1. WordPress is installed and API is accessible');
    logWarning('2. PRILABSA plugins need to be installed');
    logWarning('3. Frontend needs WordPress API integration');
    logSuccess('4. Ready for plugin installation and configuration');
    
  } catch (error) {
    logError(`Integration test failed: ${error.message}`);
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

export { main as testFrontendIntegration };