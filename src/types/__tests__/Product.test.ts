import { Product, ProductAssets, ProductSpecifications } from '../Product';

describe('Product Types', () => {
  describe('ProductAssets', () => {
    it('should have correct image structure', () => {
      const assets: ProductAssets = {
        image: {
          path: '/test-image.jpg',
          alt: 'Test Image'
        }
      };

      expect(assets.image.path).toBe('/test-image.jpg');
      expect(assets.image.alt).toBe('Test Image');
    });

    it('should allow optional PDF structure', () => {
      const assetsWithPdf: ProductAssets = {
        image: {
          path: '/test-image.jpg',
          alt: 'Test Image'
        },
        pdf: {
          path: '/test-pdf.pdf',
          downloadUrl: '/download/test-pdf.pdf'
        }
      };

      expect(assetsWithPdf.pdf?.path).toBe('/test-pdf.pdf');
      expect(assetsWithPdf.pdf?.downloadUrl).toBe('/download/test-pdf.pdf');
    });

    it('should work without PDF', () => {
      const assetsWithoutPdf: ProductAssets = {
        image: {
          path: '/test-image.jpg',
          alt: 'Test Image'
        }
      };

      expect(assetsWithoutPdf.pdf).toBeUndefined();
    });
  });

  describe('ProductSpecifications', () => {
    it('should allow all optional string properties', () => {
      const specs: ProductSpecifications = {
        dosage: 'Test dosage',
        application: 'Test application',
        storage: 'Test storage',
        composition: 'Test composition',
        presentation: 'Test presentation',
        benefits: 'Test benefits'
      };

      expect(specs.dosage).toBe('Test dosage');
      expect(specs.application).toBe('Test application');
      expect(specs.storage).toBe('Test storage');
      expect(specs.composition).toBe('Test composition');
      expect(specs.presentation).toBe('Test presentation');
      expect(specs.benefits).toBe('Test benefits');
    });

    it('should work with empty specifications', () => {
      const emptySpecs: ProductSpecifications = {};
      
      expect(emptySpecs.dosage).toBeUndefined();
      expect(emptySpecs.application).toBeUndefined();
      expect(emptySpecs.storage).toBeUndefined();
    });

    it('should work with partial specifications', () => {
      const partialSpecs: ProductSpecifications = {
        dosage: 'Test dosage',
        storage: 'Test storage'
      };

      expect(partialSpecs.dosage).toBe('Test dosage');
      expect(partialSpecs.storage).toBe('Test storage');
      expect(partialSpecs.application).toBeUndefined();
    });
  });

  describe('Product', () => {
    it('should have all required properties', () => {
      const product: Product = {
        id: 'test-product-1',
        name: 'Test Product',
        description: 'Test description',
        category: 'alimentos',
        slug: 'test-product',
        assets: {
          image: {
            path: '/test-image.jpg',
            alt: 'Test Product'
          }
        },
        specifications: {},
        benefits: [],
        presentation: 'Test presentation',
        featured: false,
        hasDatasheet: false
      };

      expect(product.id).toBe('test-product-1');
      expect(product.name).toBe('Test Product');
      expect(product.description).toBe('Test description');
      expect(product.category).toBe('alimentos');
      expect(product.slug).toBe('test-product');
      expect(product.featured).toBe(false);
      expect(product.hasDatasheet).toBe(false);
    });

    it('should allow featured products', () => {
      const featuredProduct: Product = {
        id: 'featured-product',
        name: 'Featured Product',
        description: 'Featured description',
        category: 'nutricion-animal',
        slug: 'featured-product',
        assets: {
          image: {
            path: '/featured-image.jpg',
            alt: 'Featured Product'
          }
        },
        specifications: {},
        benefits: [],
        presentation: 'Featured presentation',
        featured: true,
        hasDatasheet: true
      };

      expect(featuredProduct.featured).toBe(true);
      expect(featuredProduct.hasDatasheet).toBe(true);
    });

    it('should allow products with benefits array', () => {
      const productWithBenefits: Product = {
        id: 'product-with-benefits',
        name: 'Product with Benefits',
        description: 'Product description',
        category: 'salud-animal',
        slug: 'product-with-benefits',
        assets: {
          image: {
            path: '/product-image.jpg',
            alt: 'Product with Benefits'
          }
        },
        specifications: {
          dosage: 'Test dosage',
          application: 'Test application'
        },
        benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3'],
        presentation: 'Product presentation',
        featured: false,
        hasDatasheet: true
      };

      expect(productWithBenefits.benefits).toHaveLength(3);
      expect(productWithBenefits.benefits[0]).toBe('Benefit 1');
      expect(productWithBenefits.specifications.dosage).toBe('Test dosage');
    });

    it('should allow different product categories', () => {
      const categories = ['alimentos', 'nutricion-animal', 'salud-animal', 'acuicultura'];
      
      categories.forEach(category => {
        const product: Product = {
          id: `product-${category}`,
          name: `Product ${category}`,
          description: `Description for ${category}`,
          category: category as any,
          slug: `product-${category}`,
          assets: {
            image: {
              path: `/image-${category}.jpg`,
              alt: `Product ${category}`
            }
          },
          specifications: {},
          benefits: [],
          presentation: `Presentation ${category}`,
          featured: false,
          hasDatasheet: false
        };

        expect(product.category).toBe(category);
      });
    });

    it('should allow products with PDF assets', () => {
      const productWithPdf: Product = {
        id: 'product-with-pdf',
        name: 'Product with PDF',
        description: 'Product description',
        category: 'alimentos',
        slug: 'product-with-pdf',
        assets: {
          image: {
            path: '/product-image.jpg',
            alt: 'Product with PDF'
          },
          pdf: {
            path: '/product-datasheet.pdf',
            downloadUrl: '/download/product-datasheet.pdf'
          }
        },
        specifications: {},
        benefits: [],
        presentation: 'Product presentation',
        featured: false,
        hasDatasheet: true
      };

      expect(productWithPdf.assets.pdf?.path).toBe('/product-datasheet.pdf');
      expect(productWithPdf.assets.pdf?.downloadUrl).toBe('/download/product-datasheet.pdf');
      expect(productWithPdf.hasDatasheet).toBe(true);
    });

    it('should validate slug format', () => {
      const product: Product = {
        id: 'test-product',
        name: 'Test Product Name',
        description: 'Test description',
        category: 'alimentos',
        slug: 'test-product-name',
        assets: {
          image: {
            path: '/test-image.jpg',
            alt: 'Test Product'
          }
        },
        specifications: {},
        benefits: [],
        presentation: 'Test presentation',
        featured: false,
        hasDatasheet: false
      };

      // Slug should be URL-friendly
      expect(product.slug).toMatch(/^[a-z0-9-]+$/);
      expect(product.slug).not.toContain(' ');
      expect(product.slug).not.toContain('_');
    });
  });
});