#!/usr/bin/env node

/**
 * Translation Validation Script
 * Validates translation completeness and quality for PRILABSA products
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SUPPORTED_LANGUAGES = ['es', 'en', 'pt'];
const REQUIRED_FIELDS = ['name', 'description', 'benefits', 'specifications'];
const TRANSLATION_FILES_PATH = 'src/data/products';
const CATALOG_FILE = 'MODULO PRODUCTOS PRILABSA CATALOGO JULIO 2025/PRILABSA_CATALOGO_WEB_2025.json';

class TranslationValidator {
  constructor() {
    this.results = {
      total_products: 0,
      translated_products: {},
      missing_translations: {},
      quality_issues: [],
      completeness_score: 0
    };
    
    // Initialize language tracking
    SUPPORTED_LANGUAGES.forEach(lang => {
      this.results.translated_products[lang] = 0;
      this.results.missing_translations[lang] = [];
    });
  }

  /**
   * Load product catalog
   */
  loadProductCatalog() {
    try {
      const catalogPath = path.join(process.cwd(), CATALOG_FILE);
      const catalogData = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
      return catalogData.productos || [];
    } catch (error) {
      console.error('❌ Error loading product catalog:', error.message);
      process.exit(1);
    }
  }

  /**
   * Load existing translations
   */
  loadTranslations() {
    try {
      const translationsPath = path.join(process.cwd(), 'src/data/products/product-translations.ts');
      
      if (!fs.existsSync(translationsPath)) {
        console.warn('⚠️  Translation file not found, assuming no translations exist');
        return {};
      }

      // Basic parsing of TypeScript file (simplified)
      const content = fs.readFileSync(translationsPath, 'utf8');
      const match = content.match(/export const productTranslations[^=]*=\s*({[\s\S]*?});/);
      
      if (!match) {
        console.warn('⚠️  Could not parse translation file');
        return {};
      }

      // This is a simplified parser - in production, use a proper TypeScript parser
      return this.parseTranslationObject(match[1]);
    } catch (error) {
      console.error('❌ Error loading translations:', error.message);
      return {};
    }
  }

  /**
   * Simple translation object parser (for demonstration)
   */
  parseTranslationObject(objString) {
    // This is a simplified implementation
    // In production, use @babel/parser or similar
    try {
      // Clean the object string more thoroughly
      let cleanString = objString
        // Remove comments
        .replace(/\/\/.*$/gm, '')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Quote unquoted keys (handle object keys)
        .replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":')
        // Handle escaped single quotes properly
        .replace(/\\'/g, "\\'")
        // Convert single quotes to double quotes (but not escaped ones)
        .replace(/(?<!\\)'/g, '"')
        // Remove trailing commas
        .replace(/,(\s*[}\]])/g, '$1')
        // Clean up whitespace
        .trim();
      
      return JSON.parse(cleanString);
    } catch (error) {
      console.warn('⚠️  Could not parse translation object, using empty object');
      console.warn('Parser error:', error.message);
      return {};
    }
  }

  /**
   * Validate single product translation
   */
  validateProductTranslation(productId, translations) {
    const issues = [];
    
    SUPPORTED_LANGUAGES.forEach(lang => {
      if (!translations[lang]) {
        this.results.missing_translations[lang].push(productId);
        return;
      }

      this.results.translated_products[lang]++;

      // Check required fields
      REQUIRED_FIELDS.forEach(field => {
        if (!translations[lang][field] || 
            (Array.isArray(translations[lang][field]) && translations[lang][field].length === 0)) {
          issues.push({
            productId,
            language: lang,
            field,
            issue: 'Missing or empty required field'
          });
        }
      });

      // Check for untranslated content (contains Spanish words in EN/PT)
      if (lang !== 'es') {
        const spanishWords = ['producto', 'para', 'con', 'que', 'del', 'una', 'por'];
        const description = translations[lang].description || '';
        
        spanishWords.forEach(word => {
          if (description.toLowerCase().includes(word.toLowerCase())) {
            issues.push({
              productId,
              language: lang,
              field: 'description',
              issue: `Possible untranslated Spanish word: "${word}"`
            });
          }
        });
      }
    });

    return issues;
  }

  /**
   * Run complete validation
   */
  async validate() {
    console.log('🔍 Starting PRILABSA Translation Validation...\n');

    // Load data
    const products = this.loadProductCatalog();
    const translations = this.loadTranslations();
    
    this.results.total_products = products.length;

    console.log(`📊 Found ${products.length} products in catalog`);
    console.log(`📝 Found ${Object.keys(translations).length} products with translations\n`);

    // Validate each product  
    products.forEach(product => {
      const productId = product.codigo;
      
      if (translations[productId]) {
        const issues = this.validateProductTranslation(productId, translations[productId]);
        this.results.quality_issues.push(...issues);
      } else {
        // Product has no translations at all
        SUPPORTED_LANGUAGES.slice(1).forEach(lang => { // Skip 'es' as it's always available
          this.results.missing_translations[lang].push(productId);
        });
      }
    });

    // Calculate completeness score
    this.calculateCompletenessScore();

    // Generate report
    this.generateReport();
  }

  /**
   * Calculate overall completeness score
   */
  calculateCompletenessScore() {
    const totalPossibleTranslations = this.results.total_products * (SUPPORTED_LANGUAGES.length - 1); // Exclude Spanish
    const actualTranslations = this.results.translated_products.en + this.results.translated_products.pt;
    
    this.results.completeness_score = Math.round((actualTranslations / totalPossibleTranslations) * 100);
  }

  /**
   * Generate validation report
   */
  generateReport() {
    console.log('📋 PRILABSA TRANSLATION VALIDATION REPORT');
    console.log('=' .repeat(50));
    
    // Overview
    console.log(`\n📊 OVERVIEW:`);
    console.log(`Total Products: ${this.results.total_products}`);
    console.log(`Completeness Score: ${this.results.completeness_score}%`);
    
    // Language-specific statistics
    console.log(`\n🌐 LANGUAGE COVERAGE:`);
    SUPPORTED_LANGUAGES.forEach(lang => {
      const translated = this.results.translated_products[lang] || this.results.total_products; // Spanish always 100%
      const percentage = Math.round((translated / this.results.total_products) * 100);
      const flag = lang === 'es' ? '🇪🇸' : lang === 'en' ? '🇺🇸' : '🇧🇷';
      
      console.log(`${flag} ${lang.toUpperCase()}: ${translated}/${this.results.total_products} (${percentage}%)`);
    });

    // Missing translations
    console.log(`\n❌ MISSING TRANSLATIONS:`);
    ['en', 'pt'].forEach(lang => {
      const missing = this.results.missing_translations[lang];
      if (missing.length > 0) {
        console.log(`\n${lang.toUpperCase()} - ${missing.length} products missing:`);
        missing.slice(0, 10).forEach(productId => {
          console.log(`  • ${productId}`);
        });
        if (missing.length > 10) {
          console.log(`  ... and ${missing.length - 10} more`);
        }
      }
    });

    // Quality issues
    if (this.results.quality_issues.length > 0) {
      console.log(`\n⚠️  QUALITY ISSUES (${this.results.quality_issues.length} total):`);
      this.results.quality_issues.slice(0, 20).forEach(issue => {
        console.log(`  • ${issue.productId} (${issue.language}): ${issue.issue}`);
      });
      if (this.results.quality_issues.length > 20) {
        console.log(`  ... and ${this.results.quality_issues.length - 20} more issues`);
      }
    }

    // Recommendations
    console.log(`\n💡 RECOMMENDATIONS:`);
    
    if (this.results.completeness_score < 25) {
      console.log(`  🚀 Priority: Start with Phase 2A - Translate priority products first`);
      console.log(`  📝 Focus: ${this.results.missing_translations.en.slice(0, 5).join(', ')}`);
    } else if (this.results.completeness_score < 75) {
      console.log(`  ⚡ Continue: Proceed with batch translation for remaining products`);
      console.log(`  🎯 Target: Complete ${Math.min(20, this.results.missing_translations.en.length)} products this week`);
    } else {
      console.log(`  ✨ Excellent progress! Focus on quality review and refinement`);
      console.log(`  🔍 Priority: Review quality issues and improve translation accuracy`);
    }

    // Save detailed report
    this.saveDetailedReport();
    
    console.log(`\n📁 Detailed report saved to: translation-validation-report.json`);
    console.log(`\n✅ Validation complete!`);
  }

  /**
   * Save detailed JSON report
   */
  saveDetailedReport() {
    const reportPath = path.join(process.cwd(), 'translation-validation-report.json');
    const detailedReport = {
      timestamp: new Date().toISOString(),
      summary: {
        total_products: this.results.total_products,
        completeness_score: this.results.completeness_score,
        quality_issues_count: this.results.quality_issues.length
      },
      language_coverage: this.results.translated_products,
      missing_translations: this.results.missing_translations,
      quality_issues: this.results.quality_issues,
      recommendations: this.generateRecommendations()
    };

    fs.writeFileSync(reportPath, JSON.stringify(detailedReport, null, 2));
  }

  /**
   * Generate actionable recommendations
   */
  generateRecommendations() {
    const recommendations = [];
    
    if (this.results.completeness_score < 25) {
      recommendations.push({
        priority: 'high',
        action: 'start_priority_translations',
        description: 'Begin with Phase 2A: Translate 10 priority products',
        products: this.results.missing_translations.en.slice(0, 10)
      });
    }

    if (this.results.quality_issues.length > 0) {
      recommendations.push({
        priority: 'medium',
        action: 'quality_review',
        description: 'Review and fix quality issues in existing translations',
        issues: this.results.quality_issues.length
      });
    }

    return recommendations;
  }
}

// Run validation if called directly
if (require.main === module) {
  const validator = new TranslationValidator();
  validator.validate().catch(console.error);
}

module.exports = TranslationValidator;