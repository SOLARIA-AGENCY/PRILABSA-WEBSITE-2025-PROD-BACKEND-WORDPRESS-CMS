#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuración FTP
const ftpConfig = {
  host: 'productos.prilabsa.com',
  user: 'solaria.charlie@blog.prilabsa.com',
  password: 'SoCh2025$%',
  port: 21,
  secure: false,
  passive: true
};

// Usar curl para subir archivos críticos
const { exec } = require('child_process');

async function uploadCriticalFiles() {
  console.log('🚀 Subiendo archivos críticos al servidor...');
  
  // Archivos críticos que necesitan ser subidos
  const criticalFiles = [
    'dist/index.html',
    'dist/assets/index-C2tgQzUA.css',
    'dist/assets/index-BV5pYAlm.js',
    'dist/assets/react-DMrr_GdF.js',
    'dist/assets/vendor-CtuOAJYM.js'
  ];

  // Subir imágenes de productos
  const imageFiles = fs.readdirSync('dist/assets/productos')
    .filter(file => file.endsWith('.png'))
    .slice(0, 20); // Subir primeras 20 imágenes primero

  try {
    for (const file of criticalFiles) {
      const remotePath = file.replace('dist/', '');
      const localPath = file;
      
      console.log(`📤 Subiendo ${localPath} -> ${remotePath}`);
      
      await new Promise((resolve, reject) => {
        const curlCommand = `curl -T "${localPath}" "ftp://${ftpConfig.user}:${ftpConfig.password}@${ftpConfig.host}/${remotePath}" --ftp-create-dirs`;
        
        exec(curlCommand, (error, stdout, stderr) => {
          if (error) {
            console.error(`❌ Error subiendo ${file}:`, error);
            reject(error);
          } else {
            console.log(`✅ ${file} subido exitosamente`);
            resolve();
          }
        });
      });
    }

    // Subir algunas imágenes
    for (const file of imageFiles) {
      const remotePath = `assets/productos/${file}`;
      const localPath = `dist/assets/productos/${file}`;
      
      console.log(`🖼️ Subiendo imagen ${file}`);
      
      await new Promise((resolve, reject) => {
        const curlCommand = `curl -T "${localPath}" "ftp://${ftpConfig.user}:${ftpConfig.password}@${ftpConfig.host}/${remotePath}" --ftp-create-dirs`;
        
        exec(curlCommand, (error, stdout, stderr) => {
          if (error) {
            console.error(`❌ Error subiendo imagen ${file}:`, error);
            reject(error);
          } else {
            console.log(`✅ Imagen ${file} subida exitosamente`);
            resolve();
          }
        });
      });
    }

    console.log('🎉 ¡Archivos críticos subidos exitosamente!');
    console.log('🌐 Sitio web disponible en: https://productos.prilabsa.com/');
    
  } catch (error) {
    console.error('❌ Error durante la subida:', error);
    process.exit(1);
  }
}

uploadCriticalFiles();