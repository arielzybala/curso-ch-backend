const express = require('express');

const { engine } = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 8080;

app.set("view engine", "hbs")
app.set("views", "./views")
app.engine("hbs", engine({
    extname:".hbs",
    defaultLayout:"main.bhs",
    partialsDir: __dirname+'/views/partials',
}));

app.get("/", (req, res) =>{
    res.render("index", {title: "HOLA"})
});



app.listen(PORT, () => {
    console.log(`Server run on ${PORT}`);
});