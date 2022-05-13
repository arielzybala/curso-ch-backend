const fs = require("fs");

module.exports.readInventary = () => {
  return fs.promises
    .readFile("./public/temp/inventary.txt", "utf-8")
    .then((data) => {
      let inventary = [];
      let obj = JSON.parse(data).map((e) => inventary.push(e));
      return inventary;
    })
    .catch((err) => {
      throw (
        (err, "No se encuentra el inventario para presentar los productos.")
      );
    });
};

module.exports.followById = (id) => {
  return fs.promises
    .readFile("./public/temp/inventary.txt", "utf-8")
    .then((data) => {
      let result = JSON.parse(data).find((e) => e.id == id);
      if (result != undefined) return result;
      else console.log(`No hay producto con ID: ${id} asignado.`);
    })
    .catch((err) => {
      throw (err, console.log("La consulta no obtuvo resultados."));
    });
};

module.exports.addNewProduct = (newProduct) => {
  return fs.promises
    .readFile("./public/temp/inventary.txt", "utf-8")
    .then((data) => {
      if (newProduct != undefined) {
        let inventary = [];
        let obj = JSON.parse(data).map((e) => inventary.push(e));
        inventary.push(newProduct);
        fs.promises.writeFile(
          "./public/temp/inventary.txt",
          JSON.stringify(inventary, null, 2),
          "utf-8"
        );
        return inventary;
      } else {
        console.log("El producto que intentas ingresar tiene errores");
      }
    })
    .catch((err) => {
      throw (err, console.log("Falla en el ingreso a la información"));
    });
};

module.exports.deleteById = (ident) => {
  return fs.promises
    .readFile("./public/temp/inventary.txt", "utf-8")
    .then((data) => {
      let idFollow = JSON.parse(data).find((e) => e.id == ident);
      if (idFollow !== undefined) {
        let inventary = [];
        let obj = JSON.parse(data).filter((e) => e.id != ident);
        inventary = obj;
        fs.promises.writeFile(
          "./public/temp/inventary.txt",
          JSON.stringify(inventary, null, 2),
          "utf-8",
          (err) => {
            if (!err) {
              return inventary;
            } else {
              console.log(
                err,
                `No se pudo encontra el ID: ${ident}, en la Base de datos.`
              );
            }
          }
        );
      } else {
        console.log(`El ID: ${ident} no se encuentra en la base de datos.`);
      }
    })
    .catch((err) => {
      throw (
        (err,
        "Hay problemas para encontrar la base de datos y eliminar el producto indicado.")
      );
    });
};

module.exports.updateById = (productChanged) => {
  return fs.promises
    .readFile("./public/temp/inventary.txt", "utf-8")
    .then((data) => {
      let inventary = [];
      let obj = JSON.parse(data).filter(({ id }) => id != productChanged.id);
      inventary = obj;
      inventary.push(productChanged);
      fs.promises.writeFile(
        "./public/temp/inventary.txt",
        JSON.stringify(inventary, null, 2),
        "utf-8",
        (err) => {
          if (!err) return inventary;
          else console.log(err, "Falla en la modificación.");
        }
      );
    })
    .catch((err) => {
      throw (err, "Falla al buscar la base de datos");
    });
};
