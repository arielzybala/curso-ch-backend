const mensajeA = require("./mensaje1");
const mensajeB = require("./mensaje2");
const mensajeC = require("./mensaje3");

setTimeout(() => {
  console.log(mensajeA);
}, 1000);
setTimeout(() => {
  console.log(mensajeB);
}, 2000);
setTimeout(() => {
  console.log(mensajeC);
}, 3000);
