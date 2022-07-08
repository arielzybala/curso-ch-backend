const express = require("express");
const { Router } = express;
const router = new Router();


router.get("/", (_req, res) => {
  res.render("index");
});


module.exports = router;
