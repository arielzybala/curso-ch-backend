const express = require("express");
const controllers = require("../controllers/cartControllers");
const { checkCartOpen } = require("./middleware/openCart");
const { Router } = express;
const router = new Router();

router.use(checkCartOpen);

router.get("/", controllers.getAll);

router.put("/:id/", controllers.putInCart);

router.delete("/:id/", controllers.deleteCart);

router.post("/:id/sendOrder", controllers.createOrder);

module.exports = router;
