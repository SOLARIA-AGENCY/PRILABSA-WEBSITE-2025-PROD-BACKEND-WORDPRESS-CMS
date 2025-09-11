const fs = require('fs');
const path = require('path');

// Leer el archivo de equipos generado
const equiposOutputPath = path.join(__dirname, 'equipos-output.ts');
const equiposContent = fs.readFileSync(equiposOutputPath, 'utf8');

// Extraer el array de productos
const arrayMatch = equiposContent.match(/export const equiposProducts = (\[[\s\S]*\]);/);
if (!arrayMatch) {
  console.error('No se pudo extraer el array de productos');
  process.exit(1);
}

const equiposArray = arrayMatch[1];

// Evaluar el array para obtener los objetos
let productos;
try {
  productos = eval(equiposArray);
} catch (error) {
  console.error('Error al evaluar el array:', error);
  process.exit(1);
}

// Función para convertir un producto al formato completo
function convertToFullFormat(producto) {
  // Convertir specifications string a array de objetos
  const specsArray = [];
  if (producto.specifications && producto.specifications !== '[Especificaciones pendientes de completar]') {
    const specs = producto.specifications.split(' ');
    for (let i = 0; i < specs.length - 1; i += 2) {
      if (specs[i] && specs[i + 1]) {
        specsArray.push({
          key: specs[i].replace(':', ''),
          value: specs[i + 1]
        });
      }
    }
  }

  // Convertir benefits string a array
  const benefitsArray = [];
  if (producto.benefits && producto.benefits !== '[Beneficios pendientes de completar]') {
    const benefits = producto.benefits.split('- ').filter(b => b.trim());
    benefitsArray.push(...benefits.map(b => b.trim()));
  }

  // Convertir presentation string a array
  const presentationArray = [];
  if (producto.presentation && producto.presentation !== '[Información de presentación pendiente]') {
    const presentation = producto.presentation.split(' ');
    presentationArray.push(...presentation.filter(p => p.trim()));
  }

  return {
    id: producto.id,
    number: producto.number,
    slug: producto.slug,
    name: producto.name,
    category: producto.category,
    subcategory: producto.subcategory,
    image: producto.image || '',
    gallery: producto.gallery || [],
    description: producto.description || '',
    shortDescription: producto.description ? producto.description.substring(0, 100) + '...' : '',
    longDescription: producto.description || '',
    specifications: specsArray,
    hasDatasheet: !!producto.datasheetUrl,
    datasheetUrl: producto.datasheetUrl || '',
    featured: false,
    tags: ["equipos", "acuicultura", "prilabsa"],
    seoTitle: `${producto.name} para Acuicultura - PRILABSA`,
    metaDescription: producto.description ? producto.description.substring(0, 160) : '',
    productCode: producto.productCode,
    brand: 'PRILABSA',
    availability: 'InStock',
    priceCurrency: 'USD',
    lastUpdated: '2025-07-21T23:39:18.565Z',
    keywords: [producto.subcategory, "equipos", "acuicultura", "prilabsa"],
    benefits: benefitsArray,
    presentation: presentationArray,
    schemaType: 'Product'
  };
}

// Convertir todos los productos
const convertedProducts = productos.map(convertToFullFormat);

// Generar el código TypeScript
let output = '// PRODUCTOS EQUIPOS CONVERTIDOS\n';
output += '// Total de productos: ' + convertedProducts.length + '\n';
output += '// Generado: ' + new Date().toISOString() + '\n\n';

convertedProducts.forEach((producto, index) => {
  if (index > 0) output += ',\n';
  output += '  {\n';
  output += `    id: '${producto.id}',\n`;
  output += `    number: ${producto.number},\n`;
  output += `    slug: '${producto.slug}',\n`;
  output += `    name: '${producto.name}',\n`;
  output += `    category: '${producto.category}',\n`;
  output += `    subcategory: '${producto.subcategory}',\n`;
  output += `    image: '${producto.image}',\n`;
  output += `    gallery: ${JSON.stringify(producto.gallery)},\n`;
  output += `    description: '${producto.description.replace(/'/g, "\\'").replace(/\n/g, ' ')}',\n`;
  output += `    shortDescription: '${producto.shortDescription.replace(/'/g, "\\'").replace(/\n/g, ' ')}',\n`;
  output += `    longDescription: '${producto.longDescription.replace(/'/g, "\\'").replace(/\n/g, ' ')}',\n`;
  output += `    specifications: [\n`;
  producto.specifications.forEach((spec, i) => {
    if (i > 0) output += ',\n';
    output += `      { key: '${spec.key}', value: '${spec.value}' }`;
  });
  output += `\n    ],\n`;
  output += `    hasDatasheet: ${producto.hasDatasheet},\n`;
  output += `    datasheetUrl: '${producto.datasheetUrl}',\n`;
  output += `    featured: ${producto.featured},\n`;
  output += `    tags: ${JSON.stringify(producto.tags)},\n`;
  output += `    seoTitle: '${producto.seoTitle}',\n`;
  output += `    metaDescription: '${producto.metaDescription.replace(/'/g, "\\'").replace(/\n/g, ' ')}',\n`;
  output += `    productCode: '${producto.productCode}',\n`;
  output += `    brand: '${producto.brand}',\n`;
  output += `    availability: '${producto.availability}',\n`;
  output += `    priceCurrency: '${producto.priceCurrency}',\n`;
  output += `    lastUpdated: '${producto.lastUpdated}',\n`;
  output += `    keywords: ${JSON.stringify(producto.keywords)},\n`;
  output += `    benefits: [\n`;
  producto.benefits.forEach((benefit, i) => {
    if (i > 0) output += ',\n';
    output += `      "${benefit.replace(/"/g, '\\"').replace(/\n/g, ' ')}"`;
  });
  output += `\n    ],\n`;
  output += `    presentation: [\n`;
  producto.presentation.forEach((pres, i) => {
    if (i > 0) output += ',\n';
    output += `      "${pres.replace(/"/g, '\\"').replace(/\n/g, ' ')}"`;
  });
  output += `\n    ],\n`;
  output += `    schemaType: '${producto.schemaType}'\n`;
  output += '  }';
});

// Escribir el archivo de salida
const outputPath = path.join(__dirname, 'equipos-converted.ts');
fs.writeFileSync(outputPath, output, 'utf8');

console.log(`✅ Conversión completada: ${convertedProducts.length} productos convertidos`);
console.log(`📁 Archivo generado: ${outputPath}`);