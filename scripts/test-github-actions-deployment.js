#!/usr/bin/env node

/**
 * PRILABSA GitHub Actions Deployment Test Script
 * 
 * Validates the complete CI/CD pipeline for PRILABSA website
 * Tests FTP connection, secrets configuration, and deployment readiness
 * 
 * USAGE:
 *   npm run test:deployment
 *   node scripts/test-github-actions-deployment.js
 * 
 * ECO-NAZCAMEDIA - STEALTH MODE ACTIVE
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { Client } from 'basic-ftp';

// ANSI Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

const header = (title) => {
  log(`\n${colors.bold}${colors.cyan}🚀 ${title}${colors.reset}`);
  log(`${colors.cyan}${'='.repeat(60)}${colors.reset}`);
};

class DeploymentTester {
  constructor() {
    this.results = {
      total: 0,
      passed: 0,
      failed: 0,
      warnings: 0
    };
    this.ftpConfig = null;
  }

  async run() {
    header('PRILABSA DEPLOYMENT TEST SUITE');
    
    try {
      await this.loadConfiguration();
      await this.testProjectStructure();
      await this.testFTPConfiguration();
      await this.testFTPConnection();
      await this.testBuildProcess();
      await this.testSecretsRequirements();
      await this.generateReport();
      
    } catch (error) {
      log(`❌ Critical error: ${error.message}`, 'red');
      process.exit(1);
    }
  }

  async loadConfiguration() {
    header('Loading Configuration');
    
    const configPath = '.ftpconfig.json';
    
    if (!existsSync(configPath)) {
      this.fail('FTP config file not found');
      return;
    }
    
    try {
      this.ftpConfig = JSON.parse(readFileSync(configPath, 'utf8'));
      this.pass('FTP configuration loaded successfully');
    } catch (error) {
      this.fail(`Invalid FTP config: ${error.message}`);
    }
  }

  async testProjectStructure() {
    header('Testing Project Structure');
    
    const requiredFiles = [
      'package.json',
      'vite.config.ts',
      'src/main.tsx',
      '.github/workflows/deploy-blog.yml',
      'tailwind.config.cjs'
    ];
    
    const requiredDirs = [
      'src',
      'public',
      'src/components',
      'src/pages',
      '.github/workflows'
    ];
    
    // Test required files
    for (const file of requiredFiles) {
      if (existsSync(file)) {
        this.pass(`Required file exists: ${file}`);
      } else {
        this.fail(`Missing required file: ${file}`);
      }
    }
    
    // Test required directories
    for (const dir of requiredDirs) {
      if (existsSync(dir)) {
        this.pass(`Required directory exists: ${dir}`);
      } else {
        this.fail(`Missing required directory: ${dir}`);
      }
    }
    
    // Test package.json scripts
    try {
      const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
      const requiredScripts = ['build', 'test:run', 'type-check', 'lint'];
      
      for (const script of requiredScripts) {
        if (packageJson.scripts && packageJson.scripts[script]) {
          this.pass(`Build script exists: ${script}`);
        } else {
          this.fail(`Missing build script: ${script}`);
        }
      }
    } catch (error) {
      this.fail(`Cannot parse package.json: ${error.message}`);
    }
  }

  async testFTPConfiguration() {
    header('Testing FTP Configuration');
    
    if (!this.ftpConfig) {
      this.fail('FTP config not loaded');
      return;
    }
    
    const requiredFields = ['host', 'user', 'password', 'port'];
    
    for (const field of requiredFields) {
      if (this.ftpConfig[field]) {
        this.pass(`FTP config has ${field}`);
      } else {
        this.fail(`Missing FTP config field: ${field}`);
      }
    }
    
    // Validate configuration values
    if (this.ftpConfig.host === '148.72.1.187') {
      this.pass('FTP host matches expected GoDaddy server');
    } else {
      this.warn(`Unexpected FTP host: ${this.ftpConfig.host}`);
    }
    
    if (this.ftpConfig.user && this.ftpConfig.user.includes('blog.prilabsa.com')) {
      this.pass('FTP user format is correct for blog subdomain');
    } else {
      this.warn('FTP user format may be incorrect');
    }
    
    if (this.ftpConfig.port === 21) {
      this.pass('FTP port is standard (21)');
    } else {
      this.warn(`Non-standard FTP port: ${this.ftpConfig.port}`);
    }
  }

  async testFTPConnection() {
    header('Testing FTP Connection');
    
    if (!this.ftpConfig) {
      this.fail('Cannot test FTP - no configuration');
      return;
    }
    
    const client = new Client();
    client.ftp.verbose = false;
    
    try {
      log('🔌 Attempting FTP connection...', 'blue');
      
      await client.access({
        host: this.ftpConfig.host,
        user: this.ftpConfig.user,
        password: this.ftpConfig.password,
        port: this.ftpConfig.port || 21,
        secure: false
      });
      
      this.pass('FTP connection established successfully');
      
      // Test directory access
      const testDirs = [
        '/public_html/blog',
        '/public_html/blog.prilabsa.com',
        '/domains/blog.prilabsa.com/public_html'
      ];
      
      for (const dir of testDirs) {
        try {
          await client.cd(dir);
          this.pass(`Can access directory: ${dir}`);
          await client.cd('/');
        } catch (error) {
          this.warn(`Cannot access directory ${dir}: ${error.message}`);
        }
      }
      
      client.close();
      
    } catch (error) {
      this.fail(`FTP connection failed: ${error.message}`);
      log('💡 This may indicate:', 'yellow');
      log('  - Incorrect credentials in .ftpconfig.json', 'yellow');
      log('  - Network connectivity issues', 'yellow');
      log('  - GoDaddy hosting restrictions', 'yellow');
    }
  }

  async testBuildProcess() {
    header('Testing Build Process');
    
    const { spawn } = await import('child_process');
    
    return new Promise((resolve) => {
      log('🔨 Running npm run build:fast...', 'blue');
      
      const buildProcess = spawn('npm', ['run', 'build:fast'], {
        stdio: ['inherit', 'pipe', 'pipe']
      });
      
      let buildOutput = '';
      let buildError = '';
      
      buildProcess.stdout.on('data', (data) => {
        buildOutput += data.toString();
      });
      
      buildProcess.stderr.on('data', (data) => {
        buildError += data.toString();
      });
      
      const timeout = setTimeout(() => {
        buildProcess.kill();
        this.fail('Build process timed out (120s)');
        resolve();
      }, 120000); // 2 minutes timeout
      
      buildProcess.on('close', (code) => {
        clearTimeout(timeout);
        
        if (code === 0) {
          this.pass('Build completed successfully');
          
          // Check if dist directory exists
          if (existsSync('dist')) {
            this.pass('dist directory created');
            
            if (existsSync('dist/index.html')) {
              this.pass('index.html exists in dist');
            } else {
              this.fail('index.html missing in dist');
            }
            
            if (existsSync('dist/assets')) {
              this.pass('Assets directory exists in dist');
            } else {
              this.warn('No assets directory found in dist');
            }
          } else {
            this.fail('dist directory not created');
          }
        } else {
          this.fail(`Build failed with code ${code}`);
          if (buildError) {
            log(`Build errors: ${buildError.slice(0, 500)}...`, 'red');
          }
        }
        
        resolve();
      });
    });
  }

  async testSecretsRequirements() {
    header('Testing Secrets Requirements');
    
    const requiredSecrets = [
      'FTP_HOST',
      'FTP_USERNAME', 
      'FTP_PASSWORD'
    ];
    
    log('📋 Required GitHub Secrets:', 'blue');
    requiredSecrets.forEach(secret => {
      log(`  • ${secret}`, 'cyan');
    });
    
    // Compare with .ftpconfig.json values
    if (this.ftpConfig) {
      log('\n🔍 Expected values from .ftpconfig.json:', 'blue');
      log(`  • FTP_HOST: "${this.ftpConfig.host}"`, 'cyan');
      log(`  • FTP_USERNAME: "${this.ftpConfig.user}"`, 'cyan');
      log(`  • FTP_PASSWORD: "${this.ftpConfig.password}"`, 'cyan');
    }
    
    this.pass('Secrets requirements documented');
  }

  async generateReport() {
    header('DEPLOYMENT TEST REPORT');
    
    const total = this.results.total;
    const passed = this.results.passed;
    const failed = this.results.failed;
    const warnings = this.results.warnings;
    const successRate = total > 0 ? Math.round((passed / total) * 100) : 0;
    
    log(`\n📊 TEST RESULTS:`, 'bold');
    log(`  ✅ Passed: ${passed}/${total} (${successRate}%)`, 'green');
    log(`  ❌ Failed: ${failed}/${total}`, failed > 0 ? 'red' : 'green');
    log(`  ⚠️  Warnings: ${warnings}`, warnings > 0 ? 'yellow' : 'green');
    
    if (failed === 0) {
      log('\n🎉 DEPLOYMENT READY!', 'green');
      log('  Your GitHub Actions workflow should work correctly.', 'green');
      log('  Next steps:', 'blue');
      log('  1. Configure GitHub Secrets as documented', 'cyan');
      log('  2. Push to main branch to trigger deployment', 'cyan');
      log('  3. Monitor workflow in Actions tab', 'cyan');
    } else {
      log('\n⚠️  DEPLOYMENT NOT READY', 'red');
      log('  Please fix the failed tests before deploying.', 'red');
      log('  Check the specific error messages above.', 'yellow');
    }
    
    if (warnings > 0) {
      log('\n💡 WARNINGS DETECTED', 'yellow');
      log('  Review warnings - they may not block deployment.', 'yellow');
    }
    
    log('\n📚 Resources:', 'blue');
    log('  • GitHub Secrets Guide: docs/GITHUB_SECRETS_CONFIGURATION_GUIDE.md', 'cyan');
    log('  • Workflow Architecture: .github/WORKFLOWS_ARCHITECTURE.md', 'cyan');
    
    return failed === 0;
  }

  pass(message) {
    this.results.total++;
    this.results.passed++;
    log(`✅ ${message}`, 'green');
  }

  fail(message) {
    this.results.total++;
    this.results.failed++;
    log(`❌ ${message}`, 'red');
  }

  warn(message) {
    this.results.warnings++;
    log(`⚠️  ${message}`, 'yellow');
  }
}

// Run the test suite
if (import.meta.url === `file://${process.argv[1]}`) {
  const tester = new DeploymentTester();
  tester.run().catch(console.error);
}

export default DeploymentTester;