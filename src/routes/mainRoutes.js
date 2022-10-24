const express = require("express");
const { onlyAdmin } = require("./middleware/onlyAdmin");
const { checkItsLogged } = require("./middleware/jsonWebToken");
const adminController = require("../controllers/adminControllers");
const { Router } = express;
const router = new Router();

router.get("/", checkItsLogged, (_req, res) => {
  res.render("index");
});

router.get("/server", onlyAdmin, adminController.getDataServer )

module.exports = router;
