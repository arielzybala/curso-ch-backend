const DtoFile = require("../../dataTranferObject/DtoFile");

module.exports = class CartsDaoFile extends DtoFile {
  constructor() {
    super("cart.json");
  }

  async save(cart = { products: [] }) {
    return super.save(cart);
  }
};
