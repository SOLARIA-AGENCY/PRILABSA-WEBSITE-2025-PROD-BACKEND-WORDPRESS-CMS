/**
 * Rollback Script
 * Restores the previous version from backup
 */

const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const config = {
  host: 'productos.prilabsa.com',
  user: 'solaria.charlie@blog.prilabsa.com',
  password: 'SoCh2025$%',
  port: 21,
  secure: false,
  remoteRoot: '/public_html/productos.prilabsa.com'
};

async function listBackups() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      secure: config.secure
    });

    await client.cd(config.remoteRoot);
    const files = await client.list();

    // Find backup files
    const backups = files
      .filter(f => f.name.startsWith('index.html.backup-'))
      .sort((a, b) => b.name.localeCompare(a.name)); // Most recent first

    return backups;
  } finally {
    client.close();
  }
}

async function rollback(backupName) {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    console.log('🔗 Connecting to GoDaddy FTP...');
    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      secure: config.secure
    });

    await client.cd(config.remoteRoot);

    console.log(`\n📋 Rolling back to: ${backupName}`);

    // 1. Remove current index.html
    try {
      console.log('  1. Removing current index.html...');
      await client.remove('index.html');
      console.log('     ✓ Removed');
    } catch (e) {
      console.log('     ⚠ Could not remove:', e.message);
    }

    // 2. Rename backup to index.html
    console.log(`  2. Restoring from ${backupName}...`);
    await client.rename(backupName, 'index.html');
    console.log('     ✓ Restored');

    console.log('\n✅ ROLLBACK COMPLETE');
    console.log('\n🔍 Verify at: https://productos.prilabsa.com/');

  } finally {
    client.close();
  }
}

async function main() {
  console.log('🔄 ROLLBACK UTILITY');
  console.log('='.repeat(50));

  // List available backups
  console.log('\n📋 Fetching available backups...');
  const backups = await listBackups();

  if (backups.length === 0) {
    console.log('❌ No backups found on server');
    process.exit(1);
  }

  console.log('\nAvailable backups:');
  backups.forEach((b, i) => {
    console.log(`  ${i + 1}. ${b.name} (${b.size} bytes)`);
  });

  // If argument provided, use it
  const arg = process.argv[2];
  if (arg) {
    if (arg === '--latest' || arg === '-l') {
      await rollback(backups[0].name);
    } else {
      const idx = parseInt(arg) - 1;
      if (idx >= 0 && idx < backups.length) {
        await rollback(backups[idx].name);
      } else {
        console.log('Invalid selection');
        process.exit(1);
      }
    }
  } else {
    // Interactive mode
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('\nSelect backup to restore (number or "q" to quit): ', async (answer) => {
      rl.close();

      if (answer.toLowerCase() === 'q') {
        console.log('Cancelled');
        process.exit(0);
      }

      const idx = parseInt(answer) - 1;
      if (idx >= 0 && idx < backups.length) {
        await rollback(backups[idx].name);
      } else {
        console.log('Invalid selection');
        process.exit(1);
      }
    });
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
