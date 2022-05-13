const express = require("express");
const {
    createCart,
    eraseCart
} = require("../js/handlerFSCartProducts");
const timesStamp = require("../js/tools/timesStamp");
const uuid = require("../js/tools/uuid");
const { Router } = express;
let router = new Router();

//Crea un archivo carrito para que el user pueda incorporar allí los productos
router.post("/", (req, res) => {
    let id = uuid()
    createCart(id)
    .then(res.render("cart/index" , {id}))
    .catch((err) => res.send(err))
    
});

//Borrar un archivo pasible de actuar como una base de datos de carrito de compras.
router.delete("/:id" , (req, res)=>{
    let id = req.params.id;
    eraseCart(id)
    .then(res.render("cart/deleteCart" , {id}))
    .catch((err) => res.send(err))
})





module.exports = router;