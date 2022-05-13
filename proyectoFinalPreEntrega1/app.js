const express = require("express");
const app = express();
const methodOverride = require('method-override')
const PORT = process.env.PORT || 8080;
const productRoutes = require("./src/routes/products");
const cartRoutes = require("./src/routes/cart");
const path = require('path');
//Configuración y formateo de los datos en JSON para salida de datos desde la base de datos
app.use(express.json());
//Configuración y formateo de los datos en JSON para el ingreso de datos desde la página web
app.use(express.urlencoded({ extended: true }));
//Configuración de metodos http
app.use(methodOverride('_method', {methods: ["POST" , "GET"]}))
//Configuración del motor de plantillas ejs
app.set("view engine", "ejs");
//Configuración de la carpeta donde encontrar las Plantillas
app.set("views", path.join(__dirname + "/views"));

//Configura la ruta url con un middle de dirección obligatoria en productos
app.use("/api/products", productRoutes);
//Configura la ruta url con un middle de dirección obligatoria en carrito
app.use("/api/carrito", cartRoutes);

app.listen(PORT, (err) => {
  !err
    ? console.log("Server RUN ON PORT: ", PORT)
    : console.log("Server NOT RUN");
});
