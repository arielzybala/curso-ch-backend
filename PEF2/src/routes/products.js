const express = require("express");
const { booleanVar } = require("../middleware/auth");
const {productsDao} = require("../dao/index")
const { Router } = express;
let router = new Router();

router.get("/", booleanVar, async (_req, res) => {
    const products = await productsDao.listAll()
    res.json(products)
});

router.get("/:id/", async (req, res) => {});

router.post("/", booleanVar, async (req, res) => {
    res.json(await productsDao.save(req.body))
});

router.put("/:id", booleanVar, async (req, res) => {});

router.delete("/:id", booleanVar, async (req, res) => {});

module.exports = router;