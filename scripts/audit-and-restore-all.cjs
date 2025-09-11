#!/usr/bin/env node

// Full audit + restore pipeline
// - Compares JSON vs CSV vs MD (report only)
// - Restores julio-2025.ts from JSON (descriptions/specs/benefits)
// - Realigns Spanish translations in product-translations.ts from JSON
// - Emits summary stats

const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');

const JSON_PATH = path.resolve('MODULO PRODUCTOS PRILABSA CATALOGO JULIO 2025/PRILABSA_CATALOGO_WEB_2025.json');
const CSV_PATH = path.resolve('MODULO PRODUCTOS PRILABSA CATALOGO JULIO 2025/PRILABSA_CATALOGO_COMPLETO_2025.csv');
const MD_PATH = path.resolve('MODULO PRODUCTOS PRILABSA CATALOGO JULIO 2025/PRILABSA_CATALOGO_COMPLETO_2025.md');
const TS_PRODUCTS = path.resolve('src/data/products/julio-2025.ts');
const TS_TRANSLATIONS = path.resolve('src/data/products/product-translations.ts');

function loadJSON() {
  const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
  const map = new Map();
  data.productos.forEach(p => map.set(p.codigo, p));
  return { list: data.productos, map };
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
    if (/^(ANÁLISIS|ANALISIS|APLICACIÓN|APLICACION|BENEFICIOS|INGREDIENTES|PRESENTACION|PRESENTACIÓN|PRESENTACAO|PRESENTAÇÃO)/i.test(raw)) continue;
    const line = raw.replace(/^[•·\-\s]+/, '');
    if (line.includes(':')) {
      const [k, ...r] = line.split(':');
      res.push({ key: k.trim(), value: r.join(':').trim() });
    } else if (line) {
      res.push({ key: 'Especificación', value: line });
    }
  }
  return res;
}

function parseBenefits(text) {
  if (!text) return [];
  return String(text)
    .split('\n')
    .map(s => s.trim().replace(/^[•·\-\s]+/, ''))
    .filter(s => s.length > 0 && !/^(ANÁLISIS|ANALISIS|APLICACIÓN|APLICACION|ESPECIFICACIONES|INGREDIENTES|PRESENTACION|PRESENTACIÓN)/i.test(s));
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

function readCSV() {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(CSV_PATH)
      .pipe(csvParser())
      .on('data', (row) => rows.push(row))
      .on('end', () => {
        const map = new Map();
        rows.forEach(r => {
          const codigo = (r.codigo || r.Codigo || r.Codigo_Producto || '').trim();
          if (codigo) {
            map.set(codigo, {
              codigo,
              descripcion: (r.descripcion || r.Descripcion || r.Descripcion_Larga || '').toString(),
              especificaciones: (r.especificaciones || r.Especificaciones || '').toString(),
              beneficios: (r.beneficios || r.Beneficios || '').toString(),
              presentacion: (r.presentacion || r.Presentacion || '').toString(),
              nombre: (r.nombre || r.Nombre || '').toString(),
              categoria: (r.categoria || r.Categoria || '').toString()
            });
          }
        });
        resolve(map);
      })
      .on('error', reject);
  });
}

function parseMD() {
  const content = fs.readFileSync(MD_PATH, 'utf8');
  const result = new Map();
  // Very simple parser by sections starting with ### CODE - Name
  const regex = /###\s+([A-Z]{2}\d{3})\s+-\s+(.+?)\n\n([\s\S]*?)(?=\n---|\n###|$)/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const codigo = m[1];
    const section = m[3];
    const descMatch = section.match(/\*\*Descripción:\*\*[\s\S]*?\n([\s\S]*?)(?=\n\*\*|$)/);
    const espMatch = section.match(/\*\*Especificaciones:\*\*[\s\S]*?\n([\s\S]*?)(?=\n\*\*|$)/);
    const benMatch = section.match(/\*\*Beneficios:\*\*[\s\S]*?\n([\s\S]*?)(?=\n\*\*|$)/);
    const preMatch = section.match(/\*\*Presentación:\*\*[\s\S]*?\n([\s\S]*?)(?=\n\*\*|$)/);
    result.set(codigo, {
      descripcion: descMatch ? descMatch[1].trim() : '',
      especificaciones: espMatch ? espMatch[1].trim() : '',
      beneficios: benMatch ? benMatch[1].trim() : '',
      presentacion: preMatch ? preMatch[1].trim() : ''
    });
  }
  return result;
}

function backup(filePath) {
  const ts = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
  const out = filePath + `.pre-restauracion-${ts}`;
  fs.copyFileSync(filePath, out);
  return out;
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

async function main() {
  console.log('🔎 Audit + Restore: JSON/CSV/MD → TS + ES translations');
  const { list: jsonList, map: jsonMap } = loadJSON();
  const csvMap = await readCSV();
  const mdMap = parseMD();

  // 1) Consistency report among sources
  const issues = [];
  jsonList.forEach(p => {
    const csv = csvMap.get(p.codigo);
    const md = mdMap.get(p.codigo);
    const refDesc = (p.descripcion || '').replace(/\s+/g, ' ').trim();
    const csvDesc = csv ? (csv.descripcion || '').replace(/\s+/g, ' ').trim() : '';
    const mdDesc = md ? (md.descripcion || '').replace(/\s+/g, ' ').trim() : '';
    if (csv && refDesc !== csvDesc) {
      issues.push({ codigo: p.codigo, tipo: 'JSON_vs_CSV_descripcion', json: refDesc.slice(0,120), csv: csvDesc.slice(0,120) });
    }
    if (md && refDesc !== mdDesc) {
      issues.push({ codigo: p.codigo, tipo: 'JSON_vs_MD_descripcion', json: refDesc.slice(0,120), md: mdDesc.slice(0,120) });
    }
  });

  // Write consistency report
  const reportDir = path.resolve('scripts/reports');
  if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
  const consistencyPath = path.join(reportDir, `sources-consistency-report-${Date.now()}.json`);
  fs.writeFileSync(consistencyPath, JSON.stringify({
    totals: {
      productos: jsonList.length,
      csvFound: csvMap.size,
      mdFound: mdMap.size,
      discrepancies: issues.length
    },
    issues
  }, null, 2));
  console.log('📝 Sources consistency report:', consistencyPath);

  // 2) Restore julio-2025.ts from JSON
  let ts = fs.readFileSync(TS_PRODUCTS, 'utf8');
  const tsBackup = backup(TS_PRODUCTS);
  console.log('💾 Backup (julio-2025.ts):', path.basename(tsBackup));

  const codeRx = /\n\s*"codigo":\s*"([A-Z]{2}\d{3})"/g;
  let m;
  let total = 0, descUpd = 0, specUpd = 0, benUpd = 0;
  while ((m = codeRx.exec(ts)) !== null) {
    total++;
    const codigo = m[1];
    const ref = jsonMap.get(codigo);
    if (!ref) continue;
    const from = m.index;
    const r1 = replaceStringProp(ts, from, 'description', escapeJsString(ref.descripcion || ''));
    if (r1.changed) { ts = r1.content; descUpd++; }
    const r2 = replaceArrayProp(ts, from, 'specifications', serializeSpecs(parseSpecs(ref.especificaciones)));
    if (r2.changed) { ts = r2.content; specUpd++; }
    const r3 = replaceArrayProp(ts, from, 'benefits', serializeStrings(parseBenefits(ref.beneficios)));
    if (r3.changed) { ts = r3.content; benUpd++; }
  }
  fs.writeFileSync(TS_PRODUCTS, ts, 'utf8');
  console.log('🔧 Restored TS fields from JSON:', { total, descUpd, specUpd, benUpd });

  // 3) Align Spanish translations to JSON
  let tr = fs.readFileSync(TS_TRANSLATIONS, 'utf8');
  const trBackup = backup(TS_TRANSLATIONS);
  console.log('💾 Backup (product-translations.ts):', path.basename(trBackup));

  let esUpdated = 0;
  for (const p of jsonList) {
    const codeBlockRx = new RegExp(`("${p.codigo}":\\s*\\{[\\s\\S]*?\\bes:\\s*\\{)([\\s\\S]*?)(\\}\\s*,\\s*en:|\\}\\s*,\\s*pt:|\\}\\s*\\})`);
    const match = tr.match(codeBlockRx);
    if (!match) continue; // translations may not define this code
    const esBody = `\n      name: "${escapeJsString(p.nombre)}",\n      description: "${escapeJsString(p.descripcion || '')}",\n      benefits: ${serializeStrings(parseBenefits(p.beneficios))},\n      presentation: ${serializeStrings((p.presentacion || '').split('\n').filter(x=>x.trim()).map(x=>x.replace(/^[-•\s]+/, '')))},\n      specifications: ${serializeSpecs(parseSpecs(p.especificaciones))}\n    `;
    const newBlock = match[1] + esBody + match[3];
    tr = tr.replace(codeBlockRx, newBlock);
    esUpdated++;
  }
  fs.writeFileSync(TS_TRANSLATIONS, tr, 'utf8');
  console.log('🔧 Spanish translations aligned to JSON:', esUpdated);

  // 4) Output executive summary
  const summaryPath = path.join(reportDir, `audit-restore-summary-${Date.now()}.json`);
  fs.writeFileSync(summaryPath, JSON.stringify({
    totals: {
      productos: jsonList.length,
      csvFound: csvMap.size,
      mdFound: mdMap.size
    },
    tsRestore: { totalProcessed: total, descriptionsUpdated: descUpd, specsUpdated: specUpd, benefitsUpdated: benUpd },
    translations: { esUpdated },
    sourcesDiscrepancies: issues.length,
    consistencyReport: path.basename(consistencyPath)
  }, null, 2));
  console.log('📣 Summary:', summaryPath);
}

main().catch(err => { console.error('❌ Audit+Restore failed:', err); process.exit(1); });

