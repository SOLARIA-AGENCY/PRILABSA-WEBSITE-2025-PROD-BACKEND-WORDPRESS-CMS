import { OptimizedProduct } from '../../data/products/types';

export const mockProducts: OptimizedProduct[] = [
  {
    id: 'test-product-1',
    codigo: 'T001',
    name: 'Test Product 1',
    description: 'Test description 1',
    category: 'alimentos',
    slug: 'test-product-1',
    specifications: [{ key: 'Test', value: 'Value' }],
    assets: { image: { filename: 'test-product-1.jpg', path: '/img/test-product-1.jpg', extension: '.jpg', size: 0, exists: true } },
    metadata: { lastUpdated: '2025-01-01' },
  },
  {
    id: 'test-product-2',
    codigo: 'T002',
    name: 'Test Product 2',
    description: 'Test description 2',
    category: 'alimentos',
    slug: 'test-product-2',
    specifications: [{ key: 'Test', value: 'Value' }],
    assets: { image: { filename: 'test-product-2.jpg', path: '/img/test-product-2.jpg', extension: '.jpg', size: 0, exists: true } },
    metadata: { lastUpdated: '2025-01-01' },
  },
  {
    id: 'test-product-3',
    codigo: 'T003',
    name: 'Test Product 3',
    description: 'Test description 3',
    category: 'aditivos',
    slug: 'test-product-3',
    specifications: [{ key: 'Test', value: 'Value' }],
    assets: { image: { filename: 'test-product-3.jpg', path: '/img/test-product-3.jpg', extension: '.jpg', size: 0, exists: true } },
    metadata: { lastUpdated: '2025-01-01' },
  },
  {
    id: 'product-without-image',
    codigo: 'T004',
    name: 'Product Without Image',
    description: 'Product for testing image fallback',
    category: 'alimentos',
    slug: 'product-without-image',
    specifications: [{ key: 'Test', value: 'Value' }],
    assets: { image: { filename: '', path: '', extension: '', size: 0, exists: false } },
    metadata: { lastUpdated: '2025-01-01' },
  },
];

export const productos = mockProducts;
export const getProductos = () => mockProducts;
export const getProductosByCategory = (category: string) =>
  mockProducts.filter(p => p.category === category);