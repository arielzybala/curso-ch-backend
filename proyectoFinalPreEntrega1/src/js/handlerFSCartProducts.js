const fs = require("fs");

module.exports.createCart = (id, timesStamp) => {
  return fs.promises
    .appendFile(
      `public/temp/${id}.txt`,
      `[
    {
      "idCarrito": "${id}",
      "timesStampCarrito": ${timesStamp},
      "productos": []
    }
  ]`
    )
    .then(() => {
      const success = "Tú carrito tiene el ID asignado: " + id;
      const error =
        "No se pudo crear para una orden de compra para tu carrito de compras";

      if (fs.existsSync(`public/temp/${id}.txt`)) return success;
      else return error;
    })
    .catch((err) => {
      throw err;
    });
};

module.exports.eraseCart = (id) => {
  return fs.promises
    .readFile(`./public/temp/${id}.txt`, "utf-8")
    .then(() => {
      fs.promises.unlink(`public/temp/${id}.txt`);
      if (fs.existsSync(`public/temp/${id}.txt`))
        return "La orden no pudo ser borrada";
      else return "La orden de compras ha sido borrada";
    })
    .catch((err) => {
      throw (err, "No encuentra la orden de compras");
    });
};

module.exports.showBasket = (id) => {
  return fs.promises
    .readFile(`./public/temp/${id}.txt`, "utf-8")
    .then((data) => {
      let list = [];
      let obj = JSON.parse(data).map((e) => list.push(e));
      return list;
    })
    .catch((err) => err, "No se encontro la orden de compras");
};

module.exports.onBasket = (idCarrito, idProduct) => {
  return fs.promises
    .readFile("./public/temp/inventary.txt", "utf-8")
    .then((data) => {
      let result = JSON.parse(data).find((e) => e.id == idProduct);
      if (result != undefined)
        return fs.promises
          .readFile(`./public/temp/${idCarrito}.txt`, "utf-8")
          .then((data) => {
            let list = [];
            let obj = JSON.parse(data).map((e) => list.push(e));
            list[0].productos.push(result);
            return (
              fs.promises.writeFile(
                `./public/temp/${idCarrito}.txt`,
                JSON.stringify(list, null, 2),
                "utf-8"
              ),
              list[0].productos
            );
          });
      else console.log(`No hay producto con ID: ${idCarrito} asignado.`);
    });
};


module.exports.deleteProductBasket = (idCarrito, idProduct) => {
        return fs.promises
          .readFile(`./public/temp/${idCarrito}.txt`, "utf-8")
          .then((data) => {
            let list = [];
            let allselected = JSON.parse(data).map((e) => list.push(e));
            console.log(allselected)
            let obj = list[0].productos.filter((e)=> e.id != idProduct)
            list[0].productos = obj   
            return fs.promises
              .writeFile(
                `./public/temp/${idCarrito}.txt`,
                JSON.stringify(list, null, 2),
                "utf-8"
              ).then(()=>{return list})
              .catch((err)=>{throw (err, "No pudo borrar el producto indicado" )});
            })
            .catch((err) => {
              throw (err, "No encuentra la orden de compras, para eliminar el producto");
            });
        }
