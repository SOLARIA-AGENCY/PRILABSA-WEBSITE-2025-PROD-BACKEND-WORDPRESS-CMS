#!/usr/bin/env node

/**
 * WordPress API Connection Test
 * Tests connectivity to WordPress REST API at productos.prilabsa.com
 */

import https from 'https';
import http from 'http';

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

function makeRequest(url, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const req = protocol.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.setTimeout(timeout);
  });
}

async function testWordPressAPI() {
  const baseUrl = 'https://productos.prilabsa.com';
  
  log('\n🔗 WordPress API Connection Test', 'bright');
  log('==================================\n', 'bright');
  
  const endpoints = [
    { name: 'WordPress Root', path: '/' },
    { name: 'WordPress API Base', path: '/wp-json' },
    { name: 'WordPress API v2', path: '/wp-json/wp/v2' },
    { name: 'Posts API', path: '/wp-json/wp/v2/posts?per_page=1' },
    { name: 'Pages API', path: '/wp-json/wp/v2/pages?per_page=1' },
    { name: 'PRILABSA API v1', path: '/wp-json/prilabsa/v1/productos/stats' },
    { name: 'PRILABSA Productos', path: '/wp-json/prilabsa/v1/productos?per_page=1' }
  ];
  
  const results = [];
  
  for (const endpoint of endpoints) {
    logStep('TESTING', `${endpoint.name}: ${baseUrl}${endpoint.path}`);
    
    try {
      const response = await makeRequest(`${baseUrl}${endpoint.path}`);
      
      if (response.statusCode === 200) {
        logSuccess(`${endpoint.name}: ${response.statusCode} OK`);
        
        // Try to parse JSON for API endpoints
        if (endpoint.path.includes('/wp-json')) {
          try {
            const jsonData = JSON.parse(response.data);
            if (jsonData && typeof jsonData === 'object') {
              logSuccess(`   JSON response valid: ${Object.keys(jsonData).length} fields`);
            }
          } catch (jsonError) {
            logWarning(`   JSON parsing failed: ${jsonError.message}`);
          }
        }
        
        results.push({
          name: endpoint.name,
          path: endpoint.path,
          status: 'success',
          statusCode: response.statusCode,
          headers: response.headers
        });
      } else if (response.statusCode === 401) {
        logWarning(`${endpoint.name}: ${response.statusCode} Authentication required`);
        results.push({
          name: endpoint.name,
          path: endpoint.path,
          status: 'auth_required',
          statusCode: response.statusCode
        });
      } else if (response.statusCode === 403) {
        logWarning(`${endpoint.name}: ${response.statusCode} Access forbidden`);
        results.push({
          name: endpoint.name,
          path: endpoint.path,
          status: 'forbidden',
          statusCode: response.statusCode
        });
      } else if (response.statusCode === 404) {
        logError(`${endpoint.name}: ${response.statusCode} Not found`);
        results.push({
          name: endpoint.name,
          path: endpoint.path,
          status: 'not_found',
          statusCode: response.statusCode
        });
      } else {
        logWarning(`${endpoint.name}: ${response.statusCode} Unknown status`);
        results.push({
          name: endpoint.name,
          path: endpoint.path,
          status: 'unknown',
          statusCode: response.statusCode
        });
      }
    } catch (error) {
      logError(`${endpoint.name}: Connection failed - ${error.message}`);
      results.push({
        name: endpoint.name,
        path: endpoint.path,
        status: 'error',
        error: error.message
      });
    }
  }
  
  // Summary
  log('\n📊 Test Results Summary', 'bright');
  log('========================\n', 'bright');
  
  const success = results.filter(r => r.status === 'success').length;
  const authRequired = results.filter(r => r.status === 'auth_required').length;
  const forbidden = results.filter(r => r.status === 'forbidden').length;
  const notFound = results.filter(r => r.status === 'not_found').length;
  const errors = results.filter(r => r.status === 'error').length;
  
  log(`✅ Successful: ${success}`, 'green');
  log(`🔐 Auth Required: ${authRequired}`, 'yellow');
  log(`🚫 Forbidden: ${forbidden}`, 'yellow');
  log(`❌ Not Found: ${notFound}`, 'red');
  log(`💥 Connection Errors: ${errors}`, 'red');
  
  // WordPress Status Assessment
  log('\n🔍 WordPress Status Assessment', 'bright');
  log('===============================\n', 'bright');
  
  if (success >= 3) {
    logSuccess('WordPress API is accessible and functional');
  } else if (authRequired > 0) {
    logWarning('WordPress API requires authentication (normal for private endpoints)');
  } else if (forbidden > 0) {
    logWarning('WordPress API is accessible but restricted (403 responses)');
  } else {
    logError('WordPress API appears to be down or misconfigured');
  }
  
  // Recommendations
  log('\n💡 Recommendations', 'bright');
  log('==================\n', 'bright');
  
  if (notFound > 2) {
    log('• WordPress REST API may not be enabled', 'yellow');
    log('• Check WordPress permalinks settings', 'yellow');
    log('• Verify plugins are installed and activated', 'yellow');
  }
  
  if (forbidden > 0) {
    log('• Server may have security restrictions', 'yellow');
    log('• Check .htaccess file for API restrictions', 'yellow');
    log('• Verify CORS settings if accessing from frontend', 'yellow');
  }
  
  if (success >= 1) {
    logSuccess('WordPress is installed and responding');
    log('• Ready for PRILABSA plugin installation', 'green');
    log('• Can proceed with frontend configuration', 'green');
  }
  
  return results;
}

async function main() {
  try {
    await testWordPressAPI();
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

export { testWordPressAPI };