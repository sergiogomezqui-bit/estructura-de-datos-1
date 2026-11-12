/*
*  archivo main.js
*  Creado por: Sergio Gómez y Brandon Bonilla
*
*  Descripción:
*  Aplicativo web para calcular la mejor siesta de n profesores,
*  para el proyecto final del curso de EDyA1 en la Universidad Autónoma de Occidente
*/

import {calcularLongestNaps} from './util.js';

/*
    casos de prueba que se pueden cargar en el área de entrada
*/
const losCasos = {
    ejemplo: 'Mario Juan Fernando--Juan 100 300 Reunión;Juan 350 700 PreparaClase;Mario 240 480 Reunión;Fernando 150 420 Clase;Fernando 490 620 PreparaClase;Juan 1100 1300 Otras;Fernando 715 900 Clase;Mario 590 720 Clase;Mario 810 920 Reunión;Juan 1350 1400 Otras;Fernando 1030 1200 PreparaClase;Mario 1100 1210 Reunión',
    empates: 'Zoe Ana Luis Pedro--Ana 0 600 Clase;Ana 900 1440 Otras;Luis 100 700 Clase;Luis 1000 1440 Reunión;Zoe 300 400 Clase',
    pocas: 'Sara--Sara 500 900 Clase'
};

/*
    obtiene referencias a los botones, a la lista de casos y a las áreas de texto
*/
const btnCalcular = document.getElementById("calcular");
const btnCargar = document.getElementById("cargar");
const lstCaso = document.getElementById("elCaso");
const txtA_Entrada = document.getElementById("laEntrada");
const txtA_Respuesta = document.getElementById("laRespuesta");
const lblTiempo = document.getElementById("elTiempo");

/*
    addEventListener para que cuando se de un click se ejecute la función respectiva
*/
btnCalcular.addEventListener('click', procesarCaso);
btnCargar.addEventListener('click', cargarCaso);

// carga en el área de entrada el caso escogido
function cargarCaso() {
    txtA_Entrada.value = losCasos[lstCaso.value];
    txtA_Respuesta.value = '';
    lblTiempo.textContent = '';
}

/*
    función procesarCaso
    invoca calcularLongestNaps con el caso digitado y despliega la mejor siesta de cada profesor
*/
function procesarCaso() {
    try {
        let inicio = performance.now();
        let res = calcularLongestNaps(txtA_Entrada.value);
        let fin = performance.now();
        txtA_Respuesta.value = 'professor longestNap initialTime\n' + res;
        lblTiempo.textContent = 'Tiempo de cálculo: ' + (fin - inicio).toFixed(3) + ' ms';
    } catch (error) {
        txtA_Respuesta.value = 'El caso no tiene el formato esperado: ' + error.message;
        lblTiempo.textContent = '';
    }
}

// datos iniciales de prueba: el ejemplo del enunciado
cargarCaso();
