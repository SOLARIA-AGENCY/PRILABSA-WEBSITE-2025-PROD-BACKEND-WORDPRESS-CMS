#!/usr/bin/env node

/**
 * EMERGENCY FTP DEPLOYMENT SCRIPT
 * Uploads ONLY critical files: index.html, .htaccess, and JS/CSS assets
 * Skips images and other large files to restore site visibility ASAP
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// @ts-ignore
import * as ftp from 'basic-ftp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const CONFIG_FILE = path.join(__dirname, '..', '.ftpconfig.json');
const BUILD_DIR = path.join(__dirname, '..', 'dist');

async function loadConfig() {
    const configData = fs.readFileSync(CONFIG_FILE, 'utf8');
    return JSON.parse(configData);
}

async function main() {
    console.log('🚀 STARTING EMERGENCY FAST DEPLOYMENT...');

    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        const config = await loadConfig();

        console.log(`Connecting to ${config.host}...`);
        await client.access({
            host: config.host,
            user: config.user,
            password: config.password,
            secure: false
        });

        console.log('✅ Connected!');

        // Try to CHMOD the folder
        try {
            console.log('🔧 Attempting to CHMOD productos.prilabsa.com...');
            await client.send('SITE CHMOD 755 productos.prilabsa.com');
            console.log('✅ CHMOD successful!');
        } catch (e) {
            console.log('⚠️ CHMOD failed: ' + e.message);
        }

        // Try to CD into the subdomain folder
        try {
            console.log('📂 Attempting to CD into productos.prilabsa.com...');
            await client.cd('productos.prilabsa.com');
            console.log('✅ CD successful! This is likely the root.');
        } catch (e) {
            console.log('⚠️ Could not CD into productos.prilabsa.com, staying in root.');
        }

        console.log('📄 Uploading deploy_bridge.php to /public_html ...');
        try {
            await client.uploadFrom(
                path.join(BUILD_DIR, 'deploy_bridge.php'),
                '/public_html/deploy_bridge.php'
            );
            console.log('✅ Uploaded deploy_bridge.php');
        } catch (e) {
            console.log('⚠️ Could not upload deploy_bridge.php');
        }

        console.log('📄 Uploading probe.php to /public_html ...');
        try {
            await client.uploadFrom(
                path.join(BUILD_DIR, 'probe.php'),
                '/public_html/probe.php'
            );
            console.log('✅ Uploaded probe.php');
        } catch (e) {
            console.log('⚠️ Could not upload probe.php');
        }

        console.log('📄 Uploading probe_assets.php to /public_html ...');
        try {
            await client.uploadFrom(
                path.join(BUILD_DIR, 'probe_assets.php'),
                '/public_html/probe_assets.php'
            );
            console.log('✅ Uploaded probe_assets.php');
        } catch (e) {
            console.log('⚠️ Could not upload probe_assets.php');
        }

        // 1. Upload .htaccess
        console.log('📄 Uploading .htaccess...');
        await client.uploadFrom(
            path.join(BUILD_DIR, '.htaccess'),
            '.htaccess'
        );

        // 2. Upload index.html
        console.log('📄 Uploading index.html...');
        await client.uploadFrom(
            path.join(BUILD_DIR, 'index.html'),
            'index.html'
        );

        // 3. Upload JS and CSS assets
        console.log('📂 Uploading JS/CSS assets...');
        await client.ensureDir('assets');

        const assetsDir = path.join(BUILD_DIR, 'assets');
        const assets = fs.readdirSync(assetsDir);

        for (const asset of assets) {
            if (asset.endsWith('.js') || asset.endsWith('.css')) {
                console.log(`   ⬆️ Uploading ${asset}...`);
                await client.uploadFrom(
                    path.join(assetsDir, asset),
                    `assets/${asset}`
                );
            }
        }


        console.log('✅ EMERGENCY DEPLOYMENT COMPLETE!');
        console.log('👉 Check https://productos.prilabsa.com now.');

    } catch (err) {
        console.error('❌ Deployment failed:', err);
    } finally {
        client.close();
    }
}

main();
