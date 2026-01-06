
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as ftp from 'basic-ftp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper to load config
async function loadConfig() {
    const configFile = path.join(__dirname, '..', '.ftpconfig.json');
    const configData = fs.readFileSync(configFile, 'utf8');
    return JSON.parse(configData);
}

async function main() {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        const config = await loadConfig();
        console.log('Connecting to FTP...');
        await client.access({
            host: config.host,
            user: config.user,
            password: config.password,
            port: config.port,
            secure: config.secure
        });

        const rootPath = '/public_html/productos.prilabsa.com';
        const pluginsPath = `${rootPath}/wp-content/plugins`;

        // The original code checked for plugins and uploaded there.
        // The new requirement is to always upload to mu-plugins and ensure the directory exists.
        const muPluginsPath = `${rootPath}/wp-content/mu-plugins`;
        console.log(`Targeting mu-plugins: ${muPluginsPath}`);

        // Ensure mu-plugins exists
        try {
            await client.ensureDir(muPluginsPath);
        } catch (e) {
            console.log('Error creating mu-plugins (might already exist):', e.message);
        }

        const targetPath = `${muPluginsPath}/prilabsa-acf-translations.php`;
        const localPath = path.join(__dirname, '..', 'PROJECT-PRODUCTOS-HEADLESS-WP', 'wordpress-code', 'prilabsa-acf-translations.php');

        console.log(`Uploading ${localPath} to ${targetPath}...`);
        await client.uploadFrom(localPath, targetPath);
        console.log('✅ Upload successful to mu-plugins! (Automatically activated)');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.close();
    }
}

main();
