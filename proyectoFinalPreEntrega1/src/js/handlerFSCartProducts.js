const fs = require("fs");

module.exports.createCart = (id, timesStamp) => {
  return fs.promises //crea el archivo con con el nombre que trae de id y crea el contenido principal del archivo según pide la ppt
    .appendFile(
      `public/temp/${id}.txt`,
      `[
    {
      "idCarrito": "${id}",
      "timesStampCarrito": ${timesStamp},
      "productos": []
    }
  ]`
    ) //Maneja resultados
    .then(() => {
      const success = "Tú carrito tiene el ID asignado: " + id;
      const error = "No se pudo crear para una orden de compra para ti";
      if (fs.existsSync(`public/temp/${id}.txt`)) return success; //constata que el archivo exista
      else return error;
    })
    .catch((err) => {
      throw err;
    });
};

module.exports.eraseCart = (id) => {
  return fs.promises
    .readFile(`./public/temp/${id}.txt`, "utf-8")// Entra en la carpeta y realiza la lectura del archivo.
    .then(() => { //Maneja resultados
      fs.promises.unlink(`public/temp/${id}.txt`); //elimina el archivo
      if (fs.existsSync(`public/temp/${id}.txt`)) //constata que el archivo exista
        return "La orden no pudo ser borrada"; //Si existe es un mal resultado de la orden
      else return "La orden de compras ha sido borrada";
    })
    .catch((err) => {
      throw (err, "No encuentra la orden de compras");
    });
};

module.exports.showBasket = (id) => {
  return fs.promises
    .readFile(`./public/temp/${id}.txt`, "utf-8") //REALIZA LECTURA
    .then((data) => { //MANEJA RESULTADOS
      let list = [];
      let obj = JSON.parse(data).map((e) => list.push(e));//PUSHEA EN UN ARRAY LOS RESULTADOS Y LOS RETORNA
      return list;
    })
    .catch((err) => err, "No se encontro la orden de compras");
};
//ESTE FUE EL MÁS COMPLEJO
module.exports.onBasket = (idCarrito, idProduct) => {
  return fs.promises
    .readFile("./public/temp/inventary.txt", "utf-8")//1°LECTURA DE INVENTARIO
    .then((data) => {//MANEJA RESULTADOS DE LECTURA DE INVENTARIO
      let result = JSON.parse(data).find((e) => e.id == idProduct.id); //PONE EN UNA VARIABLE EL PRODUCTO BUSCADO
      if (result != undefined) //MANEJA CASO DE ERROR
        return fs.promises
          .readFile(`./public/temp/${idCarrito}.txt`, "utf-8")//2°LECTURA DE CUERPO DE CANASTA
          .then((data) => {//MANEJA LA LECTURA DE LA CANASTA
            let list = [];
            let obj = JSON.parse(data).map((e) => list.push(e));
            list[0].productos.push(result);//PONE EN EL CUERPO DE LA CANASTA, EN LA PROPIEDAD PRODUCTOS (DE LA CANASTA-2°-), EL ATRIBUTO PRODUCTO (DEL INVENTARIO-1°-) 
            return (
              fs.promises.writeFile(//REALIZA LA ESCRITURA DEL NUEVO CUERPO DE LA CANASTA
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
    .readFile(`./public/temp/${idCarrito}.txt`, "utf-8")//REALIZA LECTURA DEL CUERPO DEL CARRITO
    .then((data) => {//MANEJA RESULTADOS
      let list = [];
      let allselected = JSON.parse(data).map((e) => list.push(e));//CON ESTA VARIABLE SE PUSHEA DENTRO DE LIST EL CUERPO DEL CARRITO -SE PODRÍA ABREVIAR EL PASO, PERO ASÍ FUNCIONA BIEN
      let obj = list[0].productos.filter((e) => e.id != idProduct);//CON ESTA VARIABLE SE APLICA UN FILTRO Y SE DEJA POR FUERA TODO PRODUCTO QUE NO TENGA EL ID DEL PRODUCTO QUE SE QUIERE BORRAR
      list[0].productos = obj;//SE CONSOLIDA EL NUEVO CUERPO DE LA CANASTA CON UN NUEVO ATRIBUTO PRODUCTOS
      return fs.promises
        .writeFile(//REDACTA EL NUEVO CUERPO
          `./public/temp/${idCarrito}.txt`,
          JSON.stringify(list, null, 2),
          "utf-8"
        )
        .then(() => {
          return list;
        })
        .catch((err) => {
          throw (err, "No pudo borrar el producto indicado");
        });
    })
    .catch((err) => {
      throw (
        (err, "No encuentra la orden de compras, para eliminar el producto")
      );
    });
};
