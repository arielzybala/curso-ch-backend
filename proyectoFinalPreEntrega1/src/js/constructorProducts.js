const fs = require("fs");

module.exports = class Cart {
  constructor( id, timestamp, nombre, descripcion, código, foto, precio, stock ) {
    this.carritoName = "";
    this.idCarrito = 0;
    this.timesstampCarrito = 0;
    this.productos = [
      (this.id = id),
      (this.timestamp = timestamp),
      (this.nombre = nombre),
      (this.descripcion = descripcion),
      (this.código = código),
      (this.foto = foto),
      (this.precio = precio),
      (this.stock = stock),
    ];
  }

  setCart(carritoName) { 
    fs.promises.writeFile(`public/temp/${carritoName}.txt`,
)
}
} 
    

