#!/usr/bin/env node

/**
 * ECO-NAZCAMEDIA Translation Auto-Fix Script
 * Corrección automática de problemas de traducción
 */

const fs = require('fs');
const path = require('path');

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

class TranslationFixer {
  constructor() {
    this.srcPath = path.join(__dirname, '../src');
    this.translationsPath = path.join(this.srcPath, 'translations/index.ts');
    this.fixesApplied = 0;
  }

  async run() {
    log.header('ECO-NAZCAMEDIA Translation Auto-Fix Started');
    
    try {
      await this.ensureTranslationKeys();
      await this.fixComponentImports();
      await this.validateAllComponents();
      await this.optimizeTranslationFile();
      
      log.success(`Translation fixes completed. Applied ${this.fixesApplied} fixes.`);
    } catch (error) {
      log.error(`Fix process failed: ${error.message}`);
      process.exit(1);
    }
  }

  async ensureTranslationKeys() {
    log.info('Ensuring all required translation keys exist...');
    
    const translationContent = fs.readFileSync(this.translationsPath, 'utf8');
    
    // Check if nav keys are properly defined
    if (!translationContent.includes('nav: {')) {
      log.error('Nav section not found in translations');
      return;
    }

    // Verify specific keys exist
    const requiredKeys = [
      { key: 'nav.home', section: 'nav', property: 'home' },
      { key: 'nav.products', section: 'nav', property: 'products' },
      { key: 'nav.about', section: 'nav', property: 'about' },
      { key: 'nav.contact', section: 'nav', property: 'contact' }
    ];

    for (const keyInfo of requiredKeys) {
      if (!this.checkKeyExists(translationContent, keyInfo)) {
        log.warning(`Key ${keyInfo.key} might be missing or malformed`);
      } else {
        log.success(`Key ${keyInfo.key} exists`);
      }
    }
  }

  checkKeyExists(content, keyInfo) {
    const sectionRegex = new RegExp(`${keyInfo.section}:\s*\{[^}]*${keyInfo.property}:\s*\{`, 's');
    return sectionRegex.test(content);
  }

  async fixComponentImports() {
    log.info('Checking and fixing component imports...');
    
    const componentFiles = this.getComponentFiles();
    
    for (const file of componentFiles) {
      await this.fixFileImports(file);
    }
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
        } else if ((item.endsWith('.tsx') || item.endsWith('.ts')) && !item.endsWith('.test.tsx') && !item.endsWith('.test.ts')) {
          files.push(fullPath);
        }
      }
    };
    
    scanDir(this.srcPath);
    return files;
  }

  async fixFileImports(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(this.srcPath, filePath);
    
    // Check if file uses translation functions
    const usesTranslation = /\bt\(['"`]/.test(content) || 
                           /getTranslation\(/.test(content) ||
                           /getCategoryTranslation\(/.test(content) ||
                           /getProductTranslation\(/.test(content);
    
    if (!usesTranslation) {
      return; // No translation usage, skip
    }

    // Check if useLanguage is imported
    const hasUseLanguageImport = /import.*useLanguage.*from.*LanguageContext/.test(content);
    
    if (!hasUseLanguageImport) {
      log.warning(`${relativePath}: Uses translations but missing useLanguage import`);
      
      // Add import if missing
      const importLine = "import { useLanguage } from '../contexts/LanguageContext';";
      
      // Find the right place to add import
      const lines = content.split('\n');
      let importIndex = 0;
      
      // Find last import statement
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('import ')) {
          importIndex = i + 1;
        } else if (lines[i].trim() === '' && importIndex > 0) {
          break;
        }
      }
      
      lines.splice(importIndex, 0, importLine);
      const newContent = lines.join('\n');
      
      fs.writeFileSync(filePath, newContent, 'utf8');
      log.success(`${relativePath}: Added useLanguage import`);
      this.fixesApplied++;
    }

    // Check if useLanguage hook is used
    const usesUseLanguageHook = /const\s+\{[^}]*t[^}]*\}\s*=\s*useLanguage\(\)/.test(content);
    
    if (!usesUseLanguageHook && usesTranslation) {
      log.warning(`${relativePath}: Uses translations but doesn't destructure t from useLanguage`);
      // This would require more complex AST manipulation to fix automatically
    }
  }

  async validateAllComponents() {
    log.info('Validating all components for proper translation usage...');
    
    const componentFiles = this.getComponentFiles();
    let validComponents = 0;
    let issueComponents = 0;
    
    for (const file of componentFiles) {
      const isValid = await this.validateComponent(file);
      if (isValid) {
        validComponents++;
      } else {
        issueComponents++;
      }
    }
    
    log.info(`Validation complete: ${validComponents} valid, ${issueComponents} with issues`);
  }

  async validateComponent(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(this.srcPath, filePath);
    
    // Check for common issues
    const issues = [];
    
    // Check for hardcoded translation keys
    const hardcodedKeys = content.match(/>[^<{]*\b(nav\.|products\.|header\.|breadcrumbs\.)\w+[^<}]*</g);
    if (hardcodedKeys) {
      issues.push(`Potential hardcoded translation keys: ${hardcodedKeys.join(', ')}`);
    }
    
    // Check for missing t() wrapper
    const possibleKeys = content.match(/['"`](nav\.|products\.|header\.|breadcrumbs\.)\w+['"`]/g);
    if (possibleKeys) {
      for (const key of possibleKeys) {
        const cleanKey = key.replace(/['"`]/g, '');
        const isWrappedInT = new RegExp(`t\(['"`]${cleanKey.replace(/\./g, '\\.')}['"`]\)`).test(content);
        if (!isWrappedInT) {
          issues.push(`Key ${cleanKey} might not be wrapped in t()`);
        }
      }
    }
    
    if (issues.length > 0) {
      log.warning(`${relativePath}:`);
      issues.forEach(issue => log.warning(`  - ${issue}`));
      return false;
    }
    
    return true;
  }

  async optimizeTranslationFile() {
    log.info('Optimizing translation file structure...');
    
    const content = fs.readFileSync(this.translationsPath, 'utf8');
    
    // Check for proper formatting and structure
    if (!content.includes('export const translations = {')) {
      log.error('Translation file structure is invalid');
      return;
    }
    
    // Verify all sections are properly closed
    const openBraces = (content.match(/\{/g) || []).length;
    const closeBraces = (content.match(/\}/g) || []).length;
    
    if (openBraces !== closeBraces) {
      log.error(`Translation file has mismatched braces: ${openBraces} open, ${closeBraces} close`);
    } else {
      log.success('Translation file structure is valid');
    }
  }
}

// Run the fixer
if (require.main === module) {
  const fixer = new TranslationFixer();
  fixer.run().catch(error => {
    log.error(`Script failed: ${error.message}`);
    process.exit(1);
  });
}

module.exports = TranslationFixer;