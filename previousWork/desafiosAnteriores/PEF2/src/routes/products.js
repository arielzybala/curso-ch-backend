const express = require("express");
const { booleanVar } = require("../middleware/auth");
const {productsDao} = require("../dao/index")
const { Router } = express;
let router = new Router();
//Ruta para buscar todos los productos puestos como stock de la tienda es: http://localhost:8080/api/products/  
router.get("/", booleanVar, async (_req, res) => {
    const products = await productsDao.listAll()
    res.json(products)
});
//Ruta para buscar productos por su Id en el stock de la tienda es: http://localhost:8080/api/products/:id/ 
router.get("/:id/", async (req, res) => {
    res.json(await productsDao.listById(req.params.id))
});
//Ruta para agregar como administrador un product al stock de la tienda es: http://localhost:8080/api/products/ (el array por postman body raw) 
router.post("/", booleanVar, async (req, res) => {
    res.json(await productsDao.save(req.body))
});
//Ruta para buscar un producto por su Id y actualizar su estado en el stock de la tienda es: http://localhost:8080/api/products/:id/ 
router.put("/", booleanVar, async (req, res) => {
    res.json(await productsDao.update(req.body))
});
//Ruta para buscar un producto por su Id y eliminarlo del stock de la tienda es: http://localhost:8080/api/products/:id/ 
router.delete("/:id", booleanVar, async (req, res) => {
    res.json(await productsDao.deleteById(req.params.id))
});

module.exports = router;