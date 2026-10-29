import {Proveedor} from './Proveedor.js';
import {Supermercado} from './Supermercado.js';
import {ordenarAscendente_supermercado, binary_search_supermercado} from './util.js';

// obtiene referencias a los botones y areas de texto de la pagina HTML
const btnIngresar = document.getElementById("ingresar");
const btnBuscar = document.getElementById("buscar");
let aTSalida = document.getElementById("respuesta");
let buscado = document.getElementById("supermercadoBuscado");

// arreglo en el que se almacenarán los supermercados
let losSupermercados = [];

// variable booleana que permite determinar si el arreglo está ordenado
// será true cuando lo está y false cuando no.
let ordenado_supermercado=false;
  

// se asignan eventos
btnIngresar.addEventListener('click',ingresarNuevoSupermercado);
btnBuscar.addEventListener('click',buscarSupermercado);

// evento para ingresar nuevos supermercados
function ingresarNuevoSupermercado(){    
    let supermercado = document.getElementById("elSupermercado").value;
    let patrimonio = parseFloat(document.getElementById("elPatrimonio").value);
    let nroTiendas = parseInt(document.getElementById("elNroTiendas").value);
    let proveedor = document.getElementById("elProveedor").value;
    let producto = document.getElementById("elProducto").value;
    let produccion = parseInt(document.getElementById("laProduccion").value);
    
    // realizar item 4.a
    let objProveedor = new Proveedor(proveedor, producto, produccion);
    
    // realizar item 4.b
    let objSupermercado = new Supermercado(supermercado, patrimonio, nroTiendas, objProveedor);
    
    // realizar item 4.c
    losSupermercados.push(objSupermercado);

    // realizar item 4.d
    aTSalida.value = objSupermercado.toString();
    
    ordenado_supermercado=false;
}

function buscarSupermercado(){       
    if (losSupermercados.length<1){
        aTSalida.value = "NO HAY SUPERMERCADOS";
    }else{
        // realizar item 5.a
        if (!ordenado_supermercado){
            ordenarAscendente_supermercado(losSupermercados);
            ordenado_supermercado = true;
        }

        let elSupermercado = buscado.value;

        // realizar item 5.b
        let pos = binary_search_supermercado(losSupermercados, 0, losSupermercados.length - 1, elSupermercado);

        let res='NO ENCONTRADO';

        // realizar item 5.c
        if (pos != -1){
            res = losSupermercados[pos].toString() + "\nGanancia:" + losSupermercados[pos].calcularGananciaMensual();
        }

        
        aTSalida.value = res;
    }
}