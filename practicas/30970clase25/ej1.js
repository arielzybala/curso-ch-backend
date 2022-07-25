const express = require("express");
const app = express();
const session = require("express-session");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "valorSecreto",
    resave: true,
    saveUninitialized: true,
  })
);

let arrayUsuarios = [];
const check = (req, res, next) => {
    let metodoHttp = req.method;
    let ruta = req.path;
    const {user, pass, email} = req.body
    req.session.user = user
    req.session.pass = pass
    req.session.email = email
    if(!user || !pass || !email ) {
        res.status(401).json({error: 401, descripción: ruta, metodo: metodoHttp, perfil: "incompleto"})

    } else{
        if (arrayUsuarios.find((e)=> e.user == req.session.user)){
            res.status(409).json({error: 401, descripción: ruta, metodo: metodoHttp, perfil: "repetido"})
        } else
        next()
    }
}

app.get('/home', check, (req,res)=>{
        arrayUsuarios.push({
            user: req.session.user , 
            pass: req.session.pass, 
            email: req.session.email})   
            res.send(`${req.session.user} logueado`)
    })

const auth = (req, res, next) => {
    let metodoHttp = req.method;
    let ruta = req.path;
    if(arrayUsuarios.find((e)=> e.user == req.session.user) && arrayUsuarios.find((e)=> e.pass == req.session.pass)){
        next()
    } else {
        res.status(401).json({error: 401, descripción: ruta, metodo: metodoHttp, autorizado: false})
    }
}

app.get("/login", auth, (req, res)=>{
    res.send(`Se encuentra logueado con el perfil`)
})


app.listen(8080, (err) => {
  !err ? console.log("puerto escuchado") : "error";
});
