const fs = require('fs');
const path = require('path');

// Función para verificar si un archivo debe mantenerse
function shouldBeKept(filePath) {
  const basename = path.basename(filePath);
  const ext = path.extname(filePath);
  
  // Archivos esenciales que siempre deben mantenerse
  const essentialFiles = [
    'package.json', 'package-lock.json', 'vite.config.ts', 'tsconfig.json', 
    'tsconfig.node.json', 'tailwind.config.cjs', 'postcss.config.js', 'index.html',
    'README.md', '.gitignore', 'env.example'
  ];
  
  if (essentialFiles.includes(basename)) {
    return true;
  }
  
  // Directorios esenciales
  const essentialDirs = ['src', 'public', 'resources'];
  if (essentialDirs.some(dir => filePath.includes(dir))) {
    return true;
  }
  
  return false;
}

// Función para verificar si un archivo es de desarrollo/debugging
function isDevelopmentFile(filePath) {
  const basename = path.basename(filePath).toLowerCase();
  
  // Patrones de archivos de desarrollo
  const devPatterns = [
    'debug-', 'test-', 'analyze-', 'audit-', 'fix-', 'generate-', 
    'update-', 'verify-', 'sync-', 'extract-', 'find-', 'clean-',
    'upload-', 'purge-', 'prompt-', 'claude', 'reporte-', 'plan_'
  ];
  
  return devPatterns.some(pattern => basename.includes(pattern));
}

// Función para verificar si un archivo es un reporte o documentación interna
function isInternalDoc(filePath) {
  const basename = path.basename(filePath).toLowerCase();
  const ext = path.extname(filePath).toLowerCase();
  
  // Extensiones de documentación interna
  const docExtensions = ['.md', '.txt', '.html', '.json'];
  const internalDocs = [
    'changelog', 'license', 'claude', 'auditoria', 'reporte', 'plan', 
    'prompt', 'sabotage', 'dns', 'htaccess', 'bak', 'stats'
  ];
  
  return docExtensions.includes(ext) && 
         (internalDocs.some(doc => basename.includes(doc)) || 
          basename.includes('-report') || 
          basename.includes('report-'));
}

// Función para verificar si un directorio es de desarrollo
function isDevDirectory(dirPath) {
  const basename = path.basename(dirPath).toLowerCase();
  const devDirs = [
    '.archive', '.github', '.husky', '.playwright-mcp', '.temp-docs', 
    '.vercel', '.workspace', 'automation', 'backup-', 'docs', 'docs-backup'
  ];
  
  return devDirs.some(dir => basename.includes(dir));
}

// Obtener todos los archivos y directorios
function getAllItems(dir, fileList = []) {
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    if (item.startsWith('.')) return; // Ignorar archivos ocultos
    
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (!isDevDirectory(fullPath) && !shouldBeKept(fullPath)) {
        fileList.push({ path: fullPath, type: 'directory' });
        getAllItems(fullPath, fileList);
      }
    } else {
      if (!shouldBeKept(fullPath) && (isDevelopmentFile(fullPath) || isInternalDoc(fullPath))) {
        fileList.push({ path: fullPath, type: 'file' });
      }
    }
  });
  
  return fileList;
}

// Identificar archivos eliminables
const eliminableItems = getAllItems('.');

console.log(`Encontrados ${eliminableItems.length} elementos eliminables:`);

const files = eliminableItems.filter(item => item.type === 'file');
const dirs = eliminableItems.filter(item => item.type === 'directory');

console.log(`\n📁 Directorios (${dirs.length}):`);
dirs.forEach(dir => console.log(`  ${dir.path}`));

console.log(`\n📄 Archivos (${files.length}):`);
files.forEach(file => console.log(`  ${file.path}`));

// Guardar lista de archivos eliminables
const eliminableList = {
  timestamp: new Date().toISOString(),
  directories: dirs.map(d => d.path),
  files: files.map(f => f.path),
  total: eliminableItems.length
};

fs.writeFileSync(
  path.join(__dirname, 'archivos-eliminables.json'), 
  JSON.stringify(eliminableList, null, 2)
);

console.log(`\n✅ Lista de archivos eliminables guardada en scripts/archivos-eliminables.json`);