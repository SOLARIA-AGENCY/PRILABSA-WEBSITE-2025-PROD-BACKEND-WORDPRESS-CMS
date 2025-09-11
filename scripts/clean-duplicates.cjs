#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Path to the product translations file
const filePath = path.join(__dirname, '..', 'src', 'data', 'products', 'product-translations.ts');

console.log('🧹 PRILABSA: Cleaning duplicate products...');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Define the duplicate products to remove (keeping the later, more organized versions)
const duplicatesToRemove = [
  'QU001', // Line ~146
  'EQ031', // Line ~233  
  'PB002', // Line ~299
  'PB001', // Line ~509
  'QU004', // Line ~575
  'EQ001'  // Line ~650
];

// Split content into lines for precise removal
const lines = content.split('\n');

// Find and mark ranges for removal
const rangesToRemove = [];

duplicatesToRemove.forEach(productId => {
  console.log(`🔍 Searching for duplicate ${productId}...`);
  
  let foundFirst = false;
  let startLine = -1;
  let endLine = -1;
  let braceDepth = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Find the first occurrence (the one to remove)
    if (line.includes(`"${productId}": {`) && !foundFirst) {
      foundFirst = true;
      startLine = i;
      braceDepth = 1;
      console.log(`  📍 Found first occurrence at line ${i + 1}`);
      continue;
    }
    
    // Track braces to find the end of the object
    if (foundFirst && startLine !== -1) {
      // Count opening and closing braces
      const openBraces = (line.match(/{/g) || []).length;
      const closeBraces = (line.match(/}/g) || []).length;
      
      braceDepth += openBraces - closeBraces;
      
      // When braceDepth reaches 0, we've found the end
      if (braceDepth === 0) {
        endLine = i;
        rangesToRemove.push({ start: startLine, end: endLine, productId });
        console.log(`  ✅ Complete range: lines ${startLine + 1}-${endLine + 1}`);
        break;
      }
    }
  }
  
  if (startLine === -1) {
    console.log(`  ⚠️  ${productId} not found (already cleaned?)`);
  }
});

// Sort ranges by start line in descending order (remove from bottom to top)
rangesToRemove.sort((a, b) => b.start - a.start);

console.log(`\n📋 Found ${rangesToRemove.length} duplicate ranges to remove:`);
rangesToRemove.forEach(range => {
  console.log(`  ${range.productId}: lines ${range.start + 1}-${range.end + 1}`);
});

// Remove the ranges
let linesRemoved = 0;
rangesToRemove.forEach(range => {
  console.log(`\n🗑️  Removing ${range.productId} (lines ${range.start + 1}-${range.end + 1})`);
  
  // Remove the range including the comma from the previous line if it exists
  let actualStart = range.start;
  
  // Check if the previous line ends with a comma (indicating this was not the first item)
  if (range.start > 0 && lines[range.start - 1].trim().endsWith(',')) {
    // Remove the comma from the previous line
    lines[range.start - 1] = lines[range.start - 1].replace(/,$/, '');
  }
  
  // If the next line after the range starts with a comma, we need to handle it
  if (range.end + 1 < lines.length && lines[range.end + 1].trim().startsWith(',')) {
    // Remove the next line's leading comma if the previous entry now needs to end with comma
    lines[range.end + 1] = lines[range.end + 1].replace(/^\s*,/, '');
    
    // Add comma to the previous line if needed
    if (range.start > 0 && !lines[range.start - 1].trim().endsWith(',') && !lines[range.start - 1].trim().endsWith('{')) {
      lines[range.start - 1] += ',';
    }
  }
  
  // Remove the lines
  lines.splice(range.start, range.end - range.start + 1);
  linesRemoved += (range.end - range.start + 1);
});

// Recreate content
const newContent = lines.join('\n');

// Write back to file
fs.writeFileSync(filePath, newContent, 'utf8');

console.log(`\n✅ Successfully removed ${linesRemoved} lines with ${rangesToRemove.length} duplicate products`);
console.log(`📁 Updated file: ${filePath}`);

// Verify the file is still valid TypeScript
try {
  // Basic syntax check - ensure it ends properly
  if (newContent.includes('export const productTranslations') && newContent.trim().endsWith('};')) {
    console.log('✅ File structure appears valid');
  } else {
    console.log('⚠️  Warning: File structure may be invalid');
  }
} catch (error) {
  console.error('❌ Error validating file:', error.message);
}

console.log('\n🎯 Next step: Run TypeScript compiler to verify syntax');