const express = require("express");

const { Router } = express;

let router = new Router();

router.post("/", async (_req, res) => {});

router.delete("/:id/", async (req, res) => {});

router.delete("/:id/products/:id_prod/", async (req, res) => {});

router.get("/:id/product/", async (req, res) => {});

router.get("/:id/products/", async (req, res) => {});

router.post("/:id/products/", async (req, res) => {});

module.exports = router;
