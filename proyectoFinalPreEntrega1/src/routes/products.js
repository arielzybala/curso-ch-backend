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
const { Router } = express;
let router = new Router();

//Todos los productos
router.get("/", (_req, res) => {
  readInventary()
    .then((inventary) => res.render("products/index", { data: inventary }))
    .catch((err) => res.send(err));
});

//Producto por ID
router.get("/:id", (req, res) => {
  let id = req.params.id;
  followById(id)
    .then((product) => res.render("products/productById", { data: product }))
    .catch((err) => res.send(err));
});

//RUTA PARA INGRESAR COMO ADMIN E INGRESAR UN PRODUCTO AL CARRITO
router.get(
  "/admin/:add?",
  (req, res, next) => {
    console.log(req.params.add);
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
router.get("/admin/:add", (req, res) => {
  res.render("products/formAdd");
});
//RUTA POST PARA CAPTURAR TODO POR BODY Y REDIRECCIONA A LA PÁGINA PRINCIPAL
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
    .then(res.redirect("/api/products/"))
    .catch((err) => res.send(err));
});

router.get(
  "/:id/:admin",
  (req, res, next) => {
    const { id, admin } = req.params;
    if (admin == "put")
      followById(id)
        .then((result) => result && next("route"))
        .catch((err) => next(res.send(err)));
    else next();
  },
  (_req, res) => {
    readInventary()
      .then((inventary) => res.render("products/index", { data: inventary }))
      .catch((err) => res.send(err));
  }
);
router.get("/:id/put", (req, res) => {
  const { id } = req.params;
  const url = `/${id}/put?_method=PUT`;
  followById(id)
    .then((result) =>
      res.render("products/formPut", { product: result, url: url })
    )
    .catch((err) => res.send(err));
});

router.put("/:id/put", (req, res) => {
  const { id } = req.params;
  let {
    nameProd,
    descriptionProd,
    codeProd,
    stockProd,
    priceProd,
    imgProd,
    timesStampProd,
  } = req.body;
  let updateChanges = {
    id: id,
    nombre: nameProd,
    timesStamp: timesStampProd,
    descripcion: descriptionProd,
    codigo: codeProd,
    stock: stockProd,
    precio: priceProd,
    foto: imgProd,
  };
  updateById(updateChanges)
    .then(res.redirect("/api/products/"))
    .catch((err) => res.send(err));
});

//Formulario Ingreso de Productos
//router.post("/", (req, res) => {
//  let { nameProd, descriptionProd, codeProd, stockProd, priceProd, imgProd } =
//    req.body;
//  let prodNew = {
//    id: uuid(),
//    nombre: nameProd,
//    timesStamp: timesStamp(),
//    descripcion: descriptionProd,
//    codigo: codeProd,
//    stock: stockProd,
//    precio: priceProd,
//    foto: imgProd,
//  };
//  addNewProduct(prodNew)
//    .then((data) => res.render("products/formAdd", { data: data }))
//    .catch((err) => res.send(err));
//});

//Eliminar Productos por ID
//router.delete("/:id", (req, res) => {
//  let id = req.params.id;
//  deleteById(id)
//    .then((inventary) => res.render("index", { data: inventary }))
//    .catch((err) => res.send(err));
//});

//router.get(
//  "/:id",
//  (req, _res, next) => {
//    if (req.params.id == "add") next("route");
//    else next();
//  },
//   (req, res) => {
//    let id = req.params.id;
//    followById(id)
//      .then((product) => res.render("products/productById", { data: product }))
//      .catch((err) => res.send(err));
//}
//);

module.exports = router;
