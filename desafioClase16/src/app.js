const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const router = require("./router/mainRouter");
const { saveAdminProduct, showAllProducts } = require("./public/db/mariadb");
const { addMessage, findAllMessage } = require("./public/db/sqlite3");

//configuración de Servido y Puerto
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
//Configuración y formateo de los datos en JSON para salida de datos desde la base de datos
app.use(express.json());
//Configuración y formateo de los datos en JSON para el ingreso de datos desde la página web
app.use(express.urlencoded({ extended: true }));
//Configuración de ubicación de carpeta Pública
app.use(express.static(path.join(__dirname, "public")));
//Configuración del motor de plantillas ejs
app.set("view engine", "ejs");
//Configuración de la carpeta donde encontrar las Plantillas
app.set("views", path.join(__dirname + "/views"));
//Configuración de ruta principal
app.use("/", router);

//Configuración de Socket
io.on("connection", (socket) => {
  ///////////////////// EMITE EL BACK //////////////////////////////////
  //--------------------CARGA INICIAL DE PRODUCTOS------------------------
  showAllProducts()
    .then((data) => {
      socket.emit("server:renderProducts", data);
    })
    .catch((err) => {
      throw (err, console.log(err));
    });
  //--------------------CARGA INICIAL DE MENSAJES------------------------
  findAllMessage()
    .then((data) => {
      socket.emit("server:renderMessages", data);
    })
    .catch((err) => {
      throw (err, console.log(err));
    });
  /////////////////////// CAPUTRA DEL FRONT ////////////////////////////////
  socket.on("user:saveProduct", (data) => {
    //GUARDA LOS PRODUCTOS
    saveAdminProduct(data);
    //EMITE LOS PRODUCTOS AL FRONT
    showAllProducts()
      .then((data) => {
        io.sockets.emit("server:renderProducts", data);
      })
      .catch((err) => {
        throw (err, console.log(err));
      });
  });

  socket.on("user:saveMessage", (data) => {
    addMessage(data.nameChat, data.emailChat, data.messageChat);
    findAllMessage()
      .then((data) => {
        io.sockets.emit("server:renderMessages", data);
      })
      .catch((err) => {
        throw (err, console.log("Mensajes No encontrados"));
      });
  });
});

server.listen(PORT, (err) => {
  !err
    ? console.log(
        `Se ha configurado el Servidor con exito y escuchando en el puerto ${PORT}.`
      )
    : console.log(`El Servidor falló.`);
});


