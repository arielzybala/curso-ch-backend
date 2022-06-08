require("./db")
const Products = require("./models/Products")
const product = require("./models/Products")

const saveProduct = async () =>{

    const newPr = new Products({
        name: "Tablet12",
        description: "Descripción12",
        price: 200012,
    })
  const productSaved =  await newPr.save();
  return productSaved
}

console.log(saveProduct())