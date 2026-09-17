/*
*  Archivo index.js
*  Descripción:
*  Servidor web en Node.js + Express para la practica de Desarrollo BackEnd
*  del curso Estructuras de Datos y Algoritmos 1 (EDyA1) - UAO.
*  Calcula la cuota mensual de un prestamo dado su monto, plazo (n meses)
*  e interes (i), y mantiene un historial de calculos en memoria.
*/

const express = require('express');
const misFunciones = require('./scripts/utils');

const app = express();
const port = process.env.PORT || 3000;

let historial = [];

app.use(express.urlencoded({ extended: true }));

app.get('/prestamos', (req, res) => {
  const pagina = misFunciones.crearPaginaRespuesta('', '', '', '', '');
  res.send(pagina);
});

app.post('/prestamos', (req, res) => {
  const { accion, nombre, prestamo, n, i } = req.body;

  if (accion === 'Calcular') {
    const cuota = misFunciones.calcularCuota(Number(prestamo), Number(n), Number(i));
    const resultadoTexto = misFunciones.formatearResultado(nombre, Number(prestamo), Number(n), Number(i), cuota);
    historial.unshift(resultadoTexto);
    const pagina = misFunciones.crearPaginaRespuesta(nombre, prestamo, n, i, resultadoTexto);
    res.send(pagina);
  } else {
    const resultadoTexto = historial.join('\n');
    const pagina = misFunciones.crearPaginaRespuesta(nombre, prestamo, n, i, resultadoTexto);
    res.send(pagina);
  }
});

if (require.main === module) {
  app.listen(port, () => {
    console.log('Estoy ejecutandome en http://localhost:' + port);
  });
}

module.exports = app;
