import {Proveedor} from './Proveedor.js';

export class Supermercado {
    // crear constructor
    constructor(nombre, patrimonio, nroTiendas, Proveedor) {
        this.nombre = nombre;
        this.patrimonio = patrimonio;
        this.nroTiendas = nroTiendas;
        this.suProveedor = Proveedor;
    }  

    // crear funcion calcularGananciaMensual
    calcularGananciaMensual() {
        let res;

        if (this.suProveedor.producto == 'Arroz' && this.nroTiendas>20){
            res = "ALTA";
        }else{
            if (this.nroTiendas>10){
                res = "MEDIA";
            }else{
                res = "BAJA";
            }            
        }
        return res;
    }

    toString() {
        // construir cadena de salida
        return "Nombre:" + this.nombre + "  Patrimonio:" + this.patrimonio + "  NroTiendas:" + this.nroTiendas +
            "\n" + this.suProveedor.toString();
    }    
}
