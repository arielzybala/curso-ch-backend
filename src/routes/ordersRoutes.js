const express = require("express");
const controller = require("../controllers/ordersControllers");
const checkOrder = require("./middleware/checkOrder");
const { redirectAdmin, onlyAdmin } = require("./middleware/onlyAdmin");
const { validatorUploadOrder, valuesToCheckOrders } = require("./middleware/validatorExpress");
const { Router } = express;
let router = new Router();

router.post("/", redirectAdmin, checkOrder, controller.createOneOrder);

router.use(onlyAdmin)

router.delete("/:id", controller.deleteOneOrder);

router.get("/", controller.getAllOrders);

router.get("/:id/", controller.getOrderById);

router.get("/update/:id/", controller.getUpdateOrder);

router.put("/:id", valuesToCheckOrders, validatorUploadOrder, controller.updateOneOrder);

module.exports = router;
