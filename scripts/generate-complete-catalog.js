import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to generate slug
function generateSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Helper function to parse specifications
function parseSpecifications(especificaciones) {
  if (!especificaciones || especificaciones.trim() === '') return [];
  
  return especificaciones
    .split(/[\n\r]+/)
    .map(spec => spec.trim())
    .filter(spec => spec.length > 0)
    .map(spec => spec.replace(/^[•\-\*]\s*/, ''));
}

// Helper function to parse benefits
function parseBenefits(beneficios) {
  if (!beneficios || beneficios.trim() === '') return [];
  
  return beneficios
    .split(/[\n\r]+/)
    .map(benefit => benefit.trim())
    .filter(benefit => benefit.length > 0)
    .map(benefit => benefit.replace(/^[•\-\*]\s*/, ''));
}

// Helper function to parse presentations
function parsePresentations(presentacion) {
  if (!presentacion || presentacion.trim() === '') return [];
  
  return presentacion
    .split(/[,;\n\r]+/)
    .map(pres => pres.trim())
    .filter(pres => pres.length > 0);
}

// Helper function to determine category mapping
function mapCategory(categoria) {
  const categoryMap = {
    'ADITIVOS': 'aditivos',
    'ALIMENTOS': 'alimentos',
    'EQUIPOS': 'equipos',
    'PROBIOTICOS': 'probioticos',
    'QUIMICOS': 'quimicos'
  };
  
  return categoryMap[categoria.toUpperCase()] || 'otros';
}

// Helper function to determine subcategory
function determineSubcategory(categoria, nombre) {
  const subcategoryMap = {
    'ADITIVOS': 'mejoradores',
    'ALIMENTOS': 'balanceados',
    'EQUIPOS': 'medicion',
    'PROBIOTICOS': 'bacterias',
    'QUIMICOS': 'tratamiento'
  };
  
  return subcategoryMap[categoria.toUpperCase()] || 'general';
}

async function generateCompleteCatalog() {
  try {
    console.log('🚀 Iniciando generación del catálogo completo...');
    
    // Read the JSON catalog
    const catalogPath = path.join(__dirname, '..', 'MODULO PRODUCTOS PRILABSA CATALOGO JULIO 2025', 'PRILABSA_CATALOGO_WEB_2025.json');
    const catalogData = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    
    console.log(`📊 Procesando ${catalogData.productos.length} productos...`);
    
    // Convert products to OptimizedProduct format
    const optimizedProducts = catalogData.productos.map((product, index) => {
      const slug = generateSlug(product.nombre);
      const category = mapCategory(product.categoria);
      const subcategory = determineSubcategory(product.categoria, product.nombre);
      
      return {
        id: `prod-${product.codigo.toLowerCase()}`,
        productCode: product.codigo,
        name: product.nombre,
        slug: slug,
        description: product.descripcion || '',
        shortDescription: product.descripcion ? product.descripcion.substring(0, 150) + '...' : '',
        category: category,
        subcategory: subcategory,
        specifications: parseSpecifications(product.especificaciones),
        benefits: parseBenefits(product.beneficios),
        presentations: parsePresentations(product.presentacion),
        tags: [
          category,
          subcategory,
          product.categoria.toLowerCase(),
          ...product.nombre.toLowerCase().split(' ').filter(word => word.length > 2)
        ],
        featured: index < 10, // Mark first 10 as featured
        inStock: true,
        image: {
          src: `/assets/images/productos/${product.codigo}_${generateSlug(product.nombre).replace(/-/g, '_').toUpperCase()}.png`,
          alt: `${product.nombre} - PRILABSA`,
          width: 400,
          height: 400
        },
        assets: {
          images: [{
            src: `/assets/images/productos/${product.codigo}_${generateSlug(product.nombre).replace(/-/g, '_').toUpperCase()}.png`,
            alt: `${product.nombre} - PRILABSA`,
            width: 400,
            height: 400,
            type: 'main'
          }],
          pdfs: [{
            src: `/assets/pdfs/productos/${product.codigo}_${generateSlug(product.nombre).replace(/-/g, '_')}.pdf`,
            title: `Ficha Técnica - ${product.nombre}`,
            type: 'technical_sheet',
            size: '2MB'
          }]
        },
        metadata: {
          order: product.orden || index + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          version: '2025.1',
          source: 'PRILABSA_CATALOGO_WEB_2025'
        }
      };
    });
    
    // Generate catalog statistics
    const categoryStats = {};
    optimizedProducts.forEach(product => {
      categoryStats[product.category] = (categoryStats[product.category] || 0) + 1;
    });
    
    const catalogStats = {
      totalProducts: optimizedProducts.length,
      categories: Object.keys(categoryStats).length,
      categoryBreakdown: categoryStats,
      lastUpdated: new Date().toISOString(),
      version: '2025.1'
    };
    
    // Generate the TypeScript file content
    const tsContent = `// PRILABSA Product Catalog - Generated from PRILABSA_CATALOGO_WEB_2025.json
// Generated on: ${new Date().toISOString()}
// Total Products: ${optimizedProducts.length}

import type { OptimizedProduct } from '../types';

// Helper function to generate product slugs
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\\s-]/g, '') // Remove special characters
    .replace(/\\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Helper function to parse specifications
export function parseSpecifications(especificaciones: string): string[] {
  if (!especificaciones || especificaciones.trim() === '') return [];
  
  return especificaciones
    .split(/[\\n\\r]+/)
    .map(spec => spec.trim())
    .filter(spec => spec.length > 0)
    .map(spec => spec.replace(/^[•\\-\\*]\\s*/, ''));
}

// Helper function to parse benefits
export function parseBenefits(beneficios: string): string[] {
  if (!beneficios || beneficios.trim() === '') return [];
  
  return beneficios
    .split(/[\\n\\r]+/)
    .map(benefit => benefit.trim())
    .filter(benefit => benefit.length > 0)
    .map(benefit => benefit.replace(/^[•\\-\\*]\\s*/, ''));
}

// Helper function to parse presentations
export function parsePresentations(presentacion: string): string[] {
  if (!presentacion || presentacion.trim() === '') return [];
  
  return presentacion
    .split(/[,;\\n\\r]+/)
    .map(pres => pres.trim())
    .filter(pres => pres.length > 0);
}

// PRILABSA Product Catalog - Complete Dataset
export const productsJulio2025: OptimizedProduct[] = [
${optimizedProducts.map(product => `  {
    id: '${product.id}',
    productCode: '${product.productCode}',
    name: '${product.name.replace(/'/g, "\\'").replace(/"/g, '\\"')}',
    slug: '${product.slug}',
    description: '${product.description.replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, '\\n')}',
    shortDescription: '${product.shortDescription.replace(/'/g, "\\'").replace(/"/g, '\\"')}',
    category: '${product.category}',
    subcategory: '${product.subcategory}',
    specifications: [${product.specifications.map(spec => `'${spec.replace(/'/g, "\\'").replace(/"/g, '\\"')}'`).join(', ')}],
    benefits: [${product.benefits.map(benefit => `'${benefit.replace(/'/g, "\\'").replace(/"/g, '\\"')}'`).join(', ')}],
    presentations: [${product.presentations.map(pres => `'${pres.replace(/'/g, "\\'").replace(/"/g, '\\"')}'`).join(', ')}],
    tags: [${product.tags.map(tag => `'${tag}'`).join(', ')}],
    featured: ${product.featured},
    inStock: ${product.inStock},
    image: {
      src: '${product.image.src}',
      alt: '${product.image.alt.replace(/'/g, "\\'").replace(/"/g, '\\"')}',
      width: ${product.image.width},
      height: ${product.image.height}
    },
    assets: {
      images: [{
        src: '${product.assets.images[0].src}',
        alt: '${product.assets.images[0].alt.replace(/'/g, "\\'").replace(/"/g, '\\"')}',
        width: ${product.assets.images[0].width},
        height: ${product.assets.images[0].height},
        type: '${product.assets.images[0].type}'
      }],
      pdfs: [{
        src: '${product.assets.pdfs[0].src}',
        title: '${product.assets.pdfs[0].title.replace(/'/g, "\\'").replace(/"/g, '\\"')}',
        type: '${product.assets.pdfs[0].type}',
        size: '${product.assets.pdfs[0].size}'
      }]
    },
    metadata: {
      order: ${product.metadata.order},
      createdAt: '${product.metadata.createdAt}',
      updatedAt: '${product.metadata.updatedAt}',
      version: '${product.metadata.version}',
      source: '${product.metadata.source}'
    }
  }`).join(',\n')}
];

// Catalog Statistics
export const catalogStats = {
  totalProducts: ${catalogStats.totalProducts},
  categories: ${catalogStats.categories},
  categoryBreakdown: {
${Object.entries(catalogStats.categoryBreakdown).map(([key, value]) => `    ${key}: ${value}`).join(',\n')}
  },
  lastUpdated: '${catalogStats.lastUpdated}',
  version: '${catalogStats.version}'
};

// Helper functions for product management
export function getProductsByCategory(category: string): OptimizedProduct[] {
  return productsJulio2025.filter(product => product.category === category);
}

export function searchProducts(query: string): OptimizedProduct[] {
  const searchTerm = query.toLowerCase();
  return productsJulio2025.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    product.productCode.toLowerCase().includes(searchTerm)
  );
}

export function getFeaturedProducts(): OptimizedProduct[] {
  return productsJulio2025.filter(product => product.featured);
}

export function getProductByCode(code: string): OptimizedProduct | undefined {
  return productsJulio2025.find(product => product.productCode === code);
}

export function getProductById(id: string): OptimizedProduct | undefined {
  return productsJulio2025.find(product => product.id === id);
}

export function getAvailableCategories(): string[] {
  return [...new Set(productsJulio2025.map(product => product.category))];
}

export function getAvailableSubcategories(category?: string): string[] {
  const products = category ? getProductsByCategory(category) : productsJulio2025;
  return [...new Set(products.map(product => product.subcategory))];
}

// Export default for compatibility
export default productsJulio2025;
`;
    
    // Write the TypeScript file
    const outputPath = path.join(__dirname, '..', 'src', 'data', 'products', 'julio-2025.ts');
    fs.writeFileSync(outputPath, tsContent, 'utf8');
    
    console.log('✅ Catálogo completo generado exitosamente!');
    console.log(`📁 Archivo generado: ${outputPath}`);
    console.log(`📊 Productos procesados: ${optimizedProducts.length}`);
    console.log(`🏷️ Categorías: ${Object.keys(categoryStats).join(', ')}`);
    console.log('📈 Estadísticas por categoría:');
    Object.entries(categoryStats).forEach(([category, count]) => {
      console.log(`   - ${category}: ${count} productos`);
    });
    
    // Generate processing report
    const report = {
      timestamp: new Date().toISOString(),
      totalProducts: optimizedProducts.length,
      categories: categoryStats,
      processingStats: {
        successful: optimizedProducts.length,
        errors: 0,
        warnings: 0
      },
      outputFile: outputPath
    };
    
    const reportPath = path.join(__dirname, 'catalog-generation-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
    console.log(`📋 Reporte generado: ${reportPath}`);
    
  } catch (error) {
    console.error('❌ Error generando el catálogo:', error);
    process.exit(1);
  }
}

// Execute the script
generateCompleteCatalog();