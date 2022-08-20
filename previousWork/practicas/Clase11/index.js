const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

//Data
let mensajes = [
    {nmb: "camilo" , msn: "hola"},
    {nmb: "camilo" , msn: "chau"}
]


//Server config
const http = require("http");
const server = http.createServer(app);

//Socket config
const {Server} = require("socket.io");
const io = new Server(server);

//Conection config
io.on("connection", (socket)=>{
    socket.emit("message", mensajes)
    socket.on("message_client", (data)=>{
        console.log(data)
    })
})
//Statics Files config
app.use(express.static(__dirname + 'public'))

//Routes config
app.get("/chat", (req, res)=>{
    res.sendFile(__dirname + "/public/index.html")
    //res.sendFile("/public/index.html" + {root: "."})
})


app.listen(PORT, (err)=>{
    !err && console.log("Server run in port: " + PORT)
})