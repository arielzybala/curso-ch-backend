const dtoFirestore = require("../../dto/dtoFirestore");

module.exports = class ProductsDaoFirestore extends dtoFirestore {
  constructor() {
    super("products");
  }
};
