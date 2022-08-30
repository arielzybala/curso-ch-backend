const express = require("express");
const { Router } = express;
const cartRouter = new Router();
const controllers = require("../controllers/cartControllers");


/**
 * Para calcular el total a pagar
 * const orderAmount = require("../utils/orderAmount");
 * const totalAmount = await orderAmount(data)
 */
cartRouter.get("/", controllers.getAll);

cartRouter.delete("/:id/", controllers.deleteCart);

cartRouter.post("/:id/add", controllers.putOnCart);

cartRouter.post("/:id/sendOrder", controllers.createOrder);

module.exports = cartRouter;
