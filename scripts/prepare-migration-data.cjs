#!/usr/bin/env node

/**
 * PRILABSA Migration Data Preparation
 * Parses translations from TS file and prepares complete migration data
 * Outputs: migration-data.json + migration-verification.csv
 */

const fs = require('fs');
const path = require('path');

const BASE_PATH = path.join(__dirname, '..');
const CATALOG_PATH = path.join(BASE_PATH, 'MODULO PRODUCTOS PRILABSA CATALOGO JULIO 2025', 'PRILABSA_CATALOGO_WEB_2025.json');
const TRANSLATIONS_PATH = path.join(BASE_PATH, 'src', 'data', 'products', 'product-translations.ts');
const OUTPUT_JSON = path.join(__dirname, 'migration-data.json');
const OUTPUT_CSV = path.join(__dirname, 'migration-verification.csv');

// WordPress taxonomy IDs (from API)
const CATEGORY_TAX_IDS = {
  'aditivos': 3,
  'alimentos': 4,
  'equipos': 5,
  'probioticos': 6,
  'quimicos': 7
};

/**
 * Parse TypeScript translations file using regex
 */
function parseTranslationsFile() {
  console.log('📖 Parsing translations file...');
  const content = fs.readFileSync(TRANSLATIONS_PATH, 'utf8');

  const translations = {};

  // Find all product blocks: "CODE": { es: {...}, en: {...}, pt: {...} }
  // More robust regex pattern
  const productBlockRegex = /"([A-Z]{2}\d{3})"\s*:\s*\{/g;
  let match;

  while ((match = productBlockRegex.exec(content)) !== null) {
    const codigo = match[1];
    const startPos = match.index;

    // Find the complete block by counting braces
    let braceCount = 0;
    let blockStart = content.indexOf('{', startPos);
    let pos = blockStart;
    let blockEnd = -1;

    for (let i = blockStart; i < content.length; i++) {
      if (content[i] === '{') braceCount++;
      if (content[i] === '}') braceCount--;
      if (braceCount === 0) {
        blockEnd = i + 1;
        break;
      }
    }

    if (blockEnd > blockStart) {
      const blockContent = content.substring(blockStart, blockEnd);

      // Extract each language section
      translations[codigo] = {
        es: extractLanguageData(blockContent, 'es'),
        en: extractLanguageData(blockContent, 'en'),
        pt: extractLanguageData(blockContent, 'pt')
      };
    }
  }

  console.log(`   Found translations for ${Object.keys(translations).length} products`);
  return translations;
}

/**
 * Extract language-specific data from a product block
 */
function extractLanguageData(block, lang) {
  const result = {
    name: '',
    description: '',
    benefits: [],
    presentation: []
  };

  // Find the language section
  const langRegex = new RegExp(`${lang}\\s*:\\s*\\{`, 'g');
  const langMatch = langRegex.exec(block);
  if (!langMatch) return result;

  const langStart = langMatch.index;
  let braceCount = 0;
  let sectionEnd = -1;

  for (let i = block.indexOf('{', langStart); i < block.length; i++) {
    if (block[i] === '{') braceCount++;
    if (block[i] === '}') braceCount--;
    if (braceCount === 0) {
      sectionEnd = i + 1;
      break;
    }
  }

  if (sectionEnd === -1) return result;

  const section = block.substring(langStart, sectionEnd);

  // Extract name
  const nameMatch = section.match(/name\s*:\s*["'`]([^"'`]+)["'`]/);
  if (nameMatch) result.name = nameMatch[1];

  // Extract description (may be multiline with template literals)
  const descMatch = section.match(/description\s*:\s*["'`]([\s\S]*?)["'`]\s*[,}]/);
  if (descMatch) {
    result.description = descMatch[1].replace(/\\n/g, '\n').trim();
  }

  // Extract benefits array
  const benefitsMatch = section.match(/benefits\s*:\s*\[([\s\S]*?)\]/);
  if (benefitsMatch) {
    const benefitsContent = benefitsMatch[1];
    const benefitStrings = benefitsContent.match(/["'`]([\s\S]*?)["'`]/g);
    if (benefitStrings) {
      result.benefits = benefitStrings.map(s =>
        s.slice(1, -1).replace(/\\n/g, '\n').trim()
      );
    }
  }

  // Extract presentation array
  const presMatch = section.match(/presentation\s*:\s*\[([\s\S]*?)\]/);
  if (presMatch) {
    const presContent = presMatch[1];
    const presStrings = presContent.match(/["'`]([\s\S]*?)["'`]/g);
    if (presStrings) {
      result.presentation = presStrings.map(s =>
        s.slice(1, -1).replace(/\\n/g, '\n').trim()
      );
    }
  }

  return result;
}

/**
 * Generate short description (first 150 chars)
 */
function generateShortDescription(description) {
  if (!description) return '';
  const clean = description.replace(/\n/g, ' ').trim();
  if (clean.length <= 150) return clean;
  return clean.substring(0, 147) + '...';
}

/**
 * Prepare migration data for all products
 */
function prepareMigrationData() {
  console.log('🚀 PRILABSA Migration Data Preparation');
  console.log('='.repeat(50));

  // Load catalog
  console.log('\n📦 Loading catalog...');
  const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
  console.log(`   Found ${catalog.productos.length} products`);

  // Parse translations
  const translations = parseTranslationsFile();

  // Prepare migration data
  console.log('\n📝 Preparing migration data...');

  const migrationData = [];
  const missingTranslations = [];

  for (const product of catalog.productos) {
    const trans = translations[product.codigo];

    // Spanish data from catalog (fallback)
    const esName = trans?.es?.name || product.nombre;
    const esDesc = trans?.es?.description || product.descripcion;
    const esBenefits = trans?.es?.benefits || [product.beneficios || ''];
    const esPresentation = trans?.es?.presentation ||
      (product.presentacion ? product.presentacion.split('\n').map(p => p.replace(/^[•\-]\s*/, '')) : []);

    // English data
    const enName = trans?.en?.name || esName;
    const enDesc = trans?.en?.description || '';
    const enBenefits = trans?.en?.benefits || [];
    const enPresentation = trans?.en?.presentation || [];

    // Portuguese data
    const ptName = trans?.pt?.name || esName;
    const ptDesc = trans?.pt?.description || '';
    const ptBenefits = trans?.pt?.benefits || [];
    const ptPresentation = trans?.pt?.presentation || [];

    // Track missing translations
    if (!trans || !trans.en?.description) {
      missingTranslations.push(product.codigo);
    }

    // Build migration entry
    const entry = {
      codigo: product.codigo,
      categoria: product.categoria,
      categoria_wp_id: CATEGORY_TAX_IDS[product.categoria] || null,

      // Spanish
      nombre_producto_es: esName,
      descripcion_es: esDesc,
      descripcion_corta_es: generateShortDescription(esDesc),
      beneficio_1_es: esBenefits[0] || '',
      beneficio_2_es: esBenefits[1] || '',
      beneficio_3_es: esBenefits[2] || '',
      presentacion_es: esPresentation.map(p => `• ${p}`).join('\n'),

      // English
      nombre_producto_en: enName,
      descripcion_en: enDesc,
      descripcion_corta_en: generateShortDescription(enDesc),
      beneficio_1_en: enBenefits[0] || '',
      beneficio_2_en: enBenefits[1] || '',
      beneficio_3_en: enBenefits[2] || '',
      presentacion_en: enPresentation.map(p => `• ${p}`).join('\n'),

      // Portuguese
      nombre_producto_pt: ptName,
      descripcion_pt: ptDesc,
      descripcion_corta_pt: generateShortDescription(ptDesc),
      beneficio_1_pt: ptBenefits[0] || '',
      beneficio_2_pt: ptBenefits[1] || '',
      beneficio_3_pt: ptBenefits[2] || '',
      presentacion_pt: ptPresentation.map(p => `• ${p}`).join('\n'),

      // Media references
      imagen: product.imagen,
      pdf: product.pdf,

      // Status
      has_translation: !!trans?.en?.description
    };

    migrationData.push(entry);
  }

  // Write JSON output
  console.log('\n💾 Writing migration-data.json...');
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(migrationData, null, 2));

  // Write CSV for verification
  console.log('📊 Writing migration-verification.csv...');
  const csvHeaders = [
    'codigo', 'categoria', 'categoria_wp_id', 'has_translation',
    'nombre_es', 'nombre_en', 'nombre_pt',
    'descripcion_corta_es', 'descripcion_corta_en', 'descripcion_corta_pt'
  ];

  const csvRows = migrationData.map(p => [
    p.codigo,
    p.categoria,
    p.categoria_wp_id,
    p.has_translation,
    `"${(p.nombre_producto_es || '').replace(/"/g, '""')}"`,
    `"${(p.nombre_producto_en || '').replace(/"/g, '""')}"`,
    `"${(p.nombre_producto_pt || '').replace(/"/g, '""')}"`,
    `"${(p.descripcion_corta_es || '').replace(/"/g, '""')}"`,
    `"${(p.descripcion_corta_en || '').replace(/"/g, '""')}"`,
    `"${(p.descripcion_corta_pt || '').replace(/"/g, '""')}"`
  ].join(','));

  fs.writeFileSync(OUTPUT_CSV, [csvHeaders.join(','), ...csvRows].join('\n'));

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total products: ${migrationData.length}`);
  console.log(`With translations: ${migrationData.filter(p => p.has_translation).length}`);
  console.log(`Missing translations: ${missingTranslations.length}`);

  if (missingTranslations.length > 0 && missingTranslations.length <= 20) {
    console.log(`\n⚠️ Products without EN/PT translations:`);
    missingTranslations.forEach(c => console.log(`   - ${c}`));
  }

  // Category breakdown
  console.log('\n📁 By Category:');
  const byCategory = {};
  migrationData.forEach(p => {
    byCategory[p.categoria] = (byCategory[p.categoria] || 0) + 1;
  });
  Object.entries(byCategory).forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count} (WP ID: ${CATEGORY_TAX_IDS[cat]})`);
  });

  console.log('\n✅ Output files:');
  console.log(`   ${OUTPUT_JSON}`);
  console.log(`   ${OUTPUT_CSV}`);

  return migrationData;
}

// Run
prepareMigrationData();
