/*
*  archivo funciones.js
*
*  Descripción:
*  Funciones puras (sin DOM) para calcular la cuota mensual de un préstamo
*  y generar los reportes sobre el historial de préstamos, para la práctica
*  Desarrollo FrontEnd Dinámico del curso de EDyA1 en la Universidad
*  Autónoma de Occidente.
*/

function calcularCuota(prestamo, meses, interes) {
  const factor = Math.pow(1 + interes, meses);
  return prestamo * (factor * interes) / (factor - 1);
}

function formatearResultado(nombre, prestamo, meses, interes, cuota) {
  const cuotaTexto = cuota.toFixed(2);
  const interesTexto = (interes * 100).toFixed(2);
  return `${nombre} debe pagar $ ${cuotaTexto} cada mes por el préstamo de $ ${prestamo} a ${meses} meses con el interés del ${interesTexto}%`;
}

function crearRegistro(nombre, prestamo, meses, interes) {
  const cuota = calcularCuota(prestamo, meses, interes);
  return { nombre, prestamo, meses, interes, cuota };
}

function formatearRegistro(registro) {
  return formatearResultado(registro.nombre, registro.prestamo, registro.meses, registro.interes, registro.cuota);
}

// 2. despliega la información de todos los objetos almacenados (forEach + join)
function desplegarTodos(registros) {
  const lineas = [];
  registros.forEach(registro => lineas.push(formatearRegistro(registro)));
  return lineas.join('\n');
}

// a) sumatoria de cada cuota (forEach)
function sumatoriaCuotas(registros) {
  let total = 0;
  registros.forEach(registro => { total += registro.cuota; });
  return total;
}

// b) objetos cuya cuota es mayor a 300000 (filter)
function cuotasMayoresA(registros, limite = 300000) {
  return registros.filter(registro => registro.cuota > limite);
}

// c) objetos que se pagan en menos de un año (filter)
function paganEnMenosDeUnAnio(registros) {
  return registros.filter(registro => registro.meses < 12);
}

// d) primer objeto cuyo préstamo es superior a $5000000 (find)
function primerPrestamoSuperiorA(registros, monto = 5000000) {
  return registros.find(registro => registro.prestamo > monto);
}

// e) primer objeto cuyo interés es inferior a 2% (find)
function primerInteresInferiorA(registros, tasa = 0.02) {
  return registros.find(registro => registro.interes < tasa);
}

// f) incrementa el valor de cada cuota en $90000 (map)
function incrementarCuotas(registros, monto = 90000) {
  return registros.map(registro => ({ ...registro, cuota: registro.cuota + monto }));
}

// g) decrementa los préstamos en $90000 (map)
function decrementarPrestamos(registros, monto = 90000) {
  return registros.map(registro => ({ ...registro, prestamo: registro.prestamo - monto }));
}

// h) arreglo en el que solo se tengan las cuotas (map)
function soloCuotas(registros) {
  return registros.map(registro => registro.cuota);
}

export {
  calcularCuota,
  formatearResultado,
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
};
