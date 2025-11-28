import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BUILD_DIR = path.join(__dirname, '../dist');
const BRIDGE_URL = 'https://blog.prilabsa.com/deploy_bridge.php';
const TOKEN = 'SolariaBridge2025$%';

async function uploadFile(filePath, relativePath) {
    const CHUNK_SIZE = 1024 * 500; // 500KB chunks
    const content = fs.readFileSync(filePath);
    const totalSize = content.length;

    if (totalSize <= CHUNK_SIZE) {
        // Small file: Upload in one go
        return await uploadChunk(content, relativePath, false);
    } else {
        // Large file: Upload in chunks
        console.log(`📦 Chunking ${relativePath} (${(totalSize / 1024 / 1024).toFixed(2)} MB)...`);
        let offset = 0;
        let isAppend = false;

        while (offset < totalSize) {
            const end = Math.min(offset + CHUNK_SIZE, totalSize);
            const chunk = content.subarray(offset, end);

            const success = await uploadChunk(chunk, relativePath, isAppend);
            if (!success) return false;

            offset += CHUNK_SIZE;
            isAppend = true; // Append subsequent chunks
            process.stdout.write('.');
        }
        console.log(' Done!');
        return true;
    }
}

async function uploadChunk(buffer, relativePath, isAppend) {
    const base64Content = buffer.toString('base64');

    const body = new URLSearchParams();
    body.append('path', relativePath);
    body.append('content', base64Content);
    body.append('base64', '1');
    if (isAppend) body.append('append', '1');

    try {
        const response = await fetch(BRIDGE_URL, {
            method: 'POST',
            headers: {
                'X-AUTH-TOKEN': TOKEN,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP ${response.status}: ${text}`);
        }

        const json = await response.json();
        if (json.error) throw new Error(json.error);

        if (!isAppend && !json.appended) {
            console.log(`✅ Uploaded: ${relativePath}`);
        }
        return true;
    } catch (error) {
        console.error(`❌ Failed to upload ${relativePath}: ${error.message}`);
        return false;
    }
}

async function deploy() {
    console.log('🚀 Starting Bridge Deployment...');
    console.log(`📂 Build Dir: ${BUILD_DIR}`);
    console.log(`🔗 Bridge URL: ${BRIDGE_URL}`);

    // Recursive function to walk directory
    async function walk(dir, baseDir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                await walk(fullPath, baseDir);
            } else {
                const relativePath = path.relative(baseDir, fullPath);
                // Skip .DS_Store and map files if needed
                if (file === '.DS_Store') continue;

                await uploadFile(fullPath, relativePath);
            }
        }
    }

    await walk(BUILD_DIR, BUILD_DIR);
    console.log('✨ Deployment Complete!');
}

deploy();
