function ordenarAscendente_supermercado (bd){
    // invocar método sort para ordenar ascendente, con base en el nombre de los supermercados
    bd.sort(function(a, b){
        if (a.nombre < b.nombre) return -1;
        if (a.nombre > b.nombre) return 1;
        return 0;
    });
} 

function ordenarAscendente_patrimonio (bd){
    // invocar método sort para ordenar ascendente, con base en el patrimonio de los supermercados
    bd.sort(function(a, b){
        return a.patrimonio - b.patrimonio;
    });
} 

function binary_search_supermercado(A, p, q, r){
    // implementar alguno de los pseudocódigos suministrados (version recursiva)
    let posicion = -1;
    if (p <= q){
        let m = Math.trunc((p + q) / 2);
        if (r == A[m].nombre){
            posicion = m;
        }else{
            if (r < A[m].nombre){
                posicion = binary_search_supermercado(A, p, m - 1, r);
            }else{
                posicion = binary_search_supermercado(A, m + 1, q, r);
            }
        }
    }
    return posicion;
}

export {ordenarAscendente_supermercado, ordenarAscendente_patrimonio, binary_search_supermercado};
