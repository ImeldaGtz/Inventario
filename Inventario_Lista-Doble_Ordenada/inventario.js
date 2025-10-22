import { act } from "react";

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
                    this.primero.previus = producto;
                    producto.next = this.primero;
                    this.primero = producto;
                } else {
                    _agregate(producto, this.primero);
                }
            }
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
            this.primero.next.previus = null;
            this.primero = this.primero.next;
            return true; //'Producto eliminado'; // Se elimino el primero
        }
        else if (actual.codigo == codigo){
            actual.previus.next = actual.next;
            actual.next.previus = actual.previus;
            return true; //'Producto eliminado'; // Se pudo
        } 
        else if (actual.next == null){
            return false; //'Codigo inexistente'; // No se pudo
        } 
        else {
            this.eliminar(codigo, actual.next);
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
        return this.buscar(codigo) == undefined ? false : true;
    }
// Por revisar
    _agregate(producto, actual) {
        if(actual.next == null) {
            actual.next = producto;
            producto.previus = actual;
        } else if(actual.codigo <= producto.codigo && actual.next.codigo > producto.codigo) {
            producto.previus = actual;
            producto.next = actual.next;
            actual.next = producto;
            producto.next.previus = producto;
        }
        else {
            this._agregate(producto, actual.next);
        }
        return true;
    }
}
