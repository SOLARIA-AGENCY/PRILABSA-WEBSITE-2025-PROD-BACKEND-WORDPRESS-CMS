
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as ftp from 'basic-ftp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function loadConfig() {
    const configFile = path.join(__dirname, '..', '.ftpconfig.json');
    try {
        const configData = fs.readFileSync(configFile, 'utf8');
        return JSON.parse(configData);
    } catch (e) { console.error('Config error', e); process.exit(1); }
}

async function main() {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        const config = await loadConfig();
        await client.access({
            host: config.host,
            user: config.user,
            password: config.password,
            port: config.port,
            secure: config.secure
        });

        const targetPath = `/public_html/productos.prilabsa.com/wp-content/mu-plugins/prilabsa-acf-config.php`;
        console.log(`Removing ${targetPath}...`);
        await client.remove(targetPath);
        console.log('✅ File removed.');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.close();
    }
}

main();
