const dtoFs = require("../../dto/dtoFs");
module.exports = class CartDaoFs extends dtoFs {
  constructor() {
    super("cart.json");
  }
  async save(
    cart = {
      productos: { type: Array, required: true },
      creation: { type: Date, required: false, max: 100 },
    }
  ) {
    return super.save(cart);
  }
};
