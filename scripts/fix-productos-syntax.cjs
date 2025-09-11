const fs = require('fs');
const path = require('path');

// Leer el archivo actual
const archivoPath = path.join(__dirname, '../src/data/productos.ts');
let contenido = fs.readFileSync(archivoPath, 'utf8');

// Extraer solo la parte del array de productos
const inicioArray = contenido.indexOf('export const productos: Producto[] = [');
const finArray = contenido.lastIndexOf('];');

if (inicioArray === -1 || finArray === -1) {
  console.error('No se pudo encontrar el array de productos');
  process.exit(1);
}

const header = contenido.substring(0, inicioArray);
const arrayContent = contenido.substring(inicioArray + 'export const productos: Producto[] = ['.length, finArray);
const footer = '];';

// Dividir en objetos individuales
const objetos = [];
let nivel = 0;
let objetoActual = '';
let dentroDeString = false;
let charAnterior = '';

for (let i = 0; i < arrayContent.length; i++) {
  const char = arrayContent[i];
  
  if (char === '"' || char === "'") {
    if (charAnterior !== '\\') {
      dentroDeString = !dentroDeString;
    }
  }
  
  if (!dentroDeString) {
    if (char === '{') {
      nivel++;
    } else if (char === '}') {
      nivel--;
    }
  }
  
  objetoActual += char;
  
  if (nivel === 0 && char === '}') {
    // Fin de un objeto
    objetos.push(objetoActual.trim());
    objetoActual = '';
    // Saltar comas y espacios
    while (i + 1 < arrayContent.length && (arrayContent[i + 1] === ',' || arrayContent[i + 1] === '\n' || arrayContent[i + 1] === ' ')) {
      i++;
    }
  }
  
  charAnterior = char;
}

console.log(`Objetos encontrados: ${objetos.length}`);

// Función para completar un objeto con campos faltantes
function completarObjeto(objeto) {
  // Campos requeridos por defecto
  const camposRequeridos = {
    price: '0',
    inStock: 'true',
    featured: 'false',
    tags: '[]',
    createdAt: "'2024-01-01'",
    updatedAt: "'2024-01-01'"
  };
  
  let objetoCompleto = objeto;
  
  // Si el objeto no termina con }
  if (!objetoCompleto.trim().endsWith('}')) {
    objetoCompleto = objetoCompleto.trim() + '\n  }';
  }
  
  // Agregar campos faltantes antes del }
  const ultimaLlave = objetoCompleto.lastIndexOf('}');
  let antesDelCierre = objetoCompleto.substring(0, ultimaLlave);
  const cierre = objetoCompleto.substring(ultimaLlave);
  
  // Verificar qué campos faltan
  for (const [campo, valorDefault] of Object.entries(camposRequeridos)) {
    if (!antesDelCierre.includes(`${campo}:`)) {
      // Agregar coma si no termina con coma
      if (!antesDelCierre.trim().endsWith(',')) {
        antesDelCierre += ',';
      }
      antesDelCierre += `\n    ${campo}: ${valorDefault}`;
    }
  }
  
  return antesDelCierre + '\n  ' + cierre;
}

// Completar todos los objetos
const objetosCompletos = objetos.map(completarObjeto);

// Reconstruir el archivo
const nuevoContenido = header + 'export const productos: Producto[] = [\n' + 
  objetosCompletos.join(',\n') + '\n' + footer;

// Escribir el archivo corregido
fs.writeFileSync(archivoPath, nuevoContenido);
console.log('Archivo productos.ts corregido exitosamente');