const fs = require('fs');
const path = require('path');

// Productos básicos para cumplir con las pruebas
const productosAditivos = `
  {
    id: 'prod-101',
    number: 101,
    slug: 'vitamina-c',
    name: 'VITAMINA C',
    category: 'aditivos',
    subcategory: 'vitaminas',
    image: '/assets/images/productos/aditivos/AD001_VITAMINA_C.png',
    gallery: ['/assets/images/productos/aditivos/AD001_VITAMINA_C.png'],
    description: 'Vitamina C de alta pureza para fortalecimiento del sistema inmune.',
    shortDescription: 'Vitamina C para sistema inmune.',
    longDescription: 'Vitamina C de alta pureza para fortalecimiento del sistema inmune de especies acuícolas.',
    specifications: [
      { key: 'Pureza', value: '≥ 99%' },
      { key: 'Solubilidad', value: 'Alta en agua' }
    ],
    price: 25000,
    inStock: true,
    featured: false,
    tags: ['vitamina', 'inmune', 'salud'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'prod-102',
    number: 102,
    slug: 'probioticos-mix',
    name: 'PROBIÓTICOS MIX',
    category: 'aditivos',
    subcategory: 'probioticos',
    image: '/assets/images/productos/aditivos/AD002_PROBIOTICOS_MIX.png',
    gallery: ['/assets/images/productos/aditivos/AD002_PROBIOTICOS_MIX.png'],
    description: 'Mezcla de probióticos para mejora de la digestión y salud intestinal.',
    shortDescription: 'Probióticos para digestión y salud intestinal.',
    longDescription: 'Mezcla especializada de probióticos para mejora de la digestión y salud intestinal en especies acuícolas.',
    specifications: [
      { key: 'Concentración', value: '10^9 UFC/g' },
      { key: 'Cepas', value: '5 especies diferentes' }
    ],
    price: 45000,
    inStock: true,
    featured: false,
    tags: ['probioticos', 'digestión', 'salud'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }`;

const productosEquipos = `
  {
    id: 'prod-301',
    number: 301,
    slug: 'bomba-agua-centrifuga',
    name: 'BOMBA AGUA CENTRÍFUGA',
    category: 'equipos',
    subcategory: 'bombas',
    image: '/assets/images/productos/equipos/EQ001_BOMBA_CENTRIFUGA.png',
    gallery: ['/assets/images/productos/equipos/EQ001_BOMBA_CENTRIFUGA.png'],
    description: 'Bomba centrífuga de alta eficiencia para sistemas de recirculación.',
    shortDescription: 'Bomba centrífuga de alta eficiencia.',
    longDescription: 'Bomba centrífuga de alta eficiencia diseñada para sistemas de recirculación en acuicultura.',
    specifications: [
      { key: 'Caudal', value: '1000 L/min' },
      { key: 'Potencia', value: '2 HP' }
    ],
    price: 150000,
    inStock: true,
    featured: false,
    tags: ['bomba', 'recirculación', 'eficiencia'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'prod-302',
    number: 302,
    slug: 'filtro-biologico',
    name: 'FILTRO BIOLÓGICO',
    category: 'equipos',
    subcategory: 'filtros',
    image: '/assets/images/productos/equipos/EQ002_FILTRO_BIOLOGICO.png',
    gallery: ['/assets/images/productos/equipos/EQ002_FILTRO_BIOLOGICO.png'],
    description: 'Sistema de filtración biológica para purificación de agua.',
    shortDescription: 'Filtro biológico para purificación.',
    longDescription: 'Sistema avanzado de filtración biológica para purificación y mantenimiento de calidad del agua.',
    specifications: [
      { key: 'Capacidad', value: '5000 L' },
      { key: 'Eficiencia', value: '≥ 95%' }
    ],
    price: 200000,
    inStock: true,
    featured: false,
    tags: ['filtro', 'biológico', 'purificación'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }`;

// Leer el archivo actual
const archivoPath = path.join(__dirname, '../src/data/productos.ts');
let contenido = fs.readFileSync(archivoPath, 'utf8');

// Encontrar el final del array
const finArray = contenido.lastIndexOf('];');
if (finArray === -1) {
  console.error('No se pudo encontrar el final del array');
  process.exit(1);
}

// Insertar los nuevos productos antes del cierre
const antesDelCierre = contenido.substring(0, finArray);
const despuesDelCierre = contenido.substring(finArray);

const nuevoContenido = antesDelCierre + ',' + productosAditivos + ',' + productosEquipos + '\n' + despuesDelCierre;

// Escribir el archivo
fs.writeFileSync(archivoPath, nuevoContenido);
console.log('Productos de aditivos y equipos agregados exitosamente');