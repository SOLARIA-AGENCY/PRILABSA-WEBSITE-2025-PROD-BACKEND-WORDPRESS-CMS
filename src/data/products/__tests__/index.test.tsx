import { describe, it, expect, vi } from 'vitest';

// Mock de LanguageContext para evitar el error en ProductCard
vi.mock('../../contexts/LanguageContext', () => ({
  useLanguage: () => ({
    language: 'es',
    setLanguage: vi.fn(),
    t: (key: string) => key,
  }),
  LanguageProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import {
  getAllProducts,
  getProductsByCategory,
  searchProducts,
  getProductById,
  getProductByCode,
  validateProduct,
  getAvailableCategories,
  filterProducts,
  getRegistryStats,
  PRODUCTS_REGISTRY,
  REGISTRY_STATS
} from '../index';
import { OptimizedProduct, ProductFilter } from '../types';

// Mock the products data
vi.mock('../julio-2025', () => ({
  productsJulio2025: [
    {
      id: 'test-product-1',
      name: 'Test Product 1',
      description: 'Test description 1',
      category: 'alimentos',
      subcategory: 'test-subcategory',
      codigo: 'TEST-001',
      slug: 'test-product-1',
      image: '/test-image-1.jpg',
      assets: {
        id: 'test-product-1',
        images: {
          main: {
            filename: 'test-image-1.jpg',
            path: '/test-image-1.jpg',
            extension: 'jpg',
            size: 0,
            exists: true,
            webp: '/test-image-1.webp',
            fallback: '/test-image-1.jpg',
            thumbnail: '/test-image-1_thumb.jpg',
            alt: 'Test Product 1',
            width: 400,
            height: 300
          }
        }
      },
      metadata: {
        priority: 1,
        featured: true,
        lastUpdated: '2025-01-01',
        searchTags: ['tag1', 'tag2'],
        category: 'alimentos',
        subcategory: 'test-subcategory'
      },
      benefits: ['Benefit 1', 'Benefit 2'],
      presentation: 'Test presentation 1',
      tags: ['tag1', 'tag2'],
      specifications: {
        dosage: 'Test dosage',
        application: 'Test application'
      }
    },
    {
      id: 'test-product-2',
      name: 'Test Product 2',
      description: 'Test description 2',
      category: 'probioticos',
      subcategory: 'test-subcategory-2',
      codigo: 'TEST-002',
      slug: 'test-product-2',
      image: '/test-image-2.jpg',
      assets: {
        id: 'test-product-2',
        images: {
          main: {
            filename: 'test-image-2.jpg',
            path: '/test-image-2.jpg',
            extension: 'jpg',
            size: 0,
            exists: true,
            webp: '/test-image-2.webp',
            fallback: '/test-image-2.jpg',
            thumbnail: '/test-image-2_thumb.jpg',
            alt: 'Test Product 2',
            width: 400,
            height: 300
          }
        }
      },
      metadata: {
        priority: 5,
        featured: false,
        lastUpdated: '2025-01-02',
        searchTags: ['tag3', 'tag4'],
        category: 'probioticos',
        subcategory: 'test-subcategory-2'
      },
      benefits: ['Benefit 3'],
      presentation: 'Test presentation 2',
      tags: ['tag3', 'tag4'],
      specifications: {
        storage: 'Test storage'
      }
    },
    {
      id: 'test-product-3',
      name: 'Another Product',
      description: 'Another description',
      category: 'alimentos',
      subcategory: 'another-subcategory',
      codigo: 'ANOTHER-001',
      slug: 'another-product',
      image: '/another-image.jpg',
      assets: {
        id: 'test-product-3',
        images: {
          main: {
            filename: 'another-image.jpg',
            path: '/another-image.jpg',
            extension: 'jpg',
            size: 0,
            exists: true,
            webp: '/another-image.webp',
            fallback: '/another-image.jpg',
            thumbnail: '/another-image_thumb.jpg',
            alt: 'Another Product',
            width: 400,
            height: 300
          }
        }
      },
      metadata: {
        priority: 3,
        featured: false,
        lastUpdated: '2025-01-03',
        searchTags: ['tag5'],
        category: 'alimentos',
        subcategory: 'another-subcategory'
      },
      benefits: [],
      presentation: 'Another presentation',
      tags: ['tag5'],
      specifications: {}
    }
  ]
}));

describe('Products Index', () => {
  describe('getAllProducts', () => {
    it('should return all products from registry', () => {
      const products = getAllProducts();
      expect(products).toHaveLength(3);
      expect(products[0].id).toBe('test-product-1');
      expect(products[1].id).toBe('test-product-2');
      expect(products[2].id).toBe('test-product-3');
    });

    it('should return the same reference as PRODUCTS_REGISTRY', () => {
      const products = getAllProducts();
      expect(products).toBe(PRODUCTS_REGISTRY);
    });
  });

  describe('getProductsByCategory', () => {
    it('should return products filtered by category', () => {
      const alimentosProducts = getProductsByCategory('alimentos');
      expect(alimentosProducts).toHaveLength(2);
      expect(alimentosProducts[0].category).toBe('alimentos');
      expect(alimentosProducts[1].category).toBe('alimentos');
    });

    it('should return single product for probioticos category', () => {
      const probioticosProducts = getProductsByCategory('probioticos');
      expect(probioticosProducts).toHaveLength(1);
      expect(probioticosProducts[0].id).toBe('test-product-2');
    });

    it('should return empty array for non-existent category', () => {
      const nonExistentProducts = getProductsByCategory('non-existent');
      expect(nonExistentProducts).toEqual([]);
    });

    it('should be case sensitive', () => {
      const upperCaseProducts = getProductsByCategory('ALIMENTOS');
      expect(upperCaseProducts).toEqual([]);
    });
  });

  describe('searchProducts', () => {
    it('should return all products for empty query', () => {
      const results = searchProducts('');
      expect(results).toHaveLength(3);
    });

    it('should return all products for whitespace query', () => {
      const results = searchProducts('   ');
      expect(results).toHaveLength(3);
    });

    it('should search by product name', () => {
      const results = searchProducts('Test Product 1');
      expect(results).toHaveLength(1);
      expect(results[0].id).toBe('test-product-1');
    });

    it('should search by partial name (case insensitive)', () => {
      const results = searchProducts('test');
      expect(results).toHaveLength(2);
      expect(results.map(p => p.id)).toContain('test-product-1');
      expect(results.map(p => p.id)).toContain('test-product-2');
    });

    it('should search by description', () => {
      const results = searchProducts('description 1');
      expect(results).toHaveLength(1);
      expect(results[0].id).toBe('test-product-1');
    });

    it('should search by product code', () => {
      const results = searchProducts('TEST-001');
      expect(results).toHaveLength(1);
      expect(results[0].id).toBe('test-product-1');
    });

    it('should search by category', () => {
      const results = searchProducts('probioticos');
      expect(results).toHaveLength(1);
      expect(results[0].id).toBe('test-product-2');
    });

    it('should return empty array for non-matching query', () => {
      const results = searchProducts('non-existent-term');
      expect(results).toEqual([]);
    });

    it('should handle special characters in search', () => {
      const results = searchProducts('TEST-001');
      expect(results).toHaveLength(1);
    });
  });

  describe('getProductById', () => {
    it('should return product by valid ID', () => {
      const product = getProductById('test-product-1');
      expect(product).toBeDefined();
      expect(product?.id).toBe('test-product-1');
      expect(product?.name).toBe('Test Product 1');
    });

    it('should return undefined for non-existent ID', () => {
      const product = getProductById('non-existent-id');
      expect(product).toBeUndefined();
    });

    it('should be case sensitive', () => {
      const product = getProductById('TEST-PRODUCT-1');
      expect(product).toBeUndefined();
    });
  });

  describe('getProductByCode', () => {
    it('should return product by valid code', () => {
      const product = getProductByCode('TEST-001');
      expect(product).toBeDefined();
      expect(product?.codigo).toBe('TEST-001');
      expect(product?.id).toBe('test-product-1');
    });

    it('should return undefined for non-existent code', () => {
      const product = getProductByCode('NON-EXISTENT');
      expect(product).toBeUndefined();
    });

    it('should be case sensitive', () => {
      const product = getProductByCode('test-001');
      expect(product).toBeUndefined();
    });
  });

  describe('validateProduct', () => {
    it('should return true for valid product', () => {
      const validProduct: OptimizedProduct = {
        id: 'valid-id',
        name: 'Valid Product',
        category: 'alimentos',
        codigo: 'VALID-001',
        slug: 'valid-product',
        description: 'Valid description',
        image: '/valid-image.jpg',
        assets: {} as any,
        metadata: {} as any,
        benefits: [],
        presentation: 'Valid presentation',
        specifications: {}
      };

      expect(validateProduct(validProduct)).toBe(true);
    });

    it('should return false for product without ID', () => {
      const invalidProduct = {
        name: 'Invalid Product',
        category: 'alimentos',
        codigo: 'INVALID-001'
      } as OptimizedProduct;

      expect(validateProduct(invalidProduct)).toBe(false);
    });

    it('should return false for product without name', () => {
      const invalidProduct = {
        id: 'invalid-id',
        category: 'alimentos',
        codigo: 'INVALID-001'
      } as OptimizedProduct;

      expect(validateProduct(invalidProduct)).toBe(false);
    });

    it('should return false for product without category', () => {
      const invalidProduct = {
        id: 'invalid-id',
        name: 'Invalid Product',
        codigo: 'INVALID-001'
      } as OptimizedProduct;

      expect(validateProduct(invalidProduct)).toBe(false);
    });

    it('should return false for product without codigo', () => {
      const invalidProduct = {
        id: 'invalid-id',
        name: 'Invalid Product',
        category: 'alimentos'
      } as OptimizedProduct;

      expect(validateProduct(invalidProduct)).toBe(false);
    });
  });

  describe('getAvailableCategories', () => {
    it('should return unique categories sorted alphabetically', () => {
      const categories = getAvailableCategories();
      expect(categories).toEqual(['alimentos', 'probioticos']);
    });

    it('should not include duplicates', () => {
      const categories = getAvailableCategories();
      const uniqueCategories = [...new Set(categories)];
      expect(categories).toEqual(uniqueCategories);
    });
  });

  describe('filterProducts', () => {
    it('should filter by category', () => {
      const filter: ProductFilter = { category: 'alimentos' };
      const result = filterProducts(filter);
      
      expect(result.products).toHaveLength(2);
      expect(result.totalCount).toBe(2);
      expect(result.hasMore).toBe(false);
      expect(result.filters).toEqual(filter);
    });

    it('should filter by subcategory', () => {
      const filter: ProductFilter = { subcategory: 'test-subcategory' };
      const result = filterProducts(filter);
      
      expect(result.products).toHaveLength(1);
      expect(result.products[0].id).toBe('test-product-1');
    });

    it('should filter by search query', () => {
      const filter: ProductFilter = { searchQuery: 'Test Product 1' };
      const result = filterProducts(filter);
      
      expect(result.products).toHaveLength(1);
      expect(result.products[0].id).toBe('test-product-1');
    });

    it('should filter by featured status', () => {
      const filter: ProductFilter = { featured: true };
      const result = filterProducts(filter);
      
      expect(result.products).toHaveLength(1);
      expect(result.products[0].id).toBe('test-product-1');
      expect(result.products[0].metadata.featured).toBe(true);
    });

    it('should filter by tags', () => {
      const filter: ProductFilter = { tags: ['tag1'] };
      const result = filterProducts(filter);
      
      expect(result.products).toHaveLength(1);
      expect(result.products[0].id).toBe('test-product-1');
    });

    it('should combine multiple filters', () => {
      const filter: ProductFilter = {
        category: 'alimentos',
        featured: false
      };
      const result = filterProducts(filter);
      
      expect(result.products).toHaveLength(1);
      expect(result.products[0].id).toBe('test-product-3');
    });

    it('should return empty result when no products match', () => {
      const filter: ProductFilter = {
        category: 'non-existent',
        featured: true
      };
      const result = filterProducts(filter);
      
      expect(result.products).toHaveLength(0);
      expect(result.totalCount).toBe(0);
    });

    it('should handle empty filter', () => {
      const filter: ProductFilter = {};
      const result = filterProducts(filter);
      
      expect(result.products).toHaveLength(3);
      expect(result.totalCount).toBe(3);
    });
  });

  describe('getRegistryStats', () => {
    it('should return registry stats object', () => {
      const stats = getRegistryStats();
      expect(stats).toBe(REGISTRY_STATS);
      expect(stats).toHaveProperty('totalProducts');
      expect(stats).toHaveProperty('totalAssets');
      expect(stats).toHaveProperty('completenessRate');
      expect(stats).toHaveProperty('categoryBreakdown');
    });

    it('should have correct category breakdown structure', () => {
      const stats = getRegistryStats();
      const categories = ['aditivos', 'alimentos', 'probioticos', 'quimicos', 'equipos'];
      
      categories.forEach(category => {
        expect(stats.categoryBreakdown).toHaveProperty(category);
        expect(stats.categoryBreakdown[category]).toHaveProperty('total');
        expect(stats.categoryBreakdown[category]).toHaveProperty('complete');
      });
    });
  });
});