const NODE_ENV = process.env.NODE_ENV || "development";
require("dotenv").config({ path: `.env.${NODE_ENV}` });//Esto es por si hay que usar un .env.production, en algún momento
const path = require("path");
const express = require("express");
const app = express();
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "../public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));

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
