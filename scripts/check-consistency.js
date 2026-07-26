#!/usr/bin/env node
/**
 * Confere se as páginas e o chat ainda batem com business.json.
 * Não há build system neste repo (site estático), então isso roda manualmente:
 *
 *   node scripts/check-consistency.js
 *
 * Sai com código 1 se achar alguma divergência (útil pra rodar antes de publicar).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(currentDir, '..');
const business = JSON.parse(fs.readFileSync(path.join(root, 'business.json'), 'utf8'));
const files = {
  'index.html': fs.readFileSync(path.join(root, 'index.html'), 'utf8'),
  'cardapio/index.html': fs.readFileSync(path.join(root, 'cardapio', 'index.html'), 'utf8'),
  'chat.js': fs.readFileSync(path.join(root, 'chat.js'), 'utf8'),
};

let problems = 0;
function check(label, needle, fileNames = ['index.html']) {
  const missing = fileNames.filter(fileName => !files[fileName].includes(needle));
  if (missing.length > 0) {
    console.error(`[DIVERGÊNCIA] ${label}: não encontrei "${needle}" em ${missing.join(', ')}`);
    problems++;
  } else {
    console.log(`[ok] ${label}`);
  }
}

check('Preço dia útil', business.prices.weekdayMonToFri, ['index.html', 'chat.js']);
check('Preço fim de semana/feriado', business.prices.weekendAndHolidays, ['index.html', 'chat.js']);
check('Telefone (WhatsApp wa.me)', '5521997912517', ['index.html', 'cardapio/index.html', 'chat.js']);
check('Endereço', business.address.streetAddress);
check('Nome do restaurante', business.name);
check('CEP público', business.address.postalCode);
check('Página de cardápio no sitemap', business.links.cardapioPage, ['index.html']);

console.log('');
if (problems > 0) {
  console.error(`${problems} divergência(s) encontrada(s). Atualize business.json, páginas e chat juntos.`);
  process.exit(1);
} else {
  console.log('Tudo consistente entre business.json, páginas e chat.');
}
