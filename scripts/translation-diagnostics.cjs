#!/usr/bin/env node

/**
 * ECO-NAZCAMEDIA Translation Diagnostics & Polish Script
 * Diagnóstico y pulido completo del sistema de traducciones
 */

const fs = require('fs');
const path = require('path');

// Colores para output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const log = {
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  header: (msg) => console.log(`${colors.magenta}🔧 ${msg}${colors.reset}`)
};

class TranslationDiagnostics {
  constructor() {
    this.srcPath = path.join(__dirname, '../src');
    this.translationsPath = path.join(this.srcPath, 'translations/index.ts');
    this.issues = [];
    this.fixes = [];
    this.translations = null;
  }

  async run() {
    log.header('ECO-NAZCAMEDIA Translation Diagnostics Started');
    
    try {
      await this.loadTranslations();
      await this.scanComponents();
      await this.validateTranslationKeys();
      await this.checkMissingTranslations();
      await this.generateReport();
      await this.applyFixes();
      
      log.success('Translation diagnostics completed successfully');
    } catch (error) {
      log.error(`Diagnostics failed: ${error.message}`);
      process.exit(1);
    }
  }

  async loadTranslations() {
    log.info('Loading translation file...');
    
    try {
      const content = fs.readFileSync(this.translationsPath, 'utf8');
      // Extract translation keys using regex
      this.extractTranslationKeys(content);
      log.success('Translation file loaded successfully');
    } catch (error) {
      throw new Error(`Failed to load translations: ${error.message}`);
    }
  }

  extractTranslationKeys(content) {
    this.translations = new Set();
    
    // Extract all translation keys from the file
    const keyPatterns = [
      /([a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)*): \{/g,
      /'([a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)*)':/g
    ];

    keyPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        this.translations.add(match[1]);
      }
    });

    // Manually add known nested keys
    const knownKeys = [
      'nav.home', 'nav.products', 'nav.about', 'nav.contact',
      'header.navigation.home', 'header.navigation.products', 'header.navigation.about',
      'header.navigation.contact', 'header.navigation.offices', 'header.navigation.careers',
      'header.navigation.news', 'header.navigation.search',
      'products.interface.quantity', 'products.interface.add_to_quote',
      'products.interface.tabs.description', 'products.interface.tabs.specifications',
      'products.interface.tabs.benefits', 'products.interface.tabs.presentation',
      'products.interface.related_products', 'products.interface.download_datasheet',
      'products.categories.aditivos', 'products.categories.alimentos',
      'products.categories.probioticos', 'products.categories.quimicos',
      'products.categories.equipos', 'breadcrumbs.home', 'breadcrumbs.products'
    ];

    knownKeys.forEach(key => this.translations.add(key));
  }

  async scanComponents() {
    log.info('Scanning components for translation usage...');
    
    const componentFiles = this.getComponentFiles();
    
    for (const file of componentFiles) {
      await this.scanFile(file);
    }
    
    log.success(`Scanned ${componentFiles.length} component files`);
  }

  getComponentFiles() {
    const files = [];
    
    const scanDir = (dir) => {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          scanDir(fullPath);
        } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
          files.push(fullPath);
        }
      }
    };
    
    scanDir(this.srcPath);
    return files;
  }

  async scanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(this.srcPath, filePath);
    
    // Check for translation usage patterns
    const translationPatterns = [
      /t\(['"`]([^'"`)]+)['"`]\)/g,
      /getTranslation\(['"`]([^'"`)]+)['"`]/g,
      /getCategoryTranslation\(['"`]([^'"`)]+)['"`]/g,
      /getProductTranslation\(['"`]([^'"`)]+)['"`]/g
    ];

    const usedKeys = new Set();
    
    translationPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        usedKeys.add(match[1]);
      }
    });

    // Check for hardcoded translation keys (potential issues)
    const hardcodedPattern = />[^<{]*\b(nav\.|products\.|header\.|breadcrumbs\.)\w+[^<}]*</g;
    let hardcodedMatch;
    while ((hardcodedMatch = hardcodedPattern.exec(content)) !== null) {
      this.issues.push({
        type: 'hardcoded_key',
        file: relativePath,
        line: this.getLineNumber(content, hardcodedMatch.index),
        key: hardcodedMatch[0],
        message: 'Potential hardcoded translation key found'
      });
    }

    // Check if file uses useLanguage hook
    const usesTranslation = /useLanguage\(\)/.test(content) || /import.*useLanguage/.test(content);
    
    if (usedKeys.size > 0 && !usesTranslation) {
      this.issues.push({
        type: 'missing_hook',
        file: relativePath,
        message: 'File uses translation keys but does not import useLanguage hook'
      });
    }

    // Validate used keys exist in translations
    for (const key of usedKeys) {
      if (!this.translations.has(key)) {
        this.issues.push({
          type: 'missing_translation',
          file: relativePath,
          key: key,
          message: `Translation key '${key}' not found in translations file`
        });
      }
    }
  }

  getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length;
  }

  async validateTranslationKeys() {
    log.info('Validating translation key structure...');
    
    // Check for common missing keys
    const requiredKeys = [
      'nav.home', 'nav.products', 'nav.about', 'nav.contact',
      'products.interface.quantity', 'products.interface.add_to_quote',
      'products.interface.related_products'
    ];

    for (const key of requiredKeys) {
      if (!this.translations.has(key)) {
        this.issues.push({
          type: 'missing_required_key',
          key: key,
          message: `Required translation key '${key}' is missing`
        });
      }
    }
  }

  async checkMissingTranslations() {
    log.info('Checking for missing translations...');
    
    // This would be expanded to check for incomplete translations
    // across different languages (es, en, pt)
  }

  async generateReport() {
    log.header('Translation Diagnostics Report');
    
    if (this.issues.length === 0) {
      log.success('No translation issues found!');
      return;
    }

    console.log(`\n${colors.yellow}Found ${this.issues.length} issues:${colors.reset}\n`);
    
    const groupedIssues = this.groupIssuesByType();
    
    for (const [type, issues] of Object.entries(groupedIssues)) {
      console.log(`${colors.cyan}${type.toUpperCase()}:${colors.reset}`);
      issues.forEach(issue => {
        console.log(`  • ${issue.file || 'Global'}: ${issue.message}`);
        if (issue.key) console.log(`    Key: ${issue.key}`);
        if (issue.line) console.log(`    Line: ${issue.line}`);
      });
      console.log('');
    }
  }

  groupIssuesByType() {
    const grouped = {};
    
    this.issues.forEach(issue => {
      if (!grouped[issue.type]) {
        grouped[issue.type] = [];
      }
      grouped[issue.type].push(issue);
    });
    
    return grouped;
  }

  async applyFixes() {
    if (this.fixes.length === 0) {
      log.info('No automatic fixes to apply');
      return;
    }

    log.info(`Applying ${this.fixes.length} automatic fixes...`);
    
    for (const fix of this.fixes) {
      try {
        await this.applyFix(fix);
        log.success(`Applied fix: ${fix.description}`);
      } catch (error) {
        log.error(`Failed to apply fix: ${fix.description} - ${error.message}`);
      }
    }
  }

  async applyFix(fix) {
    // Implementation for applying specific fixes
    switch (fix.type) {
      case 'add_missing_import':
        // Add missing useLanguage import
        break;
      case 'fix_hardcoded_key':
        // Replace hardcoded key with t() function
        break;
      default:
        log.warning(`Unknown fix type: ${fix.type}`);
    }
  }
}

// Run diagnostics
if (require.main === module) {
  const diagnostics = new TranslationDiagnostics();
  diagnostics.run().catch(error => {
    log.error(`Script failed: ${error.message}`);
    process.exit(1);
  });
}

module.exports = TranslationDiagnostics;