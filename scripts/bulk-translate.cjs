#!/usr/bin/env node

/**
 * Bulk Translation Script
 * Generates translations for remaining PRILABSA products
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CATALOG_FILE = 'MODULO PRODUCTOS PRILABSA CATALOGO JULIO 2025/PRILABSA_CATALOGO_WEB_2025.json';
const TRANSLATIONS_FILE = 'src/data/products/product-translations.ts';
const BATCH_SIZE = 10; // Process products in batches

class BulkTranslator {
  constructor() {
    this.catalog = this.loadCatalog();
    this.existingTranslations = this.getExistingTranslations();
  }

  loadCatalog() {
    try {
      const catalogPath = path.join(process.cwd(), CATALOG_FILE);
      const catalogData = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
      return catalogData.productos || [];
    } catch (error) {
      console.error('❌ Error loading catalog:', error.message);
      process.exit(1);
    }
  }

  getExistingTranslations() {
    try {
      const content = fs.readFileSync(TRANSLATIONS_FILE, 'utf8');
      const match = content.match(/export const productTranslations[^=]*=\s*({[\s\S]*?});/);
      if (match) {
        // Simple parsing to get existing product IDs
        const productIds = [];
        const lines = match[1].split('\n');
        for (const line of lines) {
          const idMatch = line.match(/"([A-Z]+\d+)":\s*{/);
          if (idMatch) {
            productIds.push(idMatch[1]);
          }
        }
        return new Set(productIds);
      }
      return new Set();
    } catch (error) {
      console.warn('⚠️  Could not parse existing translations');
      return new Set();
    }
  }

  translateText(spanishText, targetLang) {
    // Simple translation mapping for common aquaculture terms
    const translations = {
      'en': {
        'camarones': 'shrimp',
        'peces': 'fish',
        'acuicultura': 'aquaculture',
        'laboratorio': 'laboratory',
        'alimento': 'feed',
        'producto': 'product',
        'tratamiento': 'treatment',
        'enfermedades': 'diseases',
        'bacterias': 'bacteria',
        'antibiótico': 'antibiotic',
        'desinfectante': 'disinfectant',
        'polvo': 'powder',
        'líquido': 'liquid',
        'especificaciones': 'specifications',
        'aplicación': 'application',
        'dosis': 'dose',
        'presentación': 'presentation',
        'beneficios': 'benefits',
        'kg': 'kg',
        'tonelada': 'ton',
        'galón': 'gallon',
        'lugar fresco y seco': 'cool and dry place',
        'fuera del alcance de los niños': 'out of reach of children',
        'amplio espectro': 'broad spectrum',
        'patógenos': 'pathogens',
        'supervivencia': 'survival',
        'mejora': 'improves',
        'efectivo': 'effective',
        'utilizado': 'used',
        'recomendado': 'recommended'
      },
      'pt': {
        'camarones': 'camarões',
        'peces': 'peixes',
        'acuicultura': 'aquicultura',
        'laboratorio': 'laboratório',
        'alimento': 'alimento',
        'producto': 'produto',
        'tratamiento': 'tratamento',
        'enfermedades': 'doenças',
        'bacterias': 'bactérias',
        'antibiótico': 'antibiótico',
        'desinfectante': 'desinfetante',
        'polvo': 'pó',
        'líquido': 'líquido',
        'especificaciones': 'especificações',
        'aplicación': 'aplicação',
        'dosis': 'dose',
        'presentación': 'apresentação',
        'beneficios': 'benefícios',
        'kg': 'kg',
        'tonelada': 'tonelada',
        'galón': 'galão',
        'lugar fresco y seco': 'local fresco e seco',
        'fuera del alcance de los niños': 'fora do alcance das crianças',
        'amplio espectro': 'amplo espectro',
        'patógenos': 'patógenos',
        'supervivencia': 'sobrevivência',
        'mejora': 'melhora',
        'efectivo': 'eficaz',
        'utilizado': 'utilizado',
        'recomendado': 'recomendado'
      }
    };

    let translatedText = spanishText;
    const langMap = translations[targetLang] || {};
    
    for (const [spanish, translated] of Object.entries(langMap)) {
      const regex = new RegExp(`\\b${spanish}\\b`, 'gi');
      translatedText = translatedText.replace(regex, translated);
    }

    return translatedText;
  }

  parseSpecifications(especificaciones) {
    if (!especificaciones) return [];
    
    const specs = [];
    const lines = especificaciones.split('\\n');
    
    for (const line of lines) {
      const match = line.match(/•\\s*([^:]+):\\s*(.+)/);
      if (match) {
        specs.push({
          key: match[1].trim(),
          value: match[2].trim()
        });
      }
    }
    
    return specs;
  }

  parseBenefits(beneficios) {
    if (!beneficios) return [];
    
    return beneficios.split('\\n')
      .map(benefit => benefit.replace(/^•\\s*/, '').trim())
      .filter(benefit => benefit.length > 0);
  }

  parsePresentation(presentacion) {
    if (!presentacion) return [];
    
    return presentacion.split('\\n')
      .map(pres => pres.replace(/^•\\s*/, '').trim())
      .filter(pres => pres.length > 0);
  }

  generateTranslation(product) {
    const specs = this.parseSpecifications(product.especificaciones);
    const benefits = this.parseBenefits(product.beneficios);
    const presentation = this.parsePresentation(product.presentacion);

    return {
      es: {
        name: product.nombre,
        description: product.descripcion,
        benefits: benefits,
        presentation: presentation,
        specifications: specs
      },
      en: {
        name: this.translateText(product.nombre, 'en'),
        description: this.translateText(product.descripcion, 'en'),
        benefits: benefits.map(b => this.translateText(b, 'en')),
        presentation: presentation.map(p => this.translateText(p, 'en')),
        specifications: specs.map(s => ({
          key: this.translateText(s.key, 'en'),
          value: this.translateText(s.value, 'en')
        }))
      },
      pt: {
        name: this.translateText(product.nombre, 'pt'),
        description: this.translateText(product.descripcion, 'pt'),
        benefits: benefits.map(b => this.translateText(b, 'pt')),
        presentation: presentation.map(p => this.translateText(p, 'pt')),
        specifications: specs.map(s => ({
          key: this.translateText(s.key, 'pt'),
          value: this.translateText(s.value, 'pt')
        }))
      }
    };
  }

  generateBatch(startIndex = 0, batchSize = BATCH_SIZE) {
    const pendingProducts = this.catalog.filter(product => 
      !this.existingTranslations.has(product.codigo)
    );

    console.log(`📊 Total pending products: ${pendingProducts.length}`);
    console.log(`📝 Processing batch starting at index ${startIndex}`);

    const batch = pendingProducts.slice(startIndex, startIndex + batchSize);
    const translations = {};

    for (const product of batch) {
      console.log(`🔄 Processing ${product.codigo} - ${product.nombre}`);
      translations[product.codigo] = this.generateTranslation(product);
    }

    return {
      translations,
      hasMore: startIndex + batchSize < pendingProducts.length,
      nextIndex: startIndex + batchSize,
      totalPending: pendingProducts.length
    };
  }

  formatTranslationCode(translations) {
    let code = '';
    
    for (const [productId, translation] of Object.entries(translations)) {
      const product = this.catalog.find(p => p.codigo === productId);
      
      code += `\n  // ${translation.es.name} - ${productId}\n`;
      code += `  "${productId}": {\n`;
      
      // Spanish
      code += `    es: {\n`;
      code += `      name: "${translation.es.name}",\n`;
      code += `      description: "${translation.es.description}",\n`;
      code += `      benefits: [\n`;
      translation.es.benefits.forEach(benefit => {
        code += `        "${benefit}",\n`;
      });
      code += `      ],\n`;
      code += `      presentation: [\n`;
      translation.es.presentation.forEach(pres => {
        code += `        "${pres}",\n`;
      });
      code += `      ],\n`;
      code += `      specifications: [\n`;
      translation.es.specifications.forEach(spec => {
        code += `        { key: "${spec.key}", value: "${spec.value}" },\n`;
      });
      code += `      ]\n`;
      code += `    },\n`;
      
      // English
      code += `    en: {\n`;
      code += `      name: "${translation.en.name}",\n`;
      code += `      description: "${translation.en.description}",\n`;
      code += `      benefits: [\n`;
      translation.en.benefits.forEach(benefit => {
        code += `        "${benefit}",\n`;
      });
      code += `      ],\n`;
      code += `      presentation: [\n`;
      translation.en.presentation.forEach(pres => {
        code += `        "${pres}",\n`;
      });
      code += `      ],\n`;
      code += `      specifications: [\n`;
      translation.en.specifications.forEach(spec => {
        code += `        { key: "${spec.key}", value: "${spec.value}" },\n`;
      });
      code += `      ]\n`;
      code += `    },\n`;
      
      // Portuguese
      code += `    pt: {\n`;
      code += `      name: "${translation.pt.name}",\n`;
      code += `      description: "${translation.pt.description}",\n`;
      code += `      benefits: [\n`;
      translation.pt.benefits.forEach(benefit => {
        code += `        "${benefit}",\n`;
      });
      code += `      ],\n`;
      code += `      presentation: [\n`;
      translation.pt.presentation.forEach(pres => {
        code += `        "${pres}",\n`;
      });
      code += `      ],\n`;
      code += `      specifications: [\n`;
      translation.pt.specifications.forEach(spec => {
        code += `        { key: "${spec.key}", value: "${spec.value}" },\n`;
      });
      code += `      ]\n`;
      code += `    }\n`;
      code += `  },`;
    }
    
    return code;
  }
}

// CLI Interface
const args = process.argv.slice(2);
const command = args[0] || 'batch';

const translator = new BulkTranslator();

switch (command) {
  case 'batch':
    const startIndex = parseInt(args[1]) || 0;
    const batchSize = parseInt(args[2]) || BATCH_SIZE;
    
    const result = translator.generateBatch(startIndex, batchSize);
    const code = translator.formatTranslationCode(result.translations);
    
    console.log('\\n📋 GENERATED TRANSLATION CODE:');
    console.log('=====================================');
    console.log(code);
    console.log('=====================================');
    console.log(`\\n📊 Status: ${Object.keys(result.translations).length} products processed`);
    console.log(`📝 Remaining: ${result.totalPending - startIndex - Object.keys(result.translations).length} products`);
    
    if (result.hasMore) {
      console.log(`🚀 Next batch: node scripts/bulk-translate.cjs batch ${result.nextIndex}`);
    } else {
      console.log('✅ All products processed!');
    }
    break;
    
  case 'count':
    const pending = translator.catalog.filter(p => !translator.existingTranslations.has(p.codigo));
    console.log(`📊 Existing translations: ${translator.existingTranslations.size}`);
    console.log(`📝 Pending translations: ${pending.length}`);
    console.log(`🎯 Total products: ${translator.catalog.length}`);
    break;
    
  default:
    console.log('📖 Usage:');
    console.log('  node scripts/bulk-translate.cjs batch [startIndex] [batchSize]');
    console.log('  node scripts/bulk-translate.cjs count');
    break;
}