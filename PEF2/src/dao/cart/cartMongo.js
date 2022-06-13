const dtoMongo = require("../../dto/dtoMongo");

module.exports = class CartDaoMongo extends dtoMongo {
  constructor() {
    super("carts", {
      products: { type: [], required: true },
    });
  }

  async save(cart = { products: [] }) {
    return super.save(cart);
  }
};
