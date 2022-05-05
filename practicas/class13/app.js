const express = require('express');
const app = express();
const {color} = require('./color')


color.getNewColor();


app.listen(8080 , ()=>{
    console.log("Server Run")
})


