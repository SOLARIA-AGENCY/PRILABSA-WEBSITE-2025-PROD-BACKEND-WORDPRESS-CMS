const fs = require('fs');
const path = require('path');

// Leer el archivo completo desde el commit anterior
const archivoCompleto = fs.readFileSync('/tmp/productos_completo.ts', 'utf8');

// IDs de los 7 productos de alimentos permitidos
const productosAlimentosPermitidos = [
  'prod-201', // LARVA Z-PLUS
  'prod-202', // EZ LARVA
  'prod-003', // CISTOS DE ARTEMIA
  'prod-002', // ESPIRULINA
  'prod-020', // ARTEMIA ADULTA CONGELADA
  'prod-021', // CALAMARES
  'prod-022'  // MEJILLONES
];

// Extraer productos del archivo completo
const regex = /\{[\s\S]*?\}/g;
const matches = archivoCompleto.match(regex);

if (!matches) {
  console.error('No se pudieron extraer productos del archivo');
  process.exit(1);
}

const productosExtraidos = [];

matches.forEach(match => {
  // Verificar si es un producto de alimentos permitido
  const esAlimentoPermitido = productosAlimentosPermitidos.some(id => match.includes(`id: '${id}'`));
  
  // Verificar si es un producto de aditivos o equipos
  const esAditivoOEquipo = match.includes("category: 'aditivos'") || match.includes("category: 'equipos'");
  
  if (esAlimentoPermitido || esAditivoOEquipo) {
    productosExtraidos.push(match);
  }
});

console.log(`Productos extraídos: ${productosExtraidos.length}`);

// Crear el nuevo archivo productos.ts
const nuevoArchivo = `import { Product } from '../types/Product';

export type Producto = Product;

export const productos: Producto[] = [
${productosExtraidos.join(',\n')}
];
`;

// Escribir el archivo
fs.writeFileSync(path.join(__dirname, '../src/data/productos.ts'), nuevoArchivo);
console.log('Archivo productos.ts restaurado exitosamente');