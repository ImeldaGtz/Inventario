export class Inventario{
    constructor(){
        this.primero = null;
    }
// Corregido v2
    agregar(producto){
        if(this.primero == null) {
                this.primero = producto;
                return true;
            } 
        else if (this._codigoEnExistencia(producto.codigo)) {
            return false; // 'Codigo ya existente'; // No se pudo
        } else {
            if(producto.codigo < this.primero.codigo) {
                this.primero.previous = producto;
                producto.next = this.primero;
                this.primero = producto;
            } else {
                this._agregate(producto, this.primero);
            }

            return true; // 'Producto agregado'; // Se pudo
        }
    }
// Funcional
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
        if(actual == null){
            return null;
        } 
        else if(actual.codigo == codigo) {
            return actual;
        } 
        else{
            this.buscar(codigo, actual.next);
        }
    }
// Por revisar
    eliminar(codigo, actual) {
        if(actual == null) {
            return false; //'Codigo inexistente'; // No se pudo
        }
        else if (this.primero.codigo == codigo) {

            if(this.primero.next == null) {
                this.primero = null;
            } else {
                this.primero.next.previous = null;
                this.primero = this.primero.next;
                return true; //'Producto eliminado'; // Se elimino el primero
            }
        }
        else if (actual.codigo == codigo){
            actual.previous.next = actual.next;
            actual.next.previous = actual.previous;
            return true; //'Producto eliminado'; // Se pudo
        }
        else {
            this.eliminar(codigo, actual.next);
        }
    }
// Funcional
    extraerPrimero(){
        if(this.primero == null) {
            return false;
        } else if(this.primero.next == null){
            let resultado = this.primero;
            this.primero = null;
            return resultado;
        } else{
            let resultado = this.primero;
            this.primero = this.primero.next;
            this.primero.previous = null;
            return resultado;
        }
    }
// Por revisar
    extraerUltimo(actual) {
        if(actual.next == null || actual.next == undefined) {
            if(this.primero == actual) {
                this.primero = null;
                return actual;
            } else {
                let resultado = actual;
                actual.previous.next = null;
                return resultado;
            }
        } else {
            this.extraerUltimo(actual.next);
        }
    }
// Por revisar
    _codigoEnExistencia(codigo){
        return this.buscar(codigo, this.primero) == null ? false : true;
    }
// Funcional
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
