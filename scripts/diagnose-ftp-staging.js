#!/usr/bin/env node

/**
 * FTP Staging Connectivity Diagnostic Script
 * Diagnoses FTP connection issues for staging deployment
 */

import { execSync } from 'child_process';
import ftp from 'basic-ftp';
import net from 'net';

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

// Test hosts to check
const TEST_HOSTS = [
  {
    name: 'Actual FTP Server (from config example)',
    host: 'fr-int-web1794.main-hosting.eu',
    port: 21,
    description: 'This should be the correct FTP server'
  },
  {
    name: 'Website Domain (likely incorrect for FTP)',
    host: 'prilabsa.solaria.agency',
    port: 21,
    description: 'This is the website domain, not the FTP server'
  }
];

function testPortConnectivity(host, port, timeout = 5000) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let connected = false;
    
    socket.setTimeout(timeout);
    
    socket.on('connect', () => {
      connected = true;
      socket.destroy();
      resolve({ success: true, error: null });
    });
    
    socket.on('timeout', () => {
      socket.destroy();
      resolve({ success: false, error: 'Connection timeout' });
    });
    
    socket.on('error', (error) => {
      resolve({ success: false, error: error.message });
    });
    
    try {
      socket.connect(port, host);
    } catch (error) {
      resolve({ success: false, error: error.message });
    }
  });
}

async function testFTPConnection(host, port = 21) {
  const client = new ftp.Client();
  client.ftp.verbose = false;
  
  try {
    logStep('FTP', `Testing FTP connection to ${host}:${port}...`);
    
    await client.access({
      host: host,
      port: port,
      user: 'anonymous', // Try anonymous first
      password: 'anonymous@example.com',
      connTimeout: 10000,
      pasvTimeout: 10000
    });
    
    await client.pwd();
    client.close();
    return { success: true, error: null };
    
  } catch (error) {
    client.close();
    return { success: false, error: error.message };
  }
}

async function diagnoseDNS(hostname) {
  try {
    logStep('DNS', `Resolving ${hostname}...`);
    const result = execSync(`nslookup ${hostname}`, { encoding: 'utf8', timeout: 10000 });
    
    if (result.includes('NXDOMAIN') || result.includes('can\'t find')) {
      return { success: false, error: 'DNS resolution failed' };
    }
    
    // Extract IP addresses
    const ipMatches = result.match(/Address: ([0-9\.]+)/g);
    const ips = ipMatches ? ipMatches.map(match => match.replace('Address: ', '')) : [];
    
    return { success: true, ips: ips };
    
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function main() {
  log('🔍 FTP Staging Connectivity Diagnostic', 'bright');
  log(`📅 Timestamp: ${new Date().toISOString()}`, 'blue');
  log('', 'reset');
  
  for (const testHost of TEST_HOSTS) {
    log(`\n🌐 Testing: ${testHost.name}`, 'yellow');
    log(`   Host: ${testHost.host}`, 'blue');
    log(`   Description: ${testHost.description}`, 'blue');
    log('', 'reset');
    
    // 1. DNS Resolution
    const dnsResult = await diagnoseDNS(testHost.host);
    if (dnsResult.success) {
      logSuccess(`DNS resolution successful`);
      if (dnsResult.ips && dnsResult.ips.length > 0) {
        log(`   IP addresses: ${dnsResult.ips.join(', ')}`, 'cyan');
      }
    } else {
      logError(`DNS resolution failed: ${dnsResult.error}`);
      continue;
    }
    
    // 2. Port Connectivity
    const portResult = await testPortConnectivity(testHost.host, testHost.port);
    if (portResult.success) {
      logSuccess(`Port ${testHost.port} is reachable`);
    } else {
      logError(`Port ${testHost.port} is not reachable: ${portResult.error}`);
      continue;
    }
    
    // 3. FTP Protocol Test
    const ftpResult = await testFTPConnection(testHost.host, testHost.port);
    if (ftpResult.success) {
      logSuccess(`FTP protocol test successful`);
    } else {
      logWarning(`FTP protocol test failed: ${ftpResult.error}`);
      log('   This might be due to authentication requirements', 'yellow');
    }
  }
  
  log('\n📋 Diagnostic Summary:', 'bright');
  log('', 'reset');
  log('1. If fr-int-web1794.main-hosting.eu is reachable:', 'yellow');
  log('   → Update STAGING_FTP_HOST secret to: fr-int-web1794.main-hosting.eu', 'cyan');
  log('', 'reset');
  log('2. If prilabsa.solaria.agency is reachable:', 'yellow');
  log('   → Verify this is actually the FTP server (unlikely)', 'cyan');
  log('', 'reset');
  log('3. If neither is reachable:', 'yellow');
  log('   → Check with hosting provider for correct FTP server details', 'cyan');
  log('   → Verify firewall/network restrictions', 'cyan');
  log('', 'reset');
  log('4. GitHub Secrets to verify:', 'yellow');
  log('   → STAGING_FTP_HOST (should be the FTP server hostname)', 'cyan');
  log('   → STAGING_FTP_USER (should be u882790918)', 'cyan');
  log('   → STAGING_FTP_PASSWORD (should be the actual password)', 'cyan');
  log('', 'reset');
}

// Run diagnostic
main().catch(error => {
  logError(`Diagnostic failed: ${error.message}`);
  process.exit(1);
});