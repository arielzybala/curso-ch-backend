const express = require("express");
const app = express();

const session = require("express-session");

app.use(
  session({
    secret: "valorSecreto",
    resave: true,
    saveUninitialized: true,
  })
);


app.get('/root', (req,res)=>{
    const {user, pass} = req.query
    req.session.user = user
    req.session.pass = pass
    if(req.session.contador){
        req.session.contador++
        res.send(`${user || "Señor usuario"} ha visitado el sitio ${req.session.contador} veces`)
    } else {
        req.session.contador = 1
        res.send(`Bienvenido! ${user || "nuevo usuario"}`)
    }
})


app.get('/olvidar', (req, res)=>{
    let user = req.session.user
    req.session.destroy( (err) => {
        if(!err){
            res.send(`Hasta luego  ${user || "querido usuario"}`)
        }
        else{
            res.send({error : 'Error al cerrar la sesión', body: err}) , req.session.contador = 0
        } 
    })
})



app.listen(8080, (err) => {
  !err ? console.log("puerto escuchado") : "error";
});
