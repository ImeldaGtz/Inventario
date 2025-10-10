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
    agregarInicio(producto){
        if (!this._codigoEnExistencia(producto.codigo)) {
            this.productos.push(this.productos[this.productos.length-1]);
            for(let i = this.productos.length-2; i>0; i--) {
                this.productos[i] = this.productos[i-1];
            }
            this.productos[0] = producto;
            return true; //'Producto agregado'; // Se pudo
        } else {
            return false; //'Codigo ya existente'; // No se pudo
        }
    }
    insertar(producto, lugar) {
        if (!this._codigoEnExistencia(producto.codigo)) {
            if (lugar - 1 > this.productos.length) {
                this.productos.push(producto);
                return `Posición no válida, se colocó al final.`;
            } else{
                this.productos.push(this.productos[this.productos.length-1]);
                for (let i = lugar-1; i<this.productos.length-2; i++){
                    this.productos[i+1] = this.productos[i];
                }
                this.productos[lugar-1] = producto;
                return true; //'Producto insertado'; // Se pudo
            }
        } else {
            return false; //'Codigo ya existente'; // No se pudo
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
        if (this._codigoEnExistencia(codigo)){
            for(let i = this._buscarIndice(codigo); i<this.productos.length; i++) {
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
        for(let i = 0; i< this.productos.length; i++) {
            if(this.productos[i].codigo == codigo) {
                resultado = i;
            }
        }
        return resultado != undefined ? resultado : null;
    }
    _codigoEnExistencia(codigo){
        return this.buscar(codigo) == null ? false : true;
    }
}
