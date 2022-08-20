/**
 * EJERCICIO 1
 * 
 * 
 * 
 * 
 
 const inputNum = process.argv.slice(2).map((num) => Number(num));
const numbers = [];

for (num of inputNum) {
  if (!isNaN(num)) {
    numbers.push(num);
  } else {
    console.log({
      error: {
        descripcion: "error al ingresar datos",
        numeros: numbers,
      },
    });
  }
}
console.log(numbers);

const divider = numbers.length;

let dividing = numbers.reduce((prev, curr) => prev + curr);

const order = numbers.sort((a, b) => a - b);

const data = {
  datos: {
    Numeros: numbers,
    Promedio: dividing / divider,
    min: order[0],
    max: order[Number(divider) - 1],
    Ejecutable: {
      ejecutable: process.execPath,
      archivoEjecutado: `${process.argv.slice(1, 2)}`,
    },
    pid: process.pid,
  },
};

*/

/////////////////////////////////////////////////////////////////////
/**
 * FORK
 */
/////////////////////////////////////////////////////////////////////


const express = require('express')
const app = express()
const {fork} = require('child_process')





app.listen(8080, (err) => {
  !err
  ? console.log('run on port 8080')
  : console.log('server not run '+ err)
})