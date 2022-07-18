const express = require("express");
const { createMocks } = require("../mocks/dataMock");
const { Router } = express;
const router = new Router();

router.get("/products-test", (_req, res) => {
  let data = [];
  createMocks(5, data);
  res.render("test", { mocks: data });
});

router.get("/", (_req, res) => {
  res.render("index");
});

module.exports = router;
