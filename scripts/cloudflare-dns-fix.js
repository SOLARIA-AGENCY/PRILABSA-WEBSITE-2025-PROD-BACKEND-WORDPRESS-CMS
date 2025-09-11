#!/usr/bin/env node

/**
 * Cloudflare DNS Automatic Fix Script for Prilabsa
 * Automatically updates DNS records via Cloudflare API
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

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

// Configuration
const TARGET_IP = '193.203.168.188'; // fr-int-web1794.main-hosting.eu
const DOMAIN = 'solaria.agency';
const SUBDOMAIN = 'prilabsa';
const FULL_DOMAIN = `${SUBDOMAIN}.${DOMAIN}`;

async function checkCloudflareCredentials() {
  logStep('AUTH', 'Checking Cloudflare credentials...');
  
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  const email = process.env.CLOUDFLARE_EMAIL;
  const apiKey = process.env.CLOUDFLARE_API_KEY;
  
  if (!apiToken && (!email || !apiKey)) {
    logError('Cloudflare credentials not found!');
    logInfo('Please set one of the following:');
    logInfo('Option 1: CLOUDFLARE_API_TOKEN (recommended)');
    logInfo('Option 2: CLOUDFLARE_EMAIL + CLOUDFLARE_API_KEY');
    logInfo('');
    logInfo('To get API Token:');
    logInfo('1. Go to https://dash.cloudflare.com/profile/api-tokens');
    logInfo('2. Create Token with Zone:Edit permissions for solaria.agency');
    logInfo('3. Export CLOUDFLARE_API_TOKEN="your-token-here"');
    return false;
  }
  
  logSuccess('Cloudflare credentials found');
  return { apiToken, email, apiKey };
}

async function getZoneId(credentials) {
  logStep('ZONE', 'Getting zone ID for solaria.agency...');
  
  try {
    let curlCmd;
    
    if (credentials.apiToken) {
      curlCmd = `curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=${DOMAIN}" \
        -H "Authorization: Bearer ${credentials.apiToken}" \
        -H "Content-Type: application/json"`;
    } else {
      curlCmd = `curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=${DOMAIN}" \
        -H "X-Auth-Email: ${credentials.email}" \
        -H "X-Auth-Key: ${credentials.apiKey}" \
        -H "Content-Type: application/json"`;
    }
    
    const response = execSync(curlCmd, { encoding: 'utf8' });
    const data = JSON.parse(response);
    
    if (!data.success || data.result.length === 0) {
      logError('Zone not found or API error');
      logInfo('Response:', JSON.stringify(data, null, 2));
      return null;
    }
    
    const zoneId = data.result[0].id;
    logSuccess(`Zone ID found: ${zoneId}`);
    return zoneId;
    
  } catch (error) {
    logError(`Failed to get zone ID: ${error.message}`);
    return null;
  }
}

async function getDNSRecords(credentials, zoneId) {
  logStep('DNS', `Getting DNS records for ${FULL_DOMAIN}...`);
  
  try {
    let curlCmd;
    
    if (credentials.apiToken) {
      curlCmd = `curl -s -X GET "https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?name=${FULL_DOMAIN}" \
        -H "Authorization: Bearer ${credentials.apiToken}" \
        -H "Content-Type: application/json"`;
    } else {
      curlCmd = `curl -s -X GET "https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?name=${FULL_DOMAIN}" \
        -H "X-Auth-Email: ${credentials.email}" \
        -H "X-Auth-Key: ${credentials.apiKey}" \
        -H "Content-Type: application/json"`;
    }
    
    const response = execSync(curlCmd, { encoding: 'utf8' });
    const data = JSON.parse(response);
    
    if (!data.success) {
      logError('Failed to get DNS records');
      logInfo('Response:', JSON.stringify(data, null, 2));
      return null;
    }
    
    logInfo(`Found ${data.result.length} DNS records for ${FULL_DOMAIN}`);
    return data.result;
    
  } catch (error) {
    logError(`Failed to get DNS records: ${error.message}`);
    return null;
  }
}

async function updateDNSRecord(credentials, zoneId, recordId, recordType = 'A') {
  logStep('UPDATE', `Updating ${recordType} record to ${TARGET_IP}...`);
  
  try {
    const recordData = {
      type: recordType,
      name: FULL_DOMAIN,
      content: TARGET_IP,
      ttl: 300
    };
    
    let curlCmd;
    
    if (credentials.apiToken) {
      curlCmd = `curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${recordId}" \
        -H "Authorization: Bearer ${credentials.apiToken}" \
        -H "Content-Type: application/json" \
        -d '${JSON.stringify(recordData)}'`;
    } else {
      curlCmd = `curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${recordId}" \
        -H "X-Auth-Email: ${credentials.email}" \
        -H "X-Auth-Key: ${credentials.apiKey}" \
        -H "Content-Type: application/json" \
        -d '${JSON.stringify(recordData)}'`;
    }
    
    const response = execSync(curlCmd, { encoding: 'utf8' });
    const data = JSON.parse(response);
    
    if (!data.success) {
      logError('Failed to update DNS record');
      logInfo('Response:', JSON.stringify(data, null, 2));
      return false;
    }
    
    logSuccess(`DNS record updated successfully`);
    return true;
    
  } catch (error) {
    logError(`Failed to update DNS record: ${error.message}`);
    return false;
  }
}

async function createDNSRecord(credentials, zoneId) {
  logStep('CREATE', `Creating A record for ${FULL_DOMAIN}...`);
  
  try {
    const recordData = {
      type: 'A',
      name: FULL_DOMAIN,
      content: TARGET_IP,
      ttl: 300
    };
    
    let curlCmd;
    
    if (credentials.apiToken) {
      curlCmd = `curl -s -X POST "https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records" \
        -H "Authorization: Bearer ${credentials.apiToken}" \
        -H "Content-Type: application/json" \
        -d '${JSON.stringify(recordData)}'`;
    } else {
      curlCmd = `curl -s -X POST "https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records" \
        -H "X-Auth-Email: ${credentials.email}" \
        -H "X-Auth-Key: ${credentials.apiKey}" \
        -H "Content-Type: application/json" \
        -d '${JSON.stringify(recordData)}'`;
    }
    
    const response = execSync(curlCmd, { encoding: 'utf8' });
    const data = JSON.parse(response);
    
    if (!data.success) {
      logError('Failed to create DNS record');
      logInfo('Response:', JSON.stringify(data, null, 2));
      return false;
    }
    
    logSuccess(`DNS record created successfully`);
    return true;
    
  } catch (error) {
    logError(`Failed to create DNS record: ${error.message}`);
    return false;
  }
}

async function waitForPropagation() {
  logStep('WAIT', 'Waiting for DNS propagation...');
  
  for (let i = 0; i < 12; i++) { // Wait up to 2 minutes
    try {
      const result = execSync(`dig +short ${FULL_DOMAIN}`, { encoding: 'utf8' });
      const ips = result.trim().split('\n').filter(ip => ip.length > 0);
      
      if (ips.includes(TARGET_IP)) {
        logSuccess('DNS propagation completed!');
        return true;
      }
      
      process.stdout.write('.');
      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
      
    } catch (error) {
      process.stdout.write('x');
    }
  }
  
  console.log('');
  logWarning('DNS propagation taking longer than expected');
  return false;
}

async function main() {
  log('🔧 CLOUDFLARE DNS AUTOMATIC FIX', 'bright');
  log('=' .repeat(50), 'bright');
  
  try {
    // Check credentials
    const credentials = await checkCloudflareCredentials();
    if (!credentials) {
      process.exit(1);
    }
    
    // Get zone ID
    const zoneId = await getZoneId(credentials);
    if (!zoneId) {
      process.exit(1);
    }
    
    // Get existing DNS records
    const records = await getDNSRecords(credentials, zoneId);
    if (records === null) {
      process.exit(1);
    }
    
    // Process records
    let updated = false;
    
    if (records.length === 0) {
      // No records exist, create new A record
      logInfo('No existing DNS records found, creating new A record...');
      updated = await createDNSRecord(credentials, zoneId);
    } else {
      // Update existing records
      for (const record of records) {
        logInfo(`Found ${record.type} record: ${record.content}`);
        
        if (record.type === 'A' && record.content !== TARGET_IP) {
          updated = await updateDNSRecord(credentials, zoneId, record.id, 'A');
        } else if (record.type === 'CNAME') {
          logWarning('Found CNAME record, updating to A record...');
          updated = await updateDNSRecord(credentials, zoneId, record.id, 'A');
        } else if (record.type === 'A' && record.content === TARGET_IP) {
          logSuccess('DNS record already points to correct IP');
          updated = true;
        }
      }
    }
    
    if (updated) {
      // Wait for propagation
      await waitForPropagation();
      
      // Verify the fix
      logStep('VERIFY', 'Running verification...');
      execSync('npm run dns:verify', { stdio: 'inherit' });
      
    } else {
      logError('Failed to update DNS records');
      process.exit(1);
    }
    
  } catch (error) {
    logError(`Script failed: ${error.message}`);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as fixCloudflareDNS };