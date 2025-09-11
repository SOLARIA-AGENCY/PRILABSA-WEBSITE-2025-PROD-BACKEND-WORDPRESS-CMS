#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * PRILABSA Image Integrity Validator
 * Verifica que todas las imágenes PNG son válidas antes de build/deploy
 */

class ImageIntegrityValidator {
  constructor() {
    this.imagesPath = path.join(__dirname, '../public/assets/images/productos');
    this.fallbackPath = path.join(__dirname, '../public/assets/images/productos/fallback');
    this.errors = [];
    this.warnings = [];
    this.validImages = [];
    this.stats = {
      total: 0,
      valid: 0,
      corrupted: 0,
      missing: 0,
      tooSmall: 0
    };
  }

  async validateSingleImage(imagePath, fileName) {
    try {
      // 1. Verificar que el archivo existe
      if (!fs.existsSync(imagePath)) {
        this.errors.push(`❌ MISSING: ${fileName} - File does not exist`);
        this.stats.missing++;
        return false;
      }

      // 2. Verificar tamaño de archivo
      const stats = fs.statSync(imagePath);
      if (stats.size < 5000) { // Menos de 5KB es sospechoso
        this.errors.push(`⚠️  TINY: ${fileName} - Size: ${stats.size} bytes (suspiciously small)`);
        this.stats.tooSmall++;
        return false;
      }

      // 3. Verificar que es realmente una imagen PNG válida usando sharp
      const metadata = await sharp(imagePath).metadata();
      
      if (metadata.format !== 'png') {
        this.errors.push(`❌ FORMAT: ${fileName} - Not a valid PNG (detected: ${metadata.format})`);
        this.stats.corrupted++;
        return false;
      }

      if (!metadata.width || !metadata.height || metadata.width === 0 || metadata.height === 0) {
        this.errors.push(`❌ DIMENSIONS: ${fileName} - Invalid dimensions: ${metadata.width}x${metadata.height}`);
        this.stats.corrupted++;
        return false;
      }

      // 4. Verificar dimensiones mínimas razonables para imágenes de producto
      if (metadata.width < 100 || metadata.height < 100) {
        this.warnings.push(`⚠️  SMALL: ${fileName} - Small dimensions: ${metadata.width}x${metadata.height}`);
      }

      this.validImages.push({
        fileName,
        size: stats.size,
        dimensions: `${metadata.width}x${metadata.height}`,
        format: metadata.format
      });

      this.stats.valid++;
      return true;

    } catch (error) {
      this.errors.push(`❌ CORRUPT: ${fileName} - ${error.message}`);
      this.stats.corrupted++;
      return false;
    }
  }

  async validateAllImages() {
    console.log('🔍 PRILABSA Image Integrity Validation Starting...\n');

    if (!fs.existsSync(this.imagesPath)) {
      this.errors.push(`❌ CRITICAL: Images directory does not exist: ${this.imagesPath}`);
      return false;
    }

    // Obtener todas las imágenes PNG
    const allFiles = fs.readdirSync(this.imagesPath);
    const pngFiles = allFiles.filter(file => file.toLowerCase().endsWith('.png'));

    this.stats.total = pngFiles.length;

    console.log(`📊 Found ${pngFiles.length} PNG files to validate\n`);

    // Validar cada imagen
    for (const fileName of pngFiles) {
      const imagePath = path.join(this.imagesPath, fileName);
      await this.validateSingleImage(imagePath, fileName);
      
      // Mostrar progreso
      process.stdout.write(`\r🔍 Validating... ${Math.round((this.stats.valid + this.stats.corrupted + this.stats.missing + this.stats.tooSmall) / this.stats.total * 100)}%`);
    }

    console.log('\n'); // Nueva línea después del progreso

    return this.errors.length === 0;
  }

  generateReport() {
    console.log('\n' + '='.repeat(70));
    console.log('📊 PRILABSA IMAGE INTEGRITY REPORT');
    console.log('='.repeat(70));
    
    console.log('\n📈 STATISTICS:');
    console.log(`   Total images: ${this.stats.total}`);
    console.log(`   ✅ Valid: ${this.stats.valid}`);
    console.log(`   ❌ Corrupted: ${this.stats.corrupted}`);
    console.log(`   ❌ Missing: ${this.stats.missing}`);
    console.log(`   ⚠️  Too small: ${this.stats.tooSmall}`);

    if (this.errors.length > 0) {
      console.log('\n🚨 CRITICAL ERRORS:');
      this.errors.forEach(error => console.log(`   ${error}`));
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.warnings.forEach(warning => console.log(`   ${warning}`));
    }

    if (this.stats.valid > 0) {
      console.log('\n✅ VALID IMAGES SAMPLE:');
      this.validImages.slice(0, 5).forEach(img => {
        console.log(`   • ${img.fileName} - ${img.dimensions} - ${Math.round(img.size/1024)}KB`);
      });
      if (this.validImages.length > 5) {
        console.log(`   ... and ${this.validImages.length - 5} more valid images`);
      }
    }

    const isSuccess = this.errors.length === 0;
    
    console.log('\n' + '='.repeat(70));
    if (isSuccess) {
      console.log('🎉 ALL IMAGES VALID - BUILD CAN PROCEED');
    } else {
      console.log('🚫 IMAGE VALIDATION FAILED - BUILD SHOULD BE STOPPED');
      console.log('\nTo fix these issues:');
      console.log('1. Check missing/corrupted PNG files');
      console.log('2. Re-export images in proper PNG format');
      console.log('3. Ensure all product images are present');
      console.log('4. Run this validator again');
    }
    console.log('='.repeat(70));

    return isSuccess;
  }
}

// Ejecutar validación
async function main() {
  const validator = new ImageIntegrityValidator();
  
  try {
    const imagesValid = await validator.validateAllImages();
    const overallSuccess = validator.generateReport();
    
    process.exit(overallSuccess ? 0 : 1);
    
  } catch (error) {
    console.error('💥 VALIDATOR CRASHED:', error.message);
    console.error(error.stack);
    process.exit(2);
  }
}

// ES module check
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}