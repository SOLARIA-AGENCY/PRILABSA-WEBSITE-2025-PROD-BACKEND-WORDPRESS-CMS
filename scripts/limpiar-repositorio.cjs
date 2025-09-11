const fs = require('fs');
const path = require('path');

// Directorios que deben eliminarse completamente (desarrollo, debugging, documentación interna)
const directoriosEliminar = [
  '.archive',
  '.github',
  '.husky',
  '.playwright-mcp',
  '.temp-docs',
  '.vercel',
  '.workspace',
  'automation',
  'backup-assets-migration',
  'backup-ftp',
  'docs',
  'docs-backup',
  'MODULO PRODUCTOS PRILABSA CATALOGO JULIO 2025'
];

// Archivos individuales que deben eliminarse (documentación interna, scripts de desarrollo)
const archivosEliminar = [
  // Documentación interna
  'AUDITORIA-TECNICA-EJECUTIVA.md',
  'AUDIT_PROMPT_ASSET_PIPELINE.md',
  'CHANGELOG.md',
  'CLAUDE.md',
  'CRITICAL-ASSET-FIX-REPORT.md',
  'EMERGENCY-RESTORE-DESCRIPTIONS-FROM-CSV.cjs',
  'GODADDY-DNS-FIX.md',
  'INSTRUCCIONES-CLIENTE-DEPLOYMENT.md',
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
  'prompt-traduccion-productos.md',
  
  // Archivos de reporte y análisis
  'asset-processing-report.json',
  'audit-assets-comparison-report.json',
  'audit-production-images-report.json',
  'audit-results.json',
  'eq-codes-analysis-report.json',
  'lighthouse-report.html',
  'lighthouse-report.json',
  'product-scan-results.json',
  'stats.html',
  'translation-validation-report.json',
  
  // Archivos de configuración y backup
  '.htaccess-final',
  '.htaccess-fixed',
  '.htaccess-godaddy',
  '.htaccess-working',
  '.htaccess.bak',
  '.htaccess.deployment',
  '.ftpconfig.json',
  
  // Scripts de desarrollo y debugging
  'analyze-duplicates.js',
  'analyze-eq-codes.cjs',
  'analyze-missing-chemical-images.cjs',
  'analyze-missing-images.cjs',
  'analyze-products.js',
  'audit-assets.js',
  'audit-assets-comparison.cjs',
  'audit-descripcion-productos.js',
  'audit-image-urls.cjs',
  'audit-sabotaged-products-emergency.cjs',
  'clean-and-fix-all-images.sh',
  'clean-and-migrate-assets.cjs',
  'debug-al023.js',
  'debug-ftp-images.js',
  'debug-images-dom.cjs',
  'debug-images.js',
  'debug-product-battle.cjs',
  'debug-product.js',
  'extract-products-csv.cjs',
  'final-inventory-validation.js',
  'find-duplicates.js',
  'fix-all-images.sh',
  'fix-all-sabotage-emergency.cjs',
  'fix-assets-issues.js',
  'fix-caracteres-especiales-emergency.cjs',
  'fix-duplicate-eq007.js',
  'fix-duplicate-eq013.js',
  'fix-ftp-images.js',
  'fix-image-routes-battle-mode.cjs',
  'generate-full-registry.js',
  'generate-inventory-report.js',
  'generate-product-loader-from-catalog.cjs',
  'purge-cache.cjs',
  'server-htaccess.txt',
  'server-index.html',
  'setup-cloudflare-domain.md',
  'sync-modules-normalizer.cjs',
  'test-alternative-urls.cjs',
  'test-feature-flags.html',
  'test-lazy-loading.cjs',
  'test-local-images.cjs',
  'test-product-loading.js',
  'update-product-descriptions.js',
  'update-productos-from-csv.cjs',
  'upload-htaccess-only.js',
  'upload-test-file.js',
  'verify-htaccess.js',
  'verify-images-load.js',
  'verify-product-images.cjs',
  
  // Scripts de despliegue y verificación
  'test-ftp-connection.js',
  'test-github-actions-deployment.js',
  'verify-dns-fix.js',
  'verify-ftp-credentials.js',
  'verify-products-integrity.js',
  'verify-staging-setup.js',
  'verify-wordpress-setup.js',
  
  // Nuestros scripts de análisis y limpieza
  'scripts/analisis-limpieza.cjs',
  'scripts/archivos-eliminables.json',
  'scripts/identificar-archivos-eliminables.cjs',
  'scripts/analyze-missing-images.cjs',
  'scripts/fix-image-extensions.cjs',
  'scripts/fix-image-references.cjs',
  'scripts/test-image-loading.cjs',
  'scripts/verify-all-images.cjs'
];

// Función para eliminar directorios recursivamente
function eliminarDirectorio(dirPath) {
  if (fs.existsSync(dirPath)) {
    const items = fs.readdirSync(dirPath);
    
    items.forEach(item => {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        eliminarDirectorio(fullPath);
      } else {
        fs.unlinkSync(fullPath);
        console.log(`🗑️  Eliminado: ${fullPath}`);
      }
    });
    
    fs.rmdirSync(dirPath);
    console.log(`🗑️  Eliminado directorio: ${dirPath}`);
  }
}

// Función para eliminar archivos individuales
function eliminarArchivo(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`🗑️  Eliminado: ${filePath}`);
  }
}

console.log('=== INICIANDO LIMPIEZA DE REPOSITORIO ===');

// Eliminar directorios
console.log('\n🗑️  Eliminando directorios innecesarios...');
directoriosEliminar.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir);
  eliminarDirectorio(fullPath);
});

// Eliminar archivos individuales
console.log('\n🗑️  Eliminando archivos innecesarios...');
archivosEliminar.forEach(file => {
  const fullPath = path.join(__dirname, '..', file);
  eliminarArchivo(fullPath);
});

console.log('\n✅ LIMPIEZA COMPLETADA');
console.log('El repositorio ahora contiene solo los archivos esenciales para producción.');