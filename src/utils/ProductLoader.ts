import { Product, ProductSpec } from '../types/Product';

export class ProductLoader {
  private static readonly WEB_IMAGES_PATH = '/assets/images/productos';
  private static readonly WEB_DATASHEETS_PATH = '/assets/pdfs/productos';

  /**
   * Load COMBACID XL as pilot product
   */
  static loadCombacidXL(): Product {
    return {
      id: 'AD001',
      number: 1,
      name: 'COMBACID XL',
      category: 'aditivos',
      subcategory: 'Acidificantes',
      slug: 'combacid-xl',
      image: `${this.WEB_IMAGES_PATH}/AD001_COMBACID_XL.png`,
      gallery: [`${this.WEB_IMAGES_PATH}/AD001_COMBACID_XL.png`],
      description: 'Es un producto en polvo usado como aditivo alimentario que inhibe agentes patógenos que ocasionan enfermedades, se considera un promotor de crecimiento.',
      shortDescription: 'Aditivo alimentario que inhibe agentes patógenos y promueve crecimiento.',
      longDescription: 'Es un producto que al ser utilizado en el alimento actúa como un inhibidor de patógenos del tracto intestinal debido a la disminución del valor pH lo cual mejora el desempeño zootécnico de los camarones como la ganancia de peso, la eficiencia alimentaria y la supervivencia al mejorar la digestibilidad de los nutrientes de las dietas. Inhibe bacterias patógenas como V. parahemolítico, V. harveyi, V. vulnificus, E. coli y Salmolella sp.',
      specifications: [
        { key: 'Ácido Fórmico Libre', value: '33% Mín.' },
        { key: 'Ácido Propiónico Libre', value: '10% Mín.' },
        { key: 'Aplicación Laboratorio', value: 'Mysis 1-2, 2 pmm, Mysis 2-3, 4 ppm, PL1 - PL5, 5 ppm, PL5 en adelante 6 ppm' },
        { key: 'Frecuencia', value: 'dos veces al día' },
        { key: 'Camaronera', value: 'Pre-cría - engorde 2 – 6g/ kg de alimento' }
      ],
      hasDatasheet: true,
      datasheetUrl: `${this.WEB_DATASHEETS_PATH}/AD001_COMBACID_XL_ficha.pdf`,
      featured: true,
      tags: ['aditivos', 'acuicultura', 'prilabsa'],
      seoTitle: 'COMBACID XL - Aditivo Acidificante para Acuicultura | PRILABSA',
      metaDescription: 'COMBACID XL es un aditivo alimentario en polvo que inhibe agentes patógenos, mejora el desempeño zootécnico y actúa como promotor de crecimiento en camarones.',
      productCode: 'AD001',
      brand: 'PRILABSA',
      availability: 'InStock',
      priceCurrency: 'USD',
      lastUpdated: '2025-07-19T17:20:19.663573',
      keywords: ['aditivos', 'camarones', 'acidificantes', 'acuicultura', 'prilabsa'],
      benefits: [
        'Inhibe agentes patógenos del tracto intestinal',
        'Mejora el desempeño zootécnico de los camarones',
        'Aumenta la ganancia de peso',
        'Mejora la eficiencia alimentaria',
        'Aumenta la supervivencia',
        'Mejora la digestibilidad de nutrientes',
        'Inhibe bacterias patógenas como V. parahemolítico, V. harveyi, V. vulnificus, E. coli y Salmolella sp.'
      ],
      presentation: [
        '3kg en cubetas de plástico de 7L.',
        '4Kg en cubetas de plástico de 10L.'
      ],
      schemaType: 'Product'
    };
  }

  /**
   * Load all available products (currently just COMBACID XL as pilot)
   */
  static loadAllProducts(): Product[] {
    return [
      this.loadCombacidXL()
    ];
  }

  /**
   * Load product by code
   */
  static loadProductByCode(productCode: string): Product | null {
    if (productCode === 'AD001') {
      return this.loadCombacidXL();
    }
    return null;
  }

  /**
   * Load products by category
   */
  static loadProductsByCategory(category: string): Product[] {
    const allProducts = this.loadAllProducts();
    return allProducts.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Load featured products
   */
  static loadFeaturedProducts(): Product[] {
    const allProducts = this.loadAllProducts();
    return allProducts.filter(product => product.featured);
  }

  /**
   * Search products by term
   */
  static searchProducts(searchTerm: string): Product[] {
    const allProducts = this.loadAllProducts();
    const term = searchTerm.toLowerCase();
    
    return allProducts.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.tags.some(tag => tag.toLowerCase().includes(term)) ||
      product.keywords.some(keyword => keyword.toLowerCase().includes(term))
    );
  }
}