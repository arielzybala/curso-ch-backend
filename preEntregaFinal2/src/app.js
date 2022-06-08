const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8080;
const productRoutes = require("./routes/routesProducts");
const cartRoutes = require("./routes/routesCart");
const mongo = require("./dataTranferObject/DtoMongo")
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

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);






//Configuración del Puerto
app.listen(PORT, (err) => {
  !err
    ? console.log("Server Run on Port: " + PORT)
    : console.log("Server fall");
});
