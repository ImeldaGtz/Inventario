export class Inventario{
    constructor(){
        this.primerProducto = null;
        this.ultimoProducto = null;
    }
    agregar(producto){
        if (this._codigoEnExistencia(producto.codigo)) {
            return false; // 'Codigo ya existente'; // No se pudo
        } else {
            if (this.primerProducto == null) {
                this.primerProducto = producto;
            }
            else {
                this._agregate(producto, this.primerProducto);
            }
            return true; // 'Producto agregado'; // Se pudo
        }
    }
    agregarInicio(producto){
        if (!this._codigoEnExistencia(producto.codigo)) {
           producto.sig = this.primerProducto;
           this.primerProducto = producto;
            return true; //'Producto agregado'; // Se pudo
        } else {
            return false; //'Codigo ya existente'; // No se pudo
        }
    }
    insertar(producto, lugar) {
        if (!this._codigoEnExistencia(producto.codigo)) {
            if (lugar - 1 > this.productos.length) {
                return `Posición no válida, se colocó al final.`;
            } else{
                return true; //'Producto insertado'; // Se pudo
            }
        } else {
            return false; //'Codigo ya existente'; // No se pudo
        }
    }
    listar(){
        let info = ``;
        return info;
    }
    buscar(codigo){
        let resultado;
        return resultado == undefined ? null : resultado;
    }
    eliminar(codigo) {
        if (this._codigoEnExistencia(codigo)){
            
            return true; //'Producto eliminado'; // Se pudo
        } else {
            return false; //'Codigo inexistente'; // No se pudo
        }
    }
    extraerPrimero(){
        if(this.primerProducto == null) {
            return false;
        }
        let resultado;
        return resultado;
    }

    _agregate(nuevo, productoX) {
        if (productoX.sig == null) {
            productoX.sig = nuevo;
        } else {
            this._agregate(nuevo, productoX.sig);
        }
    }
    _buscarIndice(codigo) {
        let resultado;
        return resultado != undefined ? resultado : null;
    }
    _codigoEnExistencia(codigo){
        return this.buscar(codigo) == null ? false : true;
    }
}
