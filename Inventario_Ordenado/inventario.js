export class Inventario{
    constructor(){
        this.productos = [];
    }
    agregar(producto){
        console.log('Entra a la función');
        console.log(producto);
        if (this._codigoEnExistencia(producto.codigo)) {
            console.log('Ya existe el codigo');
            return false; // 'Codigo ya existente'; // No se pudo
        } else {
            let posicion = this._encontrarParaAgregar(producto.codigo);
            if (posicion == this.productos.length){
                this.productos.push(producto);
            } else{
            console.log('Acomodanding');
                this.productos.push();
                for(let i = this.productos.length-1; i> posicion+1; i++) {
                    this.productos[i] = this.productos[i-1];
                }
                this.productos[posicion] = producto;
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
    buscar(codigo){
        // let resultado = this.productos[this._buscarIndice(codigo)];
        let resultado;
        for(let i = 0; i< this.productos.length; i++) {
            if(this.productos[i].codigo == codigo) {
                resultado = this.productos[i];
            }
        }
        return resultado == undefined ? null : resultado;
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

    //Por revisar
    _buscarIndice(codigo) {
        let resultado;
        if(this.productos.length == 1) {
            return this.productos[0].codigo == codigo ? 0 : null;
        } else {
            let i = 0;
            let f = this.productos.length-1;
            let m;
            while(i != m) {
                m = Math.floor((i + f) / 2);
                if(this.productos[m].codigo == codigo){
                    resultado = m;
                }
                else if(this.productos[m].codigo > codigo) {
                    f = m;
                } else {
                    i = m;
                }
            }
        }
        return resultado != undefined ? resultado : null;
    }
    _codigoEnExistencia(codigo){
        return this.buscar(codigo) == null ? false : true;
    }
    // Por revisar
    _encontrarParaAgregar(codigo) {
        console.log('Entra a la función');
        let resultado;
        if(this.productos.length == 0) {
            return 0;
        } else {
            if (this.productos[0].codigo < codigo) {
                resultado = 0;
            } else if(this.productos[this.productos.length-1].codigo < codigo) {
                resultado = this.productos.length;
            } else {
                let i = 0;
                let f = this.productos.length-1;
                let m;
                while(i != m) {
                    m = Math.floor((i + f) / 2);
                    if(this.productos[m].codigo == codigo){
                        resultado = m+1; //?
                    }
                    else if(this.productos[m].codigo > codigo) {
                        f = m;
                    } else {
                        i = m;
                    }
                }
                resultado = m+1;
            }
        }
       return resultado;

    }
}
