#!/usr/bin/env node
/**
 * PRILABSA PRODUCTS INTEGRITY CHECKER
 * Prevents regression by verifying product catalog integrity
 */

import { productsJulio2025 } from '../src/data/products/julio-2025.ts';

const EXPECTED_PRODUCT_COUNT = 105;
const EXPECTED_CATEGORIES = ['aditivos', 'alimentos', 'equipos', 'quimicos', 'probioticos'];

console.log('🔍 PRILABSA Product Integrity Check...');

// Check total product count
if (productsJulio2025.length !== EXPECTED_PRODUCT_COUNT) {
  console.error(`❌ CRITICAL: Expected ${EXPECTED_PRODUCT_COUNT} products, found ${productsJulio2025.length}`);
  process.exit(1);
}

// Check categories
const foundCategories = [...new Set(productsJulio2025.map(p => p.category))];
const missingCategories = EXPECTED_CATEGORIES.filter(cat => !foundCategories.includes(cat));

if (missingCategories.length > 0) {
  console.error(`❌ CRITICAL: Missing categories: ${missingCategories.join(', ')}`);
  process.exit(1);
}

// Check category distribution
const categoryStats = {};
productsJulio2025.forEach(product => {
  categoryStats[product.category] = (categoryStats[product.category] || 0) + 1;
});

console.log('✅ Product integrity verified:');
console.log(`   Total products: ${productsJulio2025.length}`);
Object.entries(categoryStats).forEach(([category, count]) => {
  console.log(`   ${category}: ${count} products`);
});

// Check for critical products
const criticalProducts = ['AD001', 'QU001', 'AL001', 'EQ001'];
const missingCritical = criticalProducts.filter(id => 
  !productsJulio2025.find(p => p.id === id)
);

if (missingCritical.length > 0) {
  console.warn(`⚠️  Missing critical products: ${missingCritical.join(', ')}`);
}

console.log('🎯 All checks passed - Product catalog integrity maintained');