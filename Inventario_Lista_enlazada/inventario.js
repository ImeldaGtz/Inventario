import { act } from "react";

export class Inventario{
    constructor(){
        this.primerProducto = null;
        this.ultimoProducto = null;
    }
    // Por revisar
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
    // Por revisar
    agregarInicio(producto){
        if (!this._codigoEnExistencia(producto.codigo)) {
           producto.sig = this.primerProducto;
           this.primerProducto = producto;
            return true; //'Producto agregado'; // Se pudo
        } else {
            return false; //'Codigo ya existente'; // No se pudo
        }
    }
    // Por revisar
    insertar(producto, lugar) {
        if (!this._codigoEnExistencia(producto.codigo)) {
            if (this.primero == null) {
                this.primero = Alumno;
            }
            else {
                this._agregate(producto, this.primerProducto, lugar);
            }
            return true; //'Producto insertado'; // Se pudo
        } else {
            return false; //'Codigo ya existente'; // No se pudo
        }
    }
    // Por revisar
    listar(){
        let info = ``;
        let actual = this.primerProducto;
        while(actual != null){
            info += actual.info() + "\n";
            actual = actual.sig;
        }
        return info;
    }
    // Por revisar
    buscar(codigo){
        let resultado;
        let actual = this.primerProducto;
        let seEncontro = false;
        while(actual != null || seEncontro == false) {
            if(actual.codigo == codigo) {
                resultado = actual;
                seEncontro = true;
            } else {
                actual = actual.sig;
            }
        }
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
    // Modificado, por revisar
    _agregate(nuevo, productoX, lugar) {
        if(lugar == undefined){
            if (productoX.sig == null) {
                productoX.sig = nuevo;
            } else {
                this._agregate(nuevo, productoX.sig);
            }
        } else {
            if(productoX.sig == null){
                productoX.sig = nuevo;
            }
            else if (lugar == 0) {
                nuevo.sig = productoX.sig;
                productoX.sig = nuevo;
            } else {
                lugar--;
                this._agregate(nuevo, productoX.sig, lugar);
            }            
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
