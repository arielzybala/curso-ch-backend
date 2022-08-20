const express = require("express");
const inventory = require("../assets/idAssigned");
const { Router } = express;

let router = new Router();

router.get("/", (req, res) => {
  res.send(JSON.stringify(inventory, null, 3));
});

router.get("/:id", (req, res) => {
  let check = inventory.some((e) => e.id == req.params.id);
  if (check == true) {
    let unidad = inventory.find((e) => e.id == req.params.id);
    res.json(unidad);
  } else {
    res.send(`El producto con ID:${req.params.id} no fue encontrado`);
  }
});

router.delete("/:id", (req, res) => {
  let check = inventory.some((e) => e.id == req.params.id);
  if (check == true) {
    let arrayCleared = inventory.filter((e) => {
      return e.id != req.params.id;
    });
    res.json(arrayCleared);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  let newId = inventory.length + 1;
  let { title, price, thumbnail } = req.body;
  let prodNew = {
    id: newId,
    title:title,
    price:price,
    thumbnail:thumbnail
  };
  inventory.push(prodNew);
  res.send({message: `El producto fue agregado, el inventario ahora es:`, result: inventory});
});

router.put("/:id", (req, res) => {
  let productUpdate = inventory.find((e) => e.id == req.params.id);
  if (productUpdate != undefined) {
    let { title, price, thumbnail } = req.body;
    productUpdate.title = title;
    productUpdate.price = price;
    productUpdate.thumbnail = thumbnail;
    res.json(productUpdate);
  } else {
    res.send(
      `El producto con ID:${req.params.id} no fue encontrado.`
    );
  }
});

module.exports = router;
