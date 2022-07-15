const path = require("path");
const express = require("express");
const app = express();
const session = require('express-session');
const cp = require('cookie-parser');


//Configuración y formateo de los datos en JSON para salida de datos desde la base de datos
app.use(express.json());

app.use (cp());

app.use(session({
    secret: 'richard',

}))




//Configuración y formateo de los datos en JSON para el ingreso de datos desde la página web
app.use(express.urlencoded({ extended: true }));
//Configuración de ubicación de carpeta Pública
app.use(express.static(path.join(__dirname, "public")));

let user = [];




//configuración del Puerto
const PORT = process.env.PORT || 8080;
app.listen(PORT, (err) => {
  !err
    ? console.log(`Server run, listen on Port ${PORT}`)
    : console.log(`Server not run ${err}`);
});
