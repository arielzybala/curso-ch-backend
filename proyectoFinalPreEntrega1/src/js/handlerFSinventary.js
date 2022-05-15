const fs = require("fs");

module.exports.readInventary = () => {
  return fs.promises
    .readFile("./public/temp/inventary.txt", "utf-8")//lectura del inventario
    .then((data) => {
      let inventary = [];
      let obj = JSON.parse(data).map((e) => inventary.push(e));//forma cuerpo del inventario para ser leido en ejs
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
    .readFile("./public/temp/inventary.txt", "utf-8") //Lectura del inventario
    .then((data) => {
      let result = JSON.parse(data).find((e) => e.id == id);//busqueda del producto por id
      if (result != undefined) return result;
      else console.log(`No hay producto con ID: ${id} asignado.`);
    })
    .catch((err) => {
      throw (err, console.log("La consulta no obtuvo resultados."));
    });
};

module.exports.addNewProduct = (newProduct) => {
  return fs.promises
    .readFile("./public/temp/inventary.txt", "utf-8")//lectura del inventario
    .then((data) => {
      if (newProduct != undefined) {
        let inventary = [];
        let obj = JSON.parse(data).map((e) => inventary.push(e));//forma el inventario
        inventary.push(newProduct);//agrega nuevo producto al cuerpo del inventario
        fs.promises.writeFile(//redacta la nueva estructura del cuerpo del inventario
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
    .readFile("./public/temp/inventary.txt", "utf-8")//lectura del inventario
    .then((data) => {
      let idFollow = JSON.parse(data).find((e) => e.id == ident);//busca la existencia del produto
      if (idFollow !== undefined) {
        let inventary = [];
        let obj = JSON.parse(data).filter((e) => e.id != ident);//filtra todo producto por el id que intenta dejar fuera de la estructura
        inventary = obj;
        fs.promises.writeFile(//escribe la nueva estructura del array
          "./public/temp/inventary.txt",
          JSON.stringify(inventary, null, 2),
          "utf-8"
        );
        return inventary;
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
    .readFile("./public/temp/inventary.txt", "utf-8")//Lectura del inventario
    .then((data) => {
      let inventary = [];
      let obj = JSON.parse(data).filter(({ id }) => id != productChanged.id);//filtra el producto a cambiar
      inventary = obj; //el cuerpo del inventario queda sin el producto a actualizar
      inventary.push(productChanged);//se pushea el producto con los datos actualizados
      fs.promises.writeFile(//se realiza la escritura del archivo con el inventario actualizado
        "./public/temp/inventary.txt",
        JSON.stringify(inventary, null, 2),
        "utf-8"
      );
      return inventary;
    })
    .catch((err) => {
      throw (err, "Falla al buscar la base de datos");
    });
};
