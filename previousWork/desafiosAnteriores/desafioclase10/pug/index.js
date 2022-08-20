const express = require('express');
const app = express();
const productsRoutes = require('./routes/products');
const PORT = process.env.PORT || 8081;

//Configura metodo de trabajo de datos
app.set(express.json());
app.set(express.urlencoded({extended: true}))
//Configura Rutas
app.use("/api/products" , productsRoutes);
app.use(express.static(__dirname + '/public'))
//Configura el Motor de Plantilla
app.set("view engine" , "pug");
//Configura sitio donde encontrar las Plantillas
app.set("views" , "./views")


//configura el puerto
app.listen( PORT, (err)=>{
    !err && console.log("Server Run in PORT:" + PORT)
})