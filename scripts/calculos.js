/*
*  Archivo calculos.js
*  Descripción:
*  Reglas de calculo puras (sin DOM) de la calculadora de cotizacion de envio.
*/

const COSTO_POR_KG = 2.0;
const COSTO_POR_KM = 0.05;
const TASA_IMPUESTO = 0.08;

function calcularCostoPeso(pesoKg) {
  return pesoKg * COSTO_POR_KG;
}

function calcularCostoDistancia(distanciaKm) {
  return distanciaKm * COSTO_POR_KM;
}

function calcularSubtotal(costoPeso, costoDistancia) {
  return costoPeso + costoDistancia;
}

// No se definio ninguna regla de descuento por codigo en el enunciado,
// asi que el codigo de descuento queda como dato opcional capturado pero
// sin efecto en el calculo (totalConDescuento = subtotal).
function aplicarDescuento(subtotal, codigoDescuento) {
  return subtotal;
}

function calcularImpuesto(totalConDescuento) {
  return totalConDescuento * TASA_IMPUESTO;
}

function calcularTotal(totalConDescuento, impuesto) {
  return totalConDescuento + impuesto;
}

function calcularCotizacion(pesoKg, distanciaKm, codigoDescuento) {
  const costoPeso = calcularCostoPeso(pesoKg);
  const costoDistancia = calcularCostoDistancia(distanciaKm);
  const subtotal = calcularSubtotal(costoPeso, costoDistancia);
  const totalConDescuento = aplicarDescuento(subtotal, codigoDescuento);
  const impuesto = calcularImpuesto(totalConDescuento);
  const total = calcularTotal(totalConDescuento, impuesto);

  return { costoPeso, costoDistancia, subtotal, impuesto, total };
}

export { calcularCotizacion, calcularCostoPeso, calcularCostoDistancia, calcularSubtotal, calcularImpuesto, calcularTotal };
