const express = require("express");
const { productsDao } = require("../dao/index");
const checkItsLogged = require("./middleware/redirectRoot");
const { onlyAdmin } = require("./middleware/onlyAdmin");
const adminController = require("../controllers/adminControllers");

const { Router } = express;
const router = new Router();

router.get("/", checkItsLogged, (_req, res) => {
  res.render("index");
});

router.get("/test", async (req, res) => {
  const data = await productsDao.listAll();
  res.render("products", { products: data });
});


router.get("/server", onlyAdmin, adminController.getDataServer )

router.get("/", (_req, res) => {
  res.json();
});

router.get("/chat", async (req, res) => {
  res.render("chatRoom");
});

module.exports = router;
