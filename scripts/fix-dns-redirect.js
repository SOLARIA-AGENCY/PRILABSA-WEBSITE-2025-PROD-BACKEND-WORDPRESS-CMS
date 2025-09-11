#!/usr/bin/env node

/**
 * DNS Redirect Fix Script for Prilabsa
 * Fixes the DNS configuration so prilabsa.solaria.agency points to the correct server
 * instead of redirecting to solaria.agency
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

async function diagnoseProblem() {
  logStep('DIAGNOSIS', 'Analyzing current DNS configuration...');
  
  try {
    // Check current DNS resolution
    logInfo('Current DNS resolution for prilabsa.solaria.agency:');
    const dnsResult = execSync('dig +short prilabsa.solaria.agency', { encoding: 'utf8' });
    console.log(dnsResult);
    
    // Check target server IP
    logInfo('Target server IP (fr-int-web1794.main-hosting.eu):');
    const targetResult = execSync('dig +short fr-int-web1794.main-hosting.eu', { encoding: 'utf8' });
    console.log(targetResult);
    
    // Check HTTP response
    logInfo('Current HTTP response:');
    const httpResult = execSync('curl -I https://prilabsa.solaria.agency 2>/dev/null | head -5', { encoding: 'utf8' });
    console.log(httpResult);
    
    const currentIPs = dnsResult.trim().split('\n').filter(ip => ip.length > 0);
    const targetIP = targetResult.trim().split('\n').pop(); // Get the final IP after CNAME
    
    if (currentIPs.includes(targetIP)) {
      logSuccess('DNS is pointing to the correct server!');
      logWarning('The redirect might be coming from server configuration.');
      return { needsDNSFix: false, currentIPs, targetIP };
    } else {
      logError('DNS is NOT pointing to the correct server!');
      logInfo(`Current IPs: ${currentIPs.join(', ')}`);
      logInfo(`Target IP: ${targetIP}`);
      return { needsDNSFix: true, currentIPs, targetIP };
    }
    
  } catch (error) {
    logError(`Diagnosis failed: ${error.message}`);
    return { needsDNSFix: true, error: error.message };
  }
}

function provideSolution(diagnosis) {
  log('\n' + '='.repeat(60), 'bright');
  log('🔧 SOLUTION REQUIRED', 'bright');
  log('='.repeat(60), 'bright');
  
  if (diagnosis.needsDNSFix) {
    log('\n📋 DNS CONFIGURATION FIX NEEDED:', 'yellow');
    log('\n1. Access Cloudflare Dashboard:', 'cyan');
    log('   - Go to https://dash.cloudflare.com');
    log('   - Select the "solaria.agency" domain');
    
    log('\n2. Navigate to DNS Records:', 'cyan');
    log('   - Click on "DNS" in the left sidebar');
    log('   - Look for "prilabsa" subdomain records');
    
    log('\n3. Update A Record:', 'cyan');
    log(`   - Change prilabsa.solaria.agency A record to: ${diagnosis.targetIP}`);
    log('   - Remove any conflicting CNAME records');
    log('   - Set TTL to "Auto" or 300 seconds');
    
    log('\n4. Verify Configuration:', 'cyan');
    log('   - Wait 5-10 minutes for DNS propagation');
    log('   - Run: npm run dns:verify');
    
  } else {
    log('\n📋 SERVER CONFIGURATION FIX NEEDED:', 'yellow');
    log('\n1. Check .htaccess on target server:', 'cyan');
    log('   - Verify no redirect rules to solaria.agency');
    log('   - Ensure DirectoryIndex points to index.html');
    
    log('\n2. Check server virtual host configuration:', 'cyan');
    log('   - Verify prilabsa.solaria.agency is configured correctly');
    log('   - Check for any redirect directives');
    
    log('\n3. Contact hosting provider if needed:', 'cyan');
    log('   - Server: fr-int-web1794.main-hosting.eu');
    log('   - Path: /home/u882790918/domains/prilabsa.solaria.agency/public_html');
  }
  
  log('\n' + '='.repeat(60), 'bright');
}

async function main() {
  log('🔍 PRILABSA DNS REDIRECT DIAGNOSTIC TOOL', 'bright');
  log('=' .repeat(50), 'bright');
  
  try {
    const diagnosis = await diagnoseProblem();
    provideSolution(diagnosis);
    
    log('\n📝 Next Steps:', 'green');
    log('1. Follow the solution steps above');
    log('2. Run: npm run dns:verify (after changes)');
    log('3. Test: curl -I https://prilabsa.solaria.agency');
    
  } catch (error) {
    logError(`Script failed: ${error.message}`);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { diagnoseProblem, provideSolution };