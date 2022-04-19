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
    res.send(
      `Los datos del ID: ${req.params.id} consultado, son: ${JSON.stringify(
        unidad,
        null,
        3
      )}`
    );
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
    res.send({
      message: `The product with id: ${
        req.params.id
      }, has being deleted, the new stock is: ${JSON.stringify(
        arrayCleared,
        null
      )}`,
    });
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  let newId = inventory.length + 1;
  let { title, price, thumbnail } = req.body;
  let prodNew = {
    id: newId,
    title,
    price,
    thumbnail,
  };
  inventory.push(prodNew);
  res.send(
    `El producto ${JSON.stringify(
      prodNew
    )} fue agregado, el inventario ahora es ${JSON.stringify(inventory)}`
  );
});

router.put("/:id", (req, res) => {
  let productUpdate = inventory.find((e) => e.id == req.params.id);
  if (productUpdate != undefined) {
    let { title, price, thumbnail } = req.body;
    productUpdate.title = title;
    productUpdate.price = price;
    productUpdate.thumbnail = thumbnail;
    res.send(
      `El producto con ID:${
        req.params.id
      }, fue actualizado, el stock actual es: ${JSON.stringify(productUpdate)}`
    );
  } else {
    res.send(
      `El producto con ID:${req.params.id} no fue encontrado, no se pudo eliminar.`
    );
  }
});

module.exports = router;
