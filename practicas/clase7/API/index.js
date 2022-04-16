const express = require('express');
const app = express();
const productsRoutes = require('../routes/products')
const categoriesRoutes = require('../routes/categories')

//prePath
app.use("/products", productsRoutes)
app.use("/categoires", categoriesRoutes)



//get

app.get("/", (req, res)=>{
    res.send("Hola Mundo");
});



app.listen(8080 , () =>{
    console.log("server port 8080")
});