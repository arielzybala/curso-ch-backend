const express = require("express");
const { createMocks } = require("../mocks/dataMock");
const { Router } = express;
const router = new Router();

router.get("/", (_req, res) => {
  let data = [];
  createMocks(5, data);
  res.render("index", { mocks: data });
});


module.exports = router;
