export class Proveedor {
    constructor(nombre, producto, produccion) {
        this.nombre = nombre;
        this.producto = producto;
        this.produccion = produccion;
    }  

    toString() {
        return "Proveedor:" + this.nombre +
            "  Producto:" + this.producto+
            "  Produccion:" + this.produccion;
    }    
}

