const express = require("express");
const app = express();
const cp = require("cookie-parser"); // Es para que podamos setear un middleware para setear las signed cookies
const session = require("express-session");

//con esto configuramos una session, cuando nos va a llegar una request vamos a ver si inicia con el valorSecreto o sin iniciar
app.use(
  session({
    secret: "valorSecreto",
    resave: true,
    saveUninitialized: true,
  })
);

//con esto le mandamos al cliente la cookie con la sessionId
app.get("/openSession", (req, res) => {
  req.session.admin = true;
  (req.session.userId = "valorSecreto"), res.send("Sessión ingresada");
});

app.get("/obtenerSession", (req, res) => {
  // CON req.session PODEMOS TRAER LO QUE SE SETEO CON LA SESSION
  console.log(req.session);
  const { userId, admin } = req.session;
  res.send({ userId, admin });
});

app.get("/public", (_req, res) => {
  res.send("esto puede verse por todos");
});

app.get(
  "/private",
  (req, res, next) => {
    //así preguntamos si session admin esta en true, y si esta en false no corre a next
    if (!req.session?.admin != true) {
      return res.send("No esta habilitado para ver esto");
    }
    next();
  },
  (req, res) => {
    console.log(!req.session?.admin)
    res.send("Esto puede verse solo por algunos");
  }
);

/** DE LA PPT
 * 
 app.get("/setearSession", (req, res) => {
     req.session.admin = true;
  (req.session.userId = "valorSecreto"), res.send("Sessión ingresada");
});

app.get("/obtenerSession", (req, res) => {
  console.log(req.session);
  const { userId, admin } = req.session;
  res.send({ userId, admin });
});



app.get('/iniciaSession', (req, res)=>{
    const {user, pass} = req.query
    if(user !== 'u1' || pass !== '1234' ){
        return res.send('Fallo el inicio de Sesión')
    } else{
        req.session.user = user
        req.session.admin = true
        res.send('Inicio de sesión satisfactorio')
    }
})

function auth(req, res, next){
    if (req,session?.user === 'u1' && req.session?.admin){
        return next()
    }
    return res.status(401).send('error de autorización!')
}
*/






app.listen(8080, (err) => {
  !err ? console.log("puerto escuchado") : "error";
});
