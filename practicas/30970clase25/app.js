const express = require('express');
const passport = require('./passport');
const app = express();
const session = require('express-session');

app.use(express.json())// es porque toma los datos desde el body, y lo hace como un objeto json
app.use(session({
    secret:"valor",
    resave: true,
    saveUninitialized: false,
}))

app.use(passport.initialize())
//aca inicializa el passport
app.use(passport.session())
//En este punto session esta seteada y acá se fija que pedi guardar en la serialización, y sabe que quiere devolver en la des-serialización.  

app.post('/login', passport.authenticate('autenticación'), (req, res)=>{
    res.send("bienvenido")
})
app.post('/registro', passport.authenticate('registracion'), (req, res)=>{
    console.log(req.user)
    console.log(req.isAuthenticated())
    res.send("Registrado")
})

app.listen(8080, (err)=>{
    if(!err){console.log("ANDA")}
})