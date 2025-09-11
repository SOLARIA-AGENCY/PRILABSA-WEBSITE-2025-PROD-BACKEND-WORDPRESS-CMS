#!/usr/bin/env node

/**
 * Simple Product Count Verification
 * Verifies we have exactly 105 products as required
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando que tenemos exactamente 105 productos...\n');

try {
  // Read translation file
  const translationsPath = path.join(process.cwd(), 'src/data/products/product-translations.ts');
  const content = fs.readFileSync(translationsPath, 'utf8');
  
  // Extract product IDs using regex
  const productIds = content.match(/"[A-Z]{2}\d{3}":/g) || [];
  const uniqueIds = [...new Set(productIds.map(id => id.replace(/[":]$/g, '')))];
  
  console.log(`📊 Productos encontrados: ${uniqueIds.length}`);
  
  if (uniqueIds.length === 105) {
    console.log('✅ ¡PERFECTO! Tenemos exactamente 105 productos como requerido');
    
    // Show breakdown by category
    const categories = {
      AD: uniqueIds.filter(id => id.startsWith('AD')).length,
      AL: uniqueIds.filter(id => id.startsWith('AL')).length, 
      EQ: uniqueIds.filter(id => id.startsWith('EQ')).length,
      PB: uniqueIds.filter(id => id.startsWith('PB')).length,
      QU: uniqueIds.filter(id => id.startsWith('QU')).length
    };
    
    console.log('\n📋 Distribución por categorías:');
    console.log(`   🧪 Aditivos (AD): ${categories.AD}`);
    console.log(`   🍽️  Alimentos (AL): ${categories.AL}`);
    console.log(`   ⚙️  Equipos (EQ): ${categories.EQ}`);
    console.log(`   🦠 Probióticos (PB): ${categories.PB}`);
    console.log(`   ⚗️  Químicos (QU): ${categories.QU}`);
    console.log(`   📊 Total: ${Object.values(categories).reduce((a, b) => a + b, 0)}`);
    
    // Verify each product has translations in all 3 languages
    const languageCounts = {
      es: (content.match(/es:\s*{/g) || []).length,
      en: (content.match(/en:\s*{/g) || []).length, 
      pt: (content.match(/pt:\s*{/g) || []).length
    };
    
    console.log('\n🌐 Idiomas por producto:');
    console.log(`   🇪🇸 Español: ${languageCounts.es}`);
    console.log(`   🇺🇸 Inglés: ${languageCounts.en}`);
    console.log(`   🇧🇷 Portugués: ${languageCounts.pt}`);
    
    if (languageCounts.es === 105 && languageCounts.en === 105 && languageCounts.pt === 105) {
      console.log('\n🎯 ¡SISTEMA COMPLETO! 105 productos × 3 idiomas = 315 traducciones totales');
      process.exit(0);
    } else {
      console.log('\n⚠️  Algunos productos tienen traducciones incompletas');
      process.exit(1);
    }
    
  } else if (uniqueIds.length > 105) {
    console.log(`❌ PROBLEMA: Tenemos ${uniqueIds.length - 105} productos extra`);
    process.exit(1);
  } else {
    console.log(`❌ PROBLEMA: Faltan ${105 - uniqueIds.length} productos`);
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}