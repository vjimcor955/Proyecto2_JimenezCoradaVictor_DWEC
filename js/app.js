// // Selectores

// const listadoClientes = document.querySelector('#listado-clientes')


// // Listeners




// // Variables

// let idCliente = 1

  
// // Funciones


// anadirCliente()

// function anadirCliente(evento) {
//     // evento.preventDefault()
//     // const cliente = Object.values(cliente)
//     // console.log(cliente)

//     const clienteRow = document.createElement("TR")
//     // clienteRow.innerHTML = `
//     //         <td>${cliente.nombre}</td>
//     //         <td>${cliente.email}</td>
//     //         <td>${cliente.telefono}</td>
//     //         <td>${cliente.empresa}</td>
//     //     `
//     clienteRow.innerHTML = `
//             <td>Nombre</td>
//             <td>123456789</td>
//             <td>Empresa SL</td>
//             <td><a href="#" class="editar-cliente" data-id="${idCliente}">Editar</a>   <a href="#" class="eliminar-cliente" data-id="${idCliente}">Eliminar</a></td>
//         `
//     listadoClientes.appendChild(clienteRow)
//     idCliente ++
// }

// function editarCliente(evento) {

// }

// function eliminarCliente(evento) {


// }

// export { anadirCliente }