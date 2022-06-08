const express = require("express");
const {cartDao} = require("../dao/index")
const { Router } = express;

let router = new Router();

router.post("/", async (req, res) => {
    res.json(await cartDao.save(req.body))
});

router.delete("/:id/", async (req, res) => {});

router.delete("/:id/products/:id_prod/", async (req, res) => {});

router.get("/:id/product/", async (req, res) => {});

router.get("/:id/products/", async (req, res) => {});

router.post("/:id/products/", async (req, res) => {});

module.exports = router;
