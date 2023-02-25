function calculadoraMate() {

    function pedirNombre() {
        let nombreIngresado = prompt("Ingrese su nombre")
        return nombreIngresado
    }

    function cantidadTermos(nombr) {
        let termos = parseInt(prompt("Ingrese la cantidad de termos que toma al día " + nombr))
        while (isNaN(termos)) {
            termos = parseInt(prompt("ATENCIÓN TIPO DE DATO INCORRECTO, Ingrese en numeros la cantidad de termos " + nombr))
        }
        return termos
    }


    function promedioMate(prom, nomb) {
        if (prom > 2 && prom < 7) {
            console.log(`${nomb} Usted es enfermo del Mate`)
        } else if (prom < 2 && prom > 0) {
            console.log(`${nomb} Usted toma Mate de manera normal`)
        } else if (prom <= 0) {
            console.log(`${nomb} Usted odia el Mate`)
        } else {
            console.log("Usted no es normal o es hijo de Uruguayo/a")
        }
    }

    function preguntaSalida() {
        respuesta = prompt("Responda si desea seguir ingresando alumnos. EXIT para salir")
    }


    let respuesta
    do {
        const nombre = pedirNombre()
        const termos = cantidadTermos(nombre)
        promedioMate(termos, nombre)
        preguntaSalida()
    } while (respuesta.toUpperCase() != "EXIT")
}

function agregarProducto() {
    let productoIngresado = prompt("Ingrese el nombre del producto")
    let marcaIngresado = prompt("Ingrese la marca del producto")
    let precioIngresado = parseInt(prompt("Ingrese el precio del producto"))

    const productoNuevo = new nuevoProducto(carrito.length + 1, productoIngresado, marcaIngresado, precioIngresado)
    console.log(productoNuevo)

    carrito.push(productoNuevo)
    console.log(carrito)
}

function eliminarProducto(array) {
    console.log("A partir del catalogo ingrese el id que desea eliminar")
    for (let elem of array) {
        console.log(`${elem.id} - ${elem.producto} de la marca ${elem.marca}`)
    }
    let idEliminar = parseInt(prompt("Ingrese el id a eliminar"))


    let arrayID = array.map((producto) => producto.id)
    console.log(arrayID)
    let indice = arrayID.indexOf(idEliminar)

    array.splice(indice, 1)
    verCatalogo(array)
}

function verCatalogo(array) {
    console.log("Bienvenido! Nuestro catalogo es:")
    array.forEach((producto) => {
        console.log(producto.id, producto.producto, producto.marca, producto.precio)
    })
}

function buscarPorProducto(array) {
    let productoBuscado = prompt("Ingrese el nombre del producto que desea buscar")
    let productoEncontrado = array.find(
        (producto) => producto.producto.toLowerCase() == productoBuscado.toLowerCase()
    )
    if (productoEncontrado == undefined) {
        console.log(`El producto ${productoBuscado} no está en stock`)
    } else {
        console.log(productoEncontrado)
    }
}


function ordenarMenorMayor(array) {
    const menorMayor = [].concat(array)
    menorMayor.sort((a, b) => a.precio - b.precio)
    verCatalogo(menorMayor)
}

function ordenarMayorMenor(arr) {
    const mayorMenor = [].concat(arr)
    mayorMenor.sort((param1, param2) => {
        return param2.precio - param1.precio
    })
    verCatalogo(mayorMenor)
}

function ordenarAlfabeticamenteTitulo(array) {
    const ordenadoAlfabeticamente = [].concat(array)
    ordenadoAlfabeticamente.sort((a, b) => {
        if (a.producto > b.productoo) {
            return 1
        }
        if (a.producto < b.producto) {
            return -1
        }
        return 0;
    })
    verCatalogo(ordenadoAlfabeticamente)
}

function ordenar(array) {
    let opcion = parseInt(prompt(`
    1 - Ordenar de menor a mayor
    2 - Ordenar de mayor a menor
    3 - Ordenar alfabeticamente `))
    switch (opcion) {
        case 1:
            ordenarMenorMayor(array)
            break
        case 2:
            ordenarMayorMenor(array)
            break
        case 3:
            ordenarAlfabeticamenteTitulo(array)
            break
        default:
            console.log(`${opcion} no es válida para ordenar`)
            break
    }
}

function menu() {
    let salirMenu = false
    do {
        salirMenu = preguntarOpcion(salirMenu)
    } while (!salirMenu)
}

function preguntarOpcion(salir) {
    let opcionIngresada = parseInt(prompt(`Ingrese la opción deseada
           1 - Agregar Producto
           2 - Borrar Producto
           3 - Consultar catálogo
           4 - Calculador de Mate:
           5 - Buscar productos:
           6 - Ordenar productos:
           0 - Salir del menu`))

    switch (opcionIngresada) {
        case 1:
            agregarProducto()
            break
        case 2:
            eliminarProducto(carrito)
            break
        case 3:
            verCatalogo(carrito)
            break
        case 4:
            calculadorMate()
            break
        case 5:
            buscarPorProducto(carrito)
            break
        case 6:
            ordenar(carrito)

            break
        case 0:
            console.log("gracias por utilizar nuestra app")
            salir = true
            return salir
            break
        default:
            console.log("Ingrese una opción correcta")
            break
    }
}

// menu()







