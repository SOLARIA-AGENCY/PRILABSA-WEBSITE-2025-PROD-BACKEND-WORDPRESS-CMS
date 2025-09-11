#!/usr/bin/env node

/**
 * Monitor DNS Fix Progress - prilabsa.solaria.agency
 * Monitorea el progreso de la corrección DNS en tiempo real
 */

const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

class DNSFixMonitor {
    constructor() {
        this.domain = 'prilabsa.solaria.agency';
        this.originIP = '193.203.168.188';
        this.cloudflareIPs = ['172.67.212.73', '104.21.35.28'];
        this.checkInterval = 30000; // 30 segundos
        this.maxChecks = 20; // 10 minutos máximo
        this.currentCheck = 0;
    }

    async checkDNSResolution() {
        try {
            const { stdout } = await execAsync(`dig ${this.domain} A +short`);
            const ips = stdout.trim().split('\n').filter(ip => ip);
            return {
                success: true,
                ips: ips,
                isCloudflare: ips.some(ip => this.cloudflareIPs.includes(ip))
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async checkOriginServer() {
        try {
            const { stdout } = await execAsync(
                `curl -I http://${this.originIP} -H "Host: ${this.domain}" --connect-timeout 10 --max-time 15`
            );
            
            const isRedirecting = stdout.includes('301') && stdout.includes('solaria.agency');
            const statusCode = stdout.match(/HTTP\/[\d\.]+\s+(\d+)/)?.[1];
            
            return {
                success: true,
                statusCode: statusCode,
                isRedirecting: isRedirecting,
                response: stdout.split('\n')[0]
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async checkOriginSSL() {
        try {
            const { stdout } = await execAsync(
                `curl -I https://${this.originIP} -H "Host: ${this.domain}" --insecure --connect-timeout 10 --max-time 15`
            );
            
            const isRedirecting = stdout.includes('301') && stdout.includes('solaria.agency');
            const statusCode = stdout.match(/HTTP\/[\d\.]+\s+(\d+)/)?.[1];
            
            return {
                success: true,
                statusCode: statusCode,
                isRedirecting: isRedirecting,
                response: stdout.split('\n')[0]
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async checkCloudflareProxy() {
        try {
            const { stdout } = await execAsync(
                `curl -I https://${this.domain} --connect-timeout 10 --max-time 15`
            );
            
            const statusCode = stdout.match(/HTTP\/[\d\.]+\s+(\d+)/)?.[1];
            const hasCloudflareHeaders = stdout.includes('cloudflare');
            
            return {
                success: true,
                statusCode: statusCode,
                hasCloudflareHeaders: hasCloudflareHeaders,
                response: stdout.split('\n')[0]
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    getStatusIcon(status) {
        switch (status) {
            case 'OK': return '✅';
            case 'WARNING': return '⚠️';
            case 'ERROR': return '❌';
            case 'PROGRESS': return '🔄';
            default: return 'ℹ️';
        }
    }

    async performCheck() {
        this.currentCheck++;
        const timestamp = new Date().toLocaleTimeString();
        
        console.log(`\n${'='.repeat(60)}`);
        console.log(`🔍 CHECK #${this.currentCheck} - ${timestamp}`);
        console.log(`${'='.repeat(60)}`);

        // 1. DNS Resolution
        const dnsResult = await this.checkDNSResolution();
        if (dnsResult.success && dnsResult.isCloudflare) {
            console.log(`${this.getStatusIcon('OK')} DNS: Resuelve a Cloudflare (${dnsResult.ips.join(', ')})`);
        } else {
            console.log(`${this.getStatusIcon('ERROR')} DNS: ${dnsResult.error || 'No resuelve a Cloudflare'}`);
        }

        // 2. Origin Server HTTP
        const originResult = await this.checkOriginServer();
        if (originResult.success) {
            if (originResult.isRedirecting) {
                console.log(`${this.getStatusIcon('WARNING')} Origin HTTP: ${originResult.statusCode} - AÚN REDIRIGIENDO`);
            } else if (originResult.statusCode === '200') {
                console.log(`${this.getStatusIcon('OK')} Origin HTTP: ${originResult.statusCode} - CONFIGURADO CORRECTAMENTE`);
            } else {
                console.log(`${this.getStatusIcon('WARNING')} Origin HTTP: ${originResult.statusCode}`);
            }
        } else {
            console.log(`${this.getStatusIcon('ERROR')} Origin HTTP: ${originResult.error}`);
        }

        // 3. Origin Server HTTPS
        const originSSLResult = await this.checkOriginSSL();
        if (originSSLResult.success) {
            if (originSSLResult.isRedirecting) {
                console.log(`${this.getStatusIcon('WARNING')} Origin HTTPS: ${originSSLResult.statusCode} - AÚN REDIRIGIENDO`);
            } else if (originSSLResult.statusCode === '200') {
                console.log(`${this.getStatusIcon('OK')} Origin HTTPS: ${originSSLResult.statusCode} - CONFIGURADO CORRECTAMENTE`);
            } else {
                console.log(`${this.getStatusIcon('WARNING')} Origin HTTPS: ${originSSLResult.statusCode}`);
            }
        } else {
            console.log(`${this.getStatusIcon('ERROR')} Origin HTTPS: ${originSSLResult.error}`);
        }

        // 4. Cloudflare Proxy
        const proxyResult = await this.checkCloudflareProxy();
        if (proxyResult.success) {
            if (proxyResult.statusCode === '200') {
                console.log(`${this.getStatusIcon('OK')} Cloudflare: ${proxyResult.statusCode} - FUNCIONANDO PERFECTAMENTE`);
                return 'FIXED';
            } else if (proxyResult.statusCode === '525') {
                console.log(`${this.getStatusIcon('WARNING')} Cloudflare: ${proxyResult.statusCode} - SSL Handshake Error (esperando fix)`);
            } else {
                console.log(`${this.getStatusIcon('WARNING')} Cloudflare: ${proxyResult.statusCode}`);
            }
        } else {
            console.log(`${this.getStatusIcon('ERROR')} Cloudflare: ${proxyResult.error}`);
        }

        // Determinar estado general
        const isFixed = !originResult.isRedirecting && !originSSLResult.isRedirecting && proxyResult.statusCode === '200';
        const isProgressing = originResult.success || originSSLResult.success;

        if (isFixed) {
            console.log(`\n🎉 ${this.getStatusIcon('OK')} PROBLEMA RESUELTO - prilabsa.solaria.agency funcionando correctamente`);
            return 'FIXED';
        } else if (isProgressing) {
            console.log(`\n${this.getStatusIcon('PROGRESS')} Progreso detectado - continuando monitoreo...`);
            return 'PROGRESS';
        } else {
            console.log(`\n${this.getStatusIcon('WARNING')} Esperando configuración en Hostinger...`);
            return 'WAITING';
        }
    }

    async startMonitoring() {
        console.log(`🚀 Iniciando monitoreo DNS para ${this.domain}`);
        console.log(`⏱️  Verificando cada ${this.checkInterval/1000} segundos`);
        console.log(`🎯 Máximo ${this.maxChecks} verificaciones (${(this.maxChecks * this.checkInterval)/60000} minutos)`);
        
        while (this.currentCheck < this.maxChecks) {
            const result = await this.performCheck();
            
            if (result === 'FIXED') {
                console.log(`\n🏆 MISIÓN COMPLETADA - DNS configurado correctamente`);
                console.log(`📊 Verificaciones realizadas: ${this.currentCheck}/${this.maxChecks}`);
                break;
            }
            
            if (this.currentCheck < this.maxChecks) {
                console.log(`\n⏳ Próxima verificación en ${this.checkInterval/1000} segundos...`);
                await new Promise(resolve => setTimeout(resolve, this.checkInterval));
            }
        }
        
        if (this.currentCheck >= this.maxChecks) {
            console.log(`\n⏰ Tiempo de monitoreo agotado`);
            console.log(`📋 Revisar configuración manual en Hostinger`);
        }
    }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
    const monitor = new DNSFixMonitor();
    monitor.startMonitoring().catch(console.error);
}

module.exports = DNSFixMonitor;