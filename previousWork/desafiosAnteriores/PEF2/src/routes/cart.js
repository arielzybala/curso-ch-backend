const express = require("express");
const {cartDao} = require("../dao/index")
const {productsDao} = require("../dao/index")
const { Router } = express;

let router = new Router();
//Ruta para buscar todos los productos puestos en la carrito de compras del usuario, es: http://localhost:8080/api/cart/  
router.get("/", async (_req, res) => {
    res.json((await cartDao.listAll()).map(c => c.id))
});
//Ruta para crear un carrito de compras con un ID para el usuario, es: http://localhost:8080/api/cart/  
router.post("/", async (req, res) => {
    res.json(await cartDao.save(req.body))
});
//Ruta para borrar un carrito de compras por su id para el usuario, es: http://localhost:8080/api/cart/:id/  
router.delete("/:id/", async (req, res) => {
    res.json(await cartDao.deleteById(req.params.id))
});
//Ruta para ver que productos tiene en el carrito de compras de un ID determinado, es: http://localhost:8080/api/cart/  
router.get("/:id/products/", async (req, res) => {
    const cart = await cartDao.listById(req.params.id)
    res.json(cart.products)
});
//Ruta para agregar a un carrito que tiene su id por la dirección del endpoint un producto que viene por el body, es: http://localhost:8080/api/cart/  
router.post("/:id/products/", async (req, res) => {
    const cart = await cartDao.listById(req.params.id)
    const product = await productsDao.listById(req.body.id)
    cart.products.push(product)
    await cartDao.update(cart)
    res.end()
});
//Ruta de endpoint que tiene primero el id de un carrito y luego el id del producto que quiere borrar del carrito , es: http://localhost:8080/api/cart/  
router.delete("/:id/products/:id_prod/", async (req, res) => {
    const cart = await cartDao.listById(req.params.id)
    const index = cart.products.findIndex(p => p.id == req.params.id_prod)
    if (index != -1) {
        cart.products.splice(index, 1)
        await cartDao.update(cart)
    }
    res.end()
});



module.exports = router;
