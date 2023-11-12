import { listadoClientes, eliminarClienteHTML } from "./app.js"

// IndexedDB ---------------------------------------------------------
var bd 

// Inicia la base de datos
export function iniciarBD() {
    var solucitud = indexedDB.open("datosClientes")

    solucitud.addEventListener("error", mostrarError)
    solucitud.addEventListener("success", comenzar)
    solucitud.addEventListener("upgradeneeded", crearBD)
}

// Muestra una alerta si hay un error en la base de datos
function mostrarError(evento) {
    alert(`ERROR: ${evento.code} - ${evento.message}`)
}

// Muestra los datos que haya en la base de datos
function comenzar(evento) {
    bd = evento.target.result
    mostrar()
}

// Crea la base de datos
function crearBD(evento) {
    var baseDatos = evento.target.result
    var clientesBD = baseDatos.createObjectStore("Clientes", {keyPath: "nombre"})
    clientesBD.createIndex("BuscarNombre", "nombre", {unique: false})
}

// Anade un cliente a la base de datos
export function anadirClienteBD(clienetN, clienteC, clienteT, clienteE) {
    var transaccion = bd.transaction(["Clientes"], "readwrite")
    var clientesBD = transaccion.objectStore("Clientes")
    clientesBD.add ({
        nombre: clienetN,
        email: clienteC,
        telefono: clienteT,
        empresa: clienteE
    })
}

// Crea un puntero por cada objeto que haya en la base de datos
export function mostrar() {
    var transaccion = bd.transaction(["Clientes"])
    var almacen = transaccion.objectStore("Clientes")

    var puntero = almacen.openCursor()
    puntero.addEventListener("success", mostrarClientesBD)
}

// Crea una fila en la tabla por cada puntero 
function mostrarClientesBD(evento) {
    var puntero = evento.target.result

    if (puntero) {
        const clienteRow = document.createElement("TR")
        clienteRow.innerHTML = `
                <td id="nombre" class="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium tracking-wider">${puntero.value.nombre}</td>
                <td id="telefono" class="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium tracking-wider">${puntero.value.telefono}</td>
                <td id="empresa" class="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium tracking-wider">${puntero.value.empresa}</td>
                <td class="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium tracking-wider"><a href="editar-cliente.html" class="editar-cliente">Editar</a>   <a href="#" class="eliminar-cliente">Eliminar</a></td>
            `
        listadoClientes.appendChild(clienteRow)  
        
        const eliminarBtn = clienteRow.querySelector('.eliminar-cliente')
        const editarBtn = clienteRow.querySelector('.editar-cliente')
        eliminarBtn.addEventListener("click", eliminarClienteHTML)
        editarBtn.addEventListener("click", eliminarClienteHTML)

        puntero.continue()
    }
}

// Elimina un cliente de la base de datos
export function eliminarClienteBD(key) {
    var transaccion = bd.transaction(["Clientes"], "readwrite")
    var clientesBD = transaccion.objectStore("Clientes")
    var solucitud = clientesBD.delete(key)
}

