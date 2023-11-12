// Imports

import { iniciarBD, mostrar, anadirClienteBD, eliminarClienteBD } from "./funciones.js"


// Selectores

export const listadoClientes = document.querySelector('#listado-clientes')


// Funciones

iniciarBD()

export function actualizarTablaHTML() {
    limpiarTablaHTML()
    mostrar()
}

function limpiarTablaHTML() {
    while (listadoClientes.firstChild) {
        listadoClientes.firstChild.remove()
    }
}

export function eliminarClienteHTML(evento) {
    const fila = evento.target.parentElement.parentElement
    eliminarClienteBD(fila.querySelector('#nombre').textContent)
    actualizarTablaHTML()
}