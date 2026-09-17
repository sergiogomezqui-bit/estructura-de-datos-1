/*
*  Archivo utils.js
*  Descripción:
*  Calcula la cuota mensual de un prestamo (amortizacion francesa) y genera
*  la pagina HTML dinamica que se retorna al cliente.
*/

function calcularCuota(prestamo, n, i) {
  const factor = Math.pow(1 + i, n);
  return prestamo * (factor * i) / (factor - 1);
}

function formatearResultado(nombre, prestamo, n, i, cuota) {
  const cuotaTexto = cuota.toFixed(2);
  const interesTexto = (i * 100).toFixed(2);
  return `${nombre} – $${cuotaTexto} -- $${prestamo} -- ${n} meses -- interés ${interesTexto}%`;
}

function crearPaginaRespuesta(nombre, prestamo, n, i, resultadoTexto) {
  return `
        <!DOCTYPE html>
        <head>
            <title>Calculadora de Cuota de Prestamo</title>
            <style>
                body {
                    background-color: lightcyan;
                    font-size: 20px;
                }

                .elEstilo {
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: center;
                    align-items: center;
                }

                h1 {
                    color: darkgreen;
                    text-align: center;
                    font-size: 25px;
                }

                footer {
                    text-align: center;
                    font-size: 15px;
                }

                table {
                    width: 320px;
                    margin: 20px auto;
                    padding: 5px auto;
                    border: 2px solid;
                    align-content: center;
                }

                th, td, tr {
                    border: 1px solid;
                }

                textarea {
                    width: 320px;
                    height: 100px;
                    padding: 5px auto;
                }
            </style>
        </head>
        <body>
            <main>
                <div class="elEstilo">
                    <h1>Calculadora de Cuota de Prestamo</h1>
                    <form action="/prestamos" enctype="application/x-www-form-urlencoded" method="post">
                        <table>
                            <caption>Datos del prestamo</caption>
                            <tbody>
                                <tr>
                                    <td>Nombre</td>
                                    <td><input type="text" value="${nombre}" name="nombre" required></td>
                                </tr>
                                <tr>
                                    <td>Prestamo ($)</td>
                                    <td><input type="number" step="any" value="${prestamo}" name="prestamo" required></td>
                                </tr>
                                <tr>
                                    <td>Meses (n)</td>
                                    <td><input type="number" step="1" value="${n}" name="n" required></td>
                                </tr>
                                <tr>
                                    <td>Interes (i, ej. 0.15)</td>
                                    <td><input type="number" step="any" value="${i}" name="i" required></td>
                                </tr>
                                <tr>
                                    <td>Accion:</td>
                                    <td>
                                        <input type="radio" value="Calcular" name="accion" checked>Calcular
                                        <input type="radio" value="Historial" name="accion">Historial
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2"><input type="submit" value="Enviar"></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <textarea readonly>${resultadoTexto}</textarea>
                </div>
            </main>
            <footer>
                <hr>
                Practica de Estructuras de Datos y Algoritmos 1 - Universidad Autonoma de Occidente
            </footer>
        </body>
        </html>`;
}

module.exports = { calcularCuota, formatearResultado, crearPaginaRespuesta };
