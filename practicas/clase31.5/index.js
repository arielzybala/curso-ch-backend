const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://coder_one:kzTsmMaGjGjLqQ5W@clusterecommerce.vzftj.mongodb.net/ecommerce?retryWrites=true&w=majority")

mongoose.connection.on("open",()=>{
    console.log("Base de datos conectada con exito")
})

mongoose.connection.on("error", ()=>{
    console.log("error al conectarse a la base de datos")
})

const schemaProduct = new Schema({
        name: {
            type:String,
            required:true
        },
        price:Number
    })

model("products", schemaProduct)
