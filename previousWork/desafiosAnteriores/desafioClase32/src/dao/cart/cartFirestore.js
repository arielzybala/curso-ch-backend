const dtoFirestore = require("../../dto/dtoFirestore");

module.exports = class CartDaoFirestore extends dtoFirestore {
  constructor() {
    super("carts");
  }

  async save(cart = {products: []} ) {
    return super.save(cart);
  }
};
