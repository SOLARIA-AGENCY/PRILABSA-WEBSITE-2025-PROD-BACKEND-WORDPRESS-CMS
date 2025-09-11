import { productToOptimized, productsToOptimized, filterOptimizedByCategory } from '../productAdapter';
import { Product } from '../../types/Product';
import { OptimizedProduct } from '../../data/products/types';

describe('productAdapter', () => {
  const mockProduct: Product = {
    id: 'test-product-1',
    name: 'Test Product',
    description: 'Test description',
    category: 'alimentos',
    slug: 'test-product',
    assets: {
      image: {
        path: '/test-image.jpg',
        alt: 'Test Product'
      },
      pdf: {
        path: '/test-pdf.pdf',
        downloadUrl: '/download/test-pdf.pdf'
      }
    },
    specifications: {
      dosage: 'Test dosage',
      application: 'Test application',
      storage: 'Test storage'
    },
    benefits: ['Benefit 1', 'Benefit 2'],
    presentation: 'Test presentation',
    featured: true,
    hasDatasheet: true
  };

  // Mock product with extended properties for adapter
  const mockExtendedProduct = {
    ...mockProduct,
    image: '/test-image.jpg',
    gallery: ['/test-image.jpg', '/gallery-1.jpg', '/gallery-2.jpg'],
    datasheetUrl: '/test-datasheet.pdf',
    productCode: 'TEST-001',
    subcategory: 'test-subcategory',
    tags: ['tag1', 'tag2'],
    keywords: ['keyword1', 'keyword2'],
    lastUpdated: '2025-01-01'
  };

  describe('productToOptimized', () => {
    it('should convert a Product to OptimizedProduct', () => {
      const result = productToOptimized(mockExtendedProduct as any);

      expect(result).toHaveProperty('id', 'test-product-1');
      expect(result).toHaveProperty('name', 'Test Product');
      expect(result).toHaveProperty('description', 'Test description');
      expect(result).toHaveProperty('category', 'alimentos');
      expect(result).toHaveProperty('slug', 'test-product');
    });

    it('should create main image correctly', () => {
      const result = productToOptimized(mockExtendedProduct as any);

      expect(result.assets.images.main).toEqual({
        filename: 'test-image.jpg',
        path: '/test-image.jpg',
        extension: 'jpg',
        size: 0,
        exists: true,
        webp: '/test-image.webp',
        fallback: '/test-image.jpg',
        thumbnail: '/test-image_thumb.jpg',
        alt: 'Test Product - alimentos',
        width: 400,
        height: 300
      });
    });

    it('should create gallery images correctly', () => {
      const result = productToOptimized(mockExtendedProduct as any);

      expect(result.assets.images.gallery).toHaveLength(2); // Excluding main image
      expect(result.assets.images.gallery?.[0]).toEqual({
        filename: 'gallery-1.jpg',
        path: '/gallery-1.jpg',
        extension: 'jpg',
        size: 0,
        exists: true,
        webp: '/gallery-1.webp',
        fallback: '/gallery-1.jpg',
        thumbnail: '/gallery-1_thumb.jpg',
        alt: 'Test Product - Vista adicional',
        width: 400,
        height: 300
      });
    });

    it('should create PDF when datasheet is available', () => {
      const result = productToOptimized(mockExtendedProduct as any);

      expect(result.assets.pdf).toEqual({
        filename: 'TEST-001_Test_Product.pdf',
        path: '/test-datasheet.pdf',
        size: '2.5MB',
        downloadUrl: '/test-datasheet.pdf',
        exists: true,
        url: '/test-datasheet.pdf',
        lastModified: '2025-01-01'
      });
    });

    it('should not create PDF when datasheet is not available', () => {
      const productWithoutDatasheet = {
        ...mockExtendedProduct,
        hasDatasheet: false,
        datasheetUrl: undefined
      };

      const result = productToOptimized(productWithoutDatasheet as any);

      expect(result.assets.pdf).toBeUndefined();
    });

    it('should create metadata correctly', () => {
      const result = productToOptimized(mockExtendedProduct as any);

      expect(result.metadata).toEqual({
        priority: 1, // Featured product
        featured: true,
        lastUpdated: '2025-01-01',
        searchTags: ['tag1', 'tag2', 'keyword1', 'keyword2'],
        category: 'alimentos',
        subcategory: 'test-subcategory'
      });
    });

    it('should set priority to 5 for non-featured products', () => {
      const nonFeaturedProduct = {
        ...mockExtendedProduct,
        featured: false
      };

      const result = productToOptimized(nonFeaturedProduct as any);

      expect(result.metadata.priority).toBe(5);
      expect(result.metadata.featured).toBe(false);
    });

    it('should handle products with single gallery image', () => {
      const singleImageProduct = {
        ...mockExtendedProduct,
        gallery: ['/test-image.jpg'] // Only main image
      };

      const result = productToOptimized(singleImageProduct as any);

      expect(result.assets.images.gallery).toBeUndefined();
    });

    it('should handle products without gallery', () => {
      const noGalleryProduct = {
        ...mockExtendedProduct,
        gallery: []
      };

      const result = productToOptimized(noGalleryProduct as any);

      expect(result.assets.images.gallery).toBeUndefined();
    });

    it('should handle image extensions correctly', () => {
      const pngProduct = {
        ...mockExtendedProduct,
        image: '/test-image.png',
        gallery: ['/test-image.png']
      };

      const result = productToOptimized(pngProduct as any);

      expect(result.assets.images.main.extension).toBe('png');
      expect(result.assets.images.main.webp).toBe('/test-image.webp');
      expect(result.assets.images.main.thumbnail).toBe('/test-image_thumb.png');
    });

    it('should handle products with special characters in name', () => {
      const specialNameProduct = {
        ...mockExtendedProduct,
        name: 'Test Product (Special) & More!',
        productCode: 'TEST-002'
      };

      const result = productToOptimized(specialNameProduct as any);

      expect(result.assets.pdf?.filename).toBe('TEST-002_Test_Product__Special____More_.pdf');
    });

    it('should preserve all original product properties', () => {
      const result = productToOptimized(mockExtendedProduct as any);

      expect(result.benefits).toEqual(['Benefit 1', 'Benefit 2']);
      expect(result.presentation).toBe('Test presentation');
      expect(result.specifications).toEqual({
        dosage: 'Test dosage',
        application: 'Test application',
        storage: 'Test storage'
      });
      expect(result.tags).toEqual(['tag1', 'tag2']);
    });
  });

  describe('productsToOptimized', () => {
    it('should convert an array of Products to OptimizedProducts', () => {
      const products = [mockExtendedProduct, { ...mockExtendedProduct, id: 'test-product-2' }] as any[];
      const result = productsToOptimized(products);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('test-product-1');
      expect(result[1].id).toBe('test-product-2');
    });

    it('should handle empty array', () => {
      const result = productsToOptimized([]);
      expect(result).toEqual([]);
    });

    it('should maintain order of products', () => {
      const products = [
        { ...mockExtendedProduct, id: 'product-1', name: 'Product 1' },
        { ...mockExtendedProduct, id: 'product-2', name: 'Product 2' },
        { ...mockExtendedProduct, id: 'product-3', name: 'Product 3' }
      ] as any[];

      const result = productsToOptimized(products);

      expect(result[0].name).toBe('Product 1');
      expect(result[1].name).toBe('Product 2');
      expect(result[2].name).toBe('Product 3');
    });
  });

  describe('filterOptimizedByCategory', () => {
    const optimizedProducts: OptimizedProduct[] = [
      { ...mockExtendedProduct, id: 'product-1', category: 'alimentos' } as OptimizedProduct,
      { ...mockExtendedProduct, id: 'product-2', category: 'probioticos' } as OptimizedProduct,
      { ...mockExtendedProduct, id: 'product-3', category: 'alimentos' } as OptimizedProduct,
      { ...mockExtendedProduct, id: 'product-4', category: 'quimicos' } as OptimizedProduct
    ];

    it('should return all products when category is "all"', () => {
      const result = filterOptimizedByCategory(optimizedProducts, 'all');
      expect(result).toHaveLength(4);
      expect(result).toEqual(optimizedProducts);
    });

    it('should filter products by specific category', () => {
      const result = filterOptimizedByCategory(optimizedProducts, 'alimentos');
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('product-1');
      expect(result[1].id).toBe('product-3');
    });

    it('should return empty array for non-existent category', () => {
      const result = filterOptimizedByCategory(optimizedProducts, 'non-existent');
      expect(result).toEqual([]);
    });

    it('should handle empty products array', () => {
      const result = filterOptimizedByCategory([], 'alimentos');
      expect(result).toEqual([]);
    });

    it('should filter probioticos category correctly', () => {
      const result = filterOptimizedByCategory(optimizedProducts, 'probioticos');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('product-2');
      expect(result[0].category).toBe('probioticos');
    });

    it('should filter quimicos category correctly', () => {
      const result = filterOptimizedByCategory(optimizedProducts, 'quimicos');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('product-4');
      expect(result[0].category).toBe('quimicos');
    });

    it('should be case sensitive', () => {
      const result = filterOptimizedByCategory(optimizedProducts, 'ALIMENTOS');
      expect(result).toEqual([]);
    });
  });
});