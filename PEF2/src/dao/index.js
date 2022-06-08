const ProductsDaoMongo = require('./products/productsMongo');
const CartDaoMongo = require('./cart/cartMongo');


let productsDao = new ProductsDaoMongo()
let cartDao = new CartDaoMongo()

module.exports = {productsDao , cartDao}