
let modoOscuro 


if(localStorage.getItem("modoOscuro")){
    modoOscuro = localStorage.getItem("modoOscuro")
    console.log(modoOscuro)
}else{
    console.log("Entra por primera vez")
    localStorage.setItem("modoOscuro", false)
    modoOscuro = localStorage.getItem("modoOscuro")
} 


if(modoOscuro == "true"){
    document.body.classList.add("darkMode")
}else{
    document.body.classList.remove("darkMode")
}

botonDarkMode.addEventListener("click",()=>{
    console.log("Btn oscuro funciona")
    document.body.classList.add("darkMode")
    localStorage.setItem("modoOscuro", true)
})

botonLightMode.addEventListener("click",()=>{
    console.log("Btn claro funciona")
    document.body.classList.remove("darkMode")

    localStorage.setItem("modoOscuro", false)
})

let eliminarModeBtn = document.getElementById("eliminarMode")

eliminarModeBtn.addEventListener("click", function(){
    localStorage.removeItem("modoOscuro")
    localStorage.clear()
})

