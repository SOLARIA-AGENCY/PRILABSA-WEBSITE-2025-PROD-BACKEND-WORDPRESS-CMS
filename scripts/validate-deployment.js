#!/usr/bin/env node

/**
 * Deployment Validation Script
 * Comprehensive validation of the Prilabsa website deployment
 */

import { execSync } from 'child_process';
import https from 'https';
import http from 'http';

// Configuration
const CONFIG = {
  domain: 'prilabsa.solaria.agency',
  expectedTitle: 'Prilabsa',
  timeout: 30000
};

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

async function validateSSL() {
  logStep('SSL', 'Validating SSL configuration...');
  
  try {
    const result = execSync('./scripts/check-ssl-status.sh', { encoding: 'utf8' });
    
    if (result.includes('SSL está funcionando correctamente')) {
      logSuccess('SSL configuration is working correctly');
      return true;
    } else {
      logWarning('SSL issues detected');
      return false;
    }
  } catch (error) {
    logError(`SSL validation failed: ${error.message}`);
    return false;
  }
}

async function validateHTTPSAccess() {
  logStep('HTTPS', 'Testing HTTPS access...');
  
  return new Promise((resolve) => {
    const req = https.request(`https://${CONFIG.domain}`, {
      method: 'GET',
      timeout: CONFIG.timeout,
      headers: {
        'User-Agent': 'Prilabsa-Deployment-Validator/1.0'
      }
    }, (res) => {
      logSuccess(`HTTPS accessible: ${res.statusCode} ${res.statusMessage}`);
      
      if (res.statusCode === 301 || res.statusCode === 302) {
        log(`🔄 Redirect to: ${res.headers.location}`, 'yellow');
      }
      
      resolve(true);
    });
    
    req.on('error', (error) => {
      logError(`HTTPS access failed: ${error.message}`);
      resolve(false);
    });
    
    req.on('timeout', () => {
      logError('HTTPS request timed out');
      req.destroy();
      resolve(false);
    });
    
    req.end();
  });
}

async function validateHTTPAccess() {
  logStep('HTTP', 'Testing HTTP access...');
  
  return new Promise((resolve) => {
    const req = http.request(`http://${CONFIG.domain}`, {
      method: 'GET',
      timeout: CONFIG.timeout,
      headers: {
        'User-Agent': 'Prilabsa-Deployment-Validator/1.0'
      }
    }, (res) => {
      logSuccess(`HTTP accessible: ${res.statusCode} ${res.statusMessage}`);
      
      if (res.statusCode === 301 || res.statusCode === 302) {
        log(`🔄 Redirect to: ${res.headers.location}`, 'yellow');
      }
      
      resolve(true);
    });
    
    req.on('error', (error) => {
      logError(`HTTP access failed: ${error.message}`);
      resolve(false);
    });
    
    req.on('timeout', () => {
      logError('HTTP request timed out');
      req.destroy();
      resolve(false);
    });
    
    req.end();
  });
}

async function validateCloudflare() {
  logStep('CLOUDFLARE', 'Validating Cloudflare configuration...');
  
  try {
    const result = execSync(`curl -s -I https://${CONFIG.domain}`, { encoding: 'utf8' });
    
    if (result.includes('cloudflare')) {
      logSuccess('Cloudflare is active');
      
      // Check for specific Cloudflare headers
      const cfRay = result.match(/cf-ray: ([^\r\n]+)/i);
      const server = result.match(/server: ([^\r\n]+)/i);
      
      if (cfRay) {
        log(`📡 CF-Ray: ${cfRay[1]}`, 'blue');
      }
      
      if (server) {
        log(`🖥️  Server: ${server[1]}`, 'blue');
      }
      
      return true;
    } else {
      logWarning('Cloudflare headers not detected');
      return false;
    }
  } catch (error) {
    logError(`Cloudflare validation failed: ${error.message}`);
    return false;
  }
}

async function validateDeployment() {
  logStep('DEPLOYMENT', 'Validating deployment files...');
  
  try {
    // Check if key files are accessible
    const indexCheck = execSync(`curl -s -o /dev/null -w "%{http_code}" https://${CONFIG.domain}/`, { encoding: 'utf8' });
    
    if (indexCheck === '200' || indexCheck === '301' || indexCheck === '302') {
      logSuccess('Index page is accessible');
    } else {
      logWarning(`Index page returned: ${indexCheck}`);
    }
    
    // Check for assets
    const assetsCheck = execSync(`curl -s -o /dev/null -w "%{http_code}" https://${CONFIG.domain}/assets/`, { encoding: 'utf8' });
    
    if (assetsCheck === '200' || assetsCheck === '403') { // 403 is OK for directory listing disabled
      logSuccess('Assets directory is accessible');
    } else {
      logWarning(`Assets directory returned: ${assetsCheck}`);
    }
    
    return true;
  } catch (error) {
    logError(`Deployment validation failed: ${error.message}`);
    return false;
  }
}

async function generateReport(results) {
  log('\n📊 DEPLOYMENT VALIDATION REPORT', 'bright');
  log('================================================', 'blue');
  
  const checks = [
    { name: 'SSL Configuration', status: results.ssl },
    { name: 'HTTPS Access', status: results.https },
    { name: 'HTTP Access', status: results.http },
    { name: 'Cloudflare Integration', status: results.cloudflare },
    { name: 'Deployment Files', status: results.deployment }
  ];
  
  checks.forEach(check => {
    const status = check.status ? '✅ PASS' : '❌ FAIL';
    const color = check.status ? 'green' : 'red';
    log(`${check.name.padEnd(25)} ${status}`, color);
  });
  
  const totalPassed = checks.filter(c => c.status).length;
  const totalChecks = checks.length;
  
  log('\n📈 SUMMARY', 'bright');
  log(`Passed: ${totalPassed}/${totalChecks} checks`, totalPassed === totalChecks ? 'green' : 'yellow');
  
  if (totalPassed === totalChecks) {
    log('\n🎉 All validations passed! Deployment is successful.', 'green');
    log(`🌐 Site URL: https://${CONFIG.domain}`, 'cyan');
    return true;
  } else {
    log('\n⚠️  Some validations failed. Please review the issues above.', 'yellow');
    return false;
  }
}

async function main() {
  try {
    log('🔍 Prilabsa Deployment Validation', 'bright');
    log(`Target: ${CONFIG.domain}`, 'blue');
    log('Starting comprehensive validation...\n', 'blue');
    
    const results = {
      ssl: await validateSSL(),
      https: await validateHTTPSAccess(),
      http: await validateHTTPAccess(),
      cloudflare: await validateCloudflare(),
      deployment: await validateDeployment()
    };
    
    const success = await generateReport(results);
    
    if (success) {
      log('\n🚀 Deployment validation completed successfully!', 'green');
      process.exit(0);
    } else {
      log('\n❌ Deployment validation failed!', 'red');
      process.exit(1);
    }
    
  } catch (error) {
    logError(`\nValidation error: ${error.message}`);
    process.exit(1);
  }
}

// Run validation
main();