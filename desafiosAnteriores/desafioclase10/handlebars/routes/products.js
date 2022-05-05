const express = require("express");
const upload = require("../middlewares/multer.js");
const inventory = require("../public/inventory.json")
const { Router } = express;


let router = new Router();

router.get("/", (_req, res)=>{
    res.render("home", {data:inventory});
})
router.get("/form", (_req, res)=>{
    res.render("form");
})
router.post("/success", upload.single('preview'), (req, res)=>{
    let newId = inventory.length + 1;
    let {nombre, marca, precio} = req.body;
    let {filename} = req.file
    const newProd = {
        id: newId,
        nombre,
        marca,
        precio: parseInt(precio),
        img: `/temp/${filename}`
        }
    inventory.push(newProd)
    res.render("success", {newProd})

})


module.exports = router;
