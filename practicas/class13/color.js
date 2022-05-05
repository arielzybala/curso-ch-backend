let red = randomNum(0,225);
let green = randomNum(0,225);
let blue = randomNum(0,225);

class Contenedor {
    constructor(red, green, blue) {
      this.red = red;
      this.green = green;
      this.blue = blue
      
    }
    getNewColor(){
        console.log(`El color es RGB( ${this.red}, ${this.green}, ${this.blue})`)
    }
}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  let color = new Contenedor(red, green, blue);
module.exports = {color}