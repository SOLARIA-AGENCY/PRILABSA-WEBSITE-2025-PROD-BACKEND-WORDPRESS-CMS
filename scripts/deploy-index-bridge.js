import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BUILD_DIR = path.join(__dirname, '../dist');
const BRIDGE_URL = 'https://blog.prilabsa.com/deploy_bridge.php';
const TOKEN = 'SolariaBridge2025$%';

async function uploadFile(filePath, relativePath) {
    const content = fs.readFileSync(filePath);
    const base64Content = content.toString('base64');

    const body = new URLSearchParams();
    body.append('path', relativePath);
    body.append('content', base64Content);
    body.append('base64', '1');

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

        console.log(`✅ Uploaded: ${relativePath}`);
        return true;
    } catch (error) {
        console.error(`❌ Failed to upload ${relativePath}: ${error.message}`);
        return false;
    }
}

async function deploy() {
    console.log('🚀 Deploying index.html and .htaccess via Bridge...');

    await uploadFile(path.join(BUILD_DIR, 'index.html'), 'index.html');
    await uploadFile(path.join(BUILD_DIR, '.htaccess'), '.htaccess');

    console.log('✨ Done!');
}

deploy();
