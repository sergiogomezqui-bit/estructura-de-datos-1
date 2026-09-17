import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  calcularCuota,
  formatearResultado,
  crearRegistro,
  desplegarTodos,
  sumatoriaCuotas,
  cuotasMayoresA,
  paganEnMenosDeUnAnio,
  primerPrestamoSuperiorA,
  primerInteresInferiorA,
  incrementarCuotas,
  decrementarPrestamos,
  soloCuotas,
} from '../Scripts/funciones.js';

test('calcularCuota calcula la amortización francesa (caso exacto n=1)', () => {
  // con n=1, cuota = prestamo * (1+i), sin importar redondeos intermedios
  const cuota = calcularCuota(1000000, 1, 0.1);
  assert.ok(Math.abs(cuota - 1100000) < 1e-6);
});

test('formatearResultado usa el formato exigido por la práctica', () => {
  const texto = formatearResultado('Juan', 1000000, 1, 0.1, 1100000);
  assert.equal(
    texto,
    'Juan debe pagar $ 1100000.00 cada mes por el préstamo de $ 1000000 a 1 meses con el interés del 10.00%'
  );
});

const registros = [
  crearRegistro('Ana', 2000000, 6, 0.03),
  crearRegistro('Luis', 6000000, 24, 0.015),
  crearRegistro('Marco', 10000000, 36, 0.01),
];

test('desplegarTodos junta una línea por registro', () => {
  const texto = desplegarTodos(registros);
  assert.equal(texto.split('\n').length, registros.length);
});

test('sumatoriaCuotas suma todas las cuotas', () => {
  const total = registros.reduce((acc, r) => acc + r.cuota, 0);
  assert.ok(Math.abs(sumatoriaCuotas(registros) - total) < 1e-9);
});

test('cuotasMayoresA filtra por el límite dado', () => {
  const resultado = cuotasMayoresA(registros, 300000);
  assert.ok(resultado.every(r => r.cuota > 300000));
});

test('paganEnMenosDeUnAnio filtra por meses < 12', () => {
  const resultado = paganEnMenosDeUnAnio(registros);
  assert.deepEqual(resultado.map(r => r.nombre), ['Ana']);
});

test('primerPrestamoSuperiorA encuentra el primero que supera el monto', () => {
  const resultado = primerPrestamoSuperiorA(registros, 5000000);
  assert.equal(resultado.nombre, 'Luis');
});

test('primerInteresInferiorA encuentra el primero con interés bajo', () => {
  const resultado = primerInteresInferiorA(registros, 0.02);
  assert.equal(resultado.nombre, 'Luis');
});

test('incrementarCuotas suma el monto sin mutar el arreglo original', () => {
  const resultado = incrementarCuotas(registros, 90000);
  assert.equal(resultado[0].cuota, registros[0].cuota + 90000);
  assert.notEqual(resultado, registros);
});

test('decrementarPrestamos resta el monto sin mutar el arreglo original', () => {
  const resultado = decrementarPrestamos(registros, 90000);
  assert.equal(resultado[0].prestamo, registros[0].prestamo - 90000);
});

test('soloCuotas retorna únicamente los valores de cuota', () => {
  const resultado = soloCuotas(registros);
  assert.deepEqual(resultado, registros.map(r => r.cuota));
});
