
class Producto {
    constructor(id, producto, marca, precio, imagen) {
        this.id = id,
        this.producto = producto,
        this.marca = marca,
        this.precio = precio,
        this.imagen = imagen
        this.cantidad = 1
    }

    
    sumarUnidad(){
        this.cantidad = this.cantidad + 1
        return this.cantidad
        
    }
    restarUnidad(){
        this.cantidad = this.cantidad - 1
        return this.cantidad
        
    }
}
let carrito = []









const cargarStock = async ()=> {

    const response = await fetch("productos.json")
    const data = await response.json()
    console.log(data)
    for (let producto of data) {
        let productoNuevo = new Producto(producto.id, producto.producto, producto.marca, producto.precio, producto.imagen)
        carrito.push(productoNuevo)
    }

    localStorage.setItem("carrito", JSON.stringify(carrito))
}


if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
} else {
    cargarStock()
}


