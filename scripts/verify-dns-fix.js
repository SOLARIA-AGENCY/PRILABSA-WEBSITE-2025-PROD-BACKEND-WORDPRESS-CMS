#!/usr/bin/env node

/**
 * DNS Verification Script for Prilabsa
 * Verifies that prilabsa.solaria.agency is correctly configured and accessible
 */

import { execSync } from 'child_process';

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

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

async function checkDNSResolution() {
  logStep('DNS', 'Checking DNS resolution...');
  
  try {
    const result = execSync('dig +short prilabsa.solaria.agency', { encoding: 'utf8' });
    const ips = result.trim().split('\n').filter(ip => ip.length > 0);
    
    if (ips.length === 0) {
      logError('No DNS resolution found');
      return { success: false, ips: [] };
    }
    
    logSuccess(`DNS resolved to: ${ips.join(', ')}`);
    return { success: true, ips };
    
  } catch (error) {
    logError(`DNS check failed: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function checkTargetServer() {
  logStep('TARGET', 'Checking target server IP...');
  
  try {
    const result = execSync('dig +short fr-int-web1794.main-hosting.eu', { encoding: 'utf8' });
    const targetIP = result.trim().split('\n').pop(); // Get final IP after CNAME
    
    logInfo(`Target server IP: ${targetIP}`);
    return { success: true, targetIP };
    
  } catch (error) {
    logError(`Target server check failed: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function checkHTTPResponse() {
  logStep('HTTP', 'Checking HTTP response...');
  
  try {
    const result = execSync('curl -I https://prilabsa.solaria.agency 2>/dev/null', { encoding: 'utf8' });
    const lines = result.split('\n');
    const statusLine = lines[0];
    const locationHeader = lines.find(line => line.toLowerCase().startsWith('location:'));
    
    logInfo(`Status: ${statusLine}`);
    
    if (locationHeader) {
      const redirectTo = locationHeader.split(': ')[1]?.trim();
      if (redirectTo && redirectTo.includes('solaria.agency') && !redirectTo.includes('prilabsa')) {
        logError(`Still redirecting to: ${redirectTo}`);
        return { success: false, redirect: redirectTo, status: statusLine };
      } else {
        logInfo(`Redirect: ${redirectTo}`);
      }
    }
    
    if (statusLine.includes('200')) {
      logSuccess('HTTP response is successful (200 OK)');
      return { success: true, status: statusLine };
    } else if (statusLine.includes('301') || statusLine.includes('302')) {
      logWarning('HTTP response shows redirect');
      return { success: false, status: statusLine, redirect: locationHeader };
    } else {
      logWarning(`HTTP response: ${statusLine}`);
      return { success: false, status: statusLine };
    }
    
  } catch (error) {
    logError(`HTTP check failed: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function checkSiteContent() {
  logStep('CONTENT', 'Checking site content...');
  
  try {
    const result = execSync('curl -s https://prilabsa.solaria.agency | head -20', { encoding: 'utf8' });
    
    if (result.includes('<title>') && result.includes('Prilabsa')) {
      logSuccess('Site content contains Prilabsa branding');
      return { success: true, hasPrilabsaContent: true };
    } else if (result.includes('<!DOCTYPE html>')) {
      logWarning('Site loads but may not have correct Prilabsa content');
      return { success: false, hasPrilabsaContent: false, hasHTML: true };
    } else {
      logError('Site does not return valid HTML content');
      return { success: false, hasPrilabsaContent: false, hasHTML: false };
    }
    
  } catch (error) {
    logError(`Content check failed: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function performFullVerification() {
  log('🔍 PRILABSA DNS VERIFICATION', 'bright');
  log('=' .repeat(40), 'bright');
  
  const results = {
    dns: await checkDNSResolution(),
    target: await checkTargetServer(),
    http: await checkHTTPResponse(),
    content: await checkSiteContent()
  };
  
  log('\n📊 VERIFICATION SUMMARY', 'bright');
  log('=' .repeat(40), 'bright');
  
  // Check if DNS points to correct server
  if (results.dns.success && results.target.success) {
    const dnsPointsToTarget = results.dns.ips.includes(results.target.targetIP);
    if (dnsPointsToTarget) {
      logSuccess('DNS correctly points to target server');
    } else {
      logError('DNS does NOT point to target server');
      logInfo(`DNS IPs: ${results.dns.ips.join(', ')}`);
      logInfo(`Target IP: ${results.target.targetIP}`);
    }
  }
  
  // Overall status
  const allChecksPass = results.dns.success && 
                       results.http.success && 
                       results.content.success;
  
  if (allChecksPass) {
    log('\n🎉 ALL CHECKS PASSED!', 'green');
    log('prilabsa.solaria.agency is working correctly', 'green');
  } else {
    log('\n⚠️  ISSUES DETECTED', 'yellow');
    
    if (!results.dns.success) {
      log('- DNS resolution issues', 'red');
    }
    if (!results.http.success) {
      log('- HTTP response issues (redirects or errors)', 'red');
    }
    if (!results.content.success) {
      log('- Site content issues', 'red');
    }
    
    log('\n🔧 RECOMMENDED ACTIONS:', 'cyan');
    log('1. Run: npm run dns:fix');
    log('2. Check Cloudflare DNS settings');
    log('3. Verify server configuration');
    log('4. Contact hosting provider if needed');
  }
  
  return results;
}

async function main() {
  try {
    await performFullVerification();
  } catch (error) {
    logError(`Verification failed: ${error.message}`);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { performFullVerification, checkDNSResolution, checkHTTPResponse, checkSiteContent };