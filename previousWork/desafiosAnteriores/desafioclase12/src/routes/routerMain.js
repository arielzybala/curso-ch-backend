const express = require("express");
const { Router } = express;
let router = new Router();

router.get("/", (_req, res) => {
  res.render("index");
});

module.exports = router;
