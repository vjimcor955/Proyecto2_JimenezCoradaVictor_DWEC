// Imports

import { actualizarTablaHTML } from "./app.js"
import { anadirClienteBD } from "./funciones.js"


// Selectores
const editNombre = document.querySelector('#nombre')
const editEmail = document.querySelector('#email')
const editTelefono = document.querySelector('#telefono')
const editEmpresa = document.querySelector('#empresa')
const editSubmitBtn = document.querySelector('input[type="submit"]')

// Listeners

editNombre.addEventListener("blur", validar)
editEmail.addEventListener("blur", validar)
editTelefono.addEventListener("blur", validar)
editEmpresa.addEventListener("blur", validar)
editSubmitBtn.addEventListener("click", actualizarBD)


// Variables

let infoForumlario = {
    nombre: "",
    email: "",
    telefono: "",
    empresa: ""
}


// Funciones

comprobarFormulario()

// Valida que los formularios se rellenen correctamente y muestra una alerta cuando se hace incorrectamente
function validar(evento) {
    if (evento.target.value.trim() === "") {
        mostrarAlerta(`El campo ${evento.target.id} es obligatorio`, evento.target.parentElement)
        infoForumlario[evento.target.name] = ""
        comprobarFormulario()
        return
    }
    if (evento.target.id === "nombre" && !validarNombre(evento.target.value)) {
        mostrarAlerta("El campo nombre no es valido", evento.target.parentElement)
        infoForumlario[evento.target.name] = ""
        comprobarFormulario()
        return
    }
    if (evento.target.id === "email" && !validarEmail(evento.target.value)) {
        mostrarAlerta("El campo email no es valido", evento.target.parentElement)
        infoForumlario[evento.target.name] = ""
        comprobarFormulario()
        return
    }
    if (evento.target.id === "telefono" && !validarTelefono(evento.target.value)) {
        mostrarAlerta("El campo telefono no es valido", evento.target.parentElement)
        infoForumlario[evento.target.name] = ""
        comprobarFormulario()
        return
    }

    limpiarAlerta(evento.target.parentElement)

    infoForumlario[evento.target.name] = evento.target.value 
    comprobarFormulario(infoForumlario)

}

// Valida que el nombre sea correcto
function validarNombre(nombre) {
    const regex = /^[a-záéíóúüñ\s]+$/i
    const resultado = regex.test(nombre.toLowerCase())
    return resultado
}
// Valida que el email sea correcto
function validarEmail(email) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    const resultado = regex.test(email)
    return resultado
}
// Valida que el telefono sea correcto
function validarTelefono(telefono) {
    const regex =  /^\d{9}$/
    const resultado = regex.test(telefono)
    return resultado
}

// Crea y muestra una alerta
function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia) 
    const error = document.createElement("P")
    error.textContent = mensaje
    error.classList.add("bg-red-600", "text-center", "text-white", "p-2")
    referencia.appendChild(error)
}

// Borra la alerta
function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector(".bg-red-600")  
    if (alerta) {
        alerta.remove()
    }
}

// Comprueba que el formulario esta rellenado correctamente y activa el boton
function comprobarFormulario() {
    const values = Object.values(infoForumlario)
    if (values.includes("")) {
        editSubmitBtn.classList.add("opacity-50")
        editSubmitBtn.disabled = true
        return
    }
    editSubmitBtn.classList.remove("opacity-50")
    editSubmitBtn.disabled = false
}

// Actualiza la Base de datos
export function actualizarBD(evento) {
    evento.preventDefault()
    const datos = Object.values(infoForumlario)
    anadirClienteBD(datos[0], datos[1], datos[2], datos[3])
    actualizarTablaHTML()
}