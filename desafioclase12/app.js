const express = require("express");
const app = express();
const routeMain = require("./src/routes/routerMain");
const { inventory } = require("./src/js/product");
const { boxMessages } = require("./src/js/messages");

//Configuración de servidor
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//Configuración y formateo de los datos en JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Configuración de la carpeta para los archivos
app.use(express.static(__dirname + "/src"));
//Configura la ruta inicial
app.use("/", routeMain);
//Configuración del motor de plantillas ejs
app.set("view engine", "ejs");
//Configuración de la carpeta donde encontrar las Plantillas
app.set("views", "./src/views");

//Configuración de Socket
io.on("connection", (socket) => {
  //Tabla de Productos
  socket.emit("server:renderProducts", inventory);
  //Lista de mensajes
  socket.emit("server:renderMessages", boxMessages);
  //Tabla de Productos
  socket.on("user:saveProduct", (data) => {
    inventory.push(data);
    io.sockets.emit("server:renderProducts", inventory);
  });
  //Tabla de Productos
  socket.on("user:saveMessage", (data) => {
    boxMessages.push(data);
    io.sockets.emit("server:renderMessages", boxMessages);
  });
});

//Configuración de Puertos
const PORT = process.env.PORT || 8080;
server.listen(PORT, (err) => {
  !err
    ? console.log("Server Run on Port: ", PORT)
    : console.log("Server not Run");
});
