const fs = require("fs");

module.exports.createCart = (id) => {

  return fs.promises
  .appendFile(`public/temp/${id}.txt`, "")
  .then(console.log("Archivo Creado"))
  .catch((err)=> err, console.log("No fue posible crear el archivo"))
}

module.exports.eraseCart = (id) => {
  return fs.promises
  .readFile(`./public/temp/${id}.txt`, "utf-8")
    .then(() => {
        return fs.promises
        .unlink(`public/temp/${id}.txt`)})
  .catch( (err)=> {return (err, console.log("No se encontró archivo"))})
}