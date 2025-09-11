#!/usr/bin/env node

/**
 * Prilabsa Staging Setup Verification Script
 * Verifica que todos los componentes necesarios para el deployment de staging estén configurados
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class StagingVerifier {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.success = [];
        this.projectRoot = path.resolve(__dirname, '..');
    }

    log(message, type = 'info') {
        const timestamp = new Date().toISOString();
        const prefix = {
            'error': '❌',
            'warning': '⚠️',
            'success': '✅',
            'info': 'ℹ️'
        }[type] || 'ℹ️';
        
        console.log(`${prefix} ${message}`);
        
        if (type === 'error') this.errors.push(message);
        if (type === 'warning') this.warnings.push(message);
        if (type === 'success') this.success.push(message);
    }

    checkFileExists(filePath, required = true) {
        const fullPath = path.join(this.projectRoot, filePath);
        const exists = fs.existsSync(fullPath);
        
        if (exists) {
            this.log(`Archivo encontrado: ${filePath}`, 'success');
            return true;
        } else {
            const type = required ? 'error' : 'warning';
            this.log(`Archivo faltante: ${filePath}`, type);
            return false;
        }
    }

    checkPackageJsonScripts() {
        this.log('\n🔍 Verificando scripts en package.json...');
        
        try {
            const packageJson = JSON.parse(fs.readFileSync(path.join(this.projectRoot, 'package.json'), 'utf8'));
            const requiredScripts = [
                'deploy:staging',
                'deploy:staging:fast',
                'deploy:staging:full',
                'setup:staging'
            ];
            
            requiredScripts.forEach(script => {
                if (packageJson.scripts && packageJson.scripts[script]) {
                    this.log(`Script configurado: ${script}`, 'success');
                } else {
                    this.log(`Script faltante: ${script}`, 'error');
                }
            });
        } catch (error) {
            this.log(`Error leyendo package.json: ${error.message}`, 'error');
        }
    }

    checkEnvironmentFiles() {
        this.log('\n🔍 Verificando archivos de entorno...');
        
        // Archivos requeridos
        this.checkFileExists('.env.staging', true);
        this.checkFileExists('.ftpconfig.staging.example.json', true);
        
        // Archivos opcionales (no deben estar en repo)
        if (this.checkFileExists('.ftpconfig.staging.json', false)) {
            this.log('Archivo .ftpconfig.staging.json encontrado - verificar que no esté en el repositorio', 'warning');
        }
    }

    checkGitIgnore() {
        this.log('\n🔍 Verificando .gitignore...');
        
        try {
            const gitignore = fs.readFileSync(path.join(this.projectRoot, '.gitignore'), 'utf8');
            const requiredEntries = [
                '.ftpconfig.staging.json',
                '.ssh/',
                'prilabsa_staging_deploy_key',
                'staging-deployment-report.json'
            ];
            
            requiredEntries.forEach(entry => {
                if (gitignore.includes(entry)) {
                    this.log(`Entrada en .gitignore: ${entry}`, 'success');
                } else {
                    this.log(`Entrada faltante en .gitignore: ${entry}`, 'warning');
                }
            });
        } catch (error) {
            this.log(`Error leyendo .gitignore: ${error.message}`, 'error');
        }
    }

    checkScriptFiles() {
        this.log('\n🔍 Verificando scripts de deployment...');
        
        const scriptFiles = [
            'scripts/deploy-staging.js',
            'scripts/setup-staging-ssh.sh'
        ];
        
        scriptFiles.forEach(script => {
            if (this.checkFileExists(script, true)) {
                // Verificar permisos de ejecución para scripts .sh
                if (script.endsWith('.sh')) {
                    try {
                        const stats = fs.statSync(path.join(this.projectRoot, script));
                        const isExecutable = (stats.mode & parseInt('111', 8)) !== 0;
                        
                        if (isExecutable) {
                            this.log(`Script ejecutable: ${script}`, 'success');
                        } else {
                            this.log(`Script sin permisos de ejecución: ${script}`, 'warning');
                        }
                    } catch (error) {
                        this.log(`Error verificando permisos de ${script}: ${error.message}`, 'warning');
                    }
                }
            }
        });
    }

    checkGitHubWorkflow() {
        this.log('\n🔍 Verificando GitHub Actions workflow...');
        
        this.checkFileExists('.github/workflows/deploy-staging.yml', true);
    }

    checkSSHConfiguration() {
        this.log('\n🔍 Verificando configuración SSH...');
        
        this.checkFileExists('.ssh/config-staging', true);
        
        // Verificar si existe la clave privada (no debería estar en repo)
        const sshKeyPaths = [
            '.ssh/prilabsa_staging_deploy_key',
            'prilabsa_staging_deploy_key'
        ];
        
        sshKeyPaths.forEach(keyPath => {
            if (this.checkFileExists(keyPath, false)) {
                this.log(`ADVERTENCIA: Clave SSH privada encontrada en ${keyPath} - NO debe estar en el repositorio`, 'error');
            }
        });
    }

    checkNodeVersion() {
        this.log('\n🔍 Verificando versión de Node.js...');
        
        try {
            const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
            const majorVersion = parseInt(nodeVersion.replace('v', '').split('.')[0]);
            
            if (majorVersion >= 20) {
                this.log(`Versión de Node.js compatible: ${nodeVersion}`, 'success');
            } else {
                this.log(`Versión de Node.js incompatible: ${nodeVersion} (requerido: >=20.0.0)`, 'error');
            }
        } catch (error) {
            this.log(`Error verificando versión de Node.js: ${error.message}`, 'error');
        }
    }

    checkDependencies() {
        this.log('\n🔍 Verificando dependencias...');
        
        try {
            // Verificar que node_modules existe
            if (fs.existsSync(path.join(this.projectRoot, 'node_modules'))) {
                this.log('Directorio node_modules encontrado', 'success');
                
                // Verificar dependencias críticas
                const criticalDeps = ['vite', 'react', 'typescript'];
                criticalDeps.forEach(dep => {
                    const depPath = path.join(this.projectRoot, 'node_modules', dep);
                    if (fs.existsSync(depPath)) {
                        this.log(`Dependencia instalada: ${dep}`, 'success');
                    } else {
                        this.log(`Dependencia faltante: ${dep}`, 'error');
                    }
                });
            } else {
                this.log('Directorio node_modules no encontrado - ejecutar npm install', 'error');
            }
        } catch (error) {
            this.log(`Error verificando dependencias: ${error.message}`, 'error');
        }
    }

    checkBuildConfiguration() {
        this.log('\n🔍 Verificando configuración de build...');
        
        // Verificar archivos de configuración
        const configFiles = [
            'vite.config.ts',
            'tsconfig.json',
            'tailwind.config.cjs'
        ];
        
        configFiles.forEach(config => {
            this.checkFileExists(config, true);
        });
        
        // Verificar que se puede hacer build
        try {
            this.log('Probando build del proyecto...');
            execSync('npm run type-check', { stdio: 'pipe' });
            this.log('Type check exitoso', 'success');
        } catch (error) {
            this.log('Advertencia: Errores de TypeScript detectados - el deployment continuará', 'warning');
            this.log('Nota: Los errores de tipos no bloquean el build de Vite en staging', 'info');
        }
    }

    generateReport() {
        this.log('\n📊 RESUMEN DE VERIFICACIÓN');
        this.log('='.repeat(50));
        
        this.log(`✅ Verificaciones exitosas: ${this.success.length}`, 'info');
        this.log(`⚠️  Advertencias: ${this.warnings.length}`, 'info');
        this.log(`❌ Errores: ${this.errors.length}`, 'info');
        
        if (this.errors.length > 0) {
            this.log('\n❌ ERRORES ENCONTRADOS:', 'error');
            this.errors.forEach((error, index) => {
                console.log(`   ${index + 1}. ${error}`);
            });
        }
        
        if (this.warnings.length > 0) {
            this.log('\n⚠️  ADVERTENCIAS:', 'warning');
            this.warnings.forEach((warning, index) => {
                console.log(`   ${index + 1}. ${warning}`);
            });
        }
        
        this.log('\n' + '='.repeat(50));
        
        if (this.errors.length === 0) {
            this.log('🎉 Configuración de staging lista para usar!', 'success');
            this.log('\n📝 Próximos pasos:');
            this.log('   1. Añadir la clave SSH como Deploy Key en GitHub');
            this.log('   2. Configurar secretos FTP en GitHub Actions');
            this.log('   3. Crear .ftpconfig.staging.json con credenciales');
            this.log('   4. Ejecutar: npm run deploy:staging');
        } else {
            this.log('🔧 Corregir errores antes de proceder con el deployment', 'error');
            process.exit(1);
        }
    }

    async run() {
        console.log('🚀 Prilabsa Staging Setup Verification');
        console.log('=====================================\n');
        
        this.checkNodeVersion();
        this.checkDependencies();
        this.checkPackageJsonScripts();
        this.checkEnvironmentFiles();
        this.checkScriptFiles();
        this.checkGitHubWorkflow();
        this.checkSSHConfiguration();
        this.checkGitIgnore();
        this.checkBuildConfiguration();
        
        this.generateReport();
    }
}

// Ejecutar verificación si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
    const verifier = new StagingVerifier();
    verifier.run().catch(error => {
        console.error('❌ Error durante la verificación:', error.message);
        process.exit(1);
    });
}

export default StagingVerifier;