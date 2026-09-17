const test = require('node:test');
const assert = require('node:assert');
const { calcularCuota, formatearResultado } = require('../scripts/utils');

test('calcularCuota - caso conocido (prestamo 1,000,000 a 12 meses, i=0.02)', () => {
  const cuota = calcularCuota(1000000, 12, 0.02);
  assert.ok(Math.abs(cuota - 94560.19) < 1);
});

test('calcularCuota - a mas interes, mayor cuota', () => {
  const cuotaBaja = calcularCuota(1000000, 12, 0.01);
  const cuotaAlta = calcularCuota(1000000, 12, 0.05);
  assert.ok(cuotaAlta > cuotaBaja);
});

test('calcularCuota - a mas meses (mismo interes), menor cuota', () => {
  const cuota12 = calcularCuota(1000000, 12, 0.02);
  const cuota24 = calcularCuota(1000000, 24, 0.02);
  assert.ok(cuota24 < cuota12);
});

test('formatearResultado - respeta el formato pedido en la practica', () => {
  const cuota = calcularCuota(500000, 6, 0.015);
  const texto = formatearResultado('Sergio', 500000, 6, 0.015, cuota);
  assert.match(texto, /^Sergio – \$\d+\.\d{2} -- \$500000 -- 6 meses -- interés 1\.50%$/);
});
