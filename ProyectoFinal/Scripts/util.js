/*
*  archivo util.js
*  Creado por: Sergio Gómez (2226785), Brandon Bonilla (2225557) y Samuel Ospina (2230723)
*
*  Descripción:
*  Contiene la función calcularLongestNaps, que calcula la mejor siesta de n profesores,
*  para el proyecto final del curso de EDyA1 en la Universidad Autónoma de Occidente
*/

import {Profesor} from './Profesor.js';

// el día se mide en minutos: empieza en el minuto 0 y termina en el 1440 (24 horas)
const INICIO_DIA = 0;
const FIN_DIA = 1440;

/*
    funcion calcularLongestNaps
    recibe el caso con el formato:
        professor1;....;professorn--scheduledAppointment1;....;scheduledAppointmentm
    donde cada scheduledAppointment tiene el formato: professor time1 time2 appointment
    y retorna una cadena con n líneas, con el formato "professor longestNap initialTime",
    ordenadas descendentemente por longestNap y, en empate, ascendentemente por professor.

    n = número de profesores, m = número total de scheduled appointments,
    m_i = número de scheduled appointments del profesor i  (m = m_1 + m_2 + ... + m_n)

    Complejidad de cada fragmento:
        1. separar profesores y citas (split)                               O(n + m)
        2. crear los n objetos Profesor y el Map de búsqueda                O(n)
        3. repartir las m citas (split, Number y Map.get son O(1) por cita) O(m)
        4. calcular la mejor siesta de cada profesor i: O(m_i) por profesor,
           en total  O(m_1) + ... + O(m_n) = O(m), más O(1) por profesor    O(n + m)
        5. ordenar los n profesores con sort                                O(n lg n)
        6. construir la cadena de salida con n líneas                       O(n)
    Complejidad total:  O(n + m + n lg n) = O(m + n lg n)
*/
function calcularLongestNaps(caso) {
    // Complejidad total: O(n + m + n lg n) = O(m + n lg n)

    // 1. el caso se separa en profesores y citas con indexOf y substring - O(n + m)
    let posicion = caso.indexOf('--');
    let encabezado = posicion == -1 ? caso : caso.substring(0, posicion);
    let cuerpo = posicion == -1 ? '' : caso.substring(posicion + 2);

    // 2. se crea un Profesor por cada nombre; el Map lo encuentra en O(1) - O(n)
    let nombres = encabezado.split(/[;\s]+/).filter(function (x) { return x != ''; });
    let losProfesores = [];
    let buscar = new Map();
    for (let nombre of nombres) {
        if (!buscar.has(nombre)) {
            let elProfesor = new Profesor(nombre);
            buscar.set(nombre, elProfesor);
            losProfesores.push(elProfesor);
        }
    }

    // 3. cada cita se agrega a su profesor; split, Number, Map.get y push son O(1) por cita - O(m)
    for (let cita of cuerpo.split(';')) {
        let datos = cita.trim().split(/\s+/);
        let elProfesor = buscar.get(datos[0]);
        if (elProfesor !== undefined && datos.length >= 3) {
            elProfesor.agregarCita(Number(datos[1]), Number(datos[2]));
        }
    }

    // 4. mejor siesta del profesor i: O(m_i); en total O(m_1 + ... + m_n) = O(m), y O(1) por profesor - O(n + m)
    for (let elProfesor of losProfesores) {
        elProfesor.calcularMejorSiesta(INICIO_DIA, FIN_DIA);
    }

    // 5. criterio1: longestNap descendente; criterio2: nombre ascendente - O(n lg n)
    losProfesores.sort(function (a, b) {
        if (a.siesta != b.siesta) {
            return b.siesta - a.siesta;
        }
        return a.nombre.localeCompare(b.nombre);
    });

    // 6. una línea por profesor: professor longestNap initialTime - O(n)
    return losProfesores.map(function (x) { return x.toString(); }).join('\n');
}

export {calcularLongestNaps, INICIO_DIA, FIN_DIA};
