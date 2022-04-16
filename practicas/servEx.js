const express = require('express');
const path = require('path');
const moment = require('moment');
const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server http listening on port`);
}); 

app.get("/", (req, res) => {
  res.send(
    `<h1>"Bienvenido al Servidor Express"<h1/>
    <style>h1{color:blue}</style>`
    );
});

app.get("/productos", (req, res) =>{
  res.sendFile(path.join(__dirname+"/index.html"))
})

let counter = 0;

app.get('/visitas', (req, res)=>{ 
  counter++
  res.send({visitas: counter});
})

app.get('/fyh', (req, res)=>{

  res.json({fyh: `${moment().format('LLLL')}`})
})




