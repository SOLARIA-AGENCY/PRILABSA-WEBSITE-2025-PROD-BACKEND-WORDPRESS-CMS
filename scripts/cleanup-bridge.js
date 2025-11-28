import { Client } from 'basic-ftp';

const HOST = 'productos.prilabsa.com';
const USER = 'solaria.charlie@blog.prilabsa.com';
const PASSWORD = 'SoCh2025$%';

async function cleanup() {
    const client = new Client();
    // client.ftp.verbose = true;

    console.log('🧹 Cleaning up bridge files...');

    try {
        await client.access({
            host: HOST,
            user: USER,
            password: PASSWORD,
            secure: false
        });

        console.log('🗑️ Deleting /public_html/deploy_bridge.php ...');
        try {
            await client.remove('/public_html/deploy_bridge.php');
            console.log('✅ Deleted.');
        } catch (e) {
            console.log('⚠️ Failed to delete deploy_bridge.php: ' + e.message);
        }

        console.log('🗑️ Deleting /public_html/probe.php ...');
        try {
            await client.remove('/public_html/probe.php');
            console.log('✅ Deleted.');
        } catch (e) {
            console.log('⚠️ Failed to delete probe.php: ' + e.message);
        }

        console.log('🗑️ Deleting /public_html/probe_assets.php ...');
        try {
            await client.remove('/public_html/probe_assets.php');
            console.log('✅ Deleted.');
        } catch (e) {
            console.log('⚠️ Failed to delete probe_assets.php: ' + e.message);
        }

        console.log('🗑️ Deleting /public_html/info.php ...');
        try {
            await client.remove('/public_html/info.php');
            console.log('✅ Deleted.');
        } catch (e) {
            console.log('⚠️ Failed to delete info.php: ' + e.message);
        }

    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

cleanup();
