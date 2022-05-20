const express = require("express");
const { addUser, addMessage, find, findByName } = require("../public/db/sqlite3");
const { Router } = express;
let router = new Router();

router.get("/", (_req, res) => {
  res.render("index");
});


module.exports = router;
