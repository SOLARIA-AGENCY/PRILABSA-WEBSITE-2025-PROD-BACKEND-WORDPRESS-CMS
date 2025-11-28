import { Client } from 'basic-ftp';

const HOST = 'productos.prilabsa.com';
const USER = 'solaria.charlie@blog.prilabsa.com';
const PASSWORD = 'SoCh2025$%';

async function testSFTP() {
    const client = new Client();
    client.ftp.verbose = true;

    console.log(`👉 Testing SFTP with User: ${USER}`);

    try {
        await client.access({
            host: HOST,
            user: USER,
            password: PASSWORD,
            secure: true, // Try explicit TLS first
            secureOptions: { rejectUnauthorized: false }
        });

        console.log(`✅ SUCCESS! Connected via FTPS.`);
        console.log('📂 Listing root directory...');
        const list = await client.list('/');
        list.forEach(f => console.log(` - ${f.name} (${f.isDirectory ? 'DIR' : 'FILE'})`));

        // Try to list the forbidden folder
        console.log('\n📂 Attempting to list /productos.prilabsa.com ...');
        try {
            const listSub = await client.list('/productos.prilabsa.com');
            listSub.forEach(f => console.log(` - ${f.name} (${f.isDirectory ? 'DIR' : 'FILE'})`));
        } catch (e) {
            console.log('❌ Still cannot access /productos.prilabsa.com: ' + e.message);
        }

    } catch (error) {
        console.log(`❌ FTPS Failed: ${error.message}`);

        // Try SFTP (SSH) - basic-ftp doesn't support SFTP (SSH), only FTPS (SSL/TLS).
        // I need to use 'ssh2-sftp-client' for actual SFTP.
        // But I don't have that package installed.
        // I can try to use the 'sftp' command line tool if available.
    } finally {
        client.close();
    }
}

testSFTP();
