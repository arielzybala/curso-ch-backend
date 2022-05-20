const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const router = require("./router/mainRouter");

//configuración de Servido y Puerto
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
const { Server } = require("socket.io");
const { saveAdminProduct, showAllProducts } = require("./public/db/mariadb");
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
  showAllProducts()
    .then((data) => {
      socket.emit("server:renderProducts", data);
    })
    .catch((err) => {
      throw (err, console.log(err));
    });
  socket.on("user:saveProduct", (data) => {
    saveAdminProduct(data);
    showAllProducts()
      .then((data) => {
        io.sockets.emit("server:renderProducts", data);
      })
      .catch((err) => {
        throw (err, console.log(err));
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
