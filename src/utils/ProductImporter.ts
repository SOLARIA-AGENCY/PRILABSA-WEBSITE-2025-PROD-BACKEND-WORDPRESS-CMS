import { Product, ProductSpec } from '../types/Product';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export class ProductImporter {
  private static readonly PRODUCTS_BASE_PATH = '/Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/PRODUCTOS-PRILABSA/PRILABSA_PRODUCTOS_WEB_READY';
  private static readonly WEB_IMAGES_PATH = '/assets/images/productos';
  private static readonly WEB_DATASHEETS_PATH = '/assets/pdfs/productos';

  /**
   * Parse markdown frontmatter and content to Product interface
   */
  static parseMetadata(mdContent: string, productPath: string): Product {
    const { data: frontmatter, content } = matter(mdContent);
    
    // Extract product info from path
    const pathParts = productPath.split('/');
    const category = pathParts[pathParts.length - 4] || '';
    const subcategory = pathParts[pathParts.length - 3] || '';
    const productFolder = pathParts[pathParts.length - 1] || '';
    
    // Parse specifications from content
    const specifications = this.extractSpecificationsFromContent(content);
    const benefits = this.extractBenefitsFromContent(content);
    const presentation = this.extractPresentationFromContent(content);
    
    // Generate slug from title
    const slug = this.generateSlug(frontmatter.title || productFolder);
    
    return {
      id: frontmatter.product_code || productFolder,
      number: this.extractProductNumber(frontmatter.product_code || productFolder),
      name: frontmatter.title || '',
      category: category,
      subcategory: subcategory,
      slug: slug,
      image: `${this.WEB_IMAGES_PATH}/${productFolder}.png`,
      gallery: [`${this.WEB_IMAGES_PATH}/${productFolder}.png`],
      description: frontmatter.description || '',
      shortDescription: frontmatter.description || '',
      longDescription: this.extractLongDescription(content),
      specifications: specifications,
      hasDatasheet: true,
      datasheetUrl: `${this.WEB_DATASHEETS_PATH}/${productFolder}_ficha.pdf`,
      featured: this.isFeaturedProduct(frontmatter.product_code),
      tags: frontmatter.tags || [],
      seoTitle: frontmatter.title || '',
      metaDescription: frontmatter.description || '',
      productCode: frontmatter.product_code || '',
      brand: frontmatter.brand || 'PRILABSA',
      availability: frontmatter.availability || 'InStock',
      priceCurrency: frontmatter.price_currency || 'USD',
      lastUpdated: frontmatter.last_updated || new Date().toISOString(),
      keywords: frontmatter.keywords ? frontmatter.keywords.split(', ') : [],
      benefits: benefits,
      presentation: presentation,
      schemaType: frontmatter.schema_type || 'Product'
    };
  }

  /**
   * Map available images for a product
   */
  static mapProductImages(productPath: string): string[] {
    const productFolder = path.basename(productPath);
    const images = [`${this.WEB_IMAGES_PATH}/${productFolder}.png`];
    
    // Check for additional gallery images (if directory exists)
    // For now, return main image. Can be expanded to check gallery folder
    return images;
  }

  /**
   * Link datasheet PDF if available
   */
  static linkDatasheets(productPath: string): string | undefined {
    const productFolder = path.basename(productPath);
    return `${this.WEB_DATASHEETS_PATH}/${productFolder}_ficha.pdf`;
  }

  /**
   * Generate complete Product from product path
   */
  static async generateProduct(productPath: string): Promise<Product | null> {
    try {
      const productFolder = path.basename(productPath);
      const mdFilePath = path.join(productPath, `${productFolder}.md`);
      
      // Read markdown file
      const mdContent = await fs.readFile(mdFilePath, 'utf-8');
      
      // Parse to Product interface
      const product = this.parseMetadata(mdContent, productPath);
      
      return product;
    } catch (error) {
      console.error(`Error generating product from ${productPath}:`, error);
      return null;
    }
  }

  /**
   * Load all products from the PRODUCTOS-PRILABSA directory
   */
  static async loadAllProducts(): Promise<Product[]> {
    const products: Product[] = [];
    
    try {
      const categories = await fs.readdir(this.PRODUCTS_BASE_PATH);
      
      for (const category of categories) {
        const categoryPath = path.join(this.PRODUCTS_BASE_PATH, category);
        const categoryStats = await fs.stat(categoryPath);
        
        if (!categoryStats.isDirectory()) continue;
        
        const subcategories = await fs.readdir(categoryPath);
        
        for (const subcategory of subcategories) {
          const subcategoryPath = path.join(categoryPath, subcategory);
          const subcategoryStats = await fs.stat(subcategoryPath);
          
          if (!subcategoryStats.isDirectory()) continue;
          
          const productFolders = await fs.readdir(subcategoryPath);
          
          for (const productFolder of productFolders) {
            const productPath = path.join(subcategoryPath, productFolder);
            const productStats = await fs.stat(productPath);
            
            if (!productStats.isDirectory()) continue;
            
            const product = await this.generateProduct(productPath);
            if (product) {
              products.push(product);
            }
          }
        }
      }
      
      return products.sort((a, b) => a.number - b.number);
    } catch (error) {
      console.error('Error loading products:', error);
      return [];
    }
  }

  /**
   * Load specific product by code (e.g., "AD001")
   */
  static async loadProductByCode(productCode: string): Promise<Product | null> {
    try {
      const categories = await fs.readdir(this.PRODUCTS_BASE_PATH);
      
      for (const category of categories) {
        const categoryPath = path.join(this.PRODUCTS_BASE_PATH, category);
        const subcategories = await fs.readdir(categoryPath);
        
        for (const subcategory of subcategories) {
          const subcategoryPath = path.join(categoryPath, subcategory);
          const productFolders = await fs.readdir(subcategoryPath);
          
          for (const productFolder of productFolders) {
            if (productFolder.startsWith(productCode)) {
              const productPath = path.join(subcategoryPath, productFolder);
              return await this.generateProduct(productPath);
            }
          }
        }
      }
      
      return null;
    } catch (error) {
      console.error(`Error loading product ${productCode}:`, error);
      return null;
    }
  }

  // Helper methods
  private static extractProductNumber(productCode: string): number {
    const match = productCode.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  private static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  }

  private static extractSpecificationsFromContent(content: string): ProductSpec[] {
    const specs: ProductSpec[] = [];
    const lines = content.split('\n');
    
    let inSpecSection = false;
    for (const line of lines) {
      if (line.includes('## Especificaciones Técnicas') || line.includes('ANÁLISIS GARANTIZADO')) {
        inSpecSection = true;
        continue;
      }
      
      if (inSpecSection && line.startsWith('##')) {
        inSpecSection = false;
        continue;
      }
      
      if (inSpecSection && line.includes(':')) {
        const [key, ...valueParts] = line.replace(/^[•\-*]\s*/, '').split(':');
        if (key && valueParts.length > 0) {
          specs.push({
            key: key.trim(),
            value: valueParts.join(':').trim()
          });
        }
      }
    }
    
    return specs;
  }

  private static extractBenefitsFromContent(content: string): string[] {
    const benefits: string[] = [];
    const lines = content.split('\n');
    
    let inBenefitsSection = false;
    for (const line of lines) {
      if (line.includes('## Beneficios Principales')) {
        inBenefitsSection = true;
        continue;
      }
      
      if (inBenefitsSection && line.startsWith('##')) {
        inBenefitsSection = false;
        continue;
      }
      
      if (inBenefitsSection && line.trim() && !line.startsWith('#')) {
        benefits.push(line.trim());
      }
    }
    
    return benefits;
  }

  private static extractPresentationFromContent(content: string): string[] {
    const presentation: string[] = [];
    const lines = content.split('\n');
    
    let inPresentationSection = false;
    for (const line of lines) {
      if (line.includes('## Presentación y Empaque')) {
        inPresentationSection = true;
        continue;
      }
      
      if (inPresentationSection && line.startsWith('##')) {
        inPresentationSection = false;
        continue;
      }
      
      if (inPresentationSection && line.startsWith('•')) {
        presentation.push(line.replace(/^•\s*/, '').trim());
      }
    }
    
    return presentation;
  }

  private static extractLongDescription(content: string): string {
    const lines = content.split('\n');
    let description = '';
    let foundDescription = false;
    
    for (const line of lines) {
      if (line.startsWith('## Descripción')) {
        foundDescription = true;
        continue;
      }
      
      if (foundDescription && line.startsWith('##')) {
        break;
      }
      
      if (foundDescription && line.trim()) {
        description += line.trim() + ' ';
      }
    }
    
    return description.trim();
  }

  private static isFeaturedProduct(productCode: string): boolean {
    // COMBACID XL is featured as pilot product
    const featuredCodes = ['AD001'];
    return featuredCodes.includes(productCode);
  }
}