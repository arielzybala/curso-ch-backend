const dtoMemory = require("../../dto/dtoMemory");
module.exports = class CartDaoMemory extends dtoMemory {
  async save(cart = { productos: [] }) {
    return super.save(cart);
  }
};
