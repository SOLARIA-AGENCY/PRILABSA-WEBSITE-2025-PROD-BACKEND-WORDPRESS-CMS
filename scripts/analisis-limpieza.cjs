const fs = require('fs');
const path = require('path');

// Directorios y archivos esenciales para producción
const essentialItems = [
  'src/',
  'public/',
  'resources/',
  'package.json',
  'package-lock.json',
  'vite.config.ts',
  'tsconfig.json',
  'tsconfig.node.json',
  'tailwind.config.cjs',
  'postcss.config.js',
  'index.html',
  'README.md',
  'LICENSE', // si existe
  '.gitignore',
  'env.example',
  '.env.production' // si se usa
];

// Directorios y archivos que NO son esenciales para producción
const nonEssentialItems = [
  '.archive/',
  '.github/',
  '.husky/',
  '.playwright-mcp/',
  '.temp-docs/',
  '.vercel/',
  '.workspace/',
  'automation/',
  'backup-assets-migration/',
  'backup-ftp/',
  'docs/',
  'docs-backup/',
  '*.md', // excepto README.md y LICENSE
  '*.cjs', // scripts de desarrollo
  '*.js', // scripts de desarrollo
  '*.sh', // scripts shell
  '.htaccess*', // excepto el principal si es necesario
  '*.bak',
  '*.txt',
  '*.json', // archivos de reporte, excepto configuraciones esenciales
  'lighthouse-report.html',
  'lighthouse-report.json',
  'stats.html',
  'product-scan-results.json',
  'audit-*',
  'analyze-*',
  'debug-*',
  'test-*',
  'fix-*',
  'generate-*',
  'update-*',
  'verify-*',
  'sync-*',
  'extract-*',
  'find-*',
  'clean-*',
  'upload-*',
  'purge-*',
  'CLAUDE.md',
  'AUDITORIA-TECNICA-EJECUTIVA.md',
  'AUDIT_PROMPT_ASSET_PIPELINE.md',
  'CHANGELOG.md',
  'CRITICAL-ASSET-FIX-REPORT.md',
  'EMERGENCY-RESTORE-DESCRIPTIONS-FROM-CSV.cjs',
  'GODADDY-DNS-FIX.md',
  'PLAN_COMPLETITUD_2025.md',
  'PRODUCTION-DELIVERY-REPORT.md',
  'PROMPT-AGENTE-RESTAURACION-DESCRIPCIONES.md',
  'PROMPT_CLAUDE_CODE.md',
  'PROMPT_CLAUDE_IMAGES_FIX.md',
  'PROMPT_COPY_PASTE.txt',
  'PROMPT_GESTION_IMAGENES_PRODUCTOS.md',
  'REPORTE-MORIARTY-SABOTAGE.md',
  'REPORTE_ESTADO_PROYECTO.md',
  'TAREAS_SPRINTS.md',
  'prompt-traduccion-productos.md'
];

console.log('=== ANÁLISIS DE LIMPIEZA ===');
console.log('\nElementos esenciales para producción:');
essentialItems.forEach(item => console.log(`  ✅ ${item}`));

console.log('\nElementos NO esenciales para producción:');
nonEssentialItems.forEach(item => console.log(`  ❌ ${item}`));

console.log('\n=== RECOMENDACIONES ===');
console.log('1. Mantener todos los archivos en src/, public/ y resources/');
console.log('2. Mantener package.json y archivos de configuración de build');
console.log('3. Eliminar archivos de desarrollo, debugging y reporting');
console.log('4. Eliminar documentación interna y prompts');
console.log('5. Eliminar scripts de mantenimiento y migración');
console.log('6. Mantener solo los archivos necesarios para ejecutar la aplicación');