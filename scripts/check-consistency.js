#!/usr/bin/env node
/**
 * Confere se index.html ainda bate com business.json (preço, telefone, horários).
 * Não há build system neste repo (site estático), então isso roda manualmente:
 *
 *   node scripts/check-consistency.js
 *
 * Sai com código 1 se achar alguma divergência (útil pra rodar antes de publicar).
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const business = JSON.parse(fs.readFileSync(path.join(root, 'business.json'), 'utf8'));
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

let problems = 0;
function check(label, needle) {
  if (!html.includes(needle)) {
    console.error(`[DIVERGÊNCIA] ${label}: não encontrei "${needle}" no index.html`);
    problems++;
  } else {
    console.log(`[ok] ${label}`);
  }
}

check('Preço dia útil', business.prices.weekdayMonToFri);
check('Preço fim de semana/feriado', business.prices.weekendAndHolidays);
check('Telefone (WhatsApp wa.me)', '5521997912517');
check('Endereço', business.address.streetAddress);
check('Nome do restaurante', business.name);

console.log('');
if (problems > 0) {
  console.error(`${problems} divergência(s) encontrada(s). Atualize business.json E index.html juntos.`);
  process.exit(1);
} else {
  console.log('Tudo consistente entre business.json e index.html.');
}
