export class Inventario{
    constructor(){
        this.productos = [];
    }
    agregar(producto){
        if (this._codigoEnExistencia(producto.codigo)) {
            return false; // 'Codigo ya existente'; // No se pudo
        } else {
            this.productos.push(producto);
            return true; // 'Producto agregado'; // Se pudo
        }
    }

    listar(){
        let info = ``;
        for(let i = 0; i < this.productos.length; i++) {
            info+= `\n${this.productos[i].info()}`;
        }
        return info;
    }
    buscar(codigo){
        let resultado;
        for(let i = 0; i< this.productos.length; i++) {
            if(this.productos[i].codigo == codigo) {
                resultado = this.productos[i];
            }
        }
        return resultado == undefined ? null : resultado;
    }

    eliminar(codigo) {
        if (this._codigoEnExistencia(codigo) && this._buscarIndice(codigo) != null){
            console.log(this._buscarIndice(codigo));
            for(let i = this._buscarIndice(codigo); i<this.productos.length-1; i++) {
                this.productos[i] = this.productos[i+1];
            }
            this.productos.pop();
            return true; //'Producto eliminado'; // Se pudo
        } else {
            return false; //'Codigo inexistente'; // No se pudo
        }
    }
    extraerPrimero(){
        if(this.productos.length == 0) {
            return false;
        }
        let resultado = this.productos[0];
        for(let i = 0; i<this.productos.length-1; i++) {
            this.productos[i] = this.productos[i+1];
        }
        this.productos.pop();
        return resultado;
    }


    _buscarIndice(codigo) {
        let resultado;
        if(this.productos.length == 1) {
            return this.productos[0].codigo == codigo ? 0 : null;
        }
       let limIni = 0;
       let limFin = this.productos.length-1;
       let half = 0;
       let seEncontro = false;

       while(seEncontro == false) {
            half = Math.floor((limIni + limFin) / 2);

            if(this.productos[half].codigo == codigo) {
                resultado = half;
                seEncontro = true;
            }

            else if (this.productos[half].codigo > codigo || this.productos[half+1].codigo == codigo){
                if(this.productos[half + 1].codigo == codigo){
                    resultado = half + 1;
                    seEncontro = true;
                }
                limFin = half;
            } 
            else {
                if(this.productos[limIni].codigo == codigo){
                    resultado = limIni;
                    seEncontro = true;
                }
                limIni = half;
            }
       }
        return resultado != undefined ? resultado : null;
    }
    _codigoEnExistencia(codigo){
        return this.buscar(codigo) == null ? false : true;
    }
    
    _encontrarParaAgregar(codigo) {
        /*
            Para una búsqueda binaria se busca la mitad de la suma de la cantidad de los elementos redondeado en caso de ser necesario
            Entonces, se va preguntando, el valor por el que voy a preguntar es mayor o menor?
            Si es mayor, entonces el valor pequeño será recorrido hacia la mitad encontrada.
            Si es menor, entonces el valor grande será recorrido hacia la mitd encontrada.

            Si se encuentra, existe.
            Sino, no existe, y se podría insertar
        */
       let limIni = 0;
       let limFin = this.productos.length-1;
       let half = 0;

       while(limIni <= limFin) {
            half = Math.floor((limIni + limFin) / 2);

            if(half == limIni) {
                seEncontro = true;
            }
            else if (this.productos[half].codigo > codigo){
                limIni = half;
            } 
            else {
                limFin = half;
            }
       }
       return half+1;

    }
}
