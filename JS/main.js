//Capturas nodos DOM:
let carritoCompras = document.getElementById("carritoCompras")
let guardarProductoBtn = document.getElementById("guardarProductoBtn")
let buscador = document.getElementById("buscador")
let coincidencia = document.getElementById("coincidencia")
let selectOrden = document.getElementById("selectOrden")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let formAgregarProducto = document.getElementById("formAgregarProducto")
let precioTotal = document.getElementById("precioTotal")
let loaderTexto = document.getElementById("loaderTexto")
let loader = document.getElementById("loader")
let reloj = document.getElementById("reloj")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
let formCalculadorMate = document.getElementById("formCalculadorMate")
let guardarMate = document.getElementById("guardarMate")

const DateTime = luxon.DateTime

const fechaHoy = DateTime.now()
let fecha = document.getElementById("fecha")
let fechaMostrar = fechaHoy.toLocaleString(DateTime.DATE_FULL)
fecha.innerHTML = `${fechaMostrar}`

function mostrarCatalogo(array) {
    carritoCompras.innerHTML = ""
    for (let carr of array) {

        let nuevoProducto = document.createElement("div")

        nuevoProducto.classList.add("col-12", "col-md-6", "col-lg-4", "my-3")
        nuevoProducto.innerHTML = `
        <div id="${carr.id}" class="card" style="width: 18rem;">
                <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${carr.imagen}" alt="${carr.producto} de ${carr.marca}">
                <div class="card-body">
                            <h4 class="card-title">${carr.producto}</h4>
                            <p>Marca: ${carr.marca}</p>
                            <p class="">Precio: $${carr.precio}</p>
                        <button id="agregarBtn${carr.id}" class="btn btn-outline-success">Agregar al carrito</button>
                </div>
        </div>`
        carritoCompras.appendChild(nuevoProducto)

        let btnAgregar = document.getElementById(`agregarBtn${carr.id}`)

        btnAgregar.addEventListener("click", () => {
            agregarAlCarrito(carr)
        })
    }
}
//array de productosComprados


let productosEnCarrito = []
if(localStorage.getItem("compra")){
    
    for(let prod of JSON.parse(localStorage.getItem("compra"))){
        let cantStorage = prod.cantidad
        let prodCarrito = new Producto(prod.id, prod.marca, prod.producto, prod.precio, prod.imagen)
        prodCarrito.cantidad = cantStorage
        productosEnCarrito.push(prodCarrito)
    }
    console.log(productosEnCarrito)
}else{
    productosEnCarrito = []
}




function agregarAlCarrito(array) {

    let prodAgregado = productosEnCarrito.find((elem) => elem.id == array.id)

    if (prodAgregado == undefined) {

        console.log(`El producto ${array.producto} de la marca ${array.marca} ha sido agregado. Vale ${array.precio}`)
        productosEnCarrito.push(array)
        console.log(productosEnCarrito)
        localStorage.setItem("compra", JSON.stringify(productosEnCarrito))

        Swal.fire({
            title: "Ha agregado un producto :D",
            text: `El producto ${array.producto} de la marca ${array.marca} ha sido agregado`,
            icon: "info",
            confirmButtonText: 'Entendido',
            confirmButtonColor: "green",
            
            timer: 3000,
            imageUrl: `assets/${array.imagen}`,
            imageHeight: 200
        })
    } else {
        console.log(`EL producto ${prodAgregado.producto} ya existe en el carrito`)
        Swal.fire({
            title: `Producto ya existente`,
            text: `EL producto ${prodAgregado.producto} de la marca ${prodAgregado.marca} ya existe en el carrito`,
            icon: "info",
            timer: 2000,
        })
    }
}




function calculadorMate() {
    a = document.getElementById("inputNombre")
    b = document.getElementById("inputCantTermos")
console.log(`${a.value} y ${b.value}`)
    if(b.value <= 0){Swal.fire({
        imageUrl: './assets/odio.jpg',
        imageWidth: 300,
        imageHeight: 200,
        text: `${a.value} Usted odia el Mate`,
        confirmButtonColor: 'green',
        timer: 3500
    })}    
    else if (b.value < 3 && b.value > 0) {Swal.fire({
        imageUrl: './assets/-3.jpg',
        imageWidth: 300,
        imageHeight: 200,
        text: `${a.value} Usted toma Mate de manera normal`,
        confirmButtonColor: 'green',
        timer: 3500
    })}
    else if (b.value >= 3 && b.value < 5) {Swal.fire({
        imageUrl: './assets/2+-5.jpg',
        imageWidth: 300,
        imageHeight: 200,
        text: `Usted es Argetino, como Messi y la copa :D`,
        confirmButtonColor: 'green',
        timer: 3500
    })}
    else {Swal.fire({
        imageUrl: './assets/5+.jpg',
        imageWidth: 300,
        imageHeight: 200,
        text: `Usted es Uruguayo o pariente de Pepe Mujica :D`,
        confirmButtonColor: 'green',
        timer: 3500
    })}
    formCalculadorMate.reset()

    }


function cargarProducto(array) {

    let inputPropucto = document.getElementById("productoInput")
    let inputMarca = document.getElementById("marcaInput")
    let inputPrecio = document.getElementById("precioInput")


    const productoNuevoIngresado = new Producto(array.length + 1, inputPropucto.value, inputMarca.value, inputPrecio.value, "productoNuevo.jpg")
    console.log(productoNuevoIngresado)
    array.push(productoNuevoIngresado)
    localStorage.setItem("carrito", JSON.stringify(array))
    mostrarCatalogo(array)
    formAgregarProducto.reset()
    Toastify({
        text: `Usted ha agregado el producto ${productoNuevoIngresado.producto} al stock`,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            color: "black"
        },
        duration: 2000
    }).showToast()

}

function buscarInfo(buscado, array) {
    let busquedaArray = array.filter(
        (carr) => carr.marca.toLowerCase().includes(buscado.toLowerCase()) || carr.producto.toLowerCase().includes(buscado.toLowerCase()
        )
        
    )

    busquedaArray.length == 0 ?
        (coincidencia.innerHTML = `<h3>No hay coincidencias con su búsqueda</h3>`,
            mostrarCatalogo(busquedaArray)) :
        (coincidencia.innerHTML = "",
            mostrarCatalogo(busquedaArray))
}

function ordenarMenorMayor(array) {
    
    //ordena de menor a mayor
    const menorMayor = [].concat(array)
    menorMayor.sort((a, b) => a.precio - b.precio)
    mostrarCatalogo(menorMayor)
}

function ordenarMayorMenor(arr) {
    //ordenar de mayor a menor
    const mayorMenor = [].concat(arr)
    mayorMenor.sort((param1, param2) => {
        return param2.precio - param1.precio
    })
    mostrarCatalogo(mayorMenor)
}

function ordenarAlfabeticamenteTitulo(array) {
    const ordenadoAlfabeticamente = [].concat(array)
    ordenadoAlfabeticamente.sort((a, b) => {
        if (a.producto > b.producto) {
            return 1
        }
        if (a.producto < b.producto) {
            return -1
        }
        
        return 0;
    })
    mostrarCatalogo(ordenadoAlfabeticamente)
}


function cargarProductosCarrito(array) {
    modalBodyCarrito.innerHTML = ""
    array.forEach((productoEnCarrito) => {
        modalBodyCarrito.innerHTML += `
        <div class="card border-primary mb-3" id ="productoCarrito${productoEnCarrito.id}" style="max-width: 540px;">
                 <img class="card-img-top" height="300px" src="assets/${productoEnCarrito.imagen}" alt="">
                 <div class="card-body">
                        <h4 class="card-title">${productoEnCarrito.producto}</h4>
                    
                         <p class="card-text">$${productoEnCarrito.precio}</p>
                         <p class="card-text">Total de unidades: ${productoEnCarrito.cantidad}</p>
                         <p class="card-text">SubTotal: ${productoEnCarrito.precio * productoEnCarrito.cantidad}</p>
                         <button class= "btn btn-success" id="botonSumarUnidad${productoEnCarrito.id}"><i class=""></i>+1</button>
                         <button class= "btn btn-danger" id="botonEliminarUnidad${productoEnCarrito.id}"><i class=""></i>-1</button>
                         <button class= "btn btn-danger" id="botonEliminar${productoEnCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                 </div>    
            </div>
        `
    })


    array.forEach((productoEnCarrito) => {
        
        document.getElementById(`botonEliminar${productoEnCarrito.id}`).addEventListener("click", () => {
            
            let cardProducto = document.getElementById(`productoCarrito${productoEnCarrito.id}`)
            cardProducto.remove()

            let productoEliminar = array.find((prod) => prod.id == productoEnCarrito.id)
            console.log(productoEliminar)
            
            let posicion = array.indexOf(productoEliminar)
            console.log(posicion)
            array.splice(posicion, 1)
            console.log(array)
            
            localStorage.setItem("compra", JSON.stringify(array))
            
            calcularTotal(array)
        })

        //SUMAR UNIDAD
        document.getElementById(`botonSumarUnidad${productoEnCarrito.id}`).addEventListener("click", ()=>{
            
            productoEnCarrito.sumarUnidad()
            localStorage.setItem("compra", JSON.stringify(array))
            cargarProductosCarrito(array)
        })

        //ELIMINAR UNIDAD
        document.getElementById(`botonEliminarUnidad${productoEnCarrito.id}`).addEventListener("click", ()=>{
            let eliminar = productoEnCarrito.restarUnidad()
            if(eliminar < 1){
                
                let cardProducto = document.getElementById(`productoCarrito${productoEnCarrito.id}`)
                cardProducto.remove()

                let productoEliminar = array.find((prod)=>prod.id == productoEnCarrito.id)
                console.log(productoEliminar)
                
                let posicion = array.indexOf(productoEliminar)
                console.log(posicion)
                array.splice(posicion,1)
                console.log(array)
                
                localStorage.setItem("compra", JSON.stringify(array))
                
                calcularTotal(array)
            }else{
                localStorage.setItem("compra", JSON.stringify(array))
            }
            cargarProductosCarrito(array)
        })
    })
    calcularTotal(array)
}

function calcularTotal(array) {
    let total = array.reduce((acc, productoCarrito)=> acc + (productoCarrito.precio * productoCarrito.cantidad) ,0)

    total == 0 ? precioTotal.innerHTML = `No hay productos en el carrito` :
        precioTotal.innerHTML = `El total del carrito es <strong>${total}</strong>`

        return total
}

function finalizarCompra() {
    Swal.fire({
        title: 'Está seguro de realizar la compra',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result) => {
        if(result.isConfirmed){
            let finalizarTotal = calcularTotal(productosEnCarrito)
            Swal.fire({
                title: 'Compra realizada',
                icon: 'success',
                confirmButtonColor: 'green',
                text: `Muchas gracias por su compra ha adquirido nuestros productos el día ${fechaMostrar} a las ${fechaHoy.toLocaleString(DateTime.TIME_SIMPLE)}. El total es de $ ${finalizarTotal} `,
                })
                
                productosEnCarrito = []
                
                localStorage.removeItem("compra")
        } else {
                Swal.fire({
                    title: 'Compra no realizada',
                    icon: 'info',
                    text: `La compra no ha sido realizada! Atención sus productos siguen en el carrito :D`,
                    confirmButtonColor: 'green',
                    timer: 3500
                })
            }
        }

    )
}

guardarProductoBtn.addEventListener("click", () => {
    cargarProducto(carrito)
})

buscador.addEventListener("input", () => {    
    buscarInfo(buscador.value.toLowerCase(), carrito)
})

selectOrden.addEventListener("change", () => {
    console.log(selectOrden.value)
    if (selectOrden.value == 1) {
        ordenarMayorMenor(carrito)
    } else if (selectOrden.value == 2) {
        ordenarMenorMayor(carrito)
    } else if (selectOrden.value == 3) {
        ordenarAlfabeticamenteTitulo(carrito)
    } else {
        mostrarCatalogo(carrito)
    }
})

botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(productosEnCarrito)
})

botonFinalizarCompra.addEventListener("click", () => {
    finalizarCompra()
})

setTimeout(() => {
    loaderTexto.innerHTML = ""
    loader.remove()
    mostrarCatalogo(carrito)
}, 3000)


setInterval(() => {
    let horaActual = DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS)
    reloj.innerHTML = `${horaActual}`
}, 1000)



guardarMate.addEventListener("click", () => {
    calculadorMate()
})
