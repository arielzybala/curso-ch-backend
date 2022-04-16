const express = require('express');
const app = express();

//get

app.get("/", (req, res)=>{
    res.sendStatus(201).send("Hola Mundo");
});

app.get("/hola/:id", (req, res)=>{
    //params
    let id = req.params.id;
    // hola/:123
    console.log(id);

    res.send({mesaje: `Endpoint con Id ${id}`});
});


app.get("/ciao/query", (req, res)=>{
    //query
    let query = req.query;
    // /ciao/query?name=ariel&age=35

    res.send({mesaje: `Endpoint con Query ${id}`});
});


app.listen(8080 , () =>{
    console.log("server port 8080")
});