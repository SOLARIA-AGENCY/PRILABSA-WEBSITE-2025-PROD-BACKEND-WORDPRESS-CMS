#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colores para la consola
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(color, message) {
  console.log(`${color}${message}${colors.reset}`);
}

function logHeader(message) {
  console.log(`\n${colors.bold}${colors.blue}=== ${message} ===${colors.reset}`);
}

function verificarFotosProductos() {
  logHeader('VERIFICACIÓN DE FOTOGRAFÍAS DE PRODUCTOS PRILABSA');
  
  const directorioImagenes = path.join(__dirname, '../public/assets/images/productos');
  const directorioFuente = path.join(__dirname, '../MODULO PRODUCTOS PRILABSA CATALOGO JULIO 2025/FOTOS PRODUCTOS CODIGOS');
  
  // Verificar que el directorio de imágenes existe
  if (!fs.existsSync(directorioImagenes)) {
    log(colors.red, `❌ ERROR: Directorio de imágenes no encontrado: ${directorioImagenes}`);
    return;
  }
  
  // Obtener lista de archivos de imagen en directorio público
  const archivosImagenPublico = fs.readdirSync(directorioImagenes)
    .filter(archivo => archivo.endsWith('.png'))
    .sort();
  
  logHeader('ANÁLISIS DEL DIRECTORIO PÚBLICO');
  log(colors.blue, `📁 Directorio: ${directorioImagenes}`);
  log(colors.green, `📊 Total de imágenes PNG: ${archivosImagenPublico.length}`);
  
  // Mostrar estadísticas de tamaño
  let totalSize = 0;
  let minSize = Infinity;
  let maxSize = 0;
  
  archivosImagenPublico.forEach(archivo => {
    const rutaCompleta = path.join(directorioImagenes, archivo);
    const stats = fs.statSync(rutaCompleta);
    const sizeKB = stats.size / 1024;
    totalSize += sizeKB;
    minSize = Math.min(minSize, sizeKB);
    maxSize = Math.max(maxSize, sizeKB);
  });
  
  const avgSize = totalSize / archivosImagenPublico.length;
  
  log(colors.blue, `📏 Tamaño promedio: ${avgSize.toFixed(2)} KB`);
  log(colors.blue, `📏 Tamaño mínimo: ${minSize.toFixed(2)} KB`);
  log(colors.blue, `📏 Tamaño máximo: ${maxSize.toFixed(2)} KB`);
  log(colors.blue, `📏 Tamaño total: ${(totalSize / 1024).toFixed(2)} MB`);
  
  logHeader('MUESTRA DE IMÁGENES (PRIMERAS 15)');
  archivosImagenPublico.slice(0, 15).forEach((archivo, index) => {
    const rutaCompleta = path.join(directorioImagenes, archivo);
    const stats = fs.statSync(rutaCompleta);
    const sizeKB = (stats.size / 1024).toFixed(2);
    log(colors.green, `${(index + 1).toString().padStart(2, '0')}. ✅ ${archivo} (${sizeKB} KB)`);
  });
  
  if (archivosImagenPublico.length > 15) {
    log(colors.blue, `... y ${archivosImagenPublico.length - 15} imágenes más`);
  }
  
  logHeader('COMPARACIÓN CON DIRECTORIO FUENTE');
  
  if (fs.existsSync(directorioFuente)) {
    const archivosFuente = fs.readdirSync(directorioFuente)
      .filter(archivo => archivo.endsWith('.png'))
      .sort();
    
    log(colors.blue, `📁 Directorio fuente: ${directorioFuente}`);
    log(colors.blue, `📊 Imágenes en directorio fuente: ${archivosFuente.length}`);
    log(colors.blue, `📊 Imágenes en directorio público: ${archivosImagenPublico.length}`);
    
    // Verificar sincronización
    const faltantesEnPublico = archivosFuente.filter(archivo => !archivosImagenPublico.includes(archivo));
    const sobrantesEnPublico = archivosImagenPublico.filter(archivo => !archivosFuente.includes(archivo));
    
    if (faltantesEnPublico.length > 0) {
      log(colors.red, `\n❌ Imágenes faltantes en directorio público (${faltantesEnPublico.length}):`);
      faltantesEnPublico.forEach(archivo => log(colors.red, `   - ${archivo}`));
    }
    
    if (sobrantesEnPublico.length > 0) {
      log(colors.yellow, `\n⚠️  Imágenes extra en directorio público (${sobrantesEnPublico.length}):`);
      sobrantesEnPublico.forEach(archivo => log(colors.yellow, `   - ${archivo}`));
    }
    
    if (faltantesEnPublico.length === 0 && sobrantesEnPublico.length === 0) {
      log(colors.green, `\n✅ Directorios perfectamente sincronizados`);
    }
    
    // Calcular porcentaje de sincronización
    const porcentajeSincronizacion = ((archivosFuente.length - faltantesEnPublico.length) / archivosFuente.length * 100).toFixed(1);
    log(colors.bold, `📈 Porcentaje de sincronización: ${porcentajeSincronizacion}%`);
    
  } else {
    log(colors.yellow, `⚠️  Directorio fuente no encontrado: ${directorioFuente}`);
  }
  
  logHeader('VERIFICACIÓN DE NOMENCLATURA');
  
  // Verificar patrones de nomenclatura
  const patronesEncontrados = {
    aditivos: archivosImagenPublico.filter(f => f.startsWith('AD')).length,
    alimentos: archivosImagenPublico.filter(f => f.startsWith('AL')).length,
    equipos: archivosImagenPublico.filter(f => f.startsWith('EQ')).length,
    probioticos: archivosImagenPublico.filter(f => f.startsWith('PB')).length,
    quimicos: archivosImagenPublico.filter(f => f.startsWith('QU')).length,
    otros: archivosImagenPublico.filter(f => !['AD', 'AL', 'EQ', 'PB', 'QU'].some(prefix => f.startsWith(prefix))).length
  };
  
  Object.entries(patronesEncontrados).forEach(([categoria, cantidad]) => {
    if (cantidad > 0) {
      const color = cantidad > 0 ? colors.green : colors.yellow;
      log(color, `📂 ${categoria.toUpperCase()}: ${cantidad} imágenes`);
    }
  });
  
  logHeader('RESUMEN FINAL');
  
  const estadoGeneral = archivosImagenPublico.length > 100 ? 'EXCELENTE' : 
                       archivosImagenPublico.length > 50 ? 'BUENO' : 'NECESITA ATENCIÓN';
  
  const colorEstado = estadoGeneral === 'EXCELENTE' ? colors.green :
                     estadoGeneral === 'BUENO' ? colors.yellow : colors.red;
  
  log(colorEstado, `🎯 Estado general: ${estadoGeneral}`);
  log(colors.blue, `📊 Total de fotografías verificadas: ${archivosImagenPublico.length}`);
  log(colors.blue, `💾 Espacio total ocupado: ${(totalSize / 1024).toFixed(2)} MB`);
  
  if (archivosImagenPublico.length >= 100) {
    log(colors.green, '\n🎉 ¡EXCELENTE! El catálogo de fotografías está completo y bien organizado.');
  }
  
  logHeader('ACCESO WEB');
  log(colors.blue, '🌐 Las imágenes están disponibles en:');
  log(colors.blue, '   http://localhost:5173/productos');
  log(colors.blue, '   Ruta base: /assets/images/productos/');
  
  console.log('\n');
}

// Ejecutar verificación
verificarFotosProductos();