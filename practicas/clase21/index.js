const express = require("express")
const {faker} = require("@faker-js/faker")

const app = express()


let arrInfo=[];
const createMoks=( cant=50)=>{
    for(let i = 0; i < cant; i++ ){
        arrInfo.push({
            
            title:  faker.commerce.productName(),
            code: `${faker.commerce.product()}${Math.floor(Math.random() * (500 - 50) + 100)}`,
            description: faker.commerce.productDescription(),
            price: Math.floor(Math.random() * (599999 - 3500) + 100),
            stock: Math.floor(Math.random() * (500 - 50) + 100),
            image: faker.image.imageUrl(480,480,'product',true),
        }
        )
    }
}


app.post("/api/usuarios/:cant", (req, res)=>{
  createMoks(req.params.cant)
    res.send("data Creada")
})
app.get("/api/usuarios/all",(req, res)=>{
    res.send({data:arrInfo})
}
)

app.listen(8080 , ()=>{
    console.log("server ok")
})