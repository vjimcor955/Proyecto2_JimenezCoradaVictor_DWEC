document.addEventListener("DOMContentLoaded", () => {
    // Selectores

    const nombre = document.querySelector('#nombre')
    const email = document.querySelector('#email')
    const telefono = document.querySelector('#telefono')
    const empresa = document.querySelector('#empresa')
    const submitBtn = document.querySelector('#formulario input[type="submit"]')
    
    const listadoClientes = document.querySelector('#listado-clientes')

    // Listeners

    nombre.addEventListener("blur", validar)
    email.addEventListener("blur", validar)
    telefono.addEventListener("blur", validar)
    empresa.addEventListener("blur", validar)
    submitBtn.addEventListener("click", anadirCliente)

    
    // Variables

    let infoForumlario = {
        nombre: "",
        email: "",
        telefono: "",
        empresa: ""
    }

    let idCliente = 1

    // Funciones

    comprobarFormulario()

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

    function validarNombre(nombre) {
        const regex = /^[a-záéíóúüñ\s]+$/i
        const resultado = regex.test(nombre.toLowerCase())
        return resultado
    }
    function validarEmail(email) {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        const resultado = regex.test(email)
        return resultado
    }
    function validarTelefono(telefono) {
        const regex =  /^\d{9}$/
        const resultado = regex.test(telefono)
        return resultado
    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia) 
        const error = document.createElement("P")
        error.textContent = mensaje
        error.classList.add("bg-red-600", "text-center", "text-white", "p-2")
        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector(".bg-red-600")  
        if (alerta) {
            alerta.remove()
        }
    }

    function comprobarFormulario() {
        const values = Object.values(infoForumlario)
        // Activa el boton si el formulario esta rellenado correctamente
        if (values.includes("")) {
            submitBtn.classList.add("opacity-50")
            submitBtn.disabled = true
            return
        }
        submitBtn.classList.remove("opacity-50")
        submitBtn.disabled = false

    }


    // TABLA
    function anadirCliente(evento) {
        evento.preventDefault()
        const cliente = Object.values(infoForumlario)
        console.log(cliente)
    
        const clienteRow = document.createElement("TR")
        clienteRow.innerHTML = `
                <td>${cliente[0]}</td>
                <td>${cliente[2]}</td>
                <td>${cliente[3]}</td>
                <td><a href="#" class="editar-cliente" data-id="${idCliente}">Editar</a>   <a href="#" class="eliminar-cliente" data-id="${idCliente}">Eliminar</a></td>

            `
        // clienteRow.innerHTML = `
        //         <td>Nombre</td>
        //         <td>123456789</td>
        //         <td>Empresa SL</td>
        //         <td><a href="#" class="editar-cliente" data-id="${idCliente}">Editar</a>   <a href="#" class="eliminar-cliente" data-id="${idCliente}">Eliminar</a></td>
        //     `
        listadoClientes.appendChild(clienteRow)
        idCliente ++
    }
    
    function editarCliente(evento) {
    
    }
    
    function eliminarCliente(evento) {
    
    
    }
})