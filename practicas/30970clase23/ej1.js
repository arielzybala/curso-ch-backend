
const express = require("express")
const app = express()
//const cp = require("cookie-parser")

let cookiesArray = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/cookie/guardar', (req , res)=>{
    const {key, value , time} = req.body;
    if(!key || !value || !time){
        res.send({error: 'falta, nombre, valor o tiempo'})
    }else{
        let newCookie = {
            key,
            value,
            time
        };
        cookiesArray.push(newCookie);
        console.log(cookiesArray)
        res.cookie(key, value, {maxAge: time * 600000})
        res.send({proceso: "OK"})
    }

})

//   http://localhost:8081/cookie/guardar

app.get('/cookie/mostrar', (req, res)=>{
    console.log({Cookies: req.cookies})
    res.send({Cookies: req.cookies});
})

//   http://localhost:8081/cookie/mostrar

app.delete("/cookie/borrar/:cookey", (req, res)=>{
    
    console.log(req.params.cookey)
    res.clearCookie(req.params.cookey)
    res.send(`La ${req.params.cookey} fue borrada`)
})

// http://localhost:8081/cookie/borrar/:user09312323

app.listen(8081 , (err)=>
    {
        !err
        ? console.log('puerto escuchado')
        : 'error'
    })