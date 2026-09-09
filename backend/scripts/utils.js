/*
*  Archivo utils.js
*  Descripción:
*  Calcula la cuota mensual de un prestamo (amortizacion francesa).
*/

function calcularCuota(prestamo, n, i) {
  if (i === 0) {
    return prestamo / n;
  }
  const factor = Math.pow(1 + i, n);
  return prestamo * (factor * i) / (factor - 1);
}

function formatearResultado(nombre, prestamo, n, i, cuota) {
  const cuotaTexto = cuota.toFixed(2);
  const interesTexto = (i * 100).toFixed(2);
  return `${nombre} – $${cuotaTexto} -- $${prestamo} -- ${n} meses -- interés ${interesTexto}%`;
}

module.exports = { calcularCuota, formatearResultado };
