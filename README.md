# Proyecto2_JimenezCoradaVictor_DWEC

## Uso de IndexedDB

El primer paso es colocar un listener que se lance al cargar la ventana:

```
window.addEventListener("load", iniciarBD)
```

Lanzara la funcion iniciarBD() que contiene el siguiente codigo: 

```
function iniciarBD() {
    var solucitud = indexedDB.open("datosClientes")

    solucitud.addEventListener("error", mostrarError)
    solucitud.addEventListener("success", comenzar)
    solucitud.addEventListener("upgradeneeded", crearBD)
}
```

Para usar IndexedDB primero debemos abrir la base de datos con 'indexed.open()' y posteriormente le añado 3 listeners que lancen tres funciones en caso de que la base de datos tenga un error, funcione correctamente o necesite ser creada.

Las tres funciones que se lanzaran son:
```
function mostrarError(evento) {
    alert(`ERROR: ${evento.code} - ${evento.message}`)
}
```
```
function comenzar(evento) {
    bd = evento.target.result
    mostrar()
}
```
```
function crearBD(evento) {
    var baseDatos = evento.target.result
    var clientesBD = baseDatos.createObjectStore("Clientes", {keyPath: "nombre"})
    clientesBD.createIndex("BuscarNombre", "nombre", {unique: false})
}
```

La funcion mostrarError() muestra una alerta en caso de error, la funcion crearBD() crea la base de datos en la que almacenar los datos y comenzar() lanza a su vez la funcion mostrar(), que crea un puntero por cada objeto almacenado en la base de datos:

```
function mostrar() {
    var transaccion = bd.transaction(["Clientes"])
    var almacen = transaccion.objectStore("Clientes")

    var puntero = almacen.openCursor()
    puntero.addEventListener("success", mostrarClientesBD)
}
```

Si existien punteros y se lanza el listener, la funcion mostarClientesDB() inserta en la tabla la informacion contiene el objeto:


```
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
```

Para añadir y eliminar informacion de la base de datos se usan las funciones anadirClienteBD() y eliminarClienteBD(), para interactuar con la base de datos es necesario crear una transaccion de tipo 'readwrite' ya que van a modificarse los datos, para añadirlos usamos una consulta con 'add' y para eliminarlos una con 'delete':

```
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
```

```
function eliminarClienteBD(key) {
    var transaccion = bd.transaction(["Clientes"], "readwrite")
    var clientesBD = transaccion.objectStore("Clientes")
    var solucitud = clientesBD.delete(key)
}
```
