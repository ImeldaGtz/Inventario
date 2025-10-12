import { Inventario } from "./inventario.js";
import { Producto } from "./producto.js";

const miInventario = new Inventario();
let msg = document.getElementById("detalles");

const btnAdd = document.getElementById("btnAdd");
btnAdd.addEventListener("click", () => {
    let producto = _newProduct();
    if (!producto) {
        msg.innerHTML = '';
        msg.innerHTML += "<p>Campos incompletos</p>";
    } else {
        msg.innerHTML = '';
        msg.innerHTML += (miInventario.agregar(producto)) ? "<h5>Se agregó</h5> <p>" + producto.info() + "</p>" : '<p>Código ya existente</p>';
    }

    
});

const btnList = document.getElementById("btnList");
btnList.addEventListener("click", () => {
    miInventario.listar();
    if (miInventario.productos.length == 0) {
        msg.innerHTML = '';
        msg.innerHTML += "<p>Nada que listar</p>";
    } else{
        msg.innerHTML = ''
        msg.innerHTML = "<ul>" + _listarHTML() + "</ul>";
    }
});

const btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", () => {
    let codigo = parseInt(document.getElementById("txtCode").value);
    msg.innerHTML = '';
    msg.innerHTML = "<p>" + (miInventario.buscar(codigo) == null ? 'No se encontró' : "<h5>Se encontró</h5> " + miInventario.buscar(codigo).info()) + "</p>";
});


const btnDelete = document.getElementById("btnDelete");
btnDelete.addEventListener("click", () => {
    let codigo = parseInt(document.getElementById("txtCode").value);
    msg.innerHTML = '';
    msg.innerHTML = "<p>" + (miInventario.eliminar(codigo) ? 'Producto eliminado' : 'Código inexistente') + "</p>";
});

const btnExtractFirst = document.getElementById("btnExtractFirst");
btnExtractFirst.addEventListener("click", () =>{
    let pro = miInventario.extraerPrimero();
    msg.innerHTML = '';
    msg.innerHTML += (pro != false) ? "<h5>Se extrajo</h5> <p>" + pro.info() + "</p>" : '<p>No hay qué extraer</p>';
});

function _listarHTML() {
    let info = ``;
    for(let i = 0; i < miInventario.productos.length; i++) {
        info+= `<li>${miInventario.productos[i].info()}</li>`;  
    }
    return info;
}

function _newProduct(){
    let codigo = parseInt(document.getElementById("txtCode").value);
    let nombre = document.getElementById("txtName").value;
    let cantidad = document.getElementById("txtQuan").value;
    let precio = document.getElementById("txtPrice").value;

    if (codigo != '' && nombre != '' && cantidad != '' && precio != '') {
        let producto = new Producto(codigo, nombre, cantidad, precio);
        return producto;
    }
    else {
        return false;
    }
}