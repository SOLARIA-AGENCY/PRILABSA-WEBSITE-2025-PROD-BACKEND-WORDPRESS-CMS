import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// @ts-ignore
import * as ftp from 'basic-ftp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CONFIG_FILE = path.join(__dirname, '..', '.ftpconfig.json');

async function main() {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        const configData = fs.readFileSync(CONFIG_FILE, 'utf8');
        const config = JSON.parse(configData);

        await client.access({
            host: config.host,
            user: config.user,
            password: config.password,
            secure: false
        });

        console.log('\n📂 Listing /public_html/productos ...');
        try {
            const listProds = await client.list('/public_html/productos');
            if (listProds.length === 0) console.log('   (Empty directory)');
            listProds.forEach(f => console.log(` - ${f.name} (${f.isDirectory ? 'DIR' : 'FILE'})`));
        } catch (e) {
            console.log('❌ /public_html/productos error: ' + e.message);
        }
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

main();
