#!/usr/bin/env node
/**
 * QUICK DNS CHECK - PRILABSA.SOLARIA.AGENCY
 * Script de verificación rápida para monitorear el estado de la configuración DNS
 */

const dns = require('dns').promises;
const https = require('https');
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

class QuickDNSCheck {
    constructor() {
        this.domain = 'prilabsa.solaria.agency';
        this.expectedIP = '193.203.168.188';
        this.cloudflareIPs = ['104.21.', '172.67.', '198.41.'];
    }

    log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const colors = {
            success: '\x1b[32m✅',
            error: '\x1b[31m❌',
            warning: '\x1b[33m⚠️',
            info: '\x1b[36mℹ️',
            reset: '\x1b[0m'
        };
        console.log(`${colors[type]} [${timestamp}] ${message}${colors.reset}`);
    }

    async checkDNSResolution() {
        try {
            const ips = await dns.resolve4(this.domain);
            const isCloudflare = ips.some(ip => 
                this.cloudflareIPs.some(cf => ip.startsWith(cf))
            );
            
            if (isCloudflare) {
                this.log(`DNS resuelve a Cloudflare: ${ips.join(', ')}`, 'success');
                return { status: 'success', ips, proxied: true };
            } else if (ips.includes(this.expectedIP)) {
                this.log(`DNS resuelve directamente: ${ips.join(', ')}`, 'warning');
                return { status: 'direct', ips, proxied: false };
            } else {
                this.log(`DNS resuelve a IPs inesperadas: ${ips.join(', ')}`, 'warning');
                return { status: 'unexpected', ips, proxied: false };
            }
        } catch (error) {
            this.log(`DNS no resuelve: ${error.message}`, 'error');
            return { status: 'error', error: error.message };
        }
    }

    async checkHTTPS() {
        return new Promise((resolve) => {
            const req = https.get(`https://${this.domain}`, {
                timeout: 10000,
                headers: {
                    'User-Agent': 'DNS-Check-Script/1.0'
                }
            }, (res) => {
                if (res.statusCode >= 200 && res.statusCode < 400) {
                    this.log(`HTTPS responde: ${res.statusCode}`, 'success');
                    resolve({ status: 'success', statusCode: res.statusCode });
                } else {
                    this.log(`HTTPS error: ${res.statusCode}`, 'warning');
                    resolve({ status: 'error', statusCode: res.statusCode });
                }
            });
            
            req.on('error', (error) => {
                this.log(`HTTPS falla: ${error.message}`, 'error');
                resolve({ status: 'error', error: error.message });
            });
            
            req.on('timeout', () => {
                this.log('HTTPS timeout', 'error');
                req.destroy();
                resolve({ status: 'timeout' });
            });
        });
    }

    async checkSSL() {
        try {
            const { stdout } = await execAsync(`echo | openssl s_client -servername ${this.domain} -connect ${this.domain}:443 2>/dev/null | openssl x509 -noout -issuer`);
            if (stdout.includes('Cloudflare')) {
                this.log('SSL certificado por Cloudflare', 'success');
                return { status: 'cloudflare', issuer: stdout.trim() };
            } else {
                this.log(`SSL certificado por: ${stdout.trim()}`, 'info');
                return { status: 'other', issuer: stdout.trim() };
            }
        } catch (error) {
            this.log(`SSL check falló: ${error.message}`, 'error');
            return { status: 'error', error: error.message };
        }
    }

    async checkPropagation() {
        const dnsServers = [
            { name: 'Google', server: '8.8.8.8' },
            { name: 'Cloudflare', server: '1.1.1.1' },
            { name: 'OpenDNS', server: '208.67.222.222' }
        ];

        this.log('Verificando propagación DNS...', 'info');
        
        for (const { name, server } of dnsServers) {
            try {
                const { stdout } = await execAsync(`nslookup ${this.domain} ${server}`);
                if (stdout.includes('NXDOMAIN')) {
                    this.log(`${name} (${server}): No resuelve`, 'error');
                } else {
                    const ips = stdout.match(/Address: ([0-9.]+)/g);
                    if (ips) {
                        const cleanIPs = ips.map(ip => ip.replace('Address: ', ''));
                        this.log(`${name} (${server}): ${cleanIPs.join(', ')}`, 'success');
                    }
                }
            } catch (error) {
                this.log(`${name} (${server}): Error - ${error.message}`, 'error');
            }
        }
    }

    async generateReport() {
        const results = {
            timestamp: new Date().toISOString(),
            domain: this.domain,
            dns: await this.checkDNSResolution(),
            https: await this.checkHTTPS(),
            ssl: await this.checkSSL()
        };

        // Determinar estado general
        let overallStatus = 'CRITICAL';
        if (results.dns.status === 'success' && results.https.status === 'success') {
            overallStatus = 'HEALTHY';
        } else if (results.dns.status === 'success' || results.https.status === 'success') {
            overallStatus = 'PARTIAL';
        }

        return { ...results, overallStatus };
    }

    displayStatus(report) {
        console.log('\n' + '='.repeat(60));
        console.log(`🌐 ESTADO DNS - ${this.domain}`);
        console.log('='.repeat(60));
        
        const statusColors = {
            HEALTHY: '\x1b[32m',
            PARTIAL: '\x1b[33m',
            CRITICAL: '\x1b[31m'
        };
        
        console.log(`Estado General: ${statusColors[report.overallStatus]}${report.overallStatus}\x1b[0m`);
        console.log(`Timestamp: ${new Date(report.timestamp).toLocaleString()}`);
        console.log('');
        
        // Mostrar detalles
        if (report.dns.status === 'success') {
            console.log(`✅ DNS: Resuelve a ${report.dns.ips.join(', ')} ${report.dns.proxied ? '(Proxied)' : '(Direct)'}`);
        } else {
            console.log(`❌ DNS: ${report.dns.error || 'No resuelve'}`);
        }
        
        if (report.https.status === 'success') {
            console.log(`✅ HTTPS: Responde con código ${report.https.statusCode}`);
        } else {
            console.log(`❌ HTTPS: ${report.https.error || 'No responde'}`);
        }
        
        if (report.ssl.status === 'cloudflare') {
            console.log(`✅ SSL: Certificado Cloudflare activo`);
        } else if (report.ssl.status === 'other') {
            console.log(`⚠️  SSL: ${report.ssl.issuer}`);
        } else {
            console.log(`❌ SSL: ${report.ssl.error || 'No disponible'}`);
        }
        
        console.log('\n' + '='.repeat(60));
        
        // Mostrar próximos pasos
        if (report.overallStatus === 'CRITICAL') {
            console.log('\n🚨 ACCIÓN REQUERIDA:');
            console.log('1. Configurar registro DNS en Cloudflare');
            console.log('2. Seguir instrucciones en CLOUDFLARE_DNS_CONFIGURATION.md');
            console.log('3. Ejecutar: node scripts/cloudflare-dns-setup.cjs');
        } else if (report.overallStatus === 'PARTIAL') {
            console.log('\n⚠️  CONFIGURACIÓN PARCIAL:');
            console.log('1. Verificar configuración en Hostinger');
            console.log('2. Verificar SSL en Cloudflare');
            console.log('3. Esperar propagación DNS completa');
        } else {
            console.log('\n🎉 CONFIGURACIÓN COMPLETA!');
            console.log(`Sitio disponible en: https://${this.domain}`);
        }
    }

    async run() {
        const args = process.argv.slice(2);
        
        if (args.includes('--propagation')) {
            await this.checkPropagation();
            return;
        }
        
        if (args.includes('--watch')) {
            console.log('🔄 Modo monitoreo activo (Ctrl+C para salir)\n');
            const interval = setInterval(async () => {
                const report = await this.generateReport();
                console.clear();
                this.displayStatus(report);
                
                if (report.overallStatus === 'HEALTHY') {
                    console.log('\n✅ Configuración completada exitosamente!');
                    clearInterval(interval);
                }
            }, 30000); // Check every 30 seconds
            
            // Initial check
            const report = await this.generateReport();
            this.displayStatus(report);
            return;
        }
        
        // Single check
        const report = await this.generateReport();
        this.displayStatus(report);
    }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
    const checker = new QuickDNSCheck();
    checker.run().catch(console.error);
}

module.exports = QuickDNSCheck;