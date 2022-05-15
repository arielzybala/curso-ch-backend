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
//La estructura del objeto dentro del id.txt es la que pide la ppt
router.post("/", (_req, res) => {
  let id = uuid();
  let timesStampCarrito = timesStamp();
  createCart(id, timesStampCarrito)
    .then((data) => res.render("cart/index", { data, id }))
    .catch((err) => res.send(err));
});

//Borrar un archivo pasible de actuar como una base de datos de carrito de compras.
router.delete("/:id/", (req, res) => {
  let id = req.params.id;
  eraseCart(id)
    .then((data) => res.render("cart/deleteCart", { id, data }))
    .catch((err) => res.send(err));
});

//Borra un producto de la lista de archivo solicitado
router.delete("/:id/productos/:id_prod/", (req, res) => {
  let idCarrito = req.params.id;
  let idProducto = req.params.id_prod;
  deleteProductBasket(idCarrito, idProducto)
    .then((data) => {
      res.render("cart/basket", { data });
    })
    .catch((err) => res.send(err));
});


//Para poder hacer interactivo el ingreso de un producto por id:
//Se alteró la ruta deliveradamente, aquí es "/:id/producto/" cuando debería ser "/:id/productos/"
router.get("/:id/producto/", (req, res) => {
  let id = req.params.id;
  showBasket(id)
    .then((data) => {
      res.render("cart/basket", { data });
    })
    .catch((err) => res.send(err));
});


//De esta forma el test no se puede hacer por POSTMAN, pero si puede ser hecho por un browser
//La ruta es la solicitada y la mecanica de FS funciona
router.get("/:id/productos/", (req, res) => {
  let idCarrito = req.params.id;
  readInventary().then((data) => {
    res.render("cart/addSelection", { data, idCarrito });
  });
});

router.post("/:id/productos/", (req, res) => {
  let idCarrito = req.params.id;
  let idProducts = req.body;
  onBasket(idCarrito, idProducts)
    .then(console.log("Producto Incorporado"))
    .catch((err) => {
      throw err;
    });
});

module.exports = router;
