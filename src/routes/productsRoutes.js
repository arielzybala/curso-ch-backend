const express = require("express");
const { Router } = express;
const controller = require("../controllers/productsControllers");
const {userRole} = require("./middleware/role");

const productRouter = new Router();

productRouter.get("/", userRole, controller.getAllProducts)

productRouter.get("/:id/", userRole, controller.getProductDetail)

productRouter.post("/", controller.addOneProduct)

module.exports = productRouter;