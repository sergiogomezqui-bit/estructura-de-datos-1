// Pruebas de calcularLongestNaps - Tarea final EDyA1
// Sergio Gómez Quiñones (2226785) y Brandon Bonilla (2225557) - Grupo 51
// Se ejecuta con: node pruebas/pruebas.mjs
import assert from 'node:assert';
import {calcularLongestNaps} from '../Scripts/util.js';

let aprobadas = 0;
function probar(nombre, caso, esperado) {
    let obtenido = calcularLongestNaps(caso);
    assert.strictEqual(obtenido, esperado, nombre + '\nobtenido:\n' + obtenido);
    aprobadas++;
    console.log('OK  ' + nombre);
}

// 1. ejemplo del enunciado
probar('Ejemplo del enunciado',
    'Mario Juan Fernando--Juan 100 300 Reunión;Juan 350 700 PrepaClase;Mario 240 480 Reunión;Fernando 150 420 Clase;Fernando 490 620 PrepaClase;Juan 1100 1300 Otras;Fernando 715 900 Clase;Mario 590 720 Clase;Mario 810 920 Reunión;Juan 1350 1400 Otras;Fernando 1030 1200 PrepaClase;Mario 1100 1210 Reunión',
    'Juan 400 700\nFernando 240 1200\nMario 240 0');

// 2. profesores separados con punto y coma, como dice el formato
probar('Profesores separados con ;',
    'Mario;Juan;Fernando--Juan 100 300 Reunión;Juan 350 700 PrepaClase;Mario 240 480 Reunión;Fernando 150 420 Clase;Fernando 490 620 PrepaClase;Juan 1100 1300 Otras;Fernando 715 900 Clase;Mario 590 720 Clase;Mario 810 920 Reunión;Juan 1350 1400 Otras;Fernando 1030 1200 PrepaClase;Mario 1100 1210 Reunión',
    'Juan 400 700\nFernando 240 1200\nMario 240 0');

// 3. profesor sin citas: tiene todo el día libre
probar('Profesor sin citas', 'Ana Luis--Luis 100 200 Clase', 'Ana 1440 0\nLuis 1240 200');

// 4. empate dentro de un profesor: gana la siesta más temprana
probar('Empate de siestas del mismo profesor', 'Ana--Ana 100 200 Clase;Ana 300 1340 Otras', 'Ana 100 0');

// 5. empate entre profesores: orden alfabético
probar('Empate entre profesores', 'Zoe Ana--Zoe 0 720 Clase;Ana 720 1440 Reunión', 'Ana 720 0\nZoe 720 720');

// 6. citas pegadas (hueco de 0) y cita que empieza en 0 y termina en 1440
probar('Citas pegadas y dia ocupado', 'Pedro Sara--Pedro 0 700 Clase;Pedro 700 1440 Otras;Sara 0 100 Clase;Sara 100 200 Clase',
    'Sara 1240 200\nPedro 0 0');

// 7. citas sin ordenar: se ordenan por tiempo
probar('Citas sin ordenar', 'Juan--Juan 1100 1300 Otras;Juan 100 300 Reunión;Juan 350 700 Clase', 'Juan 400 700');

// 8. citas que se traslapan
probar('Citas traslapadas', 'Juan--Juan 100 800 Clase;Juan 200 300 Reunión;Juan 900 1000 Otras', 'Juan 440 1000');

// 9. espacios y saltos de línea sobrantes
probar('Espacios y saltos de linea', ' Ana  Luis \n--Ana 100 200 Clase ;\nLuis 0 1000 Otras;', 'Ana 1240 200\nLuis 440 1000');

// 10. comparación contra una solución de fuerza bruta (minuto por minuto) con casos aleatorios
function semilla(s) { return function () { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; }; }
function fuerzaBruta(profesores, citas) {
    let filas = profesores.map(function (nombre) {
        let ocupado = new Array(1440).fill(false);
        for (let c of citas) {
            if (c[0] == nombre) { for (let t = c[1]; t < c[2]; t++) ocupado[t] = true; }
        }
        let mejor = -1, inicio = 0, t = 0;
        while (t < 1440) {
            if (ocupado[t]) { t++; continue; }
            let desde = t;
            while (t < 1440 && !ocupado[t]) t++;
            if (t - desde > mejor) { mejor = t - desde; inicio = desde; }
        }
        // si toda la agenda esta ocupada o no hay hueco, el enunciado garantiza que no ocurre
        return {nombre: nombre, siesta: mejor, inicio: inicio};
    });
    filas.sort(function (a, b) { return a.siesta != b.siesta ? b.siesta - a.siesta : a.nombre.localeCompare(b.nombre); });
    return filas.map(function (f) { return f.nombre + ' ' + f.siesta + ' ' + f.inicio; }).join('\n');
}
// con citas sin separacion el hueco de 0 minutos no cuenta como siesta en la fuerza bruta, por eso solo se generan citas separadas
let rnd = semilla(2026);
for (let caso = 0; caso < 500; caso++) {
    let n = 1 + Math.floor(rnd() * 6);
    let profesores = [];
    for (let i = 0; i < n; i++) profesores.push('Prof' + String.fromCharCode(65 + i));
    let citas = [];
    for (let nombre of profesores) {
        let t = Math.floor(rnd() * 200);
        while (t < 1400 && rnd() < 0.85) {
            let dur = 10 + Math.floor(rnd() * 250);
            let fin = Math.min(1439, t + dur);
            if (fin <= t) break;
            citas.push([nombre, t, fin]);
            t = fin + 1 + Math.floor(rnd() * 200);   // siempre queda al menos 1 minuto libre entre citas
        }
    }
    // las citas de cada profesor ya quedan ordenadas por tiempo; se mezclan entre profesores
    let texto = citas.map(function (c) { return c.join(' ') + ' Clase'; });
    for (let i = texto.length - 1; i > 0; i--) {   // mezcla conservando el orden relativo de cada profesor
        let j = Math.floor(rnd() * (i + 1));
        if (citas[i][0] != citas[j][0]) { let a = texto[i]; texto[i] = texto[j]; texto[j] = a; let b = citas[i]; citas[i] = citas[j]; citas[j] = b; }
    }
    let entrada = profesores.join(' ') + '--' + texto.join(';');
    let esperado = fuerzaBruta(profesores, citas);
    let obtenido = calcularLongestNaps(entrada);
    assert.strictEqual(obtenido, esperado, 'Aleatorio ' + caso + '\n' + entrada);
}
aprobadas++;
console.log('OK  500 casos aleatorios contra la solucion de fuerza bruta');

// 11. eficiencia: n profesores y m citas, el tiempo debe crecer como m + n lg n
function generar(n, porProfesor) {
    let nombres = [], citas = [];
    for (let i = 0; i < n; i++) nombres.push('P' + i);
    for (let k = 0; k < porProfesor; k++) {
        for (let i = 0; i < n; i++) { let ini = k * 20; citas.push('P' + i + ' ' + ini + ' ' + (ini + 10) + ' Clase'); }
    }
    return nombres.join(' ') + '--' + citas.join(';');
}
for (let [n, p] of [[1000, 10], [10000, 10], [10000, 70]]) {
    let entrada = generar(n, p);
    let t0 = performance.now();
    let salida = calcularLongestNaps(entrada);
    let t1 = performance.now();
    assert.strictEqual(salida.split('\n').length, n);
    console.log('    n = ' + n + ', m = ' + (n * p) + ': ' + (t1 - t0).toFixed(1) + ' ms');
}
aprobadas++;
console.log('OK  eficiencia con casos grandes');

console.log('\nTodas las pruebas pasaron (' + aprobadas + ' grupos de pruebas)');
