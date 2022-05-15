const express = require("express");
const {
  readInventary,
  followById,
  addNewProduct,
  updateById,
  deleteById,
} = require("../js/handlerFSinventary");
const timesStamp = require("../js/tools/timesStamp");
const uuid = require("../js/tools/uuid");
const { booleanVar } = require("../middlewares/helper/auth");
const { Router } = express;
let router = new Router();

//RUTA PARA VER TODOS LOS PRODUCTOS O VER UNO INDIVIDUALMENTE
router.get("/", (_req, res)=>{
  readInventary()
    .then((inventary) => res.render("products/index", { data: inventary }))
    .catch((err) => res.send(err));
})

router.get("/:id/", (req, res) => {
  let id = req.params.id;
    followById(id)
      .then((product) => res.render("products/productById", { data: product }))
      .catch((err) => res.send(err));
});

//RUTA PARA INGRESAR COMO ADMIN E INGRESAR UN PRODUCTO AL CARRITO
router.post("/", booleanVar, (req, res) => {
  let { name, description, code, stock, price, img } = req.body;
  let prodNew = {
    id: uuid(),
    nombre: name,
    timesStamp: timesStamp(),
    descripcion: description,
    codigo: code,
    stock,
    precio: price,
    foto: img,
  };
  addNewProduct(prodNew)
    .then((data) => res.render("products/index", { data }))
    .catch((err) => res.send(err));
});

//RUTA PUT PARA BUSCAR UN PRODUCTO EN EL INVENTARIO, ACTUALIZARLO Y VERLO EN EL INDEX
router.put("/:id", (req, res) => {
  const { id } = req.params;
  let { name, description, code, stock, price, img, times } = req.body;
  let updateChanges = {
    id,
    nombre: name,
    timesStamp: times,
    descripcion: description,
    codigo: code,
    stock,
    precio: price,
    foto: img,
  };
  updateById(updateChanges)
    .then((data) => res.render("products/index", { data }))
    .catch((err) => res.send(err));
});

//Eliminar Productos por ID
router.delete("/:id", booleanVar, (req, res) => {
  let id = req.params.id;
  deleteById(id)
    .then((data) => res.render("products/index", { data }))
    .catch((err) => res.send(err));
});

//RUTA OCULTA PARA INGRESAR COMO ADMIN E INGRESAR UN PRODUCTO AL CARRITO INTERACTIVA EN EJS
router.get(
  "/admin/:add?",
  (req, _res, next) => {
    let add = req.params.add;
    if (add == "add") next("route");
    else next();
  },
  (_req, res) => {
    readInventary()
      .then((inventary) => res.render("products/index", { data: inventary }))
      .catch((err) => res.send(err));
  }
);

router.get("/admin/:add", (_req, res) => {
  res.render("products/formAdd");
});

router.post("/admin/:add", (req, res) => {
  let { nameProd, descriptionProd, codeProd, stockProd, priceProd, imgProd } =
    req.body;
  let prodNew = {
    id: uuid(),
    nombre: nameProd,
    timesStamp: timesStamp(),
    descripcion: descriptionProd,
    codigo: codeProd,
    stock: stockProd,
    precio: priceProd,
    foto: imgProd,
  };
  addNewProduct(prodNew)
    .then(res.redirect("/api/productos/"))
    .catch((err) => res.send(err));
});

module.exports = router;

