const express = require("express")
const cp = require("cookie-parser")

const app = express()

app.use(cp());
//setearCookie?nombre=Ariel&valor=10
app.get('/setearCookie', (req, res)=>{
    const {nombre, valor} = req.query
    res.cookie(nombre, valor);
    res.send("Cookie Seteada")
})

app.get('/verCookies', (req, res)=>{
    res.send(req.signedCookies)
})

app.post("/cookies" , express.json(), (req, res)=>{
    const {nombre, valor, duracion} = req.body
    res.cookie(nombre, valor, {maxAge: duracion * 1000})
    res.send()
})

app.get("/cookies" , (req, res)=>{
    res.cookie("","", {maxAge:1000}).send('')
})
app.delete("/cookies" , (req, res)=>{
    const {cookieToDelete} = req.query
    res.clearCookie(cookieToDelete)
})







app.listen(8080 , ()=>{
    console.log("server ok")
})