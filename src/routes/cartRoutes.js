const express = require("express");
const { Router } = express;
const cartRouter = new Router();
const controllers = require("../controllers/cartControllers");

cartRouter.get("/", controllers.getAll);

cartRouter.delete("/:id/", controllers.deleteCart);

cartRouter.post("/:id/add", controllers.putInCart);

cartRouter.post("/:id/sendOrder", controllers.createOrder);

module.exports = cartRouter;
