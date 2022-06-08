const mongoose = require("mongoose")

mongoose.connect("mongodb://root:32401746@localhost:27017/ecommerce?authSource=admin")

mongoose.connection.on("open",()=>{
    console.log("Base de datos conectada con exito")
})

mongoose.connection.on("error", ()=>{
    console.log("error al conectarse a la base de datos")
})