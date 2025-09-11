#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const JSON_REFERENCE = path.resolve('MODULO PRODUCTOS PRILABSA CATALOGO JULIO 2025/PRILABSA_CATALOGO_WEB_2025.json');
const TS_TARGET = path.resolve('src/data/products/julio-2025.ts');

function loadReference() {
  const content = fs.readFileSync(JSON_REFERENCE, 'utf8');
  const data = JSON.parse(content);
  const map = new Map();
  for (const p of data.productos) map.set(p.codigo, p);
  return map;
}

function backup(file) {
  const ts = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
  const out = file + `.pre-restauracion-${ts}`;
  fs.copyFileSync(file, out);
  return out;
}

function escapeJsString(str) {
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/\"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '')
    .replace(/\t/g, '\\t');
}

function parseSpecs(text) {
  if (!text) return [];
  const lines = String(text).split('\n').map(s => s.trim()).filter(Boolean);
  const res = [];
  for (const raw of lines) {
    if (/^(ANÁLISIS|ANALISIS|APLICACIÓN|APLICACION|BENEFICIOS|INGREDIENTES|PRESENTACION|PRESENTACIÓN)/i.test(raw)) continue;
    const line = raw.replace(/^[•·\-\s]+/, '');
    if (line.includes(':')) {
      const [k, ...r] = line.split(':');
      res.push({ key: k.trim(), value: r.join(':').trim() });
    } else {
      res.push({ key: 'Especificación', value: line });
    }
  }
  return res;
}

function parseBenefits(text) {
  if (!text) return [];
  return String(text).split('\n')
    .map(s => s.trim().replace(/^[•·\-\s]+/, ''))
    .filter(s => s.length > 0 && !/^(ANÁLISIS|ANALISIS|APLICACIÓN|APLICACION|ESPECIFICACIONES|INGREDIENTES)/i.test(s));
}

function serializeSpecs(specs) {
  if (!specs || specs.length === 0) return '[]';
  const parts = specs.map(s => `      {\n        "key": "${escapeJsString(s.key)}",\n        "value": "${escapeJsString(s.value)}"\n      }`);
  return '[\n' + parts.join(',\n') + '\n    ]';
}

function serializeStrings(arr) {
  if (!arr || arr.length === 0) return '[]';
  const parts = arr.map(s => `      "${escapeJsString(s)}"`);
  return '[\n' + parts.join(',\n') + '\n    ]';
}

function findAfter(content, from, pattern) {
  const slice = content.slice(from);
  const m = slice.match(pattern);
  if (!m) return null;
  const start = from + m.index;
  const end = start + m[0].length;
  return { match: m, start, end };
}

function replaceStringProp(content, from, prop, value) {
  const rx = new RegExp('("' + prop + '":\\s*")((?:[^"\\\\]|\\\\.)*)(")');
  const seg = findAfter(content, from, rx);
  if (!seg) return { content, changed: false };
  const before = content.slice(0, seg.start);
  const after = content.slice(seg.end);
  const replaced = seg.match[0].replace(seg.match[2], value);
  return { content: before + replaced + after, changed: true };
}

function replaceArrayProp(content, from, prop, arrayLiteral) {
  const rx = new RegExp('("' + prop + '":\\s*)\[[\n\r\t \S\s]*?\]');
  const seg = findAfter(content, from, rx);
  if (!seg) return { content, changed: false };
  const before = content.slice(0, seg.start);
  const after = content.slice(seg.end);
  const replaced = seg.match[1] + arrayLiteral;
  return { content: before + replaced + after, changed: true };
}

function main() {
  console.log('🚨 Restauración segura: JSON → julio-2025.ts');
  const ref = loadReference();
  let ts = fs.readFileSync(TS_TARGET, 'utf8');
  const backupPath = backup(TS_TARGET);
  console.log('💾 Backup:', path.basename(backupPath));

  const codeRx = /\n\s*"codigo":\s*"([A-Z]{2}\d{3})"/g;
  let m;
  let total = 0, descUpd = 0, specUpd = 0, benUpd = 0;

  while ((m = codeRx.exec(ts)) !== null) {
    total++;
    const codigo = m[1];
    const from = m.index;
    const p = ref.get(codigo);
    if (!p) continue;

    // description
    const r1 = replaceStringProp(ts, from, 'description', escapeJsString(p.descripcion || ''));
    if (r1.changed) { ts = r1.content; descUpd++; }

    // specifications
    const specs = parseSpecs(p.especificaciones);
    const r2 = replaceArrayProp(ts, from, 'specifications', serializeSpecs(specs));
    if (r2.changed) { ts = r2.content; specUpd++; }

    // benefits
    const bens = parseBenefits(p.beneficios);
    const r3 = replaceArrayProp(ts, from, 'benefits', serializeStrings(bens));
    if (r3.changed) { ts = r3.content; benUpd++; }
  }

  fs.writeFileSync(TS_TARGET, ts, 'utf8');

  console.log('\n📊 Resultado:');
  console.log('  Productos procesados:', total);
  console.log('  Descripciones actualizadas:', descUpd);
  console.log('  Especificaciones actualizadas:', specUpd);
  console.log('  Beneficios actualizados:', benUpd);

  const eq = ts.match(/\n\s*"codigo":\s*"EQ045"[\s\S]*?(?=\n\s*"id":|\]\s*;|\n\s*\})/);
  if (eq) {
    const block = eq[0];
    const desc = (block.match(/"description":\s*"([\s\S]*?)"/) || [,''])[1];
    const hasColor = /"key":\s*"Color"[\s\S]*?"value":\s*"[^\"]*amarillo/i.test(block);
    const hasMat = /"key":\s*"Material"[\s\S]*?"value":\s*"[^\"]*vidrio/i.test(block);
    const hasTam = /"key":\s*"Tam[aá]no"[\s\S]*?"value":\s*"[^\"]*150\s*\*\s*30\s*\*\s*2mm/i.test(block);
    console.log('\n🎯 EQ045 check:');
    console.log('  - Descripción vacía/básica:', desc.trim() === '' ? '✅' : '❌');
    console.log('  - Specs OK (color/material/tamaño):', (hasColor && hasMat && hasTam) ? '✅' : '❌');
  }
}

try { main(); } catch (e) {
  console.error('❌ Error:', e.message);
  process.exit(1);
}

