const express = require('express');
const app = express();
const fs = require("fs");
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server http listening on port`);
  });

class Contenedor {
    constructor(fileName) {
      this.fileName = fileName;
      this.id = 0
      
    }

    getAll() {

      fs.promises.readFile(`./${this.fileName}`, "utf-8")
        .then((data) => {
            app.get("/products", (req, res) => {
              let prodArray = [];
                let obj = JSON.parse(data).map(e => prodArray.push(e))
                console.log(prodArray)
                res.send(prodArray);
              })
        }).catch((err) => {
          throw (err, "No se pudo realizar la consulta");
        });
    }

    getById() {
        
        fs.promises.readFile(`./${this.fileName}`, "utf-8")
        .then((data) => {
          app.get("/productRandom", (req, res) => {
            let ident = getRandomID(1, 4)
            let obj = JSON.parse(data).find((e) => e.id == ident);
            res.send(`Te tocó el producto: ${JSON.stringify(obj, null, 2)}`)
          })
        }).catch((err) => {
          throw (err, "No se pudo realizar la consulta");
        });
    }


}

function getRandomID(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

let fileToUse = new Contenedor("productos.txt");
fileToUse.getAll()
fileToUse.getById()

