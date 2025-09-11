#!/usr/bin/env node
/**
 * CLOUDFLARE DNS CONFIGURATION SCRIPT
 * Configuración DNS para prilabsa.solaria.agency
 * 
 * ARQUITECTURA ACTUAL DETECTADA:
 * - Dominio: solaria.agency (registrado en OVH)
 * - DNS: Gestionado por Cloudflare (sam.ns.cloudflare.com, dina.ns.cloudflare.com)
 * - Hosting: Hostinger (193.203.168.188 / fr-int-web1794.main-hosting.eu)
 * - Proxy: Cloudflare activo (104.21.35.28, 172.67.212.73)
 */

const chalk = require('chalk');
const dns = require('dns').promises;

class CloudflareDNSSetup {
    constructor() {
        this.domain = 'solaria.agency';
        this.subdomain = 'prilabsa';
        this.fullDomain = `${this.subdomain}.${this.domain}`;
        this.hostingerIP = '193.203.168.188';
        this.hostingerHost = 'fr-int-web1794.main-hosting.eu';
    }

    async checkCurrentDNS() {
        console.log(chalk.blue('🔍 VERIFICANDO CONFIGURACIÓN DNS ACTUAL...\n'));
        
        try {
            // Verificar dominio principal
            const mainDomain = await dns.resolve4(this.domain);
            console.log(chalk.green(`✅ ${this.domain}: ${mainDomain.join(', ')}`));
            
            // Verificar nameservers
            const nameservers = await dns.resolveNs(this.domain);
            console.log(chalk.green(`✅ Nameservers: ${nameservers.join(', ')}`));
            
            // Verificar subdominio
            try {
                const subdomainIPs = await dns.resolve4(this.fullDomain);
                console.log(chalk.yellow(`⚠️  ${this.fullDomain}: ${subdomainIPs.join(', ')} (YA EXISTE)`));
            } catch (error) {
                console.log(chalk.red(`❌ ${this.fullDomain}: NO CONFIGURADO (NXDOMAIN)`));
            }
            
        } catch (error) {
            console.log(chalk.red(`❌ Error verificando DNS: ${error.message}`));
        }
    }

    displayCloudflareInstructions() {
        console.log(chalk.blue('\n📋 INSTRUCCIONES DE CONFIGURACIÓN CLOUDFLARE\n'));
        
        console.log(chalk.white('1. ACCEDER AL PANEL DE CLOUDFLARE:'));
        console.log('   • Ir a https://dash.cloudflare.com/');
        console.log('   • Seleccionar el dominio: solaria.agency\n');
        
        console.log(chalk.white('2. NAVEGAR A DNS RECORDS:'));
        console.log('   • Clic en "DNS" en el menú lateral');
        console.log('   • Ir a la sección "Records"\n');
        
        console.log(chalk.white('3. AGREGAR NUEVO REGISTRO DNS:'));
        console.log('   • Clic en "Add record"\n');
        
        console.log(chalk.yellow('OPCIÓN A - REGISTRO A (RECOMENDADO):'));
        console.log(chalk.cyan('   Type: A'));
        console.log(chalk.cyan('   Name: prilabsa'));
        console.log(chalk.cyan(`   IPv4 address: ${this.hostingerIP}`));
        console.log(chalk.cyan('   Proxy status: 🟠 Proxied (ACTIVADO)'));
        console.log(chalk.cyan('   TTL: Auto\n'));
        
        console.log(chalk.yellow('OPCIÓN B - REGISTRO CNAME (ALTERNATIVO):'));
        console.log(chalk.cyan('   Type: CNAME'));
        console.log(chalk.cyan('   Name: prilabsa'));
        console.log(chalk.cyan('   Target: solaria.agency'));
        console.log(chalk.cyan('   Proxy status: 🟠 Proxied (ACTIVADO)'));
        console.log(chalk.cyan('   TTL: Auto\n'));
        
        console.log(chalk.white('4. CONFIGURACIÓN RECOMENDADA:'));
        console.log(chalk.green('   ✅ Usar OPCIÓN A (Registro A)'));
        console.log(chalk.green('   ✅ Mantener Proxy ACTIVADO para beneficios de Cloudflare'));
        console.log(chalk.green('   ✅ Esto permitirá CDN, SSL automático y protección DDoS\n'));
        
        console.log(chalk.white('5. VERIFICACIÓN POST-CONFIGURACIÓN:'));
        console.log('   • Esperar 1-5 minutos para propagación');
        console.log(`   • Ejecutar: node scripts/cloudflare-dns-setup.js --verify`);
        console.log(`   • Probar en navegador: https://${this.fullDomain}\n`);
    }

    displayHostingerConfiguration() {
        console.log(chalk.blue('🏠 CONFIGURACIÓN EN HOSTINGER\n'));
        
        console.log(chalk.white('VERIFICAR EN CPANEL/HOSTINGER:'));
        console.log('1. Acceder al panel de Hostinger');
        console.log('2. Ir a "Dominios" o "Subdominios"');
        console.log(`3. Verificar que ${this.fullDomain} esté configurado`);
        console.log('4. Document Root debe apuntar a la carpeta correcta');
        console.log('5. Verificar certificado SSL para el subdominio\n');
        
        console.log(chalk.yellow('CONFIGURACIÓN DE VIRTUAL HOST:'));
        console.log(`ServerName ${this.fullDomain}`);
        console.log(`DocumentRoot /path/to/prilabsa/website`);
        console.log('SSLEngine on');
        console.log('SSLCertificateFile /path/to/ssl/cert\n');
    }

    async verifyConfiguration() {
        console.log(chalk.blue('🔍 VERIFICANDO CONFIGURACIÓN COMPLETA...\n'));
        
        const checks = [
            { name: 'DNS Resolution', test: () => dns.resolve4(this.fullDomain) },
            { name: 'HTTPS Access', test: () => this.testHTTPS() },
            { name: 'Cloudflare Proxy', test: () => this.checkCloudflareProxy() }
        ];
        
        for (const check of checks) {
            try {
                await check.test();
                console.log(chalk.green(`✅ ${check.name}: OK`));
            } catch (error) {
                console.log(chalk.red(`❌ ${check.name}: ${error.message}`));
            }
        }
    }

    async testHTTPS() {
        const https = require('https');
        return new Promise((resolve, reject) => {
            const req = https.get(`https://${this.fullDomain}`, (res) => {
                if (res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302) {
                    resolve(res.statusCode);
                } else {
                    reject(new Error(`HTTP ${res.statusCode}`));
                }
            });
            req.on('error', reject);
            req.setTimeout(10000, () => reject(new Error('Timeout')));
        });
    }

    async checkCloudflareProxy() {
        const ips = await dns.resolve4(this.fullDomain);
        const cloudflareRanges = ['104.', '172.67.', '198.41.'];
        const isProxied = ips.some(ip => cloudflareRanges.some(range => ip.startsWith(range)));
        
        if (!isProxied) {
            throw new Error('No está usando proxy de Cloudflare');
        }
        return true;
    }

    displaySummary() {
        console.log(chalk.blue('\n📊 RESUMEN DE CONFIGURACIÓN\n'));
        
        console.log(chalk.white('ARQUITECTURA OBJETIVO:'));
        console.log(`Usuario → Cloudflare (Proxy) → Hostinger (${this.hostingerIP})`);
        console.log(`Dominio: ${this.fullDomain}`);
        console.log('SSL: Automático via Cloudflare');
        console.log('CDN: Activado via Cloudflare');
        console.log('DDoS Protection: Activado via Cloudflare\n');
        
        console.log(chalk.green('BENEFICIOS DE ESTA CONFIGURACIÓN:'));
        console.log('✅ SSL/TLS automático y gratuito');
        console.log('✅ CDN global para mejor rendimiento');
        console.log('✅ Protección DDoS y firewall');
        console.log('✅ Analytics y métricas detalladas');
        console.log('✅ Compresión automática de contenido\n');
    }

    async run() {
        const args = process.argv.slice(2);
        
        console.log(chalk.bold.blue('🌐 CLOUDFLARE DNS SETUP - PRILABSA.SOLARIA.AGENCY\n'));
        
        if (args.includes('--verify')) {
            await this.verifyConfiguration();
            return;
        }
        
        await this.checkCurrentDNS();
        this.displayCloudflareInstructions();
        this.displayHostingerConfiguration();
        this.displaySummary();
        
        console.log(chalk.bold.yellow('\n🚀 PRÓXIMOS PASOS:'));
        console.log('1. Seguir las instrucciones de Cloudflare arriba');
        console.log('2. Esperar 1-5 minutos para propagación DNS');
        console.log('3. Ejecutar: node scripts/cloudflare-dns-setup.js --verify');
        console.log('4. Probar el sitio en el navegador\n');
    }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
    const setup = new CloudflareDNSSetup();
    setup.run().catch(console.error);
}

module.exports = CloudflareDNSSetup;