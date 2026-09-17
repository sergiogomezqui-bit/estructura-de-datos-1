/*
*  archivo main.js
*
*  Descripción:
*  Conecta la interfaz (botones, inputs, textarea) con las funciones de
*  funciones.js, para la práctica Desarrollo FrontEnd Dinámico del curso
*  de EDyA1 en la Universidad Autónoma de Occidente.
*/

import {
  crearRegistro,
  formatearRegistro,
  desplegarTodos,
  sumatoriaCuotas,
  cuotasMayoresA,
  paganEnMenosDeUnAnio,
  primerPrestamoSuperiorA,
  primerInteresInferiorA,
  incrementarCuotas,
  decrementarPrestamos,
  soloCuotas,
} from './funciones.js';

const tARespuesta = document.getElementById('laRespuesta');
const elError = document.getElementById('error');

let registros = [];

function leerFormulario() {
  const nombre = document.getElementById('elNombre').value;
  const prestamo = parseFloat(document.getElementById('elPrestamo').value);
  const meses = parseInt(document.getElementById('losMeses').value);
  const interes = parseFloat(document.getElementById('elInteres').value);
  return { nombre, prestamo, meses, interes };
}

function mostrar(texto) {
  tARespuesta.textContent = texto;
}

function calcular() {
  const { nombre, prestamo, meses, interes } = leerFormulario();

  if (nombre.length === 0 || isNaN(prestamo) || isNaN(meses) || isNaN(interes)) {
    elError.innerHTML = 'El nombre, préstamo, meses o interés, no fueron ingresados o tienen valores de entrada errados';
    return;
  }

  elError.innerHTML = '';
  const registro = crearRegistro(nombre, prestamo, meses, interes);
  registros.push(registro);
  mostrar(formatearRegistro(registro));
}

function verHistorial() {
  mostrar(registros.length === 0 ? 'Aún no hay préstamos calculados' : desplegarTodos(registros));
}

function verSumatoria() {
  mostrar(`Sumatoria de cuotas: $ ${sumatoriaCuotas(registros).toFixed(2)}`);
}

function verCuotasAltas() {
  mostrar(desplegarTodos(cuotasMayoresA(registros)) || 'No hay préstamos con cuota mayor a $ 300000');
}

function verMenosDeUnAnio() {
  mostrar(desplegarTodos(paganEnMenosDeUnAnio(registros)) || 'No hay préstamos a menos de un año');
}

function verPrestamoAlto() {
  const registro = primerPrestamoSuperiorA(registros);
  mostrar(registro ? formatearRegistro(registro) : 'No hay ningún préstamo superior a $ 5000000');
}

function verInteresBajo() {
  const registro = primerInteresInferiorA(registros);
  mostrar(registro ? formatearRegistro(registro) : 'No hay ningún préstamo con interés inferior a 2%');
}

function verIncrementarCuotas() {
  mostrar(desplegarTodos(incrementarCuotas(registros)) || 'No hay préstamos calculados');
}

function verDecrementarPrestamos() {
  mostrar(desplegarTodos(decrementarPrestamos(registros)) || 'No hay préstamos calculados');
}

function verSoloCuotas() {
  mostrar(`[ ${soloCuotas(registros).map(c => c.toFixed(2)).join(', ')} ]`);
}

document.getElementById('btnCalcular').addEventListener('click', calcular);
document.getElementById('btnHistorial').addEventListener('click', verHistorial);
document.getElementById('btnSumatoria').addEventListener('click', verSumatoria);
document.getElementById('btnCuotasAltas').addEventListener('click', verCuotasAltas);
document.getElementById('btnMenosUnAnio').addEventListener('click', verMenosDeUnAnio);
document.getElementById('btnPrestamoAlto').addEventListener('click', verPrestamoAlto);
document.getElementById('btnInteresBajo').addEventListener('click', verInteresBajo);
document.getElementById('btnIncrementarCuotas').addEventListener('click', verIncrementarCuotas);
document.getElementById('btnDecrementarPrestamos').addEventListener('click', verDecrementarPrestamos);
document.getElementById('btnSoloCuotas').addEventListener('click', verSoloCuotas);
