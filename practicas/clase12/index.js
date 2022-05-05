const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const router = require('./routes/index.js')

let msn = []



//static files config
app.use(express.static( __dirname + "/public"))

//server config
const http = require('http'); 
const server = http.createServer(app);

//socket.io config
const { Server} = require("socket.io"); 
const io = new Server(server);

//connection config
io.on('connection', (socket) => { 
  socket.emit('messageBack', msn); 
  socket.on("messageFront", (data)=>{
      console.log(data)
  })

  socket.on("dataMsn", (dataObj)=>{
    msn.push(dataObj)
    //socket.emit("messageBack" , msn)
    io.sockets.emit("messageBack" , msn)
})

});
//config Router
app.use("/api", router);

//configuración del server
server.listen(PORT, () => {
  console.log('listening on *: ' + PORT);
});