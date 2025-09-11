import fs from 'fs';

const productosFile = '/Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/src/data/productos.ts';

async function main() {
  console.log('🔧 Normalizando categorías en productos.ts...');
  
  // Leer el archivo
  let content = fs.readFileSync(productosFile, 'utf8');
  
  // Reemplazar categorías en mayúsculas por minúsculas
  const replacements = {
    '"category": "ADITIVOS"': '"category": "aditivos"',
    '"category": "ALIMENTOS"': '"category": "alimentos"', 
    '"category": "EQUIPOS"': '"category": "equipos"',
    '"category": "PROBIOTICOS"': '"category": "probioticos"',
    '"category": "QUIMICOS"': '"category": "quimicos"'
  };
  
  let changesMade = 0;
  
  for (const [oldValue, newValue] of Object.entries(replacements)) {
    const regex = new RegExp(oldValue.replace(/"/g, '\\"'), 'g');
    const matches = content.match(regex);
    if (matches) {
      content = content.replace(regex, newValue);
      changesMade += matches.length;
      console.log(`✅ Reemplazados ${matches.length} casos de ${oldValue}`);
    }
  }
  
  // Escribir el archivo actualizado
  fs.writeFileSync(productosFile, content);
  
  console.log(`\n🎉 Normalización completada!`);
  console.log(`📊 Total de cambios realizados: ${changesMade}`);
  
  // Verificar el resultado
  const finalContent = fs.readFileSync(productosFile, 'utf8');
  const productCount = (finalContent.match(/"productCode":/g) || []).length;
  
  console.log(`\n=== VERIFICACIÓN FINAL ===`);
  console.log(`📊 Total de productos: ${productCount}`);
  
  // Contar por categorías
  const categories = {
    aditivos: (finalContent.match(/"category": "aditivos"/g) || []).length,
    alimentos: (finalContent.match(/"category": "alimentos"/g) || []).length,
    equipos: (finalContent.match(/"category": "equipos"/g) || []).length,
    probioticos: (finalContent.match(/"category": "probioticos"/g) || []).length,
    quimicos: (finalContent.match(/"category": "quimicos"/g) || []).length
  };
  
  console.log(`\n📋 Conteo por categorías:`);
  for (const [cat, count] of Object.entries(categories)) {
    console.log(`   ${cat}: ${count}`);
  }
  
  const totalByCategory = Object.values(categories).reduce((a, b) => a + b, 0);
  console.log(`\n🎯 Total verificado: ${totalByCategory}/101`);
  
  if (totalByCategory === 101) {
    console.log('✅ ¡ÉXITO! Se alcanzaron los 101 productos esperados');
  } else {
    console.log(`⚠️  Advertencia: Se esperaban 101 productos, se encontraron ${totalByCategory}`);
  }
}

main().catch(console.error);