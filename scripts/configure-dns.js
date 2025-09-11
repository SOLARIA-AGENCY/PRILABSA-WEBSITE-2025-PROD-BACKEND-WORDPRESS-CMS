#!/usr/bin/env node
/**
 * DNS Configuration Script for Prilabsa
 * Diagnoses DNS issues and provides configuration instructions
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const TARGET_DOMAIN = 'prilabsa.solaria.agency';
const SERVER_IP = '193.203.168.188';
const SERVER_HOST = 'fr-int-web1794.main-hosting.eu';

function log(message, color = 'white') {
  const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    reset: '\x1b[0m'
  };
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(title) {
  log('\n' + '='.repeat(60), 'cyan');
  log(`  ${title}`, 'cyan');
  log('='.repeat(60), 'cyan');
}

function logSection(title) {
  log(`\n📋 ${title}`, 'blue');
  log('-'.repeat(40), 'blue');
}

function checkDNS() {
  logSection('DNS Status Check');
  
  try {
    const result = execSync(`nslookup ${TARGET_DOMAIN}`, { encoding: 'utf8' });
    if (result.includes('NXDOMAIN') || result.includes('can\'t find')) {
      log('❌ DNS not configured - domain does not resolve', 'red');
      return false;
    } else {
      log('✅ DNS configured', 'green');
      log(result.trim());
      return true;
    }
  } catch (error) {
    log('❌ DNS not configured - domain does not resolve', 'red');
    return false;
  }
}

function checkServerStatus() {
  logSection('Server Status Check');
  
  try {
    // Check server IP resolution
    const serverResult = execSync(`nslookup ${SERVER_HOST}`, { encoding: 'utf8' });
    log('✅ Server resolves correctly:', 'green');
    log(serverResult.trim());
    
    // Check if site works with Host header
    const curlResult = execSync(`curl -I https://${SERVER_IP} -H "Host: ${TARGET_DOMAIN}" -k`, { encoding: 'utf8' });
    log('\n✅ Site is working on server:', 'green');
    log(curlResult.trim());
    
    return true;
  } catch (error) {
    log('❌ Server check failed:', 'red');
    log(error.message);
    return false;
  }
}

function generateDNSInstructions() {
  logSection('DNS Configuration Instructions');
  
  log('To fix the DNS issue, configure the following DNS records:', 'yellow');
  log('');
  log('📝 DNS Records to Add:', 'cyan');
  log(`   Type: A Record`, 'white');
  log(`   Name: prilabsa.solaria.agency`, 'white');
  log(`   Value: ${SERVER_IP}`, 'white');
  log(`   TTL: 300 (5 minutes)`, 'white');
  log('');
  log('🔧 Alternative CNAME Record:', 'cyan');
  log(`   Type: CNAME`, 'white');
  log(`   Name: prilabsa.solaria.agency`, 'white');
  log(`   Value: ${SERVER_HOST}`, 'white');
  log(`   TTL: 300 (5 minutes)`, 'white');
  log('');
  log('⚠️  Note: DNS propagation can take 5-60 minutes', 'yellow');
}

function checkGitHubActions() {
  logSection('GitHub Actions Status');
  
  try {
    const lastCommit = execSync('git log --oneline -1', { encoding: 'utf8' }).trim();
    log('✅ Latest commit pushed:', 'green');
    log(`   ${lastCommit}`);
    
    const workflowFiles = fs.readdirSync('.github/workflows');
    log('\n✅ Workflow files present:', 'green');
    workflowFiles.forEach(file => {
      log(`   📄 ${file}`, 'white');
    });
    
    log('\n⚠️  GitHub Actions status requires manual verification:', 'yellow');
    log('   Visit: https://github.com/SOLARIA-AGENCY/PRILABSA-WEBSITE-2025/actions');
    
    return true;
  } catch (error) {
    log('❌ GitHub Actions check failed:', 'red');
    log(error.message);
    return false;
  }
}

function generateStatusReport() {
  logSection('System Status Summary');
  
  const dnsOk = checkDNS();
  const serverOk = checkServerStatus();
  const actionsOk = checkGitHubActions();
  
  log('\n📊 Overall Status:', 'cyan');
  log(`   🌐 Website Deployment: ${serverOk ? '✅ WORKING' : '❌ FAILED'}`, serverOk ? 'green' : 'red');
  log(`   🔗 DNS Configuration: ${dnsOk ? '✅ CONFIGURED' : '❌ NOT CONFIGURED'}`, dnsOk ? 'green' : 'red');
  log(`   ⚙️  GitHub Actions: ${actionsOk ? '✅ READY' : '❌ ISSUES'}`, actionsOk ? 'green' : 'red');
  
  if (!dnsOk && serverOk) {
    log('\n🎯 SOLUTION: Configure DNS records to fix domain access', 'yellow');
    generateDNSInstructions();
  }
  
  return { dns: dnsOk, server: serverOk, actions: actionsOk };
}

function main() {
  logHeader('PRILABSA SYSTEM DIAGNOSIS & DNS CONFIGURATION');
  
  const status = generateStatusReport();
  
  logSection('Next Steps');
  
  if (!status.dns && status.server) {
    log('1. 🔧 Configure DNS records as shown above', 'yellow');
    log('2. ⏱️  Wait 5-60 minutes for DNS propagation', 'yellow');
    log('3. 🧪 Test domain access: https://prilabsa.solaria.agency', 'yellow');
  }
  
  if (!status.actions) {
    log('4. 🔍 Check GitHub Actions manually', 'yellow');
    log('5. 🔑 Configure LINEAR_API_KEY in GitHub Secrets if needed', 'yellow');
  }
  
  log('\n✅ System diagnosis complete!', 'green');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main, checkDNS, checkServerStatus, generateDNSInstructions };