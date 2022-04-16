const express = require("express");
const stock = require("../assets/prodStock");
const { Router } = express;

let router = new Router();
let inventory = stock.map((e,i)=> {return {id: i + 1, ...e}})



router.get("/products", (req, res) => {
  res.send(inventory);
});


router.get("/products/:id", (req, res) => {
  let check = inventory.some((e) => e.id == req.params.id);
  if (check == true) {
    let unidad = inventory.find((e) => e.id == req.params.id);
    res.send(`${JSON.stringify(unidad, null, 2)}`);
  } else {
    res.sendStatus(404);
  }
});


router.post("/products/post", (req, res) => {
  let newId = inventory.length + 1;
  let { title, price, thumbnail } = req.body;
  let prodNew = {
    id: newId,
    title,
    price,
    thumbnail,
  };
  inventory.push(prodNew);
  res.send(`${JSON.stringify(inventory)}`);
});


router.delete("/products/delete/:id", (req, res)=>{
  let check = inventory.some((e) => e.id == req.params.id);
  if (check == true) {
  let arrayCleared= inventory.filter((e) =>{return e.id != req.params.id})
  res.send({message: `The product with id: ${req.params.id}, has being deleted, the new stock is: ${JSON.stringify(arrayCleared)}`});
  } else {
  res.sendStatus(404);
  }
})

module.exports = router;
