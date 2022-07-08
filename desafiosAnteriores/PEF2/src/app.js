const path = require("path");
const express = require("express");
const app = express();
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");


//Configuración y formateo de los datos en JSON para salida de datos desde la base de datos
app.use(express.json());
//Configuración y formateo de los datos en JSON para el ingreso de datos desde la página web
app.use(express.urlencoded({ extended: true }));
//Configuración de ubicación de carpeta Pública
app.use(express.static(path.join(__dirname, "public")));

//configura las rutas de acceso
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);




//configuración del Puerto
const PORT = process.env.PORT || 8080;
app.listen(PORT, (err) => {
  !err
    ? console.log(`Server run, listen on Port ${PORT}`)
    : console.log(`Server not run ${err}`);
});
