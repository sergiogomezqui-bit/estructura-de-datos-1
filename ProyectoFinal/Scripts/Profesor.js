/*
*  Clase Profesor
*  Creado por: Sergio Gómez y Brandon Bonilla
*
*  Descripción:
*  Almacena las citas programadas (scheduled appointments) de un profesor
*  y calcula su mejor siesta, es decir, el intervalo libre más largo del día.
*  Proyecto final del curso de EDyA1 en la Universidad Autónoma de Occidente
*/

export class Profesor {
    constructor(nombre) {
        this.nombre = nombre;
        this.citas = [];      // cada cita es un arreglo [inicio, fin] en minutos
        this.siesta = 0;      // duración de la mejor siesta (longestNap)
        this.inicio = 0;      // minuto en que empieza la mejor siesta (initialTime)
    }

    // agrega una cita al final del arreglo - O(1)
    agregarCita(inicio, fin) {
        this.citas.push([inicio, fin]);
    }

    /*
        calcula la mejor siesta del profesor, con m_i citas - O(m_i)
        inicioDia y finDia son los minutos en que empieza y termina el día
    */
    calcularMejorSiesta(inicioDia, finDia) {
        // se verifica que las citas vengan ordenadas por tiempo, como lo indica el enunciado - O(m_i)
        let ordenado = true;
        for (let k = 1; k < this.citas.length; k++) {
            if (this.citas[k][0] < this.citas[k - 1][0]) {
                ordenado = false;
                break;
            }
        }
        // solo si no vinieron ordenadas se ordenan con sort - O(m_i lg m_i)
        if (!ordenado) {
            this.citas.sort(function (a, b) { return a[0] - b[0]; });
        }

        // se recorren las citas una sola vez, comparando el hueco que hay antes de cada una - O(m_i)
        let libreDesde = inicioDia;   // minuto desde el cual está libre
        this.siesta = -1;
        this.inicio = inicioDia;
        for (let k = 0; k < this.citas.length; k++) {
            let hueco = this.citas[k][0] - libreDesde;
            if (hueco > this.siesta) {          // estrictamente mayor: en empate gana la más temprana
                this.siesta = hueco;
                this.inicio = libreDesde;
            }
            if (this.citas[k][1] > libreDesde) {  // por si hay citas que se traslapan
                libreDesde = this.citas[k][1];
            }
        }
        // hueco que queda después de la última cita - O(1)
        let hueco = finDia - libreDesde;
        if (hueco > this.siesta) {
            this.siesta = hueco;
            this.inicio = libreDesde;
        }
    }

    toString() {
        return this.nombre + " " + this.siesta + " " + this.inicio;
    }
}
