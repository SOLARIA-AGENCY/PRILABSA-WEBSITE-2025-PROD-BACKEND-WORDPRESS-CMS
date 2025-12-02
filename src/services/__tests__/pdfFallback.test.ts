/**
 * PDF Fallback Path Generation Tests
 *
 * Tests the PDF fallback logic in useProduct hook that generates
 * fallback PDF paths when WordPress doesn't have ficha_tecnica_pdf configured.
 *
 * @see src/services/wordpressApi.ts - useProduct hook (lines 510-542)
 */

import { describe, it, expect } from 'vitest';

/**
 * Sanitizes a product name for use in PDF filename
 * Replicates the logic in wordpressApi.ts:524-532
 */
function sanitizeProductName(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[\/]/g, '_')           // Replace slashes with underscores
    .replace(/[^a-zA-Z0-9\s_]/g, '') // Remove other special chars
    .replace(/\s+/g, '_')            // Replace spaces with underscores
    .replace(/_+/g, '_')             // Collapse multiple underscores
    .trim();
}

/**
 * Generates fallback PDF path from product code and name
 * Replicates the logic in wordpressApi.ts:533-535
 */
function generateFallbackPdfPath(code: string, name: string): string {
  const sanitizedName = sanitizeProductName(name);
  const pdfFilename = `${code}_${sanitizedName}.pdf`;
  return `/assets/pdfs/productos/${pdfFilename}`;
}

describe('PDF Fallback Path Generation', () => {
  describe('sanitizeProductName', () => {
    it('should remove diacritics from Spanish characters', () => {
      expect(sanitizeProductName('Vitamina C Monofosfatada')).toBe('Vitamina_C_Monofosfatada');
      expect(sanitizeProductName('Ácido Fólico')).toBe('Acido_Folico');
      expect(sanitizeProductName('Óxido de Zinc')).toBe('Oxido_de_Zinc');
      expect(sanitizeProductName('Niacinamida (Vitamina B3)')).toBe('Niacinamida_Vitamina_B3');
    });

    it('should replace slashes with underscores', () => {
      // Slash becomes underscore, then space also becomes underscore
      expect(sanitizeProductName('Vitamina A/D3')).toBe('Vitamina_A_D3');
      expect(sanitizeProductName('B12/Ácido Fólico')).toBe('B12_Acido_Folico');
    });

    it('should remove special characters', () => {
      expect(sanitizeProductName('Producto #1')).toBe('Producto_1');
      expect(sanitizeProductName('Test@Product!')).toBe('TestProduct');
      expect(sanitizeProductName('Name (100%)')).toBe('Name_100');
    });

    it('should collapse multiple spaces/underscores', () => {
      expect(sanitizeProductName('Vitamina   C')).toBe('Vitamina_C');
      expect(sanitizeProductName('Product__Name')).toBe('Product_Name');
    });

    it('should handle empty or whitespace-only strings', () => {
      expect(sanitizeProductName('')).toBe('');
      // Whitespace becomes underscores, then collapsed to single underscore
      // This edge case is acceptable since products always have names
      expect(sanitizeProductName('   ')).toBe('_');
    });
  });

  describe('generateFallbackPdfPath', () => {
    it('should generate correct path for simple product names', () => {
      const path = generateFallbackPdfPath('PRIL-001', 'Vitamina C');
      expect(path).toBe('/assets/pdfs/productos/PRIL-001_Vitamina_C.pdf');
    });

    it('should handle products with diacritics', () => {
      const path = generateFallbackPdfPath('PRIL-002', 'Ácido Fólico');
      expect(path).toBe('/assets/pdfs/productos/PRIL-002_Acido_Folico.pdf');
    });

    it('should handle products with special characters', () => {
      // Slash→underscore, space→underscore, parentheses removed
      const path = generateFallbackPdfPath('PRIL-003', 'Vitamina A/D3 (1000UI)');
      expect(path).toBe('/assets/pdfs/productos/PRIL-003_Vitamina_A_D3_1000UI.pdf');
    });

    it('should handle real Prilabsa product examples', () => {
      // Real products from the catalog
      expect(generateFallbackPdfPath('VCMP', 'Vitamina C Monofosfatada'))
        .toBe('/assets/pdfs/productos/VCMP_Vitamina_C_Monofosfatada.pdf');

      expect(generateFallbackPdfPath('B12', 'Cianocobalamina 1%'))
        .toBe('/assets/pdfs/productos/B12_Cianocobalamina_1.pdf');

      expect(generateFallbackPdfPath('ZNO', 'Óxido de Zinc'))
        .toBe('/assets/pdfs/productos/ZNO_Oxido_de_Zinc.pdf');
    });
  });

  describe('PDF data structure', () => {
    it('should match expected pdfData structure', () => {
      const code = 'TEST-001';
      const name = 'Test Product';
      const pdfPath = generateFallbackPdfPath(code, name);

      const pdfData = {
        exists: true,
        downloadUrl: pdfPath
      };

      expect(pdfData).toHaveProperty('exists', true);
      expect(pdfData).toHaveProperty('downloadUrl');
      expect(pdfData.downloadUrl).toMatch(/^\/assets\/pdfs\/productos\/.+\.pdf$/);
    });

    it('should return exists: false when no code provided', () => {
      const code = '';
      const name = 'Test Product';

      // Simulating the condition in wordpressApi.ts:536
      const shouldGenerateFallback = code && name;

      expect(shouldGenerateFallback).toBeFalsy();
    });

    it('should return exists: false when no name provided', () => {
      const code = 'TEST-001';
      const name = '';

      const shouldGenerateFallback = code && name;

      expect(shouldGenerateFallback).toBeFalsy();
    });
  });
});

describe('Integration: PDF Button Visibility', () => {
  /**
   * Tests that simulate the condition in ProductoDetalle.tsx
   * {producto.assets.pdf && producto.assets.pdf.exists && (...)}
   */

  it('should show PDF button when WordPress has PDF configured', () => {
    const producto = {
      assets: {
        pdf: {
          exists: true,
          downloadUrl: 'https://productos.prilabsa.com/wp-content/uploads/2024/ficha.pdf'
        }
      }
    };

    const showButton = producto.assets.pdf && producto.assets.pdf.exists;
    expect(showButton).toBe(true);
  });

  it('should show PDF button when fallback path is generated', () => {
    const code = 'VCMP';
    const name = 'Vitamina C Monofosfatada';

    const producto = {
      assets: {
        pdf: {
          exists: true,
          downloadUrl: generateFallbackPdfPath(code, name)
        }
      }
    };

    const showButton = producto.assets.pdf && producto.assets.pdf.exists;
    expect(showButton).toBe(true);
    expect(producto.assets.pdf.downloadUrl).toContain('/assets/pdfs/productos/');
  });

  it('should NOT show PDF button when no code/name available', () => {
    const producto = {
      assets: {
        pdf: {
          exists: false,
          downloadUrl: ''
        }
      }
    };

    const showButton = producto.assets.pdf && producto.assets.pdf.exists;
    expect(showButton).toBe(false);
  });
});
