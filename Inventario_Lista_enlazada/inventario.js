export class Inventario{
    constructor(){
        this.primerProducto = null;
        this.ultimoProducto = null;
    }
    // Revisado
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
    // Revisado
    agregarInicio(producto){
        if (!this._codigoEnExistencia(producto.codigo)) {
           producto.sig = this.primerProducto;
           this.primerProducto = producto;
            return true; //'Producto agregado'; // Se pudo
        } else {
            return false; //'Codigo ya existente'; // No se pudo
        }
    }
    // Arreglado y revisado
    insertar(producto, lugar) {
        if (!this._codigoEnExistencia(producto.codigo)) {
            if (this.primerProducto == null) {
                this.primerProducto = producto;
            }
            else {
                if (lugar == 1) {
                    this.agregarInicio(producto);
                } else{
                    this._agregate(producto, this.primerProducto, lugar-2);
                }
            }
            return true; //'Producto insertado'; // Se pudo
        } else {
            return false; //'Codigo ya existente'; // No se pudo
        }
    }
    // Revisado
    listar(){
        let info = ``;
        let actual = this.primerProducto;
        while(actual != null){
            info += actual.info() + "\n";
            actual = actual.sig;
        }
        return info;
    }
    // Revisado
    buscar(codigo){
        let resultado;
        let actual = this.primerProducto;
        let seEncontro = false;
        while(actual != null && seEncontro == false) {
            if(actual.codigo == codigo) {
                resultado = actual;
                seEncontro = true;
            } else {
                actual = actual.sig;
            }
        }
        return resultado == undefined ? null : resultado;
    }
    // Revisado
    eliminar(codigo) {
        if (this._codigoEnExistencia(codigo)){
            let actual = this.primerProducto;

            if (actual.codigo == codigo) {
                this.primerProducto = actual.sig;
            }
            else{
                let seEncontro = false;

                while(seEncontro == false) {
                    if(actual.sig.codigo == codigo) {
                        actual.sig = actual.sig.sig;
                        seEncontro = true;
                    } else {
                        actual = actual.sig;
                    }
                }
            }
            return true; //'Producto eliminado'; // Se pudo
        } else {
            return false; //'Codigo inexistente'; // No se pudo
        }
    }
    // Por revisar
    extraerPrimero(){
        if(this.primerProducto == null) {
            return false;
        }
        let resultado;
        resultado = this.primerProducto;
        this.primerProducto = resultado.sig;
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
                this._agregate(nuevo, productoX.sig, --lugar);
            }            
        }
    }
    _codigoEnExistencia(codigo){
        return this.buscar(codigo) == null ? false : true;
    }
}
