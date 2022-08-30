const {productsDao} = require("../dao/index");
const { logger } = require("./logger");

module.exports = oderAmount = async (items) => {

    const allproducts = await productsDao.listAll()
    const check = allproducts.map((obj) => obj.id !== items.products.id); 
    if(check.indexOf(false)){
        const total = await items.products
        .map((obj) => obj.price)
        .reduce((preValue, currentValue) => preValue + currentValue, 0);
        return total;
    } else{
        return logger.error("Los datos recibidos desde el front no coinciden con la base de datos")
    } 
};
