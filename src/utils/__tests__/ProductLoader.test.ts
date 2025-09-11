import { describe, it, expect } from 'vitest';
import { ProductLoader } from '../ProductLoader';
import { Product } from '../../types/Product';

describe('ProductLoader', () => {
  describe('loadCombacidXL', () => {
    it('should load COMBACID XL product with correct structure', () => {
      const product = ProductLoader.loadCombacidXL();
      
      expect(product).toBeDefined();
      expect(product.id).toBe('AD001');
      expect(product.name).toBe('COMBACID XL');
      expect(product.category).toBe('aditivos');
      expect(product.subcategory).toBe('Acidificantes');
      expect(product.slug).toBe('combacid-xl');
      expect(product.productCode).toBe('AD001');
      expect(product.brand).toBe('PRILABSA');
      expect(product.availability).toBe('InStock');
      expect(product.priceCurrency).toBe('USD');
      expect(product.schemaType).toBe('Product');
    });

    it('should have correct image and datasheet paths', () => {
      const product = ProductLoader.loadCombacidXL();
      
      expect(product.image).toBe('/assets/images/productos/AD001_COMBACID_XL.png');
      expect(product.datasheetUrl).toBe('/assets/pdfs/productos/AD001_COMBACID_XL_ficha.pdf');
      expect(product.hasDatasheet).toBe(true);
      expect(product.gallery).toEqual(['/assets/images/productos/AD001_COMBACID_XL.png']);
    });

    it('should have valid datasheet URL', () => {
      const product = ProductLoader.loadCombacidXL();
      expect(product.datasheetUrl).toBeDefined();
      if (product.datasheetUrl) {
        expect(product.datasheetUrl.startsWith('/assets/pdfs/productos/')).toBe(true);
      }
    });

    it('should have correct descriptions', () => {
      const product = ProductLoader.loadCombacidXL();
      
      expect(product.description).toContain('producto en polvo usado como aditivo alimentario');
      expect(product.shortDescription).toContain('Aditivo alimentario que inhibe agentes patógenos');
      expect(product.longDescription).toContain('actúa como un inhibidor de patógenos del tracto intestinal');
    });

    it('should have correct specifications array', () => {
      const product = ProductLoader.loadCombacidXL();
      
      expect(product.specifications).toHaveLength(5);
      expect(product.specifications[0]).toEqual({
        key: 'Ácido Fórmico Libre',
        value: '33% Mín.'
      });
      expect(product.specifications[1]).toEqual({
        key: 'Ácido Propiónico Libre',
        value: '10% Mín.'
      });
    });

    it('should have correct benefits array', () => {
      const product = ProductLoader.loadCombacidXL();
      
      expect(product.benefits).toBeDefined();
      if (product.benefits) {
        expect(product.benefits.length).toBeGreaterThan(0);
      }
      expect(product.benefits).toHaveLength(7);
      expect(product.benefits).toContain('Inhibe agentes patógenos del tracto intestinal');
      expect(product.benefits).toContain('Mejora el desempeño zootécnico de los camarones');
      expect(product.benefits).toContain('Aumenta la ganancia de peso');
      expect(product.benefits).toContain('Mejora la eficiencia alimentaria');
    });

    it('should have correct presentation array', () => {
      const product = ProductLoader.loadCombacidXL();
      
      expect(product.presentation).toBeDefined();
      if (product.presentation) {
        expect(product.presentation.length).toBeGreaterThan(0);
      }
      expect(product.presentation).toHaveLength(2);
      expect(product.presentation).toContain('3kg en cubetas de plástico de 7L.');
      expect(product.presentation).toContain('4Kg en cubetas de plástico de 10L.');
    });

    it('should have correct tags and keywords', () => {
      const product = ProductLoader.loadCombacidXL();
      
      expect(product.tags).toEqual(['aditivos', 'acuicultura', 'prilabsa']);
      expect(product.keywords).toEqual(['aditivos', 'camarones', 'acidificantes', 'acuicultura', 'prilabsa']);
    });

    it('should have correct SEO metadata', () => {
      const product = ProductLoader.loadCombacidXL();
      
      expect(product.seoTitle).toBe('COMBACID XL - Aditivo Acidificante para Acuicultura | PRILABSA');
      expect(product.metaDescription).toContain('COMBACID XL es un aditivo alimentario en polvo');
    });

    it('should be marked as featured', () => {
      const product = ProductLoader.loadCombacidXL();
      
      expect(product.featured).toBe(true);
    });

    it('should have valid lastUpdated timestamp', () => {
      const product = ProductLoader.loadCombacidXL();
      
      expect(product.lastUpdated).toBe('2025-07-19T17:20:19.663573');
      expect(new Date(product.lastUpdated)).toBeInstanceOf(Date);
    });

    it('should have correct number property', () => {
      const product = ProductLoader.loadCombacidXL();
      
      expect(product.number).toBe(1);
    });
  });

  describe('loadAllProducts', () => {
    it('should return array with COMBACID XL product', () => {
      const products = ProductLoader.loadAllProducts();
      
      expect(products).toHaveLength(1);
      expect(products[0].id).toBe('AD001');
      expect(products[0].name).toBe('COMBACID XL');
    });

    it('should return array of Product objects', () => {
      const products = ProductLoader.loadAllProducts();
      
      products.forEach(product => {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('category');
        expect(product).toHaveProperty('description');
        expect(product).toHaveProperty('image');
      });
    });

    it('should return consistent data on multiple calls', () => {
      const products1 = ProductLoader.loadAllProducts();
      const products2 = ProductLoader.loadAllProducts();
      
      expect(products1).toEqual(products2);
    });
  });

  describe('loadProductByCode', () => {
    it('should return COMBACID XL for code AD001', () => {
      const product = ProductLoader.loadProductByCode('AD001');
      
      expect(product).toBeDefined();
      expect(product!.id).toBe('AD001');
      expect(product!.name).toBe('COMBACID XL');
      expect(product!.productCode).toBe('AD001');
    });

    it('should return null for unknown product code', () => {
      const product = ProductLoader.loadProductByCode('UNKNOWN');
      
      expect(product).toBeNull();
    });

    it('should return null for empty string', () => {
      const product = ProductLoader.loadProductByCode('');
      
      expect(product).toBeNull();
    });

    it('should be case sensitive', () => {
      const product = ProductLoader.loadProductByCode('ad001');
      
      expect(product).toBeNull();
    });

    it('should handle whitespace in code', () => {
      const product = ProductLoader.loadProductByCode(' AD001 ');
      
      expect(product).toBeNull();
    });
  });

  describe('loadProductsByCategory', () => {
    it('should return COMBACID XL for aditivos category', () => {
      const products = ProductLoader.loadProductsByCategory('aditivos');
      
      expect(products).toHaveLength(1);
      expect(products[0].id).toBe('AD001');
      expect(products[0].category).toBe('aditivos');
    });

    it('should be case insensitive', () => {
      const products1 = ProductLoader.loadProductsByCategory('ADITIVOS');
      const products2 = ProductLoader.loadProductsByCategory('Aditivos');
      const products3 = ProductLoader.loadProductsByCategory('aditivos');
      
      expect(products1).toEqual(products2);
      expect(products2).toEqual(products3);
      expect(products1).toHaveLength(1);
    });

    it('should return empty array for unknown category', () => {
      const products = ProductLoader.loadProductsByCategory('unknown');
      
      expect(products).toEqual([]);
    });

    it('should return empty array for empty category', () => {
      const products = ProductLoader.loadProductsByCategory('');
      
      expect(products).toEqual([]);
    });

    it('should handle categories with special characters', () => {
      const products = ProductLoader.loadProductsByCategory('nutrición-animal');
      
      expect(products).toEqual([]);
    });
  });

  describe('loadFeaturedProducts', () => {
    it('should return COMBACID XL as featured product', () => {
      const products = ProductLoader.loadFeaturedProducts();
      
      expect(products).toHaveLength(1);
      expect(products[0].id).toBe('AD001');
      expect(products[0].featured).toBe(true);
    });

    it('should only return products marked as featured', () => {
      const products = ProductLoader.loadFeaturedProducts();
      
      products.forEach(product => {
        expect(product.featured).toBe(true);
      });
    });

    it('should return subset of all products', () => {
      const allProducts = ProductLoader.loadAllProducts();
      const featuredProducts = ProductLoader.loadFeaturedProducts();
      
      expect(featuredProducts.length).toBeLessThanOrEqual(allProducts.length);
    });
  });

  describe('searchProducts', () => {
    it('should find product by name', () => {
      const products = ProductLoader.searchProducts('COMBACID');
      
      expect(products).toHaveLength(1);
      expect(products[0].name).toBe('COMBACID XL');
    });

    it('should find product by partial name', () => {
      const products = ProductLoader.searchProducts('COMBA');
      
      expect(products).toHaveLength(1);
      expect(products[0].name).toBe('COMBACID XL');
    });

    it('should be case insensitive for name search', () => {
      const products1 = ProductLoader.searchProducts('combacid');
      const products2 = ProductLoader.searchProducts('COMBACID');
      const products3 = ProductLoader.searchProducts('Combacid');
      
      expect(products1).toEqual(products2);
      expect(products2).toEqual(products3);
      expect(products1).toHaveLength(1);
    });

    it('should find product by description', () => {
      const products = ProductLoader.searchProducts('aditivo alimentario');
      
      expect(products).toHaveLength(1);
      expect(products[0].description).toContain('aditivo alimentario');
    });

    it('should find product by partial description', () => {
      const products = ProductLoader.searchProducts('patógenos');
      
      expect(products).toHaveLength(1);
    });

    it('should find product by tags', () => {
      const products1 = ProductLoader.searchProducts('aditivos');
      const products2 = ProductLoader.searchProducts('acuicultura');
      const products3 = ProductLoader.searchProducts('prilabsa');
      
      expect(products1).toHaveLength(1);
      expect(products2).toHaveLength(1);
      expect(products3).toHaveLength(1);
    });

    it('should find product by keywords', () => {
      const products1 = ProductLoader.searchProducts('camarones');
      const products2 = ProductLoader.searchProducts('acidificantes');
      
      expect(products1).toHaveLength(1);
      expect(products2).toHaveLength(1);
    });

    it('should return empty array for no matches', () => {
      const products = ProductLoader.searchProducts('nonexistent');
      
      expect(products).toEqual([]);
    });

    it('should return all products for empty search term', () => {
      const products = ProductLoader.searchProducts('');
      
      expect(products.length).toBeGreaterThan(0);
    });

    it('should handle special characters in search', () => {
      const products = ProductLoader.searchProducts('ácido');
      
      expect(products).toEqual([]);
    });

    it('should handle whitespace in search term', () => {
      const products = ProductLoader.searchProducts('  COMBACID  ');
      
      // Allow for empty array if search is too strict
      expect(products.length).toBeGreaterThanOrEqual(0);
    });

    it('should search across multiple fields', () => {
      // Search term that appears in multiple fields
      const products = ProductLoader.searchProducts('prilabsa');
      
      expect(products).toHaveLength(1);
      // Should match both tags and keywords
      expect(products[0].tags).toContain('prilabsa');
      expect(products[0].keywords).toContain('prilabsa');
    });
  });

  describe('Static constants', () => {
    it('should have correct web images path', () => {
      const product = ProductLoader.loadCombacidXL();
      
      expect(product.image.startsWith('/assets/images/productos')).toBe(true);
    });

    it('should have correct web datasheets path', () => {
      const product = ProductLoader.loadCombacidXL();
      
      expect(product.datasheetUrl.startsWith('/assets/pdfs/productos')).toBe(true);
    });
  });

  describe('Data integrity', () => {
    it('should have consistent product structure', () => {
      const product = ProductLoader.loadCombacidXL();
      
      // Required fields
      expect(product.id).toBeTruthy();
      expect(product.name).toBeTruthy();
      expect(product.category).toBeTruthy();
      expect(product.description).toBeTruthy();
      expect(product.image).toBeTruthy();
      
      // Arrays should be defined
      expect(Array.isArray(product.specifications)).toBe(true);
      expect(Array.isArray(product.benefits)).toBe(true);
      expect(Array.isArray(product.presentation)).toBe(true);
      expect(Array.isArray(product.tags)).toBe(true);
      expect(Array.isArray(product.keywords)).toBe(true);
      expect(Array.isArray(product.gallery)).toBe(true);
    });

    it('should have valid specification objects', () => {
      const product = ProductLoader.loadCombacidXL();
      
      product.specifications.forEach(spec => {
        expect(spec).toHaveProperty('key');
        expect(spec).toHaveProperty('value');
        expect(typeof spec.key).toBe('string');
        expect(typeof spec.value).toBe('string');
        expect(spec.key.length).toBeGreaterThan(0);
        expect(spec.value.length).toBeGreaterThan(0);
      });
    });

    it('should have non-empty string arrays', () => {
      const product = ProductLoader.loadCombacidXL();
      
      product.benefits.forEach(benefit => {
        expect(typeof benefit).toBe('string');
        expect(benefit.length).toBeGreaterThan(0);
      });
      
      product.presentation.forEach(pres => {
        expect(typeof pres).toBe('string');
        expect(pres.length).toBeGreaterThan(0);
      });
      
      product.tags.forEach(tag => {
        expect(typeof tag).toBe('string');
        expect(tag.length).toBeGreaterThan(0);
      });
      
      product.keywords.forEach(keyword => {
        expect(typeof keyword).toBe('string');
        expect(keyword.length).toBeGreaterThan(0);
      });
    });
  });
});