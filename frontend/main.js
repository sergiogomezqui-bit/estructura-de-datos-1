/*
*  archivo main.js
*  Descripción:
*  FrontEnd (aplicacion independiente del BackEnd) para la calculadora de
*  cuota de prestamo. Se comunica con la API JSON del backend via fetch.
*/

const API_URL = 'http://localhost:3000/prestamos';

const btnCalcular = document.getElementById('calcular');
const btnHistorial = document.getElementById('historial');
const tArespuesta = document.getElementById('respuesta');
const divError = document.getElementById('error');

btnCalcular.addEventListener('click', calcular);
btnHistorial.addEventListener('click', verHistorial);

async function calcular() {
  const nombre = document.getElementById('nombre').value;
  const prestamo = document.getElementById('prestamo').value;
  const n = document.getElementById('n').value;
  const i = document.getElementById('i').value;

  if (!nombre || prestamo === '' || n === '' || i === '') {
    divError.textContent = 'El nombre, prestamo, n o i no fueron ingresados o son invalidos';
    return;
  }
  divError.textContent = '';

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accion: 'Calcular', nombre, prestamo, n, i }),
    });
    const datos = await res.json();

    if (!res.ok) {
      divError.textContent = datos.error || 'Error al calcular la cuota';
      return;
    }

    tArespuesta.textContent = datos.resultadoTexto;
  } catch (err) {
    divError.textContent = 'No se pudo conectar con el backend (' + err.message + ')';
  }
}

async function verHistorial() {
  try {
    const res = await fetch(API_URL);
    const datos = await res.json();
    tArespuesta.textContent = datos.historial.join('\n');
  } catch (err) {
    divError.textContent = 'No se pudo conectar con el backend (' + err.message + ')';
  }
}
