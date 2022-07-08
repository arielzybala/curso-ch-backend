const dtoFs = require("../../dto/dtoFs");
module.exports = class CartDaoFs extends dtoFs {
    constructor() {
        super('cart.json')
    }
  async save(cart = { products: [] }) {
    return super.save(cart);
  }
};