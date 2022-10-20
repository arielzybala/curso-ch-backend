const express = require("express");
const controller = require("../controllers/ordersControllers");
const { validatorUploadOrder, valuesToCheckOrders } = require("./middleware/validatorExpress");
const { Router } = express;
let router = new Router();

router.delete("/:id", controller.deleteOneOrder);

router.get("/", controller.getAllOrders);

router.get("/:id/", controller.getOrderById);

router.post("/", controller.createOneOrder);

router.get("/update/:id/", controller.getUpdateOrder);

router.put("/:id", valuesToCheckOrders, validatorUploadOrder, controller.updateOneOrder);

module.exports = router;
