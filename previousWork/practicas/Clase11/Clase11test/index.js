const express = require('express');
const app = express();


//static files config
app.use(express.static( __dirname + "/public"))

//server config
const http = require('http'); //con esto se usa el modulo nativo de http 
const server = http.createServer(app); // con esto se crea un server http con herencia de todos los metodos de Express por----> app

//socket.io config
const { Server} = require("socket.io"); //se desestructura los metodos y se usa el método Server
const io = new Server(server);// con esto se agarra al server creado en http (en la const server), lo pasa por el metodo Server y lo aloja en la constante-----> io

//connection config
io.on('connection', (socket) => { //con esto abrimos el canal y le decimos que pasa a escuchar eventos
  socket.emit('messageBack', "Backend"); //el primer parametro es algo como el código donde esta el canal que hay que escuchar // el segundo parametro es el mensaje que emite el back para el front

  socket.on("messageFront", (data)=>{
      console.log(data)
  })

});




//ruta inicial
app.get('/', (_req, res) => {
  res.sendFile(__dirname + '/index.html');
});


server.listen(8080, () => {
  console.log('listening on *:8080');
});