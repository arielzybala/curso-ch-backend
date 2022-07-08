const express = require("express");
const app = express()

const nombres = ["a","b","c"]
const apellidos = ["x","y","z"]
const colores = ["g","h","i"]
const armarMock = () => {
    const indiceNombre = Math.floor(Math.random()*nombres.length)
    const indiceApellido = Math.floor(Math.random()*apellidos.length)
    const indiceColor = Math.floor(Math.random()*colores.length)
    return {
        nombre: nombres[indiceNombre],
        apellido: apellidos[indiceApellido],
        colores: colores[indiceColor]
    }
}
app.get("/test",(req, res)=>{
    const mocks =[];
    for (let i = 0; i < 10; i++) {
        mocks.push(armarMock())  
    }

        
    res.send({mocks})
}
)

app.listen(8080 , ()=>{
    console.log("server ok")
})