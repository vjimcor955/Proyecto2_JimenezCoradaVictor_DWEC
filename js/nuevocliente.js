document.addEventListener("DOMContentLoaded", () => {
    // Selectores
    const formularios = document.querySelectorAll('#formulario')

    const nombre = formularios[0].querySelector('#nombre')
    const email = formularios[0].querySelector('#email')
    const telefono = formularios[0].querySelector('#telefono')
    const empresa = formularios[0].querySelector('#empresa')
    const submitBtn = formularios[0].querySelector('input[type="submit"]')

    const listadoClientes = document.querySelector('#listado-clientes')

    const editNombre = formularios[1].querySelector('#nombre')
    const editEmail = formularios[1].querySelector('#email')
    const editTelefono = formularios[1].querySelector('#telefono')
    const editEmpresa = formularios[1].querySelector('#empresa')
    const editSubmitBtn = formularios[1].querySelector('input[type="submit"]')

    // Listeners

    nombre.addEventListener("blur", validar)
    email.addEventListener("blur", validar)
    telefono.addEventListener("blur", validar)
    empresa.addEventListener("blur", validar)
    submitBtn.addEventListener("click", anadirCliente)

    window.addEventListener("load", iniciarBD)

    
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
            submitBtn.classList.add("opacity-50")
            submitBtn.disabled = true
            return
        } else {
            submitBtn.classList.remove("opacity-50")
            submitBtn.disabled = false
        }
    }



    // TABLA -----------------------------------------------------
    // Añade un cliente a la tabla
    function anadirCliente(evento) {
        evento.preventDefault()
        const cliente = Object.values(infoForumlario)
    
        const clienteRow = document.createElement("TR")
        clienteRow.innerHTML = `
                <td id="nombre" class="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium tracking-wider">${cliente[0]}</td>
                <td id="telefono" class="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium tracking-wider">${cliente[2]}</td>
                <td id="empresa" class="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium tracking-wider">${cliente[3]}</td>
                <td class="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium tracking-wider"><a href="#" class="editar-cliente">Editar</a>   <a href="#" class="eliminar-cliente">Eliminar</a></td>
            `
        listadoClientes.appendChild(clienteRow)

        // Reinicia el formulario
        nombre.value = ""
        email.value = ""
        telefono.value = ""
        empresa.value = ""


        // Selectores y listeners para la fila del cliente en la tabla
        const eliminarBtn = clienteRow.querySelector('.eliminar-cliente')
        const editarBtn = clienteRow.querySelector('.editar-cliente')
        eliminarBtn.addEventListener("click", eliminarCliente)
        editarBtn.addEventListener("click", editarCliente)

        // Añadir tambien a la base de datos
        anadirClienteBD(cliente[0], cliente[1], cliente[2], cliente[3])
    }
    
    // Edita un cliente en la tabla
    function editarCliente(evento) {
        evento.preventDefault()
        const fila = evento.target.parentElement.parentElement

        editNombre.value = fila.querySelector('#nombre').textContent.trim()
        editTelefono.value = fila.querySelector('#telefono').textContent.trim()
        editEmpresa.value = fila.querySelector('#empresa').textContent.trim()

        editNombre.addEventListener("blur", validar)
        editEmail.addEventListener("blur", validar)
        editEmpresa.addEventListener("blur", validar)
        editEmpresa.addEventListener("blur", validar)
        editSubmitBtn.addEventListener("click", (evento) => {
            // Elimina la info antigua de la BD
            eliminarClienteBD(fila.querySelector('#nombre').textContent.trim())

            // Actualiza la tabla
            evento.preventDefault()
            fila.querySelector('#nombre').textContent = editNombre.value
            fila.querySelector('#telefono').textContent = editTelefono.value
            fila.querySelector('#empresa').textContent = editEmpresa.value

            // Añade la informacion actualizada a la BD
            anadirClienteBD(editNombre.value, editEmail.value, editTelefono.value, editEmpresa.value)

            // Reinicia el formulario
            editNombre.value = ""
            editEmail.value = ""
            editTelefono.value = ""
            editEmpresa.value = ""
        })
    }
    
    // Elimina un cliente de la tabla
    function eliminarCliente(evento) {
        const fila = evento.target.parentElement.parentElement
        fila.remove()

        // Lo elimina tambien de la BD
        eliminarClienteBD(fila.querySelector('#nombre').textContent)
    }



    // IndexedDB ---------------------------------------------------------
    var bd 

    // Inicia la base de datos
    function iniciarBD() {
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
    function anadirClienteBD(clienetN, clienteC, clienteT, clienteE) {
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
    function mostrar() {
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
                    <td class="px-6 py-3 border-b border-gray-200  text-left text-xs leading-4 font-medium tracking-wider"><a href="#" class="editar-cliente">Editar</a>   <a href="#" class="eliminar-cliente">Eliminar</a></td>
                `
            listadoClientes.appendChild(clienteRow)  
            
            const eliminarBtn = clienteRow.querySelector('.eliminar-cliente')
            const editarBtn = clienteRow.querySelector('.editar-cliente')
            eliminarBtn.addEventListener("click", eliminarCliente)
            editarBtn.addEventListener("click", editarCliente)

            puntero.continue()
        }
    }

    // Elimina un cliente de la base de datos
    function eliminarClienteBD(key) {
        var transaccion = bd.transaction(["Clientes"], "readwrite")
        var clientesBD = transaccion.objectStore("Clientes")
        var solucitud = clientesBD.delete(key)
    }
})