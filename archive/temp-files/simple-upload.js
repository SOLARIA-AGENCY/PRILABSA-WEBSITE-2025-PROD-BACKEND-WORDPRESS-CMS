#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const config = {
  host: 'productos.prilabsa.com',
  user: 'solaria.charlie@blog.prilabsa.com',
  password: 'SoCh2025$%',
  port: 21
};

console.log('🚀 Simple FTP Upload for PRILABSA');

// Create a simple FTP script
const ftpScript = `
open ${config.host}
user ${config.user} ${config.password}
binary
put index.html
put .htaccess
mkdir -p assets
cd assets
put assets/index.html
lcd assets
mput *.js
mput *.css
mput *.png
mput *.jpg
mput *.gif
mput *.svg
cd ..
mkdir -p assets/productos/pdfs
cd assets/productos/pdfs
lcd assets/productos/pdfs
mput *.pdf
cd ../..
mkdir -p assets/fonts
cd assets/fonts
lcd assets/fonts
mput *
cd ..
quit
`;

fs.writeFileSync('ftp-commands.txt', ftpScript);

try {
  console.log('Uploading files...');
  execSync('ftp -n < ftp-commands.txt', { stdio: 'inherit', timeout: 30000 });
  console.log('✅ Upload completed');
} catch (error) {
  console.error('❌ Upload failed:', error.message);
}

// Cleanup
fs.unlinkSync('ftp-commands.txt');