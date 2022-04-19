const stock = require("../assets/prodStock");
let inventory = stock.map((e,i)=> {return {id: i + 1, ...e}});
module.exports = inventory