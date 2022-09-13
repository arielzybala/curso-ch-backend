const express = require("express");
const { Router } = express;
const router = new Router();
const {productsDao} = require("../dao/index");


router.get("/", (_req, res) => {
  res.render("index");
});

router.get("/test", async (req, res)=>{
  const data = await productsDao.listAll()
  res.render("products", {products: data})
});

router.get("/chat", async (req, res)=>{
  res.render("chatRoom")
})



module.exports = router;
