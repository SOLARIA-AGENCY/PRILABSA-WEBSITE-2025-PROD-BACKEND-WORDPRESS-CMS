#!/usr/bin/env node

// EMERGENCY RESTORE: Reasigna descripcion, especificaciones y beneficios
// desde el catálogo confiable JSON al archivo TypeScript julio-2025.ts

const fs = require('fs');
const path = require('path');

const JSON_REFERENCE = path.resolve('MODULO PRODUCTOS PRILABSA CATALOGO JULIO 2025/PRILABSA_CATALOGO_WEB_2025.json');
const TS_TARGET = path.resolve('src/data/products/julio-2025.ts');

function loadReference() {
  const content = fs.readFileSync(JSON_REFERENCE, 'utf8');
  const data = JSON.parse(content);
  const map = new Map();
  for (const p of data.productos) {
    map.set(p.codigo, p);
  }
  return { list: data.productos, map };
}

function backupFile(filePath) {
  const ts = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
  const backupPath = filePath + `.pre-restauracion-${ts}`;
  fs.copyFileSync(filePath, backupPath);
  return backupPath;
}

function escapeJsString(str) {
  // Encode as a JS double-quoted string: escape backslashes, quotes, newlines, tabs
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/\"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '')
    .replace(/\t/g, '\\t');
}

function parseSpecifications(especificaciones) {
  if (!especificaciones) return [];
  const specs = [];
  const lines = String(especificaciones).split('\n').map(l => l.trim()).filter(Boolean);
  for (const line of lines) {
    // Ignore section headers commonly present
    if (/^(ANÁLISIS|ANALISIS|APLICACIÓN|APLICACION|BENEFICIOS|INGREDIENTES|ANÁLISIS GARANTIZADO|ANALISIS GARANTIZADO)/i.test(line)) continue;
    const cleaned = line.replace(/^[•·\-\s]+/, '');
    if (cleaned.includes(':')) {
      const [key, ...rest] = cleaned.split(':');
      specs.push({ key: key.trim(), value: rest.join(':').trim() });
    } else if (cleaned) {
      specs.push({ key: 'Especificación', value: cleaned });
    }
  }
  return specs;
}

function parseBenefits(beneficios) {
  if (!beneficios) return [];
  return String(beneficios)
    .split('\n')
    .map(l => l.trim().replace(/^[•·\-\s]+/, ''))
    .filter(l => l.length > 0 && !/^(ANÁLISIS|ANALISIS|APLICACIÓN|APLICACION|ESPECIFICACIONES|INGREDIENTES)/i.test(l));
}

function serializeSpecsArray(specs) {
  // Create pretty-printed TS array of objects with keys key/value
  if (!specs || specs.length === 0) return '[]';
  const lines = specs.map(s => `      {\n        "key": "${escapeJsString(s.key)}",\n        "value": "${escapeJsString(s.value)}"\n      }`);
  return '[\n' + lines.join(',\n') + '\n    ]';
}

function serializeStringArray(arr) {
  if (!arr || arr.length === 0) return '[]';
  const lines = arr.map(v => `      "${escapeJsString(v)}"`);
  return '[\n' + lines.join(',\n') + '\n    ]';
}

function findAfter(content, fromIndex, regex) {
  const slice = content.slice(fromIndex);
  const m = slice.match(regex);
  if (!m) return null;
  const start = fromIndex + m.index;
  const end = start + m[0].length;
  return { match: m, start, end };
}

function replacePropertyString(content, fromIndex, propName, newValue) {
  const rx = new RegExp(`("${propName}":\\s*")((?:[^"\\]|\\\\.)*)(")`);
  const seg = findAfter(content, fromIndex, rx);
  if (!seg) return { content, changed: false };
  const before = content.slice(0, seg.start);
  const after = content.slice(seg.end);
  const replaced = seg.match[0].replace(seg.match[2], newValue);
  return { content: before + replaced + after, changed: true };
}

function replacePropertyArray(content, fromIndex, propName, newArrayLiteral) {
  const rx = new RegExp(`("${propName}":\\s*)\[[\n\r\t \S\s]*?\]`);
  const seg = findAfter(content, fromIndex, rx);
  if (!seg) return { content, changed: false };
  const before = content.slice(0, seg.start);
  const after = content.slice(seg.end);
  const replaced = seg.match[1] + newArrayLiteral; // keep the property name and colon
  return { content: before + replaced + after, changed: true };
}

function restore() {
  console.log('🚨 Iniciando restauración desde JSON de referencia');
  const { map: referenceMap } = loadReference();
  console.log(`✅ Referencia cargada: ${referenceMap.size} productos`);

  let content = fs.readFileSync(TS_TARGET, 'utf8');
  const backupPath = backupFile(TS_TARGET);
  console.log(`💾 Backup creado: ${backupPath}`);

  // Encontrar cada ocurrencia de codigo y reemplazar propiedades desde ese punto hacia adelante
  const codigoRegex = /\n\s*"codigo":\s*"([A-Z]{2}\d{3})"/g;
  let m;
  let total = 0;
  let updatedDescriptions = 0;
  let updatedSpecs = 0;
  let updatedBenefits = 0;
  const examples = [];

  while ((m = codigoRegex.exec(content)) !== null) {
    total++;
    const codigo = m[1];
    const fromIndex = m.index;
    const ref = referenceMap.get(codigo);
    if (!ref) continue;

    // description
    const descEscaped = escapeJsString(ref.descripcion || '');
    const resDesc = replacePropertyString(content, fromIndex, 'description', descEscaped);
    if (resDesc.changed) {
      content = resDesc.content;
      updatedDescriptions++;
      if (examples.length < 3) examples.push({ codigo, field: 'description' });
    }

    // specifications
    const refSpecs = parseSpecifications(ref.especificaciones);
    const specsSerialized = serializeSpecsArray(refSpecs);
    const resSpecs = replacePropertyArray(content, fromIndex, 'specifications', specsSerialized);
    if (resSpecs.changed) {
      content = resSpecs.content;
      updatedSpecs++;
      if (examples.length < 3) examples.push({ codigo, field: 'specifications' });
    }

    // benefits
    const refBenefits = parseBenefits(ref.beneficios);
    const benefitsSerialized = serializeStringArray(refBenefits);
    const resBenefits = replacePropertyArray(content, fromIndex, 'benefits', benefitsSerialized);
    if (resBenefits.changed) {
      content = resBenefits.content;
      updatedBenefits++;
      if (examples.length < 3) examples.push({ codigo, field: 'benefits' });
    }
  }

  fs.writeFileSync(TS_TARGET, content, 'utf8');

  const percent = total ? Math.round(((updatedDescriptions + updatedSpecs + updatedBenefits) / (total * 3)) * 100) : 0;
  console.log('\n📊 Resumen restauración');
  console.log(`   Productos procesados: ${total}`);
  console.log(`   Descripciones actualizadas: ${updatedDescriptions}`);
  console.log(`   Especificaciones actualizadas: ${updatedSpecs}`);
  console.log(`   Beneficios actualizados: ${updatedBenefits}`);
  console.log(`   Magnitud de cambio (por campo): ${percent}%`);
  if (examples.length) {
    console.log('   Ejemplos de cambios:');
    examples.forEach(e => console.log(`    - ${e.codigo}: ${e.field}`));
  }

  // Validación específica EQ045
  const tsAfter = fs.readFileSync(TS_TARGET, 'utf8');
  const eq045BlockMatch = tsAfter.match(/\{[\s\S]*?\n\s*"codigo":\s*"EQ045"[\s\S]*?\n\s*\},?\n/);
  if (eq045BlockMatch) {
    const eq = eq045BlockMatch[0];
    const descMatch = eq.match(/\n\s*"description":\s*"([\s\S]*?)"\s*,\n/);
    const specs = [...eq.matchAll(/\{\s*\n\s*"key":\s*"([^"]+)",\s*\n\s*"value":\s*"([^"]*)"\s*\n\s*\}/g)].map(m => ({ key: m[1], value: m[2] }));
    const okDesc = !descMatch || descMatch[1].trim() === '' || descMatch[1].trim() === ' ';
    const hasSpecs = specs.some(s => s.key.toLowerCase().startsWith('color') && /amarillo/i.test(s.value)) &&
                     specs.some(s => s.key.toLowerCase().startsWith('material') && /vidrio/i.test(s.value)) &&
                     specs.some(s => s.key.toLowerCase().startsWith('tam') && /150\s*\*\s*30\s*\*\s*2mm/i.test(s.value));
    console.log('\n🎯 Validación EQ045');
    console.log(`   Descripción vacía o básica: ${okDesc ? '✅' : '❌'}`);
    console.log(`   Especificaciones clave presentes: ${hasSpecs ? '✅' : '❌'}`);
  }

  console.log('\n✅ Restauración completada.');
  console.log(`   Backup: ${path.basename(backupPath)}`);
}

try {
  restore();
} catch (err) {
  console.error('❌ Error durante la restauración:', err.message);
  process.exit(1);
}
