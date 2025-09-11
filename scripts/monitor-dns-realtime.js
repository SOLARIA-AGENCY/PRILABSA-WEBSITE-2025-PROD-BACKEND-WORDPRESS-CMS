#!/usr/bin/env node

const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

const TARGET_IP = '193.203.168.188';
const DOMAIN = 'prilabsa.solaria.agency';
const CHECK_INTERVAL = 10000; // 10 segundos

class DNSMonitor {
    constructor() {
        this.isFixed = false;
        this.checkCount = 0;
    }

    async checkDNS() {
        try {
            const { stdout } = await execAsync(`dig +short ${DOMAIN}`);
            const ips = stdout.trim().split('\n').filter(ip => ip && !ip.includes('CNAME'));
            return ips;
        } catch (error) {
            console.error('❌ Error checking DNS:', error.message);
            return [];
        }
    }

    async checkHTTP() {
        try {
            const { stdout } = await execAsync(`curl -s -I https://${DOMAIN}`);
            const statusLine = stdout.split('\n')[0];
            const locationHeader = stdout.split('\n').find(line => line.toLowerCase().startsWith('location:'));
            
            return {
                status: statusLine,
                location: locationHeader || 'No redirect'
            };
        } catch (error) {
            return {
                status: 'Error',
                location: error.message
            };
        }
    }

    async performCheck() {
        this.checkCount++;
        const timestamp = new Date().toLocaleTimeString();
        
        console.log(`\n🔍 [${timestamp}] Check #${this.checkCount}`);
        console.log('=' .repeat(50));
        
        // Check DNS
        const currentIPs = await this.checkDNS();
        console.log(`📍 Current DNS IPs: ${currentIPs.join(', ')}`);
        console.log(`🎯 Target IP: ${TARGET_IP}`);
        
        const dnsFixed = currentIPs.includes(TARGET_IP);
        
        if (dnsFixed && !this.isFixed) {
            console.log('🎉 ¡DNS CORREGIDO! El dominio ahora apunta al servidor correcto.');
            this.isFixed = true;
        } else if (!dnsFixed) {
            console.log('⏳ DNS aún no corregido. Esperando cambios...');
        }
        
        // Check HTTP response
        const httpResponse = await this.checkHTTP();
        console.log(`🌐 HTTP Status: ${httpResponse.status}`);
        console.log(`🔗 Redirect: ${httpResponse.location}`);
        
        // Status summary
        if (dnsFixed && !httpResponse.location.includes('solaria.agency')) {
            console.log('\n✅ ¡PROBLEMA RESUELTO! El sitio funciona correctamente.');
            console.log('🚀 Puedes acceder a: https://prilabsa.solaria.agency');
            process.exit(0);
        } else if (dnsFixed) {
            console.log('\n⚠️  DNS corregido pero aún hay redirección. Verificando cache...');
        } else {
            console.log('\n❌ DNS aún necesita corrección en Cloudflare.');
        }
    }

    start() {
        console.log('🚀 MONITOR DNS EN TIEMPO REAL - PRILABSA');
        console.log('=' .repeat(50));
        console.log(`📡 Monitoreando: ${DOMAIN}`);
        console.log(`🎯 IP objetivo: ${TARGET_IP}`);
        console.log(`⏱️  Intervalo: ${CHECK_INTERVAL/1000} segundos`);
        console.log('\n💡 Presiona Ctrl+C para detener el monitoreo\n');
        
        // Realizar check inicial
        this.performCheck();
        
        // Configurar checks periódicos
        this.interval = setInterval(() => {
            this.performCheck();
        }, CHECK_INTERVAL);
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            console.log('\n🛑 Monitoreo detenido.');
        }
    }
}

// Manejo de señales para limpieza
const monitor = new DNSMonitor();

process.on('SIGINT', () => {
    monitor.stop();
    process.exit(0);
});

process.on('SIGTERM', () => {
    monitor.stop();
    process.exit(0);
});

// Iniciar monitoreo
monitor.start();