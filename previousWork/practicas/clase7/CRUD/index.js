const express = require("express");
const app = express();
const data = require("./arr");
const productsRoutes = require('../routes/products')


//prePath
app.use("/products", productsRoutes)





app.get("/:id", (req, res) => {
  let ident = req.params.id;
  let check = data.some((e) => e.id == ident);
  if (check == true) {
    let unidad = data.find((e) => e.id == ident);
    res.send(`${JSON.stringify(unidad, null, 2)}`);
  } else {
    res.send({ message: "Producto no encontrado" });
  }
});

app.use(express.json());

app.post("/api/productos", (req, res) => {
  let ident = data.length + 1;
  let check = data.some((e) => e.id == ident);
  if (check == true) {
    let {nombre, marca, precio} = data
    let newIdent = data
      .map((e) => e.id)
      .reduce((preValue, currentValue) => preValue + currentValue, 0);
    let newProduct = {
      id: newIdent,
      nombre,
      marca,
      precio
    };
    data.push(newProduct);
    res.send({ data: data });
  } else {
    let {nombre, marca, precio} = data
    let newProduct = {
      id: ident,
      nombre,
      marca,
      precio
    };
    data.push(newProduct);
  }
  res.send({ data: data });
});

/*
{
"nombre": "Edge 20 Pro 256 GB Blanco",
"marca": "Motorola",
"precio": 119999
}
*/

app.listen(8081, () => {
  console.log("server port 8081");
});
