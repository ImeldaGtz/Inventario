export class Inventario{
    constructor(){
        this.primero = null;
    }
// Por revisar
    agregar(producto){
        if (this._codigoEnExistencia(producto.codigo)) {
            return false; // 'Codigo ya existente'; // No se pudo
        } else {
            if(this.primero == null) {
                this.primero = producto;
            } else {

                if(producto.codigo < this.primero.codigo) {
                    this.primero.previous = producto;
                    producto.next = this.primero;
                    this.primero = producto;
                } else {
                    _agregate(producto, this.primero);
                }
            }
            return true; // 'Producto agregado'; // Se pudo
        }
    }
// Por revisar
    listar(){
        let info = ``;
        let actual = this.primero;
        while(actual != null) {
            info+= `\n${actual.info()}`;
            actual = actual.next;
        }
        return info;
    }
// Por revisar
    buscar(codigo, actual){

        if(actual.codigo == codigo) {
            return codigo;
        } else {
            this.buscar(codigo, actual.next);
        }
    }
// Por revisar
    eliminar(codigo, actual) {
        if (this.primero.codigo == codigo) {
            this.primero.next.previous = null;
            this.primero = this.primero.next;
            return true; //'Producto eliminado'; // Se elimino el primero
        }
        else if (actual.codigo == codigo){
            actual.previous.next = actual.next;
            actual.next.previous = actual.previous;
            return true; //'Producto eliminado'; // Se pudo
        } 
        else if (actual.next == null){
            return false; //'Codigo inexistente'; // No se pudo
        } 
        else {
            this.eliminar(codigo, actual.next);
        }
    }
// Por revisar
    extraerPrimero(){
        let resultado = this.primero;
        this.primero = this.primero.next;
        return resultado;
    }
// Por revisar
    _codigoEnExistencia(codigo){
        return this.buscar(codigo, this.primero) == undefined ? false : true;
    }
// Por revisar
    _agregate(producto, actual) {
        if(actual.next == null) {
            actual.next = producto;
            producto.previous = actual;
        } else if(actual.codigo <= producto.codigo && actual.next.codigo > producto.codigo) {
            producto.previous = actual;
            producto.next = actual.next;
            actual.next = producto;
            producto.next.previous = producto;
        }
        else {
            this._agregate(producto, actual.next);
        }
        return true;
    }
}
