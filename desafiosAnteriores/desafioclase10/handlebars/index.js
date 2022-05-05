const {engine} = require("express-handlebars");
const express = require("express");
const app = express();
const productRoutes = require("./routes/products");
const PORT = process.env.PORT || 8080;

//configura y formatea los datos en JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(__dirname + "/public"));
app.use('/api/products', productRoutes );

//configura motor de plantillas
app.set("views" , "./views");
app.set("view engine" ,  "hbs");
app.engine("hbs", engine({
    etxname: "hbs",
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: 'main.hbs',
    partialsDir: __dirname + "/views/partials"
}));

//configura puerto
app.listen(PORT, (err) => {
  !err && console.log("Server run on port: " + PORT);
});
