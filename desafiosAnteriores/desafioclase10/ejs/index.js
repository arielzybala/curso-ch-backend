const express = require("express");
const app = express();
const productRoutes = require("./routes/products");
const PORT = process.env.PORT || 8080;

//configura y formatea los datos en JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//configura rutas
app.use(express.static(__dirname + '/public'));
app.use("/api/products", productRoutes);
//configura el motor de plantillas ejs
app.set("view engine", "ejs");
//Configura sitio donde encontrar las Plantillas
app.set("views", "./views");
//configura el puerto
app.listen(PORT, (err) => {
  !err && console.log("Server run on port: " + PORT);
});
