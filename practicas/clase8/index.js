const express = require('express');
const app = express();

app.use("/static", express.static("public"))

// si todos estan en la misma carpeta public
// app.use(express.static("__dirname + "/public"))


app.get("/", (req, res)=>{
    res.sendFile("/public/index.html")
    //res.sendFile(__dirname + "/public/imagen.jpg")
})

app.listen(8082, ()=>{
    console.log("serv 8082")
})