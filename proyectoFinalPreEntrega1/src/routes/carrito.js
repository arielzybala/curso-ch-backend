const { application } = require("express");
const express = require("express");
const {
  createCart,
  eraseCart,
  showBasket,
  onBasket,
  deleteProductBasket,
} = require("../js/handlerFSCartProducts");
const { readInventary } = require("../js/handlerFSinventary");
const timesStamp = require("../js/tools/timesStamp");
const uuid = require("../js/tools/uuid");
const { Router } = express;
let router = new Router();

//Crea un archivo carrito para que el user pueda incorporar allí los productos
router.post("/", (req, res) => {
  let id = uuid();
  let timesStampCarrito = timesStamp();
  createCart(id, timesStampCarrito)
    .then((data) => res.render("cart/index", { data, id }))
    .catch((err) => res.send(err));
});

//Borrar un archivo pasible de actuar como una base de datos de carrito de compras.
router.delete("/:id", (req, res) => {
  let id = req.params.id;
  eraseCart(id)
    .then((data) => res.render("cart/deleteCart", { id, data }))
    .catch((err) => res.send(err));
});

//router.get("/:id/productos", (req, res) => {
//  let id = req.params.id;
//  showBasket(id)
//    .then((data) => {res.render("cart/basket",  {data} )})
//    .catch((err) => res.send(err));
//});



router.delete("/:id/productos/:id_prod", (req, res) => {
  let idCarrito = req.params.id;
  let idProducto = req.params.id_prod;
  deleteProductBasket(idCarrito , idProducto)
  .then((data)=> {res.render("cart/basket", { data })})
  .catch((err) => res.send(err));
  
});



router.get("/:id/productos/", (req, res, ) => {
  let idCarrito = req.params.id
  readInventary()
  .then((data)=> {res.render("cart/addSelection", { data , idCarrito})})
});

router.post("/:id/productos/", (req, res) => {
  let idCarrito = req.params.id;
  let idProducts = req.body.idProd;
  console.log(idCarrito , idProducts)
});

module.exports = router;
