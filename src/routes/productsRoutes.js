const express = require("express");
const { Router } = express;
const controller = require("../controllers/productsControllers")
const {haveCartAlredy} = require("./middleware/checkCart");

const productRouter = new Router();

productRouter.get("/", haveCartAlredy, controller.getAllProducts)

productRouter.get("/:id/", controller.getProductDetail)

productRouter.post("/", controller.addOneProduct)

module.exports = productRouter;