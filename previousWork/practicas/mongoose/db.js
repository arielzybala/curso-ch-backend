const mongoose = require("mongoose")

mongoose.connect("mongodb://root:32401746@localhost:27017/coderhouse_mongo?authSource=admin") //sino existe la db la crea

mongoose.connection.on("open",()=>{
    console.log("Base de datos conectada con exito")
})

mongoose.connection.on("error", ()=>{
    console.log("error al conectarse a la base de datos")
})


