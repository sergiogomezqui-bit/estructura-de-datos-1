/*
*  Archivo index.js
*  Descripción:
*  API REST en Node.js + Express para la practica de Desarrollo BackEnd
*  del curso Estructuras de Datos y Algoritmos 1 (EDyA1) - UAO.
*  Calcula la cuota mensual de un prestamo dado su monto, plazo (n meses)
*  e interes (i), y mantiene un historial de calculos en memoria.
*  Responde siempre en JSON: el BackEnd y el FrontEnd son aplicaciones
*  independientes, comunicadas por esta API.
*/

const express = require('express');
const cors = require('cors');
const misFunciones = require('./scripts/utils');

const app = express();
const port = process.env.PORT || 3000;

let historial = [];

app.use(cors());
app.use(express.json());

app.get('/prestamos', (req, res) => {
  res.json({ historial });
});

app.post('/prestamos', (req, res) => {
  const { accion, nombre, prestamo, n, i } = req.body;

  if (accion === 'Historial') {
    return res.json({ historial });
  }

  const prestamoNum = Number(prestamo);
  const nNum = Number(n);
  const iNum = Number(i);

  if (!nombre || Number.isNaN(prestamoNum) || Number.isNaN(nNum) || Number.isNaN(iNum)) {
    return res.status(400).json({ error: 'nombre, prestamo, n e i son obligatorios y deben ser validos' });
  }

  const cuota = misFunciones.calcularCuota(prestamoNum, nNum, iNum);
  const resultadoTexto = misFunciones.formatearResultado(nombre, prestamoNum, nNum, iNum, cuota);

  historial.unshift(resultadoTexto);

  res.json({
    nombre,
    prestamo: prestamoNum,
    n: nNum,
    i: iNum,
    cuota,
    resultadoTexto,
    historial,
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log('Backend (API JSON) ejecutandose en http://localhost:' + port);
  });
}

module.exports = app;
