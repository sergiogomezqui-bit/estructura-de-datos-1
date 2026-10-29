// Taller Estudio Corte 3 - Estructuras de Datos y Algoritmos 1
// Sergio Gómez Quiñones - Código 2226785 - Grupo 51
// Segunda parte: implementación en JavaScript de proceso1 y proceso2.
// Se ejecuta con: node TallerCorte3_SergioGomez.js

// a) proceso1: cuenta cuántas veces aparece x en A desde la posición p hasta el final
function proceso1(A, x, p) {
    if (p > A.length - 1) {
        return 0;
    } else {
        if (A[p] == x) {
            return 1 + proceso1(A, x, p + 1);
        } else {
            return proceso1(A, x, p + 1);
        }
    }
}

// sumarDatos: recorre el arreglo de forma secuencial (posición por posición)
// y retorna la suma de sus valores. Se hace recursivo para no usar ciclos.
function sumarDatos(A, pos = 0) {
    if (pos > A.length - 1) {
        return 0;
    }
    return A[pos] + sumarDatos(A, pos + 1);
}

// b) proceso2: si n <= 1 retorna la suma de A; si no, retorna
// A[0] + proceso2(A, n/2) + 2 * proceso2(A, n/2)
function proceso2(A, n) {
    if (n <= 1) {
        return sumarDatos(A);
    } else {
        let acum = A[0];
        acum += proceso2(A, Math.trunc(n / 2));
        acum += 2 * proceso2(A, Math.trunc(n / 2));
        return acum;
    }
}

// ----------------- Pruebas -----------------
let info = [3, 5, 2, 10, 5, 20];

console.log("proceso1(info, 5, 0) =", proceso1(info, 5, 0));   // el 5 aparece 2 veces
console.log("proceso1(info, 7, 0) =", proceso1(info, 7, 0));   // no aparece
console.log("sumarDatos(info) =", sumarDatos(info));
console.log("proceso2(info, info.length) =", proceso2(info, info.length));

let errores = 0;
function verificar(nombre, obtenido, esperado) {
    if (obtenido !== esperado) {
        console.log("FALLA " + nombre + ": se esperaba " + esperado + " y se obtuvo " + obtenido);
        errores++;
    }
}

verificar("proceso1 dos veces", proceso1(info, 5, 0), 2);
verificar("proceso1 desde p=2", proceso1(info, 5, 2), 1);
verificar("proceso1 no esta", proceso1(info, 7, 0), 0);
verificar("proceso1 vacio", proceso1([], 5, 0), 0);
verificar("proceso1 todos iguales", proceso1([4, 4, 4, 4], 4, 0), 4);
verificar("sumarDatos", sumarDatos(info), 45);
verificar("sumarDatos vacio", sumarDatos([]), 0);
// n = 6 -> 3 -> 1: dos niveles, resultado = A[0]*(1+3) + 9*suma = 3*4 + 9*45 = 417
verificar("proceso2 info", proceso2(info, info.length), 417);
verificar("proceso2 n=1", proceso2([7], 1), 7);
// n = 8 -> 4 -> 2 -> 1: tres niveles, resultado = A[0]*(1+3+9) + 27*suma
let ocho = [1, 2, 3, 4, 5, 6, 7, 8];
verificar("proceso2 n=8", proceso2(ocho, 8), 1 * 13 + 27 * 36);

console.log(errores == 0 ? "Todas las pruebas pasaron" : errores + " pruebas fallaron");
