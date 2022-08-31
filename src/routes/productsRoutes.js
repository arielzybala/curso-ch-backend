const express = require("express");
const { Router } = express;
const controller = require("../controllers/productsControllers");
const {userRole} = require("./middleware/role");
const {haveCartAlredy} = require("./middleware/checkCart");

const productRouter = new Router();

productRouter.get("/", userRole, haveCartAlredy, controller.getAllProducts)

productRouter.get("/:id/", userRole, controller.getProductDetail)

productRouter.post("/", controller.addOneProduct)

module.exports = productRouter;