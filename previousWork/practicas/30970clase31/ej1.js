const express = require('express')
const compression = require('compression')
const app = express()


let saludo = '';

for (let index = 0; index < 1000; index++) {
  saludo += "Hola, que tal?"
}

app.get('/saludo', (req, res)=>{
  res.send(saludo)
})

app.get('/saludozyp', compression(), (req, res)=>{
  res.send(saludo)
})

app.listen(8080, err=>{
  !err
  ? console.log("server ok")
  : console.err(err, "server not run");
})