const productos = [
    {
        id:1,
        nombre: "AZ1",
        precio: 45  
    },
    {
        id:2,
        nombre: "AZ2",
        precio: 25  
    },
    {
        id:3,
        nombre: "AZ3",
        precio: 35  
    },
    {
        id:4,
        nombre: "AZ4",
        precio: 15  
    }
]

let nombres = productos.map(({nombre})=> nombre)
console.log((nombres).join(","));

let precios = productos.map(({precio})=> precio).reduce((prev , current) => prev + current);
console.log(precios)

let promedio = precios / productos.length
console.log(promedio)

const os = require("os");
console.log(os.cpus())
console.log(os.arch())
console.log(os.hostname())
console.log(os.totalmem())
console.log(os.platform())
