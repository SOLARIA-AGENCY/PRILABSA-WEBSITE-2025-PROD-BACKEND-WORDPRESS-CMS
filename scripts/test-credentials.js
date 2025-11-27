import { Client } from 'basic-ftp';

const HOST = 'productos.prilabsa.com';
const PASSWORD = 'SoCh2025$%';

const USERNAMES = [
    'solaria.charlie@productos.prilabsa.com',
    'solaria.charlie@prilabsa.com',
    'solaria.charlie',
    'prilabsa',
    'admin@productos.prilabsa.com'
];

async function testCredentials() {
    console.log('🕵️ Testing credential variations...');

    for (const user of USERNAMES) {
        const client = new Client();
        // client.ftp.verbose = true; 

        console.log(`\n👉 Testing User: ${user}`);

        try {
            await client.access({
                host: HOST,
                user: user,
                password: PASSWORD,
                secure: false
            });

            console.log(`✅ SUCCESS! Connected with ${user}`);
            console.log('📂 Listing root directory...');
            const list = await client.list('/');
            list.forEach(f => console.log(` - ${f.name} (${f.isDirectory ? 'DIR' : 'FILE'})`));

            // Check if this looks like the right place
            const hasWordPress = list.some(f => f.name === 'wordpress' || f.name === 'wp-content');
            if (hasWordPress) console.log('🌟 This looks like a WordPress root!');

            client.close();
            return; // Stop after first success

        } catch (error) {
            console.log(`❌ Failed: ${error.message}`);
        } finally {
            client.close();
        }
    }

    console.log('\n⚠️ All variations failed.');
}

testCredentials();
