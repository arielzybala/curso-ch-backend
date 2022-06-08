const express = require("express");
const { booleanVar } = require("../middleware/auth");
const { Router } = express;
let router = new Router();

router.get("/", booleanVar, async (_req, res) => {});

router.get("/:id/", async (req, res) => {});

router.post("/", booleanVar, async (req, res) => {});

router.put("/:id", async (req, res) => {});

router.delete("/:id", booleanVar, async (req, res) => {});

module.exports = router;
