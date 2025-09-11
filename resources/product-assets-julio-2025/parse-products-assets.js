const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Configuración de rutas
const BASE_DIR = '/Users/nazcamedia/Desktop/MODULO PRODUCTOS PRILABSA JULIO 2025';
const CSV_FILE = path.join(BASE_DIR, 'productos_inventario.csv');
const FOTOS_SOURCE = path.join(BASE_DIR, 'FOTOS SIN PARSEAR');
const PDFS_SOURCE = path.join(BASE_DIR, 'FICHAS TÉCNICAS');
const FOTOS_DEST = path.join(BASE_DIR, 'FOTOS PRODUCTO CODIGO');
const PDFS_DEST = path.join(BASE_DIR, 'PDF PRODUCTOS CODIGO');

// Función para calcular similitud de texto (Levenshtein distance)
function levenshteinDistance(str1, str2) {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    return matrix[str2.length][str1.length];
}

// Función para normalizar nombres de archivos
function normalizeFileName(fileName) {
    return fileName
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

// Función para calcular score de matching
function calculateMatchScore(productName, fileName, productCode) {
    const normalizedProduct = normalizeFileName(productName);
    const normalizedFile = normalizeFileName(fileName);
    
    // Score base por similitud de texto
    const distance = levenshteinDistance(normalizedProduct, normalizedFile);
    const maxLength = Math.max(normalizedProduct.length, normalizedFile.length);
    const similarity = 1 - (distance / maxLength);
    
    let score = similarity * 100;
    
    // Bonus por coincidencia exacta de código
    if (fileName.includes(productCode)) {
        score += 50;
    }
    
    // Bonus por palabras clave coincidentes
    const productWords = normalizedProduct.split(' ');
    const fileWords = normalizedFile.split(' ');
    const commonWords = productWords.filter(word => 
        word.length > 2 && fileWords.includes(word)
    );
    score += commonWords.length * 10;
    
    return Math.min(score, 100);
}

// Función para buscar archivos recursivamente
function findFilesRecursively(dir, extensions = []) {
    const files = [];
    
    function searchDir(currentDir) {
        try {
            const items = fs.readdirSync(currentDir);
            
            for (const item of items) {
                if (item.startsWith('.')) continue;
                
                const fullPath = path.join(currentDir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    searchDir(fullPath);
                } else if (stat.isFile()) {
                    const ext = path.extname(item).toLowerCase();
                    if (extensions.length === 0 || extensions.includes(ext)) {
                        files.push({
                            name: item,
                            path: fullPath,
                            relativePath: path.relative(dir, fullPath)
                        });
                    }
                }
            }
        } catch (error) {
            console.warn(`Error reading directory ${currentDir}:`, error.message);
        }
    }
    
    searchDir(dir);
    return files;
}

// Función principal de parseo
async function parseProductAssets() {
    console.log('🚀 Iniciando parseo de assets de productos...');
    
    // Leer productos del CSV
    const products = [];
    
    return new Promise((resolve, reject) => {
        fs.createReadStream(CSV_FILE)
            .pipe(csv())
            .on('data', (row) => {
                products.push({
                    id: row.ID,
                    codigo: row.Codigo_Producto,
                    nombre: row.Nombre,
                    categoria: row.Categoria,
                    slug: row.Slug
                });
            })
            .on('end', async () => {
                console.log(`📊 Cargados ${products.length} productos del CSV`);
                
                // Buscar archivos de fotos y PDFs
                console.log('🔍 Buscando archivos de fotos...');
                const photoFiles = findFilesRecursively(FOTOS_SOURCE, ['.png', '.jpg', '.jpeg']);
                console.log(`📸 Encontradas ${photoFiles.length} fotos`);
                
                console.log('🔍 Buscando archivos PDF...');
                const pdfFiles = findFilesRecursively(PDFS_SOURCE, ['.pdf']);
                console.log(`📄 Encontrados ${pdfFiles.length} PDFs`);
                
                // Crear mapping de productos con sus assets
                const productMapping = [];
                const unmatchedPhotos = [...photoFiles];
                const unmatchedPdfs = [...pdfFiles];
                
                for (const product of products) {
                    console.log(`\n🔄 Procesando: ${product.codigo} - ${product.nombre}`);
                    
                    const productData = {
                        ...product,
                        photo: null,
                        pdf: null,
                        photoScore: 0,
                        pdfScore: 0,
                        photoMatches: [],
                        pdfMatches: []
                    };
                    
                    // Buscar mejor match para foto
                    let bestPhotoMatch = null;
                    let bestPhotoScore = 0;
                    
                    for (const photo of photoFiles) {
                        const score = calculateMatchScore(product.nombre, photo.name, product.codigo);
                        productData.photoMatches.push({ file: photo, score });
                        
                        if (score > bestPhotoScore && score > 30) {
                            bestPhotoScore = score;
                            bestPhotoMatch = photo;
                        }
                    }
                    
                    if (bestPhotoMatch) {
                        productData.photo = bestPhotoMatch;
                        productData.photoScore = bestPhotoScore;
                        const index = unmatchedPhotos.findIndex(p => p.path === bestPhotoMatch.path);
                        if (index > -1) unmatchedPhotos.splice(index, 1);
                        console.log(`  ✅ Foto: ${bestPhotoMatch.name} (score: ${bestPhotoScore.toFixed(1)})`);
                    } else {
                        console.log(`  ❌ No se encontró foto`);
                    }
                    
                    // Buscar mejor match para PDF
                    let bestPdfMatch = null;
                    let bestPdfScore = 0;
                    
                    for (const pdf of pdfFiles) {
                        const score = calculateMatchScore(product.nombre, pdf.name, product.codigo);
                        productData.pdfMatches.push({ file: pdf, score });
                        
                        if (score > bestPdfScore && score > 30) {
                            bestPdfScore = score;
                            bestPdfMatch = pdf;
                        }
                    }
                    
                    if (bestPdfMatch) {
                        productData.pdf = bestPdfMatch;
                        productData.pdfScore = bestPdfScore;
                        const index = unmatchedPdfs.findIndex(p => p.path === bestPdfMatch.path);
                        if (index > -1) unmatchedPdfs.splice(index, 1);
                        console.log(`  ✅ PDF: ${bestPdfMatch.name} (score: ${bestPdfScore.toFixed(1)})`);
                    } else {
                        console.log(`  ❌ No se encontró PDF`);
                    }
                    
                    productMapping.push(productData);
                }
                
                // Copiar archivos con nomenclatura estandarizada
                console.log('\n📁 Copiando archivos con nomenclatura estandarizada...');
                
                for (const product of productMapping) {
                    // Copiar foto
                    if (product.photo) {
                        const ext = path.extname(product.photo.name);
                        const newFileName = `${product.codigo}_${product.nombre.replace(/[^a-zA-Z0-9]/g, '_')}${ext}`;
                        const destPath = path.join(FOTOS_DEST, newFileName);
                        
                        try {
                            fs.copyFileSync(product.photo.path, destPath);
                            console.log(`📸 Copiado: ${newFileName}`);
                        } catch (error) {
                            console.error(`❌ Error copiando foto ${newFileName}:`, error.message);
                        }
                    }
                    
                    // Copiar PDF
                    if (product.pdf) {
                        const ext = path.extname(product.pdf.name);
                        const newFileName = `${product.codigo}_${product.nombre.replace(/[^a-zA-Z0-9]/g, '_')}${ext}`;
                        const destPath = path.join(PDFS_DEST, newFileName);
                        
                        try {
                            fs.copyFileSync(product.pdf.path, destPath);
                            console.log(`📄 Copiado: ${newFileName}`);
                        } catch (error) {
                            console.error(`❌ Error copiando PDF ${newFileName}:`, error.message);
                        }
                    }
                }
                
                // Generar reporte de mapping
                const mappingReport = {
                    timestamp: new Date().toISOString(),
                    summary: {
                        totalProducts: products.length,
                        productsWithPhoto: productMapping.filter(p => p.photo).length,
                        productsWithPdf: productMapping.filter(p => p.pdf).length,
                        unmatchedPhotos: unmatchedPhotos.length,
                        unmatchedPdfs: unmatchedPdfs.length
                    },
                    products: productMapping.map(p => ({
                        id: p.id,
                        codigo: p.codigo,
                        nombre: p.nombre,
                        categoria: p.categoria,
                        slug: p.slug,
                        assets: {
                            photo: p.photo ? {
                                originalFile: p.photo.name,
                                originalPath: p.photo.path,
                                newFileName: `${p.codigo}_${p.nombre.replace(/[^a-zA-Z0-9]/g, '_')}${path.extname(p.photo.name)}`,
                                score: p.photoScore
                            } : null,
                            pdf: p.pdf ? {
                                originalFile: p.pdf.name,
                                originalPath: p.pdf.path,
                                newFileName: `${p.codigo}_${p.nombre.replace(/[^a-zA-Z0-9]/g, '_')}${path.extname(p.pdf.name)}`,
                                score: p.pdfScore
                            } : null
                        }
                    })),
                    unmatchedAssets: {
                        photos: unmatchedPhotos.map(p => ({ name: p.name, path: p.path })),
                        pdfs: unmatchedPdfs.map(p => ({ name: p.name, path: p.path }))
                    }
                };
                
                // Guardar reporte de mapping
                const reportPath = path.join(BASE_DIR, 'product-assets-mapping.json');
                fs.writeFileSync(reportPath, JSON.stringify(mappingReport, null, 2));
                
                console.log('\n📊 RESUMEN FINAL:');
                console.log(`✅ Productos procesados: ${mappingReport.summary.totalProducts}`);
                console.log(`📸 Productos con foto: ${mappingReport.summary.productsWithPhoto}`);
                console.log(`📄 Productos con PDF: ${mappingReport.summary.productsWithPdf}`);
                console.log(`🔍 Fotos sin asignar: ${mappingReport.summary.unmatchedPhotos}`);
                console.log(`🔍 PDFs sin asignar: ${mappingReport.summary.unmatchedPdfs}`);
                console.log(`\n📋 Reporte completo guardado en: ${reportPath}`);
                
                resolve(mappingReport);
            })
            .on('error', reject);
    });
}

// Ejecutar si es llamado directamente
if (require.main === module) {
    parseProductAssets().catch(console.error);
}

module.exports = { parseProductAssets };