/*
*  archivo main.js
*  Descripción:
*  Maneja el formulario de la calculadora de cotizacion de envio: valida
*  los datos ingresados, invoca las reglas de calculo y muestra el
*  resultado en el HTML.
*/

import { calcularCotizacion } from './scripts/calculos.js';

const form = document.getElementById('formCotizacion');
const divError = document.getElementById('error');
const seccionResultado = document.getElementById('resultado');

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  procesarCotizacion();
});

function procesarCotizacion() {
  const nombre = document.getElementById('nombre').value.trim();
  const pesoTexto = document.getElementById('pesoKg').value;
  const distanciaTexto = document.getElementById('distanciaKm').value;
  const codigoDescuento = document.getElementById('codigoDescuento').value.trim();

  const error = validarEntrada(nombre, pesoTexto, distanciaTexto);
  if (error) {
    mostrarError(error);
    return;
  }
  limpiarError();

  const pesoKg = parseFloat(pesoTexto);
  const distanciaKm = parseInt(distanciaTexto, 10);

  const resultado = calcularCotizacion(pesoKg, distanciaKm, codigoDescuento);
  mostrarResultado(nombre, resultado);
}

function validarEntrada(nombre, pesoTexto, distanciaTexto) {
  if (!nombre || pesoTexto === '' || distanciaTexto === '') {
    return 'Todos los campos obligatorios (nombre, peso y distancia) deben estar completos.';
  }

  const pesoKg = Number(pesoTexto);
  if (Number.isNaN(pesoKg) || pesoKg <= 0) {
    return 'El peso del paquete debe ser un número válido mayor que 0.';
  }

  const distanciaKm = Number(distanciaTexto);
  if (!Number.isInteger(distanciaKm) || distanciaKm <= 0) {
    return 'La distancia debe ser un número entero válido mayor que 0.';
  }

  return null;
}

function mostrarError(mensaje) {
  divError.textContent = mensaje;
  seccionResultado.hidden = true;
}

function limpiarError() {
  divError.textContent = '';
}

function mostrarResultado(nombre, { costoPeso, costoDistancia, subtotal, impuesto, total }) {
  document.getElementById('resNombre').textContent = nombre;
  document.getElementById('resCostoPeso').textContent = costoPeso.toFixed(2);
  document.getElementById('resCostoDistancia').textContent = costoDistancia.toFixed(2);
  document.getElementById('resSubtotal').textContent = subtotal.toFixed(2);
  document.getElementById('resImpuesto').textContent = impuesto.toFixed(2);
  document.getElementById('resTotal').textContent = total.toFixed(2);

  seccionResultado.hidden = false;
}
